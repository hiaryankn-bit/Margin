// ===== Ask: an AI tutor grounded in the course =====
// Sources, in priority order: the student's own imported notes (stored on this device only),
// then the app's lessons. Only the few most relevant passages are sent with each question.
// Model route: Claude's built-in `sample` capability in the Claude version; in the phone app, the
// student's own API key from any of several providers (stored on this device only, never in
// progress codes, sent only to the provider they picked).

let TUT={msgs:[],ctx:null,busy:false,notes:null,lessons:null,sample:undefined,abort:null,atts:[],img:false,imgMax:4};
const IN_CLAUDE=!!(window.claude&&window.claude.use);
const AIKEY='margin_ai_key',AICFG='margin_ai',AIMODEL='claude-sonnet-5-5';
// Providers. Defaults checked against each provider's model docs (Nov 2026). Each allows direct
// browser (CORS) requests; a custom server must allow them too.
const PROV={
 anthropic:{n:'Anthropic',s:'Anthropic',model:AIMODEL,ph:'sk-ant-…',get:'Get a key at console.anthropic.com and set a monthly spend limit there.'},
 openai:{n:'OpenAI',s:'OpenAI',model:'gpt-6.2-sol',ph:'sk-…',get:'Get a key at platform.openai.com, under API keys. Set a usage limit there.'},
 gemini:{n:'Google Gemini',s:'Gemini',model:'gemini-3.8-flash',ph:'AIza…',get:'Get a key in Google AI Studio (aistudio.google.com), under Get API key.'},
 openrouter:{n:'OpenRouter',s:'OpenRouter',model:'~anthropic/claude-sonnet-latest',ph:'sk-or-…',get:'Get a key at openrouter.ai, under Keys. Any model slug from openrouter.ai/models works.'},
 custom:{n:'Custom (OpenAI-compatible)',s:'Custom',model:'',ph:'Your key',get:'Any service with an OpenAI-style /chat/completions endpoint: Groq, DeepSeek, Mistral, a local server and others. Use its base URL and a model name from its docs. The server has to allow requests from web pages (CORS), or the request is blocked.'}};
function aiCfg(){let c=null;try{c=JSON.parse(localStorage.getItem(AICFG)||'null')}catch(e){}
  if(!c||!c.key){let old='';try{old=localStorage.getItem(AIKEY)||''}catch(e){}
    if(old){c={prov:'anthropic',key:old,model:AIMODEL,base:''};try{localStorage.setItem(AICFG,JSON.stringify(c));localStorage.removeItem(AIKEY)}catch(e){}}}
  return c&&c.key&&PROV[c.prov]?c:null}
const askEl=s=>document.querySelector('#modal.show '+s)||document.querySelector(s);
function tutKey(){const c=aiCfg();return c?c.key:''}
function detectProv(k){k=String(k||'').trim();if(/^sk-ant-/.test(k))return'anthropic';if(/^sk-or-/.test(k))return'openrouter';if(/^AIza/.test(k))return'gemini';if(/^sk-/.test(k))return'openai';return k?'custom':''}

// ---------- tiny search engine (BM25) ----------
const STOP=new Set('the a an and or of to in is are be for on with as by it this that at from if then so we you your can not no its into than which what when how why does do'.split(' '));
function toks(t){return String(t).toLowerCase().replace(/<[^>]+>/g,' ').replace(/[^a-z0-9α-ωσπ∗*₀-₉⁰-⁹²³ℤℂ≡∀∃⇒]+/g,' ').split(' ').filter(w=>w&&w.length>1&&!STOP.has(w))}
function mkIndex(chunks){const df=new Map();let tot=0;for(const c of chunks){c.tf=new Map();for(const w of toks(c.title+' '+c.text)){c.tf.set(w,(c.tf.get(w)||0)+1)}c.len=[...c.tf.values()].reduce((a,b)=>a+b,0);tot+=c.len;for(const w of c.tf.keys())df.set(w,(df.get(w)||0)+1)}return{chunks,df,avg:tot/Math.max(1,chunks.length),N:chunks.length}}
function search(ix,q,k){if(!ix||!ix.N)return[];const qs=[...new Set(toks(q))];const out=[];for(const c of ix.chunks){let s=0;for(const w of qs){const f=c.tf.get(w);if(!f)continue;const idf=Math.log(1+(ix.N-(ix.df.get(w)||0)+.5)/((ix.df.get(w)||0)+.5));s+=idf*f*2.2/(f+1.2*(.25+.75*c.len/ix.avg))}if(s>0)out.push([s,c])}return out.sort((a,b)=>b[0]-a[0]).slice(0,k).map(x=>x[1])}
function lessonIndex(){if(TUT.lessons)return TUT.lessons;const ch=[];for(const k in LX){const x=LX[k],n=REG[k];if(!n)continue;const t=[x.why,...(x.idea||[]),...(x.keys||[]).map(p=>p.join(': ')),...(x.ex||[]).map(e=>'Example: '+e.q+' '+e.s.join(' ')+' '+(e.a||'')),...(x.traps||[]).map(t=>'Trap: '+t),x.tip||''].join('\n').replace(/<[^>]+>/g,'').replace(/&lt;/g,'<').replace(/&gt;/g,'>');ch.push({src:'lesson',k,title:`Lesson: ${n.name} (${n.course.name}, ${n.world.title})`,text:t})}return TUT.lessons=mkIndex(ch)}

