window._cxApi.plugin = window._cxApi.plugin || (function(w, _cxApi) {
  var noop = function() {};

  var Experiment = function(tracker, config) {
    var self = this;

    self.tracker = tracker;
    self.callback = config.callback || noop;
    self.errback = config.errback || noop;
    self.timeout = config.timeout;
  };

  Experiment.prototype.chooseVariation = function(experimentId, callback, errback, timeout) {
    var self = this;

    callback = callback || self.callback;
    errback = errback || self.errback;
    timeout = timeout || self.timeout;

    _cxApi.call(self, experimentId, "chooseVariation", [], function(result) {
      self.tracker.send({
        "hitType": "event",
        "nonInteraction": true,
        "eventCategory": "experiment",
        "eventAction": "chooseVariation",
        "eventValue": result
      });

      try {
        callback(result);
      } catch (e) {
        errback(e);
      }
    }, errback, timeout);
  };

  Experiment.prototype.setChosenVariation = function(experimentId, chosenVariation, callback, errback, timeout) {
    var self = this;

    callback = callback || self.callback;
    errback = errback || self.errback;
    timeout = timeout || self.timeout;

    _cxApi.call(self, experimentId, "setChosenVariation", [chosenVariation], function(result) {
      self.tracker.send({
        "hitType": "event",
        "nonInteraction": true,
        "eventCategory": "experiment",
        "eventAction": "setChosenVariation",
        "eventValue": result
      });

      try {
        callback(result);
      } catch (e) {
        errback(e);
      }
    }, errback, timeout);
  };

  Experiment.prototype.getChosenVariation = function(experimentId, callback, errback, timeout) {
    var self = this;

    callback = callback || self.callback;
    errback = errback || self.errback;
    timeout = timeout || self.timeout;

    _cxApi.call(self, experimentId, "getChosenVariation", [], callback, errback, timeout);
  };

  w[w["GoogleAnalyticsObject"] || "ga"]("provide", "experiment", Experiment);

  return Experiment;
})(window, window._cxApi);
