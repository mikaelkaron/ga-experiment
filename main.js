window._cxApi = window._cxApi || (function(w, d, _cxApi) {

  return _cxApi = function(experimentId, methodName, args, callback, errback, config) {
    var __cxApi = _cxApi[experimentId] = _cxApi[experimentId] || (function(src) {

      var q = [];
      var done = false;
      var head = d.getElementsByTagName("head")[0];
      var script = d.createElement("script");

      var before = function() {
        done = true;

        script.onload = script.onreadystatechange = script.onerror = null;

        head.removeChild(script);
      };

      var after = function() {
        var _scope;
        var _args;
        var _timeout;

        while (q.length) {
          _scope = q.shift();
          _args = q.shift();
          _timeout = q.shift();

          if (_timeout !== true) {
            if (_timeout) {
              w.clearTimeout(_timeout);
            }

            __cxApi.apply(_scope, _args);
          }
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
              var result = cxApi[_methodName];

              try {
                if (typeof result === "function") {
                  result = result.apply(this, _args);
                }

                _callback(result);
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

      return function(_method, _args, _callback, _errback, _config) {
        var timeout = _config.timeout;
        var index = q.push(this, arguments, timeout) - 1;

        if (timeout) {
          q[index] = w.setTimeout(function() {
            q[index] = true;

            _errback(new Error("timeout [" + timeout + "]"), timeout);
          }, timeout);
        }
      };
    })("//www.google-analytics.com/cx/api.js?experiment=" + experimentId);

    __cxApi.call(this, methodName, args, callback, errback, config);
  };
})(window, document);
