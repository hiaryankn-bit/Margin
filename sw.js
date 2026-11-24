// Margin service worker: works offline, updates when online.
const V='margin-202611241655';
const ASSETS=["./", "index.html", "manifest.webmanifest", "icons/favicon-32.png", "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png", "fonts/Geist-Bold.woff2", "fonts/Geist-Medium.woff2", "fonts/Geist-Regular.woff2", "fonts/Geist-SemiBold.woff2", "fonts/stix-two-text-greek-400-normal.woff2", "fonts/stix-two-text-greek-500-normal.woff2", "fonts/stix-two-text-latin-400-italic.woff2", "fonts/stix-two-text-latin-400-normal.woff2", "fonts/stix-two-text-latin-500-italic.woff2", "fonts/stix-two-text-latin-500-normal.woff2", "fonts/stix-two-text-latin-600-normal.woff2"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(V).then(x=>x.put('index.html',c));return res}).catch(()=>caches.match('index.html')));return}
 e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(V).then(x=>x.put(r,c))}return res})))});
