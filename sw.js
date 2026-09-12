/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-7e5eb42b'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "scanner.html",
    "revision": "0713a80762f02763e4b6fefaddb1e748"
  }, {
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "aecf6029dd7e14122a959e1c597fea54"
  }, {
    "url": "pwa-512x512.png",
    "revision": "aecf6029dd7e14122a959e1c597fea54"
  }, {
    "url": "pwa-192x192.png",
    "revision": "eeced277502c0af485046889e91e68e7"
  }, {
    "url": "index.html",
    "revision": "dea636800a92039566732132a3ab6c87"
  }, {
    "url": "icon.svg",
    "revision": "aff1020833ba22535c4c56c6332044cc"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "a58ff489caf3797edc00107f43ba02d5"
  }, {
    "url": "assets/index-SOE2N2Ky.js",
    "revision": null
  }, {
    "url": "assets/index-DrLQFWVI.css",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "a58ff489caf3797edc00107f43ba02d5"
  }, {
    "url": "icon.svg",
    "revision": "aff1020833ba22535c4c56c6332044cc"
  }, {
    "url": "pwa-192x192.png",
    "revision": "eeced277502c0af485046889e91e68e7"
  }, {
    "url": "pwa-512x512.png",
    "revision": "aecf6029dd7e14122a959e1c597fea54"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "aecf6029dd7e14122a959e1c597fea54"
  }, {
    "url": "manifest.webmanifest",
    "revision": "f6fd4fd108f5c6a2ae5d24e9a346e027"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
