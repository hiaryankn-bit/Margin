// ===== 8.6 Warm-up =====
function genWarm(){
  const v=pick(['add','mul','neg','rep','expr']);const m=R(5,15);
  const fmt=x=>C(x);
  if(v==='add'||v==='mul'||v==='expr'){
    let a,b,c=0,raw,shown,rawExpr;
    if(v==='add'){a=R(-2*m,3*m);b=R(2,3*m);raw=a+b;shown=`${C(a)} + ${C(b)}`;rawExpr=`${a} + ${b}`}
    else if(v==='mul'){a=R(-m,2*m);b=R(2,2*m);if(a===0)a=m+1;raw=a*b;shown=`${C(a)}${C(b)}`;rawExpr=`${par(a)}·${b}`}
    else{a=R(2,2*m);b=R(2,2*m);c=R(-m,2*m);raw=a*b+c;shown=`${C(a)}${C(b)} ${c<0?'−':'+'} ${C(Math.abs(c))}`;rawExpr=`${a}·${b} ${pm(c)}`}
    const ans=mod(raw,m),q=Math.floor(raw/m);
    return{prompt:`In ${Z(m)}, compute ${shown}.<div class="sub">Give the representative from 0 to ${m-1}.</div>`,
      options:numOpts(ans,m,[mod(ans+1,m),mod(-ans,m),Math.abs(raw)%m,mod(ans-1,m)],fmt),answer:String(ans),
      num:{value:ans,mod:m,pre:'[',post:']'},
      hint:`Do the integer arithmetic first, then reduce mod ${m} (add or subtract ${m}s until you land in 0…${m-1}).`,
      steps:[`By definition of ${Z(m)} arithmetic: ${shown} = ${C(rawExpr)} = ${C(raw)}.`,`${raw} = ${m}·${par(q)} + ${ans}, so ${raw} ≡ ${ans} ${MOD(m)}.`,`Answer: ${C(ans)}.`]};
  }
  if(v==='neg'){
    let a=R(1,3*m);if(a%m===0)a++;const ans=mod(-a,m);
    return{prompt:`What is the additive inverse of ${C(a)} in ${Z(m)}?<div class="sub">Representative from 0 to ${m-1}.</div>`,
      options:numOpts(ans,m,[a%m,mod(ans+1,m),mod(m-a,m+1)],fmt),answer:String(ans),num:{value:ans,mod:m,pre:'[',post:']'},
      hint:`The additive inverse is ${C('−a')}: the class that adds to ${C(0)}.`,
      steps:[`The additive inverse of ${C(a)} is ${C(-a)}.`,`${-a} ≡ ${ans} ${MOD(m)}, so it's ${C(ans)}.`,`Check: ${C(a)} + ${C(ans)} = ${C(a+ans)} = ${C(0)} since ${m} | ${a+ans} ✓`]};
  }
  // rep
  const a=R(0,m-1),k=pick([-2,-1,2,3]);const val=a+k*m;
  const bad=[a+k*(m+1),a+k*(m-1),val+1,a-k*m+1,a+m+2].filter(x=>mod(x,m)!==a);
  return{prompt:`Which of these is equal to ${C(a)} in ${Z(m)}?`,
    options:buildOptions(val,C(val),bad.map(x=>[x,C(x)]),()=>{let x=R(-3*m,4*m);if(mod(x,m)===a)x++;return[x,C(x)]}),answer:String(val),
    hint:`${C('x')} = ${C(a)} exactly when x ≡ ${a} ${MOD(m)}, i.e. ${m} divides x − ${a}.`,
    steps:[`${C('x')} = ${C(a)} in ${Z(m)} ⇔ x ≡ ${a} ${MOD(m)} ⇔ ${m} | (x − ${a}).`,`${val} − ${a} = ${val-a} = ${m}·${par(k)}, so ${C(val)} = ${C(a)} ✓`,`The others leave a non-zero remainder when you subtract ${a} and divide by ${m}.`]};
}

