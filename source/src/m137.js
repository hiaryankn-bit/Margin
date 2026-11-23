// ================= MATH 137 =================
function toFrac(x,maxD=2000){if(!isFinite(x))return null;const s=Math.sign(x);x=Math.abs(x);let h1=1,h0=0,k1=0,k0=1,b=x;for(let i=0;i<25;i++){const a=Math.floor(b);[h1,h0]=[a*h1+h0,h1];[k1,k0]=[a*k1+k0,k1];if(k1>maxD)return null;if(Math.abs(x-h1/k1)<1e-9)return{n:s*h1,d:k1};b=1/(b-a);if(!isFinite(b))break}return Math.abs(x-h1/k1)<1e-9?{n:s*h1,d:k1}:null}
const FF=x=>{const f=toFrac(x);if(!f)return sig(x,4);if(f.d===1)return minus(f.n);return minus(`${f.n}/${f.d}`)};
const nqf=(p,v,o={})=>nq(p,v,{fmt:FF,tol:.005,...o});
const xp=(c,p,v='x')=>{if(c===0)return'';const a=Math.abs(c);const co=p===0?String(a):a===1?'':String(a);const pw=p===0?'':p===1?v:`${v}<sup>${p}</sup>`;return co+pw};
function poly(terms,v='x'){let s='';for(const[c,p]of terms){if(c===0)continue;const t=xp(c,p,v);s+=s?(c<0?` − ${t}`:` + ${t}`):(c<0?`−${t}`:t)}return s||'0'}
const K=a=>a===1?'':a===-1?'−':a;
const lin=a=>`x ${pm(-a)}`;
const fac=n=>n<=1?1:n*fac(n-1);
const binom=(m,k)=>{let r=1;for(let i=0;i<k;i++)r=r*(m-i)/(i+1);return Math.round(r)};
const intv=(a,b,lo='(',hi=')')=>`${lo}${a}, ${b}${hi}`;

// ---- Absolute values ----
function g137abs(){const v=R(0,3),a=R(-6,6),b=R(1,7);
  if(v===0)return mc(`Solve <b>|x ${pm(-a)}| &lt; ${b}</b>.`.replace('+ 0','').replace('− 0',''),`x ∈ ${intv(minus(a-b),minus(a+b))}`,[`x ∈ ${intv(minus(-a-b),minus(-a+b))}`,`x ∈ ${intv(minus(a-b),minus(a+b),'[',']')}`,`x ∈ ${intv(minus(b-a),minus(b+a))}`],[`|x − ${par(a)}| &lt; ${b} ⇔ −${b} &lt; x − ${par(a)} &lt; ${b}.`,`Add ${a}: ${a-b} &lt; x &lt; ${a+b}.`,'Geometrically: points within distance '+b+' of '+a+'.'],'|x − a| < δ ⇔ a − δ < x < a + δ.');
  if(v===1)return mc(`Solve <b>|x ${pm(-a)}| ≥ ${b}</b>.`,`x ≤ ${minus(a-b)} or x ≥ ${minus(a+b)}`,[`x &lt; ${minus(a-b)} or x &gt; ${minus(a+b)}`,`${minus(a-b)} ≤ x ≤ ${minus(a+b)}`,`x ≤ ${minus(-a-b)} or x ≥ ${minus(-a+b)}`],[`|x − ${par(a)}| ≥ ${b} means distance from ${a} is at least ${b}.`,`x − ${par(a)} ≤ −${b} or x − ${par(a)} ≥ ${b}.`,`x ≤ ${a-b} or x ≥ ${a+b}.`],'Distance at least b: two rays.');
  if(v===2){const c=pick([2,3,4]),d=R(-6,6);return mc(`Solve <b>|${K(c)}x ${pm(d)}| &lt; ${b}</b>.`.replace(' + 0',''),`x ∈ (${frt(-b-d,c)}, ${frt(b-d,c)})`,[`x ∈ (${frt(-b+d,c)}, ${frt(b+d,c)})`,`x ∈ (${-b-d}, ${b-d})`,`x ∈ (${frt(-b,c)}, ${frt(b,c)})`],[`−${b} &lt; ${K(c)}x ${pm(d)} &lt; ${b}.`,`Subtract ${d}: ${-b-d} &lt; ${K(c)}x &lt; ${b-d}.`,`Divide by ${c}: ${frt(-b-d,c)} &lt; x &lt; ${frt(b-d,c)}.`],'Unpack to −b < … < b, then isolate x.');}
  let p=R(-6,6),q;do{q=R(-6,6)}while(q===p);const m=(p+q)/2;
  return mc(`Solve <b>|x ${pm(-p)}| &lt; |x ${pm(-q)}|</b>.`.replace(/ [+−] 0\|/g,'|'),p<q?`x &lt; ${FF(m)}`:`x &gt; ${FF(m)}`,[p<q?`x &gt; ${FF(m)}`:`x &lt; ${FF(m)}`,`x &lt; ${FF(p+q)}`,`${Math.min(p,q)} &lt; x &lt; ${Math.max(p,q)}`],[`|x − ${par(p)}| &lt; |x − ${par(q)}|: x is closer to ${p} than to ${q}.`,`The midpoint is ${FF(m)}, so x ${p<q?'&lt;':'&gt;'} ${FF(m)}. (Or square both sides: the x² terms cancel.)`],'Think "distance to p is less than distance to q".');}
const g137tri=bank([
 {q:'|a + b| ≤ |a| + |b| for all real a, b.',t:true,e:'The Triangle Inequality.'},
 {q:'||a| − |b|| ≤ |a − b| for all real a, b.',t:true,e:'The Reverse Triangle Inequality.'},
 {q:'|a − b| ≤ |a| − |b| for all real a, b.',t:false,e:'a = 0, b = 1: |−1| = 1 but 0 − 1 = −1.'},
 {q:'√(x²) = x for all real x.',t:false,e:'√(x²) = |x|. Try x = −3.'},
 {q:'|x − a| &lt; δ ⇔ a − δ &lt; x &lt; a + δ.',t:true,e:'The key unpacking used in every ε–δ / ε–N proof.'},
 {q:'|ab| = |a||b| for all real a, b.',t:true,e:'Multiplicativity of absolute value.'},
 {q:'|a + b| = |a| + |b| exactly when ab ≥ 0.',t:true,e:'Equality in the triangle inequality happens when a and b have the same sign (or one is 0).'},
 {q:'If |x − 2| &lt; 1, then |x + 2| &lt; 5.',t:true,e:'1 &lt; x &lt; 3 ⇒ 3 &lt; x + 2 &lt; 5. (Bounding a factor like this is common in ε–δ proofs.)'},
]);

// ---- Sequences ----
function g137rec(){if(Math.random()<.2)return bank([{q:'Heron\'s sequence: a₁ = 2, aₙ₊₁ = ½(aₙ + 7/aₙ). It converges to…',a:'√7',w:['7','7/2','2'],e:'If aₙ → L then L = ½(L + 7/L) ⇒ L² = 7, and L &gt; 0.'},{q:'a₁ = 1, aₙ₊₁ = √(2 + aₙ). Given it converges, its limit is…',a:'2',w:['√2','−1','1 + √2'],e:'L = √(2 + L) ⇒ L² − L − 2 = 0 ⇒ L = 2 (L ≥ 0).'}])();
  const[rn,rd]=pick([[1,2],[1,3],[2,3],[-1,2],[3,4]]);const s=R(-6,9)||3,a1=R(-4,8);
  if(Math.random()<.5){let n=a1,d=1;const seq=[[n,d]];for(let i=0;i<3;i++){n=n*rn;d=d*rd;n=n+s*d;const g=gcd(n,d)||1;n/=g;d/=g;seq.push([n,d])}
    const v=seq[3][0]/seq[3][1];return nqf(`a₁ = ${a1}, aₙ₊₁ = ${rn===1?'':frs(rn,rd)}${rn===1?fr(1,rd):''}aₙ ${pm(s)}. Find a₄.`.replace(`${fr(1,rd)}aₙ`,`${fr('aₙ',rd)}`),v,{wrong:[seq[2][0]/seq[2][1],v+s,(seq[2][0]/seq[2][1])*rn/rd],steps:seq.slice(1).map(([n,d],i)=>`a<sub>${i+2}</sub> = ${frs(n,d)}`)});}
  const Lv=s/(1-rn/rd);return nqf(`a₁ = ${a1}, aₙ₊₁ = ${frs(rn,rd)}aₙ ${pm(s)}. Assuming (aₙ) converges, find its limit.`,Lv,{wrong:[s,s/(1+rn/rd),a1,-Lv],steps:['If aₙ → L then aₙ₊₁ → L too (it\'s a tail), so L = '+frs(rn,rd)+'L '+pm(s)+'.',`L(1 − ${frs(rn,rd)}) = ${s} ⇒ L = ${FF(Lv)}.`,'(MCT is how you\'d actually prove it converges: bounded + monotone.)'],hint:'Let n → ∞ on both sides of the recursion.'});}
function g137seqlim(){if(Math.random()<.4)return g137seqbank();
  const p=R(1,3),q=R(1,3),a=R(-6,7)||2,b=R(1,6),c=R(-5,5),d=R(-5,5);
  const num=poly([[a,p],[c,p-1]],'n'),den=poly([[b,q],[d,q-1]],'n');let ans,st;
  if(p===q){ans=FF(a/b);st=`Divide top and bottom by n<sup>${p}</sup>: → ${a}/${b} = ${FF(a/b)}.`}else if(p<q){ans='0';st=`Bottom has higher degree: divide by n<sup>${q}</sup>, numerator → 0, denominator → ${b}.`}else{ans=a/b>0?'diverges to ∞':'diverges to −∞';st=`Top has higher degree, so |aₙ| → ∞ with the sign of ${a}/${b}.`}
  return mc(`Find lim<sub>n→∞</sub> ${fr(num,den)}`,ans,['0',FF(a/b),'diverges to ∞','diverges to −∞',FF(c/(d||1)),'1'],[st],'Compare the highest powers of n.');}
