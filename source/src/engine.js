// =====================================================================
// Margin learning engine
//  1. Prerequisite graph between topics
//  2. Learning profile (per-topic aggregates in S.lp) + on-device event log (IndexedDB)
//  3. Mastery estimate with uncertainty (recency-weighted Beta posterior)
//  4. FSRS-4.5-style memory model: stability, difficulty, predicted recall
//  5. Diagnosis of weak prerequisites, daily plan with reasons, insights, exam readiness
// Everything here is computed from recorded activity only. Nothing is invented.
// =====================================================================

// ---------- 1. Prerequisite graph (topic key → topics it builds on) ----------
let PREREQ_=null;
const PRE=()=>PREREQ_||(PREREQ_=(()=>{const P={};const add=(c,m)=>{for(const k in m)P[c+'_'+k]=m[k].map(x=>c+'_'+x)};
 add('m135',{neg:['truth'],impl:['truth','neg'],div:['impl'],quant:['neg','div'],method:['impl'],err:['div','method'],prooflab:['method','err'],
  rec:['div'],ind:['rec','impl'],setlogic:['setops','quant'],divalg:['div'],gcd:['divalg'],eea:['gcd'],gcdprops:['eea','div'],ufc:['gcdprops'],
  lde:['eea'],cong:['divalg'],lct:['cong','lde'],warm:['cong'],inv:['warm','eea'],mat:['inv'],sys:['mat'],flt:['cong'],poly:['flt'],trap:['flt'],
  crt2:['lct'],crt3:['crt2'],crtd:['crt2','inv'],split:['crt2'],rsa:['flt','inv','crt2'],rsac:['rsa'],cpolar:['cstd'],dm:['cpolar'],roots:['dm'],cpoly:['roots','cstd']});
 add('m137',{tri:['abs'],seqlim:['rec'],epsN:['seqlim','abs'],sup:['seqlim'],geo:['seqlim'],series:['geo'],limalg:['seqlim'],limtrig:['limalg'],liminf:['limalg'],
  onesided:['limalg'],seqchar:['seqlim','limalg'],contk:['onesided'],disc:['onesided'],ivt:['contk'],bisect:['ivt'],evt:['ivt'],defn:['limalg'],rules:['defn'],
  trig:['rules','limtrig'],ift:['rules'],implicit:['rules'],lin:['rules'],linerr:['lin'],newton:['lin'],related:['implicit'],crit:['rules'],absext:['crit','evt'],
  mvtc:['rules','contk'],mvtb:['mvtc'],lhop:['rules','limalg'],taylor:['rules'],rem:['taylor','mvtb'],bigO:['taylor']});
 add('chem',{limiting:['mole','balance'],precip:['balance'],green:['limiting'],bohr:['light'],debroglie:['light'],qn:['bohr'],nodes:['qn'],config:['qn'],trend:['config'],
  vsepr:['formal'],formal:['config'],bond:['formal'],hybrid:['vsepr'],mo:['config'],vbmo:['hybrid','mo'],gas:['mole'],kmt:['gas'],imf:['vsepr']});
 add('phys',{kin:['units'],graph:['kin'],proj:['kin','vec'],rel:['vec'],circ:['vec','kin'],newton:['vec'],incline:['newton'],atwood:['newton'],bank:['circ','incline'],
  work:['newton','vec'],energy:['work'],mom:['newton','energy'],rot:['energy','newton'],rotb:['rot']});
 for(const k in P)P[k]=P[k].filter(x=>REG[x]);return P})());
const dependents=k=>Object.keys(PRE()).filter(x=>PRE()[x].includes(k));

// ---------- 2. Learning profile ----------
const ERR_TYPES=[['concept','Didn’t understand the idea'],['formula','Wrong formula or rule'],['calc','Calculation slip'],['misread','Misread the question'],['method','Wrong method'],['prereq','Missing background']];
const CONF=[['guess','Guessed'],['unsure','Unsure'],['sure','Sure']];
function lp(k){S.lp=S.lp||{};return S.lp[k]||(S.lp[k]={n:0,c:0,ms:0,msN:0,hn:0,hc:0,cf:{},err:{},last:0,lastOk:0,fs:null})}
// on-device event log (IndexedDB). Falls back silently where IndexedDB isn't available.
const EVDB={db:null,ok:true};
function evOpen(){if(EVDB.db||!EVDB.ok)return Promise.resolve(EVDB.db);return new Promise(res=>{try{const r=indexedDB.open('margin_learn',1);r.onupgradeneeded=()=>{const d=r.result;if(!d.objectStoreNames.contains('ev')){const s=d.createObjectStore('ev',{keyPath:'id',autoIncrement:true});s.createIndex('k','k');s.createIndex('t','t')}if(!d.objectStoreNames.contains('bk'))d.createObjectStore('bk',{keyPath:'day'})};r.onsuccess=()=>{EVDB.db=r.result;res(EVDB.db)};r.onerror=()=>{EVDB.ok=false;res(null)}}catch(e){EVDB.ok=false;res(null)}})}
async function evAdd(e){const d=await evOpen();if(!d)return null;return new Promise(res=>{try{const tx=d.transaction('ev','readwrite');const r=tx.objectStore('ev').add(e);r.onsuccess=()=>res(r.result);r.onerror=()=>res(null)}catch(x){res(null)}})}
async function evPatch(id,patch){const d=await evOpen();if(!d||id==null)return;try{const st=d.transaction('ev','readwrite').objectStore('ev');const g=st.get(id);g.onsuccess=()=>{if(g.result)st.put(Object.assign(g.result,patch))}}catch(x){}}
async function evAll(){const d=await evOpen();if(!d)return[];return new Promise(res=>{try{const q=d.transaction('ev').objectStore('ev').getAll();q.onsuccess=()=>res(q.result||[]);q.onerror=()=>res([])}catch(x){res([])}})}
// record one answered question
function lpRecord(q,ok,o){const k=q.nk,a=lp(k),now=Date.now();a.n++;if(ok){a.c++;a.lastOk=now}a.last=now;
 const ms=Math.max(0,Math.min(15*60e3,o.ms||0));if(ms>0){a.ms+=ms;a.msN++}if(o.hint){a.hn++;if(ok)a.hc++}
 const s=srs(k);s.m=s.m||[];s.m.push((o.hint?1:0)|(o.hard?2:0));while(s.m.length>s.h.length)s.m.shift();
 const ev={t:now,k,ok:ok?1:0,ms,hint:o.hint?1:0,hard:o.hard?1:0,sel:q.sel?1:0,rt:o.rt||'',q:strip(q.prompt).slice(0,160)};
 RD&&(RD.lastEv=null);evAdd(ev).then(id=>{if(RD)RD.lastEv=id});return ev}
