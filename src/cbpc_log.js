var CBPC_LOG = (() => {
  /**
   * logerr
   *
   * @category   logerr
   * @author     Vaibhav Mehta <firekillz@gmail.com>
   * @copyright  Copyright (c) 2016 Vaibhav Mehta <https://github.com/i-break-codes>
   * @license    http://www.opensource.org/licenses/mit-license.html MIT License
   * @version    1.2 Stable
   */

  var ip = "";
  var ipKey = "_track_ip";

  var getIp = function () {
    ip = window.localStorage.getItem(ipKey);
    if (!ip) {
      var protocol = window.location.protocol;
      if (protocol === "file:") return;

      var xhr = new window.XMLHttpRequest();
      xhr.onreadystatechange = function () {
        switch (xhr.readyState) {
          case 4:
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
              ip = JSON.parse(xhr.responseText).ip || "";
              if (ip.length > 0) {
                window.localStorage.setItem(ipKey, ip);
              }
            }
        }
      };
      xhr.open("get", ipUrl);
      xhr.send(null);
    }
  };
  getIp();

  var browser = function () {
    var userAgent = navigator.userAgent || window.navigator.userAgent;

    function getOSName() {
      var osVersion = "unknown";
      if (userAgent.indexOf("Windows NT 10.0") > -1) {
        osVersion = "Windows 10";
      } else if (userAgent.indexOf("Windows NT 6.3") > -1) {
        osVersion = "Windows 8.1";
      } else if (userAgent.indexOf("Windows NT 6.2") > -1) {
        osVersion = "Windows 8";
      } else if (userAgent.indexOf("Windows NT 6.1") > -1) {
        osVersion = "Windows 7";
      } else if (userAgent.indexOf("Windows NT 6.0") > -1) {
        osVersion = "Windows Vista";
      } else if (userAgent.indexOf("Windows NT 5.2") > -1) {
        osVersion = "Windows Server 2003";
      } else if (userAgent.indexOf("Windows NT 5.1") > -1) {
        osVersion = "Windows XP";
      } else if (userAgent.indexOf("Windows NT 5") > -1) {
        osVersion = "Windows 2000";
      } else if (userAgent.indexOf("Windows NT 4") > -1) {
        osVersion = "Windows NT 4.0";
      } else if (userAgent.indexOf("Me") > -1) {
        osVersion = "Windows Me";
      } else if (userAgent.indexOf("98") > -1) {
        osVersion = "Windows 98";
      } else if (userAgent.indexOf("95") > -1) {
        osVersion = "Windows 95";
      } else if (userAgent.indexOf("Mac") > -1) {
        osVersion = "Mac";
      } else if (userAgent.indexOf("Unix") > -1) {
        osVersion = "UNIX";
      } else if (userAgent.indexOf("Linux") > -1) {
        osVersion = "Linux";
      } else if (userAgent.indexOf("SunOS") > -1) {
        osVersion = "SunOS";
      }
      return osVersion;
    }
    function getBrowserVersion() {
      if (userAgent.indexOf("Firefox") > -1) {
        var version = userAgent.match(/firefox\/[\d.]+/gi)[0].match(/[\d]+/)[0];
        return "Firefox " + version;
      } else if (userAgent.indexOf("Edge") > -1) {
        var version = userAgent.match(/edge\/[\d.]+/gi)[0].match(/[\d]+/)[0];
        return "Edge " + version;
      } else if (
        userAgent.indexOf("Opera") > -1 ||
        userAgent.indexOf("OPR") > -1
      ) {
        if (userAgent.indexOf("Opera") > -1) {
          var version = userAgent.match(/opera\/[\d.]+/gi)[0].match(/[\d]+/)[0];
          return "Opera " + version;
        }
        if (userAgent.indexOf("OPR") > -1) {
          var version = userAgent.match(/opr\/[\d.]+/gi)[0].match(/[\d]+/)[0];
          return "Opera " + version;
        }
      } else if (userAgent.indexOf("Chrome") > -1) {
        var version = userAgent.match(/chrome\/[\d.]+/gi)[0].match(/[\d]+/)[0];
        return "Chrome " + version;
      } else if (userAgent.indexOf("Safari") > -1) {
        var version = userAgent.match(/safari\/[\d.]+/gi)[0].match(/[\d]+/)[0];
        return "Safari " + version;
      } else if (
        userAgent.indexOf("MSIE") > -1 ||
        userAgent.indexOf("Trident") > -1
      ) {
        if (userAgent.indexOf("MSIE") > -1) {
          var version = userAgent.match(/msie [\d.]+/gi)[0].match(/[\d]+/)[0];
          return "IE " + version;
        }
        if (userAgent.indexOf("Trident") > -1) {
          var versionTrident = userAgent
            .match(/trident\/[\d.]+/gi)[0]
            .match(/[\d]+/)[0];
          var version = parseInt(versionTrident) + 4;
          return "IE " + version;
        }
      }
    }
    var datetime = new Date().format("yyyy-MM-dd hh:mm:ss");

    return {
      rec_time: datetime,
      // 不传 useragent，系统判断出版本和浏览器即可
      // user_agent: userAgent,
      url: window.location.href,
      browser: getBrowserVersion(),
      os: getOSName(),
      ip: ip,
    };
  };

  var jsErr = (function () {
    "use strict";
    var _url = "//10.8.1.25:100/1084/aec97f7bed.gif";
    var ipUrl = "//10.8.1.25:100/ip";
    var _appendData = {};
    /**
     *对Date的扩展，将 Date 转化为指定格式的String
     *月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
     *年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     *例子：
     *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
     *(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
     */
    Date.prototype.format = function (fmt) {
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds(), //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    };

    var setConfig;

    function init(userConfig) {
      if (!userConfig) userConfig = {};

      // Default configuration
      var config = {
        url: null,
        additionalParams: null,
      };

      // Override with user config
      setConfig = Object.assign(config, userConfig);

      _appendData = setConfig.additionalParams;

      //Remove current listener
      window.removeEventListener("error", _listener);

      // Listen to errors
      window.addEventListener("error", _listener);
    }

    // NOTE: Private
    function _listener(e) {
      _remoteLogging(e, setConfig);
    }

    function _detailedErrors(e) {
      var i = _errorData(e);

      var str = {
        Type: i.type,
        Error: i.error,
        StackTrace: i.stackTrace,
        "File Name": i.filename,
        Path: i.path,
        Line: i.line,
        Column: i.column,
        Debug: i.path + ":" + i.line,
      };

      return JSON.stringify(str);
    }

    function err(data) {
      var params = _serializeData(data);
      var img = new Image();
      img.src = _url + "?" + params;
      img.onload = img.onerror = function () {
        img.onload = img.onerror = null;
        img = null;
      };
    }

    function _remoteLogging(e, remoteSettings) {
      if (
        remoteSettings.additionalParams &&
        typeof remoteSettings.additionalParams !== "object"
      ) {
        throw new Error(
          "Invalid data type, additionalParams should be a valid object"
        );
      }

      _url = remoteSettings.url || _url;
      var msg = _detailedErrors(e);
      //    用img src上报日志的好处:能跨域，利用浏览器资源去加载，还不动用JS线程

      err({
        title: "jserror",
        msg: msg,
        category: "js",
        level: "error",
      });
    }

    function _serializeData(data) {
      var obj = browser();
      // 数据注入
      var dist = Object.assign(obj, data, _appendData);

      return Object.keys(dist)
        .map(function (k) {
          return encodeURIComponent(k) + "=" + encodeURIComponent(dist[k]);
        })
        .join("&");
    }

    function _errorData(e) {
      var filename = e.filename.lastIndexOf("/");

      return {
        type: e.type,
        path: e.filename,
        filename: e.filename.substring(++filename),
        line: e.lineno,
        column: e.colno,
        error: e.message,
        stackTrace: e.error
          ? e.error.stack.toString().replace(/(\r\n|\n|\r)/gm, "")
          : "",
      };
    }

    //Polyfill for Object.assign
    if (typeof Object.assign != "function") {
      Object.assign = function (target) {
        if (target === null) {
          throw new TypeError("Cannot convert undefined or null to object");
        }

        target = Object(target);
        for (var index = 1; index < arguments.length; index++) {
          var source = arguments[index];
          if (source !== null) {
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
        }
        return target;
      };
    }

    return {
      init: init,
      err: err,
    };
  })();

  var init = function (options) {
    function isFunction(what) {
      return typeof what === "function";
    }

    function isUndefined(what) {
      return what === void 0;
    }

    function hasKey(object, key) {
      return Object.prototype.hasOwnProperty.call(object, key);
    }

    function each(obj, callback) {
      var i, j;

      if (isUndefined(obj.length)) {
        for (i in obj) {
          if (hasKey(obj, i)) {
            callback.call(null, i, obj[i]);
          }
        }
      } else {
        j = obj.length;
        if (j) {
          for (i = 0; i < j; i++) {
            callback.call(null, i, obj[i]);
          }
        }
      }
    }

    function objectMerge(obj1, obj2) {
      if (!obj2) {
        return obj1;
      }
      each(obj2, function (key, value) {
        obj1[key] = value;
      });
      return obj1;
    }

    var handleRejectPromise = function (_window, config) {
      _window.addEventListener(
        "unhandledrejection",
        function (event) {
          if (event) {
            var reason = event.reason;
            config.sendError({
              title: event.type || "unhandledrejection",
              msg: reason,
              category: "js",
              level: "error",
            });
          }
        },
        true
      );
    };

    var handleResourceError = function (_window, config) {
      _window.addEventListener(
        "error",
        function (event) {
          if (event) {
            var target = event.target || event.srcElement;
            var isElementTarget =
              target instanceof HTMLScriptElement ||
              target instanceof HTMLLinkElement ||
              target instanceof HTMLImageElement;
            if (!isElementTarget) return; // js error不再处理

            var url = target.src || target.href;
            config.sendError({
              title: target.nodeName,
              msg: "GET " + url + " net::ERR_ABORTED 404 (Not Found)",
              category: "resource",
              level: "error",
            });
          }
        },
        true
      );
    };

    var _handleFetchError = function (_window, config) {
      if (!_window.fetch) return;
      let _oldFetch = _window.fetch;
      _window.fetch = function () {
        return _oldFetch.apply(this, arguments).catch((error) => {
          config.sendError({
            title: arguments[0],
            msg: JSON.stringify({
              message: error.message,
              stack: error.stack,
            }),
            category: "ajax",
            level: "error",
          });
          throw error;
        });
      };
    };

    var handleAjaxError = function (_window, config) {
      var protocol = _window.location.protocol;
      if (protocol === "file:") return;

      // 处理fetch
      _handleFetchError(_window, config);

      // 处理XMLHttpRequest
      if (!_window.XMLHttpRequest) {
        return;
      }
      var xmlhttp = _window.XMLHttpRequest;

      var _oldSend = xmlhttp.prototype.send;
      var _handleEvent = function (event) {
        if (
          event &&
          event.currentTarget &&
          event.currentTarget.status !== 200
        ) {
          var title = event.target.responseURL;

          config.sendError({
            title: event.target.responseURL,
            msg: JSON.stringify({
              response: event.target.response,
              responseURL: event.target.responseURL,
              status: event.target.status,
              statusText: event.target.statusText,
            }),
            category: "ajax",
            level: "error",
          });
        }
      };
      xmlhttp.prototype.send = function () {
        if (this["addEventListener"]) {
          this["addEventListener"]("error", _handleEvent);
          this["addEventListener"]("load", _handleEvent);
          this["addEventListener"]("abort", _handleEvent);
        } else {
          var _oldStateChange = this["onreadystatechange"];
          this["onreadystatechange"] = function (event) {
            if (this.readyState === 4) {
              _handleEvent(event);
            }
            _oldStateChange && _oldStateChange.apply(this, arguments);
          };
        }
        return _oldSend.apply(this, arguments);
      };
    };

    var handleConsoleError = function (_window, config) {
      if (!_window.console || !_window.console.error) return;

      var _oldConsoleError = _window.console.error;
      _window.console.error = function () {
        config.sendError({
          title: "consoleError",
          msg: JSON.stringify(arguments.join(",")),
          category: "js",
          level: "error",
        });
        _oldConsoleError && _oldConsoleError.apply(_window, arguments);
      };
    };

    var utils = {
      isFunction,
      objectMerge,
      //   handleWindowError,
      handleRejectPromise,
      handleConsoleError,
      handleResourceError,
      handleAjaxError,
    };

    var defaultConfig = {
      jsError: true,
      resourceError: true,
      ajaxError: true,
      consoleError: false, // console.error默认不处理
      scriptError: false, // 跨域js错误，默认不处理，因为没有任何信息

      autoReport: true,
      filters: [], // 过滤器，命中的不上报
      levels: ["info", "warning", "error"],
      category: ["js", "resource", "ajax"],
    };
    var config = utils.objectMerge(defaultConfig, options);

    jsErr.init(config);

    if (!config.scriptError) {
      config.filters.push(function () {
        return /^Script error\.?$/.test(arguments[0]);
      });
    }

    // 处理过滤器
    config.sendError = function (title, msg, level, category, tags) {
      try {
        var isFilter = config.filters.some((func) => {
          return utils.isFunction(func) && func.apply(this, arguments);
        });
        if (isFilter) {
          return;
        }
        jsErr.err(arguments[0]);
      } catch (e) {
        jsErr.err({
          title: "betterJs",
          msg: e,
          category: "js",
        });
      }
    };

    var _window =
      typeof window !== "undefined"
        ? window
        : typeof global !== "undefined"
        ? global
        : typeof self !== "undefined"
        ? self
        : {};
    var addEventListener = _window.addEventListener || _window.attachEvent;
    // if (config.jsError) {
    //   utils.handleWindowError(_window, config);
    // }
    if (config.jsError) {
      // https://developer.mozilla.org/zh-CN/docs/Web/Events/unhandledrejection
      utils.handleRejectPromise(_window, config);
    }
    if (config.resourceError && addEventListener) {
      utils.handleResourceError(_window, config);
    }
    if (config.ajaxError) {
      utils.handleAjaxError(_window, config);
    }
    if (config.consoleError) {
      utils.handleConsoleError(_window, config);
    }
  };
  init();
  return {
    log: jsErr.err,
    getBrowser: browser,
  };
})();