const g137seqbank=bank([
 {q:`lim<sub>n→∞</sub> (√(n² + 6n) − n)`,a:'3',w:['0','6','∞'],e:'Multiply by the conjugate: 6n/(√(n² + 6n) + n) → 6/2 = 3.'},
 {q:`lim<sub>n→∞</sub> n/2ⁿ`,a:'0',w:['1/2','∞','1'],e:'Exponentials beat polynomials.'},
 {q:`lim<sub>n→∞</sub> sin(n)/n`,a:'0',w:['1','does not exist','sin(1)'],e:'Squeeze: −1/n ≤ sin(n)/n ≤ 1/n.'},
 {q:`lim<sub>n→∞</sub> (−1)ⁿ n/(n + 1)`,a:'does not exist',w:['1','−1','0'],e:'Even terms → 1, odd terms → −1: two subsequences with different limits.'},
 {q:`lim<sub>n→∞</sub> (1 + 1/n)ⁿ`,a:'e',w:['1','∞','does not exist'],e:'The definition of e.'},
 {q:`lim<sub>n→∞</sub> (2ⁿ + 3ⁿ)<sup>1/n</sup>`,a:'3',w:['5','2','∞'],e:'Squeeze: 3 ≤ (2ⁿ + 3ⁿ)<sup>1/n</sup> ≤ 3·2<sup>1/n</sup> → 3.'},
 {q:`lim<sub>n→∞</sub> cos(nπ)/n²`,a:'0',w:['1','does not exist','−1'],e:'|cos(nπ)/n²| ≤ 1/n² → 0.'},
]);
function g137epsN(){const Lv=R(-3,4),c=R(1,6),k=pick([1,2,3,5,-1,-2,-3]),m=pick([10,20,50,100]);const N=Math.abs(k)*m-c;
  const num=poly([[Lv,1],[Lv*c+k,0]],'n');
  return nq(`aₙ = ${fr(num,'n + '+c)} → ${Lv}. For ε = ${fr(1,m)}, what is the <b>smallest</b> N ∈ ℕ with |aₙ − ${minus(Lv)}| &lt; ε for all n &gt; N?`,N,{int:true,wrong:[N+1,N-1,Math.abs(k)*m,Math.abs(k)*m+c],pos:true,hint:'Simplify |aₙ − L| first, then solve the inequality for n.',
   steps:[`aₙ − ${par(Lv)} = ${fr(minus(k),'n + '+c)}, so |aₙ − ${par(Lv)}| = ${fr(Math.abs(k),'n + '+c)}.`,`${fr(Math.abs(k),'n + '+c)} &lt; ${fr(1,m)} ⇔ n + ${c} &gt; ${Math.abs(k)*m} ⇔ n &gt; ${N}.`,`So N = ${N} works; N = ${N-1} fails at n = ${N} (equality, not &lt;).`]});}
const g137sup=bank([
 {q:'sup{1 − 1/n : n ∈ ℕ} = ?',a:'1',w:['0','1/2','does not exist'],e:'Terms increase to 1 and never reach it: sup = 1 (not attained), inf = 0.'},
 {q:'inf{(−1)ⁿ/n : n ∈ ℕ} = ?',a:'−1',w:['0','−1/2','1/2'],e:'n = 1 gives −1, the smallest term. (sup is 1/2 from n = 2.)'},
 {q:'sup{x ∈ ℚ : x² &lt; 2} = ?',a:'√2',w:['2','1.41','does not exist in ℝ'],e:'The sup exists in ℝ (LUB property) but is not rational.'},
 {q:'Every bounded sequence converges.',t:false,e:'(−1)ⁿ is bounded but diverges.'},
 {q:'Every convergent sequence is bounded.',t:true,e:'Standard theorem: after N, terms are within 1 of L; only finitely many before.'},
 {q:'Every convergent sequence is monotone.',t:false,e:'(−1)ⁿ/n → 0 but alternates.'},
 {q:'A bounded, monotone sequence converges.',t:true,e:'The Monotone Convergence Theorem (needs LUB property).'},
 {q:'If aₙ → L, every subsequence of (aₙ) converges to L.',t:true,e:'Subsequences inherit the limit.'},
 {q:'If a₂ₙ → L and a₂ₙ₊₁ → L, then aₙ → L.',t:true,e:'Even and odd terms cover the whole sequence.'},
 {q:'If some subsequence of (aₙ) converges, then (aₙ) converges.',t:false,e:'(−1)ⁿ: the even subsequence converges to 1.'},
]);

// ---- Series ----
function g137geo(){const[rn,rd]=pick([[1,2],[2,3],[-1,2],[1,3],[-2,3],[3,4],[1,4],[-1,3],[3,2],[-5,4]]);const a=R(1,9)*pick([1,1,-1]),k=R(0,2);const r=rn/rd;
  const term=`${a===1?'':a===-1?'−':a}(${frt(rn,rd)})<sup>n</sup>`;
  if(Math.abs(r)>=1)return mc(`Evaluate Σ<sub>n=${k}</sub><sup>∞</sup> ${term}`,'Diverges',[FF(a*r**k/(1-r)),FF(a/(1-r)),'0'],[`|r| = ${FF(Math.abs(r))} ≥ 1, so the terms don\'t → 0. Geometric series diverges.`],'Geometric series converge iff |r| < 1.');
  const v=a*r**k/(1-r);return nqf(`Evaluate Σ<sub>n=${k}</sub><sup>∞</sup> ${term}`,v,{wrong:[a/(1-r),a*r**k/(1+r),a*r**(k+1)/(1-r)],steps:[`Geometric with r = ${frt(rn,rd)}, |r| &lt; 1 ✓.`,`Sum = (first term)/(1 − r) = ${FF(a*r**k)}/(1 − ${frt(rn,rd)}) = ${FF(v)}.`],hint:'Sum = first term / (1 − r). Watch where n starts.'});}
const g137series=bank([
 {q:'If aₙ → 0, then Σ aₙ converges.',t:false,e:'Σ 1/n diverges even though 1/n → 0.'},
 {q:'If Σ aₙ converges, then aₙ → 0.',t:true,e:'That\'s why the Divergence Test works (its contrapositive).'},
 {q:'Σ n/(n + 1) …',a:'diverges by the Divergence Test',w:['converges to 1','converges to 0','the Divergence Test is inconclusive'],e:'n/(n + 1) → 1 ≠ 0.'},
 {q:'Σ<sub>n=1</sub><sup>∞</sup> 1/(n(n + 1)) = ?',a:'1',w:['∞','1/2','2'],e:'Telescoping: 1/n − 1/(n+1), partial sums 1 − 1/(N+1) → 1.'},
 {q:'Σ<sub>n=1</sub><sup>∞</sup> cos(1/n)',a:'diverges by the Divergence Test',w:['converges','the Divergence Test is inconclusive','converges to 0'],e:'cos(1/n) → cos 0 = 1 ≠ 0.'},
 {q:'Σ<sub>n=1</sub><sup>∞</sup> 1/n',a:'diverges (harmonic series)',w:['converges','diverges by the Divergence Test','converges to 2'],e:'Terms → 0 so the Divergence Test says nothing, but the partial sums grow without bound.'},
 {q:'A series Σ aₙ converges means…',a:'its sequence of partial sums Sₙ converges',w:['aₙ → 0','aₙ is bounded','aₙ is decreasing'],e:'By definition.'},
]);

// ---- Limits of functions ----
function g137limalg(){const v=R(0,5),a=R(-5,6)||2;let p,val,st;
  if(v===0){p=`${LIM('x',a)} ${fr(`x² − ${a*a}`,`x ${pm(-a)}`)}`;val=2*a;st=[`Factor: x² − ${a*a} = (${lin(a)})(${lin(-a)}).`,`Cancel (x ≠ ${minus(a)}): limit = 2·${par(a)} = ${minus(val)}.`]}
  else if(v===1){const b=R(-5,6);p=`${LIM('x',a)} ${fr(poly([[1,2],[b-a,1],[-a*b,0]]),`x ${pm(-a)}`)}`;val=a+b;st=[`Numerator = (${lin(a)})(${lin(-b)}).`,`Cancel: limit = ${minus(a)} + ${par(b)} = ${minus(val)}.`]}
  else if(v===2){p=`${LIM('x',a)} ${fr(`x³ − ${par(a**3)}`,`x ${pm(-a)}`)}`;val=3*a*a;st=[`x³ − a³ = (x − a)(x² + ax + a²).`,`Limit = 3a² = ${val}.`]}
  else if(v===3){const k=R(1,6);p=`${LIM('x',0)} ${fr(`√(x + ${k*k}) − ${k}`,'x')}`;val=1/(2*k);st=[`Multiply by the conjugate √(x + ${k*k}) + ${k}.`,`= 1/(√(x + ${k*k}) + ${k}) → 1/${2*k}.`]}
  else if(v===4){p=`${LIM('h',0)} ${fr(`(${a} + h)² − ${a*a}`,'h')}`;val=2*a;st=[`Expand: (${2*a}h + h²)/h = ${2*a} + h → ${2*a}.`,'(That\'s f\'('+a+') for f(x) = x².)']}
  else{const b=R(2,6);p=`${LIM('x',b)} ${fr(`1/x − 1/${b}`,`x − ${b}`)}`;val=-1/(b*b);st=[`Combine: (${b} − x)/(${K(b)}x) ÷ (x − ${b}) = −1/(${K(b)}x).`,`→ −1/${b*b}.`]}
  return nqf(`Evaluate ${p}`,val,{wrong:[val+1,-val||1,val*2,0],steps:st,hint:'Plugging in gives 0/0: factor, cancel, or use a conjugate.'});}
