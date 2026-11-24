// ---------- Exam formats: match each course's real tests ----------
// From Aryan's Fall 2026 papers:
//  MATH 135: T/F (no justification), MC with 4 options, proofs.
//  MATH 137: MC with 4 options incl. "None of the above", T/F, short exact answers.
//  CHEM 120: every question MC with 5 options A–E, "choose the closest answer", some "Select all that apply".
//  PHYS 121: MC with 5 options, mostly conceptual, "None of the above is correct", some "Choose all correct answers".
const EXFMT={
  m135:{n:4,nota:null,notaRate:0,tf:true},
  m137:{n:4,nota:'None of the above.',notaRate:.12,tf:true},
  chem:{n:5,nota:'None of the above',notaRate:.1,tf:false,closest:true,selAll:'Select all that apply.'},
  phys:{n:5,nota:'None of the above is correct.',notaRate:.12,tf:false,selAll:'Choose all correct answers.'}
};
const isTF=q=>q&&q.options&&q.options.length===2&&q.options[0].key==='T';
const tfText=q=>q.prompt.replace(/<div class="tf">True or false\?<\/div>/,'').trim();
// Select-all question from statements [{text,true,why}]
function selAll(stem,stmts,instr){const opts=stmts.map((s,i)=>({key:'s'+i,html:s.text}));const ans=stmts.map((s,i)=>s.true?'s'+i:null).filter(Boolean);
  return{prompt:`${stem} <b>${instr}</b>`,options:opts,answer:ans.join(','),sel:true,steps:stmts.map(s=>`<b>${s.true?'True':'False'}:</b> ${s.text}${s.why?` ${s.why}`:''}`),hint:'Judge each statement on its own. Any number of them can be true, including none.'}}
// Gather T/F statements from a generator
function gatherTF(gen,need){const out=[],seen=new Set();for(let t=0;t<40&&out.length<need;t++){let q;try{q=gen()}catch(e){continue}const parts=q&&q.multi?q.multi:[q];for(const p of parts){if(!isTF(p))continue;const tx=tfText(p);if(seen.has(tx))continue;seen.add(tx);out.push({text:tx,true:p.answer==='T',why:(p.steps[0]||'').replace(/^<b>(True|False)\.<\/b>\s*/,'')})}}return out}
function tfToMC(q,gen,F,sib){let pool=gatherTF(gen,10);if(pool.length<6&&sib)for(const g2 of shuffle(sib.slice())){if(pool.length>=10)break;for(const x of gatherTF(g2,4))if(!pool.some(y=>y.text===x.text))pool.push(x)}const first={text:tfText(q),true:q.answer==='T',why:(q.steps[0]||'').replace(/^<b>(True|False)\.<\/b>\s*/,'')};
  const others=pool.filter(s=>s.text!==first.text);
  // Select all that apply (about 1 in 3, when there's enough material)
  if(F.selAll&&others.length>=3&&Math.random()<.35){const st=shuffle([first,...others]).slice(0,Math.min(5,1+others.length));return selAll('Which of the following statements are <b>true</b>?',st,F.selAll)}
  const trues=[first,...others].filter(s=>s.true),falses=[first,...others].filter(s=>!s.true);
  const askTrue=trues.length&&(falses.length>=F.n-2||Math.random()<.5);
  const keyS=askTrue?trues[0]:falses[0];const rest=(askTrue?falses:trues).slice(0,F.n-1);
  if(!keyS||rest.length<2)return null;
  const wrong=rest.map(s=>s.text);
  const steps=[`<b>${askTrue?'True':'False'}:</b> ${keyS.text} ${keyS.why}`,...rest.map(s=>`<b>${s.true?'True':'False'}:</b> ${s.text} ${s.why}`)];
  const out=mc(`Which <b>one</b> of the following statements is <b>${askTrue?'true':'false'}</b>?`,keyS.text,wrong,steps,'Check each statement against the definitions; only one fits.');
  return out}
function perturb(html,k){const m=String(html).match(/(−|-)?\d+(\.\d+)?/);if(!m)return null;const neg=!!m[1],dec=m[2]?m[2].length-1:0,v=Number(m[0].replace('−','-'));if(!isFinite(v)||v===0)return null;const f=[2,.5,1.5,10,.1,3,.75,1.25][k%8];const nv=v*f;const t=(dec?nv.toFixed(dec):String(Math.round(nv))).replace('-','−');if(t===m[0].replace('-','−'))return null;return html.slice(0,m.index)+t+html.slice(m.index+m[0].length)}
function padOpts(q,F){if(!q.options||q.sel||isTF(q)||q.options.length<=2)return q;const have=new Set(q.options.map(o=>o.html));
  const right=(q.options.find(o=>o.key===q.answer)||{}).html||'';
  for(let k=0;q.options.length<F.n-(F.nota?1:0)&&k<16;k++){const p=perturb(right,k);if(p&&!have.has(p)){have.add(p);q.options.push({key:'px'+k,html:p})}}
  if(F.nota&&q.options.length<F.n&&!have.has(F.nota))q.options.push({key:'nota',html:F.nota});
  return q}