// ===== 8.6 Inverses =====
function genInv(){
  if(Math.random()<0.65){
    const m=R(11,60);let a,t,g=0;do{a=R(2,m-1);t=inv(a,m)}while((t===null||t===a)&&g++<500);
    if(t===null||t===a)return genInv();
    const[,x,y]=egcd(a,m);const q=(a*t-1)/m;
    return{prompt:`Find ${INV(a)} in ${Z(m)}.`,
      options:numOpts(t,m,[m-t,mod(t+1,m),a,mod(-x+1,m)],C),answer:String(t),num:{value:t,mod:m,pre:'[',post:']'},
      hint:`Inverse exists ⇔ gcd(a, m) = 1. Then solve ${a}x + ${m}y = 1 with the EEA; x mod ${m} is the inverse.`,
      steps:[`gcd(${a}, ${m}) = 1, so by INV ${Z('m')} the inverse exists (and is unique).`,
        `Use the EEA on the LDE ${a}x + ${m}y = 1: ${a}·${par(x)} + ${m}·${par(y)} = 1.`,
        `So ${a}·${par(x)} ≡ 1 ${MOD(m)}, giving ${INV(a)} = ${C(x)}${x!==t?` = ${C(t)}`:''}.`,
        `Check: ${a}·${t} = ${a*t} = ${m}·${q} + 1 ✓`]};
  }
  const comps=[];for(let n=8;n<=50;n++){let p=false;for(let i=2;i*i<=n;i++)if(n%i===0)p=true;if(p)comps.push(n)}
  const m=pick(comps);const want=Math.random()<0.5;let a,g=0;do{a=R(2,m-1)}while((gcd(a,m)===1)!==want&&g++<500);
  const d=gcd(a,m),yes=d===1;
  return{prompt:`Does ${C(a)} have a multiplicative inverse in ${Z(m)}?`,
    options:shuffle([{key:'yes',html:'Yes'},{key:'no',html:'No'}]),answer:yes?'yes':'no',
    hint:`INV ${Z('m')}: ${C('a')}<sup>−1</sup> exists ⇔ gcd(a, m) = 1.`,
    steps:[`gcd(${a}, ${m}) = ${d}.`,yes?`It's 1, so by INV ${Z('m')}, ${INV(a)} exists. (It's ${C(inv(a,m))}: ${a}·${inv(a,m)} = ${a*inv(a,m)} ≡ 1 ${MOD(m)}.)`
      :`It's ${d} ≠ 1, so by INV ${Z('m')}, ${C(a)} has <b>no</b> inverse. (${d} divides both ${a}x and ${m}, so ${a}x ≡ 1 ${MOD(m)} would force ${d} | 1.)`]};
}

// ===== 8.6 MAT =====
const setKey=a=>a.length?a.join(','):'none';
const setHtml=a=>a.length?`{${a.map(C).join(', ')}}`:'No solution';
function genMat(){
  const m=R(8,36);let a,g=0;
  const share=Math.random()<0.65;do{a=R(2,m-1)}while(share&&gcd(a,m)===1&&g++<300);
  const d=gcd(a,m);let solvable=d===1||Math.random()<0.75,c;
  if(solvable)c=d*R(1,m/d-1);else{let h=0;do{c=R(1,m-1)}while(c%d===0&&h++<300);if(c%d===0)solvable=true}
  const sols=[];for(let x=0;x<m;x++)if(mod(a*x-c,m)===0)sols.push(x);
  const cands=[];
  if(sols.length>1)cands.push([sols[0]]);
  if(sols.length)cands.push([]);
  if(sols.length)cands.push(sols.map(x=>mod(x+1,m)).sort((p,q)=>p-q));
  if(d>1&&sols.length){const w=[...new Set(Array.from({length:d},(_,k)=>mod(sols[0]+k*d,m)))].sort((p,q)=>p-q);cands.push(w)}
  if(!sols.length){const t=R(0,m-1);cands.push([t]);cands.push([...new Set([t,mod(t+m/d,m)])].sort((p,q)=>p-q))}
  const fill=()=>{const n=Math.max(1,sols.length||R(1,2));const s=new Set();while(s.size<n)s.add(R(0,m-1));const arr=[...s].sort((p,q)=>p-q);return[setKey(arr),setHtml(arr)]};
  const steps=[`d = gcd(${a}, ${m}) = ${d}.`];
  if(!sols.length){steps.push(`${d} ∤ ${c}, so by MAT there are <b>no solutions</b>.`,`(Same reason the LDE ${a}x + ${m}y = ${c} has no integer solutions: gcd(${a}, ${m}) ∤ ${c}.)`)}
  else{
    const x0=sols[0];
    steps.push(`${d} | ${c}, so by MAT there ${d>1?`are exactly ${d} solutions`:'is exactly 1 solution'} in ${Z(m)}.`);
    if(d>1){const a2=a/d,m2=m/d,c2=c/d,t=inv(a2,m2);
      steps.push(`Solve the LDE ${a}x + ${m}y = ${c}. Divide by ${d}: ${a2}x + ${m2}y = ${c2}, i.e. ${a2}x ≡ ${c2} ${MOD(m2)}.`);
      steps.push(m2===1?`Every x works mod 1.`:`${INV(a2%m2)} = ${C(t)} in ${Z(m2)}, so x ≡ ${t}·${c2} ≡ ${x0} ${MOD(m2)}.`);
      steps.push(`Solutions: ${C(`${x0} + k·${m2}`)} for k = 0, …, ${d-1}: ${setHtml(sols)}.`)}
    else{const t=inv(a,m);steps.push(`${INV(a)} = ${C(t)} (EEA on ${a}x + ${m}y = 1), so ${C('x')} = ${C(t)}${C(c)} = ${C(t*c)} = ${C(x0)}.`)}
    steps.push(`Check: ${a}·${x0} = ${a*x0} ≡ ${c} ${MOD(m)} ✓`);
  }
  return{prompt:`Solve ${C(a)}${C('x')} = ${C(c)} in ${Z(m)}.`,
    options:buildOptions(setKey(sols),setHtml(sols),cands.map(s=>[setKey(s),setHtml(s)]),fill),answer:setKey(sols),
    hint:`MAT: with d = gcd(a, m), solvable ⇔ d | c, and then there are exactly d solutions spaced m/d apart.`,steps};
}