function g137limtrig(){const a=R(1,6),b=R(1,6);const v=R(0,5);let p,val,st;
  if(v===0){p=`${LIM('x',0)} ${fr(`sin(${K(a)}x)`,`${K(b)}x`)}`;val=a/b;st=[`= (${a}/${b})·sin(${K(a)}x)/(${K(a)}x) → ${FF(a/b)}·1.`]}
  else if(v===1){p=`${LIM('x',0)} ${fr(`sin(${K(a)}x)`,`sin(${K(b)}x)`)}`;val=a/b;st=[`Write as [sin(${K(a)}x)/(${K(a)}x)]·[(${K(b)}x)/sin(${K(b)}x)]·(${a}/${b}) → ${FF(a/b)}.`]}
  else if(v===2){p=`${LIM('x',0)} ${fr(`tan(${K(a)}x)`,`${K(b)}x`)}`;val=a/b;st=[`tan(${K(a)}x) = sin(${K(a)}x)/cos(${K(a)}x), and cos → 1.`,`→ ${FF(a/b)}.`]}
  else if(v===3){p=`${LIM('x',0)} ${fr(`1 − cos(${K(a)}x)`,'x²')}`;val=a*a/2;st=[`Multiply by (1 + cos ${K(a)}x): sin²(${K(a)}x)/(x²(1 + cos ${K(a)}x)).`,`→ ${a*a}·1/2 = ${FF(val)}.`]}
  else if(v===4){p=`${LIM('x',0)} ${fr(`sin²(${K(a)}x)`,'x²')}`;val=a*a;st=[`= (sin(${K(a)}x)/x)² → ${a}² = ${a*a}.`]}
  else{p=`${LIM('x',0)} ${fr(`sin(${K(a)}x)`,`x² + ${K(b)}x`)}`;val=a/b;st=[`= [sin(${K(a)}x)/x]·1/(x + ${b}) → ${a}·(1/${b}).`]}
  return nqf(`Evaluate ${p}`,val,{wrong:[b/a,a,1,0,val*2],steps:[...st,'Uses the Fundamental Trig Limit: sin(θ)/θ → 1 as θ → 0.'],hint:'Massage it into sin(θ)/θ with the same θ on top and bottom.'});}
function g137liminf(){const v=R(0,5);const a=R(1,6),b=R(1,7),c=R(1,5);
  if(v===0)return mc(`${LIM('x','∞')} ${fr(`${K(a)}x² ${pm(b)}`,`${K(c)}x² + ${K(b)}x`)}`,FF(a/c),['0','∞',FF(b/c),FF(a/b)],[`Divide by x²: (${a} + ${b}/x²)/(${c} + ${b}/x) → ${FF(a/c)}.`,`Horizontal asymptote y = ${FF(a/c)}.`],'Divide by the highest power of x in the denominator.');
  if(v===1)return mc(`${LIM('x','∞')} (√(x² + ${2*a}x) − x)`,String(a),['0',String(2*a),'∞'],['Conjugate: '+2*a+'x/(√(x² + '+2*a+'x) + x).',`Divide by x: ${2*a}/(√(1 + ${2*a}/x) + 1) → ${a}.`],'∞ − ∞: multiply by the conjugate.');
  if(v===2)return mc(`${LIM('x','−∞')} ${fr(`√(${a*a}x² + 1)`,'x')}`,String(-a),[String(a),'0','∞'],[`For x &lt; 0, √(x²) = |x| = −x.`,`√(${a*a}x² + 1)/x = −√(${a*a} + 1/x²) → −${a}.`],'Careful: √(x²) = |x|, and x < 0 here.');
  if(v===3)return mc(`${LIM('x','∞')} ${fr(`ln(x<sup>${b}</sup>)`,`x<sup>1/${c+1}</sup>`)}`,'0',['∞',String(b),'1'],[`ln(x<sup>${b}</sup>) = ${b} ln x, and ln x ≪ x<sup>p</sup> for any p &gt; 0 (Fundamental Log Limit).`],'ln(x) ≪ xᵖ ≪ eˣ as x → ∞.');
  if(v===4)return mc(`${LIM('x','∞')} ${fr(`x<sup>${b+3}</sup>`,'eˣ')}`,'0',['∞','1',String(b+3)],['xᵖ ≪ eˣ as x → ∞, for any p.'],'Exponentials beat powers.');
  return mc(`${LIM('x','∞')} ${fr(`${K(a)}x ${pm(b)}`,`${K(c)}x² + 1`)}`,'0',[FF(a/c),'∞',String(a)],['Denominator has higher degree, so → 0.'],'Compare degrees.');}
function g137onesided(){const a=R(-4,4),b=R(-5,5);const side=pick(['+','−']);const v=R(0,2);
  if(v===0){const top=a+b===0?1:a+b;const bb=top-a;const up=(top>0)===(side==='+');
    return mc(`${LIM('x',a+'<sup>'+side+'</sup>')} ${fr(`x ${pm(bb)}`,`x ${pm(-a)}`)}`.replace(' + 0',''),up?'∞':'−∞',[up?'−∞':'∞','0','does not exist (finite)','1'],[`Numerator → ${top} (${top>0?'positive':'negative'}).`,`Denominator → 0 from the ${side==='+'?'positive':'negative'} side (x is ${side==='+'?'just above':'just below'} ${a}).`,`Sign: ${up?'+':'−'}, so the limit is ${up?'∞':'−∞'}. Vertical asymptote at x = ${a}.`],'Find the sign of the top and the sign of the tiny bottom.');}
  if(v===1)return mc(`${LIM('x',a+'<sup>'+side+'</sup>')} ${fr(`|x ${pm(-a)}|`,`x ${pm(-a)}`)}`.replace(/ \+ 0/g,''),side==='+'?'1':'−1',[side==='+'?'−1':'1','0','∞'],[`For x ${side==='+'?'&gt;':'&lt;'} ${a}, |x − ${par(a)}| = ${side==='+'?'':'−'}(x − ${par(a)}).`,`So the quotient is ${side==='+'?'1':'−1'}. The two-sided limit does NOT exist (jump).`],'Drop the absolute value using the sign of x − a.');
  return mc(`${LIM('x','0<sup>'+side+'</sup>')} e<sup>1/x</sup>`,side==='+'?'∞':'0',side==='+'?['0','1','−∞']:['∞','1','−∞'],[`1/x → ${side==='+'?'∞':'−∞'}, so e<sup>1/x</sup> → ${side==='+'?'∞':'0'}.`],'What does 1/x do first?');}
const g137seqchar=bank([
 {q:'lim<sub>x→0</sub> sin(1/x)',a:'does not exist',w:['0','1','∞'],e:'xₙ = 1/(nπ) gives f(xₙ) = 0, but yₙ = 1/(2nπ + π/2) gives 1. Two sequences → 0 with different limits (Sequential Characterization).'},
 {q:'If lim<sub>x→a</sub> f(x) = L, then f(xₙ) → L for every sequence xₙ → a with xₙ ≠ a.',t:true,e:'Sequential Characterization of Limits (⇒ direction).'},
 {q:'If f(xₙ) → L for ONE sequence xₙ → a (xₙ ≠ a), then lim<sub>x→a</sub> f(x) = L.',t:false,e:'You need EVERY such sequence. sin(1/x) is the counterexample.'},
 {q:'lim<sub>x→0</sub> x sin(1/x)',a:'0',w:['1','does not exist','∞'],e:'Squeeze: −|x| ≤ x sin(1/x) ≤ |x|.'},
 {q:'lim<sub>x→∞</sub> ln(x)/x',a:'0',w:['1','∞','does not exist'],e:'The Fundamental Log Limit.'},
 {q:'Which ordering is correct as x → ∞?',a:'ln(x) ≪ x<sup>0.01</sup> ≪ eˣ',w:['x<sup>0.01</sup> ≪ ln(x) ≪ eˣ','eˣ ≪ x<sup>0.01</sup> ≪ ln(x)','ln(x) ≪ eˣ ≪ x<sup>0.01</sup>'],e:'Logs ≪ any positive power ≪ exponentials.'},
 {q:'lim<sub>x→0</sub> ⌊x⌋',a:'does not exist',w:['0','−1','1'],e:'From the right ⌊x⌋ = 0, from the left ⌊x⌋ = −1.'},
]);

// ---- Continuity & IVT ----
function g137contk(){const a=R(1,4),b=R(-5,5),c=R(-5,6);
  if(Math.random()<.5){const k=(a*a+c-b)/a;return nqf(`For which k is f continuous everywhere?<div class="sys">f(x) = kx ${pm(b)} if x &lt; ${a}<br>f(x) = x² ${pm(c)} if x ≥ ${a}</div>`,k,{wrong:[k+1,(a*a+c+b)/a,a*a+c-b],steps:[`Both pieces are polynomials, so the only issue is x = ${a}.`,`Left limit: ${a}k ${pm(b)}. Value/right limit: ${a*a} ${pm(c)} = ${a*a+c}.`,`${a}k ${pm(b)} = ${a*a+c} ⇒ k = ${FF(k)}.`],hint:'Make the left limit equal f(a).'});}
  const r=R(-5,5);return nq(`f(x) = ${fr(`x² − ${r*r}`,`x ${pm(-r)}`)} for x ≠ ${r}, and f(${r}) = k. Which k makes f continuous at ${r}?`.replace(' + 0',''),2*r,{int:true,wrong:[0,r,r*r,-2*r],steps:[`For x ≠ ${r}: f(x) = x + ${par(r)}.`,`Limit at ${r}: ${2*r}. Set k = ${2*r} (removable discontinuity).`]});}
