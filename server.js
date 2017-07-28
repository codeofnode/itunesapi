var GLOBAL_VARS = {
  "app": {
    "name": "open-flow",
    "key": "cs",
    "title": "Itunes App",
    "keywords": "itunes api json modular app",
    "description": "A sample application with i-tunes API.",
    "version": "0.0.1"
  },
  "errors": {
    "400": {
      "status": 400,
      "_": "Invalid inputs."
    },
    "404": {
      "status": 404,
      "_": "Invalid request route."
    },
    "405": {
      "status": 405,
      "_": "Method not allowed."
    },
    "408": {
      "status": 408,
      "_": "It taking huge time to evaluate request. Time out. Aborted."
    },
    "500": {
      "status": 500,
      "_": "An unknown error has been occurred. Please contact us at support@example.com"
    },
    "inval": {
      "status": 400,
      "_": "Request parameter was invalid."
    }
  },
  "supportEmail": "support@example.com",
  "defTimeout": 18000,
  "defKey": "_",
  "locale": {
    "en": {
      "mainloading": "loading ...",
      "loadingtimeout": "If it taking too much time, please contact us at support@example.com.",
      "success": "Request was successful.",
      "permdenied": "Permission denied. Please contact your admin."
    }
  }
};
var GLOBAL_APP_CONFIG = {},
  GLOBAL_METHODS = {};
//_ONLY_SERVER
const NodePath = require('path'),
  NodeFs = require('fs');
//_ONLY_SERVER_END
//END_NO_OUT_FILE


