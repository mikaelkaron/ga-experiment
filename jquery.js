jQuery(function($) {
  var noop = function() {};

  $("html")
    .on("ready.component", "[data-components~='experiment']", function($event, callback, errback) {
      $($event.target)
        .find("[data-experiment-variation]")
        .addBack("[data-experiment-variation]")
        .each(function(index, element) {
          var $element = $(element);

          try {
            (callback || noop)($element
              .trigger("initialize.component", "experiment")
              .trigger("chooseVariation.experiment")
              .trigger("start.component", "experiment"));
          } catch (e) {
            (errback || noop)(e, $element);
          }
        })
        .end()
        .end()
        .attr("data-components", function(index, attr) {
          return attr.split(/\s/).filter(function(value) {
            return value !== "experiment";
          }).join(" ");
        });
    })
    .on({
      "chooseVariation.experiment": function($event) {
        var $target = $($event.target);
        var experimentId = $target.data("experimentId");

        ga("experiment:chooseVariation", experimentId, function(variation) {
          $target.trigger("variationChosen.experiment", [variation]);
        });
      },

      "setChosenVariation.experiment": function($event, variation) {
        var $target = $($event.target);
        var experimentId = $target.data("experimentId");

        ga("experiment:setChosenVariation", experimentId, variation, function() {
          $target.trigger("variationChosen.experiment", [variation]);
        });
      },

      "variationChosen.experiment": function($event, variation) {
        $($event.target).attr("data-experiment-variation-chosen", variation);
      }
    });
});