const g137disc=bank([
 {q:'f(x) = (x² − 1)/(x − 1) at x = 1 has a…',a:'removable discontinuity',w:['jump discontinuity','infinite discontinuity','oscillating discontinuity'],e:'The limit exists (2) but f(1) is undefined.'},
 {q:'f(x) = |x|/x at x = 0 has a…',a:'jump discontinuity',w:['removable discontinuity','infinite discontinuity','no discontinuity'],e:'Left limit −1, right limit 1.'},
 {q:'f(x) = 1/x² at x = 0 has a…',a:'infinite discontinuity',w:['removable discontinuity','jump discontinuity','oscillating discontinuity'],e:'Vertical asymptote: f → ∞.'},
 {q:'f(x) = sin(1/x) at x = 0 has a…',a:'oscillating discontinuity',w:['removable discontinuity','jump discontinuity','infinite discontinuity'],e:'No one-sided limits exist; it oscillates between −1 and 1.'},
 {q:'f is continuous at a means…',a:'lim<sub>x→a</sub> f(x) exists and equals f(a)',w:['f(a) is defined','lim<sub>x→a</sub> f(x) exists','f is differentiable at a'],e:'All three: f(a) defined, limit exists, they\'re equal.'},
 {q:'If f and g are continuous at a, then f/g is continuous at a.',t:false,e:'Only if g(a) ≠ 0.'},
 {q:'If g is continuous at a and f is continuous at g(a), then f ∘ g is continuous at a.',t:true,e:'Continuity of compositions.'},
]);
function g137ivt(){let f,coef,vals,good,ok=false;for(let t=0;t<50&&!ok;t++){const b=R(-6,4),c=R(-6,6);coef=[b,c];f=x=>x**3+b*x+c;vals=[];for(let x=-3;x<=3;x++)vals.push([x,f(x)]);
  good=[];for(let i=0;i<6;i++){if(vals[i][1]*vals[i+1][1]<0)good.push(i)}ok=good.length>=1&&good.length<=2&&vals.every(v=>v[1]!==0)}
  const gi=pick(good);const badI=[0,1,2,3,4,5].filter(i=>!good.includes(i));const I=i=>`[${vals[i][0]}, ${vals[i+1][0]}]`;
  return mc(`f(x) = ${poly([[1,3],[coef[0],1],[coef[1],0]])}. By the IVT, which interval must contain a root?`,I(gi),shuffle(badI).map(I),[`Values: ${vals.map(([x,y])=>`f(${x}) = ${y}`).join(', ')}.`,`f is a polynomial so it\'s continuous, and f changes sign on ${I(gi)}: f(${vals[gi][0]}) = ${vals[gi][1]}, f(${vals[gi+1][0]}) = ${vals[gi+1][1]}.`,'By the IVT there is c in that interval with f(c) = 0.'],'Look for a sign change. Continuity is what lets you use IVT.');}
function g137bisect(){const k=pick([2,3,5,6,7,8,10,11,12,13,14,15,17,19]);const lo=Math.floor(Math.sqrt(k)),hi=lo+1;let a=lo,b=hi;const st=[`f(x) = x² − ${k}: f(${a}) = ${a*a-k} &lt; 0, f(${b}) = ${b*b-k} &gt; 0.`];
  for(let i=0;i<2;i++){const m=(a+b)/2,fm=m*m-k;st.push(`Midpoint ${m}: f(${m}) = ${sig(fm,4)} ${fm<0?'&lt; 0 → keep right half':'&gt; 0 → keep left half'}.`);if(fm<0)a=m;else b=m}
  const I=(x,y)=>`[${x}, ${y}]`;const c=(lo+hi)/2;
  return mc(`Bisection for a root of x² − ${k} on [${lo}, ${hi}]. What is the interval after <b>two</b> steps?`,I(a,b),[I(lo,c),I(c,hi),I(lo+.25,lo+.5),I(lo+.5,lo+.75),I(lo+.75,hi),I(lo,lo+.25)],st,'Each step: check the sign at the midpoint and keep the half with a sign change.');}
const g137evt=bank([
 {q:'If f is continuous on [a, b], then f attains a maximum and a minimum on [a, b].',t:true,e:'The Extreme Value Theorem.'},
 {q:'f(x) = 1/x attains a maximum on (0, 1].',t:false,e:'It\'s unbounded near 0. EVT needs a CLOSED interval.'},
 {q:'If f(a) &lt; 0 &lt; f(b), then f has a root in (a, b).',t:false,e:'Only if f is continuous on [a, b]. f(x) = 1/x on [−1, 1] is a counterexample.'},
 {q:'x⁵ + x − 1 = 0 has a solution in (0, 1).',t:true,e:'f(0) = −1 &lt; 0 &lt; 1 = f(1), and polynomials are continuous: IVT.'},
 {q:'If f is continuous on [a, b] and f(a) ≠ f(b), then f takes every value between f(a) and f(b).',t:true,e:'That\'s the IVT.'},
]);

// ---- Derivatives ----
function g137defn(){const v=R(0,3);
  if(v===0){const a=R(1,4),n=R(2,4);const val=n*a**(n-1);return mc(`${LIM('h',0)} ${fr(`(${a} + h)<sup>${n}</sup> − ${a**n}`,'h')} is f′(a) for which f and a?`,`f(x) = x<sup>${n}</sup>, a = ${a}`,[`f(x) = x<sup>${n}</sup>, a = ${a**n}`,`f(x) = (${a} + x)<sup>${n}</sup>, a = 0 and the limit is ${a**n}`,`f(x) = x<sup>${n-1}</sup>, a = ${a}`],[`f′(a) = ${LIM('h',0)} (f(a + h) − f(a))/h.`,`Match: f(x) = x<sup>${n}</sup>, a = ${a}. So the limit equals ${n}·${a}<sup>${n-1}</sup> = ${val}.`],'Match it with (f(a + h) − f(a))/h.');}
  if(v===1){const a=pick([1,4,9,16,25]);return nqf(`Evaluate ${LIM('h',0)} ${fr(`√(${a} + h) − ${Math.sqrt(a)}`,'h')}`,1/(2*Math.sqrt(a)),{wrong:[Math.sqrt(a)/2,1/Math.sqrt(a),0],steps:[`This is f′(${a}) for f(x) = √x.`,`f′(x) = 1/(2√x), so f′(${a}) = 1/${2*Math.sqrt(a)}.`]});}
  if(v===2){const a=R(-3,4),b=R(1,4);return nq(`Using the definition, f(x) = ${K(b)}x² for which f′(${a}) = ${LIM('h',0)} ${fr(`f(${a} + h) − f(${a})`,'h')}. Evaluate it.`,2*a*b,{int:true,wrong:[a*b,b*a*a,2*a],steps:[`f(${a} + h) − f(${a}) = ${b}(${2*a}h + h²).`,`Divide by h: ${2*a*b} + ${b}h → ${2*a*b}.`]});}
  return bank([
   {q:'If f is differentiable at a, then f is continuous at a.',t:true,e:'Differentiability ⇒ continuity.'},
   {q:'If f is continuous at a, then f is differentiable at a.',t:false,e:'|x| at 0: continuous, but a corner.'},
   {q:'f(x) = x<sup>1/3</sup> is differentiable at 0.',t:false,e:'Vertical tangent: the difference quotient h<sup>−2/3</sup> → ∞.'},
   {q:'f(x) = x|x| is differentiable at 0.',t:true,e:'(h|h| − 0)/h = |h| → 0, so f′(0) = 0.'},
   {q:'Where is f(x) = |x − 3| NOT differentiable?',a:'x = 3',w:['x = 0','x = −3','nowhere'],e:'Corner at x = 3: left derivative −1, right derivative 1.'},
  ])();}
function g137rules(){const v=R(0,6);let f,val,st,x0;
  if(v===0){const a=R(1,5),n=R(2,5),b=R(-4,4),m=R(1,3);x0=R(-2,2);f=`${poly([[a,n],[b,m]])}`;val=a*n*x0**(n-1)+b*m*x0**(m-1);st=[`f′(x) = ${poly([[a*n,n-1],[b*m,m-1]])}.`,`f′(${x0}) = ${val}.`]}
  else if(v===1){const a=R(1,4),b=R(-4,4),c=R(1,3);x0=0;f=`(${poly([[a,1],[b,0]])})e<sup>${c===1?'':c}x</sup>`;val=a+b*c;st=[`Product rule: f′ = ${a}e<sup>${K(c)}x</sup> + (${poly([[a,1],[b,0]])})·${c}e<sup>${K(c)}x</sup>.`,`At 0: ${a} + ${b}·${c} = ${val}.`]}
  else if(v===2){let a,b,c,d;do{a=R(1,5);b=R(-4,4);c=R(1,3);d=R(1,5)}while(a*d-b*c===0);x0=R(0,2);f=fr(poly([[a,1],[b,0]]),poly([[c,1],[d,0]]));val=(a*d-b*c)/(c*x0+d)**2;st=[`Quotient rule: f′ = ((cx + d)·a − (ax + b)·c)/(cx + d)² = ${a*d-b*c}/(${poly([[c,1],[d,0]])})².`,`At ${x0}: ${a*d-b*c}/${(c*x0+d)**2} = ${FF(val)}.`]}
  else if(v===3){const a=R(1,3),b=pick([-3,-2,-1,1,2,3]),n=R(2,4);x0=R(-2,2);f=`(${poly([[a,2],[b,0]])})<sup>${n}</sup>`;val=n*(a*x0*x0+b)**(n-1)*2*a*x0;st=[`Chain rule: f′ = ${n}(${poly([[a,2],[b,0]])})<sup>${n-1}</sup>·${2*a}x.`,`At ${x0}: ${n}·${par(a*x0*x0+b)}<sup>${n-1}</sup>·${2*a*x0} = ${val}.`]}
  else if(v===4){const a=R(1,5),b=R(1,5);x0=0;f=`sin(${K(a)}x)cos(${K(b)}x)`;val=a;st=[`f′ = ${a}cos(${K(a)}x)cos(${K(b)}x) − ${b}sin(${K(a)}x)sin(${K(b)}x).`,`At 0: ${a}·1·1 − 0 = ${a}.`]}
  else if(v===5){const a=R(1,4),b=R(-5,5);x0=0;f=`e<sup>${poly([[a,2],[b,1]])}</sup>`;val=b;st=[`f′ = (${poly([[2*a,1],[b,0]])})e<sup>${poly([[a,2],[b,1]])}</sup>.`,`At 0: ${b}·e⁰ = ${b}.`]}
  else{const a=R(1,5),b=R(1,6);x0=R(0,3);f=`ln(${poly([[a,1],[b,0]])})`;val=a/(a*x0+b);st=[`f′ = ${a}/(${poly([[a,1],[b,0]])}).`,`At ${x0}: ${a}/${a*x0+b} = ${FF(val)}.`]}
  return nqf(`f(x) = ${f}. Find f′(${x0}).`,val,{wrong:[val+1,-val,val*2,0,val-1],steps:st,hint:'Product, quotient, chain: identify the outer structure first.'});}
