import re,time,os,json,shutil
BASE=os.path.dirname(os.path.abspath(__file__))
os.chdir(BASE)
files=['core0','core1','q8','m135','m137','chem','phys','proofs','variety','physx','examfmt','figs','lx135','lx137','lxchem','lxphys','tutor','engine','tools','app4']
sh=open('shell4.html').read()
V=time.strftime('%Y%m%d%H%M')
G=[('Regular',400),('Medium',500),('SemiBold',600),('Bold',700)]
LAT='U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'
GRK='U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF'
ff=''.join(f"@font-face{{font-family:'Geist';font-style:normal;font-weight:{w};font-display:swap;src:url(fonts/Geist-{n}.woff2) format('woff2')}}\n" for n,w in G)
for sub,rng,vs in [('latin',LAT,[(400,'normal'),(400,'italic'),(500,'normal'),(500,'italic'),(600,'normal')]),('greek',GRK,[(400,'normal'),(500,'normal')])]:
    for w,st in vs: ff+=f"@font-face{{font-family:'STIX Two Text';font-style:{st};font-weight:{w};font-display:swap;src:url(fonts/stix-two-text-{sub}-{w}-{st}.woff2) format('woff2');unicode-range:{rng}}}\n"
head='''<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#F5F5F2">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="Margin">
<meta name="description" content="Study MATH 135, MATH 137, CHEM 120 and PHYS 121.">
<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="icons/icon-180.png">
<link rel="icon" type="image/png" href="icons/favicon-32.png">
<title>Margin</title>'''
h=sh
h=h.replace('<meta name="viewport" content="width=device-width, initial-scale=1">',head,1)
h=re.sub(r'<title>[^<]*</title>\n?','',h.replace(head,'@@HEAD@@'),count=1).replace('@@HEAD@@',head)
h=re.sub(r'<link rel="preconnect"[^>]*>\n?','',h)
h=re.sub(r'<link href="https://fonts.googleapis.com[^>]*>\n?','',h)
app_css='''
/* ===== Installed app (iPhone safe areas) ===== */
html{-webkit-text-size-adjust:100%}
body{padding-top:env(safe-area-inset-top);padding-left:env(safe-area-inset-left);padding-right:env(safe-area-inset-right);-webkit-tap-highlight-color:transparent;overscroll-behavior-y:none}
body:before{content:'';position:fixed;left:0;right:0;top:0;height:env(safe-area-inset-top);background:var(--bg);z-index:35;pointer-events:none}
.qtop{top:env(safe-area-inset-top)}
body.focus .toasts{top:calc(16px + env(safe-area-inset-top))}
button,a,.opt{touch-action:manipulation}
input,textarea,select{font-size:16px}
'''
h=h.replace('<style>','<style>\n'+ff+app_css,1)
sw_reg='''<script>
if('serviceWorker' in navigator&&(location.protocol==="https:"||location.hostname==="localhost")){addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}))}
(function(){const m=document.querySelector('meta[name=theme-color]');const set=()=>{const c=getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();if(c)m.content=c};new MutationObserver(set).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});addEventListener('load',set)})();
</script>
</body>'''
h=h.replace('/*BUNDLE*/','\n'.join(open(f'src/{f}.js').read() for f in files))
i=h.rindex('</body>');h=h[:i]+sw_reg+h[i+7:]
out=os.path.abspath(os.environ.get('OUT',os.path.join(BASE,'..')))
open(f'{out}/index.html','w').write(h)
man={"name":"Margin","short_name":"Margin","description":"Study MATH 135, MATH 137, CHEM 120 and PHYS 121.","start_url":"./","scope":"./","display":"standalone","orientation":"portrait","background_color":"#F5F5F2","theme_color":"#F5F5F2",
 "icons":[{"src":"icons/icon-192.png","sizes":"192x192","type":"image/png"},{"src":"icons/icon-512.png","sizes":"512x512","type":"image/png"},{"src":"icons/icon-maskable-512.png","sizes":"512x512","type":"image/png","purpose":"maskable"}]}
open(f'{out}/manifest.webmanifest','w').write(json.dumps(man,indent=1))
assets=['./','index.html','manifest.webmanifest']+['icons/'+f for f in sorted(os.listdir(f'{out}/icons'))]+['fonts/'+f for f in sorted(os.listdir(f'{out}/fonts'))]
sw=f'''// Margin service worker: works offline, updates when online.
const V='margin-{V}';
const ASSETS={json.dumps(assets)};
self.addEventListener('install',e=>{{e.waitUntil(caches.open(V).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))}});
self.addEventListener('activate',e=>{{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))}});
self.addEventListener('fetch',e=>{{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 if(r.mode==='navigate'){{e.respondWith(fetch(r).then(res=>{{const c=res.clone();caches.open(V).then(x=>x.put('index.html',c));return res}}).catch(()=>caches.match('index.html')));return}}
 e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{{if(res.ok){{const c=res.clone();caches.open(V).then(x=>x.put(r,c))}}return res}})))}});
'''
open(f'{out}/sw.js','w').write(sw)
open(f'{out}/.nojekyll','w').write('')
print('built',V,len(h)//1024,'KB')
