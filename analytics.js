(function(w, _cxApiPlugin) {
  if (w[_cxApiPlugin]) {
    return;
  }

  var Experiment = w[_cxApiPlugin] = function(tracker, config) {
    this.tracker = tracker;
    this.config = config;
  };

  Experiment.prototype.do = function(experimentId, methodName, args, config, callback, errback) {
    return w[w["_cxApiObject"] || "_cxApi"].apply(this, [experimentId, methodName, args, config || this.config, callback, errback]);
  };

  Experiment.prototype.chooseVariation = function(experimentId, config, callback, errback) {
    var self = this;

    return self.do(experimentId, "chooseVariation", [], config, function(result) {
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

    return self.do(experimentId, "setChosenVariation", [chosenVariation], config, function(result) {
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
    return this.do(experimentId, "getChosenVariation", [], config, callback, errback);
  };

  Experiment.prototype.cxApi = function(experimentId, config, callback, errback) {
    return this.do(experimentId, "cxApi", [], config, callback, errback);
  };

  w[w["GoogleAnalyticsObject"] || "ga"]("provide", "experiment", Experiment);
})(window, "_cxApiPlugin");