const g137trig=bank([
 {q:'d/dx [arcsin x] = ?',a:'1/√(1 − x²)',w:['−1/√(1 − x²)','1/(1 + x²)','cos(arcsin x)⁻¹ only for x &gt; 0'],e:'By the Inverse Function Theorem: 1/cos(arcsin x) = 1/√(1 − x²).'},
 {q:'d/dx [arctan x] = ?',a:'1/(1 + x²)',w:['sec² x','1/√(1 − x²)','−1/(1 + x²)'],e:'1/sec²(arctan x) = 1/(1 + x²).'},
 {q:'d/dx [tan x] = ?',a:'sec² x',w:['sec x tan x','−csc² x','1/(1 + x²)'],e:'Quotient rule on sin/cos.'},
 {q:'d/dx [sec x] = ?',a:'sec x tan x',w:['sec² x','−csc x cot x','tan² x'],e:'(1/cos x)′ = sin x/cos² x.'},
 {q:'d/dx [cot x] = ?',a:'−csc² x',w:['csc² x','−csc x cot x','sec² x'],e:'(cos/sin)′ = (−sin² − cos²)/sin² = −csc² x.'},
 {q:'d/dx [aˣ] = ? (a &gt; 0)',a:'aˣ ln a',w:['x aˣ⁻¹','aˣ','aˣ/ln a'],e:'aˣ = e<sup>x ln a</sup>.'},
 {q:'d/dx [arccos x] = ?',a:'−1/√(1 − x²)',w:['1/√(1 − x²)','−1/(1 + x²)','sin x'],e:'arccos x = π/2 − arcsin x.'},
 {q:'d/dx [ln|x|] = ?',a:'1/x',w:['1/|x|','ln x','|x|/x'],e:'Valid for x ≠ 0, both sides.'},
 {q:'d/dx [xˣ] at x = 1 = ?',a:'1',w:['0','e','ln 1'],e:'Log diff: (xˣ)′ = xˣ(ln x + 1). At 1: 1·(0 + 1) = 1.'},
]);
function g137ift(){const a=R(1,6),b=R(-5,5),x0=R(-2,2);const c=x0**3+a*x0+b;const fp=3*x0*x0+a;
  return nqf(`f(x) = ${poly([[1,3],[a,1],[b,0]])} is invertible. Let g = f⁻¹. Find g′(${c}).`,1/fp,{wrong:[fp,1/(3*c*c+a),1/(a)===1/fp?2/fp:1/a],steps:[`First solve f(x) = ${c}: x = ${x0} (check: ${x0**3} + ${a*x0} ${pm(b)} = ${c}).`,`IFT: g′(${c}) = 1/f′(${x0}).`,`f′(x) = 3x² + ${a}, f′(${x0}) = ${fp}. So g′(${c}) = 1/${fp}.`],hint:'g′(f(a)) = 1/f′(a). First find which a has f(a) = the given number.'});}
function g137implicit(){let x0,y0,a,val,eqs,st;
  for(let t=0;t<100;t++){x0=R(-3,3);y0=R(-3,3);a=R(-3,3);if(Math.random()<.5){const den=a*x0+2*y0;if(den===0)continue;const c=x0*x0+a*x0*y0+y0*y0;val=-(2*x0+a*y0)/den;eqs=`x² ${a?`${a<0?'−':'+'} ${Math.abs(a)===1?'':Math.abs(a)}xy`:''} + y² = ${c}`;st=[`Differentiate: 2x ${a?pm(a)+'(y + xy′)':''} + 2yy′ = 0.`,`y′(${a?a+'x':''} + 2y) = −(2x ${a?pm(a)+'y':''}) ⇒ y′ = −(2x ${pm(a)}y)/(${K(a)}x + 2y).`,`At (${x0}, ${y0}): y′ = ${-(2*x0+a*y0)}/${den} = ${FF(val)}.`];break}
   else{const den=x0*x0+3*y0*y0;if(den===0)continue;const c=x0*x0*y0+y0**3;val=-2*x0*y0/den;eqs=`x²y + y³ = ${c}`;st=['Differentiate: 2xy + x²y′ + 3y²y′ = 0.','y′ = −2xy/(x² + 3y²).',`At (${x0}, ${y0}): y′ = ${-2*x0*y0}/${den} = ${FF(val)}.`];break}}
  return nqf(`Find dy/dx at (${x0}, ${y0}) on the curve <b>${eqs}</b>.`,val,{wrong:[-val||1,val+1,1/(val||2)],steps:st,hint:'Differentiate both sides, treating y as a function of x (chain rule gives y′).'});}

// ---- Linear approximation, Newton, related rates ----
function g137lin(){const v=R(0,4);let p,val,st,wr;
  if(v===0){const a=R(2,10),d=pick([.1,.2,-.1,.3,.5,-.2]);p=`√${a*a+d}`;val=a+d/(2*a);wr=[a+d/a,a+d,a+d/(4*a)];st=[`f(x) = √x, a = ${a*a}: L(x) = ${a} + (x − ${a*a})/(2·${a}).`,`L(${a*a+d}) = ${a} + ${d}/${2*a} = ${sig(val,6)}.`]}
  else if(v===1){const a=R(2,5),d=pick([.1,.2,.3,-.1]);p=`∛${a**3+d}`;val=a+d/(3*a*a);wr=[a+d/(3*a),a+d/(a*a),a+d];st=[`f(x) = x<sup>1/3</sup>, f′(x) = 1/(3x<sup>2/3</sup>), a = ${a**3}.`,`L = ${a} + ${d}/(3·${a*a}) = ${sig(val,6)}.`]}
  else if(v===2){const d=pick([.1,.05,.2,-.1,.02]);p=`e<sup>${d}</sup>`;val=1+d;wr=[d,1+d/2,1+d*Math.E];st=['f(x) = eˣ at a = 0: L(x) = 1 + x.',`L(${d}) = ${1+d}.`]}
  else if(v===3){const d=pick([.1,.05,.2,.02]),n=R(3,9);p=`(1.${String(d).split('.')[1]})<sup>${n}</sup>`.replace('1.'+String(d).split('.')[1],String(1+d));val=1+n*d;wr=[1+d,1+n*d/2,n*(1+d)];st=[`f(x) = (1 + x)<sup>${n}</sup> at a = 0: L(x) = 1 + ${n}x.`,`L(${d}) = ${round(val,4)}.`]}
  else{const d=pick([.1,.05,.2,.02,-.1]);p=`ln(${1+d})`;val=d;wr=[1+d,d/2,-d];st=['f(x) = ln(1 + x) at a = 0: L(x) = x.',`L(${d}) = ${d}.`]}
  return nq(`Use a linear approximation to estimate <b>${p}</b>.`,val,{fmt:x=>sig(x,5),tol:.0005,wrong:wr,steps:st,hint:'L(x) = f(a) + f′(a)(x − a), with a a nearby "nice" point.'});}
function g137linerr(){if(Math.random()<.4)return bank([
  {q:'L(x) for √x at a = 25, used to estimate √26, gives…',a:'an overestimate',w:['an underestimate','the exact value','can\'t tell'],e:'√x is concave down (f″ &lt; 0), so tangent lines lie above the graph.'},
  {q:'L(x) for eˣ at a = 0, used to estimate e<sup>0.1</sup>, gives…',a:'an underestimate',w:['an overestimate','the exact value','can\'t tell'],e:'eˣ is concave up, so the tangent line lies below the graph.'},
  {q:'The error |f(x) − Lₐ(x)| is bounded by…',a:'(M/2)(x − a)², where |f″| ≤ M between a and x',w:['M|x − a|','(M/2)|x − a|','M(x − a)²/6'],e:'Linear Approximation error bound (from Taylor with n = 1).'},
 ])();
  const a=R(2,6),d=pick([.1,.2,.5,1]);const M=1/(4*a**3);const bound=M/2*d*d;
  return nq(`Estimating √${a*a+d} with L(x) at a = ${a*a}. On [${a*a}, ${a*a+d}], |f″(x)| = 1/(4x<sup>3/2</sup>) ≤ 1/(4·${a**3}). What error bound does this give?`,bound,{fmt:x=>sig(x,3),tol:.01,wrong:[M*d,M*d*d,bound*2,M/2*d],steps:[`|f″| is largest at the left end: M = 1/(4·${a}³) = 1/${4*a**3}.`,`Error ≤ (M/2)(x − a)² = (1/${8*a**3})·${d}² = ${sig(bound,3)}.`],hint:'Error ≤ (M/2)(x − a)².'});}
function g137newton(){const v=R(0,2);let f,fp,x0,str;
  if(v===0){const k=pick([2,3,5,6,7,10,11,13]);x0=Math.round(Math.sqrt(k))||1;f=x=>x*x-k;fp=x=>2*x;str=`x² − ${k}`}
  else if(v===1){const k=pick([2,3,5,9,10,20]);x0=Math.max(1,Math.round(Math.cbrt(k)));f=x=>x**3-k;fp=x=>3*x*x;str=`x³ − ${k}`}
  else{const p=R(1,4),q=R(-6,-1);x0=1;f=x=>x**3+p*x+q;fp=x=>3*x*x+p;str=poly([[1,3],[p,1],[q,0]])}
  const x1=x0-f(x0)/fp(x0);
  return nqf(`Newton's Method on f(x) = ${str} with x₁ = ${x0}. Find x₂.`,x1,{wrong:[x0+f(x0)/fp(x0),x0-fp(x0)/f(x0)||x0+1,x0-f(x0)],steps:[`x₂ = x₁ − f(x₁)/f′(x₁).`,`f(${x0}) = ${f(x0)}, f′(${x0}) = ${fp(x0)}.`,`x₂ = ${x0} − (${f(x0)})/${fp(x0)} = ${FF(x1)}.`],hint:'xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ).'});}