// ===== 8.6 Systems =====
function genSys(){
  const p=pick([5,7,11,13]);let a1,b1,a2,b2,g=0;
  do{a1=R(1,p-1);b1=R(1,p-1);a2=R(1,p-1);b2=R(1,p-1)}while(mod(a1*b2-a2*b1,p)===0&&g++<500);
  const X=R(0,p-1),Y=R(0,p-1);const c1=mod(a1*X+b1*Y,p),c2=mod(a2*X+b2*Y,p);
  const disp=[a1,b1,a2,b2,c1,c2];let inflated=false;
  if(Math.random()<0.35){const i=R(0,3);disp[i]+=p;inflated=true}
  const[A1,B1,A2,B2,C1,C2]=disp;
  const rawD=a2*b1-a1*b2,rawE=a2*c1-a1*c2,D=mod(rawD,p),E=mod(rawE,p),Di=inv(D,p);
  const F=mod(c1-b1*Y,p),ai=inv(a1,p);
  const key=(x,y)=>`${x},${y}`,html=(x,y)=>`${C('x')} = ${C(x)}, ${C('y')} = ${C(y)}`;
  const steps=[];
  if(inflated)steps.push(`First reduce coefficients mod ${p}: the system is ${C(a1)}${C('x')} + ${C(b1)}${C('y')} = ${C(c1)} and ${C(a2)}${C('x')} + ${C(b2)}${C('y')} = ${C(c2)}.`);
  steps.push(`Kill x: multiply eq. 1 by ${C(a2)} and eq. 2 by ${C(a1)}, then subtract: ${C(`${a2}·${b1} − ${a1}·${b2}`)}${C('y')} = ${C(`${a2}·${c1} − ${a1}·${c2}`)}, i.e. ${C(rawD)}${C('y')} = ${C(rawE)} → ${C(D)}${C('y')} = ${C(E)}.`);
  steps.push(`${p} is prime and ${C(D)} ≠ ${C(0)}, so by INV ${Z('p')}: ${INV(D)} = ${C(Di)} (${D}·${Di} = ${D*Di} ≡ 1 ${MOD(p)}).`);
  steps.push(`Multiply both sides by ${C(Di)}: ${C('y')} = ${C(Di)}${C(E)} = ${C(Di*E)} = ${C(Y)}.`);
  steps.push(`Sub into eq. 1: ${C(a1)}${C('x')} = ${C(c1)} − ${C(b1)}${C(Y)} = ${C(F)}. ${a1===1?`So ${C('x')} = ${C(X)}.`:`${INV(a1)} = ${C(ai)}, so ${C('x')} = ${C(ai)}${C(F)} = ${C(X)}.`}`);
  steps.push(`Check eq. 2: ${C(a2)}${C(X)} + ${C(b2)}${C(Y)} = ${C(a2*X+b2*Y)} = ${C(c2)} ✓`);
  return{prompt:`Solve in ${Z(p)}:<div class="sys">${C(A1)}${C('x')} + ${C(B1)}${C('y')} = ${C(C1)}<br>${C(A2)}${C('x')} + ${C(B2)}${C('y')} = ${C(C2)}</div>`,
    options:buildOptions(key(X,Y),html(X,Y),[[key(Y,X),html(Y,X)],[key(X,mod(-Y,p)),html(X,mod(-Y,p))],[key(mod(X+1,p),Y),html(mod(X+1,p),Y)]],()=>{const x=R(0,p-1),y=R(0,p-1);return[key(x,y),html(x,y)]}),
    answer:key(X,Y),hint:`Eliminate one variable like normal algebra. You can't divide in ${Z('p')}: multiply by an inverse instead.`,steps};
}

