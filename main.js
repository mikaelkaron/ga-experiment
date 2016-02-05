window._cxApi = window._cxApi || (function(w, d, _cxApi) {

  return _cxApi = function(experimentId, methodName, args, callback, errback, timeout) {
    var q = [];

    var __cxApi = _cxApi[experimentId] = _cxApi[experimentId] || (function(src, _q) {

      var done = false;
      var head = d.getElementsByTagName("head")[0];
      var script = d.createElement("script");

      var before = function() {
        done = true;

        if (timeout) {
          timeout = w.clearTimeout(timeout);
        }

        script.onload = script.onreadystatechange = script.onerror = null;

        head.removeChild(script);
      };

      var after = function() {
        while (_q.length) {
          __cxApi.apply(_q.shift(), _q.shift());
        }
      }

      script.onload = script.onreadystatechange = function() {
        var readyState = this.readyState;

        if (!done && (!readyState
          || readyState === "loaded"
          || readyState === "complete")) {

          before();

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

          after();
        }
      };

      script.onerror = function(e) {
        if (!done) {
          before();

          __cxApi = _cxApi[experimentId] = function(_method, _args, _callback, _errback) {
            _errback(new Error("Unable to load [" + src + "]"), e);
          };

          after();
        }
      };

      script.src = src;

      head.appendChild(script);

      return function() {
        _q.push(this, arguments);
      };
    })("//www.google-analytics.com/cx/api.js?experiment=" + experimentId, q);

    if (timeout) {
      timeout = (function(_timeout) {
        return w.setTimeout(function() {
          __cxApi = _cxApi[experimentId] = function(_method, _args, _callback, _errback) {
            _errback(new Error("timeout [" + _timeout + "]"), _timeout);
          };

          while (q.length) {
            __cxApi.apply(q.shift(), q.shift());
          }
        }, timeout);
      })(timeout);
    }

    __cxApi.call(this, methodName, args, callback, errback);
  };
})(window, document);