function g137related(){const v=R(0,3);
  if(v===0){const[L_,x,y]=pick([[5,3,4],[13,5,12],[10,6,8],[25,7,24],[17,8,15]]);const s=R(1,4);const val=x*s/y;
    return nqf(`A ${L_} m ladder leans on a wall. The bottom slides away at ${s} m/s. How fast is the top sliding <b>down</b> when the bottom is ${x} m from the wall? (m/s)`,val,{wrong:[y*s/x,s,x*s/L_],steps:[`x² + y² = ${L_}². Differentiate: 2x x′ + 2y y′ = 0.`,`At x = ${x}: y = ${y}. y′ = −x x′/y = −${x}·${s}/${y} = ${FF(-val)}.`,`So the top slides down at ${FF(val)} m/s.`],hint:'Pythagoras, then differentiate with respect to t.'});}
  if(v===1){const k=R(10,100),r=R(2,10);const val=k/(4*Math.PI*r*r);
    return nq(`Air is pumped into a spherical balloon at ${k} cm³/s. How fast is the radius increasing when r = ${r} cm? (cm/s)`,val,{fmt:x=>sig(x,3),tol:.01,wrong:[k/(4*r*r),k/(Math.PI*r*r),k/(4/3*Math.PI*r**3)],steps:['V = (4/3)πr³ ⇒ dV/dt = 4πr² dr/dt.',`dr/dt = ${k}/(4π·${r*r}) ≈ ${sig(val,3)} cm/s.`],hint:'Differentiate the volume formula with respect to time.'});}
  if(v===2){const R0=pick([2,3,4,5]),H=R0*pick([2,3]),k=R(2,9),h=R(1,H-1);const r=R0/H*h;const val=k/(Math.PI*r*r);
    return nq(`Water pours at ${k} m³/min into an inverted cone (top radius ${R0} m, height ${H} m). How fast is the water level rising when it is ${h} m deep? (m/min)`,val,{fmt:x=>sig(x,3),tol:.01,wrong:[k/(Math.PI*h*h),3*k/(Math.PI*r*r),k/(Math.PI*R0*R0)],steps:[`Similar triangles: r = (${R0}/${H})h, so V = (π/3)(${R0}/${H})²h³.`,`dV/dt = π(${R0}/${H})²h² dh/dt = πr² dh/dt.`,`At h = ${h}: r = ${FF(r)}, dh/dt = ${k}/(π·${FF(r*r)}) ≈ ${sig(val,3)} m/min.`],hint:'Use similar triangles to eliminate r first.'});}
  const r=R(2,12),s=R(1,5);const val=2*Math.PI*r*s;return nq(`A circular ripple's radius grows at ${s} cm/s. How fast is its area growing when r = ${r} cm? (cm²/s)`,val,{fmt:x=>sig(x,3),tol:.01,wrong:[Math.PI*r*r*s,2*r*s,Math.PI*r*s],steps:['A = πr² ⇒ dA/dt = 2πr dr/dt.',`= 2π·${r}·${s} ≈ ${sig(val,3)} cm²/s.`]});}

// ---- Extrema, MVT ----
function g137crit(){let p,q;do{p=R(-4,3);q=R(p+1,5)}while((p+q)%2!==0);const c=R(-5,5);const A=-1.5*(p+q),B=3*p*q;const f=poly([[1,3],[A,2],[B,1],[c,0]]);const fp=poly([[3,2],[-3*(p+q),1],[3*p*q,0]]);const ip=(p+q)/2;
  return multi(`f(x) = ${f}`,[
   mc(`Find the critical points of f.`,`x = ${p} and x = ${q}`,[`x = ${-p} and x = ${-q}`,`x = ${p+q}`,`x = ${ip}`],[`f′(x) = ${fp} = 3(x ${pm(-p)})(x ${pm(-q)}).`,`f′ = 0 at x = ${p}, ${q}.`],'Set f′(x) = 0 and factor.'),
   mc(`Where does f have a <b>local maximum</b>?`,`x = ${p}`,[`x = ${q}`,`x = ${ip}`,'nowhere'],[`f′ &gt; 0 on (−∞, ${p}), f′ &lt; 0 on (${p}, ${q}), f′ &gt; 0 on (${q}, ∞).`,`+ to − at x = ${p}: local max (First Derivative Test). − to + at ${q}: local min.`],'Sign chart of f′.'),
   nqf(`Find the x-coordinate of the inflection point.`,ip,{wrong:[p,q,p+q],steps:[`f″(x) = 6x ${pm(-3*(p+q))} = 0 ⇒ x = ${FF(ip)}.`,'f″ changes sign there, so it\'s an inflection point.'],hint:'Solve f″(x) = 0 and check the sign change.'})]);}
function g137absext(){let p,q;do{p=R(-3,2);q=R(p+1,4)}while((p+q)%2!==0);const c=R(-3,3);const A=-1.5*(p+q),B=3*p*q;const f=x=>x**3+A*x*x+B*x+c;const a=p-R(1,2),b=q+R(1,2);
  const cand=[[a,f(a)],[p,f(p)],[q,f(q)],[b,f(b)]];const mx=cand.reduce((m,v)=>v[1]>m[1]?v:m),mn=cand.reduce((m,v)=>v[1]<m[1]?v:m);const askMax=Math.random()<.5;const ans=askMax?mx:mn;
  return nqf(`Find the absolute ${askMax?'maximum':'minimum'} <b>value</b> of f(x) = ${poly([[1,3],[A,2],[B,1],[c,0]])} on [${a}, ${b}].`,ans[1],{wrong:[(askMax?mn:mx)[1],f(p),f(q),f(a)].filter(x=>x!==ans[1]),steps:[`Critical points: x = ${p}, ${q} (both in the interval).`,`Check them and the endpoints: ${cand.map(([x,y])=>`f(${x}) = ${FF(y)}`).join(', ')}.`,`Absolute ${askMax?'max':'min'} = ${FF(ans[1])} at x = ${ans[0]}.`],hint:'Closed Interval Method: compare f at critical points and endpoints.'});}
function g137mvt(){if(Math.random()<.5){const b=R(-5,5),c=R(-5,5),a1=R(-4,2),a2=a1+R(2,6);const cc=(a1+a2)/2;
    return nqf(`Find the c guaranteed by the MVT for f(x) = ${poly([[1,2],[b,1],[c,0]])} on [${a1}, ${a2}].`,cc,{wrong:[a1,a2,(a2-a1)/2,cc+b/2],steps:[`(f(${a2}) − f(${a1}))/(${a2} − ${a1}) = ${a1+a2+b}.`,`f′(c) = 2c ${pm(b)} = ${a1+a2+b} ⇒ c = ${FF(cc)}.`],hint:'Set f′(c) equal to the average rate of change.'});}
  const b=pick([3,6,9,12]);const cc=b/Math.sqrt(3);return nq(`Find c in (0, ${b}) with f′(c) = (f(${b}) − f(0))/${b} for f(x) = x³.`,cc,{fmt:x=>sig(x,4),tol:.002,wrong:[b/2,b/3,b/Math.sqrt(2)],steps:[`Average rate: ${b**3}/${b} = ${b*b}.`,`3c² = ${b*b} ⇒ c = ${b}/√3 ≈ ${sig(cc,4)}.`]});}
const g137mvtb=bank([
 {q:'If f′(x) = 0 for all x in an interval I, then f is constant on I.',t:true,e:'Consequence of the MVT.'},
 {q:'If f′(x) = g′(x) on an interval, then f = g.',t:false,e:'Only f = g + C (Antiderivative Theorem).'},
 {q:'If f′(x) &gt; 0 on (a, b), then f is strictly increasing on (a, b).',t:true,e:'Increasing Function Theorem (via MVT).'},
 {q:'If f is strictly increasing on (a, b), then f′(x) &gt; 0 there.',t:false,e:'x³ is strictly increasing, but f′(0) = 0.'},
 {q:'If f′(c) = 0, then f has a local extremum at c.',t:false,e:'x³ at 0: critical point, no extremum.'},
 {q:'If f″(c) = 0, the Second Derivative Test…',a:'is inconclusive',w:['says c is an inflection point','says c is a local max','says c is a local min'],e:'x⁴, −x⁴ and x³ all have f″(0) = 0 with different behaviour.'},
 {q:'|sin a − sin b| ≤ |a − b| for all a, b.',t:true,e:'MVT + |cos c| ≤ 1 (functions with bounded derivatives).'},
 {q:'MVT hypotheses on [a, b]:',a:'continuous on [a, b], differentiable on (a, b)',w:['differentiable on [a, b] only','continuous on (a, b)','f(a) = f(b)'],e:'f(a) = f(b) is the extra hypothesis for Rolle\'s Theorem.'},
 {q:'If f′(c) = 0 and f″(c) &gt; 0, then f has a…',a:'local minimum at c',w:['local maximum at c','inflection point at c','no conclusion'],e:'Second Derivative Test: concave up ⇒ min.'},
]);