function lpConf(k,level,ok){const a=lp(k);const c=a.cf[level]||(a.cf[level]=[0,0]);c[0]++;if(ok)c[1]++;if(RD&&RD.lastEv!=null)evPatch(RD.lastEv,{conf:level});save()}
function lpErr(k,type,mid){const a=lp(k);a.err[type]=(a.err[type]||0)+1;const m=S.mistakes.find(x=>x.mid===mid)||S.mistakes.filter(x=>x.nk===k).slice(-1)[0];if(m)m.why=type;if(RD&&RD.lastEv!=null)evPatch(RD.lastEv,{err:type});save()}
// daily automatic backups of the whole progress object, last 7 days kept
async function lpBackup(force){const d=await evOpen();if(!d)return;const day=dayStr();try{const st=d.transaction('bk','readwrite').objectStore('bk');const g=st.get(day);g.onsuccess=()=>{if(g.result&&!force)return;st.put({day,at:Date.now(),data:JSON.stringify(S)});const all=st.getAllKeys();all.onsuccess=()=>{const ks=(all.result||[]).sort();while(ks.length>7)st.delete(ks.shift())}}}catch(e){}}
async function lpBackups(){const d=await evOpen();if(!d)return[];return new Promise(res=>{try{const q=d.transaction('bk').objectStore('bk').getAll();q.onsuccess=()=>res((q.result||[]).sort((a,b)=>b.day.localeCompare(a.day)));q.onerror=()=>res([])}catch(e){res([])}})}

// ---------- 3. Mastery estimate with uncertainty ----------
// Beta(1,1) prior; each recent answer weighted by recency (0.85 per step back),
// harder formats (typed, multi-select) count 1.25×, answers given after a hint count half.
function lpMastery(k){const s=S.srs[k];if(!s||!s.h.length)return{pct:0,lo:0,hi:0,n:0,neff:0,conf:'none'};
 const h=s.h,m=s.m||[],off=h.length-m.length;let a=1,b=1,ne=0;
 for(let i=0;i<h.length;i++){const w=Math.pow(.85,h.length-1-i);const f=i>=off?m[i-off]:0;const hint=f&1,hard=f&2;
  if(h[i]){const cr=(hint?.5:1)*(hard?1.25:1);a+=w*cr;b+=w*(1-Math.min(1,cr))}else b+=w;ne+=w}
 const mean=a/(a+b),sd=Math.sqrt(a*b/((a+b)**2*(a+b+1)));const conf=ne<2.5?'low':ne<5?'medium':'high';
 return{pct:Math.round(100*mean),lo:Math.max(0,Math.round(100*(mean-1.28*sd))),hi:Math.min(100,Math.round(100*(mean+1.28*sd))),n:h.length,neff:ne,conf}}
const confLbl={none:'No data yet',low:'Low confidence (few answers)',medium:'Medium confidence',high:'High confidence'};

// ---------- 4. FSRS-4.5-style memory model ----------
// R(t) = (1 + 19/81 · t/S)^−0.5 ; at the 90% target the interval equals the stability S (days).
const FW=[0.4872,1.4003,3.7145,13.8206,5.1618,1.2298,0.8975,0.031,1.6474,0.1367,1.0461,2.1072,0.0793,0.3246,1.587,0.2272,2.8755];
const fsR=(t,St)=>Math.pow(1+19/81*Math.max(0,t)/Math.max(.1,St),-.5);
const clampD=d=>Math.min(10,Math.max(1,d));
function fsInit(k){if(S.lp&&S.lp[k]&&S.lp[k].fs)return S.lp[k].fs;const s=S.srs[k];if(!s||!s.h.length)return null;const a=lp(k);{a.fs={S:Math.max(.5,SRS_INT[s.box||0]||1),D:5,t:s.due?s.due-(SRS_INT[s.box||0]||1):today()}}return a.fs}
function fsReview(k,G){const a=lp(k);const t0=today();let f=fsInit(k);
 if(!f){a.fs={S:FW[G-1],D:clampD(FW[4]-(G-3)*FW[5]),t:t0};return a.fs}
 const el=Math.max(0,t0-f.t),R=fsR(el,f.S);let D=f.D-FW[6]*(G-3);D=clampD(FW[7]*(FW[4])+(1-FW[7])*D);
 let Sn;if(G===1)Sn=FW[11]*Math.pow(f.D,-FW[12])*(Math.pow(f.S+1,FW[13])-1)*Math.exp(FW[14]*(1-R));
 else if(el===0)Sn=f.S*(G>=3?1.15:1); // same-day repeat: small gain only
 else Sn=f.S*(Math.exp(FW[8])*(11-f.D)*Math.pow(f.S,-FW[9])*(Math.exp(FW[10]*(1-R))-1)*(G===2?FW[15]:1)*(G===4?FW[16]:1)+1);
 a.fs={S:Math.max(.2,Math.min(3650,Sn)),D,t:t0};return a.fs}
function recallShown(k){const M=lpMastery(k);return M.n&&M.pct>=50?recall(k):null}
function recall(k,atDay){const f=(S.lp&&S.lp[k]&&S.lp[k].fs)||fsInit(k);if(!f)return null;return fsR((atDay==null?today():atDay)-f.t,f.S)}
function nextInterval(k){const f=lp(k).fs;return f?Math.max(1,Math.round(f.S)):1}

// ---------- 5a. Diagnosis ----------
const statusOf=k=>{const M=lpMastery(k),R=recall(k);if(!M.n)return'new';if(M.pct>=80&&M.conf!=='low'&&(R==null||R>=.7))return'mastered';if(M.pct>=50)return'developing';return'weak'};
function weakPrereqs(k,depth=2,seen=new Set()){return wpRaw(k,depth,seen).sort((a,b)=>(statusOf(a)==='weak'?0:1)-(statusOf(b)==='weak'?0:1))}
function wpRaw(k,depth=2,seen=new Set()){const out=[];for(const p of PRE()[k]||[]){if(seen.has(p))continue;seen.add(p);const st=statusOf(p);if(st==='weak'||(st==='new'&&statusOf(k)!=='new'))out.push(p);if(depth>1)out.push(...wpRaw(p,depth-1,seen))}return[...new Set(out)]}