function notaSwap(q,F){if(!F.nota||q.sel||isTF(q)||q.num||!q.options||q.options.length<3)return q;if(/none of the above/i.test(q.options.map(o=>o.html).join(' ')))return q;if(Math.random()>=F.notaRate)return q;
  const right=q.options.find(o=>o.key===q.answer);q.options=q.options.filter(o=>o.key!==q.answer);q.options.push({key:'nota',html:F.nota});q.answer='nota';
  q.steps=[...(q.steps||[]),`The correct answer, <b>${right.html}</b>, isn't listed, so the answer is “${F.nota.replace(/\.$/,'')}”.`];return q}
function exFormat(q,gen,cid,sib){const F=EXFMT[cid];if(!F||!q)return q;
  if(q.multi){q.multi=q.multi.map(p=>exFormat1(p,gen,F,cid,sib)||p);return q}
  return exFormat1(q,gen,F,cid,sib)}
function exFormat1(q,gen,F,cid,sib){
  if(isTF(q)&&!F.tf){const c=tfToMC(q,gen,F,sib);if(c)q=c;else return q}
  if(!F.tf||cid==='chem'||cid==='phys')delete q.num; // no typed answers on CHEM/PHYS tests
  if(F.closest&&q.options&&q.options.some(o=>/\d/.test(o.html))&&!q.sel&&!/closest/i.test(q.prompt)&&/(calculate|what is|how many|find|determine|mass|moles|volume|energy|wavelength|pressure)/i.test(q.prompt)&&/\d\.\d/.test(q.options.map(o=>o.html).join(' ')))q.prompt+=' Choose the closest answer.';
  q=padOpts(q,F);q=notaSwap(q,F);
  if(q.options&&q.options.every(o=>/^Line \d+$/.test(o.html)))q.options.sort((a,b)=>parseInt(a.html.slice(5))-parseInt(b.html.slice(5)));
  else if(q.options&&!q.sel&&!isTF(q)&&!q.keep){const isN=o=>o.key==='nota'||/^none of the above/i.test(o.html);const n=q.options.filter(o=>!isN(o)),t=q.options.filter(isN);q.options=[...shuffle(n),...t]}
  return q}
// ---------- Midterm-style math additions ----------
function extendNode(cid,nid,gens,rate){const n=COURSES.find(c=>c.id===cid).worlds.flatMap(w=>w.nodes).find(n=>n.id===nid);if(!n)return;const g0=n.gen;n.gen=()=>{if(Math.random()<rate){const q=pick(gens)();if(q)return q}return g0()}}
// MATH 135 Q11 style: parts of an open sentence about divisibility
extendNode('m135','impl',[()=>{const v=shuffle(['f','g','h','j','a','b','c','d']).slice(0,4);const [f,g,h,j]=v;const p=R(2,3),q=R(2,4);
  const H=`${f} | (${p}${g} + ${h})`,C1=`${f} ∤ (${g} − ${q}${j})`,C2=`${f} | (${h} + ${q}${j})`;
  const S=`If ${H}, then ${C1} or ${C2}.`;const which=pick(['hyp','conc','contra','neg']);
  const C1n=`${f} | (${g} − ${q}${j})`,C2n=`${f} ∤ (${h} + ${q}${j})`,Hn=`${f} ∤ (${p}${g} + ${h})`;
  const opts={hyp:[H,`If ${H}`,C1,`${H}, then ${C1}`],conc:[`${C1} or ${C2}`,`${C1} and ${C2}`,`then ${C1} or ${C2}`,H],
   contra:[`If ${C1n} and ${C2n}, then ${Hn}.`,`If ${C1n} or ${C2n}, then ${Hn}.`,`If ${Hn}, then ${C1n} and ${C2n}.`,`If ${C1} or ${C2}, then ${H}.`],
   neg:[`${H} and ${C1n} and ${C2n}.`,`If ${H}, then ${C1n} and ${C2n}.`,`${Hn} or ${C1} or ${C2}.`,`${H} and (${C1n} or ${C2n}).`]}[which];
  const ask={hyp:'What is the hypothesis of S?',conc:'What is the conclusion of S?',contra:'Which is the contrapositive of S?',neg:'Which is the negation of S (without using ¬ or "not")?'}[which];
  const why={hyp:'The hypothesis is the part after "if", without the word "if" and without quantifiers.',conc:'The conclusion is the part after "then", without the word "then".',contra:'Contrapositive of A ⇒ (B ∨ C) is ¬(B ∨ C) ⇒ ¬A, and ¬(B ∨ C) ≡ ¬B ∧ ¬C (De Morgan).',neg:'¬(A ⇒ B) ≡ A ∧ ¬B. With B = (C₁ ∨ C₂), ¬B = ¬C₁ ∧ ¬C₂. The negation of an implication is not an implication, and S has no quantifiers so neither does its negation.'}[which];
  return mc(`Let ${v.join(', ')} ∈ ℤ. Consider the open sentence<br>S: ${S}<br>${ask}`,opts[0],opts.slice(1),[why],'Name the parts first: S has the form A ⇒ (B ∨ C).')}],.4);
