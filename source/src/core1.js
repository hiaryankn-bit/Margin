// ===== extra helpers & question builders =====
const fr=(n,d)=>`<span class="fr"><span>${n}</span><span>${d}</span></span>`;
const sq=x=>`√<span class="ovl">${x}</span>`;
const LIM=(v,a)=>`lim<sub>${v}→${a}</sub>`;
const eq=s=>`<span class="cl">${s}</span>`;
const sub=(b,s)=>`${b}<sub>${s}</sub>`;
const uniq=a=>[...new Set(a)];
const round=(x,d=0)=>{const p=10**d;return Math.round(x*p)/p};
const minus=s=>String(s).replace(/-/g,'−');
// number → string with sig figs, ×10^n for very big/small
function sig(x,s=3){
  if(!isFinite(x))return String(x);if(x===0)return '0';
  const a=Math.abs(x),e=Math.floor(Math.log10(a));
  if(e>=5||e<=-4){const m=x/10**e;let ms=m.toPrecision(s);if(Math.abs(parseFloat(ms))>=10){return sig(x*1.0000001,s)}return `${minus(ms)}×10<sup>${minus(e)}</sup>`}
  let t=x.toPrecision(s);if(t.includes('e'))t=Number(t).toString();return minus(t);
}
const nz=x=>Math.abs(x)<1e-12?0:x;
// simplify fraction
function frac(n,d){if(d<0){n=-n;d=-d}const g=gcd(n,d)||1;n/=g;d/=g;return{n,d}}
function frs(n,d){const f=frac(n,d);if(f.d===1)return minus(f.n);return (f.n<0?'−':'')+fr(Math.abs(f.n),f.d)}
function frt(n,d){const f=frac(n,d);if(f.d===1)return minus(f.n);return minus(`${f.n}/${f.d}`)}

// Multiple choice. correct + wrong are HTML strings; dedupe by text.
const negFix=t=>String(t).replace(/(^|[\s(=,;\[])-(?=\d)/g,'$1−');
const anFix=p=>negFix(String(p).replace(/(^|[.>] )A (?=(8\d*|11|18)(\.\d+)? )/g,'$1An '));
let OPTN=4; // options per question, set per course by examfmt.js
function mc(prompt,correct,wrong,steps,hint,extra={}){prompt=anFix(prompt);
  correct=negFix(correct);wrong=wrong.map(negFix);const seen=new Set([String(correct)]);const opts=[{key:'o0',html:String(correct)}];let k=1;
  for(const w of wrong){if(opts.length>=(extra.n||OPTN))break;const s=String(w);if(seen.has(s))continue;seen.add(s);opts.push({key:'o'+(k++),html:s})}
  return{prompt,options:extra.keep?opts:shuffle(opts),answer:'o0',steps:steps||[],hint:hint||'',...extra};
}
// True/false
function tf(prompt,t,expl,hint){return{prompt:`<div class="tf">True or false?</div>${prompt}`,options:[{key:'T',html:'True'},{key:'F',html:'False'}],answer:t?'T':'F',steps:[`<b>${t?'True':'False'}.</b> ${expl}`],hint:hint||'Check the hypotheses carefully, or look for a counterexample.'}}
// Numeric: MC with formatted numbers + typed in hard mode. o: {wrong:[], fmt, tol (relative), abs, unit, pre, post, int}
function nq(prompt,value,o={}){prompt=anFix(prompt);
  const fmt=o.fmt||(v=>o.int?minus(String(Math.round(v))):sig(v,o.s||3));
  const unit=o.unit?` ${o.unit}`:'';
  const right=fmt(value)+unit;const seen=new Set([right]);const opts=[{key:'o0',html:right}];let k=1;
  const cand=[...(o.wrong||[])];
  const facs=o.int?[1,-1,2,-2,3,5]:[2,0.5,1.5,0.75,1.25,0.8,3,-1];
  for(const f of facs)cand.push(o.int?value+f*(o.step||1):value*f);
  for(const w of cand){if(opts.length>=OPTN)break;if(w==null||!isFinite(w))continue;if(o.pos&&w<=0)continue;if(o.nonneg&&w<0)continue;const s=fmt(w)+unit;if(seen.has(s))continue;seen.add(s);opts.push({key:'o'+(k++),html:s})}
  const tol=o.int?0:(o.tol??0.02);
  return{prompt,options:shuffle(opts),answer:'o0',steps:o.steps||[],hint:o.hint||'',num:{value,tol,abs:o.abs,int:!!o.int,mod:o.mod,pre:o.pre||'',post:(o.post||'')+(o.unit?' '+o.unit:''),show:right}};
}
// Find the wrong line in an argument
function errq(title,lines,bad,expl,hint){
  const box=`<div class="proof">${lines.map((l,i)=>`<div><b>${i+1}.</b> ${l}</div>`).join('')}</div>`;
  const opts=lines.map((_,i)=>({key:'L'+i,html:`Line ${i+1}`}));
  return{prompt:`<div class="tf">Find the error</div>${title}${box}<div class="sub">Which line is the <b>first</b> one that's wrong?</div>`,options:opts,answer:'L'+bad,steps:[`<b>Line ${bad+1}</b> is wrong. ${expl}`],hint:hint||'Check each line: does it really follow from the lines before it?',grid:true};
}
// Multi-part problem: shared stem, a sequence of parts
function multi(stem,parts){return{multi:parts.map((p,i)=>({...p,prompt:`<div class="stem">${stem}</div><div class="part">Part ${'abcdefg'[i]})</div>${p.prompt}`,partOf:[i+1,parts.length]}))}}
// Bank: items {q,a,w:[...],e,h} | {q,t,e} | {err:[lines],bad,q,e}; avoids recent repeats
function bank(items){const recent=[];return()=>{let i,g=0;do{i=Math.floor(Math.random()*items.length)}while(recent.includes(i)&&g++<20);recent.push(i);if(recent.length>Math.min(4,items.length-1))recent.shift();
  const it=items[i];if(typeof it==='function')return it();
  if(it.err)return errq(it.q||'',it.err,it.bad,it.e,it.h);
  if('t' in it)return tf(it.q,it.t,it.e,it.h);
  return mc(it.q,it.a,it.w,[it.e],it.h)}}
const mix=(...gs)=>()=>pick(gs)();