// ===== 8.7 Fermat =====
const PR=[7,11,13,17,19,23,29,31,37,41,43];
function fltTerm(a,e,p){
  const r=a%p,s=e%(p-1),Q=Math.floor(e/(p-1)),ans=powmod(r,s,p);
  const lines=[];
  lines.push(a>=p?`${a} = ${p}·${Math.floor(a/p)} + ${r}, so ${a} ≡ ${r} ${MOD(p)}.`:`${a} is already less than ${p}.`);
  lines.push(`${p} is prime and ${p} ∤ ${a}, so by FℓT: ${P(r,p-1)} ≡ 1 ${MOD(p)}.`);
  lines.push(`${e} = ${p-1}·${Q} + ${s}, so ${P(a,e)} ≡ (${P(r,p-1)})<sup>${Q}</sup>·${P(r,s)} ≡ 1<sup>${Q}</sup>·${P(r,s)} ≡ ${P(r,s)} ${MOD(p)}.`);
  lines.push(`Compute ${powWork(r,s,p)} ${MOD(p)}.`);
  return{ans,lines};
}
function genFlt(){
  const v=Math.random();
  if(v<0.55){
    const p=pick(PR);let a;do{a=R(p+1,9999)}while(a%p===0);const e=R(40,3000);
    const t=fltTerm(a,e,p),ans=t.ans,r=a%p,s=e%(p-1);
    return{prompt:`What is the remainder when ${P(a,e)} is divided by ${p}?`,
      options:numOpts(ans,p,[powmod(r,e%p,p),powmod(r,s+1,p),r,s%p,mod(ans+1,p)],x=>String(x)),answer:String(ans),num:{value:ans},
      hint:`Reduce the base mod ${p}. Then reduce the exponent mod p − 1 = ${p-1} (not mod ${p}!).`,
      steps:[...t.lines,`Since 0 ≤ ${ans} < ${p}, the remainder is <b>${ans}</b>.`]};
  }
  if(v<0.8){
    const p=pick([7,11,13,17,19,23]);let a,b;do{a=R(2,60)}while(a%p===0);do{b=R(2,60)}while(b%p===0||b===a);
    const e1=R(20,400),e2=R(20,400),k=R(1,30);
    const t1=fltTerm(a,e1,p),t2=fltTerm(b,e2,p),ans=mod(t1.ans+t2.ans-k,p);
    const wrong=mod(powmod(a,e1%p,p)+powmod(b,e2%p,p)-k,p);
    return{prompt:`What is the remainder when ${P(a,e1)} + ${P(b,e2)} − ${k} is divided by ${p}?`,
      options:numOpts(ans,p,[wrong,mod(t1.ans+t2.ans,p),mod(ans+1,p),mod(t1.ans+t2.ans+k,p)],x=>String(x)),answer:String(ans),num:{value:ans},
      hint:`Handle each power separately with FℓT (exponent mod ${p-1}), then add and reduce.`,
      steps:[`<b>First term.</b> ${t1.lines.join(' ')}`,`<b>Second term.</b> ${t2.lines.join(' ')}`,
        `Total: ${t1.ans} + ${t2.ans} − ${k} = ${t1.ans+t2.ans-k} ≡ ${ans} ${MOD(p)}.`,`Since 0 ≤ ${ans} < ${p}, the remainder is <b>${ans}</b>.`]};
  }
  const p=pick([7,11,13,17,19]),a=R(2,p-1),ans=inv(a,p);
  return{prompt:`Use Fermat's Little Theorem to find ${INV(a)} in ${Z(p)}.`,
    options:numOpts(ans,p,[powmod(a,p-3,p),p-a,1,powmod(a,p-1,p),mod(ans+1,p)],C),answer:String(ans),num:{value:ans,mod:p,pre:'[',post:']'},
    hint:`a·a<sup>p−2</sup> = a<sup>p−1</sup> ≡ 1, so ${INV('a')} = ${C('a<sup>p−2</sup>')}.`,
    steps:[`${p} is prime and ${p} ∤ ${a}, so by FℓT ${P(a,p-1)} ≡ 1 ${MOD(p)}, i.e. ${a}·${P(a,p-2)} ≡ 1. So ${INV(a)} = ${C(P(a,p-2))}.`,
      `Compute ${powWork(a,p-2,p)} ${MOD(p)}.`,`So ${INV(a)} = ${C(ans)}. Check: ${a}·${ans} = ${a*ans} ≡ 1 ${MOD(p)} ✓`]};
}

