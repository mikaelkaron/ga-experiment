window._cxApi = window._cxApi || (function(w, d, _cxApi) {

  return _cxApi = function(experimentId, methodName, args, callback, errback) {

    var __cxApi = _cxApi[experimentId] = _cxApi[experimentId] || (function(q) {

      var done = false;
      var head = d.getElementsByTagName("head")[0];
      var script = d.createElement("script");

      script.onload = script.onreadystatechange = function() {
        var readyState = this.readyState;

        if (!done && (!readyState
          || readyState === "loaded"
          || readyState === "complete")) {

          done = true;

          __cxApi = _cxApi[experimentId] = (function(cxApi) {
            delete w.cxApi;

            return function(_methodName, _args, _callback, _errback) {
              try {
                _callback(cxApi[_methodName].apply(this, _args));
              } catch (e) {
                _errback(e);
              }
            }
          })(w.cxApi);

          script.onload = script.onreadystatechange = null;

          head.removeChild(script);

          while (q.length) {
            __cxApi.apply(q.shift(), q.shift());
          }
        }
      };

      script.src = "//www.google-analytics.com/cx/api.js?experiment=" + experimentId;

      head.appendChild(script);

      return function() {
        q.push(this, arguments);
      };
    })([]);

    __cxApi.call(this, methodName, args, callback, errback);
  };
})(window, document);
