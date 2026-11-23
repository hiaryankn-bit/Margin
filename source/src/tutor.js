// ===== Ask: an AI tutor grounded in the course =====
// Sources, in priority order: the student's own imported notes (stored on this device only),
// then the app's lessons. Only the few most relevant passages are sent with each question.
// Model route: Claude's built-in `sample` capability in the Claude version; the student's own
// Anthropic API key (stored on this device only, never in progress codes) in the phone app.

let TUT={msgs:[],ctx:null,busy:false,notes:null,lessons:null,sample:undefined,abort:null};
const AIKEY='margin_ai_key',AIMODEL='claude-sonnet-5-5';
function tutKey(){try{return localStorage.getItem(AIKEY)||''}catch(e){return''}}

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
async function pdfPages(file,onProg){let lib;try{lib=await import(new URL('lib/pdf.min.mjs',location.href).href)}catch(e){throw new Error('PDF reading is only available in the phone app. Here, import a .txt or .md file instead.')}
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
async function sampleFn(){if(TUT.sample!==undefined)return TUT.sample;try{TUT.sample=window.claude&&window.claude.use?await Promise.race([window.claude.use('sample'),new Promise(r=>setTimeout(()=>r(null),10500))]):null}catch(e){TUT.sample=null}return TUT.sample}
async function aiRoute(){if(await sampleFn())return'claude';if(tutKey())return'key';return null}
async function callAI(system,messages,onText,signal){const sm=await sampleFn();
  if(sm){const r=await sm([{role:'user',content:system+'\n\n---\n\n'+messages[0].content},...messages.slice(1)],{onText:({text})=>onText(text),signal,cache:false});return r.text}
  const key=tutKey();if(!key){const e=new Error('no_ai');e.code='no_ai';throw e}
  const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',signal,headers:{'content-type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},body:JSON.stringify({model:AIMODEL,max_tokens:1200,system,messages})});
  if(!res.ok){let m='';try{m=(await res.json()).error.message}catch(_){}const e=new Error(res.status===401?'The API key was rejected. Check it in Settings.':res.status===429?'Rate limited. Wait a moment and try again.':res.status===400&&/credit/i.test(m)?'Your Anthropic account is out of credit.':`The AI request failed (${res.status}). ${m}`);e.code='api';throw e}
  const j=await res.json();const t=(j.content||[]).filter(b=>b.type==='text').map(b=>b.text).join('');onText(t);return t}

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
  return`<div class="ask"><div class="ask-h"><div><h1 class="t-title">Ask</h1><p class="t-sub">Answers use your notes first, then the lessons. Sources are cited in brackets.</p></div><button class="btn btn-ghost btn-sm" data-act="notes">${ic('book',16)} Your notes</button></div>
   ${k?`<div class="ctxchip">${markEl(ctx.k)}<span>About <b>${k.name}</b>${ctx.q?', this question':''}</span><button class="icon-btn" data-act="askclear" aria-label="Remove topic">${ic('x',15)}</button></div>`:''}
   <div class="msgs" id="msgs" aria-live="polite">${TUT.msgs.length?TUT.msgs.map(msgHtml).join(''):`<div class="sugs">${sug.map(t=>`<button class="sug" data-act="asksug">${esc(t)}</button>`).join('')}</div>`}</div>
   <div id="aiwarn"></div>
   <form class="composer" id="askform"><textarea id="askin" rows="1" placeholder="Ask a question about your courses" aria-label="Your question"></textarea><button class="btn btn-primary" type="submit" id="asksend" aria-label="Send">${ic('chev',18,2.2)}</button></form></div>`}
