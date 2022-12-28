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
})({"2Rsls":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "2751c5c64de9b498";
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

},{}],"4pp4s":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _constants = require("./constants");
var _render = require("./render");
var _renderDefault = parcelHelpers.interopDefault(_render);
var _weather = require("./weather");
var _weatherDefault = parcelHelpers.interopDefault(_weather);
var _handlers = require("./handlers");
(0, _constants.UI_ELEMENT).FORM.addEventListener("submit", (0, _handlers.formHandler));
(0, _constants.UI_ELEMENT).BUTTONS.addEventListener("mousedown", (0, _handlers.buttonHandler));
(0, _constants.UI_ELEMENT).INFO_WINDOW.addEventListener("click", (0, _handlers.cityHandler));
(0, _constants.UI_ELEMENT).FAVOURITES.addEventListener("click", (0, _handlers.favouritesHandler));
(0, _weatherDefault.default)();
(0, _renderDefault.default).listCity();

},{"./constants":"1j8D1","./render":"9k0mC","./weather":"fWRBR","./handlers":"eldjs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1j8D1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "UI_ELEMENT", ()=>UI_ELEMENT);
parcelHelpers.export(exports, "HEART", ()=>HEART);
parcelHelpers.export(exports, "SERVER_URL", ()=>SERVER_URL);
parcelHelpers.export(exports, "API_KEY", ()=>API_KEY);
parcelHelpers.export(exports, "WEATHER_CLASS", ()=>WEATHER_CLASS);
parcelHelpers.export(exports, "ERROR", ()=>ERROR);
parcelHelpers.export(exports, "MONTH", ()=>MONTH);
const API_KEY = "3bfb7384f048b8e78896a10d694dd618";
const ERROR = {
    UNKNOWN_CITY: "Город не найден",
    FORECAST_FAILURE: "Не удалось получить Forecast"
};
const HEART = {
    EMPTY: "/src/img/heart_o.svg",
    FILL: "/src/img/heart.svg"
};
const SERVER_URL = {
    WEATHER: "https://api.openweathermap.org/data/2.5/weather",
    FORECAST: "https://api.openweathermap.org/data/2.5/forecast"
};
const UI_ELEMENT = {
    FORM: document.body.querySelector(".search-form"),
    INPUT_FORM: document.body.querySelector(".search-form__input"),
    BUTTONS: document.body.querySelector(".tablinks"),
    INFO_WINDOW: document.body.querySelector(".info-window"),
    FAVOURITES: document.body.querySelector(".favourites__cities")
};
const WEATHER_CLASS = {
    SEARCH_INPUT: "search-form__input",
    ADD_CITY: "now__add-city",
    FAVOURITES_CITY: "favourites__city",
    FAVOURITES_REMOVE: "favourites__remove",
    NOW: "now info-window__item",
    DETAILS: "details info-window__item",
    FORECAST: "forecast info-window__item"
};
const MONTH = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
];

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

},{}],"9k0mC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("./constants");
var _storage = require("./storage");
var _storageDefault = parcelHelpers.interopDefault(_storage);
var _createTabs = require("./createTabs");
function createCity(cityName) {
    const city = document.createElement("li");
    city.className = "favourites__city";
    city.textContent = cityName;
    const remove = document.createElement("div");
    remove.className = "favourites__remove";
    city.append(remove);
    return city;
}
const render = {
    weatherNow: {},
    weatherForecast: {},
    activeTab: "Now",
    changeActiveTab (button) {
        if (button.classList.contains("-active")) return;
        const activeButton = button.closest(".tablinks").querySelector(".-active");
        activeButton.classList.remove("-active");
        this.activeTab = button.dataset.tab;
        button.classList.add("-active");
        this.infoWindow();
    },
    infoWindow () {
        (0, _constants.UI_ELEMENT).INFO_WINDOW.replaceChildren();
        let tab;
        if (this.activeTab === "Now") {
            const isFavouriteCity = (0, _storageDefault.default).checkCity(this.weatherNow.name);
            tab = (0, _createTabs.createTabNow)(this.weatherNow, isFavouriteCity);
        }
        if (this.activeTab === "Details") tab = (0, _createTabs.createTabDetails)(this.weatherNow);
        if (this.activeTab === "Forecast") tab = (0, _createTabs.createTabForecast)(this.weatherForecast);
        (0, _constants.UI_ELEMENT).INFO_WINDOW.append(tab);
    },
    listCity () {
        (0, _constants.UI_ELEMENT).FAVOURITES.replaceChildren();
        const cities = (0, _storageDefault.default).getCities();
        cities.forEach((item)=>(0, _constants.UI_ELEMENT).FAVOURITES.prepend(createCity(item)));
    },
    allInfo () {
        this.infoWindow();
        this.listCity();
    },
    showError (message) {
        const messageContainer = document.body.querySelector(".main__error");
        const textError = document.createElement("div");
        textError.className = "main__text-error";
        textError.textContent = message;
        messageContainer.append(textError);
        document.body.querySelector(".main").append(messageContainer);
        // eslint-disable-next-line no-return-assign
        setTimeout(()=>messageContainer.textContent = "", 2000);
    }
};
exports.default = render;

},{"./constants":"1j8D1","./storage":"j1l1C","./createTabs":"ibvgq","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"j1l1C":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const storage = {
    CITIES: "favouriteCities",
    LAST_CITY: "lastCity",
    ALTERNATIVE_CITY: "Архангельск",
    addOrRemoveCity (city) {
        const list = new Set(this.getCities());
        list.has(city) ? list.delete(city) : list.add(city);
        this.stringifyCities([
            ...list
        ]);
    },
    getCities () {
        const cities = localStorage.getItem(this.CITIES);
        if (!cities) this.stringifyCities([]);
        return cities ? JSON.parse(cities) : [];
    },
    setLastCity (city) {
        localStorage.setItem(this.LAST_CITY, city);
    },
    getLastCity () {
        const lastCity = localStorage.getItem(this.LAST_CITY);
        return lastCity || this.ALTERNATIVE_CITY;
    },
    checkCity (city) {
        return this.getCities().includes(city);
    },
    stringifyCities (cities) {
        const citiesJSON = JSON.stringify(cities);
        localStorage.setItem(this.CITIES, citiesJSON);
    }
};
exports.default = storage;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ibvgq":[function(require,module,exports) {
/* eslint-disable camelcase */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createTabNow", ()=>createTabNow);
parcelHelpers.export(exports, "createTabDetails", ()=>createTabDetails);
parcelHelpers.export(exports, "createTabForecast", ()=>createTabForecast);
var _constants = require("./constants");
const CELSIUS = "℃";
const getImageURL = (iconCode)=>`https://openweathermap.org/img/wn/${iconCode}@4x.png`;
function createTabNow({ temperature , name , weather  }, favouriteCity) {
    const tab = document.createElement("div");
    tab.className = (0, _constants.WEATHER_CLASS).NOW;
    const temp = document.createElement("div");
    temp.className = "now__temperature";
    temp.textContent = temperature + CELSIUS;
    const img = document.createElement("img");
    img.className = "now__picture";
    img.src = getImageURL(weather[0].icon);
    const city = document.createElement("div");
    city.className = "now__city";
    const nameCity = document.createElement("div");
    nameCity.className = "now__name-city";
    nameCity.textContent = name;
    const addCity = document.createElement("img");
    addCity.className = "now__add-city";
    addCity.src = favouriteCity ? (0, _constants.HEART).FILL : (0, _constants.HEART).EMPTY;
    city.append(nameCity, addCity);
    tab.append(temp, img, city);
    return tab;
}
function createTabDetails({ name , temperature , feelsLike , weather , sunrise , sunset  }) {
    const tab = document.createElement("div");
    tab.className = (0, _constants.WEATHER_CLASS).DETAILS;
    const city = document.createElement("div");
    city.className = "details__city";
    city.textContent = name;
    const listDetails = document.createElement("ul");
    listDetails.className = "details__list-details";
    const temperatureCity = document.createElement("li");
    temperatureCity.textContent = `Температура: ${temperature}`;
    const feels_like = document.createElement("li");
    feels_like.textContent = `Ощущается: ${feelsLike}`;
    const weatherCity = document.createElement("li");
    weatherCity.textContent = `Погода: ${weather[0].description}`;
    const sunriseCity = document.createElement("li");
    sunriseCity.textContent = `Восход солнца: ${`${sunrise}`}`;
    const sunsetCity = document.createElement("li");
    sunsetCity.textContent = `Заход солнца: ${sunset}`;
    listDetails.append(temperatureCity, feels_like, weatherCity, sunriseCity, sunsetCity);
    tab.append(city, listDetails);
    return tab;
}
function createCardForecast({ dt_txt , weather , main: { temp , feels_like  }  }) {
    const card = document.createElement("div");
    card.className = "card-weather";
    // eslint-disable-next-line prefer-const
    let [dateCity, timeCity] = dt_txt.split(" ");
    dateCity = dateCity.split("-");
    const date = document.createElement("div");
    date.textContent = `${(0, _constants.MONTH)[dateCity[1] - 1]}, ${dateCity[2]}`;
    const time = document.createElement("div");
    time.textContent = timeCity.slice(0, 5);
    const temperature = document.createElement("div");
    temperature.textContent = `Температура: ${Math.round(temp)}`;
    const feelsLike = document.createElement("div");
    feelsLike.textContent = `Ощущается: ${Math.round(feels_like)}`;
    const weatherCity = document.createElement("div");
    weatherCity.textContent = `${weather[0].main}`;
    const container = document.createElement("div");
    container.className = "card-weather__picture";
    const img = document.createElement("img");
    img.src = getImageURL(weather[0].icon);
    container.append(img);
    card.append(date, time, temperature, weatherCity, feelsLike, container);
    return card;
}
function createTabForecast({ city: { name  } , list  }) {
    const tab = document.createElement("div");
    tab.className = (0, _constants.WEATHER_CLASS).FORECAST;
    const city = document.createElement("div");
    city.className = "forecast__city";
    city.textContent = name;
    const listCard = document.createElement("div");
    listCard.className = "list-card";
    const cards = list.map((element)=>createCardForecast(element));
    listCard.append(...cards);
    tab.append(city, listCard);
    return tab;
}

},{"./constants":"1j8D1","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fWRBR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("./constants");
var _render = require("./render");
var _renderDefault = parcelHelpers.interopDefault(_render);
var _storage = require("./storage");
var _storageDefault = parcelHelpers.interopDefault(_storage);
// eslint-disable-next-line consistent-return
async function createWeatherCity(inputValue) {
    // eslint-disable-next-line no-param-reassign
    if (!inputValue) inputValue = (0, _storageDefault.default).getLastCity();
    // eslint-disable-next-line no-use-before-define
    const weather = await getResponse(inputValue, (0, _constants.SERVER_URL).WEATHER);
    if (!weather) return (0, _renderDefault.default).showError("Город не найден");
    // eslint-disable-next-line no-use-before-define
    outputWeather(weather);
    // eslint-disable-next-line no-use-before-define
    const weatherForecast = await getResponse(inputValue, (0, _constants.SERVER_URL).FORECAST);
    if (!weatherForecast) return (0, _renderDefault.default).showError("Город не найден");
    (0, _renderDefault.default).weatherForecast = weatherForecast;
    (0, _renderDefault.default).infoWindow();
}
// eslint-disable-next-line consistent-return
async function getResponse(city, url) {
    const urlWeather = `${url}?q=${city}&appid=${(0, _constants.API_KEY)}&units=metric&lang=ru`;
    const response = await fetch(urlWeather);
    if (response.ok) {
        const json = await response.json();
        return json;
    }
}
const addZero = (number)=>number < 10 ? `0${number}` : number;
function getDate(timezone, seconds) {
    const date = new Date(seconds * 1000);
    const diffTimezone = date.getTimezoneOffset() / 60 + timezone / 3600;
    const diffTime = (24 + date.getHours() + diffTimezone) % 24;
    const dateTime = {
        hours: addZero(diffTime),
        minutes: addZero(date.getMinutes())
    };
    return `${dateTime.hours}:${dateTime.minutes}`;
}
function outputWeather({ name , weather , timezone , // eslint-disable-next-line camelcase
main: { temp , feels_like  } , sys: { sunrise , sunset  }  }) {
    (0, _renderDefault.default).weatherNow = {
        name,
        weather,
        sunrise: getDate(timezone, sunrise),
        sunset: getDate(timezone, sunset),
        temperature: Math.round(temp),
        feelsLike: Math.round(feels_like)
    };
    (0, _storageDefault.default).setLastCity(name);
}
exports.default = createWeatherCity;

},{"./constants":"1j8D1","./render":"9k0mC","./storage":"j1l1C","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eldjs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "formHandler", ()=>formHandler);
parcelHelpers.export(exports, "buttonHandler", ()=>buttonHandler);
parcelHelpers.export(exports, "cityHandler", ()=>cityHandler);
parcelHelpers.export(exports, "favouritesHandler", ()=>favouritesHandler);
var _constants = require("./constants");
var _render = require("./render");
var _renderDefault = parcelHelpers.interopDefault(_render);
var _weather = require("./weather");
var _weatherDefault = parcelHelpers.interopDefault(_weather);
var _storage = require("./storage");
var _storageDefault = parcelHelpers.interopDefault(_storage);
async function formHandler(event) {
    event.preventDefault();
    const input = event.target.querySelector(`.${(0, _constants.WEATHER_CLASS).SEARCH_INPUT}`);
    const inputValue = input.value;
    if (inputValue === "") return;
    (0, _weatherDefault.default)(inputValue);
    input.value = "";
}
function cityHandler(event) {
    const { target  } = event;
    if (target.className !== (0, _constants.WEATHER_CLASS).ADD_CITY) return;
    const city = target.previousElementSibling.textContent;
    (0, _storageDefault.default).addOrRemoveCity(city);
    (0, _renderDefault.default).allInfo();
}
function favouritesHandler(event) {
    const { target  } = event;
    if (target.className === (0, _constants.WEATHER_CLASS).FAVOURITES_CITY) (0, _weatherDefault.default)(target.textContent);
    if (target.className === (0, _constants.WEATHER_CLASS).FAVOURITES_REMOVE) {
        const city = target.closest(`.${(0, _constants.WEATHER_CLASS).FAVOURITES_CITY}`).textContent;
        (0, _storageDefault.default).addOrRemoveCity(city);
        (0, _renderDefault.default).allInfo();
    }
}
function buttonHandler(event) {
    const button = event.target;
    (0, _renderDefault.default).changeActiveTab(button);
}

},{"./constants":"1j8D1","./render":"9k0mC","./weather":"fWRBR","./storage":"j1l1C","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["2Rsls","4pp4s"], "4pp4s", "parcelRequiree00b")

//# sourceMappingURL=index.4de9b498.js.map