// ---------- 5b. Exam readiness (an estimate, with its basis) ----------
function readiness(e){const ks=e.worlds.flatMap(w=>WREG[w]?WREG[w].nodes.map(n=>n.key):[]);if(!ks.length)return{pct:0,cov:0,conf:'none',n:0,ks};
 const exDay=dayNum(e.date);let sum=0,tried=0,nAns=0;for(const k of ks){const M=lpMastery(k);if(!M.n)continue;tried++;nAns+=M.n;const R=recall(k,exDay);sum+=M.pct*(R==null?.6:.5+.5*R)}
 const cov=tried/ks.length;let pct=Math.round(sum/ks.length);const mk=(S.mocks||[]).filter(m=>(m.ex===e.id||(m.c===e.course&&(m.mode==='mid'||m.mode==='final')))&&Date.now()-m.at<14*864e5).slice(-1)[0];if(mk)pct=Math.round(.75*pct+.25*100*mk.score/mk.n);const conf=cov<.5||nAns<ks.length*3?'low':cov<.9||nAns<ks.length*6?'medium':'high';
 return{pct,cov,conf,n:nAns,ks,tried,mock:mk||null}}

// ---------- 5c. Daily plan: what to study today, and why ----------
function planToday(){const d=ensureDaily();d.pd=d.pd||{};const budget=S.dailyMin||45;const t=today();const cands=[];
 const exs=(S.exams||[]).filter(e=>daysUntil(e.date)>=0&&daysUntil(e.date)<=21).sort((a,b)=>a.date.localeCompare(b.date));
 const exOf=k=>exs.find(e=>e.worlds.some(w=>WREG[w]&&WREG[w].nodes.some(n=>n.key===k)));
 for(const k in REG){const n=REG[k];const M=lpMastery(k),R=recall(k),st=statusOf(k),ex=exOf(k);let sc=0,why=[],kind='practice',min=10,out='';
  const inPlay=(S.lp&&S.lp[k]&&S.lp[k].n)||ex||n.course.id===S.course;if(!inPlay)continue;
  if(ex){const dl=daysUntil(ex.date);sc+=40*(1-M.pct/100)*Math.min(3,14/(dl+1));why.push(`${ex.title} is ${dl===0?'today':dl===1?'tomorrow':`in ${dl} days`} and this topic is on it`)}
  if(R!=null&&R<.9&&M.n){sc+=10+30*(.9-R);kind=M.pct>=70?'review':'practice';min=kind==='review'?5:10;why.push(`predicted recall has dropped to about ${Math.round(R*100)}%`)}
  if(st==='weak'){sc+=18;why.push(`you've got ${Math.round(M.pct)}% mastery from ${M.n} answer${M.n===1?'':'s'}`)}
  const deps=dependents(k).filter(x=>statusOf(x)==='weak'||(S.lp&&S.lp[x]&&S.lp[x].n>0&&lpMastery(x).pct<60));
  if(deps.length&&st!=='mastered'){sc+=22;kind='prereq';why.unshift(`${deps.slice(0,2).map(x=>REG[x].name).join(' and ')} build${deps.length===1?'s':''} on it and ${deps.length===1?'is':'are'} weak`)}
  if(st==='new'){kind='learn';min=12;const wp=(PRE()[k]||[]).filter(p=>statusOf(p)==='weak');if((PRE()[k]||[]).some(p=>statusOf(p)==='new'))sc-=45;if(wp.length){sc-=25;}else if(ex||n.course.id===S.course){sc+=ex?12:4;why.push(ex?'you haven’t started it yet':'it’s the next new topic on your path')}}
  if(st==='mastered'&&(R==null||R>=.9))sc-=30;
  if(sc<=5||!why.length)continue;
  out=kind==='review'?'Bring recall back above 90%':kind==='learn'?'Get a first look and a first mastery estimate':kind==='prereq'?'Fix the foundation the weak topics depend on':'Move mastery toward 80%';
  cands.push({k,sc,why,kind,min,out,done:!!d.pd[k],pri:sc>=45?'High':sc>=25?'Medium':'Low'})}
 cands.sort((a,b)=>b.sc-a.sc);const items=[];let used=0;const pickNew=new Set();
 for(const c of cands){if(used+c.min>budget&&items.length)continue;if(c.kind==='learn'){const w=REG[c.k].world.key;if(pickNew.has(w))continue;pickNew.add(w)}items.push(c);used+=c.min;if(items.length>=7)break}
 return{items,used,budget}}

// ---------- 5d. Insights from recorded activity only ----------
function insights(cid){const out=[];const ks=Object.keys(REG).filter(k=>REG[k].course.id===cid&&S.lp&&S.lp[k]&&S.lp[k].n>0);
 const name=k=>REG[k].name;
 // prerequisite gaps
 for(const k of ks){if(statusOf(k)!=='weak')continue;const wp=weakPrereqs(k).filter(p=>S.lp[p]&&S.lp[p].n>=2);if(wp.length){out.push({t:`Your trouble with ${name(k)} may come from ${name(wp[0])}, which it builds on. ${name(wp[0])} is at ${lpMastery(wp[0]).pct}% from ${S.lp[wp[0]].n} answers.`,b:'Prerequisite map + your answers',a:{k:wp[0]}});break}}
 // hint reliance
 const hk=ks.filter(k=>S.lp[k].hn>=3&&S.lp[k].n-S.lp[k].hn>=3).map(k=>{const a=S.lp[k];return{k,hAcc:a.hc/a.hn,nAcc:(a.c-a.hc)/(a.n-a.hn)}}).filter(x=>x.hAcc-x.nAcc>=.25).sort((a,b)=>(b.hAcc-b.nAcc)-(a.hAcc-a.nAcc));
 if(hk[0])out.push({t:`In ${name(hk[0].k)} you get ${Math.round(hk[0].hAcc*100)}% right with a hint but ${Math.round(hk[0].nAcc*100)}% without. The hint is doing work you'll need to do alone on the test.`,b:`${S.lp[hk[0].k].hn} hinted and ${S.lp[hk[0].k].n-S.lp[hk[0].k].hn} unhinted answers`,a:{k:hk[0].k}});
 // calibration
 let sure=[0,0],guess=[0,0];for(const k of ks){const c=S.lp[k].cf||{};if(c.sure){sure[0]+=c.sure[0];sure[1]+=c.sure[1]}if(c.guess){guess[0]+=c.guess[0];guess[1]+=c.guess[1]}}
 if(sure[0]>=8){const acc=sure[1]/sure[0];out.push({t:acc>=.85?`When you mark an answer “Sure”, you're right ${Math.round(acc*100)}% of the time. Your confidence is well calibrated.`:`When you mark an answer “Sure”, you're right only ${Math.round(acc*100)}% of the time. Slow down on questions that feel easy.`,b:`${sure[0]} answers marked Sure`})}
 // speed
 const tk=ks.filter(k=>S.lp[k].msN>=4).map(k=>({k,avg:S.lp[k].ms/S.lp[k].msN}));if(tk.length>=4){const med=tk.map(x=>x.avg).sort((a,b)=>a-b)[Math.floor(tk.length/2)];const slow=tk.filter(x=>x.avg>2*med).sort((a,b)=>b.avg-a.avg)[0];if(slow)out.push({t:`${name(slow.k)} takes you about ${Math.round(slow.avg/1000)} s per question, over twice your usual ${Math.round(med/1000)} s. On a timed test that costs you.`,b:`${S.lp[slow.k].msN} timed answers`,a:{k:slow.k}})}
 // trend
 for(const k of ks){const h=(S.srs[k]||{}).h||[];if(h.length<10)continue;const a1=h.slice(0,5).reduce((x,y)=>x+y,0)/5,a2=h.slice(-5).reduce((x,y)=>x+y,0)/5;if(a2-a1>=.4){out.push({t:`${name(k)} is improving: ${Math.round(a1*5)}/5 on your earlier answers, ${Math.round(a2*5)}/5 on your latest five.`,b:`last ${h.length} answers`});break}if(a1-a2>=.4){out.push({t:`${name(k)} is slipping: ${Math.round(a1*5)}/5 earlier, ${Math.round(a2*5)}/5 on your latest five.`,b:`last ${h.length} answers`,a:{k}});break}}
 // mistake types
 const et={};for(const k of ks)for(const [t,n] of Object.entries(S.lp[k].err||{}))et[t]=(et[t]||0)+n;const tot=Object.values(et).reduce((a,b)=>a+b,0);
 if(tot>=5){const top=Object.entries(et).sort((a,b)=>b[1]-a[1])[0];const lbl=(ERR_TYPES.find(x=>x[0]===top[0])||[0,top[0]])[1];out.push({t:`Your most common reason for a mistake is “${lbl.toLowerCase()}” (${top[1]} of ${tot} tagged mistakes).`,b:'Mistakes you tagged'})}
 // forgetting
 const fade=ks.filter(k=>{const R=recall(k);return R!=null&&R<.7&&lpMastery(k).pct>=60});if(fade.length)out.push({t:`${fade.length} topic${fade.length>1?'s you knew are':' you knew is'} fading: ${fade.slice(0,3).map(name).join(', ')}. A 5-minute review now is cheaper than relearning later.`,b:'Memory model (an estimate)',a:{k:fade[0]}});
 return out}