GLOBAL_METHODS.assign = (function(GLOBAL_APP_CONFIG, GLOBAL_METHODS) {

  const baseTypes = ['string', 'number', 'boolean', 'undefined'];

  function func(ab, bb, noob) {
    if (typeof ab !== 'object' || !ab) ab = Array.isArray(bb) ? new Array(bb.length) : {};
    if (typeof bb === 'object' && bb) {
      var kys = Object.keys(bb),
        kl = kys.length;
      for (var j = 0; j < kl; j++) {
        if (noob !== true || (baseTypes.indexOf(typeof ab[kys[j]]) !== -1) ||
          (baseTypes.indexOf(typeof bb[kys[j]]) !== -1)) {
          ab[kys[j]] = bb[kys[j]];
        }
      }
    }
    return ab;
  }

  function main() {
    var ln = arguments.length,
      noob = arguments[ln - 1];
    if (noob === true) {
      ln--;
    } else noob = false;
    var no = func(arguments[0], arguments[1], noob);
    for (var j = 2; j < ln; j++) {
      func(no, arguments[j], noob);
    }
    return no;
  }

  return main;
})(GLOBAL_APP_CONFIG, GLOBAL_METHODS);
GLOBAL_METHODS.isAlphaNum = (function(GLOBAL_APP_CONFIG, GLOBAL_METHODS) {
  function func(st) {
    return Boolean(!(/[^A-Za-z0-9]/).test(st));
  }

  return func;
})(GLOBAL_APP_CONFIG, GLOBAL_METHODS);
GLOBAL_METHODS.lastValue = (function(GLOBAL_APP_CONFIG, GLOBAL_METHODS) {

  function loop(inp, key) {
    if (inp !== undefined && inp !== null) {
      return inp[key];
    } else return undefined;
  }

  function func(root) {
    var len = arguments.length,
      now = root,
      moveWith = loop;
    if (len < 1) return undefined;
    if (len === 1) return root;
    var func = arguments[len - 1];
    if (typeof func === 'function') {
      len--;
      moveWith = func;
    }
    for (var z = 1; z < len; z++) {
      now = moveWith(root, arguments[z]);
      if (now === undefined) {
        break;
      } else {
        root = now;
      }
    }
    return now;
  }

  return func;
})(GLOBAL_APP_CONFIG, GLOBAL_METHODS);
GLOBAL_METHODS.makeToLast = (function(GLOBAL_APP_CONFIG, GLOBAL_METHODS) {

  function func(root) {
    var len = arguments.length,
      now = root;
    for (var z = 1; z < len; z++) {
      if (now[arguments[z]] === undefined || now[arguments[z]] === null) {
        now[arguments[z]] = {};
      }
      root = now = now[arguments[z]];
    }
    return now;
  }

  return func;
})(GLOBAL_APP_CONFIG, GLOBAL_METHODS);
GLOBAL_METHODS.objwalk = (function(GLOBAL_APP_CONFIG, GLOBAL_METHODS) {
  if (typeof GLOBAL_APP_CONFIG !== 'object' || GLOBAL_APP_CONFIG === null) GLOBAL_APP_CONFIG = {};
  const maxobjdepth = GLOBAL_APP_CONFIG.maxobjdepth || 99;
  const endvar = GLOBAL_APP_CONFIG.walkendkey || '$W_END';

  let ifEndForObjWalk = GLOBAL_METHODS && GLOBAL_METHODS.ifEndForObjWalk;
  if (typeof ifEndForObjWalk !== 'function') {
    ifEndForObjWalk = function(obj, depth) {
      return ((depth < maxobjdepth && typeof obj === 'object' &&
        obj !== null && obj[endvar] !== true) ? obj : false);
    };
  };

  const walkInto = function(fun, rt, obj, key, depth, isLast) {
    if (!depth) depth = 0;
    fun(obj, key, rt, depth || 0, typeof isLast === 'boolean' ? isLast : true);
    const ob = ifEndForObjWalk(obj, depth);
    if (ob) {
      const kys = Object.keys(ob);
      const lastln = kys.length;
      const deep = depth + 1;
      for (let z = 0; z <= lastln; z += 1) {
        walkInto(fun, ob, ob[kys[z]], kys[z], deep, (z === lastln));
      }
    }
  };

  return walkInto;
})(GLOBAL_APP_CONFIG, GLOBAL_METHODS);
GLOBAL_METHODS.replace = (function(GLOBAL_APP_CONFIG, GLOBAL_METHODS) {
  if (typeof GLOBAL_APP_CONFIG !== 'object' || GLOBAL_APP_CONFIG === null) GLOBAL_APP_CONFIG = {};

  const START_VAR = GLOBAL_APP_CONFIG.startvar || '\{\{',
    END_VAR = GLOBAL_APP_CONFIG.endvar || '\}\}',
    SVAR_L = START_VAR.length,
    EVAR_L = END_VAR.length,
    FUNC_KEY = GLOBAL_APP_CONFIG.functionkey === undefined ? '@' : GLOBAL_APP_CONFIG.functionkey,
    NOT_FOUND_MSG = GLOBAL_APP_CONFIG.notfoundvalue || 'VAR_NOT_FOUND',
    VAR_REG = GLOBAL_APP_CONFIG.variableregex ||
    new RegExp('\(' + START_VAR + '\[a-zA-Z0-9\\$\\.\_\]+' + END_VAR + '\)\+', 'g');
  FUNC_REG = GLOBAL_APP_CONFIG.functionregex ||
    new RegExp('\(' + START_VAR + '\[a-zA-Z0-9\_\]+\\(\.\*\?\\)' + END_VAR + '\)\+', 'g');

  const WALK_INTO = GLOBAL_METHODS.objwalk,
    IS_ALPHA_NUM = GLOBAL_METHODS.isAlphaNum,
    ASSIGN = GLOBAL_METHODS.assign;

  function isWithVars(st) {
    if (st && typeof st === 'string' && st.length > (END_VAR.length + START_VAR.length)) {
      var f = st.indexOf(START_VAR),
        l = st.indexOf(END_VAR);
      return (f !== -1 && l !== -1) ? [f, l] : false;
    } else return false;
  }

  function handleFunction(inp, vars, methods) {
    if (typeof inp === 'object' && inp && FUNC_KEY) {
      if (typeof methods === 'object' && (typeof inp[FUNC_KEY] === 'string') &&
        IS_ALPHA_NUM(inp[FUNC_KEY]) && (typeof methods[inp[FUNC_KEY]] === 'function')) {
        var pms = (typeof inp.params === 'object' && inp.params !== null) ? ASSIGN(false, inp.params) : inp.params;
        var params = mainReplace(pms, vars, methods);
        if (!(Array.isArray(params))) {
          params = [params];
        }
        params.unshift(vars, methods);
        return methods[inp[FUNC_KEY]].apply(null, params);
      }
    }
    return inp;
  }

  function _noUndefined(st, def) {
    return st === undefined ? def : st;
  }

  function getVarVal(varVal, varName, variablesMap) {
    if (variablesMap.hasOwnProperty(varName)) {
      return variablesMap[varName];
    }
    if (varName.indexOf('.') !== -1) {
      var spls = varName.split('.'),
        ln = spls.length,
        valFound = true;
      if (ln) {
        var base = getVarVal(spls[0], spls[0], variablesMap),
          curVal;
        for (var j = 1; j < ln; j++) {
          if (spls[j].length) {
            if (typeof base === 'object') {
              curVal = (spls[j] === '$' && Array.isArray(base)) ?
                getVarVal(spls[j], spls[j], variablesMap) : spls[j];
              try {
                base = base[curVal];
              } catch (er) {
                valFound = false;
              }
            } else {
              valFound = false;
            }
          }
        }
        if (valFound) {
          return _noUndefined(base, varVal);
        }
      }
    }
    return variablesMap.hasOwnProperty(varName) ? variablesMap[varName] : _noUndefined(varVal);
  }

  function replaceVariable(str, varName, varValue) {
    if (str === varName) return varValue;
    var strType = typeof varValue === "string",
      ln = str.length;
    var patt = (strType || (str.indexOf(START_VAR) !== 0 || str.indexOf(END_VAR) !== (ln - EVAR_L))) ? varName : '"' + varName + '"';
    var rValue = strType ? varValue : JSON.stringify(varValue);
    return str.replace(patt, function() {
      return rValue;
    });
  }

  function extractVarName(variable) {
    return variable.substring(SVAR_L, variable.length - EVAR_L);
  }

  function replaceVariables(str, vars, variablesMap, methodsMap) {
    var varName, replaced, res, ren, wasString;
    for (var i = 0; i < vars.length; i++) {
      varName = extractVarName(vars[i]);
      replaced = getVarVal(vars[i], varName, variablesMap, methodsMap);
      if (replaced !== vars[i]) {
        wasString = typeof replaced === 'string';
        replaced = mainReplace(replaced, variablesMap, methodsMap);
        if (wasString && typeof replaced !== 'string') replaced = JSON.stringify(replaced);
      }
      str = replaceVariable(str, vars[i], replaced);
    }
    return str;
  }

  function extractVars(str) {
    var ar = str.match(VAR_REG) || [],
      ln = ar.length;
    for (var zi = 0, sps, sl; zi < ln; zi++) {
      if (ar[zi].indexOf(END_VAR + START_VAR) !== -1) {
        sps = ar[zi].split(END_VAR + START_VAR);
        sl = sps.length;
        for (var zj = 0; zj < sl; zj++) {
          if (zj) {
            if (zj === sl - 1) {
              sps[zj] = START_VAR + sps[zj];
            } else {
              sps[zj] = START_VAR + sps[zj] + END_VAR;
            }
          } else {
            sps[zj] += END_VAR;
          }
        }
        ar.splice.bind(ar, zi, 1).apply(ar, sps);
        ln += sl - 1;
        zi += sl - 1;
      }
    }
    return ar;
  }

  function extractMethods(str) {
    return str.match(FUNC_REG) || [];
  }

  function extractMethodName(methodDec) {
    return methodDec.substring(SVAR_L, methodDec.indexOf('('));
  }

  function extractParameters(str, methodName) {
    var ar = [];
    if (typeof str === 'string' && str.length) {
      var chars = str.split(','),
        cl = chars.length;
      var pushInto = function(n) {
        chars[n] = chars[n].trim();
        var len = chars[n].length;
        if (len >= 2 && ((chars[n].charAt(0) === "'" && chars[n].charAt(len - 1) === "'") ||
            (chars[n].charAt(0) === '"' && chars[n].charAt(len - 1) === '"'))) {
          chars[n] = '"' + chars[n].substring(1, len - 1).replace(/\"/g, '\\"') + '"';
        }
        try {
          ar.push(JSON.parse(chars[n]));
        } catch (er) {
          ar.push(undefined);
        }
      };
      for (var di, si, eg, fg, n = 0; n < cl; n++) {
        eg = chars[n].charAt(0);
        fg = chars[n].charAt(chars[n].length - 1);
        if (!(eg === fg && (eg === '"' || eg === "'"))) {
          chars[n] = chars[n].trim();
          eg = chars[n].charAt(0);
          fg = chars[n].charAt(chars[n].length - 1);
        }
        di = chars[n].indexOf('"');
        si = chars[n].indexOf("'");
        if (((si === -1) && (di === -1)) || (eg === fg && (eg === '"' || eg === "'")) ||
          (chars[n].charAt(0) === "{" && chars[n].charAt(chars[n].length - 1) === "}" &&
            (chars[n].match(/\{/g).length === chars[n].match(/\}/g).length)) ||
          (chars[n].charAt(0) === "[" && chars[n].charAt(chars[n].length - 1) === "]" &&
            (chars[n].match(/\[/g).length === chars[n].match(/\]/g).length))) {
          pushInto(n);
        } else if (n < (cl - 1)) {
          chars[n] = chars[n] + ',' + chars[n + 1];
          chars.splice(n + 1, 1);
          n--;
          cl--;
          continue;
        }
      }
    }
    return ar;
  }

  function extractMethodParams(methodDec, methodName) {
    var baseDec = methodDec.substring(methodName.length + SVAR_L + 1, methodDec.length - (EVAR_L + 1)).trim();
    return extractParameters(baseDec, methodName);
  }

  function invokeMethod(method, params, methodName, methodsMap) {
    try {
      return method.apply(methodsMap, params);
    } catch (eri) {
      return 'HANDLER_ERROR';
    }
  }

  function getMethodValue(methodDec, methodName, method, methodsMap) {
    var methodParams = extractMethodParams(methodDec, methodName);
    return invokeMethod(method, methodParams, methodName, methodsMap);
  }

  function replaceMethod(str, methodDec, methodName, method, methodsMap) {
    var methodValue = getMethodValue(methodDec, methodName, method, methodsMap);
    if (str === methodDec) return methodValue;
    return str.replace(methodDec, function() {
      return methodValue;
    });
  }

  function replaceMethods(str, methods, methodsMap) {
    var methodName = "";
    for (var i = 0; i < methods.length; i++) {
      methodName = extractMethodName(methods[i]);
      if (typeof methodsMap[methodName] === 'function') {
        str = replaceMethod(str, methods[i], methodName, methodsMap[methodName], methodsMap);
      }
    }
    return str;
  }

  function replaceString(input, vars, methods) {
    var str;
    while (typeof input === 'string' && str != input) {
      str = input;
      input = replaceVariables(input, extractVars(input), vars, methods);
    }
    if (typeof input !== 'string') return input;
    return replaceMethods(input, extractMethods(input), methods);
  }

  function mainReplace(input, vars, methods) {
    if (typeof input !== 'object' || !input) {
      return replaceString(input, vars, methods);
    }
    input = handleFunction(input, vars, methods);
    WALK_INTO(function(valn, key, rt) {
      if (typeof rt === 'object' && rt && typeof rt.hasOwnProperty === 'function' && rt.hasOwnProperty(key)) {
        var val = rt[key],
          tmpKy = null,
          isth = isWithVars(key);
        if (isth) {
          tmpKy = replaceString(key, vars, methods);
          if (tmpKy !== key) {
            val = rt[tmpKy] = rt[key];
            delete rt[key];
          }
        }
        if (typeof val === 'string' && val) {
          isth = isWithVars(val);
          if (isth) {
            rt[tmpKy || key] = replaceString(val, vars, methods);
          }
        } else {
          rt[tmpKy || key] = handleFunction(val, vars, methods);
        }
      }
    }, null, input);
    return input;
  }

  return mainReplace;
})(GLOBAL_APP_CONFIG, GLOBAL_METHODS);
GLOBAL_METHODS.resolveSlash = (function(GLOBAL_APP_CONFIG, GLOBAL_METHODS) {

  function func(url, ls, rm) {
    if (typeof url === 'string') {
      if (ls) {
        if (rm) {
          url = url.endsWith('/') ? url.slice(0, -1) : url
        } else {
          url = url.endsWith('/') ? url : (url + '/')
        }
      } else {
        if (rm) {
          url = (url.charAt(0) === '/') ? url.slice(1) : url;
        } else {
          url = (url.charAt(0) === '/') ? url : ('/' + url);
        }
      }
    }
    return url;
  }

  return func;
})(GLOBAL_APP_CONFIG, GLOBAL_METHODS);
GLOBAL_METHODS.stringify = (function(GLOBAL_APP_CONFIG, GLOBAL_METHODS) {

  function func(st, pretty) {
    if (typeof st !== 'string') {
      if (typeof st === 'object') {
        try {
          st = pretty ? JSON.stringify(st, null, '  ') : JSON.stringify(st);
        } catch (er) {
          st = String(st);
        }
      } else {
        st = String(st);
      }
    }
    return st;
  }

  return func;
})(GLOBAL_APP_CONFIG, GLOBAL_METHODS);
GLOBAL_METHODS.parsePayload = (function(GLOBAL_APP_CONFIG, GLOBAL_METHODS) {

  const QS = require('querystring');

  const PARSE = function(data, hdr) {
    let parser = JSON;
    if (hdr.indexOf('form-urlencoded') !== -1) {
      parser = QS;
    }
    try {
      return parser.parse(data)
    } catch (er) {
      return data;
    }
  };

  function func(vars, req) {
    const prs = vars.body;
    if (req.uponParse && typeof prs === 'object' && prs !== null && Object.keys(prs).length === 0) {
      let data = '';
      req.on('data', function(chk) {
        data += chk
      });

      function onceOver() {
        vars.body = data ? PARSE(data, GLOBAL_METHODS.lastValue(req, 'headers', 'content-type')) : {};
        req.uponParse = false;
        req.emit('body-parsed');
      };
      req.once('end', onceOver);
      req.once('error', onceOver);
    }
  }

  return func;

})(GLOBAL_APP_CONFIG, GLOBAL_METHODS);
GLOBAL_METHODS.request = (function(GLOBAL_APP_CONFIG, GLOBAL_METHODS) {

  function isObject(ob) {
    return typeof ob === 'object' && ob !== null && !(Array.isArray(ob));
  }

  var http = require('http'),
    https = require('https'),
    fs = require('fs'),
    urlp = require('url');

  function func(options, cb) {
    var url, method, payload, headers, parser;
    if (typeof cb !== 'function') {
      cb = function() {};
    }
    if (typeof options === 'string') {
      url = options;
      method = 'GET';
      parser = JSON.parse;
    } else if (isObject(options)) {
      url = options.url;
      method = options.method;
      payload = options.payload;
      headers = options.headers;
      parser = typeof options.parser === 'function' ? options.parser : JSON.parse;
    } else {
      return cb('INVALID_OPTIONS');
    }
    if (typeof url !== 'string' || !url.length) {
      return cb('URL_NOT_FOUND');
    }
    if (typeof method !== 'string' || !method.length) {
      return cb('METHOD_NOT_FOUND');
    }
    var contFound = false,
      obj = urlp.parse(url);
    obj.method = method;
    if (typeof headers !== 'object' || headers === null) {
      headers = {};
    }
    for (var key in headers) {
      if (key.toLowerCase() === 'content-type') {
        contFound = true;
        break;
      }
    }
    if (!contFound) {
      headers['content-type'] = 'application/json';
    }
    obj.headers = headers;
    var req = (obj.protocol === 'https:' ? https : http).request(obj, function(res) {
      var resc = '';
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        resc += chunk;
      });

      function respond() {
        var toSend = {
          statusCode: res.statusCode,
          headers: res.headers,
          content: resc
        };
        if (typeof parser === 'function') {
          try {
            toSend.parsed = parser(resc);
          } catch (er) {
            toSend.parseError = er;
          }
        }
        if (typeof toSend.statusCode === 'number' && Math.floor((toSend.statusCode / 100)) === 2) {
          cb(null, toSend);
        } else {
          cb(toSend);
        }
      }
      res.on('error', respond);
      res.on('end', respond);
    });
    req.once('error', function(er) {
      return cb('ERROR_WHILE_REQUEST:' + (er.message || er));
    });
    if (payload !== undefined) {
      payload = GLOBAL_METHODS.stringify(payload);
      req.end(payload);
    } else if (options.payloadStream instanceof fs.ReadStream) {
      var mo = (isObject(options.multipartOptions) ? options.multipartOptions : {});
      if (!(mo.boundaryKey)) {
        mo.boundaryKey = Math.random().toString(16).substr(2, 11);
      }
      req.setHeader('content-type', 'multipart/form-data; boundary="----' + mo.boundaryKey + '"');
      if (mo.contentLength) {
        req.setHeader('Content-Length', mo.contentLength);
      }
      if (isObject(mo.formData)) {
        Object.keys(mo.formData).forEach(function(formKey) {
          var formValue = mo.formData[formKey];
          req.write('------' + mo.boundaryKey + '\r\nContent-Disposition: form-data; name="' + formKey + '"\r\n\r\n' + formValue + '\r\n');
        });
      }
      req.write('------' + mo.boundaryKey + '\r\nContent-Type: ' + (mo.mimeType || 'application/octet-stream') + '\r\nContent-Disposition: form-data; name="' + (mo.fieldName || 'file1') + '"; filename="' + (mo.fileName || 'filename') + '"\r\n\r\n');
      options.payloadStream.pipe(req, {
        end: false
      });
      options.payloadStream.once('end', req.end.bind(req, '\r\n------' + mo.boundaryKey + '--\r\n'));
      options.payloadStream.once('error', function(er) {
        return cb('ERROR_WITH_FILE_STREAM:' + (er.message || er));
      });
    } else {
      req.end();
    }
    return req;
  }

  return func;
})(GLOBAL_APP_CONFIG, GLOBAL_METHODS);