// ---------- the student's notes, kept in IndexedDB on this device ----------
function idb(){return new Promise((res,rej)=>{const r=indexedDB.open('margin_notes',1);r.onupgradeneeded=()=>{const d=r.result;d.createObjectStore('docs',{keyPath:'id'});d.createObjectStore('chunks',{keyPath:'id',autoIncrement:true}).createIndex('doc','doc')};r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
async function idbAll(store){const d=await idb();return new Promise((res,rej)=>{const q=d.transaction(store).objectStore(store).getAll();q.onsuccess=()=>res(q.result);q.onerror=()=>rej(q.error)})}
async function notesIndex(){if(TUT.notes)return TUT.notes;try{const ch=await idbAll('chunks');TUT.notes=mkIndex(ch.map(c=>({src:'notes',title:`Notes: ${c.docName}${c.page?`, p. ${c.page}`:''}`,text:c.text})))}catch(e){TUT.notes=mkIndex([])}return TUT.notes}
function chunkText(text,maxLen=1100){const paras=text.replace(/\r/g,'').split(/\n\s*\n|(?<=\.)\s{2,}/);const out=[];let cur='';for(const p of paras){const t=p.replace(/\s+/g,' ').trim();if(!t)continue;if((cur+' '+t).length>maxLen&&cur){out.push(cur);cur=t}else cur=cur?cur+' '+t:t;while(cur.length>maxLen*1.6){out.push(cur.slice(0,maxLen));cur=cur.slice(maxLen)}}if(cur)out.push(cur);return out}
async function pdfPages(file,onProg){let lib;try{lib=await import(new URL('lib/pdf.min.mjs',location.href).href)}catch(e){throw new Error('PDF reading is only available in the phone app. Here, use a .txt or .md file, or a photo of the page.')}
  lib.GlobalWorkerOptions.workerSrc=new URL('lib/pdf.worker.min.mjs',location.href).href;const pdf=await lib.getDocument({data:await file.arrayBuffer()}).promise;const pages=[];
  for(let i=1;i<=pdf.numPages;i++){const p=await pdf.getPage(i);const tc=await p.getTextContent();let s='';for(const it of tc.items){s+=it.str+(it.hasEOL?'\n':' ')}pages.push(s);if(i%5===0||i===pdf.numPages)onProg(i,pdf.numPages)}return pages}
async function importNotes(files){const st=$('#notestat');const say=t=>{if(st)st.textContent=t};const d=await idb();
  for(const f of files){try{say(`Reading ${f.name}…`);let pages;if(/\.pdf$/i.test(f.name))pages=await pdfPages(f,(i,n)=>say(`Reading ${f.name}: page ${i} of ${n}`));else pages=[await f.text()];
    const id=Date.now().toString(36)+Math.random().toString(36).slice(2,6);let n=0;const tx=d.transaction(['docs','chunks'],'readwrite');const cs=tx.objectStore('chunks');
    pages.forEach((pg,i)=>{for(const c of chunkText(pg)){cs.add({doc:id,docName:f.name.replace(/\.[^.]+$/,''),page:pages.length>1?i+1:0,text:c});n++}});
    tx.objectStore('docs').put({id,name:f.name,pages:pages.length,chunks:n,added:dayStr()});await new Promise((r,j)=>{tx.oncomplete=r;tx.onerror=()=>j(tx.error)});
    if(!n)throw new Error(`No text found in ${f.name}. Scanned PDFs have no text layer.`);say(`Added ${f.name}: ${pages.length} page${pages.length>1?'s':''}.`)}catch(e){say(e.message||String(e))}}
  TUT.notes=null;notesModal(true)}
async function deleteDoc(id){const d=await idb();const tx=d.transaction(['docs','chunks'],'readwrite');const ix=tx.objectStore('chunks').index('doc');ix.openCursor(IDBKeyRange.only(id)).onsuccess=e=>{const c=e.target.result;if(c){c.delete();c.continue()}};tx.objectStore('docs').delete(id);await new Promise(r=>tx.oncomplete=r);TUT.notes=null;notesModal(true)}
async function notesModal(keep){const docs=await idbAll('docs').catch(()=>[]);const msg=keep&&$('#notestat')?$('#notestat').textContent:'';
  modal(`<div class="box-h"><h2 class="t-title">Your notes</h2><button class="icon-btn close" data-act="close" aria-label="Close">${ic('x')}</button></div>
   <p class="help" style="margin:0 0 12px">Import lecture notes or modules as PDF, .txt or .md. They stay on this device. When you ask a question, the passages most related to it are sent along, and the tutor uses them first.</p>
   ${docs.length?`<div class="group" style="margin-bottom:12px">${docs.map(d=>`<div class="row"><span class="main-t"><span class="t">${esc(d.name)}</span><span class="s">${d.pages} page${d.pages>1?'s':''}, ${d.chunks} passages</span></span><button class="icon-btn" data-act="notedel" data-id="${d.id}" aria-label="Remove ${esc(d.name)}">${ic('x',16)}</button></div>`).join('')}</div>`:''}
   <label class="btn btn-primary btn-block filebtn">Import files<input type="file" id="notefile" accept=".pdf,.txt,.md,application/pdf,text/plain" multiple></label>
   <p class="help" id="notestat" role="status" style="margin:10px 0 0">${esc(msg)}</p>`)}
document.addEventListener('change',e=>{if(e.target.id==='notefile'&&e.target.files.length)importNotes([...e.target.files])});

// ---------- model routes ----------
async function sampleFn(){if(TUT.sample!==undefined)return TUT.sample;try{TUT.sample=window.claude&&window.claude.use?await Promise.race([window.claude.use('sample'),new Promise(r=>setTimeout(()=>r(null),10500))]):null}catch(e){TUT.sample=null}
  if(TUT.sample&&TUT.sample.limits){try{const l=await TUT.sample.limits();TUT.img=!!(l&&l.images);if(TUT.img)TUT.imgMax=Math.min(4,l.images.maxCount||4)}catch(e){TUT.img=false}}return TUT.sample}
async function aiRoute(){if(await sampleFn())return'claude';if(aiCfg())return'key';return null}
function aiE(msg,code){const e=new Error(msg);e.code=code||'api';return e}
function normBase(b){return String(b||'').trim().replace(/\/+$/,'').replace(/\/chat\/completions$/,'')}
function hostOf(u){try{return new URL(u).host}catch(e){return'the server'}}
function scrub(t,key){t=String(t||'');return key&&key.length>6?t.split(key).join('••••'):t}
// One request shape per provider. messages: [{role:'user'|'assistant', content:string, imgs?:[{mime,b64}]}]
function provReq(c,system,messages,max){const P=c.prov;
  if(P==='anthropic')return{url:'https://api.anthropic.com/v1/messages',headers:{'content-type':'application/json','x-api-key':c.key,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
    body:{model:c.model,max_tokens:max,system,messages:messages.map(m=>({role:m.role,content:m.imgs&&m.imgs.length?[...m.imgs.map(i=>({type:'image',source:{type:'base64',media_type:i.mime,data:i.b64}})),{type:'text',text:m.content}]:m.content}))},
    text:j=>(j.content||[]).filter(b=>b.type==='text').map(b=>b.text).join('')};
  if(P==='gemini')return{url:`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(c.model.replace(/^models\//,''))}:generateContent`,headers:{'content-type':'application/json','x-goog-api-key':c.key},
    body:{system_instruction:{parts:[{text:system}]},contents:messages.map(m=>({role:m.role==='assistant'?'model':'user',parts:[{text:m.content},...(m.imgs||[]).map(i=>({inline_data:{mime_type:i.mime,data:i.b64}}))]})),generationConfig:{maxOutputTokens:max}},
    text:j=>{const c0=(j.candidates||[])[0];if(!c0){const r=j.promptFeedback&&j.promptFeedback.blockReason;if(r)throw aiE(`Gemini blocked this question (${r}). Try rewording it.`);return''}return((c0.content||{}).parts||[]).filter(p=>p.text&&!p.thought).map(p=>p.text).join('')}};
  const base=P==='openai'?'https://api.openai.com/v1':P==='openrouter'?'https://openrouter.ai/api/v1':normBase(c.base);
  const body={model:c.model,messages:[{role:'system',content:system},...messages.map(m=>({role:m.role,content:m.imgs&&m.imgs.length?[{type:'text',text:m.content},...m.imgs.map(i=>({type:'image_url',image_url:{url:`data:${i.mime};base64,${i.b64}`}}))]:m.content}))]};
  if(P==='openai')body.max_completion_tokens=max;else body.max_tokens=max;
  return{url:base+'/chat/completions',headers:{'content-type':'application/json',authorization:'Bearer '+c.key},body,
    text:j=>{const ch=(j.choices||[])[0];if(!ch)return'';const m=ch.message||{};return typeof m.content==='string'?m.content:Array.isArray(m.content)?m.content.map(p=>p.text||'').join(''):''}}}
function errMsg(c,s,j){const N=PROV[c.prov].n;let m='',code='';if(j){const e=Array.isArray(j)?j[0]&&j[0].error:j.error;m=typeof e==='string'?e:(e&&e.message)||j.message||'';code=e&&typeof e==='object'?String(e.code||e.type||''):''}m=String(m).replace(/\s+/g,' ').slice(0,180);
  if(s===401||s===403||/api key not valid|invalid.{0,20}(api )?key|incorrect api key/i.test(m))return`${N} rejected the key (${s}). Check it under API key.`;
  if(s===402||code==='insufficient_quota'||/credit|insufficient_quota|billing|current quota/i.test(m))return`Your ${N} account is out of credit, or billing isn’t set up.`;
  if(s===429)return`${N} rate limit reached. Wait a minute, then try again.`;
  if(s===404||/model.{0,40}(not found|does not exist|not exist|invalid)/i.test(m))return`${N} doesn’t recognise the model “${c.model}”. Check the model name under API key.`;
  if(s>=500)return`${N} is having trouble right now (${s}). Try again in a minute.`;
  return`The ${N} request failed (${s}).${m?' '+m:''}`}
async function provFetch(c,system,messages,max,signal){const r=provReq(c,system,messages,max);let res;
  try{res=await fetch(r.url,{method:'POST',signal,headers:r.headers,body:JSON.stringify(r.body)})}
  catch(e){if(e&&e.name==='AbortError')throw e;throw aiE(c.prov==='custom'?`Couldn’t reach ${hostOf(r.url)}. Check the base URL and your connection. The server also has to allow requests from web pages (CORS).`:`Couldn’t reach ${PROV[c.prov].n}. Check your connection and try again.`,'net')}
  let j=null;try{j=await res.json()}catch(_){}
  if(!res.ok)throw aiE(scrub(errMsg(c,res.status,j),c.key));
  return scrub(r.text(j||{}),c.key)}
async function callAI(system,messages,onText,signal){const sm=await sampleFn();
  if(sm){const last=messages[messages.length-1],opts={onText:({text})=>onText(text),signal,cache:false};if(last.blobs&&last.blobs.length)opts.images=last.blobs;
    const r=await sm([{role:'user',content:system+'\n\n---\n\n'+messages[0].content},...messages.slice(1)].map(m=>({role:m.role,content:m.content})),opts);return r.text}
  const c=aiCfg();if(!c)throw aiE('no_ai','no_ai');
  const t=await provFetch(c,system,messages,c.prov==='anthropic'?2000:4000,signal);onText(t);return t}

// ---------- attachments: photos, PDFs and text files sent with one question ----------
const IMG_MAX=1568,TXT_CAP=30000,TXT_TOTAL=60000,MAX_ATT=6;
const nf=n=>n.toLocaleString('en-CA');
function attAccept(){return IN_CLAUDE?(TUT.img?'image/*,':'')+'.txt,.md,text/plain,text/markdown':'image/*,.pdf,application/pdf,.txt,.md,text/plain,text/markdown'}
function attKind(f){const n=f.name||'',t=f.type||'';if(/^image\//.test(t)||/\.(jpe?g|png|webp|gif|heic|heif|avif)$/i.test(n))return'image';if(t==='application/pdf'||/\.pdf$/i.test(n))return'pdf';if(/^text\//.test(t)||/\.(txt|md|markdown|csv)$/i.test(n))return'text';return''}
function b64Of(blob){return new Promise((r,j)=>{const fr=new FileReader();fr.onload=()=>r(String(fr.result).split(',')[1]||'');fr.onerror=()=>j(fr.error);fr.readAsDataURL(blob)})}
async function decodeImg(f){const heic=/hei[cf]/i.test(f.type)||/\.hei[cf]$/i.test(f.name||'');
  if(window.createImageBitmap){try{return{src:await createImageBitmap(f),done(){this.src.close&&this.src.close()}}}catch(e){}}
  const url=URL.createObjectURL(f);const im=new Image();im.src=url;
  try{await im.decode();return{src:im,done(){URL.revokeObjectURL(url)}}}catch(e){URL.revokeObjectURL(url);throw new Error(heic?'Can’t open this HEIC photo here. Send a screenshot of it instead, or set Camera, Formats to Most Compatible.':'This image can’t be opened. Try a JPEG or PNG.')}}
function drawTo(src,w,h,max,q){const s=Math.min(1,max/Math.max(w,h)),cv=document.createElement('canvas');cv.width=Math.max(1,Math.round(w*s));cv.height=Math.max(1,Math.round(h*s));const x=cv.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,cv.width,cv.height);x.drawImage(src,0,0,cv.width,cv.height);return cv}
async function prepImage(f,a){if(f.size>40e6)throw new Error('This photo is too large (over 40 MB).');const d=await decodeImg(f);
  try{const w=d.src.width||d.src.naturalWidth,h=d.src.height||d.src.naturalHeight;if(!w||!h)throw new Error('This image can’t be opened. Try a JPEG or PNG.');
    const cv=drawTo(d.src,w,h,IMG_MAX);const blob=await new Promise((r,j)=>cv.toBlob(b=>b?r(b):j(new Error('Couldn’t process this photo.')),'image/jpeg',.85));
    a.blob=blob;a.mime='image/jpeg';a.b64=await b64Of(blob);a.thumb=drawTo(d.src,w,h,160).toDataURL('image/jpeg',.7);a.info=`Photo · ${cv.width}×${cv.height}`;a.file=null}finally{d.done()}}
async function prepDoc(f,a){let pages;
  if(a.kind==='pdf')pages=await pdfPages(f,(i,n)=>{a.info=`Reading page ${i} of ${n}…`;renderAtts()});else pages=[await f.text()];
  const txt=(pages.length>1?pages.map((p,i)=>`[page ${i+1}]\n${p.trim()}`).join('\n\n'):pages[0]).replace(/[ \t]+\n/g,'\n').replace(/\n{3,}/g,'\n\n').trim();
  if(!txt.replace(/\[page \d+\]/g,'').trim())throw new Error(a.kind==='pdf'?'No text in this PDF (scanned pages have none). Send a photo of the page instead.':'This file is empty.');
  a.cut=txt.length>TXT_CAP;a.text=txt.slice(0,TXT_CAP);a.total=txt.length;a.pages=pages.length;
  a.info=(a.kind==='pdf'?`PDF · ${pages.length} page${pages.length>1?'s':''}`:'Text file')+(a.cut?` · only the first ${nf(TXT_CAP)} of ${nf(txt.length)} characters are sent`:'')}
function addFiles(files){for(const f of files){
  if(TUT.atts.length>=MAX_ATT){toast(`Up to ${MAX_ATT} attachments per question`,'x');break}
  const kind=attKind(f);const a={id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),name:f.name||'photo.jpg',kind:kind||'file',busy:true,file:f,info:'Reading…'};TUT.atts.push(a);
  if(!kind){a.busy=false;a.err='Only photos, PDFs and .txt or .md files can be attached.';continue}
  if(kind==='image'&&IN_CLAUDE&&!TUT.img){a.busy=false;a.err='Photos can’t be sent to Claude from here.';continue}
  if(kind==='image'&&TUT.atts.filter(x=>x.kind==='image'&&!x.err).length>TUT.imgMax){a.busy=false;a.err=`Up to ${TUT.imgMax} photos per question.`;continue}
  a.p=(kind==='image'?prepImage(f,a):prepDoc(f,a)).catch(e=>{a.err=(e&&e.message)||'This file couldn’t be read.'}).finally(()=>{a.busy=false;renderAtts()})}
  renderAtts()}
function attsHtml(inModal){return TUT.atts.map(a=>`<div class="att${a.err?' bad':''}">${a.thumb?`<img src="${a.thumb}" alt="">`:`<span class="atic">${ic(a.kind==='image'?'image':'file',20)}</span>`}<span class="atn"><b>${esc(a.name)}</b><small>${esc(a.err||a.info||'')}</small></span>${!inModal&&a.kind!=='image'&&!a.err&&!a.busy&&a.file&&!a.saved?`<button class="btn btn-ghost btn-sm" data-act="attnote" data-id="${a.id}">Save to notes</button>`:''}<button class="icon-btn" data-act="attdel" data-id="${a.id}" aria-label="Remove ${esc(a.name)}">${ic('x',16)}</button></div>`).join('')}
function renderAtts(){const box=askEl('#atts');if(!box)return;box.hidden=!TUT.atts.length;box.innerHTML=attsHtml(!!box.closest('.inmodal'))}
function attDel(id){TUT.atts=TUT.atts.filter(a=>a.id!==id);renderAtts()}
function attNote(id){const a=TUT.atts.find(x=>x.id===id);if(!a||!a.file)return;a.saved=true;importNotes([a.file])}
document.addEventListener('change',e=>{if(e.target.id==='askfile'&&e.target.files.length){addFiles([...e.target.files]);e.target.value=''}});

// ---------- prompt ----------
const TUTOR_SYS=`You are the tutor inside Margin, a study app for a first-year University of Waterloo student taking MATH 135 (algebra and proofs), MATH 137 (calculus), CHEM 120 and PHYS 121.
Ground every answer in the COURSE MATERIAL below. It takes priority over your general knowledge: use its notation, theorem names (TD, DIC, CAD, LDET, FℓT, IVT, MVT…), constants (R_H = 2.179 × 10⁻¹⁸ J, R = 8.3145 L·kPa/(K·mol), g = 9.81 m/s²) and conventions. "Notes" passages are the student's own course notes and outrank "Lesson" passages.
After any claim taken from the material, cite it in square brackets with its label, for example [Notes: CHEM Module 4, p. 16] or [Lesson: Bézout & EEA].
If the material does not cover the question, say so in one short line ("Not in your notes; here's the general idea."), then answer from general knowledge.
Style: informal and brief. Work step by step with short numbered steps when solving. If the student is working on graded assignment questions, guide with hints rather than giving the final answer. Write math in plain Unicode (x², √, ≤, ∑, ∫); no LaTeX. No headings.`;
function ctxBlock(hits){return hits.length?hits.map(h=>`[${h.title}]\n${h.text.slice(0,1400)}`).join('\n\n'):'(No matching passages.)'}

// ---------- view ----------
function viewAsk(){const ctx=TUT.ctx;const k=ctx&&ctx.k&&REG[ctx.k];
  const sug=k?[`Explain ${k.name} simply`,`What's the most common mistake in ${k.name}?`,`Give me a practice question on ${k.name}`]:['Explain the Extended Euclidean Algorithm','Why is O₂ paramagnetic?','When do I use L\'Hôpital\'s Rule?','How do I draw a free-body diagram on an incline?'];
  return`<div class="ask"><div class="ask-h"><div><h1 class="t-title">Ask</h1><p class="t-sub">Answers use your notes first, then the lessons. Sources are cited in brackets. Attach a photo or file with the clip.</p></div></div>
   <div class="ask-tools">${IN_CLAUDE?'':`<button class="btn btn-secondary btn-sm" data-act="aisettings" id="keybtn">${keyBtnHtml()}</button>`}<button class="btn btn-ghost btn-sm" data-act="notes">${ic('book',16)} Your notes</button></div>
   ${k?`<div class="ctxchip">${markEl(ctx.k)}<span>About <b>${k.name}</b>${ctx.q?', this question':''}</span><button class="icon-btn" data-act="askclear" aria-label="Remove topic">${ic('x',15)}</button></div>`:''}
   <div id="aiwarn">${!IN_CLAUDE&&!aiCfg()?noKeyHtml():''}</div>
   <div class="msgs" id="msgs" aria-live="polite">${TUT.msgs.length?TUT.msgs.map(msgHtml).join(''):`<div class="sugs">${sug.map(t=>`<button class="sug" data-act="asksug">${esc(t)}</button>`).join('')}</div>`}</div>
   <div class="composer"><div class="atts" id="atts"${TUT.atts.length?'':' hidden'}>${attsHtml(false)}</div>
   <form class="cform" id="askform"><label class="attbtn filebtn" aria-label="Attach a photo or file">${ic('clip',20)}<input type="file" id="askfile" accept="${attAccept()}" multiple aria-label="Attach a photo or file"></label><textarea id="askin" rows="1" placeholder="Ask about your courses" aria-label="Your question"></textarea><button class="btn btn-primary send" type="submit" id="asksend" aria-label="Send">${ic('chev',18,2.2)}</button></form></div></div>`}
function keyBtnHtml(){const c=aiCfg();return`${ic('key',16)}<span>API key</span><span class="kst${c?' on':''}">${c?'Connected · '+PROV[c.prov].s:'Not set'}</span>`}
function noKeyHtml(){return`<div class="tip keycta">${ic('key',17)}<div><div class="lbl">Connect the tutor</div>Paste an API key from Anthropic, OpenAI, Google Gemini, OpenRouter or any OpenAI-compatible service. It stays on this device.<button class="btn btn-primary btn-block" data-act="aisettings">${ic('key',16)} Add API key</button></div></div>`}
function askRefresh(){const b=$('#keybtn');if(b)b.innerHTML=keyBtnHtml();showRoute()}
function md(t){let h=esc(t);h=h.replace(/\*\*([^*\n]+)\*\*/g,'<b>$1</b>').replace(/`([^`\n]+)`/g,'<code>$1</code>').replace(/\[((?:Notes|Lesson):[^\]\n]{1,120})\]/g,'<span class="cite">$1</span>');
  const lines=h.split('\n');let out='',list=null;for(const l of lines){const m=l.match(/^\s*(\d+)[.)]\s+(.*)$/),b=l.match(/^\s*[-•*]\s+(.*)$/);if(m||b){const tag=m?'ol':'ul';if(list!==tag){if(list)out+=`</${list}>`;out+=`<${tag}>`;list=tag}out+=`<li>${(m?m[2]:b[1])}</li>`}else{if(list){out+=`</${list}>`;list=null}if(l.trim())out+=`<p>${l}</p>`}}if(list)out+=`</${list}>`;return out}
function mattsHtml(m){return m.atts&&m.atts.length?`<div class="matts">${m.atts.map(a=>a.thumb?`<img src="${a.thumb}" alt="${esc(a.name)}">`:`<span class="mfile">${ic('file',14)}<span>${esc(a.name)}</span></span>`).join('')}</div>`:''}
function msgHtml(m){return m.role==='user'?`<div class="msg me">${mattsHtml(m)}${esc(m.show!=null?m.show:m.content)}</div>`:`<div class="msg ai">${m.content?md(m.content):m.err?'':'<span class="typing">Thinking…</span>'}${m.err?`<p class="xerr">${esc(m.err)}</p>`:''}</div>`}
function renderMsgs(){const box=askEl('#msgs');if(!box)return;box.innerHTML=TUT.msgs.map(msgHtml).join('');const last=box.lastElementChild;if(last)last.scrollIntoView({block:'end',behavior:'smooth'})}
async function showRoute(){const w=askEl('#aiwarn');if(!w)return;const r=await aiRoute();document.querySelectorAll('#askfile').forEach(i=>i.accept=attAccept());if(r)return w.innerHTML='';
  w.innerHTML=IN_CLAUDE?`<div class="tip">${ic('hint',17)}<div><div class="lbl">Connect the tutor</div>The tutor needs Claude access. Allow it when Claude asks, or use the phone app with your own API key.</div></div>`:noKeyHtml()}
async function askSend(text,show){if(TUT.busy)return;text=String(text||'');if(!text.trim()&&!TUT.atts.some(a=>!a.err))return;TUT.busy=true;const btn0=askEl('#asksend');if(btn0)btn0.disabled=true;
  await Promise.all(TUT.atts.map(a=>a.p).filter(Boolean));const atts=TUT.atts.filter(a=>!a.err&&!a.busy);TUT.atts=[];renderAtts();
  const imgs=atts.filter(a=>a.kind==='image'),docs=atts.filter(a=>a.kind!=='image');const ctx=TUT.ctx;const k=ctx&&ctx.k;
  const q=text.trim()||(imgs.length?'Help me with what’s in this photo.':'Help me with this file.');
  let room=TXT_TOTAL;const fileBlock=docs.map(a=>{const t=a.text.slice(0,Math.max(0,room));room-=t.length;const cut=a.cut||t.length<a.text.length;return`ATTACHED FILE: ${a.name}${cut?` (only the first ${nf(t.length)} of ${nf(a.total)} characters)`:''}\n${t}`}).join('\n\n');
  const content=q+(imgs.length?`\n\n(${imgs.length} photo${imgs.length>1?'s':''} attached.)`:'')+(fileBlock?'\n\n'+fileBlock:'');
  const qCtx=[q,docs.map(a=>a.text.slice(0,600)).join(' '),k?REG[k].name:'',ctx&&ctx.q?strip(ctx.q.prompt):''].join(' ');
  const notes=search(await notesIndex(),qCtx,5),less=search(lessonIndex(),qCtx,3);if(k&&!less.some(h=>h.k===k)){const own=lessonIndex().chunks.find(c=>c.k===k);if(own)less.unshift(own)}
  let first=`COURSE MATERIAL\n\n${ctxBlock([...notes,...less.slice(0,4)])}`;
  if(ctx&&ctx.q){const qq=ctx.q;const opt=o=>strip(o.html);first+=`\n\nTHE QUESTION THE STUDENT IS LOOKING AT\n${strip(qq.prompt)}\nOptions: ${qq.options.map(opt).join(' | ')}\nCorrect answer: ${opt(qq.options.find(o=>o.key===qq.answer)||{html:qq.answer})}${ctx.picked?`\nStudent picked: ${opt(qq.options.find(o=>o.key===ctx.picked)||{html:ctx.picked})}`:''}\nApp's worked steps: ${(qq.steps||[]).map(strip).join(' / ')}`}
  const history=TUT.msgs.filter(m=>m.content&&!m.err).slice(-6).map(m=>({role:m.role,content:m.content,imgs:m.imgs}));
  const userTurn={role:'user',content,show:show!=null?show:text.trim(),atts:atts.map(a=>({kind:a.kind,name:a.name,thumb:a.thumb})),imgs:imgs.map(a=>({mime:a.mime,b64:a.b64}))};TUT.msgs.push(userTurn);const ai={role:'assistant',content:''};TUT.msgs.push(ai);renderMsgs();
  const messages=[...(history.length?[{role:'user',content:first+'\n\n(Earlier conversation follows.)'},{role:'assistant',content:'Understood.'},...history]:[]),{role:'user',content:(history.length?'':first+'\n\nSTUDENT\'S QUESTION\n')+content,imgs:userTurn.imgs,blobs:imgs.map(a=>a.blob)}];
  let left=TUT.imgMax;for(let i=messages.length-1;i>=0;i--){const m=messages[i];if(!m.imgs||!m.imgs.length)continue;if(left<=0){m.imgs=null;continue}if(m.imgs.length>left)m.imgs=m.imgs.slice(-left);left-=m.imgs.length}
  TUT.abort=new AbortController();
  try{await callAI(TUTOR_SYS,messages,t=>{ai.content=t;renderMsgs()},TUT.abort.signal);if(!ai.content)ai.err='No answer came back. Try again.'}
  catch(e){ai.err=e.code==='no_ai'?'The tutor isn’t connected. Tap API key above to add one, or use Margin in Claude.':e.code==='not_granted'?'Claude access wasn’t allowed. Allow it to use the tutor.':e.code==='rate_limited'?'Too many questions at once. Wait a moment, then try again.':e.code==='image_rejected'||e.code==='images_unavailable'?'Claude couldn’t take that photo here. Try a different one, or describe it in words.':(e.message||'Something went wrong.');
    if(!ai.content){TUT.msgs=TUT.msgs.filter(m=>m!==userTurn);if(atts.length&&!TUT.atts.length){TUT.atts=atts;renderAtts()}}}
  TUT.busy=false;renderMsgs();if(askEl('#asksend'))askEl('#asksend').disabled=false}
function askAbout(k,q,picked,autoQ){TUT.ctx={k,q,picked};TUT.msgs=[];TUT.atts=[];go('ask');if(autoQ)setTimeout(()=>askSend(autoQ),50)}
document.addEventListener('submit',e=>{if(e.target.id==='askform'){e.preventDefault();const t=askEl('#askin');const v=t.value;t.value='';t.style.height='';askSend(v)}});
document.addEventListener('keydown',e=>{if(e.target.id==='askin'&&e.key==='Enter'&&!e.shiftKey){e.preventDefault();e.target.form.requestSubmit()}},true);
document.addEventListener('input',e=>{if(e.target.id==='askin'){e.target.style.height='auto';e.target.style.height=Math.min(160,e.target.scrollHeight)+'px'}});

// ---------- settings: provider and key ----------
let AIS={manual:false};
function aiSettings(){const c=aiCfg();
  if(IN_CLAUDE)return modal(`<div class="box-h"><h2 class="t-title">AI tutor</h2><button class="icon-btn close" data-act="close" aria-label="Close">${ic('x')}</button></div>
    <p class="help" style="margin:0 0 12px">Inside Claude, the tutor uses your Claude account, so there’s nothing to set up. API keys (Anthropic, OpenAI, Gemini, OpenRouter or OpenAI-compatible) are for the phone app.</p>
    <div class="stack" style="margin-top:12px"><button class="btn btn-ghost btn-block" data-act="notes">${ic('book',16)} Your notes</button><button class="btn btn-ghost btn-block" data-act="settings">Back to settings</button></div>`);
  const p=c?c.prov:'anthropic';AIS={manual:false,saved:c};
  modal(`<div class="box-h"><h2 class="t-title">API key</h2><button class="icon-btn close" data-act="close" aria-label="Close">${ic('x')}</button></div>
  <p class="help" style="margin:0 0 14px">${c?`<b class="okc">Connected · ${esc(PROV[c.prov].n)}</b>, model ${esc(c.model)}. Paste a new key to replace it.`:'Paste an API key from any provider. Margin works out which one it is from the key.'} You pay the provider per question, usually a cent or two.</p>
  <div class="aiform">
   <label class="aif" for="aikey">API key</label>
   <div class="keyrow"><input id="aikey" class="textin" type="password" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="${c?'Saved. Paste to replace':'Paste your key'}"><button class="icon-btn keyeye" type="button" data-act="keyshow" aria-label="Show key" aria-pressed="false">${ic('eye',18)}</button>${navigator.clipboard&&navigator.clipboard.readText?`<button class="btn btn-secondary keypaste" type="button" data-act="keypaste">Paste</button>`:''}</div>
   <label class="aif" for="aiprov">Provider</label>
   <select id="aiprov" class="textin">${Object.keys(PROV).map(k=>`<option value="${k}"${k===p?' selected':''}>${esc(PROV[k].n)}</option>`).join('')}</select>
   <p class="help" id="aidet" style="margin:-4px 0 0">${c?'':'Detected from the key, or pick one.'}</p>
   <div id="aibaserow"${p==='custom'?'':' hidden'}><label class="aif" for="aibase">Base URL</label><input id="aibase" class="textin" type="url" inputmode="url" autocapitalize="off" spellcheck="false" placeholder="https://…/v1" value="${esc(c&&c.base||'')}"></div>
   <label class="aif" for="aimodel">Model</label>
   <input id="aimodel" class="textin" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Model name from your provider" value="${esc(c?c.model:PROV[p].model)}">
   <p class="help" id="ainote" style="margin:0">${esc(PROV[p].get)}</p>
  </div>
  <p class="help aitest" id="aitest" role="status" aria-live="polite"></p>
  <div class="stack" style="margin-top:12px"><button class="btn btn-primary btn-block" data-act="aikeysave">Save</button><button class="btn btn-secondary btn-block" data-act="aitest">Test key</button>${c?'<button class="btn btn-ghost btn-block" data-act="aikeydel" style="color:var(--bad)">Remove key</button>':''}<button class="btn btn-ghost btn-block" data-act="notes">${ic('book',16)} Your notes</button><button class="btn btn-ghost btn-block" data-act="settings">Back to settings</button></div>
  <p class="help" style="margin:12px 0 0">The key is stored only on this device, sent only to the provider you pick, and never included in progress codes.</p>`)}
function aiSetProv(p,auto){const sel=$('#aiprov'),m=$('#aimodel');if(!sel||!PROV[p])return;const was=sel.value;sel.value=p;
  if(m&&(!m.value.trim()||Object.values(PROV).some(x=>x.model===m.value.trim())))m.value=PROV[p].model;
  $('#aibaserow').hidden=p!=='custom';$('#ainote').textContent=PROV[p].get;$('#aidet').textContent=auto?`Looks like a${/^[AEIOU]/.test(PROV[p].n)?'n':''} ${PROV[p].n} key.`:'';if(was!==p)$('#aitest').textContent=''}
function aiForm(){const key=($('#aikey').value||'').trim()||(AIS.saved&&AIS.saved.key)||'',prov=$('#aiprov').value,model=($('#aimodel').value||'').trim(),base=normBase($('#aibase')?$('#aibase').value:'');
  const st=$('#aitest');const bad=t=>{st.textContent=t;st.className='help aitest bad';return null};
  if(!key)return bad('Paste a key first.');if(/\s/.test(key))return bad('That key has spaces in it. Copy it again.');if(!model)return bad('Enter a model name.');
  if(prov==='custom'&&!/^https:\/\/|^http:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/.test(base))return bad('Enter the base URL, starting with https://');
  return{prov,key,model,base:prov==='custom'?base:''}}
function aiKeySave(){const c=aiForm();if(!c)return;try{localStorage.setItem(AICFG,JSON.stringify(c));localStorage.removeItem(AIKEY)}catch(e){toast('Couldn’t save on this device','x');return}toast(`Saved · ${PROV[c.prov].s}`,'check');closeModal(true);askRefresh()}
function aiKeyDel(){try{localStorage.removeItem(AICFG);localStorage.removeItem(AIKEY)}catch(e){}toast('Key removed','check');aiSettings();askRefresh()}
async function aiTest(){const c=aiForm();if(!c)return;const st=$('#aitest');st.className='help aitest';st.textContent=`Testing ${PROV[c.prov].n}…`;const b=document.querySelector('[data-act=aitest]');if(b)b.disabled=true;
  try{await provFetch(c,'Reply with the single word OK.',[{role:'user',content:'Say OK.'}],32);if(!$('#aitest'))return;st.textContent=`It works: ${PROV[c.prov].n} answered using ${c.model}. Tap Save to keep it.`;st.className='help aitest ok'}
  catch(e){if(!$('#aitest'))return;st.textContent=e.message||'The test failed.';st.className='help aitest bad'}finally{if(b)b.disabled=false}}
function keyShow(btn){const i=$('#aikey');if(!i)return;const on=i.type==='password';i.type=on?'text':'password';btn.setAttribute('aria-pressed',String(on));btn.setAttribute('aria-label',on?'Hide key':'Show key');btn.innerHTML=ic(on?'eyeoff':'eye',18)}
async function keyPaste(){try{const t=(await navigator.clipboard.readText()||'').trim();if(!t){toast('The clipboard is empty','x');return}const i=$('#aikey');i.value=t;i.dispatchEvent(new Event('input',{bubbles:true}))}catch(e){toast('Clipboard blocked. Long-press the box and tap Paste.','x')}}
document.addEventListener('input',e=>{if(e.target.id==='aikey'&&!AIS.manual){const p=detectProv(e.target.value);if(p)aiSetProv(p,true)}});
document.addEventListener('change',e=>{if(e.target.id==='aiprov'){AIS.manual=true;aiSetProv(e.target.value,false)}});
