(function(w, _cxApiPlugin) {
  if (w[_cxApiPlugin]) {
    return;
  }

  var Experiment = w[_cxApiPlugin] = function(tracker, config) {
    this.tracker = tracker;
    this.config = config;
  };

  Experiment.prototype.do = function(experimentId, methodName, args, callback, errback, config) {
    return w[w["_cxApiObject"] || "_cxApi"].apply(this, [experimentId, methodName, args, callback, errback, config || this.config]);
  };

  Experiment.prototype.chooseVariation = function(experimentId, callback, errback, config) {
    var self = this;

    return self.do(experimentId, "chooseVariation", [], function(result) {
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
    }, errback, config);
  };

  Experiment.prototype.setChosenVariation = function(experimentId, chosenVariation, callback, errback, config) {
    var self = this;

    return self.do(experimentId, "setChosenVariation", [chosenVariation], function(result) {
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
    }, errback, config);
  };

  Experiment.prototype.getChosenVariation = function(experimentId, callback, errback, config) {
    return this.do(experimentId, "getChosenVariation", [], callback, errback, config);
  };

  Experiment.prototype.cxApi = function(experimentId, callback, errback, config) {
    return this.do(experimentId, "cxApi", [], callback, errback, config);
  };

  w[w["GoogleAnalyticsObject"] || "ga"]("provide", "experiment", Experiment);
})(window, "_cxApiPlugin");
