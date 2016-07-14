(function(w, d, _cxApi, q) {
  if (w[_cxApi] && w[_cxApi].q) {
    q = q.concat(w[_cxApi].q)
  }

  _cxApi = _cxApi === w["_cxApiObject"]
    ? w[_cxApi]
    : w[w["_cxApiObject"] = _cxApi] = function(experimentId, methodName, methodArgs, callback, errback, config) {
      var _cxApiExperiment = _cxApi[experimentId]
        ? _cxApi[experimentId]
        : _cxApi[experimentId] = (function(head, script, src, queue, done) {
          var before = function() {
            done = true;

            script.onload = script.onreadystatechange = script.onerror = null;

            head.removeChild(script);
          };

          var after = function() {
            var scope;
            var args;
            var timeout;

            while (queue.length) {
              scope = queue.shift();
              args = queue.shift();
              timeout = queue.shift();

              if (timeout !== true) {
                if (timeout) {
                  w.clearTimeout(timeout);
                }

                _cxApiExperiment.apply(scope, args);
              }
            }
          }

          script.onload = script.onreadystatechange = function() {
            var readyState = this.readyState;

            if (!done && (!readyState
              || readyState === "loaded"
              || readyState === "complete")) {

              before();

              _cxApiExperiment = _cxApi[experimentId] = (function(cxApi) {
                delete w.cxApi;

                return function(_methodName, _methodArgs, _callback, _errback) {
                  var result = _methodName === "getExperiment" ? cxApi : cxApi[_methodName];

                  try {
                    if (typeof result === "function") {
                      result = result.apply(this, _methodArgs);
                    }

                    _callback(result);
                  } catch (e) {
                    _errback(e);
                  }

                  return _cxApiExperiment;
                }
              })(w.cxApi);

              after();
            }
          };

          script.onerror = function(e) {
            if (!done) {
              before();

              _cxApiExperiment = _cxApi[experimentId] = function(_methodName, _methodArgs, _callback, _errback) {
                _errback(new Error("Unable to load [" + src + "]"), e);
              };

              after();
            }
          };

          script.src = src;

          head.appendChild(script);

          return function(_methodName, _methodArgs, _callback, _errback, _config) {
            var timeout = _config.timeout;
            var index = queue.push(this, arguments, timeout) - 1;

            if (timeout) {
              queue[index] = w.setTimeout(function() {
                queue[index] = true;

                _errback(new Error("Timeout [" + timeout + "]"), timeout);
              }, timeout);
            }

            return _cxApiExperiment;
          };
        })(d.getElementsByTagName("head")[0], d.createElement("script"), "//www.google-analytics.com/cx/api.js?experiment=" + experimentId, [], false);

      _cxApiExperiment.call(this, methodName, methodArgs, callback, errback, config);

      return _cxApi;
    };

  while (q.length) {
    _cxApi.apply(q.shift(), q.shift());
  }
})(window, document, "_cxApi", []);
