// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"b4TJs":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "950b9b322e5d9761";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"8CSO1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _storageMethodsJs = require("./storageMethods.js");
var _changeUIJs = require("./changeUI.js");
var _viewJs = require("./view.js");
var _jsCookie = require("js-cookie");
var _jsCookieDefault = parcelHelpers.interopDefault(_jsCookie);
const CURRENT_TAB_TEXT = {
    NOW: "Now",
    DETAILS: "Details",
    FORECAST: "Forecast"
};
document.addEventListener("DOMContentLoaded", handleContentLoaded);
async function handleContentLoaded() {
    let localStorageLength = localStorage.length;
    if (localStorageLength === 0) await (0, _storageMethodsJs.storage).defaultLocalStorage();
    if (document.cookie === "") {
        let cityDivText = (0, _viewJs.CITY_DIV).textContent;
        await setCookie(cityDivText);
        await getCookie();
    } else await getCookie();
}
function getCookie() {
    let cityName = (0, _jsCookieDefault.default).get("currentCity");
    cityDataSearch(cityName);
}
function setCookie(cityDivText) {
    let in1horse = 1 / 24;
    (0, _jsCookieDefault.default).set("currentCity", `${cityDivText}`, {
        expires: in1horse
    });
}
function chooseTab() {
    let currentTab = (0, _storageMethodsJs.storage).getCurrentTab();
    switch(currentTab){
        case CURRENT_TAB_TEXT.NOW:
            document.querySelector(".tabs__item:nth-child(1)").click();
            return;
        case CURRENT_TAB_TEXT.DETAILS:
            document.querySelector(".tabs__item:nth-child(2)").click();
            return;
        case CURRENT_TAB_TEXT.FORECAST:
            document.querySelector(".tabs__item:nth-child(3)").click();
            return;
    }
}
async function cityDataSearch(cityName) {
    const serverUrl = "http://api.openweathermap.org/data/2.5/weather";
    const apiKey = "3bfb7384f048b8e78896a10d694dd618";
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
    try {
        let response = await fetch(url);
        let data = await response.json();
        if (!data.name) throw new Error("Введите существующий город");
        CityData(data);
    } catch (error) {
        alert(`Ошибка: ${error.message}`);
    }
}
const CityData = ({ name , main , weather , sys  })=>{
    let cityName = name;
    let degreesCelsius = Math.round(main.temp - 273, 15) + "\xb0";
    let imgLocation = `http://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
    let feelsLike = Math.round(main.feels_like - 273, 15) + "\xb0";
    let weatherData = weather[0].main;
    let sunriseDate = new Date(sys.sunrise * 1000);
    let getHoursSunrise = sunriseDate.getHours();
    let getMinutesSunrise = sunriseDate.getMinutes();
    let timeSunrise = (0, _changeUIJs.checkTime)(getHoursSunrise, getMinutesSunrise);
    let sunsetDate = new Date(sys.sunset * 1000);
    let getHoursSunset = sunsetDate.getHours();
    let getMinutesSunset = sunsetDate.getMinutes();
    let timeSunset = (0, _changeUIJs.checkTime)(getHoursSunset, getMinutesSunset);
    (0, _changeUIJs.changeDivNow)(cityName, degreesCelsius, imgLocation);
    (0, _changeUIJs.changeDivDetails)(cityName, degreesCelsius, feelsLike, weatherData, timeSunrise, timeSunset);
    render();
};
function render() {
    (0, _viewJs.UL_CITIES).replaceChildren();
    let cityDivText = (0, _viewJs.CITY_DIV).textContent;
    let jsonParseLs = (0, _storageMethodsJs.storage).getFavoriteCities();
    let lengthArray = jsonParseLs.length - 1;
    chooseTab();
    getCitysName(jsonParseLs, lengthArray);
    setCookie(cityDivText);
    (0, _changeUIJs.changeColorHeart)();
}
function getCitysName(jsonParseLs, lengthArray) {
    if (lengthArray === 0) return (0, _changeUIJs.displayAddedLocations)(jsonParseLs[lengthArray]);
    else if (lengthArray > 0) {
        (0, _changeUIJs.displayAddedLocations)(jsonParseLs[lengthArray]);
        return getCitysName(jsonParseLs, lengthArray - 1);
    }
}
function changLocalStorage() {
    let cityDivText = (0, _viewJs.CITY_DIV).textContent;
    let jsonParseLs = (0, _storageMethodsJs.storage).getFavoriteCities();
    let cityInArray = (0, _changeUIJs.listIncludesСity)(jsonParseLs, cityDivText);
    if (cityInArray) jsonParseLs = jsonParseLs.filter((item)=>item !== cityDivText);
    else jsonParseLs.push(cityDivText);
    (0, _storageMethodsJs.storage).saveFavoriteCities(jsonParseLs);
}
(0, _viewJs.BTN_SAVE_CITY).addEventListener("click", ()=>{
    changLocalStorage();
    render();
});
(0, _viewJs.FORM).addEventListener("submit", (event)=>{
    event.preventDefault();
    let cityName = (0, _viewJs.SEARCH__INPUT).value;
    cityDataSearch(cityName);
    render();
    event.target.reset();
});
(0, _viewJs.UL_CITIES).addEventListener("click", (event)=>{
    let clickCity = event.target.closest(".liCity");
    let cityName = clickCity.textContent;
    cityDataSearch(cityName);
});
(0, _viewJs.CURRENT_TAB).addEventListener("click", (event)=>{
    let clickCurrentTab = event.target.closest(".tabs__item");
    (0, _storageMethodsJs.storage).saveCurrentTab(clickCurrentTab);
});

},{"./storageMethods.js":"iVqd0","./changeUI.js":"aEuUI","./view.js":"asipq","js-cookie":"c8bBu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iVqd0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "storage", ()=>storage);
const storage = {
    saveFavoriteCities (jsonParseLs) {
        localStorage.setItem("favoriteCities", JSON.stringify(jsonParseLs));
    },
    saveCurrentTab (clickCurrentTab) {
        let currentTabs = clickCurrentTab.textContent;
        localStorage.setItem("currentTabs", currentTabs);
    },
    getFavoriteCities () {
        let getLocalStorage = localStorage.getItem("favoriteCities");
        if (getLocalStorage === "") {
            let jsonParseLs = JSON.parse([]);
            return jsonParseLs;
        } else {
            let jsonParseLs1 = JSON.parse(getLocalStorage);
            return jsonParseLs1;
        }
    },
    getCurrentTab () {
        let currentTab = localStorage.getItem("currentTabs");
        return currentTab;
    },
    defaultLocalStorage () {
        localStorage.setItem("favoriteCities", JSON.stringify([]));
        localStorage.setItem("currentTabs", "Now");
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"aEuUI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "changeDivNow", ()=>changeDivNow);
parcelHelpers.export(exports, "changeDivDetails", ()=>changeDivDetails);
parcelHelpers.export(exports, "changeColorHeart", ()=>changeColorHeart);
parcelHelpers.export(exports, "listIncludesСity", ()=>listIncludesСity);
parcelHelpers.export(exports, "displayAddedLocations", ()=>displayAddedLocations);
parcelHelpers.export(exports, "checkTime", ()=>checkTime);
var _storageMethodsJs = require("./storageMethods.js");
var _viewJs = require("./view.js");
function changeDivNow(cityName, degreesCelsius, imgLocation) {
    (0, _viewJs.CITY_DIV).textContent = cityName;
    (0, _viewJs.CELSIUS_DIV).textContent = degreesCelsius;
    (0, _viewJs.IMG_WEATHER).src = imgLocation;
}
function changeDivDetails(cityName, degreesCelsius, feelsLike, weatherData, timeSunrise, timeSunset) {
    let city = document.querySelector(".citiesDetails");
    city.textContent = cityName;
    let liTemp = document.querySelectorAll(".liCityInfo")[0];
    liTemp.textContent = `Temperature: ${degreesCelsius}`;
    let liFeelsLike = document.querySelectorAll(".liCityInfo")[1];
    liFeelsLike.textContent = `Feels like: ${feelsLike}`;
    let liWeather = document.querySelectorAll(".liCityInfo")[2];
    liWeather.textContent = weatherData;
    let liSunrise = document.querySelectorAll(".liCityInfo")[3];
    liSunrise.textContent = `Sunrise: ${timeSunrise}`;
    let liSunset = document.querySelectorAll(".liCityInfo")[4];
    liSunset.textContent = `Sunset: ${timeSunset}`;
}
function changeColorHeart() {
    let cityDivText = (0, _viewJs.CITY_DIV).textContent;
    let jsonParseLs = (0, _storageMethodsJs.storage).getFavoriteCities();
    let cityInArray = listIncludesСity(jsonParseLs, cityDivText);
    if (!cityInArray) (0, _viewJs.BTN_SAVE_CITY).className = "like";
    else (0, _viewJs.BTN_SAVE_CITY).className = "like_active";
}
function listIncludesСity(jsonParseLs, cityDivText) {
    let cityInArray = jsonParseLs.includes(cityDivText, 0);
    return cityInArray;
}
function displayAddedLocations(city) {
    let createLi = document.createElement("li");
    createLi.className = "liCity";
    createLi.innerHTML = city;
    (0, _viewJs.UL_CITIES).append(createLi);
}
function checkTime(getHoursSunrise, getMinutesSunrise) {
    getHoursSunrise < 10 ? getHoursSunrise = `0${getHoursSunrise}` : getHoursSunrise;
    getMinutesSunrise < 10 ? getMinutesSunrise = `0${getMinutesSunrise}` : getMinutesSunrise;
    let time = `${getHoursSunrise}:${getMinutesSunrise}`;
    return time;
}

},{"./storageMethods.js":"iVqd0","./view.js":"asipq","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"asipq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CURRENT_TAB", ()=>CURRENT_TAB);
parcelHelpers.export(exports, "BTN_SAVE_CITY", ()=>BTN_SAVE_CITY);
parcelHelpers.export(exports, "SEARCH__INPUT", ()=>SEARCH__INPUT);
parcelHelpers.export(exports, "FORM", ()=>FORM);
parcelHelpers.export(exports, "UL_CITIES", ()=>UL_CITIES);
parcelHelpers.export(exports, "CITY_DIV", ()=>CITY_DIV);
parcelHelpers.export(exports, "CELSIUS_DIV", ()=>CELSIUS_DIV);
parcelHelpers.export(exports, "IMG_WEATHER", ()=>IMG_WEATHER);
const CURRENT_TAB = document.querySelector(".tabs__items");
const BTN_SAVE_CITY = document.querySelector(".btnHeart");
const SEARCH__INPUT = document.querySelector(".searchInput");
const FORM = document.querySelector(".search");
const UL_CITIES = document.querySelector(".ulCities");
const CITY_DIV = document.querySelector(".city");
const CELSIUS_DIV = document.querySelector(".degreesСelsius");
const IMG_WEATHER = document.querySelector(".imgСloud");

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"c8bBu":[function(require,module,exports) {
(function(global, factory) {
    module.exports = factory();
})(this, function() {
    "use strict";
    /* eslint-disable no-var */ function assign(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source)target[key] = source[key];
        }
        return target;
    }
    /* eslint-enable no-var */ /* eslint-disable no-var */ var defaultConverter = {
        read: function(value) {
            if (value[0] === '"') value = value.slice(1, -1);
            return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
        },
        write: function(value) {
            return encodeURIComponent(value).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent);
        }
    };
    /* eslint-enable no-var */ /* eslint-disable no-var */ function init(converter, defaultAttributes) {
        function set(key, value, attributes) {
            if (typeof document === "undefined") return;
            attributes = assign({}, defaultAttributes, attributes);
            if (typeof attributes.expires === "number") attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
            if (attributes.expires) attributes.expires = attributes.expires.toUTCString();
            key = encodeURIComponent(key).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
            var stringifiedAttributes = "";
            for(var attributeName in attributes){
                if (!attributes[attributeName]) continue;
                stringifiedAttributes += "; " + attributeName;
                if (attributes[attributeName] === true) continue;
                // Considers RFC 6265 section 5.2:
                // ...
                // 3.  If the remaining unparsed-attributes contains a %x3B (";")
                //     character:
                // Consume the characters of the unparsed-attributes up to,
                // not including, the first %x3B (";") character.
                // ...
                stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
            }
            return document.cookie = key + "=" + converter.write(value, key) + stringifiedAttributes;
        }
        function get(key) {
            if (typeof document === "undefined" || arguments.length && !key) return;
            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all.
            var cookies = document.cookie ? document.cookie.split("; ") : [];
            var jar = {};
            for(var i = 0; i < cookies.length; i++){
                var parts = cookies[i].split("=");
                var value = parts.slice(1).join("=");
                try {
                    var foundKey = decodeURIComponent(parts[0]);
                    jar[foundKey] = converter.read(value, foundKey);
                    if (key === foundKey) break;
                } catch (e) {}
            }
            return key ? jar[key] : jar;
        }
        return Object.create({
            set: set,
            get: get,
            remove: function(key, attributes) {
                set(key, "", assign({}, attributes, {
                    expires: -1
                }));
            },
            withAttributes: function(attributes) {
                return init(this.converter, assign({}, this.attributes, attributes));
            },
            withConverter: function(converter) {
                return init(assign({}, this.converter, converter), this.attributes);
            }
        }, {
            attributes: {
                value: Object.freeze(defaultAttributes)
            },
            converter: {
                value: Object.freeze(converter)
            }
        });
    }
    var api = init(defaultConverter, {
        path: "/"
    });
    /* eslint-enable no-var */ return api;
});

},{}]},["b4TJs","8CSO1"], "8CSO1", "parcelRequire94c2")

//# sourceMappingURL=index.2e5d9761.js.map