// ===== 8.7 Polynomial congruences =====
const solKey=a=>a.length?a.join(','):'none';
function genPoly(){
  const p=pick([5,7]);const re=e=>((e-1)%(p-1))+1;
  let e1=R(25,200),e2;do{e2=R(10,60)}while(e2===e1);
  let c1,c2;do{c1=R(2,60)}while(c1%p===0);do{c2=R(2,60)}while(c2%p===0);
  const c3=R(0,6),c4=R(0,9),c0=R(0,9);
  const terms=[[c1,e1],[c2,e2],[c3,2],[c4,1],[c0,0]];
  const f=x=>mod(terms.reduce((s,[c,e])=>s+c*powmod(x,e,p),0),p);
  const t=Math.random()<0.75?f(R(0,p-1)):R(0,p-1);
  const sols=[];for(let x=0;x<p;x++)if(f(x)===mod(t,p))sols.push(x);
  const show=(c,e)=>{const cc=c===1&&e>0?'':c;return e===0?`${c}`:e===1?`${cc}x`:`${cc}x<sup>${e}</sup>`};
  const lhs=terms.filter(([c])=>c!==0).map(([c,e])=>show(c,e)).join(' + ');
  // reduced polynomial
  const red={};for(const[c,e]of terms){const ee=e===0?0:re(e);red[ee]=mod((red[ee]||0)+c,p)}
  const rlhs=Object.keys(red).map(Number).sort((a,b)=>b-a).filter(e=>red[e]!==0).map(e=>show(red[e],e)).join(' + ')||'0';
  const tl=e=>{const q=(e-re(e))/(p-1);return `${e} = ${p-1}·${q} + ${re(e)}`};
  const html=a=>a.length?`x ≡ ${a.join(', ')} ${MOD(p)}`:'No solutions';
  const fill=()=>{const n=R(1,2);const s=new Set();while(s.size<n)s.add(R(0,p-1));const a=[...s].sort();return[solKey(a),html(a)]};
  const cands=[];if(sols.length)cands.push([]);if(sols.length>1)cands.push([sols[0]]);cands.push(sols.map(x=>mod(x+1,p)).sort());
  const vals=[];for(let x=0;x<p;x++)vals.push(f(x));
  return{prompt:`Solve ${lhs} ≡ ${t} ${MOD(p)}.`,
    options:buildOptions(solKey(sols),html(sols),cands.map(a=>[solKey(a),html(a)]),fill),answer:solKey(sols),
    hint:`Reduce coefficients mod ${p}, then use x<sup>${p}</sup> ≡ x to knock ${p-1} off each exponent at a time. Then test x = 0…${p-1}.`,
    steps:[`By Corollary 15, x<sup>${p}</sup> ≡ x ${MOD(p)} for <i>every</i> integer x, so x<sup>e</sup> ≡ x<sup>e−${p-1}</sup>: reduce exponents until they're in 1…${p-1}.`,
      `${show(c1,e1)} ≡ ${show(c1%p,re(e1))} (since ${c1} ≡ ${c1%p} and ${tl(e1)}).`,
      `${show(c2,e2)} ≡ ${show(c2%p,re(e2))} (since ${c2} ≡ ${c2%p} and ${tl(e2)}).`,
      `So the congruence becomes ${rlhs} ≡ ${t} ${MOD(p)}.`,
      `<table class="tbl"><tr><td>x</td>${vals.map((_,i)=>`<td>${i}</td>`).join('')}</tr><tr><td>LHS mod ${p}</td>${vals.map((v,i)=>`<td class="${sols.includes(i)?'hit':''}">${v}</td>`).join('')}</tr></table>`,
      sols.length?`Solutions: all integers with ${html(sols)}.`:`No x gives ${t}, so there are <b>no solutions</b>.`]};
}