//CLIENT_METHODS_BLOCK


const SERVER = (function(GLOBAL_APP_CONFIG, GLOBAL_METHODS) {
    function server(inputHandler, httpsConfig, GLOBAL_API) {
      function handler(req, res) {
        req.parsedUrl = require('url').parse(req.url, true);
        inputHandler(req, res);
      }
      if (GLOBAL_APP_CONFIG.url) {
        var url = GLOBAL_APP_CONFIG.url,
          method = 'GET',
          mind = url.indexOf('@/');
        if (mind > 2 && mind < 10) {
          method = url.substring(0, mind);
          url = url.substring(mind + 1);
        }
        var req = new(require('events'))();
        req.method = method;
        req.url = url;
        var HTTP = require('http');
        var resp = new HTTP.ServerResponse(req);
        var _end = resp.end.bind(resp);
        resp.end = function(content) {
          console.log(method + ' => ' + url);
          console.log('Status : ' + resp.statusCode + ' (' + HTTP.STATUS_CODES[resp.statusCode] + ')' + '\n');
          console.log('Headers : \n' + GLOBAL_METHODS.stringify(resp.getHeaders()) + '\n');
          console.log('Content : \n' + GLOBAL_METHODS.stringify(content));
          _end.apply(this, arguments);
          process.exit((resp.statusCode > 199 && resp.statusCode < 400) ? 0 : 1);
        };
        handler(req, resp);
        if (method !== 'GET') req.emit('end');
      } else {
        var isHttps = typeof httpsConfig === 'object' && httpsConfig,
          mod = isHttps ? require('https') : require("http"),
          port = process.env.PORT || GLOBAL_APP_CONFIG.port || 3000;

        var server = isHttps ? mod.createServer(httpsConfig, handler) : mod.createServer(handler);
        server.listen(parseInt(port, 10), function() {
          var onReady = GLOBAL_METHODS.lastValue(GLOBAL_API, 'root', '_methods', 'onReady');
          if (typeof onReady === 'function') {
            onReady();
          }
        });

        console.log("Server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");
      }
    };

    return server;
  }),
  HANDLER = (function(GLOBAL_APP_CONFIG, GLOBAL_METHODS, GLOBAL_VARS, GLOBAL_API) {
    const IS_ALPHA_NUM = GLOBAL_METHODS.isAlphaNum;
    const S_VARS = JSON.stringify(GLOBAL_VARS);
    var PARSEABLE = (GLOBAL_APP_CONFIG.autoparse !== false) ? ['POST', 'PUT', 'PATCH', 'DELETE'] : [];

    function fromSource(src, after) {
      if (typeof src === 'string' && src.indexOf('http') === 0) {
        GLOBAL_METHODS.request(src, function(er, obj) {
          if (er) after(er.parsed || er);
          else after(null, obj.parsed);
        });
      } else {
        if (!Array.isArray(src)) {
          src = [src];
        }
        after(null, src);
      }
    }

    function getNewVars() {
      var rvars = JSON.parse(S_VARS);
      if (typeof rvars.params !== 'object' || rvars.params === null) rvars.params = {};
      if (typeof rvars.params.path !== 'object' || rvars.params.path === null) rvars.params.path = {};
      if (typeof rvars.params.query !== 'object' || rvars.params.query === null) rvars.params.query = {};
      if (typeof rvars.params.body !== 'object' || rvars.params.body === null) rvars.params.body = {};
      if (typeof rvars.params.header !== 'object' || rvars.params.header === null) rvars.params.header = {};
      if (!(Array.isArray(rvars.params.file))) rvars.params.file = [];
      return rvars;
    }

    function register(ob, req, ev, call, modev) {
      if (typeof ev !== 'string') return;
      ev = ev.trim();
      if (!ev.length) return;
      if (typeof modev === 'function') ev = modev(ev);
      req.on(ev, call);
    }

    var onceOrParsed = function(req, rvars, pre, func) {
      if (req.uponParse || (typeof pre === 'string')) {
        req.once(typeof pre === 'string' ? pre : 'body-parsed', func);
        return true;
      } else {
        return false;
      }
    };

    var forOneObj = function(rq, rs, rvars, methods, ob, ks) {
      if (rs.finished) return;
      if (!ob) return false;
      GLOBAL_METHODS.assign(rvars, ob._vars);
      GLOBAL_METHODS.assign(methods, ob._methods);
      var kys = (ks || Object.keys(ob).sort()),
        kl = kys.length;
      var res = {};
      for (var ky, vl, z = 0; z < kl; z++) {
        ky = kys[z];
        vl = ob[ky];
        if (vl === undefined) continue;
        switch (ky) {
          case '*':
            if (String(GLOBAL_METHODS.replace(vl, rvars, methods) === 'false')) {
              rq.notFound = true;
            }
            break;
          case '+':
            var pluskeys = Object.keys(vl),
              pl = pluskeys.length;

            function cl(ky, dt, ifv) {
              if (ifv === undefined || doEval(rq, rs, rvars, methods, ifv)) {
                rvars[ky] = evaluate(rq, rs, rvars, methods, dt);
              }
            }
            for (var n = 0; n < pl; n++) {
              cl(pluskeys[n], vl[pluskeys[n]], vl[pluskeys[n]].if);
              if (typeof vl[pluskeys[n]].on === 'string' && vl[pluskeys[n]].on.length) {
                evaluate(rq, rs, rvars, methods, vl[pluskeys[n]].on).split(',').forEach(function(ev) {
                  register(vl[pluskeys[n]], rq, ev, cl.bind(null, pluskeys[n], vl[pluskeys[n]], vl[pluskeys[n]].if));
                });
              }
            }
            break;
          case '=':
            var pass = true;
            var assertions = Array.isArray(vl) ? vl : [],
              al = assertions.length;
            for (var n = 0; n < al; n++) {
              if (typeof vl[n] === 'string' && vl[n]) {
                vl[n] = {
                  "eval": vl[n]
                };
              }
              if (typeof vl[n] === 'object' && vl[n]) {
                var ch = function(vl1, vl2, ps) {
                  if (!vl2) vl2 = getErrorWithStatusCode(rvars, 'inval');
                  if (rs.finished) return;
                  if (ps) {
                    var er = doEval(rq, rs, rvars, methods, vl1) !== false;
                    if (!ps || !er) {
                      ps = false;
                      sendNow(rvars.defKey, rq, rs, evaluate(rq, rs, rvars, methods, vl2), 400);
                    }
                  } else {
                    ps = false;
                    sendNow(rvars.defKey, rq, rs, evaluate(rq, rs, rvars, methods, vl2), 400);
                  }
                  return ps;
                };
                var bth = function(vls, ps) {
                  if (rs.finished) return;
                  if (typeof vls.eval === 'string' && vls.eval) {
                    ps = ps && ch(vls.eval, vls.ifFailed, ps);
                  }
                  if (typeof vls['@'] === 'string' && typeof methods[vls['@']] === 'function') {
                    ps = ps && ch(vls, vls.ifFailed, ps);
                  }
                  return ps;
                };
                if (onceOrParsed(rq, rvars, vl[n].once, bth.bind(null, vl[n], pass))) {
                  continue;
                } else {
                  if (bth(vl[n], pass) === false) {
                    return 0;
                  }
                }
              }
            }
            break;
          default:
            if (typeof vl === 'object' && ky.indexOf('$') === -1) {
              var vr = ky.charAt(0) === ':';
              if (vr) {
                ky = ky.substring(1);
              }
              if (IS_ALPHA_NUM(ky)) {
                if (vr) {
                  res['$'] = ky;
                  GLOBAL_METHODS.assign(ob[':' + ky], ob[ky]);
                  delete ob[ky];
                }
                res[ky] = vl;
              }
            }
            break;
        }
      }
      var kys = Object.keys(res);
      if (kys.length) {
        if (res.hasOwnProperty('$')) {
          return [res, kys, res['$']];
        } else {
          return [res, kys];
        }
      }
      return false;
    };

    function doEval(req, res, rvars, methods, obj, bool, nocall) {
      var ret = obj,
        valn = evaluate(req, res, rvars, methods, ret);
      if (typeof ret === 'string' && nocall !== true) {
        if (typeof valn === 'string' && valn.indexOf('{{') !== -1 && valn.indexOf('}}') !== -1) {
          return false;
        }
        return Boolean(valn);
      }
      if (GLOBAL_APP_CONFIG.evalenabled === true) {
        try {
          ret = eval(nocall ? obj : valn);
        } catch (erm) {
          if (bool) return false;
        }
      } else {
        ret = valn
      }
      return bool ? Boolean(ret) : ret;
    }

    function rectify(obj, rvars, methods) {
      var ob;
      if (typeof obj === 'object' && obj !== null) {
        ob = GLOBAL_METHODS.assign(undefined, obj);
      } else {
        ob = obj;
      }
      ob = GLOBAL_METHODS.replace(ob, rvars, methods);
      return ob;
    }

    function getErrorWithStatusCode(rvars, key, statusCode) {
      var snd = GLOBAL_METHODS.lastValue(rvars, 'errors', key);
      if (!snd) {
        snd = {};
        var defKey = rvars.defKey || '_';
        switch (statusCode || key) {
          case '405':
            snd[defKey] = 'METHOD_NOT_FOUND';
            snd.status = 405;
            break;
          case '404':
            snd[defKey] = 'ROUTE_NOT_FOUND';
            snd.status = 404;
            break;
          case '408':
            snd[defKey] = 'TIMEOUT';
            snd.status = 408;
            break;
          default:
            snd[defKey] = 'INVALID_INPUT';
            snd.status = 400;
        }
      }
      return snd;
    }

    function evaluate(req, res, rvars, methods, obj, next) {
      if (res.finished) return;
      var isAsync = typeof next === 'function',
        isFunc = false,
        pms = [];
      if (obj && typeof obj['@'] === 'string') {
        isFunc = obj['@'];
        if (typeof methods[isFunc] !== 'function') {
          isFunc = GLOBAL_METHODS.replace(obj['@'], rvars, methods);
        }
        if (typeof methods[isFunc] === 'function') {
          if (obj['params'] === undefined) {
            obj['params'] = [];
          } else if (!(Array.isArray(obj['params']))) {
            obj['params'] = [obj['params']];
          }
          pms = GLOBAL_METHODS.assign(false, obj['params']);
          pms.unshift(res);
          pms.unshift(req);
        } else {
          isFunc = false;
        }
      } else if (typeof obj === 'object' && obj['#val'] !== undefined) {
        obj = obj['#val'];
      }
      if (isAsync) {
        methods.async = function() {
          return next;
        };
      }
      if (typeof isFunc !== 'string' || !isFunc) {
        isFunc = false;
      }
      if (isAsync) {
        if (isFunc) {
          pms.push({
            '@': 'async'
          });
          GLOBAL_METHODS.replace({
            '@': isFunc,
            'params': pms
          }, rvars, methods);
        } else {
          next(rectify(obj, rvars, methods));
        }
      } else {
        var ob;
        if (isFunc) {
          ob = {
            '@': isFunc,
            'params': pms
          };
          ob = GLOBAL_METHODS.replace(ob, rvars, methods);
        } else {
          ob = rectify(obj, rvars, methods);
        }
        return ob;
      }
    }

    function sendNow(defKey, req, res, val, st) {
      if (res.finished) return;
      req.removeAllListeners();
      if (val === undefined || val === null) {
        val = 'SUCCESS';
      }
      if (typeof val !== 'object') {
        var nw = {};
        if (typeof val === 'number' && val > 99 && val < 600) {
          nw.status = parseInt(val);
          val = (st === undefined) ? 'SUCCESS' : st;
        }
        nw[defKey || '_'] = val;
        val = nw;
      }
      res.statusCode = val.status || st || 200;
      delete val.status;
      res.setHeader('Content-Type', 'application/json');
      var vl = res.exitGate(val);
      if (vl !== undefined) {
        val = vl;
      }
      res.end(GLOBAL_METHODS.stringify(val));
    }

    function resp(method, curr, req, res, rvars, methods) {
      if (res.finished) return;
      var next = sendNow.bind(null, rvars.defKey, req, res);
      var evaling = function(ml) {
        var af = function(dt, num, noev) {
          var nxt = next;
          if (res.finished) return;
          if (dt !== undefined) rvars.currentData = dt;
          return evaluate(req, res, rvars, methods, ml, nxt);
        };
        var afterFrom = function() {
          forOneObj(req, res, rvars, methods, ml, ['+', '=']);
          if (ml.from !== undefined) {
            var directRespond = !(ml['@']);
            fromSource(evaluate(req, res, rvars, methods, ml.from), function(er, data) {
              if (directRespond) {
                next(evaluate(req, res, rvars, methods, er || data), er ? 400 : 200);
              } else if (er || !data) {
                af(er || 'Record not found.', 400);
              } else {
                af(data);
              }
            });
          } else {
            return af();
          }
        };
        if (!(onceOrParsed(req, rvars, (ml && ml.once), afterFrom))) {
          return afterFrom();
        }
      };
      var toEval = function(type) {
        if (curr[type]) {
          evaling(curr[type]);
          return true;
        } else {
          return false;
        }
      };
      var notFoundCode = '404';
      if (['$', '>', 'GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS', 'PUT'].indexOf(method) !== -1) {
        if (typeof rvars.timeout === 'number') {
          setTimeout(function() {
            evaling(getErrorWithStatusCode(rvars, '408'));
          }, rvars.timeout);
        }
        switch (method) {
          case '$':
            if (curr) return evaling(curr);
            else break;
          case 'POST':
          case 'PATCH':
          case 'PUT':
          case 'DELETE':
          case 'OPTIONS':
            if (toEval('$' + method.toLowerCase())) {
              return;
            } else {
              break;
            }
          case 'GET':
            var nw = curr['$'] || curr['$get'];
            if (nw) {
              var isAny = false,
                kn = nw['$>'];
              if (kn) {
                kn = evaluate(req, res, rvars, methods, kn);
                isAny = (Object.keys(curr).filter(function(ab) {
                  return ab.charAt(0) === ':';
                }).length > 0);
              }
              if (typeof kn === 'string' && (curr[kn] || isAny)) {
                return resp(method, curr[kn], req, res, rvars, methods);
              } else {
                return evaling(nw);
              }
            } else {
              break;
            }
          case '>':
            if (curr['>']) {
              return evaling(curr['>']);
            }
            break;
        }
        notFoundCode = '405';
      }
      evaling(getErrorWithStatusCode(rvars, notFoundCode));
    }

    const MIME_TYPE = {
      html: 'text/html',
      txt: 'text/plain',
      css: 'text/css',
      gif: 'image/gif',
      jpg: 'image/jpeg',
      png: 'image/png',
      svg: 'image/svg+xml',
      js: 'application/javascript'
    };
    var staticServer = false;
    const nodePath = require('path'),
      nodeFs = require('fs');

    function stServer(pth) {
      try {
        nodeFs.accessSync(pth, nodeFs.constants.R_OK);
      } catch (err) {
        console.log(' >>>> Static path not available for static server.');
        console.log(err);
        return;
      }
      this.staticDir = pth;
    }

    stServer.prototype.serve = function(req, res, cb) {
      var reqpath = req.url.toString().split('?')[0];
      if (req.method !== 'GET') {
        res.statusCode = 501;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Method not implemented');
      }
      var file = nodePath.join(this.staticDir, reqpath.replace(/\/$/, '/index.html'));
      if (file.indexOf(this.staticDir + nodePath.sep) !== 0) {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Forbidden');
      }
      var type = MIME_TYPE[nodePath.extname(file).slice(1)] || 'text/plain';
      var st = nodeFs.createReadStream(file);
      st.on('open', function() {
        res.setHeader('Content-Type', type);
        st.pipe(res);
      });
      st.on('error', function() {
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 404;
        res.end('Not found');
      });
    }

    if (typeof GLOBAL_APP_CONFIG.staticdir === 'string') {
      staticServer = new stServer(GLOBAL_APP_CONFIG.staticdir);
      if (!staticServer || !staticServer.staticDir) {
        staticServer = false;
      }
    }

    function serveStatic(req, res) {
      staticServer.serve(req, res);
    }

    function handler(req, res) {
      req['$W_END'] = true;
      res['$W_END'] = true;
      var parsed = req.parsedUrl,
        curr, vl, notFound = false,
        pthn = parsed.pathname || '';
      var rvars = getNewVars(),
        methods = {};
      rvars.params.query = parsed.query;
      GLOBAL_METHODS.assign(methods, GLOBAL_METHODS);
      if (typeof GLOBAL_APP_CONFIG.mountpath === 'string') {
        if (pthn.indexOf(GLOBAL_APP_CONFIG.mountpath) !== 0) {
          return resp(false, curr, req, res, rvars, methods);
        } else {
          pthn = GLOBAL_METHODS.resolveSlash(pthn.substring(GLOBAL_APP_CONFIG.mountpath.length));
        }
      }
      var paths = pthn.substring(1).split('/'),
        pl = paths.length;
      if (staticServer && paths[pl - 1].indexOf('.') !== -1) {
        return serveStatic(req, res);
      }
      req.once('respondNow', function(vlm, st) {
        sendNow(rvars.defKey, req, res, evaluate(req, res, rvars, methods, vlm), st);
      });
      curr = forOneObj(req, res, rvars, methods, GLOBAL_API.root), vl = GLOBAL_API.root;
      var exitGate = GLOBAL_METHODS.lastValue(GLOBAL_API.root, '_methods', 'exitGate');
      res.exitGate = typeof exitGate === 'function' ? exitGate.bind(res, rvars, methods, req, res) : function() {};
      var method = req.method,
        notFound = GLOBAL_METHODS.lastValue.apply(undefined, [GLOBAL_APP_CONFIG].concat(paths.concat(['enable']))) === false;
      if (PARSEABLE.indexOf(method) !== -1) {
        req.uponParse = true;
      }
      if (paths[0] === '') {
        if (req.uponParse) {
          methods.parsePayload(rvars.params, req);
        }
      } else if (!(notFound)) {
        for (var prk, z = 0; z < pl; z++) {
          prk = paths[z];
          if (prk === '') {
            method = '>';
            break;
          }
          if (curr) {
            if (curr[1].indexOf(prk) !== -1) {
              vl = curr[0][prk];
            } else if (curr[2]) {
              rvars.params.path[curr[2]] = prk;
              prk = curr[2];
              vl = curr[0][prk];
            } else {
              vl = false;
              notFound = true;
              break;
            }
            if (z === pl - 1 && req.uponParse) {
              methods.parsePayload(rvars.params, req);
            }
            curr = forOneObj(req, res, rvars, methods, vl);
            if (curr === 0) {
              return;
            } else if (req.notFound === true) {
              vl = false;
              curr = false;
              notFound = true;
              break;
            }
          } else {
            vl = false;
            notFound = true;
            break;
          }
        }
      }
      var nf = true,
        vlk = Object.keys(vl),
        vlkl = vlk.length;
      for (var z = 0; z < vlkl; z++) {
        if (vlk[z].charAt(0) === '$' || vlk[z].charAt(0) === '>') {
          nf = false;
          break;
        }
      }
      resp(((notFound || nf) ? false : method), vl, req, res, rvars, methods);
    };

    return handler;
  }),
  ENGINE = SERVER(GLOBAL_APP_CONFIG, GLOBAL_METHODS);

