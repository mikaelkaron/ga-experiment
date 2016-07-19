(function(w, _cxApiPlugin) {
  if (w[_cxApiPlugin]) {
    return;
  }

  var _cxApiProxy = function(experimentId, methodName, args, config, callback, errback) {
    return w[w["_cxApiObject"] || "_cxApi"].apply(this, [experimentId, methodName, args, config || this.config, callback, errback]);
  };

  var Experiment = w[_cxApiPlugin] = function(tracker, config) {
    this.tracker = tracker;
    this.config = config;
  };

  Experiment.prototype.chooseVariation = function(experimentId, config, callback, errback) {
    var self = this;

    return _cxApiProxy.call(self, experimentId, "chooseVariation", [], config, function(result) {
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
    }, errback);
  };

  Experiment.prototype.setChosenVariation = function(experimentId, chosenVariation, config, callback, errback) {
    var self = this;

    return _cxApiProxy.call(self, experimentId, "setChosenVariation", [chosenVariation], config, function(result) {
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
    }, errback);
  };

  Experiment.prototype.getChosenVariation = function(experimentId, config, callback, errback) {
    return _cxApiProxy.call(this, experimentId, "getChosenVariation", [], config, callback, errback);
  };

  Experiment.prototype.cxApi = function(experimentId, config, callback, errback) {
    return _cxApiProxy.call(this, experimentId, "cxApi", [], config, callback, errback);
  };

  w[w["GoogleAnalyticsObject"] || "ga"]("provide", "experiment", Experiment);
})(window, "_cxApiPlugin");
