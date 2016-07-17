jQuery(function($) {
  $("body")
    .on({
      "experiment:chooseVariation": function($event, experimentId) {
        var $target = $($event.target);

        ga("experiment:chooseVariation", experimentId, function(variation) {
          $target.trigger("experiment:variationChosen", [variation]);
        });
      },

      "experiment:variationChosen": function($event, variation) {
        var $target = $($event.target);

        $target.trigger("experiment:matchesVariation", $target.data("experimentVariation") === variation);
      },

      "experiment:matchesVariation": function($event, matches) {
        $($event.target).attr("data-experiment-matches", matches);
      }
    })
    .find("[data-experiment-variation]")
    .each(function(index, element) {
      var $element = $(element);

      $element.trigger("experiment:chooseVariation", [$($element.parents("[data-experiment-id]").addBack("[data-experiment-id]").get().reverse()).data("experimentId")]);
    });
});