// ===== 8.8 CRT =====
function crtWork(a1,m1,a2,m2,v='n',w='x'){
  const M=m1*m2,diff=mod(a2-a1,m2),m1r=m1%m2,t=inv(m1r,m2),x0=mod(t*diff,m2),N=m1*x0+a1;
  const L=[];
  L.push(`gcd(${m1}, ${m2}) = 1, so by CRT there's a unique solution mod ${m1}·${m2} = ${M}.`);
  L.push(`From ${v} ≡ ${a1} ${MOD(m1)}: ${v} = ${m1}${w} + ${a1} for some integer ${w}.`);
  L.push(`Plug into the second: ${m1}${w} + ${a1} ≡ ${a2} ${MOD(m2)} ⇒ ${m1}${w} ≡ ${a2-a1}${a2-a1!==diff?` ≡ ${diff}`:''} ${MOD(m2)}${m1r!==m1?` ⇒ ${m1r}${w} ≡ ${diff} ${MOD(m2)}`:''}.`);
  L.push(m1r===1?`So ${w} ≡ ${x0} ${MOD(m2)}.`:`${INV(m1r)} = ${C(t)} in ${Z(m2)} (${m1r}·${t} = ${m1r*t} ≡ 1), so ${w} ≡ ${t}·${diff} ≡ ${x0} ${MOD(m2)}.`);
  L.push(`Take ${w} = ${x0}: ${v} = ${m1}·${x0} + ${a1} = ${N}.`);
  L.push(`So ${v} ≡ ${N} ${MOD(M)}. Check: ${N} mod ${m1} = ${N%m1} ✓, ${N} mod ${m2} = ${N%m2} ✓`);
  return{N,M,L};
}
const crtFmt=M=>v=>`n ≡ ${v} ${MOD(M)}`;
function genCrt2(){
  let m1,m2;do{m1=R(3,13);m2=R(3,17)}while(m1===m2||gcd(m1,m2)!==1||m1*m2>200);
  const a1=R(0,m1-1),a2=R(0,m2-1),w=crtWork(a1,m1,a2,m2);
  return{prompt:`Solve the simultaneous congruences:<div class="sys">n ≡ ${a1} ${MOD(m1)}<br>n ≡ ${a2} ${MOD(m2)}</div>`,
    options:numOpts(w.N,w.M,[mod(w.N+m1,w.M),mod(w.N+m2,w.M),mod(a1+a2,w.M),mod(a1*m2+a2*m1,w.M)],crtFmt(w.M)),answer:String(w.N),
    num:{value:w.N,mod:w.M,pre:'n ≡ ',post:` (mod ${w.M})`},
    hint:`Write n = ${m1}x + ${a1}, plug into the second congruence, solve for x mod ${m2}.`,steps:w.L};
}
const TRIPLES=[[3,4,5],[3,5,7],[4,5,7],[3,7,8],[5,7,8],[3,5,8],[4,5,9],[5,7,9],[2,5,7],[3,4,7],[2,7,9],[4,7,9]];
function genCrt3(){
  const ms=shuffle(pick(TRIPLES));const as=ms.map(m=>R(0,m-1));
  const w1=crtWork(as[0],ms[0],as[1],ms[1]),w2=crtWork(w1.N,w1.M,as[2],ms[2]);
  const M=w2.M,N=w2.N;
  return{prompt:`Solve:<div class="sys">${ms.map((m,i)=>`n ≡ ${as[i]} ${MOD(m)}`).join('<br>')}</div>`,
    options:numOpts(N,M,[w1.N,mod(N+w1.M,M),mod(N+ms[2],M),mod(as[0]+as[1]+as[2],M)],crtFmt(M)),answer:String(N),
    num:{value:N,mod:M,pre:'n ≡ ',post:` (mod ${M})`},
    hint:`The moduli are pairwise coprime. Combine the first two into one congruence, then combine that with the third.`,
    steps:[`<b>Combine the first two.</b>`,...w1.L,`<b>Now combine n ≡ ${w1.N} ${MOD(w1.M)} with n ≡ ${as[2]} ${MOD(ms[2])}.</b>`,...w2.L]};
}
function genCrtd(){
  const v=Math.random();
  if(v<0.55){
    let m1,m2;do{m1=R(5,13);m2=R(5,13)}while(m1===m2||gcd(m1,m2)!==1||m1*m2>130);
    const M=m1*m2,x=R(0,M-1);
    const mk=m=>{let b;do{b=R(2,m-1)}while(gcd(b,m)!==1);const k=R(-6,9);const r=mod(b*x+k,m);return{b,k,r,m}};
    const e1=mk(m1),e2=mk(m2);
    const iso=e=>{const d=mod(e.r-e.k,e.m),t=inv(e.b,e.m),s=mod(t*d,e.m);return{d,t,s,line:`${e.b}x ${pm(e.k)} ≡ ${e.r} ⇒ ${e.b}x ≡ ${e.r-e.k}${e.r-e.k!==d?` ≡ ${d}`:''} ${MOD(e.m)}. ${INV(e.b)} = ${C(t)} in ${Z(e.m)}, so x ≡ ${t}·${d} ≡ ${s} ${MOD(e.m)}.`}};
    const i1=iso(e1),i2=iso(e2),w=crtWork(i1.s,m1,i2.s,m2,'x','k');
    const show=e=>`${e.b}x ${pm(e.k)} ≡ ${e.r} ${MOD(e.m)}`;
    return{prompt:`Solve:<div class="sys">${show(e1)}<br>${show(e2)}</div>`,
      options:numOpts(w.N,M,[mod(e1.r+e2.r,M),mod(w.N+m1,M),mod(w.N+m2,M),crtWork(e1.r,m1,e2.r,m2).N],v=>`x ≡ ${v} ${MOD(M)}`),answer:String(w.N),
      num:{value:w.N,mod:M,pre:'x ≡ ',post:` (mod ${M})`},
      hint:`Isolate x in each congruence first (move the constant, multiply by an inverse). Then it's normal CRT.`,
      steps:[`<b>Isolate x in each.</b>`,i1.line,i2.line,`<b>Now CRT on x ≡ ${i1.s} ${MOD(m1)}, x ≡ ${i2.s} ${MOD(m2)}.</b>`,...w.L]};
  }
  if(v<0.8){
    const ms=pick([[3,4,5],[3,5,7],[4,5,7],[3,7,8],[5,7,8],[4,5,9],[3,4,7]]);const M=ms.reduce((a,b)=>a*b,1),ans=M-1;
    return{prompt:`Find the smallest positive integer n that leaves remainder ${ms.map(m=>`${m-1} when divided by ${m}`).join(', ')}.`,
      options:numOpts(ans,M+50,[M+1,M,M-2,ms.reduce((a,b)=>a+b,0)-1],x=>String(x)),answer:String(ans),num:{value:ans},
      hint:`Look closely: each remainder is one less than its divisor. What is n + 1?`,
      steps:[`Each remainder is one less than the divisor: n ≡ −1 modulo each of ${ms.join(', ')}.`,`The moduli are pairwise coprime, so by GCRT (with n ≡ −1 as a particular solution) n ≡ −1 ${MOD(M)}.`,`Smallest positive: n = ${M} − 1 = <b>${ans}</b>. Check: ${ms.map(m=>`${ans} mod ${m} = ${ans%m}`).join(', ')} ✓`]};
  }
  let m1,m2;do{m1=R(3,12);m2=R(4,15)}while(m1===m2||gcd(m1,m2)!==1||m1*m2>160);
  const a1=R(0,m1-1),a2=R(0,m2-1),w=crtWork(a1,m1,a2,m2),ans=w.N===0?w.M:w.N;
  return{prompt:`A number leaves remainder ${a1} when divided by ${m1}, and remainder ${a2} when divided by ${m2}. What is the smallest positive such number?`,
    options:numOpts(ans,w.M+1,[mod(ans+m1,w.M),mod(ans+m2,w.M),a1+a2,ans+w.M].filter(x=>x>0),x=>String(x)),answer:String(ans),num:{value:ans},
    hint:`Translate: "remainder ${a1} when divided by ${m1}" means n ≡ ${a1} ${MOD(m1)}. Then CRT.`,
    steps:[`Translate: n ≡ ${a1} ${MOD(m1)} and n ≡ ${a2} ${MOD(m2)}.`,...w.L,`Smallest positive solution: <b>${ans}</b>.`]};
}

