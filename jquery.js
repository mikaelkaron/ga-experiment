jQuery(function($) {
  var noop = function() {};

  $("html")
    .on("ready.component", "[data-ready~='experiment']", function($event, callback, errback) {
      $($event.target)
        .attr("data-ready", function(index, attr) {
          return attr.split(/\s+/).filter(function(value) {
            return value !== "experiment";
          }).join(" ");
        })
        .find("[data-experiment-variation]")
        .addBack("[data-experiment-variation]")
        .trigger("ready.experiment", [callback, errback || noop]);
    })
    .on({
      "ready.experiment": function($event, callback, errback) {
        var $target = $($event.target);

        try {
          $target
            .trigger("start.component", "experiment")
            .trigger("chooseVariation.experiment", [callback, errback]);
        } catch (e) {
          errback(e, $target);
        }
      },

      "chooseVariation.experiment": function($event, callback, errback) {
        var $target = $($event.target);

        ga("experiment:chooseVariation", $target.attr("data-experiment-id"), function(variation) {
          $target.trigger("variationChosen.experiment", [variation, callback]);
        }, errback);
      },

      "setChosenVariation.experiment": function($event, variation, callback, errback) {
        var $target = $($event.target);

        ga("experiment:setChosenVariation", $target.attr("data-experiment-id"), variation, function() {
          $target.trigger("variationChosen.experiment", [variation, callback]);
        }, errback);
      },

      "getChosenVariation.experiment": function($event, callback, errback) {
        var $target = $($event.target);

        ga("experiment:getChosenVariation", $target.attr("data-experiment-id"), function(variation) {
          $target.trigger("variationChosen.experiment", [variation, callback]);
        }, errback);
      },

      "variationChosen.experiment": function($event, variation, callback) {
        $($event.target).attr("data-experiment-variation-chosen", variation);
        (callback || noop)(variation);
      }
    }, "[data-experiment-id]");
});
