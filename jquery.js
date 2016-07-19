jQuery(function($) {
  var noop = function() {};

  $(document)
    .on({
      "chooseVariation.experiment": function($event, callback, errback) {
        var $target = $($event.target);

        ga("experiment:chooseVariation", $target.attr("data-experiment-id"), function(variation) {
          $target.trigger("variationChosen.experiment", [variation]);
          (callback || noop)(variation);
        }, errback);
      },

      "setChosenVariation.experiment": function($event, variation, callback, errback) {
        var $target = $($event.target);

        ga("experiment:setChosenVariation", $target.attr("data-experiment-id"), variation, function() {
          $target.trigger("variationChosen.experiment", [variation]);
          (callback || noop)(variation);
        }, errback);
      },

      "getChosenVariation.experiment": function($event, callback, errback) {
        var $target = $($event.target);

        ga("experiment:getChosenVariation", $target.attr("data-experiment-id"), function(variation) {
          $target.trigger("variationChosen.experiment", [variation]);
          (callback || noop)(variation);
        }, errback);
      }
    }, "[data-experiment-id]");
});