// ---------- 5e. Tutor memory: a compact learner profile for the AI ----------
function learnerBrief(cid){const ks=Object.keys(REG).filter(k=>(!cid||REG[k].course.id===cid)&&S.lp&&S.lp[k]&&S.lp[k].n>0);if(!ks.length)return'';
 const rows=ks.map(k=>({k,M:lpMastery(k)})).sort((a,b)=>a.M.pct-b.M.pct);const weak=rows.filter(r=>r.M.pct<60).slice(0,6),strong=rows.filter(r=>r.M.pct>=80&&r.M.conf!=='low').slice(-6);
 const et={};for(const k of ks)for(const [t,n] of Object.entries(S.lp[k].err||{}))et[t]=(et[t]||0)+n;
 const recentMist=S.mistakes.filter(m=>REG[m.nk]&&(!cid||REG[m.nk].course.id===cid)).slice(-4).map(m=>`${REG[m.nk].name}${m.why?` (${m.why})`:''}: ${strip(m.prompt).slice(0,90)}`);
 return`LEARNER PROFILE (from recorded practice; estimates, not facts)
Weak topics: ${weak.map(r=>`${REG[r.k].name} ${r.M.pct}% (${r.M.n} answers)`).join('; ')||'none recorded'}
Strong topics: ${strong.map(r=>REG[r.k].name).join(', ')||'none yet'}
Mistake types the student tagged: ${Object.entries(et).map(([t,n])=>`${t} ×${n}`).join(', ')||'none'}
Recent mistakes: ${recentMist.join(' | ')||'none'}
Misconceptions noticed before: ${(S.miscon||[]).slice(-5).map(x=>x.t).join(' | ')||'none'}
Use this to pitch explanations: revisit weak prerequisites when relevant; don't assume a topic is understood from one correct answer.`}

// =====================================================================
// Engine UI pieces (rendered inside existing views)
// =====================================================================
const KIND_LBL={review:'Review',practice:'Practise',learn:'Learn',prereq:'Fix the foundation'};
function planHtml(){const P=planToday();const d=ensureDaily();if(!P.items.length)return`<div class="sec"><div class="sec-h"><h2 class="t-sec">Today's plan</h2><button class="link" data-act="dmin">${S.dailyMin||45} min a day</button></div><p class="t-sub" style="margin:0">Nothing urgent. Practise anything, or add a test under Coming up so the plan can work toward it.</p></div>`;
 const left=P.items.filter(i=>!i.done).reduce((a,i)=>a+i.min,0);
 return`<div class="sec plan"><div class="sec-h"><h2 class="t-sec">Today's plan</h2><button class="link" data-act="dmin">${left?`${left} min left`:'All done'} · ${S.dailyMin||45} min a day</button></div><div class="group">${P.items.map(it=>{const n=REG[it.k];return`<button class="row prow${it.done?' done':''}" data-act="plango" data-id="${it.k}" data-t="${it.kind}" style="--course:var(--c-${n.course.id})">${markEl(it.k)}<span class="main-t"><span class="t">${KIND_LBL[it.kind]}: ${n.name}</span><span class="s">${esc(it.why[0][0].toUpperCase()+it.why[0].slice(1))}${it.why[1]?`, and ${esc(it.why[1])}`:''}.</span><span class="s pmeta">${n.course.name} · ${it.min} min · ${it.pri} priority${it.done?' · Done today':''}</span></span><span class="end">${it.done?ic('check',16,2.4):ic('chev',16)}</span></button>`}).join('')}</div><p class="t-sub pnote">The plan updates every time you practise. Missed a day? It reshuffles around what's due and what's coming up.</p></div>`}
