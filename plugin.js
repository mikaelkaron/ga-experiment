window._cxApi.plugin = window._cxApi.plugin || (function(w, _cxApi) {

  var Experiment = function(tracker) {
    this.tracker = tracker;
  };

  Experiment.prototype.chooseVariation = function(experimentId, callback, errback) {
    var self = this;

    _cxApi.call(self, experimentId, "chooseVariation", [], function(result) {
      self.tracker.send({
        "hitType": "event",
        "nonInteraction": true,
        "eventCategory": "experiment",
        "eventAction": "chooseVariation",
        "eventValue": result
      });

      callback(result);
    }, errback);
  };

  Experiment.prototype.setChosenVariation = function(experimentId, chosenVariation, callback, errback) {
    var self = this;

    _cxApi.call(self, experimentId, "setChosenVariation", [chosenVariation], function(result) {
      self.tracker.send({
        "hitType": "event",
        "nonInteraction": true,
        "eventCategory": "experiment",
        "eventAction": "setChosenVariation",
        "eventValue": result
      });

      callback(result);
    }, errback);
  };

  Experiment.prototype.getChosenVariation = function(experimentId, callback, errback) {
    _cxApi.call(this, experimentId, "getChosenVariation", [], callback, errback);
  };

  w[w["GoogleAnalyticsObject"] || "ga"]("provide", "experiment", Experiment);

  return Experiment;
})(window, window._cxApi);
