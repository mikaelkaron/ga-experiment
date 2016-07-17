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
              .trigger("init.component", "experiment")
              .trigger("chooseVariation.experiment", [$($element.parents("[data-experiment-id]").addBack("[data-experiment-id]").get().reverse()).data("experimentId")])
              .trigger("start.component", "experiment"));
          } catch (e) {
            (errback || noop)(e, $element);
          }
        });
    })
    .on({
      "chooseVariation.experiment": function($event, experimentId) {
        var $target = $($event.target);

        ga("experiment:chooseVariation", experimentId, function(variation) {
          $target.trigger("variationChosen.experiment", [experimentId, variation]);
        });
      },

      "setChosenVariation.experiment": function($event, experimentId, variation) {
        var $target = $($event.target);

        ga("experiment:setChosenVariation", experimentId, variation, function() {
          $target.trigger("variationChosen.experiment", [experimentId, variation]);
        });
      },

      "variationChosen.experiment": function($event, experimentId, variation) {
        var $target = $($event.target);

        $($event.target).attr("data-experiment-variation-chosen", variation);
      }
    });
});