// ---- L'Hôpital & Taylor ----
function g137lhop(){const a=R(1,5),b=R(1,5);const v=R(0,5);let p,val,st,str=null;
  if(v===0){p=`${LIM('x',0)} ${fr(`e<sup>${K(a)}x</sup> − 1`,`${K(b)}x`)}`;val=a/b;st=[`0/0. L\'H: ${a}e<sup>${K(a)}x</sup>/${b} → ${FF(a/b)}.`]}
  else if(v===1){p=`${LIM('x',0)} ${fr(`e<sup>${K(a)}x</sup> − 1 − ${K(a)}x`,'x²')}`;val=a*a/2;st=[`0/0. L\'H: (${a}e<sup>${K(a)}x</sup> − ${a})/(2x), still 0/0.`,`L\'H again: ${a*a}e<sup>${K(a)}x</sup>/2 → ${FF(val)}.`]}
  else if(v===2){p=`${LIM('x',0)} ${fr(`ln(1 + ${K(a)}x)`,`${K(b)}x`)}`;val=a/b;st=[`0/0. L\'H: (${a}/(1 + ${K(a)}x))/${b} → ${FF(a/b)}.`]}
  else if(v===3){p=`${LIM('x',0)} ${fr(`sin(${K(a)}x) − ${K(a)}x`,'x³')}`;val=-(a**3)/6;st=['0/0 three times.',`Derivatives: ${a}cos(${K(a)}x) − ${a} → −${a*a}sin(${K(a)}x) → −${a**3}cos(${K(a)}x); denominator 3x² → 6x → 6.`,`Limit = −${a**3}/6.`]}
  else if(v===4){p=`${LIM('x','∞')} (1 + ${a}/x)<sup>x</sup>`;str=`e<sup>${a}</sup>`;st=[`1<sup>∞</sup> form. Take ln: x·ln(1 + ${a}/x) = ln(1 + ${a}/x)/(1/x), 0/0.`,`L\'H → ${a}, so the limit is e<sup>${a}</sup>.`]}
  else{const xa=a===1?'x':`x<sup>${a}</sup>`;p=`${LIM('x','0<sup>+</sup>')} ${xa} ln x`;val=0;st=[`0·(−∞): write as ln x / x<sup>−${a}</sup> (−∞/∞).`,`L\'H: (1/x)/(−${K(a)}x<sup>−${a+1}</sup>) = −${xa}/${a} → 0.`]}
  if(str)return mc(`Evaluate ${p}`,str,['1','∞',`e<sup>${a+1}</sup>`,`${a}`],st,'Indeterminate power: take the log first.');
  return nqf(`Evaluate ${p}`,val,{wrong:[b/a,val*2||1,-val||-1,1],steps:st,hint:'Confirm 0/0 or ∞/∞ first, then differentiate top and bottom separately.'});}
function g137taylor(){const fams=[
  {f:a=>`e<sup>${K(a)}x</sup>`,c:(a,k)=>a**k/fac(k)},{f:a=>`sin(${K(a)}x)`,c:(a,k)=>k%2?(-1)**((k-1)/2)*a**k/fac(k):0},{f:a=>`cos(${K(a)}x)`,c:(a,k)=>k%2?0:(-1)**(k/2)*a**k/fac(k)},
  {f:a=>`ln(1 + ${K(a)}x)`,c:(a,k)=>k===0?0:(-1)**(k+1)*a**k/k},{f:a=>`1/(1 − ${K(a)}x)`,c:(a,k)=>a**k}];
  const F=pick(fams),a=R(1,3),k=R(2,4);
  if(Math.random()<.5){const val=F.c(a,k);return nqf(`What is the coefficient of x<sup>${k}</sup> in T<sub>${k+1},0</sub>(x) for f(x) = ${F.f(a)}?`.replace(/\(1([^)]*)\)/,m=>m).replace('1x','x'),val,{wrong:[val*fac(k)||1,-val||-1,F.c(a,k-1)||2,a**k],steps:[`Coefficient of x<sup>k</sup> is f<sup>(k)</sup>(0)/k!.`,`For ${F.f(a)}: the x<sup>${k}</sup> coefficient is ${FF(val)}.`,'Shortcut: substitute ax into the known series for eˣ, sin x, cos x, ln(1 + x), 1/(1 − x).'],hint:'f⁽ᵏ⁾(0)/k!, or substitute into a known series.'});}
  const n=3;const cs_=[0,1,2,3].map(j=>F.c(a,j));const T=cs=>{let s='';cs.forEach((c,j)=>{if(c===0)return;const t=(j===0?FF(Math.abs(c)):(Math.abs(c)===1?'':FF(Math.abs(c))))+(j===0?'':j===1?'x':`x<sup>${j}</sup>`);s+=s?(c<0?' − ':' + ')+t:(c<0?'−':'')+t});return s||'0'};
  return mc(`Find T<sub>3,0</sub>(x) for f(x) = ${F.f(a)}.`.replace('1x','x'),T(cs_),[T(cs_.map((c,j)=>c*fac(j))),T(cs_.map((c,j)=>j%2?-c:c)),T(cs_.map((c,j)=>j===3?0:c)),T([0,1,2,3].map(j=>F.c(a+1,j)))],[`T<sub>3,0</sub>(x) = f(0) + f′(0)x + f″(0)x²/2! + f‴(0)x³/3!.`,`= ${T(cs_)}.`],'Don\'t forget to divide by k!.');}
function g137rem(){const h=pick([.1,.2,.5]),n=R(1,4);const F=pick(['sin x','cos x']);const bound=h**(n+1)/fac(n+1);
  return nq(`Use Taylor's Theorem to bound |${F} − T<sub>${n},0</sub>(x)| at x = ${h}, using |f<sup>(${n+1})</sup>(c)| ≤ 1.`,bound,{fmt:x=>sig(x,3),tol:.01,wrong:[h**n/fac(n),h**(n+1)/fac(n),h**(n+1)],steps:[`Taylor: f(x) − T<sub>${n},0</sub>(x) = f<sup>(${n+1})</sup>(c)x<sup>${n+1}</sup>/(${n+1})! for some c between 0 and x.`,`|error| ≤ 1·${h}<sup>${n+1}</sup>/${fac(n+1)} = ${sig(bound,3)}.`],hint:'Error = f⁽ⁿ⁺¹⁾(c)/(n+1)! · (x − a)ⁿ⁺¹.'});}
const g137bigO=bank([
 {q:'x² = O(x) as x → 0',t:true,e:'|x²| ≤ 1·|x| for |x| ≤ 1.'},
 {q:'x = O(x²) as x → 0',t:false,e:'|x|/|x²| = 1/|x| → ∞: no M works.'},
 {q:'sin x = x + O(x³) as x → 0',t:true,e:'T₂,₀ = x, and Taylor gives an error of order x³.'},
 {q:'cos x = 1 − x²/2 + O(x⁴) as x → 0',t:true,e:'The next non-zero term is x⁴/24.'},
 {q:'eˣ − 1 − x = O(x³) as x → 0',t:false,e:'eˣ − 1 − x ≈ x²/2, which is only O(x²).'},
 {q:'O(x²) + O(x³) = O(x²) as x → 0',t:true,e:'Near 0, x³ is smaller than x², so the sum is dominated by O(x²).'},
 {q:'x·O(x²) = O(x³) as x → 0',t:true,e:'Big-O arithmetic.'},
 {q:'O(x⁴)/x = O(x³) as x → 0',t:true,e:'Divide the bound by |x|.'},
 {q:'Using big-O: lim<sub>x→0</sub> (sin x − x)/x³ = ?',a:'−1/6',w:['0','1/6','does not exist'],e:'sin x = x − x³/6 + O(x⁵), so (sin x − x)/x³ = −1/6 + O(x²) → −1/6.'},
]);