function planGo(k,kind){if(kind==='learn'&&LX[k])return lesson(k,true);S.lessonSeen[k]=S.lessonSeen[k]||1;startRound('node',k)}
function pctBar(p,lo,hi){return`<span class="mbar" aria-hidden="true"><i class="rng" style="left:${lo}%;width:${Math.max(1,hi-lo)}%"></i><i class="pt" style="left:${p}%"></i></span>`}
function topicSheet(k){const n=REG[k];if(!n)return;const M=lpMastery(k),R=recall(k),a=(S.lp||{})[k]||{n:0,c:0};const st=statusOf(k);const pre=PRE()[k]||[],dep=dependents(k);const f=a.fs;
 const due=f?f.t+Math.max(1,Math.round(f.S)):null;const et=Object.entries(a.err||{}).sort((x,y)=>y[1]-x[1]);
 modal(`<div class="box-h">${markEl(k)}<div><div class="t-label">${n.course.name}, ${esc(n.world.title)}</div><h2 class="t-title">${n.name}</h2></div><button class="icon-btn close" data-act="close" aria-label="Close">${ic('x')}</button></div>
  <div class="tstat"><div><div class="t-label">Estimated mastery</div><div class="num big">${M.n?`${M.pct}%`:'–'}</div><div class="s">${M.n?`likely ${M.lo}–${M.hi}% · ${confLbl[M.conf]}`:confLbl.none}</div>${M.n?pctBar(M.pct,M.lo,M.hi):''}</div>
   <div><div class="t-label">Predicted recall now</div><div class="num big">${R==null||M.pct<50?'–':Math.round(R*100)+'%'}</div><div class="s">${R==null?'Starts after your first round':M.pct<50?'Tracked once mastery passes 50%. Until then, practise to learn it.':`Memory model estimate. ${due!=null?(due<=today()?'Review is due':`Next review in ${due-today()} day${due-today()===1?'':'s'}`):''}`}</div></div></div>
  <div class="tobs"><b>What you've actually done:</b> ${a.n?`${a.c} of ${a.n} right${a.msN?`, about ${Math.max(1,Math.round(a.ms/a.msN/1000))} s per question`:''}${a.hn?`, ${a.hn} with a hint`:''}${a.last?`. Last practised ${new Date(a.last).toLocaleDateString('en-CA',{month:'short',day:'numeric'})}`:''}.`:'Not practised yet.'}</div>
  ${(S.miscon||[]).filter(x=>x.k===k).length?`<div class="tobs"><b>Misconceptions the tutor noticed:</b> ${(S.miscon||[]).filter(x=>x.k===k).slice(-3).map(x=>esc(x.t)).join(' · ')}</div>`:''}
  ${et.length?`<div class="tobs"><b>Why you missed questions here:</b> ${et.map(([t,c])=>`${(ERR_TYPES.find(x=>x[0]===t)||[0,t])[1].toLowerCase()} ×${c}`).join(', ')}.</div>`:''}
  ${dep.length&&M.n&&M.pct<50?`<div class="tobs warn"><b>Heads up:</b> ${dep.slice(0,4).map(d=>REG[d].name).join(', ')} build${dep.length===1?'s':''} on this topic, so weakness here will likely show up there too. Fix this first.</div>`:''}
  ${pre.length?`<div class="tlinks"><div class="t-label">Builds on</div>${pre.map(p=>`<button class="tchip st-${statusOf(p)}" data-act="topic" data-id="${p}">${REG[p].name} <small>${S.lp&&S.lp[p]&&S.lp[p].n?lpMastery(p).pct+'%':'new'}</small></button>`).join('')}</div>`:''}
  ${dep.length?`<div class="tlinks"><div class="t-label">Needed for</div>${dep.map(p=>`<button class="tchip st-${statusOf(p)}" data-act="topic" data-id="${p}">${REG[p].name}</button>`).join('')}</div>`:''}
  ${st==='weak'&&weakPrereqs(k).length?`<div class="tobs tnote">Before more practice here, shore up <b>${REG[weakPrereqs(k)[0]].name}</b>. This topic builds on it, and it looks ${statusOf(weakPrereqs(k)[0])==='weak'?'weak':'untested'}.</div>`:''}
  <div class="stack" style="margin-top:14px"><button class="btn btn-primary btn-lg btn-block" data-act="guided" data-id="${k}">Guided session</button><button class="btn btn-secondary btn-block" data-act="go" data-t="node" data-id="${k}">Practise ${n.name}</button>${LX[k]?`<button class="btn btn-ghost btn-block" data-act="lesson" data-id="${k}">Open the lesson</button>`:''}</div>
  <p class="t-sub" style="font-size:12px;margin-top:6px">Guided session: ${weakPrereqs(k,1).length?`2 questions on ${REG[weakPrereqs(k,1)[0]].name} first (it's a weak foundation), then `:''}5 questions with hints, then one unseen problem on your own.</p>
  ${resHtml(k)}
  <p class="t-sub" style="font-size:12px;margin-top:10px">Mastery uses your recent answers, weighting newer ones, harder formats and unhinted answers more. Recall comes from a spaced-repetition memory model (FSRS-style). Both are estimates and get more reliable with more answers.</p>`)}
// knowledge map: chapters left→right, topics stacked; arrows from prerequisites
function mapHtml(cid){const C=CREG[cid];const W=150,H=46,GX=34,GY=12,PX=12,PY=36;const pos={};let maxR=0;
 C.worlds.forEach((w,ci)=>w.nodes.forEach((n,ri)=>{pos[n.key]={x:PX+ci*(W+GX),y:PY+ri*(H+GY)};maxR=Math.max(maxR,ri)}));
 const wd=PX*2+C.worlds.length*(W+GX)-GX,ht=PY+(maxR+1)*(H+GY)+10;const cnt={mastered:0,developing:0,weak:0,new:0};
 let edges='',nodes='',heads='';
 for(const k in pos){for(const p of PRE()[k]||[]){if(!pos[p])continue;const a=pos[p],b=pos[k];const x1=a.x+W,y1=a.y+H/2,x2=b.x,y2=b.y+H/2;
   if(x2<=x1){edges+=`<path class="ed" d="M${a.x+W/2},${a.y+H} C${a.x+W/2},${a.y+H+18} ${b.x+W/2},${b.y-18} ${b.x+W/2},${b.y}"/>`;continue}
   const mx=(x1+x2)/2;edges+=`<path class="ed${statusOf(p)==='weak'?' bad':''}" d="M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2-4},${y2}" marker-end="url(#ah)"/>`}}
 for(const k in pos){const st=statusOf(k);cnt[st]++;const M=lpMastery(k);const blocked=(st==='new'||st==='weak')&&weakPrereqs(k,1).length;const p=pos[k];const nm=REG[k].name;
   nodes+=`<g class="nd st-${st}${blocked?' blk':''}" data-act="topic" data-id="${k}" tabindex="0" role="button" aria-label="${esc(nm)}, ${st}${M.n?`, ${M.pct}%`:''}"><rect x="${p.x}" y="${p.y}" width="${W}" height="${H}" rx="8"/><rect class="fill" x="${p.x}" y="${p.y+H-4}" width="${Math.round(W*M.pct/100)}" height="4" rx="2"/><text x="${p.x+10}" y="${p.y+19}" class="tn">${esc(nm.length>19?nm.slice(0,18)+'…':nm)}</text><text x="${p.x+10}" y="${p.y+35}" class="ts">${st==='new'?(blocked?'needs prerequisites':'not started'):`${M.pct}%${M.conf==='low'?' · few answers':''}`}</text></g>`}
 C.worlds.forEach((w,ci)=>{heads+=`<text x="${PX+ci*(W+GX)}" y="20" class="ch">${esc((w.chap?w.chap+' ':'')+w.title).slice(0,24)}</text>`});
 const tot=Object.keys(pos).length;const und=Math.round(Object.keys(pos).reduce((a,k)=>a+lpMastery(k).pct,0)/tot);
 return`<div class="mapsum"><div><span class="num">${und}%</span><span class="t-label">course understanding (estimate)</span></div><div class="lg"><span class="st-mastered">${cnt.mastered} mastered</span><span class="st-developing">${cnt.developing} developing</span><span class="st-weak">${cnt.weak} weak</span><span class="st-new">${cnt.new} not started</span></div></div>
  <div class="kmap" role="region" aria-label="Knowledge map" tabindex="0"><svg width="${wd}" height="${ht}" viewBox="0 0 ${wd} ${ht}"><defs><marker id="ah" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 z" class="ah"/></marker></defs>${heads}${edges}${nodes}</svg></div>
  <p class="t-sub" style="font-size:13px">Arrows point from a topic to the topics that build on it. Dashed outline: a prerequisite looks weak or untested. Tap a topic for details.</p>`}
// Stats: insights, per-topic analytics, mistake notebook
function intelHtml(){const C=CREG[S.course];const ins=insights(C.id);const ns=allNodes(C.id);const rows=ns.filter(n=>S.lp&&S.lp[n.key]&&S.lp[n.key].n);
 let o=`<div class="seg" role="group" aria-label="Course" style="margin-top:20px">${COURSES.map(c=>`<button data-act="course" data-id="${c.id}" aria-pressed="${c.id===C.id}">${c.name}</button>`).join('')}</div>`;
 o+=analyticsHtml();
 o+=`<div class="sec"><div class="sec-h"><h2 class="t-sec">Insights</h2><span class="link">From your own answers</span></div>${ins.length?`<div class="group">${ins.map(i=>`<${i.a?'button':'div'} class="row ins"${i.a?` data-act="topic" data-id="${i.a.k}"`:''}><span class="main-t"><span class="t" style="white-space:normal;font-weight:400;line-height:1.5">${esc(i.t)}</span><span class="s">Based on: ${esc(i.b)}</span></span>${i.a?`<span class="end">${ic('chev',16)}</span>`:''}</${i.a?'button':'div'}>`).join('')}</div>`:`<p class="t-sub" style="margin:0">Not enough data yet for ${C.name}. Insights appear once you've answered a few questions in several topics; nothing here is guessed.</p>`}</div>`;
 o+=`<div class="sec"><div class="sec-h"><h2 class="t-sec">Topics</h2><span class="link">${rows.length} of ${ns.length} practised</span></div>${rows.length?`<div class="ttab" role="table"><div class="tr th" role="row"><span role="columnheader">Topic</span><span role="columnheader">Right</span><span role="columnheader">Mastery</span><span role="columnheader">Recall</span></div>${rows.map(n=>{const k=n.key,a=S.lp[k],M=lpMastery(k),R=recallShown(k);return`<button class="tr" role="row" data-act="topic" data-id="${k}"><span role="cell" class="tn">${n.name}</span><span role="cell" class="num">${a.c}/${a.n}</span><span role="cell" class="num" title="likely ${M.lo}–${M.hi}%">${M.pct}%<small> ±${Math.round((M.hi-M.lo)/2)}</small></span><span role="cell" class="num">${R==null?'–':Math.round(R*100)+'%'}</span></button>`}).join('')}</div><p class="t-sub" style="font-size:12px">Right = what you actually did. Mastery and recall are estimates; ± shows how unsure the estimate still is.</p>`:`<p class="t-sub" style="margin:0">Practise a topic and it appears here.</p>`}</div>`;
 const mm=S.mistakes.filter(m=>REG[m.nk]&&REG[m.nk].course.id===C.id);
 if(mm.length){const by={};for(const m of mm)(by[m.why||'untagged']=by[m.why||'untagged']||[]).push(m);
  o+=`<div class="sec"><div class="sec-h"><h2 class="t-sec">Mistake notebook</h2><button class="link" data-act="fix">Retest all ${mm.length}</button></div><div class="group">${[...ERR_TYPES,['untagged','Not tagged yet']].filter(([t])=>by[t]).map(([t,l])=>`<div class="row"><span class="main-t"><span class="t">${l}</span><span class="s">${by[t].length} mistake${by[t].length>1?'s':''}: ${[...new Set(by[t].map(m=>REG[m.nk].name))].slice(0,3).join(', ')}</span></span></div>`).join('')}</div><p class="t-sub" style="font-size:12px">Tag why you missed a question on the answer screen. Retesting a mistake correctly removes it from the notebook.</p></div>`}
 return o}
async function backupsModal(){const bs=await lpBackups();modal(`<div class="box-h"><span class="mark">${ic('shield',18)}</span><div><div class="t-label">Settings</div><h2 class="t-title">Backups</h2></div><button class="icon-btn close" data-act="close" aria-label="Close">${ic('x')}</button></div>
 <p style="margin:0;color:var(--ink-2);line-height:1.6">Margin keeps a copy of your progress on this device once a day, for the last 7 days. Restoring replaces your current progress with that day's copy.</p>
 ${bs.length?`<div class="group" style="margin-top:12px">${bs.map(b=>`<div class="row"><span class="main-t"><span class="t">${new Date(b.at).toLocaleString('en-CA',{weekday:'short',month:'short',day:'numeric',hour:'numeric',minute:'2-digit'})}</span><span class="s">${Math.round(b.data.length/1024)} KB</span></span><span class="end"><button class="btn btn-secondary btn-sm" data-act="bkrestore" data-id="${b.day}">Restore</button></span></div>`).join('')}</div>`:`<p class="t-sub">No backups yet on this device.</p>`}
 <div class="stack" style="margin-top:12px"><button class="btn btn-secondary btn-block" data-act="bknow">Back up now</button></div>
 <p class="t-sub" style="font-size:12px;margin-top:8px">Backups stay on this device. To move progress to another device, use Move progress.</p>`)}
async function bkRestore(day){const bs=await lpBackups();const b=bs.find(x=>x.day===day);if(!b)return;if(!confirm('Replace your current progress with the backup from '+day+'?'))return;try{const v=JSON.parse(b.data);localStorage.setItem(LS,JSON.stringify(v));location.reload()}catch(e){toast('That backup could not be read','x')}}

// =====================================================================
// Mock exams: diagnostic, weakness-focused, midterm, final, challenge
// Answers are recorded but no feedback is shown until the end; then a full report.
// =====================================================================
const MOCK={practice:['Practice exam','12 mixed questions, untimed, hints allowed. Answers come at the end with the full report.'],mixed:['Mixed exam','15 questions on random topics across the whole course. Timed at 30 minutes.'],friend:['Challenge','10 questions shared with a friend. Timed at 15 minutes.'],diag:['Diagnostic','One question from every topic in the course, untimed. Places you on the knowledge map so the plan knows where to start.'],
 weak:['Weakness-focused','10 questions from your weakest topics and the prerequisites behind them. Timed at 20 minutes.'],
 mid:['Midterm simulation','15 questions in your real test format from the chapters of your next test. Timed.'],
 final:['Final exam simulation','25 questions from the whole course. Timed at 60 minutes.'],
 challenge:['Challenge exam','10 of the hardest formats: multi-part, select-all and typed answers. Timed at 25 minutes.']};
let MOCKT=null;
function mockSpec(mode,cid,exId){const C=CREG[cid];const ns=allNodes(cid).map(n=>n.key);let pool=ns,n=10,mins=20,title=MOCK[mode][0];
 if(mode==='diag'){pool=ns.slice(0,30);n=pool.length;mins=0}
 else if(mode==='weak'){const tried=ns.filter(k=>S.lp&&S.lp[k]&&S.lp[k].n);const w=tried.sort((a,b)=>lpMastery(a).pct-lpMastery(b).pct).slice(0,5);const pre=[...new Set(w.flatMap(k=>weakPrereqs(k,1)))];pool=[...new Set([...w,...pre])];if(!pool.length)pool=ns.slice(0,6);n=10;mins=20}
 else if(mode==='mid'){const ex=exId?(S.exams||[]).find(e=>e.id===exId):upcoming().find(e=>e.course===cid);const ws=ex?ex.worlds:C.worlds.slice(0,Math.ceil(C.worlds.length/2)).map(w=>w.key);pool=ws.flatMap(w=>WREG[w]?WREG[w].nodes.map(n=>n.key):[]);n=15;mins=cid==='chem'?45:cid==='phys'?50:40;if(ex){title=`${ex.title}: simulation`;exId=ex.id}}
 else if(mode==='final'){n=25;mins=60}
 else if(mode==='practice'){const tried=ns.filter(k=>S.lp&&S.lp[k]&&S.lp[k].n);pool=tried.length>=4?tried:ns;n=12;mins=0}
 else if(mode==='mixed'){pool=ns;n=15;mins=30}
 else if(mode==='challenge'){n=10;mins=25}
 return{mode,cid,pool,n,mins,title,exId,hints:mode==='practice'}}
function mockModal(cid){cid=cid||S.course;const C=CREG[cid];const up=upcoming().find(e=>e.course===cid);
 modal(`<div class="box-h"><span class="mark">${ic('trophy',18)}</span><div><div class="t-label">${C.name}</div><h2 class="t-title">Mock exams</h2></div><button class="icon-btn close" data-act="close" aria-label="Close">${ic('x')}</button></div>
 <p style="margin:0 0 8px;color:var(--ink-2);line-height:1.55">No hints and no answers until you finish, like the real thing. Then you get a full report: by topic, time per question, the concepts behind your mistakes, and what to do next.</p>
 <div class="group">${Object.entries(MOCK).filter(([k])=>k!=='friend').map(([k,[t,d]])=>`<button class="row" data-act="mockgo" data-id="${k}" data-c="${cid}"><span class="main-t"><span class="t">${t}</span><span class="s" style="white-space:normal">${k==='mid'?(up?`15 questions from ${esc(up.title)}'s chapters. Timed.`:'15 questions from the first half of the course. Timed. Add a test under Coming up to target it.'):d}</span></span><span class="end">${ic('chev',16)}</span></button>`).join('')}</div>`)}
function startMock(mode,cid,exId){closeModal(true);ac();stopSprint();const sp=mockSpec(mode,cid,exId);S.course=cid;let queue=[];
 const pickQ=k=>{let q=single(k);if(sp.mode==='challenge'){for(let t=0;t<6&&!(q.multi||q.sel||q.num);t++)q=single(k)}return q};
 if(sp.mode==='diag')queue=sp.pool.map(pickQ);else{const ks=shuffle(sp.pool.slice());for(let i=0;i<sp.n;i++)queue.push(pickQ(ks[i%ks.length]))}
 queue=shuffle(queue);
 RD={type:'mock',id:mode,queue,i:0,base:queue.length,correct:0,combo:0,best:0,xp:0,retries:0,hearts:0,hp:0,hpMax:0,boss:false,test:!sp.hints,mock:sp,log:[],freeHint:!!sp.hints,shield:false,touched:{},t0:Date.now(),before:{},deadline:sp.mins?Date.now()+sp.mins*60e3:0};
 queue.forEach(q=>{if(!(q.nk in RD.before))RD.before[q.nk]=mastery(q.nk)});clearInterval(MOCKT);if(RD.deadline)MOCKT=setInterval(mockTick,1000);renderQ()}
function mockTick(){if(!RD||RD.type!=='mock'||RD.done){clearInterval(MOCKT);return}const left=RD.deadline-Date.now();const el=document.getElementById('mtimer');if(el){const m=Math.max(0,Math.floor(left/60e3)),s=Math.max(0,Math.floor(left%60e3/1e3));el.textContent=`${m}:${String(s).padStart(2,'0')}`;el.classList.toggle('low',left<5*60e3)}if(left<=0){clearInterval(MOCKT);toast('Time’s up');endRound()}}
function mockTimerHtml(){if(!RD||RD.type!=='mock')return'';if(!RD.deadline)return`<span class="mtimer">Untimed</span>`;const left=RD.deadline-Date.now();return`<span class="mtimer num${left<5*60e3?' low':''}" id="mtimer" aria-label="Time left">${Math.max(0,Math.floor(left/60e3))}:${String(Math.max(0,Math.floor(left%60e3/1e3))).padStart(2,'0')}</span>`}
function mockEnd(){clearInterval(MOCKT);RD.done=true;const sp=RD.mock,log=RD.log,ms=Date.now()-RD.t0;const d=ensureDaily();hist().ms+=Math.min(3*36e5,ms);
 d.rounds++;S.stats.rounds++;touchStreak();updateSRS();const c=log.filter(x=>x.ok).length,n=RD.base,pct=n?Math.round(100*c/n):0;
 (S.mocks=S.mocks||[]).push({at:Date.now(),mode:sp.mode,c:sp.cid,score:c,n,ms,ex:sp.exId||null});if(S.mocks.length>40)S.mocks.shift();addXp(10+c*3);save();
 const by={};for(const x of log)(by[x.q.nk]=by[x.q.nk]||{k:x.q.nk,c:0,n:0,ms:0}),by[x.q.nk].n++,by[x.q.nk].ms+=x.ms,x.ok&&by[x.q.nk].c++;
 const tops=Object.values(by).sort((a,b)=>a.c/a.n-b.c/b.n);const weak=tops.filter(t=>t.c/t.n<.67);const slow=log.slice().sort((a,b)=>b.ms-a.ms).slice(0,3);const unans=n-log.length;
 const roots=[...new Set(weak.flatMap(t=>weakPrereqs(t.k,1)))].filter(k=>!by[k]||by[k].c/by[k].n<.67).slice(0,3);
 const avg=log.length?Math.round(log.reduce((a,x)=>a+x.ms,0)/log.length/1000):0;const per=sp.mins?Math.round(sp.mins*60/n):0;
 const opt=(q,k)=>{const o=(q.options||[]).find(o=>o.key===k);return o?o.html:(k===''||k==null?'(none)':esc(String(k)))};
 const ansOf=x=>x.q.sel?(x.key?x.key.split(',').map(k=>opt(x.q,k)).join('; '):'(none selected)'):x.typed?esc(String(x.key)):opt(x.q,x.key);
 const corOf=q=>q.sel?(q.answer?q.answer.split(',').map(k=>opt(q,k)).join('; '):'None of them'):opt(q,q.answer);
 let o=`<div class="qtop"><div class="qtop-in"><button class="icon-btn" data-act="home" aria-label="Close">${ic('x')}</button><span class="t-label" style="flex:1">${esc(sp.title)} report</span></div></div><article class="read mrep">
  <div class="result-h"><h1 class="t-title">${pct>=80?'Strong result':pct>=60?'Solid, with gaps':'Plenty to work on'}</h1><p class="t-sub">${CREG[sp.cid].name} · ${MOCK[sp.mode][0]} · ${fmtMin(ms)}${sp.mins?` of ${sp.mins} min`:''}</p><div class="score num">${c}<small> / ${n}</small></div><p class="t-sub">${pct}%${unans?` · ${unans} unanswered`:''}</p></div>
  <section class="rs"><h2 class="rs-h"><span class="rs-n">By topic</span></h2><div class="ttab">${tops.map(t=>`<button class="tr" data-act="topic" data-id="${t.k}"><span class="tn">${REG[t.k].name}</span><span class="num">${t.c}/${t.n}</span><span class="num">${Math.round(t.ms/t.n/1000)} s</span><span class="num">${mastery(t.k)}%</span></button>`).join('')}</div><p class="t-sub" style="font-size:12px">Right · average time · mastery now (an estimate, updated with this exam).</p></section>
  <section class="rs"><h2 class="rs-h"><span class="rs-n">Time</span></h2><p>You averaged <b>${avg} s</b> per question${per?`; the pace for this exam is about <b>${per} s</b>`:''}. ${per&&avg>per*1.15?'You were behind pace: practise the slow topics below until they feel routine.':per?'Your pace was fine.':''}</p>${slow.length?`<ul class="gl">${slow.map(x=>`<li>${Math.round(x.ms/1000)} s on ${REG[x.q.nk].name}${x.ok?'':' (and missed)'}</li>`).join('')}</ul>`:''}</section>
  <section class="rs"><h2 class="rs-h"><span class="rs-n">What to work on</span></h2>${weak.length?`<ul class="gl">${weak.slice(0,5).map(t=>`<li><b>${REG[t.k].name}</b>: ${t.c} of ${t.n}.${(()=>{const w=weakPrereqs(t.k,1);if(!w.length)return'';const wk=w.filter(k=>statusOf(k)==='weak'),un=w.filter(k=>statusOf(k)!=='weak');return` It builds on ${w.map(k=>REG[k].name).join(' and ')}: ${wk.length?`${wk.map(k=>REG[k].name).join(' and ')} look${wk.length>1?'':'s'} weak`:''}${wk.length&&un.length?', and ':''}${un.length?`${un.map(k=>REG[k].name).join(' and ')} ${un.length>1?'haven’t':'hasn’t'} been practised yet`:''}.`})()}</li>`).join('')}</ul>${roots.length?`<p class="tnote">Start with the foundation: <b>${roots.map(k=>REG[k].name).join(', ')}</b>. The topics above build on ${roots.length>1?'these':'this'}, so firming ${roots.length>1?'them':'it'} up should help.</p>`:''}`:'<p>No weak topics in this exam. Try the challenge exam, or a longer simulation.</p>'}
   <div class="gbtns">${(roots[0]||weak[0])?`<button class="btn btn-primary btn-sm" data-act="start" data-type="node" data-id="${roots[0]||weak[0].k}">Practise ${REG[roots[0]||weak[0].k].name}</button>`:''}${log.some(x=>!x.ok)?`<button class="btn btn-secondary btn-sm" data-act="fix">Retest these mistakes</button>`:''}</div></section>
  <section class="rs"><h2 class="rs-h"><span class="rs-n">Every question</span></h2>${log.map((x,i)=>`<details class="gex mq ${x.ok?'ok':'no'}"><summary><span class="mqn">${i+1}</span> ${x.ok?ic('check',14,2.4):ic('x',14,2.4)} ${REG[x.q.nk].name} · ${Math.round(x.ms/1000)} s</summary><div class="mqp">${x.q.prompt}</div><p><b>Your answer:</b> ${ansOf(x)}</p>${x.ok?'':`<p><b>Correct:</b> ${corOf(x.q)}</p>`}<ol class="steps">${(x.q.steps||[]).map(t=>`<li>${t}</li>`).join('')}</ol></details>`).join('')}</section>
  <div class="cta" style="margin:20px 0">${sp.mode==='friend'?`<button class="btn btn-primary btn-lg btn-block" data-act="chshare" data-id="${esc(b64e({...sp.ch,sc:c,by:S.name}))}">Share your score and challenge a friend</button>`:`<button class="btn btn-secondary btn-lg btn-block" data-act="mockgo" data-id="${sp.mode}" data-c="${sp.cid}">Take another ${MOCK[sp.mode][0].toLowerCase()}</button>`}</div></article>`;
 focusView(o);checkAch();save()}
