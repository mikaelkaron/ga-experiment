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
            .trigger("start.component", "experiment")
            .trigger("chooseVariation.experiment"));
        } catch (e) {
          (errback || noop)(e, $target);
        }
      },

      "chooseVariation.experiment": function($event) {
        var $target = $($event.target);

        ga("experiment:chooseVariation", $target.attr("data-experiment-id"), function(variation) {
          $target.trigger("variationChosen.experiment", [variation]);
        });
      },

      "setChosenVariation.experiment": function($event, variation) {
        var $target = $($event.target);

        ga("experiment:setChosenVariation", $target.attr("data-experiment-id"), variation, function() {
          $target.trigger("variationChosen.experiment", [variation]);
        });
      },

      "getChosenVariation.experiment": function($event) {
        var $target = $($event.target);

        ga("experiment:getChosenVariation", $target.attr("data-experiment-id"), function(variation) {
          $target.trigger("variationChosen.experiment", [variation]);
        });
      },

      "variationChosen.experiment": function($event, variation) {
        $($event.target).attr("data-experiment-variation-chosen", variation);
      }
    }, "[data-experiment-id]");
});