COURSES.push({id:'m137',name:'MATH 137',full:'Calculus 1 for Honours Mathematics',icon:'∫',color:'#3b82f6',dark:'#1d4ed8',worlds:[
 {id:'abs',name:'Ch 1.1 · Absolute Values',nodes:[
  {id:'abs',name:'Abs Inequalities',icon:'📏',gen:g137abs,L:L(['|x − a| is the distance from x to a.','|x − a| &lt; δ ⇔ a − δ &lt; x &lt; a + δ.','|x − a| ≥ δ ⇔ x ≤ a − δ or x ≥ a + δ.'],'Solve |2x − 3| &lt; 5.',['−5 &lt; 2x − 3 &lt; 5','−2 &lt; 2x &lt; 8','−1 &lt; x &lt; 4'])},
  {id:'tri',name:'Triangle Inequality',icon:'🔺',gen:g137tri,L:L(['Triangle inequality: |a + b| ≤ |a| + |b|.','Reverse: ||a| − |b|| ≤ |a − b|.','√(x²) = |x|.'],null)},
 ]},
 {id:'seq',name:'Ch 1 · Sequences',nodes:[
  {id:'rec',name:'Recursive Sequences',icon:'🔁',gen:g137rec,L:L(['aₙ₊₁ = f(aₙ): compute one term at a time.','If it converges to L, then L = f(L) (take n → ∞ on both sides).','MCT proves convergence: show bounded + monotone (often by induction).'],'a₁ = 1, aₙ₊₁ = ½aₙ + 3. Limit?',['L = ½L + 3 ⇒ L = 6.'])},
  {id:'seqlim',name:'Sequence Limits',icon:'🎯',gen:g137seqlim,L:L(['Rational in n: compare the highest powers.','∞ − ∞ with roots: multiply by the conjugate.','Squeeze: trap between two sequences with the same limit.','Two subsequences with different limits ⇒ divergence.'],'lim (3n² + 1)/(5n² − n)',['Divide by n²: (3 + 1/n²)/(5 − 1/n) → 3/5.'])},
  {id:'epsN',name:'ε–N Hunter',icon:'🏹',gen:g137epsN,L:L(['aₙ → L: ∀ε &gt; 0 ∃N such that n &gt; N ⇒ |aₙ − L| &lt; ε.','Simplify |aₙ − L|, then solve the inequality for n.'],'aₙ = (2n + 1)/(n + 1) → 2, ε = 1/10.',['|aₙ − 2| = 1/(n + 1).','1/(n + 1) &lt; 1/10 ⇔ n &gt; 9 ⇒ N = 9.'])},
  {id:'sup',name:'LUB, MCT & Subsequences',icon:'🏔️',gen:g137sup,L:L(['sup S: least upper bound (may not be in S).','LUB Property: every non-empty set bounded above has a sup in ℝ.','MCT: bounded + monotone ⇒ convergent.','Convergent ⇒ bounded, but bounded ⇏ convergent.'],null)},
 ]},
 {id:'series',name:'Ch 1 · Series',nodes:[
  {id:'geo',name:'Geometric Series',icon:'🌊',gen:g137geo,L:L(['Σ arⁿ converges ⇔ |r| &lt; 1.','Sum = (first term)/(1 − r).'],'Σ<sub>n=1</sub><sup>∞</sup> 3(1/2)ⁿ',['First term 3/2, r = 1/2.','Sum = (3/2)/(1/2) = 3.'])},
  {id:'series',name:'Divergence Test',icon:'🚫',gen:g137series,L:L(['If aₙ ↛ 0, then Σ aₙ diverges.','If aₙ → 0, the test says NOTHING (harmonic series).'],null)},
 ]},
 {id:'lim',name:'Ch 2 · Function Limits',nodes:[
  {id:'limalg',name:'0/0 Limits',icon:'🧩',gen:g137limalg,L:L(['Plug in first. 0/0 means work to do.','Factor and cancel, or multiply by a conjugate.','Cancelling is fine because x ≠ a inside a limit.'],'lim<sub>x→2</sub> (x² − 4)/(x − 2)',['(x − 2)(x + 2)/(x − 2) = x + 2 → 4.'])},
  {id:'limtrig',name:'Fundamental Trig Limit',icon:'📐',gen:g137limtrig,L:L(['lim<sub>θ→0</sub> sin θ/θ = 1.','Match the angle: sin(5x)/(5x) → 1.','(1 − cos x)/x² → 1/2.'],'lim<sub>x→0</sub> sin(3x)/(2x)',['= (3/2)·sin(3x)/(3x) → 3/2.'])},
  {id:'liminf',name:'Limits at ∞',icon:'♾️',gen:g137liminf,L:L(['Divide by the highest power in the denominator.','x → −∞ with roots: √(x²) = |x| = −x.','ln x ≪ xᵖ ≪ eˣ (Fundamental Log Limit).'],null)},
  {id:'onesided',name:'One-Sided & Infinite',icon:'↗️',gen:g137onesided,L:L(['Non-zero / tiny: the limit is ±∞; use signs to decide which.','The two-sided limit exists iff both one-sided limits exist and agree.'],'lim<sub>x→3⁻</sub> (x + 1)/(x − 3)',['Top → 4 &gt; 0, bottom → 0⁻.','⇒ −∞.'])},
  {id:'seqchar',name:'Sequential Characterization',icon:'🔗',gen:g137seqchar,L:L(['lim f(x) = L ⇔ f(xₙ) → L for EVERY xₙ → a (xₙ ≠ a).','To show DNE: find two sequences giving different limits.'],null)},
 ]},
 {id:'cont',name:'Ch 2 · Continuity & IVT',nodes:[
  {id:'contk',name:'Make It Continuous',icon:'🔧',gen:g137contk,L:L(['Continuous at a: lim f(x) = f(a).','Piecewise: match left and right limits at the break.'],null)},
  {id:'disc',name:'Discontinuity Types',icon:'💥',gen:g137disc,L:L(['Removable: limit exists, but ≠ f(a) or f(a) undefined.','Jump: one-sided limits differ.','Infinite: vertical asymptote. Oscillating: like sin(1/x).'],null)},
  {id:'ivt',name:'IVT Root Finder',icon:'🎢',gen:g137ivt,L:L(['IVT: f continuous on [a, b], α between f(a) and f(b) ⇒ ∃c with f(c) = α.','Root hunting: look for a sign change.'],null)},
  {id:'bisect',name:'Bisection',icon:'✂️',gen:g137bisect,L:L(['Halve the interval each step; keep the half where the sign changes.','After n steps the interval has length (b − a)/2ⁿ.'],null)},
  {id:'evt',name:'EVT & IVT Traps',icon:'🪤',gen:g137evt,L:L(['EVT needs continuity on a CLOSED, bounded interval.','IVT needs continuity on [a, b].'],null)},
 ]},
 {id:'deriv',name:'Ch 3 · Derivatives',nodes:[
  {id:'defn',name:'First Principles',icon:'🔬',gen:g137defn,L:L(['f′(a) = lim<sub>h→0</sub> (f(a + h) − f(a))/h.','Differentiable ⇒ continuous (not conversely: |x| at 0).'],'Use the definition for f(x) = x² at a = 3.',['((3 + h)² − 9)/h = (6h + h²)/h = 6 + h → 6.'])},
  {id:'rules',name:'Derivative Rules',icon:'⚙️',gen:g137rules,L:L(['(fg)′ = f′g + fg′. (f/g)′ = (f′g − fg′)/g².','Chain: (f(g(x)))′ = f′(g(x))·g′(x).','(eˣ)′ = eˣ, (ln x)′ = 1/x, (sin)′ = cos, (cos)′ = −sin.'],'f(x) = x²e³ˣ, f′(x)?',['Product: 2xe³ˣ + x²·3e³ˣ.'])},
  {id:'trig',name:'Trig & Inverse Trig',icon:'📐',gen:g137trig,L:L(['(tan)′ = sec², (sec)′ = sec tan, (cot)′ = −csc².','(arcsin)′ = 1/√(1 − x²), (arctan)′ = 1/(1 + x²).','(aˣ)′ = aˣ ln a.'],null)},
  {id:'ift',name:'Inverse Function Thm',icon:'🔄',gen:g137ift,L:L(['If g = f⁻¹ and f′(a) ≠ 0: g′(f(a)) = 1/f′(a).','To find g′(b): first solve f(a) = b for a.'],'f(x) = x³ + x, g = f⁻¹. g′(2)?',['f(1) = 2, f′(1) = 4.','g′(2) = 1/4.'])},
  {id:'implicit',name:'Implicit Diff',icon:'🌀',gen:g137implicit,L:L(['Differentiate both sides, y = y(x): d/dx[y²] = 2yy′.','Collect the y′ terms and solve.','Log diff for things like xˣ: take ln first.'],'x² + y² = 25 at (3, 4)',['2x + 2yy′ = 0 ⇒ y′ = −x/y = −3/4.'])},
 ]},
 {id:'approx',name:'Ch 3–4 · Approx & Related Rates',nodes:[
  {id:'lin',name:'Linear Approximation',icon:'📏',gen:g137lin,L:L(['Lₐ(x) = f(a) + f′(a)(x − a).','Pick a "nice" a near x (perfect square, 0, …).'],'Estimate √26',['f = √x, a = 25: L = 5 + (x − 25)/10.','L(26) = 5.1.'])},
  {id:'linerr',name:'Approximation Error',icon:'🎯',gen:g137linerr,L:L(['|f(x) − Lₐ(x)| ≤ (M/2)(x − a)² if |f″| ≤ M between a and x.','Concave up ⇒ L underestimates. Concave down ⇒ overestimates.'],null)},
  {id:'newton',name:'Newton\'s Method',icon:'🚀',gen:g137newton,L:L(['xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ).','Can fail if f′(xₙ) ≈ 0 or with a bad starting point.'],'f = x² − 2, x₁ = 1',['x₂ = 1 − (−1)/2 = 1.5.'])},
  {id:'related',name:'Related Rates',icon:'🎈',gen:g137related,L:L(['Write an equation relating the quantities (geometry).','Differentiate with respect to t (chain rule).','Plug in the numbers AFTER differentiating.'],null)},
 ]},
 {id:'mvt',name:'Ch 4 · Extrema & MVT',nodes:[
  {id:'crit',name:'Curve Analysis',icon:'📈',gen:g137crit,L:L(['Critical points: f′ = 0 or f′ undefined.','First Derivative Test: + → − is a max, − → + is a min.','Inflection: f″ changes sign.'],null)},
  {id:'absext',name:'Absolute Extrema',icon:'⛰️',gen:g137absext,L:L(['Closed interval method: evaluate f at critical points AND endpoints; biggest and smallest win.'],null)},
  {id:'mvtc',name:'Find the MVT c',icon:'🎯',gen:g137mvt,L:L(['MVT: ∃c ∈ (a, b) with f′(c) = (f(b) − f(a))/(b − a).','Needs continuous on [a, b], differentiable on (a, b).'],null)},
  {id:'mvtb',name:'MVT Consequences',icon:'🧠',gen:g137mvtb,L:L(['f′ = 0 ⇒ constant. f′ = g′ ⇒ f = g + C.','f′ &gt; 0 ⇒ increasing.','Second Derivative Test: f′(c) = 0, f″(c) &gt; 0 ⇒ min.'],null)},
 ]},
 {id:'taylor',name:'Ch 4 · L\'Hôpital & Taylor',nodes:[
  {id:'lhop',name:'L\'Hôpital',icon:'🏥',gen:g137lhop,L:L(['For 0/0 or ∞/∞: lim f/g = lim f′/g′ (if the right side exists).','0·∞: rewrite as a quotient. 1<sup>∞</sup>, 0⁰, ∞⁰: take ln first.','Always check the form before using it!'],null)},
  {id:'taylor',name:'Taylor Polynomials',icon:'🧵',gen:g137taylor,L:L(['T<sub>n,a</sub>(x) = Σ f<sup>(k)</sup>(a)(x − a)ᵏ/k!.','Know: eˣ = Σ xᵏ/k!, sin, cos, ln(1 + x), 1/(1 − x).','Substitute: e<sup>2x</sup> = Σ (2x)ᵏ/k!.'],null)},
  {id:'rem',name:'Taylor\'s Theorem',icon:'📉',gen:g137rem,L:L(['f(x) − T<sub>n,a</sub>(x) = f<sup>(n+1)</sup>(c)(x − a)<sup>n+1</sup>/(n + 1)! for some c between a and x.','Bound |f<sup>(n+1)</sup>| by M to bound the error.'],null)},
  {id:'bigO',name:'Big-O',icon:'🅾️',gen:g137bigO,L:L(['f = O(g) as x → a: |f| ≤ M|g| near a.','sin x = x + O(x³), cos x = 1 − x²/2 + O(x⁴), eˣ = 1 + x + O(x²).','Use big-O to compute limits fast.'],null)},
 ]},
]});
