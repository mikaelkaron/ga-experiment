jQuery(function($) {
  var noop = $.noop;

  $(document)
    .on({
      "chooseVariation.experiment": function($event, config, callback, errback) {
        var $target = $($event.target);

        ga("experiment:chooseVariation", $target.attr("data-experiment-id"), config, function(variation) {
          $target.trigger("variationChosen.experiment", [variation]);
          (callback || noop)(variation);
        }, errback);
      },

      "setChosenVariation.experiment": function($event, variation, config, callback, errback) {
        var $target = $($event.target);

        ga("experiment:setChosenVariation", $target.attr("data-experiment-id"), variation, config, function() {
          $target.trigger("variationChosen.experiment", [variation]);
          (callback || noop)(variation);
        }, errback);
      },

      "getChosenVariation.experiment": function($event, config, callback, errback) {
        var $target = $($event.target);

        ga("experiment:getChosenVariation", $target.attr("data-experiment-id"), config, function(variation) {
          $target.trigger("variationChosen.experiment", [variation]);
          (callback || noop)(variation);
        }, errback);
      }
    }, "[data-experiment-id]");
});