// ===== Concept traps =====
const TRAPS=[
 [`By FℓT, ${P(2,10)} ≡ 1 (mod 11).`,true,`11 is prime and 11 ∤ 2, so FℓT gives 2<sup>11−1</sup> ≡ 1 (mod 11).`],
 [`If p is prime, then a<sup>p−1</sup> ≡ 1 (mod p) for <i>every</i> integer a.`,false,`FℓT needs p ∤ a. Counterexample: 7<sup>6</sup> ≡ 0 (mod 7).`],
 [`If p is prime, then a<sup>p</sup> ≡ a (mod p) for <i>every</i> integer a.`,true,`That's Corollary 15, and it has no p ∤ a condition.`],
 [`By FℓT, ${P(5,8)} ≡ 1 (mod 9).`,false,`9 isn't prime, so FℓT doesn't apply. In fact 5<sup>8</sup> ≡ 7 (mod 9).`],
 [`${C(4)} has a multiplicative inverse in ${Z(10)}.`,false,`gcd(4, 10) = 2 ≠ 1, so by INV ℤ<sub>m</sub> there's no inverse.`],
 [`${C(9)} has a multiplicative inverse in ${Z(20)}.`,true,`gcd(9, 20) = 1. In fact ${INV(9)} = ${C(9)} since 81 = 4·20 + 1.`],
 [`In ${Z(12)}, ${C(5)}${C('x')} = ${C(3)} has 5 solutions.`,false,`gcd(5, 12) = 1, so by MAT there's exactly 1 solution (it's ${C(3)}: 15 ≡ 3).`],
 [`In ${Z(12)}, ${C(8)}${C('x')} = ${C(4)} has exactly 4 solutions.`,true,`gcd(8, 12) = 4 and 4 | 4, so by MAT there are 4: ${C(2)}, ${C(5)}, ${C(8)}, ${C(11)}.`],
 [`In ${Z(12)}, ${C(8)}${C('x')} = ${C(6)} has a solution.`,false,`gcd(8, 12) = 4 and 4 ∤ 6, so by MAT there are none.`],
 [`${Z('m')} has exactly m elements.`,true,`The classes are ${C(0)}, ${C(1)}, …, ${C('m−1')}: one for each possible remainder.`],
 [`${C(-3)} = ${C(9)} in ${Z(12)}.`,true,`9 − (−3) = 12, and 12 | 12.`],
 [`${C(2)} + ${C(3)} = ${C(1)} in ${Z(4)}.`,true,`${C(2)} + ${C(3)} = ${C(5)}, and 5 ≡ 1 (mod 4).`],
 [`CRT applies directly to n ≡ 1 (mod 6), n ≡ 4 (mod 9).`,false,`CRT needs gcd(m₁, m₂) = 1, but gcd(6, 9) = 3.`],
 [`If gcd(m₁, m₂) = 1, then n ≡ a₁ (mod m₁), n ≡ a₂ (mod m₂) has a unique solution modulo m₁m₂.`,true,`That's exactly the Chinese Remainder Theorem.`],
 [`In ${Z(7)}, ${INV(3)} = ${C(5)}.`,true,`3·5 = 15 = 2·7 + 1 ≡ 1 (mod 7).`],
 [`In ${Z(11)}, ${INV('a')} = ${C(P('a',9))} for every non-zero ${C('a')}.`,true,`By FℓT, a·a<sup>9</sup> = a<sup>10</sup> ≡ 1 (mod 11), and 9 = p − 2.`],
 [`x<sup>15</sup> ≡ x<sup>3</sup> (mod 7) for every integer x.`,true,`By Cor. 15, x<sup>7</sup> ≡ x, so each step knocks 6 off the exponent: 15 → 9 → 3.`],
 [`x<sup>15</sup> ≡ x (mod 7) for every integer x.`,false,`15 = 6·2 + 3, so x<sup>15</sup> ≡ x<sup>3</sup>. For x = 2: 2<sup>3</sup> = 8 ≡ 1, not 2.`],
 [`To compute 3<sup>100</sup> mod 7, reduce the exponent mod 7.`,false,`Reduce the exponent mod p − 1 = 6: 100 ≡ 4, so 3<sup>100</sup> ≡ 3<sup>4</sup> = 81 ≡ 4. (Reducing mod 7 gives 3<sup>2</sup> ≡ 2: wrong.)`],
 [`Every non-zero element of ${Z(13)} has a multiplicative inverse.`,true,`13 is prime, so INV ℤ<sub>p</sub> applies.`],
 [`Every non-zero element of ${Z(15)} has a multiplicative inverse.`,false,`15 isn't prime: ${C(3)}, ${C(5)}, ${C(6)}, … have gcd > 1 with 15.`],
 [`n ≡ 8 (mod 15) is equivalent to the pair n ≡ 2 (mod 3), n ≡ 3 (mod 5).`,true,`8 ≡ 2 (mod 3) and 8 ≡ 3 (mod 5), and by CRT the pair has exactly one solution mod 15.`],
 [`If ${C('a')}${C('b')} = ${C(0)} in ${Z('m')}, then ${C('a')} = ${C(0)} or ${C('b')} = ${C(0)}.`,false,`Not when m is composite: ${C(2)}${C(3)} = ${C(0)} in ${Z(6)}. (It IS true in ${Z('p')}.)`],
 [`When ${INV('a')} exists in ${Z('m')}, it's unique.`,true,`That's part of INV ℤ<sub>m</sub>.`],
 [`To use FℓT on 6<sup>40</sup> mod 13, you should state "13 is prime and 13 ∤ 6".`,true,`Both hypotheses must be stated. Markers take marks off for skipping them.`],
 [`The solution to n ≡ 2 (mod 4), n ≡ 3 (mod 5) is unique mod 9.`,false,`It's unique mod 4·5 = 20, not 4 + 5.`],
];
function genTrap(){
  const[s,t,why]=pick(TRAPS);
  return{prompt:`<div class="tf">True or false?</div>${s}`,options:[{key:'T',html:'True'},{key:'F',html:'False'}],answer:t?'T':'F',
    hint:`Check the fine print: is the modulus prime? Is the gcd 1? Does p ∤ a?`,steps:[`<b>${t?'True':'False'}.</b> ${why}`]};
}

const Q8={warm:genWarm,inv:genInv,mat:genMat,sys:genSys,flt:genFlt,poly:genPoly,crt2:genCrt2,crt3:genCrt3,crtd:genCrtd,trap:genTrap};