function func(CONFIG_PATH, JSON_PATH, ROOT_DIR_PATH, GLOBAL_VARS, GLOBAL_API) {
  const ASSIGN = GLOBAL_METHODS.assign,
    REPL = GLOBAL_METHODS.replace,
    lastValue = GLOBAL_METHODS.lastValue,
    N_REG = GLOBAL_METHODS.isAlphaNum;
  //END_NO_OUT_FILE
  var MAINS = {},
    fromConfigReq = {},
    fromJsonReq = {},
    httsConfig = false;
  //END_NOT_IN_FILE
  //_ONLY_SERVER
  if (typeof GLOBAL_APP_CONFIG.httsConfig === 'object' &&
    GLOBAL_APP_CONFIG.httsConfig !== null && (!Array.isArray(GLOBAL_APP_CONFIG.httsConfig))) {
    if (typeof GLOBAL_APP_CONFIG.httsConfig.key === 'string') {
      httsConfig.key = NodeFs.readFileSync(GLOBAL_APP_CONFIG.httsConfig.key);
    }
    if (typeof GLOBAL_APP_CONFIG.httsConfig.cert === 'string') {
      httsConfig.cert = NodeFs.readFileSync(GLOBAL_APP_CONFIG.httsConfig.cert);
    }
    if (typeof GLOBAL_APP_CONFIG.httsConfig.pfx === 'string') {
      httsConfig.pfx = NodeFs.readFileSync(GLOBAL_APP_CONFIG.httsConfig.pfx);
    }
    if (typeof GLOBAL_APP_CONFIG.httsConfig.passphrase === 'string') {
      httsConfig.passphrase = NodeFs.readFileSync(GLOBAL_APP_CONFIG.httsConfig.passphrase);
    }
  }
  delete GLOBAL_APP_CONFIG.httsConfig;
  //_ONLY_SERVER_END
  if ((typeof GLOBAL_VARS === 'object' && GLOBAL_VARS !== null && !(Array.isArray(GLOBAL_VARS))) &&
    (typeof GLOBAL_API === 'object' && GLOBAL_API !== null && !(Array.isArray(GLOBAL_API)))) {} else {
    //END_NOT_IN_FILE
  }


  function start(hndlr, hc) {
    ENGINE((hndlr || HANDLER)(GLOBAL_APP_CONFIG, GLOBAL_METHODS, GLOBAL_VARS, GLOBAL_API), (hc || httsConfig), GLOBAL_API);
  }

  var onLoad = GLOBAL_METHODS.lastValue(GLOBAL_API, 'root', '_methods', 'onLoad');
  if (typeof onLoad === 'function') {
    onLoad();
  }
  start.api = GLOBAL_API;
  start.config = GLOBAL_APP_CONFIG;
  return start;
}
//END_NO_OUT_FILE
var GLOBAL_API = {
  "root": {
    "$": {
      "@": "renderPage"
    },
    "api": {
      "+": {
        "loc": "en"
      },
      "search": {
        "$": {
          "@": "searchArtists"
        }
      }
    },
    ":search": {
      "$": {
        "@": "renderPage"
      }
    }
  }
};
GLOBAL_METHODS.assign(GLOBAL_APP_CONFIG, {
  "staticdir": "static",
  "dbConfig": {}
});
GLOBAL_METHODS.makeToLast(GLOBAL_API.root, '_methods', 'AppPostman');
GLOBAL_API.root._methods.AppPostman = (function(GLOBAL_APP_CONFIG, GLOBAL_METHODS, GLOBAL_VARS, GLOBAL_API) {

  const EventEmitter = require('events');

  class Postman extends EventEmitter {}

  GLOBAL_APP_CONFIG.postman = new Postman();

  function func(vars, methods, req, res) {}

  func();

  return func;

})(GLOBAL_APP_CONFIG, GLOBAL_METHODS, GLOBAL_VARS, GLOBAL_API);
GLOBAL_METHODS.makeToLast(GLOBAL_API.root, '_methods', 'exitGate');
GLOBAL_API.root._methods.exitGate = (function(GLOBAL_APP_CONFIG, GLOBAL_METHODS) {
  function func(vars, methods, req, res, data) {
    var acc = methods.lastValue(req.headers, 'accept');
    if (typeof acc === 'string' && acc.indexOf('html') !== -1) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return data[vars.defKey];
    }
  }

  return func;
})(GLOBAL_APP_CONFIG, GLOBAL_METHODS, GLOBAL_VARS, GLOBAL_API);
GLOBAL_METHODS.makeToLast(GLOBAL_API.root, '_methods', 'onLoad');
GLOBAL_API.root._methods.onLoad = (function(GLOBAL_APP_CONFIG, GLOBAL_METHODS, GLOBAL_VARS, GLOBAL_API) {

  function func(vars, methods, req, res) {
    GLOBAL_APP_CONFIG.appLoaded = true;
    GLOBAL_APP_CONFIG.postman.emit('app:load');
  }

  return func;

})(GLOBAL_APP_CONFIG, GLOBAL_METHODS, GLOBAL_VARS, GLOBAL_API);
GLOBAL_METHODS.makeToLast(GLOBAL_API.root, '_methods', 'onReady');
GLOBAL_API.root._methods.onReady = (function(GLOBAL_APP_CONFIG, GLOBAL_METHODS, GLOBAL_VARS, GLOBAL_API) {

  function func(vars, methods, req, res) {
    GLOBAL_APP_CONFIG.appReady = true;
    GLOBAL_APP_CONFIG.postman.emit('app:ready');
  }

  return func;

})(GLOBAL_APP_CONFIG, GLOBAL_METHODS, GLOBAL_VARS, GLOBAL_API);
GLOBAL_METHODS.makeToLast(GLOBAL_API.root, '_methods', 'renderPage');
GLOBAL_API.root._methods.renderPage = (function(GLOBAL_APP_CONFIG, GLOBAL_METHODS, GLOBAL_VARS, GLOBAL_API) {

  const fs = require('fs');
  var filest;

  function func(vars, methods, req, res, next) {
    if (filest) {
      if (typeof next === 'function') return next(filest);
      else return filest;
    }
    fs.readFile(process.cwd() + '/static/index.html', 'utf8', function(err, file) {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "text/plain"
        });
        res.write(err + "\n");
        res.end();
        return;
      }
      filest = file.toString();
      next(filest);
    });
  }

  return func;

})(GLOBAL_APP_CONFIG, GLOBAL_METHODS, GLOBAL_VARS, GLOBAL_API);
GLOBAL_METHODS.makeToLast(GLOBAL_API.root, 'api', 'search', '_methods', 'searchArtists');
GLOBAL_API.root.api.search._methods.searchArtists = (function(GLOBAL_APP_CONFIG, GLOBAL_METHODS, GLOBAL_VARS, GLOBAL_API) {

  function fetchAlbums(qr) {
    return new Promise((res, rej) => {
      GLOBAL_METHODS.request('https://itunes.apple.com/search?limit=5&entity=allArtist&attribute=allArtistTerm&term=' +
        qr,
        function(err, data) {
          let artistId, ind = 0;
          while (!artistId && ind < 5) {
            artistId = GLOBAL_METHODS.lastValue(data, 'parsed', 'results', String(ind), 'artistId');
            ind++;
          }
          if (!artistId) rej((err && err.parsed) || err || 'Artist not found');
          else {
            GLOBAL_METHODS.request('https://itunes.apple.com/lookup?entity=album&id=' + artistId,
              function(err, dta) {
                if (err || !dta || !dta.parsed || !Array.isArray(dta.parsed.results)) rej(err.parsed || err || 1);
                else {
                  const albums = {},
                    arr = [];
                  dta.parsed.results.forEach(ar => {
                    if (ar && ar.collectionType === 'Album' && ar.collectionName &&
                      !(albums.hasOwnProperty(ar.collectionName))) {
                      arr.push(ar);
                    }
                  });
                  res(arr);
                }
              });
          }
        });
    });
  }

  function func(vars, methods, req, res, next) {
    fetchAlbums(vars.params.query.q).then(next).catch(er => next(Object.assign(er, {
      status: er.statusCode
    })));
  }

  return func;

})(GLOBAL_APP_CONFIG, GLOBAL_METHODS, GLOBAL_VARS, GLOBAL_API);
func(undefined, undefined, undefined, GLOBAL_VARS, GLOBAL_API)();