(function(w, _cxApi) {
  var noop = function() {};
  var re = /^experiment=(\w+):(\d+)/;
  var _cxApiObject = w["_cxApiObject"] || _cxApi;
  var _cxApiProxy = w[_cxApiObject];
  var params = (w.location.hash || w.location.search)
    .replace(/.*\?/, "")
    .split("&")
    .reduce(function(result, param) {
      var matches = param.match(re);

      if (matches !== null) {
        result[matches[1]] = parseInt(matches[2]);
      }

      return result;
    }, {})

  w[_cxApiObject] = function(experimentId, methodName, methodArgs, config, callback, errback) {
    switch (methodName) {
      case "getChosenVariation":
      case "setChosenVariation":
      case "chooseVariation":
        try {
          if (params.hasOwnProperty(experimentId)) {
            (callback || noop)(params[experimentId]);
            break;
          }
        } catch (e) {
          (errback || noop)(e);
        }

      default:
        _cxApiProxy.apply(this, arguments);
    }
  }
})(window, "_cxApi");