// MATH 137 short answers
extendNode('m137','abs',[()=>{const a=R(-3,3),p=R(1,4),b=R(-3,3),q=R(1,4),c=R(-4,4);const lo=(a-p)-(-b+q)-c,hi=(a+p)-(-b-q)-c;const ans=Math.max(Math.abs(lo),Math.abs(hi));
  const fx=(v,k)=>k===0?`|${v}|`:k>0?`|${v} − ${k}|`:`|${v} + ${-k}|`;
  return nq(`Suppose ${fx('x',a)} ≤ ${p} and ${fx('y',-b)} ≤ ${q}. What is the largest possible value of ${fx('x − y',c)}?`,ans,{int:true,nonneg:true,wrong:[p+q,p+q+Math.abs(c),Math.abs(a+b-c),ans-1],steps:[`x ∈ [${a-p}, ${a+p}] and y ∈ [${-b-q}, ${-b+q}].`,`So x − y − ${c} ranges from ${lo} to ${hi}.`,`The largest absolute value is ${ans}.`],hint:'Turn each inequality into an interval, then find the range of x − y.'})}],.35);
extendNode('m137','liminf',[()=>{const A=R(2,9),B=pick([2,3,4,5,7]);const right=`HA: y = 0 and y = −${A}/${B}; VA: x = ln ${B}`;
  return mc(`State all horizontal and vertical asymptotes of f(x) = ${A}/(eˣ − ${B}).`,right,[`HA: y = 0; VA: x = ln ${B}`,`HA: y = −${A}/${B}; VA: x = ${B}`,`HA: y = 0 and y = ${A}/${B}; VA: x = ln ${B}`],[`x → ∞: eˣ → ∞, so f → 0. x → −∞: eˣ → 0, so f → ${A}/(0 − ${B}) = −${A}/${B}.`,`Vertical asymptote where eˣ = ${B}: x = ln ${B}.`],'Check x → ∞ and x → −∞ separately; eˣ behaves very differently.')},
 ()=>{const K=R(2,200);return mc(`Which function satisfies lim<sub>x→∞</sub> f(x) = ∞ and lim<sub>x→∞</sub> f(x)/x² = ${K}?`,`f(x) = ${K}x² + x`,[`f(x) = ${K}x`,`f(x) = x² + ${K}`,`f(x) = ${K}x³`],[`${K}x² + x → ∞, and (${K}x² + x)/x² = ${K} + 1/x → ${K}.`,`${K}x/x² → 0; (x² + ${K})/x² → 1; ${K}x³/x² → ∞.`],'Divide each option by x² and take the limit.')}],.3);
extendNode('m137','sup',[()=>{const p=R(-2,3),q=p+R(1,4);const r=`a<sub>n</sub> = ${q} − ${q-p}/n`;
  return mc(`Which sequence is monotonic, has greatest lower bound ${p} and least upper bound ${q}?`,`${r}; its limit is ${q}`,[`a<sub>n</sub> = ${q} + ${q-p}/n; its limit is ${q}`,`a<sub>n</sub> = ${p} + (−1)<sup>n</sup>; its limit is ${p}`,`${r}; its limit is ${p}`],[`${r} starts at a₁ = ${p} and increases toward ${q} without reaching it.`,`So glb = a₁ = ${p}, lub = ${q}, and by MCT it converges to ${q}.`,`a<sub>n</sub> = ${q} + ${q-p}/n has lub ${q+(q-p)}, not ${q}; ${p} + (−1)<sup>n</sup> isn't monotonic and doesn't converge.`],'An increasing sequence starting at the lower bound and approaching the upper bound works.')}],.35);

for(const c of COURSES){const F=EXFMT[c.id];if(!F)continue;for(const w of c.worlds){const raw=w.nodes.map(n=>n.gen);w.nodes.forEach((n,i)=>{const g=raw[i];const sib=raw.filter((_,j)=>j!==i);n.gen=()=>{const prev=OPTN;OPTN=F.n;try{let q=null;for(let t=0;t<6;t++){q=g();if(!q)continue;q=exFormat(q,g,c.id,sib);if(F.tf||!(q.multi||[q]).some(isTF))break}return q}finally{OPTN=prev}}})}}
