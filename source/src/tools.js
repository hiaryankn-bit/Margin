// =====================================================================
// Study tools: voice tutor, flashcards (FSRS-scheduled), chemical equation balancer
// =====================================================================

// ---------- Voice: speak to the tutor, hear answers ----------
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
const VOICE={rec:null,on:false,speak:false};
function micHtml(){return SR?`<button type="button" class="attbtn mic${VOICE.on?' on':''}" data-act="mic" aria-label="${VOICE.on?'Stop listening':'Speak your question'}" aria-pressed="${VOICE.on}">${ic('mic',20)}</button>`:''}
function micToggle(){if(!SR){toast('Voice input isn’t supported in this browser');return}if(VOICE.on&&VOICE.rec){VOICE.rec.stop();return}
 const r=new SR();VOICE.rec=r;r.lang='en-CA';r.interimResults=true;r.continuous=false;let fin='';VOICE.on=true;VOICE.speak=true;paintMic();
 r.onresult=e=>{let t='';for(let i=e.resultIndex;i<e.results.length;i++){const x=e.results[i];if(x.isFinal)fin+=x[0].transcript;else t+=x[0].transcript}const box=askEl('#askin');if(box)box.value=(fin+t).trim()};
 r.onerror=e=>{VOICE.on=false;VOICE.speak=false;paintMic();if(e.error==='not-allowed')toast('Allow microphone access to speak to the tutor');else if(e.error!=='no-speech'&&e.error!=='aborted')toast('Didn’t catch that. Try again.')};
 r.onend=()=>{VOICE.on=false;paintMic();const box=askEl('#askin');const q=box&&box.value.trim();if(q){box.value='';askSend(q)}else VOICE.speak=false};
 try{r.start()}catch(e){VOICE.on=false;paintMic()}}
