jQuery(function($) {
  var noop = function() {};

  $("html")
    .on("ready.component", "[data-components~='experiment']", function($event, callback, errback) {
      var $target = $($event.target);

      try {
        (callback || noop)($target
          .find("[data-experiment-variation]")
          .addBack("[data-experiment-variation]")
          .each(function(index, element) {
            var $element = $(element);

            $element
              .trigger("init.component", "experiment")
              .trigger("chooseVariation.experiment", [$($element.parents("[data-experiment-id]").addBack("[data-experiment-id]").get().reverse()).data("experimentId")])
              .trigger("start.component", "experiment");
            ;
          }));
      } catch (e) {
        (errback || noop)(e, $target);
      }
    })
    .on({
      "chooseVariation.experiment": function($event, experimentId) {
        var $target = $($event.target);

        ga("experiment:chooseVariation", experimentId, function(variation) {
          $target.trigger("variationChosen.experiment", [variation]);
        });
      },

      "variationChosen.experiment": function($event, variation) {
        var $target = $($event.target);

        $target.trigger("matchesVariation.experiment", $target.data("experimentVariation") === variation);
      },

      "matchesVariation.experiment": function($event, matches) {
        $($event.target).attr("data-experiment-matches", matches);
      }
    });
});