function md(t){let h=esc(t);h=h.replace(/\*\*([^*\n]+)\*\*/g,'<b>$1</b>').replace(/`([^`\n]+)`/g,'<code>$1</code>').replace(/\[((?:Notes|Lesson):[^\]\n]{1,120})\]/g,'<span class="cite">$1</span>');
  const lines=h.split('\n');let out='',list=null;for(const l of lines){const m=l.match(/^\s*(\d+)[.)]\s+(.*)$/),b=l.match(/^\s*[-•*]\s+(.*)$/);if(m||b){const tag=m?'ol':'ul';if(list!==tag){if(list)out+=`</${list}>`;out+=`<${tag}>`;list=tag}out+=`<li>${(m?m[2]:b[1])}</li>`}else{if(list){out+=`</${list}>`;list=null}if(l.trim())out+=`<p>${l}</p>`}}if(list)out+=`</${list}>`;return out}
function msgHtml(m){return m.role==='user'?`<div class="msg me">${esc(m.show||m.content)}</div>`:`<div class="msg ai">${m.content?md(m.content):'<span class="typing">Thinking…</span>'}${m.err?`<p class="xerr">${esc(m.err)}</p>`:''}</div>`}
function renderMsgs(){const box=$('#msgs');if(!box)return;box.innerHTML=TUT.msgs.map(msgHtml).join('');const last=box.lastElementChild;if(last)last.scrollIntoView({block:'end',behavior:'smooth'})}
async function showRoute(){const w=$('#aiwarn');if(!w)return;const r=await aiRoute();if(r)return w.innerHTML='';w.innerHTML=`<div class="tip">${ic('hint',17)}<div><div class="lbl">Connect the tutor</div>The phone app needs your own Anthropic API key (Settings, AI tutor). Or open Margin in Claude, where the tutor works without a key.</div></div>`}
async function askSend(text,show){if(TUT.busy||!text.trim())return;TUT.busy=true;const ctx=TUT.ctx;const k=ctx&&ctx.k;
  const q=text.trim();const qCtx=[q,k?REG[k].name:'',ctx&&ctx.q?strip(ctx.q.prompt):''].join(' ');
  const notes=search(await notesIndex(),qCtx,5),less=search(lessonIndex(),qCtx,3);if(k&&!less.some(h=>h.k===k)){const own=lessonIndex().chunks.find(c=>c.k===k);if(own)less.unshift(own)}
  let first=`COURSE MATERIAL\n\n${ctxBlock([...notes,...less.slice(0,4)])}`;
  if(ctx&&ctx.q){const qq=ctx.q;const opt=o=>strip(o.html);first+=`\n\nTHE QUESTION THE STUDENT IS LOOKING AT\n${strip(qq.prompt)}\nOptions: ${qq.options.map(opt).join(' | ')}\nCorrect answer: ${opt(qq.options.find(o=>o.key===qq.answer)||{html:qq.answer})}${ctx.picked?`\nStudent picked: ${opt(qq.options.find(o=>o.key===ctx.picked)||{html:ctx.picked})}`:''}\nApp's worked steps: ${(qq.steps||[]).map(strip).join(' / ')}`}
  const history=TUT.msgs.filter(m=>m.content&&!m.err).slice(-6).map(m=>({role:m.role,content:m.content}));
  const userTurn={role:'user',content:q,show};TUT.msgs.push(userTurn);const ai={role:'assistant',content:''};TUT.msgs.push(ai);renderMsgs();
  const messages=[...(history.length?[{role:'user',content:first+'\n\n(Earlier conversation follows.)'},{role:'assistant',content:'Understood.'},...history]:[]),{role:'user',content:(history.length?'':first+'\n\nSTUDENT\'S QUESTION\n')+q}];
  const btn=$('#asksend');if(btn)btn.disabled=true;TUT.abort=new AbortController();
  try{await callAI(TUTOR_SYS,messages,t=>{ai.content=t;renderMsgs()},TUT.abort.signal);if(!ai.content)ai.err='No answer came back. Try again.'}
  catch(e){ai.err=e.code==='no_ai'?'The tutor isn’t connected. Add an API key in Settings, AI tutor, or use Margin in Claude.':e.code==='not_granted'?'Claude access wasn’t allowed. Allow it to use the tutor.':e.code==='rate_limited'?'Too many questions at once. Wait a moment, then try again.':(e.message||'Something went wrong.');TUT.msgs=TUT.msgs.filter(m=>m!==userTurn||ai.content)}
  TUT.busy=false;renderMsgs();if($('#asksend'))$('#asksend').disabled=false}
function askAbout(k,q,picked,autoQ){TUT.ctx={k,q,picked};TUT.msgs=[];go('ask');if(autoQ)setTimeout(()=>askSend(autoQ),50)}
document.addEventListener('submit',e=>{if(e.target.id==='askform'){e.preventDefault();const t=$('#askin');const v=t.value;t.value='';t.style.height='';askSend(v)}});
document.addEventListener('keydown',e=>{if(e.target.id==='askin'&&e.key==='Enter'&&!e.shiftKey){e.preventDefault();$('#askform').requestSubmit()}},true);
document.addEventListener('input',e=>{if(e.target.id==='askin'){e.target.style.height='auto';e.target.style.height=Math.min(160,e.target.scrollHeight)+'px'}});

// ---------- settings ----------
function aiSettings(){const has=!!tutKey();modal(`<div class="box-h"><h2 class="t-title">AI tutor</h2><button class="icon-btn close" data-act="close" aria-label="Close">${ic('x')}</button></div>
  <p class="help" style="margin:0 0 12px">In Claude, the tutor works without setup. In the phone app it needs your own Anthropic API key, billed by Anthropic per question (roughly a cent or two each). The key is stored only on this device and is never included in progress codes.</p>
  <input id="aikey" class="textin" type="password" autocomplete="off" placeholder="${has?'Key saved. Paste a new one to replace it':'sk-ant-…'}" aria-label="Anthropic API key">
  <p class="help" style="margin:8px 0 0">Get a key at console.anthropic.com, and set a monthly spend limit there.</p>
  <div class="stack" style="margin-top:12px"><button class="btn btn-primary btn-block" data-act="aikeysave">Save key</button>${has?'<button class="btn btn-ghost btn-block" data-act="aikeydel" style="color:var(--bad)">Remove key</button>':''}<button class="btn btn-ghost btn-block" data-act="notes">${ic('book',16)} Your notes</button><button class="btn btn-ghost btn-block" data-act="settings">Back to settings</button></div>`)}
function aiKeySave(){const v=($('#aikey').value||'').trim();if(!/^sk-ant-/.test(v)){toast('That doesn’t look like an Anthropic key (sk-ant-…)','x');return}try{localStorage.setItem(AIKEY,v)}catch(e){}toast('Key saved on this device','check');closeModal(true);showRoute()}
