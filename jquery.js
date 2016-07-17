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
        .trigger("ready.experiment", [callback, errback]);
    })
    .on({
      "ready.experiment": function($event, callback, errback) {
        var $target = $($event.target);

        try {
          (callback || noop)($target
            .trigger("initialize.component", "experiment")
            .trigger("chooseVariation.experiment"));
        } catch (e) {
          (errback || noop)(e, $target);
        }
      },

      "chooseVariation.experiment": function($event) {
        var $target = $($event.target);
        var experimentId = $target.attr("data-experiment-id");

        ga("experiment:chooseVariation", experimentId, function(variation) {
          $target.trigger("variationChosen.experiment", [variation]);
        });
      },

      "setChosenVariation.experiment": function($event, variation) {
        var $target = $($event.target);
        var experimentId = $target.attr("data-experiment-id");

        ga("experiment:setChosenVariation", experimentId, variation, function() {
          $target.trigger("variationChosen.experiment", [variation]);
        });
      },

      "getChosenVariation.experiment": function($event) {
        var $target = $($event.target);
        var experimentId = $target.attr("data-experiment-id");

        ga("experiment:getChosenVariation", experimentId, function(variation) {
          $target.trigger("variationChosen.experiment", [variation]);
        });
      },

      "variationChosen.experiment": function($event, variation) {
        $($event.target).attr("data-experiment-variation-chosen", variation);
      }
    }, "[data-experiment-id]");
});
