// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/save_cities.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storage = void 0;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/*function saveFavoriteCities(array) {
  const list = JSON.stringify(array);
  localStorage.setItem("FavoriteCities", list);
}

function saveCurrentCity(cityName) {
  localStorage.setItem("CurrentCity", cityName);
}

function getFavoriteCities() {
  const savedList = localStorage.getItem("FavoriteCities");
  const savedArray = JSON.parse(savedList);
  return savedArray;
}

function getCurrentCity() {
  return localStorage.getItem("CurrentCity");
}*/

var storage = {
  getCurrentCity: function getCurrentCity() {
    var name = 'CurrentCity';
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
    //const nameOfCity = document.cookie.replace(/(?:(?:^|.*;\s*)Current%20City\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    console.log(nameOfCity);
    return nameOfCity;
    //localStorage.getItem("CurrentCity");
  },

  getFavoriteCities: function getFavoriteCities() {
    var savedList = localStorage.getItem("FavoriteCities");
    var savedArray = JSON.parse(savedList);
    return savedArray;
  },
  saveCurrentCity: function saveCurrentCity(cityName) {
    //localStorage.setItem("CurrentCity", cityName);
    var name = 'CurrentCity';
    var value = cityName;
    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + '; max-age=3600';
  },
  saveFavoriteCities: function saveFavoriteCities(array) {
    var favorites = _toConsumableArray(array);
    var list = JSON.stringify(favorites);
    localStorage.setItem("FavoriteCities", list);
  }
};
exports.storage = storage;
},{}],"../src/index.js":[function(require,module,exports) {
"use strict";

var _save_cities = require("./save_cities.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var city_list = new Set();
function getCityName() {
  var cityName = document.querySelector('.search-text').value;
  if (cityName) {
    _save_cities.storage.saveCurrentCity(cityName);
    getWeather(cityName);
    getForecastWeather(cityName);
  } else alert('Введите название города');
}
function serverConnect(city) {
  var serverUrl = 'https://api.openweathermap.org';
  var apiKey = '96b8ddfea8e4ddd7fa44a1fad797a919';
  var url = "".concat(serverUrl, "/data/2.5/weather?q=").concat(city, "&appid=").concat(apiKey);
  return url;
}
function serverConnectForecast(city) {
  var serverUrl = 'https://api.openweathermap.org';
  var apiKey = '96b8ddfea8e4ddd7fa44a1fad797a919';
  var url = "".concat(serverUrl, "/data/2.5/forecast?q=").concat(city, "&appid=").concat(apiKey);
  return url;
}
function getWeather(city) {
  likeCheck();
  var url = serverConnect(city);
  var response = fetch(url);
  response.then(function (resp) {
    return resp.json();
  }).then(function (value) {
    try {
      var temp = Math.round(value.main.temp - 273.15) + '°';
      document.querySelector('.temp').textContent = temp;
      var icon = document.querySelector('.weather-icon');
      icon.src = "https://openweathermap.org/img/wn/".concat(value.weather[0].icon, "@4x.png");
      icon.hidden = false;
      var cities = document.querySelectorAll('.city-name');
      var _iterator = _createForOfIteratorHelper(cities),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var key = _step.value;
          key.textContent = city;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      getDetails(value);
    } catch (_unused) {
      alert(value.message);
    }
  }).catch(function (error) {
    return alert(error.message);
  });
}
function getForecastWeather(city) {
  var url = serverConnectForecast(city);
  var response = fetch(url);
  response.then(function (resp) {
    return resp.json();
  }).then(function (value) {
    try {
      var unorderedList = document.querySelector('.forecast-list-ul');
      unorderedList.innerHTML = '';
      var forecastList = _toConsumableArray(value.list);
      forecastList.forEach(function (element) {
        getForecast(element);
      });
    } catch (_unused2) {
      alert(value.message + 'hui');
    }
  }).catch(function (error) {
    return alert(error.message);
  });
}
function getDetails(data) {
  var temperature = document.querySelector('.temp-details');
  var feelsLike = document.querySelector('.feel-details');
  var weather = document.querySelector('.weather-details');
  var sunRise = document.querySelector('.sunrise-details');
  var sunSet = document.querySelector('.sunset-details');
  temperature.textContent = Math.round(data.main.temp - 273.15) + '°';
  feelsLike.textContent = Math.round(data.main.feels_like - 273.15) + '°';
  weather.textContent = data.weather[0].main;
  var sunriseDate = new Date(1000 * data.sys.sunrise);
  sunRise.textContent = sunriseDate.getHours() + ':' + sunriseDate.getMinutes();
  var sunsetDate = new Date(1000 * data.sys.sunset);
  sunSet.textContent = sunsetDate.getHours() + ':' + sunsetDate.getMinutes();
}
function getForecast(data) {
  var unorderedList = document.querySelector('.forecast-list-ul');
  try {
    var date = new Date(Date.parse(data.dt_txt));
    var dayAndMonth = date.toLocaleDateString();
    var dateDiv = document.createElement('div');
    dateDiv.textContent = dayAndMonth;
    dateDiv.className = 'date-month';
    var time = date.toLocaleTimeString();
    var timeDiv = document.createElement('div');
    timeDiv.textContent = time;
    timeDiv.className = 'date-time';
    var temp = "Temperature : ".concat(Math.round(data.main.temp - 273.15));
    var tempP = document.createElement('p');
    tempP.textContent = temp;
    var feel = "Feels Like : ".concat(Math.round(data.main.feels_like - 273.15));
    var feelP = document.createElement('p');
    feelP.textContent = feel;
    var tempDiv = document.createElement('div');
    tempDiv.append(tempP);
    tempDiv.append(feelP);
    tempDiv.className = 'temp-feel';
    var weather = data.weather[0].main;
    var weatherP = document.createElement('p');
    weatherP.textContent = weather;
    var weatherIcon = document.createElement('img');
    weatherIcon.src = "https://openweathermap.org/img/wn/".concat(data.weather[0].icon, "@4x.png");
    weatherIcon.className = 'forecast-image';
    var weatherDiv = document.createElement('div');
    weatherDiv.className = 'temp-weather';
    weatherDiv.append(weatherP);
    weatherDiv.append(weatherIcon);
    var itemDiv = document.createElement('div');
    itemDiv.className = 'forecast-item';
    itemDiv.append(dateDiv);
    itemDiv.append(timeDiv);
    var seconditemDiv = document.createElement('div');
    seconditemDiv.className = 'forecast-item';
    seconditemDiv.append(tempDiv);
    seconditemDiv.append(weatherDiv);
    var listItem = document.createElement('li');
    listItem.append(itemDiv);
    listItem.append(seconditemDiv);
    unorderedList.append(listItem);
  } catch (error) {
    console.log(error.message);
  }
}
function saveCity() {
  var cityName = document.querySelector('.city-name').textContent;
  var cityIndex = city_list.has(cityName);
  var likeImage = document.querySelector('.city-like-img');
  if (!cityIndex) {
    city_list.add(cityName);
    likeImage.src = 'https://raw.githubusercontent.com/SqW4ER/Weather/main/img/heart.png';
  } else {
    city_list.delete(cityName);
    likeImage.src = 'https://raw.githubusercontent.com/SqW4ER/Weather/main/img/empty_heart.png';
  }
}
function likeCheck() {
  var currentCityName = _save_cities.storage.getCurrentCity();
  console.log(currentCityName);
  var favoriteCityArray = new Set(_save_cities.storage.getFavoriteCities());
  console.log(favoriteCityArray);
  var likeImage = document.querySelector('.city-like-img');
  if (favoriteCityArray != null) {
    if (favoriteCityArray.has(currentCityName)) {
      console.log(2);
      likeImage.src = 'https://raw.githubusercontent.com/SqW4ER/Weather/main/img/heart.png';
      likeImage.hidden = false;
    } else {
      console.log(1);
      likeImage.src = 'https://raw.githubusercontent.com/SqW4ER/Weather/main/img/empty_heart.png';
      likeImage.hidden = false;
    }
  } else {
    likeImage.src = 'https://raw.githubusercontent.com/SqW4ER/Weather/main/img/empty_heart.png';
    likeImage.hidden = false;
    console.log(3);
  }
}
function render() {
  var getList = document.querySelector('.location-list-ul');
  getList.innerHTML = '';
  city_list.forEach(function (element) {
    var listItem = document.createElement('li');
    listItem.textContent = element;
    listItem.addEventListener('click', function (event) {
      event.preventDefault();
      _save_cities.storage.saveCurrentCity(element);
      getWeather(element);
      getForecastWeather(element);
      _save_cities.storage.saveCurrentCity(element);
    });
    getList.append(listItem);
  });
  _save_cities.storage.saveFavoriteCities(city_list);
}
function searchButtonHandler(event) {
  event.preventDefault();
  getCityName();
  render();
}
var searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', searchButtonHandler);
function saveButtonHandler(event) {
  event.preventDefault();
  saveCity();
  render();
}
var saveButton = document.querySelector('.city-like');
saveButton.addEventListener('click', saveButtonHandler);
document.addEventListener('DOMContentLoaded', function () {
  var loadList = _save_cities.storage.getFavoriteCities();
  if (loadList) {
    loadList.forEach(function (element) {
      city_list.add(element);
    });
  }
  var currentCity = _save_cities.storage.getCurrentCity();
  if (currentCity) {
    getWeather(_save_cities.storage.getCurrentCity());
    getForecastWeather(_save_cities.storage.getCurrentCity());
  }
  render();
});
},{"./save_cities.js":"../src/save_cities.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57034" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/index.js"], null)
//# sourceMappingURL=/src.7ed060e2.js.map