function paintMic(){document.querySelectorAll('[data-act=mic]').forEach(b=>{b.classList.toggle('on',VOICE.on);b.setAttribute('aria-pressed',VOICE.on)})}
function speakText(t){if(!window.speechSynthesis)return toast('Read-aloud isn’t supported here');speechSynthesis.cancel();const clean=String(t).replace(/\[\[[^\]]*\]\]/g,'').replace(/\[(Notes|Lesson)[^\]]*\]/g,'').replace(/[*`#>]/g,'').replace(/≡/g,' is congruent to ').replace(/≤/g,' at most ').replace(/≥/g,' at least ').replace(/√/g,' root ').replace(/²/g,' squared').replace(/³/g,' cubed');
 const u=new SpeechSynthesisUtterance(clean.slice(0,4000));u.lang='en-CA';u.rate=1.02;speechSynthesis.speak(u)}

// ---------- Flashcards ----------
// Cards: every key term from the lessons, plus your saved mistakes. Each card has its own memory-model state.
function fcDeck(cid){const out=[];for(const n of allNodes(cid)){const x=LX[n.key];if(!x)continue;(x.keys||[]).forEach((kv,i)=>out.push({id:`k:${n.key}:${i}`,k:n.key,front:kv[0],back:kv[1],src:'Lesson'}))}
 for(const m of S.mistakes.filter(m=>REG[m.nk]&&REG[m.nk].course.id===cid)){const a=(m.options||[]).find(o=>o.key===m.answer);out.push({id:`m:${m.mid}`,k:m.nk,front:m.prompt,back:(a?`<b>${a.html}</b><br>`:'')+((m.steps||[])[0]||''),src:'Your mistake'})}return out}
function fcState(id){S.fc=S.fc||{};return S.fc[id]}
function fcDue(cid){const t=today();const d=fcDeck(cid);const due=d.filter(c=>{const s=fcState(c.id);return s&&s.due<=t});const fresh=d.filter(c=>!fcState(c.id));
 // new cards: prefer topics you've started, mistakes first
 fresh.sort((a,b)=>(b.src==='Your mistake')-(a.src==='Your mistake')||((S.lp&&S.lp[b.k]&&S.lp[b.k].n)?1:0)-((S.lp&&S.lp[a.k]&&S.lp[a.k].n)?1:0));
 const dd=ensureDaily();dd.fcNew=dd.fcNew||0;return{due,fresh:fresh.slice(0,Math.max(0,15-dd.fcNew)),total:d.length}}
function fcStep(st,G){const t0=today();if(!st)return{S:FW[G-1],D:clampD(FW[4]-(G-3)*FW[5]),t:t0};const el=Math.max(0,t0-st.t),R=fsR(el,st.S);let D=clampD(FW[7]*FW[4]+(1-FW[7])*(st.D-FW[6]*(G-3)));let Sn;
 if(G===1)Sn=FW[11]*Math.pow(st.D,-FW[12])*(Math.pow(st.S+1,FW[13])-1)*Math.exp(FW[14]*(1-R));else if(el===0)Sn=st.S*(G>=3?1.1:1);else Sn=st.S*(Math.exp(FW[8])*(11-st.D)*Math.pow(st.S,-FW[9])*(Math.exp(FW[10]*(1-R))-1)*(G===2?FW[15]:1)*(G===4?FW[16]:1)+1);return{S:Math.max(.2,Math.min(3650,Sn)),D,t:t0}}
let FC=null;
function fcStart(cid){cid=cid||S.course;const q=fcDue(cid);const cards=[...shuffle(q.due),...q.fresh].slice(0,30);closeModal(true);
 if(!cards.length){toast('No cards due. Come back tomorrow, or practise to add more.');return}FC={cid,cards,i:0,shown:false,done:0,again:0};fcRender()}
function fcRender(){if(!FC)return;const c=FC.cards[FC.i];if(!c){const n=FC.done;FC=null;focusView(`<div class="qtop"><div class="qtop-in"><button class="icon-btn" data-act="home" aria-label="Close">${ic('x')}</button></div></div><div class="read" style="padding-top:24px"><div class="result-h"><h1 class="t-title">Cards done</h1><p class="t-sub">${n} reviewed. Each one is scheduled for when you're about to forget it.</p></div><div class="stack" style="margin-top:20px"><button class="btn btn-primary btn-lg btn-block" data-act="home">Back to Today</button></div></div>`);addXp(Math.min(30,n*2));save();return}
 const st=fcState(c.id);const n=REG[c.k];const iv=G=>{const s=fcStep(st,G);return G===1?'today':`${Math.max(1,Math.round(s.S))} d`};
 focusView(`<div class="qtop"><div class="qtop-in"><button class="icon-btn" data-act="home" aria-label="Close">${ic('x')}</button><div class="bar" role="progressbar" aria-valuenow="${FC.i}" aria-valuemax="${FC.cards.length}"><i style="width:${FC.i/FC.cards.length*100}%"></i></div><span class="meta num">${FC.i+1} of ${FC.cards.length}</span></div></div>
  <div class="read fcard" style="--course:var(--c-${n.course.id})"><div class="qhead">${markEl(c.k)}<div><div class="t">${n.name}</div><div class="s">${c.src}${st?'':' · new card'}</div></div></div>
  <div class="fc-front">${c.front}</div>${FC.shown?`<div class="fc-back">${c.back}</div><p class="t-sub" style="font-size:12px">How well did you know it?</p><div class="fc-rate">${[[1,'Again'],[2,'Hard'],[3,'Good'],[4,'Easy']].map(([g,l])=>`<button class="btn ${g===3?'btn-primary':'btn-secondary'}" data-act="fcrate" data-id="${g}"><span>${l}</span><small>${iv(g)}</small></button>`).join('')}</div>`:`<button class="btn btn-primary btn-lg btn-block" data-act="fcshow" style="margin-top:20px">Show answer</button>`}
  <p class="t-sub" style="font-size:12px;margin-top:16px">Knowing the definition isn't the same as using it. Practise ${n.name} to test that.</p></div>`)}
function fcRate(G){if(!FC)return;const c=FC.cards[FC.i];const was=fcState(c.id);const s=fcStep(was,G);s.due=today()+(G===1?0:Math.max(1,Math.round(s.S)));S.fc[c.id]=s;if(!was){const d=ensureDaily();d.fcNew=(d.fcNew||0)+1}FC.done++;if(G===1&&!FC.cards.slice(FC.i+1).includes(c))FC.cards.push(c);FC.i++;FC.shown=false;save();fcRender()}

// ---------- Chemical equation balancer (deterministic, exact arithmetic) ----------
function chemParse(f){const raw=f;f=f.replace(/\s+/g,'').replace(/\((s|l|g|aq)\)/g,'');if(/[\^+-]|\d[+-]$/.test(f))throw new Error(`Ions and charges aren't supported yet (${raw}). Use neutral formulas.`);
 const parts=f.split(/[·*.]/);const tot={};
 parts.forEach((p,pi)=>{let mult=1;const m0=p.match(/^(\d+)(?=[A-Z(\[])/);if(m0&&pi>0){mult=+m0[1];p=p.slice(m0[1].length)}
  const st=[{}];let i=0;while(i<p.length){const ch=p[i];if(ch==='('||ch==='['){st.push({});i++}else if(ch===')'||ch===']'){i++;let n='';while(/\d/.test(p[i]||''))n+=p[i++];if(st.length<2)throw new Error(`Unbalanced brackets in ${raw}`);const g=st.pop(),k=n?+n:1;for(const e in g)st[st.length-1][e]=(st[st.length-1][e]||0)+g[e]*k}
   else if(/[A-Z]/.test(ch)){let e=ch;i++;while(/[a-z]/.test(p[i]||''))e+=p[i++];if(!ELEM.has(e))throw new Error(`“${e}” isn't an element symbol (in ${raw}). Check capital letters.`);let n='';while(/\d/.test(p[i]||''))n+=p[i++];st[st.length-1][e]=(st[st.length-1][e]||0)+(n?+n:1)}
   else throw new Error(`Can't read “${ch}” in ${raw}`)}
  if(st.length!==1)throw new Error(`Unbalanced brackets in ${raw}`);for(const e in st[0])tot[e]=(tot[e]||0)+st[0][e]*mult});
 if(!Object.keys(tot).length)throw new Error(`“${raw}” has no elements`);return{el:tot}}
const ELEM=new Set('H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr'.split(' '));
const gcdN=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a};
function frc(n,d=1){if(d<0){n=-n;d=-d}const g=gcdN(n,d)||1;return[n/g,d/g]}
const fadd=(a,b)=>frc(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),fmul=(a,b)=>frc(a[0]*b[0],a[1]*b[1]),fdiv=(a,b)=>frc(a[0]*b[1],a[1]*b[0]);
function balance(eq){const sides=eq.replace(/⟶|→|=>|->|=/g,'→').split('→');if(sides.length!==2)throw new Error('Write it as reactants → products, for example Fe + O2 → Fe2O3');
 const L=sides[0].split('+').map(s=>s.trim()).filter(Boolean),Rr=sides[1].split('+').map(s=>s.trim()).filter(Boolean);if(!L.length||!Rr.length)throw new Error('Each side needs at least one formula');
 const sp=[...L,...Rr].map(s=>s.replace(/^\d+\s*(?=[A-Z(\[])/,'').replace(/\s+/g,''));const P=sp.map(chemParse);const els=[...new Set(P.flatMap(p=>Object.keys(p.el)))];
 const M=els.map(e=>P.map((p,j)=>frc((p.el[e]||0)*(j<L.length?1:-1))));const n=sp.length;
 // row-reduce
 let r=0;const piv=[];for(let c=0;c<n&&r<M.length;c++){let k=r;while(k<M.length&&M[k][c][0]===0)k++;if(k===M.length)continue;[M[r],M[k]]=[M[k],M[r]];const pv=M[r][c];M[r]=M[r].map(x=>fdiv(x,pv));for(let i=0;i<M.length;i++)if(i!==r&&M[i][c][0]!==0){const f=M[i][c];M[i]=M[i].map((x,j)=>fadd(x,fmul([-f[0],f[1]],M[r][j])))}piv.push(c);r++}
 const free=[...Array(n).keys()].filter(c=>!piv.includes(c));if(free.length!==1)throw new Error(free.length?'This reaction can be balanced more than one way. Split it into separate reactions.':'This can’t be balanced: check the formulas.');
 const fcol=free[0];const x=Array(n).fill(null);x[fcol]=[1,1];piv.forEach((c,i)=>{x[c]=frc(-M[i][fcol][0],M[i][fcol][1])});
 const lcm=x.reduce((a,v)=>a*v[1]/gcdN(a,v[1]),1);let co=x.map(v=>v[0]*lcm/v[1]);if(co.some(v=>v<=0)){if(co.every(v=>v<0))co=co.map(v=>-v);else throw new Error('No balanced form with all positive coefficients. Check which side each species is on.')}
 const g=co.reduce((a,v)=>gcdN(a,v));co=co.map(v=>v/g);
 const check=els.every(e=>P.reduce((a,p,j)=>a+(p.el[e]||0)*co[j]*(j<L.length?1:-1),0)===0);
 const fmt=(s,c)=>`${c===1?'':c}${s.replace(/(\d+)/g,'<sub>$1</sub>')}`;
 return{html:`${sp.slice(0,L.length).map((s,j)=>fmt(s,co[j])).join(' + ')} → ${sp.slice(L.length).map((s,j)=>fmt(s,co[L.length+j])).join(' + ')}`,co,els,check,P,sp,L:L.length}}
function balancerModal(prev){modal(`<div class="box-h"><span class="mark">${ic('flask',18)}</span><div><div class="t-label">CHEM 120 tools</div><h2 class="t-title">Equation balancer</h2></div><button class="icon-btn close" data-act="close" aria-label="Close">${ic('x')}</button></div>
 <p style="margin:0;color:var(--ink-2);line-height:1.5">Type an unbalanced equation. Margin balances it with exact arithmetic and shows the atom count for each element, so you can check your own answer.</p>
 <form id="balform" class="keyrow" style="margin-top:12px"><input id="balin" class="textin" value="${esc(prev||'')}" placeholder="C3H8 + O2 -> CO2 + H2O" autocapitalize="off" autocomplete="off" spellcheck="false" aria-label="Equation"><button class="btn btn-primary" type="submit">Balance</button></form><div id="balout" aria-live="polite"></div>`);
 setTimeout(()=>{const i=$('#balin');if(i)i.focus()},50)}
let BAL_LAST=null;
function balRun(){const v=($('#balin')||{}).value||'';const out=$('#balout');try{const b=balance(v);BAL_LAST=b;out.innerHTML=`<div class="balres"><div class="beq">${b.html}</div><table class="baltab"><tr><th>Element</th><th>Left</th><th>Right</th></tr>${b.els.map(e=>{const l=b.P.slice(0,b.L).reduce((a,p,j)=>a+(p.el[e]||0)*b.co[j],0),r=b.P.slice(b.L).reduce((a,p,j)=>a+(p.el[e]||0)*b.co[b.L+j],0);return`<tr><td>${e}</td><td class="num">${l}</td><td class="num">${r}</td></tr>`}).join('')}</table><p class="t-sub" style="font-size:12px">${b.check?'Checked: every element balances.':'Warning: check failed.'} Coefficients are the smallest whole numbers. States like (aq) are ignored.</p></div>${(()=>{try{b.sp.forEach(x=>molarMass(x));return stoichHtml(b)}catch(e){return''}})()}`}catch(e){out.innerHTML=`<p class="xerr">${esc(e.message)}</p>`}}
