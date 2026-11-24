// ===== Extra question templates for topics that had one template, plus CHEM gap topics =====
const VAR={};const addV=(k,...gs)=>{(VAR[k]=VAR[k]||[]).push(...gs)};
const ord=n=>n+(n%10===1&&n%100!==11?'st':n%10===2&&n%100!==12?'nd':n%10===3&&n%100!==13?'rd':'th');

// ---------- MATH 135 ----------
addV('m135_divalg',
 ()=>{const b=R(4,13),r=R(1,b-1),c=R(2,15);const ans=mod(r+c,b);return mc(`When n is divided by ${b}, the remainder is ${r}. What is the remainder when n + ${c} is divided by ${b}?`,ans,[r+c,mod(r-c,b),c%b,(ans+1)%b,mod(ans-1,b)],[`n = ${b}q + ${r}, so n + ${c} = ${b}q + ${r+c}.`,`${r+c} = ${Math.floor((r+c)/b)}·${b} + ${ans}, so the remainder is ${ans}.`],'Write n = bq + r and add.')},
 ()=>{const b=R(4,11),r=R(1,b-1),k=R(2,6);const ans=mod(k*r,b);return mc(`When n is divided by ${b}, the remainder is ${r}. What is the remainder when ${k}n is divided by ${b}?`,ans,[k*r,r,mod(k+r,b),(ans+1)%b,mod(ans+2,b)],[`${k}n = ${b}(${k}q) + ${k*r}.`,`${k*r} leaves remainder ${ans} on division by ${b}.`],'Multiply n = bq + r by the constant, then reduce.')},
 bank([
  ()=>tf('In the Division Algorithm a = qb + r with b &gt; 0, the remainder r can be negative.',false,'The DA requires 0 ≤ r &lt; b. For negative a, round the quotient down instead.'),
  ()=>tf('For a given a and b &gt; 0, the quotient q and remainder r in the Division Algorithm are unique.',true,'Uniqueness is part of the DA statement.'),
  ()=>tf('If a = qb + r with 0 ≤ r &lt; b and r = 0, then b | a.',true,'r = 0 gives a = qb, which is the definition of b | a.'),
  ()=>tf('Writing −17 = (−3)(5) − 2 is a valid Division Algorithm statement.',false,'The remainder −2 is negative. The DA form is −17 = (−4)(5) + 3.')]));

addV('m135_gcd',
 ()=>{const d=pick([2,3,4,5,6,7,9,12]);let u,v;do{u=R(2,15);v=R(2,15)}while(gcd(u,v)!==1||u===v);const a=d*u,b=d*v,k=R(2,7);return mc(`gcd(${a}, ${b}) = ${d}. What is gcd(${a}, ${b} − ${k}·${a})?`,d,[d*k,1,Math.abs(b-k*a),a,d+k],[`By GCD WR, gcd(a, b − ka) = gcd(a, b), because subtracting a multiple of a doesn't change common divisors.`,`So the answer is ${d}.`],'Subtracting a multiple of one number from the other never changes the gcd.')},
 ()=>{let u,v;do{u=R(2,20);v=R(2,20)}while(gcd(u,v)!==1||u===v);const k=R(2,12);return mc(`gcd(${u}, ${v}) = 1. What is gcd(${k*u}, ${k*v})?`,k,[1,k*k,k*u,u*v,k+1],[`A common factor k scales the gcd: gcd(ka, kb) = k·gcd(a, b) = ${k}.`],'Pull out the common factor.')},
 bank([
  ()=>tf('If 4x + 6y = 2 has an integer solution, then gcd(4, 6) = 2.',true,'2 is a common divisor and a positive combination of 4 and 6, so GCD CT gives gcd = 2.'),
  ()=>tf('If ax + by = 6 for some integers x, y, then gcd(a, b) = 6.',false,'Only gcd(a, b) | 6 follows. For example 2(1) + 4(1) = 6 but gcd(2, 4) = 2.'),
  ()=>tf('gcd(a, 0) = |a| for any non-zero integer a.',true,'Every integer divides 0, so the largest common divisor is the largest divisor of a, which is |a|.'),
  ()=>tf('If d = gcd(a, b) ≠ 0, then gcd(a/d, b/d) = 1.',true,'This is DB GCD (Division by the GCD).'),
  ()=>tf('If d | a and d | b, then d = gcd(a, b).',false,'d is a common divisor, but maybe not the greatest: 2 | 12 and 2 | 18, yet gcd = 6.')]));

addV('m135_eea',
 ()=>{let a,b;do{a=R(11,60);b=R(5,40)}while(gcd(a,b)!==1||a===b);const[,x,y]=egcd(a,b);const ans=mod(x,b);return mc(`One solution of ${a}x + ${b}y = 1 is x = ${x}, y = ${y}. What is ${C(a)}<sup>−1</sup> in ${Z(b)}?`,C(ans),[C(mod(y,b)),C(mod(-x,b)),C(Math.abs(y)%b||1),C(mod(x+1,b))],[`Reduce ${a}x + ${b}y = 1 mod ${b}: ${a}·${x} ≡ 1 (mod ${b}).`,`So ${C(a)}<sup>−1</sup> = ${C(mod(x,b))}.`],'Reduce the Bézout equation mod the second number.')},
 ()=>{let a,b,d;do{d=pick([1,1,2,3]);a=d*R(3,15);b=d*R(3,15)}while(gcd(a,b)!==d||a===b);const[,x,y]=egcd(a,b);const s=b/d,t=a/d;return mc(`(x, y) = (${x}, ${y}) solves ${a}x + ${b}y = ${d}. Which is another solution?`,`(${x+s}, ${y-t})`,[`(${x+b}, ${y+a})`,`(${x+s}, ${y+t})`,`(${x+1}, ${y-1})`,`(${x-t}, ${y+s})`],[`Solutions step by b/d = ${s} in x and −a/d = −${t} in y.`,`(${x} + ${s}, ${y} − ${t}) = (${x+s}, ${y-t}). Check: ${a}(${x+s}) + ${b}(${y-t}) = ${a*(x+s)+b*(y-t)}.`],'x goes up by b/d while y goes down by a/d.')});

addV('m135_lde',
 ()=>{const a=pick([4,6,8,9,10,12,14,15,21]),b=pick([6,9,10,14,15,18,21,24,35]);if(a===b)return null;const d=gcd(a,b);const c=R(5,60);const ok=c%d===0;return tf(`${a}x + ${b}y = ${c} has an integer solution.`,ok,`gcd(${a}, ${b}) = ${d}, and ${d} ${ok?'divides':'does not divide'} ${c}. By LDET 1 it is ${ok?'solvable':'not solvable'}.`,'Check whether gcd(a, b) divides c.')},
 ()=>{const d=pick([1,2,3]);let a,b;do{a=d*R(2,9);b=d*R(2,9)}while(gcd(a,b)!==d||a===b);const[,x0,y0]=egcd(a,b);const k=R(2,5);const c=d*k;const X=x0*k,Y=y0*k;const s=b/d,t=a/d;return mc(`(${X}, ${Y}) is one solution of ${a}x + ${b}y = ${c}. What is the general solution (n ∈ ℤ)?`,`x = ${X} + ${s}n, y = ${Y} − ${t}n`,[`x = ${X} + ${b}n, y = ${Y} − ${a}n`,`x = ${X} + ${s}n, y = ${Y} + ${t}n`,`x = ${X} + ${t}n, y = ${Y} − ${s}n`],[`d = gcd(${a}, ${b}) = ${d}. LDET 2: x = x₀ + (b/d)n, y = y₀ − (a/d)n.`,`b/d = ${s}, a/d = ${t}.`],'Use b/d and a/d, with opposite signs.')});

addV('m135_lct',
 ()=>{const m=pick([6,8,9,10,12,14,15,16,18,20]);const a=R(2,m-1);const c=R(1,m-1);const d=gcd(a,m);const n=c%d===0?d:0;return mc(`How many solutions does ${a}x ≡ ${c} ${MOD(m)} have, counted mod ${m}?`,n,[n===0?d:0,1,m/d,m].filter(v=>v!==n),[`d = gcd(${a}, ${m}) = ${d}.`,c%d===0?`${d} | ${c}, so there are d = ${d} solution${d>1?'s':''} mod ${m}.`:`${d} ∤ ${c}, so there are no solutions.`],'Solvable iff gcd(a, m) | c; then there are gcd(a, m) classes mod m.')},
 ()=>{const m=pick([7,9,11,13]);const a=R(2,m-1),x=R(1,m-1);const c=mod(a*x,m);return tf(`x = ${x} is a solution of ${a}x ≡ ${c} ${MOD(m)}.`,true,`${a}·${x} = ${a*x} = ${Math.floor(a*x/m)}·${m} + ${c}.`)});

addV('m135_mat',
 ()=>{const m=pick([8,9,10,12,14,15,16,18,20]);let n=0;for(let a=1;a<m;a++)if(gcd(a,m)===1)n++;return mc(`How many classes in ${Z(m)} have a multiplicative inverse?`,n,[m-1,m/2,n+1,n-1,m],[`[a] is invertible exactly when gcd(a, ${m}) = 1.`,`Counting a = 1 … ${m-1} coprime to ${m} gives ${n}.`],'INV ℤₘ: [a]⁻¹ exists ⇔ gcd(a, m) = 1.')},
 ()=>{const m=pick([6,8,9,10,12,14,15]);const a=R(2,m-1);const g=gcd(a,m);return tf(`${C(a)} has an inverse in ${Z(m)}.`,g===1,`gcd(${a}, ${m}) = ${g}${g===1?', so it is invertible.':', which is not 1, so it has no inverse.'}`)});

addV('m135_sys',
 ()=>{const p=pick([5,7,11]);const a1=R(1,p-1),b1=R(1,p-1),a2=R(1,p-1),b2=R(1,p-1);const x=R(0,p-1),y=R(0,p-1);const c1=mod(a1*x+b1*y,p),c2=mod(a2*x+b2*y,p);const tx=Math.random()<.5?x:mod(x+R(1,p-1),p);const ok=mod(a1*tx+b1*y,p)===c1&&mod(a2*tx+b2*y,p)===c2;
  return tf(`In ${Z(p)}: is (x, y) = (${C(tx)}, ${C(y)}) a solution of ${C(a1)}x + ${C(b1)}y = ${C(c1)} and ${C(a2)}x + ${C(b2)}y = ${C(c2)}?`,ok,`First: ${a1}·${tx} + ${b1}·${y} = ${a1*tx+b1*y} ≡ ${mod(a1*tx+b1*y,p)}. Second: ${a2}·${tx} + ${b2}·${y} = ${a2*tx+b2*y} ≡ ${mod(a2*tx+b2*y,p)}.`,'Substitute into both equations and reduce.')});

const crtSolve=(rs,ms)=>{const M=ms.reduce((a,b)=>a*b,1);for(let n=0;n<M;n++)if(rs.every((r,i)=>n%ms[i]===r))return n;return null};
addV('m135_crt2',
 ()=>{const [m1,m2]=pick([[3,5],[4,7],[5,6],[5,7],[7,9],[8,9],[4,9],[7,11]]);const r1=R(1,m1-1),r2=R(1,m2-1);const n=crtSolve([r1,r2],[m1,m2]);return mc(`A number leaves remainder ${r1} when divided by ${m1} and remainder ${r2} when divided by ${m2}. What is the smallest positive such number?`,n,[n+m1,n+m2,n+m1*m2,r1*r2,mod(n-m1,m1*m2)||m1*m2],[`Solve n ≡ ${r1} ${MOD(m1)}, n ≡ ${r2} ${MOD(m2)}.`,`CRT gives n ≡ ${n} ${MOD(m1*m2)}, so the smallest positive is ${n||m1*m2}.`],'Translate each sentence into a congruence, then use CRT.')},
 ()=>{const [m1,m2]=pick([[4,6],[6,9],[6,10],[4,10],[9,12]]);const g=gcd(m1,m2);const r1=R(0,m1-1),r2=R(0,m2-1);const ok=mod(r1-r2,g)===0;return tf(`The system n ≡ ${r1} ${MOD(m1)}, n ≡ ${r2} ${MOD(m2)} has a solution.`,ok,`The moduli aren't coprime: gcd(${m1}, ${m2}) = ${g}. A solution needs ${r1} ≡ ${r2} ${MOD(g)}, which is ${ok?'true':'false'}.`,'CRT needs coprime moduli. Otherwise, compare the remainders mod the gcd.')},
 ()=>{const [m1,m2]=pick([[3,5],[4,5],[5,7],[3,7]]);const M=m1*m2,K=R(4,9);return mc(`n ≡ a ${MOD(m1)} and n ≡ b ${MOD(m2)} (fixed a, b). How many solutions are there with 0 ≤ n &lt; ${M*K}?`,K,[1,M,m1+m2,K*m1],[`CRT gives one class mod ${M}.`,`0 … ${M*K-1} contains ${K} full blocks of ${M}, so ${K} solutions.`],'One solution per block of m₁m₂.')});

addV('m135_crt3',
 ()=>{const ms=pick([[3,4,5],[2,3,5],[3,5,7],[2,5,7]]);const rs=ms.map(m=>R(0,m-1));const n=crtSolve(rs,ms);const M=ms[0]*ms[1]*ms[2];return mc(`Eggs in a basket: counted in groups of ${ms[0]}, ${ms[1]} and ${ms[2]}, there are ${rs[0]}, ${rs[1]} and ${rs[2]} left over. What is the smallest possible number of eggs (more than 0)?`,n||M,[(n||M)+M,(n||M)+ms[0],rs.reduce((a,b)=>a+b,0)||1,M-1],[`n ≡ ${rs[0]} ${MOD(ms[0])}, n ≡ ${rs[1]} ${MOD(ms[1])}, n ≡ ${rs[2]} ${MOD(ms[2])}.`,`Combine two at a time: n ≡ ${n} ${MOD(M)}.`],'Write three congruences, then combine two at a time.')},
 bank([
  ()=>tf('3, 4 and 6 are pairwise coprime, so CRT gives a unique solution mod 72.',false,'gcd(4, 6) = 2 and gcd(3, 6) = 3, so they are not pairwise coprime.'),
  ()=>tf('With pairwise coprime moduli 3, 5 and 7, a system of three congruences has a unique solution mod 105.',true,'CRT: unique mod 3·5·7 = 105.'),
  ()=>tf('Pairwise coprime means gcd(m₁, m₂, m₃) = 1.',false,'Every pair must be coprime. 2, 4 and 3 have overall gcd 1 but gcd(2, 4) = 2.')]));

// ---------- MATH 137 ----------
addV('m137_bisect',
 ()=>{const L=pick([1,2,4]),n=R(3,8);return mc(`Bisection starts on an interval of length ${L}. How long is the interval after ${n} steps?`,`${L}/2<sup>${n}</sup> = ${sig(L/2**n,4)}`,[`${L}/${n} = ${sig(L/n,4)}`,`${L}/2<sup>${n-1}</sup> = ${sig(L/2**(n-1),4)}`,`${L}/2<sup>${n+1}</sup> = ${sig(L/2**(n+1),4)}`],[`Each step halves the interval: length (b − a)/2ⁿ.`],'Each step halves the length.')},
 ()=>{const L=pick([1,2]),e=pick([.01,.001,.05,.005]);let n=0;while(L/2**n>=e)n++;return mc(`Starting from an interval of length ${L}, how many bisection steps guarantee an interval shorter than ${e}?`,n,[n-1,n+1,Math.ceil(L/e),n+2],[`Need ${L}/2ⁿ &lt; ${e}, i.e. 2ⁿ &gt; ${sig(L/e,4)}.`,`2<sup>${n-1}</sup> = ${2**(n-1)} is not enough; 2<sup>${n}</sup> = ${2**n} is. So n = ${n}.`],'Solve (b − a)/2ⁿ &lt; ε for n.')},
 bank([
  ()=>mc('What does the bisection method need to start?','f continuous on [a, b] with f(a) and f(b) of opposite signs',['f differentiable with f′(a) ≠ 0','f(a) = f(b)','An initial guess close to the root'],['Bisection is the IVT turned into an algorithm: it needs continuity and a sign change.']),
  ()=>tf('Bisection always converges to a root, given a valid starting interval.',true,'The interval halves every step and always contains a sign change, so by the IVT it closes in on a root.'),
  ()=>tf('Bisection converges faster than Newton\'s Method near a simple root.',false,'Bisection gains one binary digit per step; Newton roughly doubles the correct digits each step.')]));

addV('m137_rem',
 ()=>{const h=pick([.1,.2,.5]),n=R(1,4);const b=3*h**(n+1)/fac(n+1);return nq(`Bound |e<sup>x</sup> − T<sub>${n},0</sub>(x)| at x = ${h}, using e<sup>c</sup> ≤ 3 for 0 ≤ c ≤ ${h}.`,b,{fmt:x=>sig(x,3),tol:.01,wrong:[h**(n+1)/fac(n+1),3*h**n/fac(n),3*h**(n+1)],steps:[`R = e<sup>c</sup>x<sup>${n+1}</sup>/(${n+1})! for some c between 0 and ${h}.`,`|R| ≤ 3·${h}<sup>${n+1}</sup>/${fac(n+1)} = ${sig(b,3)}.`],hint:'Every derivative of eˣ is eˣ.'})},
 ()=>{const x=pick([.5,.2,1]),tol=pick([1e-3,1e-4]);let n=0;while(x**(n+1)/fac(n+1)>=tol)n++;return mc(`Using |f<sup>(n+1)</sup>| ≤ 1, what is the smallest degree n that guarantees |sin(${x}) − T<sub>n,0</sub>(${x})| &lt; ${tol}?`,n,[n-1,n+1,n+2].filter(v=>v>=0),[`Need ${x}<sup>n+1</sup>/(n + 1)! &lt; ${tol}.`,`n = ${n}: ${sig(x**(n+1)/fac(n+1),3)} &lt; ${tol}. n = ${n-1} gives ${n>0?sig(x**n/fac(n),3):'—'}.`],'Increase n until the bound drops below the tolerance.')},
 bank([
  ()=>mc('In Taylor\'s Theorem, the remainder Rₙ,ₐ(x) uses which derivative?','The (n + 1)th, evaluated at some c between a and x',['The nth, evaluated at a','The (n + 1)th, evaluated at a','The nth, evaluated at x'],['Rₙ(x) = f⁽ⁿ⁺¹⁾(c)(x − a)ⁿ⁺¹/(n + 1)!.']),
  ()=>tf('The error bound from Taylor\'s Theorem gets smaller as x moves away from a.',false,'|x − a|ⁿ⁺¹ grows as x moves away, so the bound gets larger.')]));

// ---------- CHEM gaps ----------
addV('chem_debroglie',
 ()=>{const dv=pick([1e3,5e3,1e4,1e5,1e6]);const m=9.109e-31,h=6.626e-34;const dx=h/(4*Math.PI*m*dv);return nq(`An electron's speed is known to within Δv = ${sig(dv,2)} m/s. What is the minimum uncertainty in its position? (m = 9.109 × 10⁻³¹ kg)`,dx,{unit:'m',tol:.02,wrong:[h/(m*dv),h/(2*Math.PI*m*dv),dx*4],steps:[`HUP: Δx ≥ h/(4πmΔv).`,`= 6.626 × 10⁻³⁴/(4π × 9.109 × 10⁻³¹ × ${sig(dv,2)}) = ${sig(dx,3)} m.`],hint:'Δx·Δp ≥ h/(4π), and Δp = mΔv.'})},
 bank([
  ()=>tf('The uncertainty principle only applies because our measuring instruments are imperfect.',false,'It is a property of nature: position and momentum cannot both be sharply defined at once.'),
  ()=>mc('Why can\'t an electron move in a fixed circular orbit, as in the Bohr model?','Its position and momentum cannot both be known exactly (HUP)',['It would fall into the nucleus immediately','Electrons have no mass','Photons knock it out of orbit'],['A fixed orbit needs exact position and momentum at every instant, which the HUP forbids.'])]));

const LAT=[['LiF','Li⁺','F⁻',1,204],['NaCl','Na⁺','Cl⁻',1,278],['ZnO','Zn²⁺','O²⁻',4,214],['KBr','K⁺','Br⁻',1,334],['CsI','Cs⁺','I⁻',1,387],['NaF','Na⁺','F⁻',1,235]];
addV('chem_formal',
 ()=>{let A,B;do{A=pick(LAT);B=pick(LAT)}while(A===B||A[3]/A[4]===B[3]/B[4]);const big=A[3]/A[4]>B[3]/B[4]?A:B,sm=big===A?B:A;
  return mc(`Which has the larger lattice energy (magnitude), ${A[0]} or ${B[0]}?`,big[0],[sm[0],'They are equal','It can\'t be predicted from charge and size'],[`Lattice energy ∝ |q₁q₂|/(r₊ + r₋).`,`${big[0]}: ${big[3]}/${big[4]} pm vs ${sm[0]}: ${sm[3]}/${sm[4]} pm.`,big[3]!==sm[3]?'Charge dominates: doubling both charges multiplies |q₁q₂| by 4.':'Same charges, so the smaller ions win.'],'Bigger charges and smaller ions mean a larger lattice energy.')},
 bank([
  ()=>tf('ZnO has a much larger lattice energy than NaCl mainly because of the ion charges.',true,'|q₁q₂| is 4 for Zn²⁺/O²⁻ versus 1 for Na⁺/Cl⁻ (−4059 vs −781 kJ in Module 4).'),
  ()=>tf('Lattice energy increases as the ions get larger.',false,'Larger ions are farther apart, so the attraction, and the lattice energy, decreases.')]));

addV('chem_kmt',
 ()=>{const n=pick([1,1,2]),T=pick([200,250,300,400]),V=pick([.5,1,2]),Z0=pick([.85,.9,.95,1.05,1.1,1.2]);const P=Z0*n*8.3145*T/V;const Z=P*V/(n*8.3145*T);return nq(`A real gas sample has n = ${n} mol, T = ${T} K, V = ${V} L and P = ${sig(P,4)} kPa. What is its compressibility factor Z = PV/(nRT)?`,Z,{tol:.01,s:3,wrong:[1,1/Z,Z*1.2],steps:[`nRT = ${n} × 8.3145 × ${T} = ${sig(n*8.3145*T,4)} L·kPa.`,`Z = ${sig(P,4)} × ${V}/${sig(n*8.3145*T,4)} = ${sig(Z,3)}.`,Z<1?'Z &lt; 1: attractions dominate.':'Z &gt; 1: molecular volume dominates.'],hint:'Z = 1 for an ideal gas.'})},
 bank([
  ()=>mc('A gas at very high pressure has Z &gt; 1. Which van der Waals correction explains this?','b, the volume taken up by the molecules themselves',['a, the attractions between molecules','R, the gas constant','T, because the gas is cold'],['At high pressure the molecules\' own volume is a big fraction of V, so the gas is harder to compress (Z &gt; 1).']),
  ()=>mc('Under which conditions does a real gas behave most ideally?','High temperature and low pressure',['Low temperature and high pressure','Low temperature and low pressure','High temperature and high pressure'],['Fast, far-apart molecules make attractions and molecular volume negligible.']),
  ()=>tf('In the van der Waals equation, the constant a corrects for attractions between molecules.',true,'(P + an²/V²): attractions lower the measured pressure, so a adds it back.')]));

// New topic: Bond strength (Module 4, section 4.5). Values from the Module 4 table (kJ/mol).
const BE={'H−H':436,'C−C':347,'C=C':611,'C≡C':837,'N−N':163,'N=N':418,'N≡N':946,'H−C':414,'H−N':389,'H−O':464,'H−F':565,'H−Cl':431,'H−Br':364,'H−I':297,'C−O':360,'C=O':736,'O−O':142,'O=O':498,'F−F':159,'Cl−Cl':243,'Br−Br':193,'I−I':151,'C−N':305,'C≡N':891};
const BL={'C−C':154,'C=C':134,'C≡C':120,'N−N':145,'N=N':123,'N≡N':110,'H−F':92,'H−Cl':127,'H−Br':141,'H−I':161,'F−F':143,'Cl−Cl':199,'Br−Br':228,'I−I':266};
const RX=[{eq:'H₂ + Cl₂ → 2 HCl',br:[['H−H',1],['Cl−Cl',1]],fm:[['H−Cl',2]]},{eq:'H₂ + Br₂ → 2 HBr',br:[['H−H',1],['Br−Br',1]],fm:[['H−Br',2]]},{eq:'H₂ + F₂ → 2 HF',br:[['H−H',1],['F−F',1]],fm:[['H−F',2]]},{eq:'N₂ + 3 H₂ → 2 NH₃',br:[['N≡N',1],['H−H',3]],fm:[['H−N',6]]},{eq:'2 H₂ + O₂ → 2 H₂O',br:[['H−H',2],['O=O',1]],fm:[['H−O',4]]},{eq:'C₂H₄ + H₂ → C₂H₆',br:[['C=C',1],['H−H',1]],fm:[['C−C',1],['H−C',2]]}];
function gChemBond(){const v=Math.random();
 if(v<.4){const r=pick(RX);const sb=r.br.reduce((s,[b,n])=>s+n*BE[b],0),sf=r.fm.reduce((s,[b,n])=>s+n*BE[b],0),dH=sb-sf;const fmt=a=>a.map(([b,n])=>`${n} × ${b} (${BE[b]})`).join(' + ');
  return nq(`Estimate ΔH for ${r.eq} using average bond energies (kJ/mol, Module 4 table).`,dH,{unit:'kJ',int:true,tol:.005,abs:2,wrong:[sf-sb,-sb-sf,sb],steps:[`ΔH ≈ Σ(bonds broken) − Σ(bonds formed).`,`Broken: ${fmt(r.br)} = ${sb} kJ.`,`Formed: ${fmt(r.fm)} = ${sf} kJ.`,`ΔH ≈ ${sb} − ${sf} = ${dH} kJ ${dH<0?'(exothermic)':'(endothermic)'}.`],hint:'Breaking bonds costs energy; forming bonds releases it.'})}
 if(v<.7){const fam=pick([['C−C','C=C','C≡C'],['N−N','N=N','N≡N']]);const [a,b]=shuffle(fam).slice(0,2);const s=BE[a]>BE[b]?a:b;return mc(`Which bond is stronger and shorter: ${a} or ${b}?`,s,[s===a?b:a,'They are equal in strength'],[`Higher bond order means a shorter, stronger bond.`,`${a}: ${BE[a]} kJ/mol, ${BL[a]} pm; ${b}: ${BE[b]} kJ/mol, ${BL[b]} pm.`],'Compare bond orders.')}
 if(v<.9){const fam=pick([['H−F','H−Cl','H−Br','H−I'],['F−F','Cl−Cl','Br−Br','I−I']]);const [a,b]=shuffle(fam.filter(x=>x!=='F−F')).slice(0,2);const s=BE[a]>BE[b]?a:b;return mc(`Which bond is stronger: ${a} or ${b}?`,s,[s===a?b:a,'They are equal in strength'],[`Smaller atoms form shorter, stronger bonds.`,`${a}: ${BL[a]} pm, ${BE[a]} kJ/mol; ${b}: ${BL[b]} pm, ${BE[b]} kJ/mol.`],'Compare atom sizes down the group.')}
 return pick([
  ()=>tf('A C=C double bond is twice as strong as a C−C single bond.',false,'C=C is 611 kJ/mol versus 347 for C−C: stronger, but less than double (the π bond is weaker than the σ bond).'),
  ()=>tf('F−F (159 kJ/mol) is weaker than Cl−Cl (243 kJ/mol), even though F is smaller.',true,'The exception: lone pairs on the two small F atoms are crowded together and repel, weakening the bond.'),
  ()=>tf('Bond dissociation energy is the energy released when a bond forms.',false,'It is the energy required to break a particular bond; the same amount is released when it forms.')])()}
COURSES.find(c=>c.id==='chem').worlds.find(w=>w.id==='m4').nodes.push({id:'bond',name:'Bond Strength',icon:'⚛',gen:gChemBond});

// Wire the extra templates in: each draw picks the original or one of the new templates evenly.

// ---------- Round 2 variety: RSA, systems, geometric series, circular motion ----------
const RSAP=[5,7,11,13,17,19,23];
const rsaKeys=()=>{let p,q;do{p=pick(RSAP);q=pick(RSAP)}while(p===q);const n=p*q,ph=(p-1)*(q-1);let e,t=0;do{e=R(3,ph-1);t++}while(gcd(e,ph)!==1||(inv(e,ph)===e&&t<60));return{p,q,n,ph,e,d:inv(e,ph)}};
addV('m135_rsa',
 ()=>{const K=rsaKeys();const M=R(2,K.n-1),Cc=powmod(M,K.e,K.n);
  return nq(`RSA with public key (e, n) = (${K.e}, ${K.n}) and private key d = ${K.d}. Decrypt C = ${Cc}: find R ≡ C<sup>d</sup> (mod n), 0 ≤ R &lt; n.`,M,{int:true,nonneg:true,wrong:[powmod(Cc,K.e,K.n),mod(Cc*K.d,K.n),powmod(Cc,K.d,K.ph)],steps:[`R ≡ ${Cc}<sup>${K.d}</sup> (mod ${K.n}).`,`Use repeated squaring (or split mod ${K.p} and ${K.q}, reduce the exponent with FℓT, then CRT).`,`R = ${M}.`,`Check: ${M}<sup>${K.e}</sup> ≡ ${Cc} (mod ${K.n}) ✓`],hint:'Decrypt with d, not e, and reduce mod n.'})},
 ()=>{const K=rsaKeys();const good=K.e;const bad=[];for(let x=2;x<K.ph&&bad.length<6;x++)if(gcd(x,K.ph)!==1)bad.push(x);
  return mc(`RSA with p = ${K.p} and q = ${K.q}. Which of these is a valid choice of e?`,String(good),shuffle(bad).slice(0,3).map(String),[`φ = (p − 1)(q − 1) = ${K.p-1}·${K.q-1} = ${K.ph}.`,`e needs gcd(e, ${K.ph}) = 1 so that d = e⁻¹ exists mod ${K.ph}.`,`gcd(${good}, ${K.ph}) = 1, so e = ${good} works. Each other option shares a factor with ${K.ph}.`],'Compute (p − 1)(q − 1) and check which option is coprime to it.')},
 ()=>{const K=rsaKeys();const [a,b]=[Math.min(K.p,K.q),Math.max(K.p,K.q)];const fmt=(x,y)=>`p = ${x}, q = ${y}`;
  const wrong=[];for(const[x,y]of[[a+2,b-2],[a-2,b+2],[a+1,b+1],[a,b+2]])if(x>1&&y>x)wrong.push(fmt(x,y));
  return mc(`An RSA modulus is n = ${K.n}, and you learn that (p − 1)(q − 1) = ${K.ph}. Find the primes p &lt; q.`,fmt(a,b),wrong,[`(p − 1)(q − 1) = pq − (p + q) + 1, so p + q = n − φ + 1 = ${K.n} − ${K.ph} + 1 = ${a+b}.`,`p and q are the roots of t² − ${a+b}t + ${K.n} = 0.`,`So p = ${a}, q = ${b}. Check: ${a}·${b} = ${K.n} ✓`,`This is why φ must stay secret: knowing it lets anyone factor n.`],'Expand (p − 1)(q − 1) and use pq = n.')},
 ()=>{const K=rsaKeys();let e=2;while(gcd(e,K.ph)!==1)e++;
  return nq(`RSA with p = ${K.p}, q = ${K.q}. What is the smallest e &gt; 1 that can be used?`,e,{int:true,wrong:[2,e+1,e+2,3],steps:[`φ = ${K.ph}. It's even, so e = 2 never works.`,`Test e = 3, 4, …: the first with gcd(e, ${K.ph}) = 1 is e = ${e}.`],hint:'e must be coprime to (p − 1)(q − 1).'})});
addV('m135_sys',
 ()=>{const p=pick([5,7,11]);const a=R(1,p-1),b=R(1,p-1),k=R(2,p-1),c=R(0,p-1);const cons=Math.random()<.5;const c2=cons?mod(k*c,p):mod(k*c+R(1,p-1),p);
  const ans=cons?`Exactly ${p} solutions`:'No solutions';
  return mc(`How many solutions (x, y) in ℤ<sub>${p}</sub> does this system have?<div class="sys">${C(a)}x + ${C(b)}y = ${C(c)}<br>${C(mod(k*a,p))}x + ${C(mod(k*b,p))}y = ${C(c2)}</div>`,ans,['Exactly one solution',cons?'No solutions':`Exactly ${p} solutions`,`Exactly ${p*p} solutions`],[`The second left side is ${k} × the first: ${k}·${a} ≡ ${mod(k*a,p)}, ${k}·${b} ≡ ${mod(k*b,p)} (mod ${p}). The determinant is 0.`,cons?`The right sides match too (${k}·${c} ≡ ${c2}), so it's really one equation: each of the ${p} choices of y gives exactly one x.`:`But ${k}·${c} ≡ ${mod(k*c,p)} ≢ ${c2}, so the equations contradict each other.`],'Check whether one equation is a multiple of the other.')});
addV('m137_geo',
 ()=>{const d=R(1,9),e=R(0,9);if(d===e)return null;const N=10*d+e;const f=frac(N,99);
  return mc(`Write the repeating decimal 0.${d}${e}${d}${e}${d}${e}… as a fraction in lowest terms.`,`${f.n}/${f.d}`,[`${N}/100`,`${N}/990`,`${d}${e}/9`].filter(w=>w!==`${f.n}/${f.d}`),[`0.${d}${e}${d}${e}… = ${N}/100 + ${N}/100² + … , geometric with a = ${N}/100 and r = 1/100.`,`Sum = (${N}/100)/(1 − 1/100) = ${N}/99${f.d!==99?` = ${f.n}/${f.d}`:''}.`],'Each repeat block is 1/100 of the one before.')},
 ()=>{const c=R(-4,4),k=pick([2,3,4,5]);const fx=c===0?'x':c>0?`(x − ${c})`:`(x + ${-c})`;
  const M_=x=>minus(String(x)),ax=c===0?'|x|':c>0?`|x − ${c}|`:`|x + ${-c}|`;return mc(`For which x does Σ<sub>n=0</sub><sup>∞</sup> ${fx}<sup>n</sup>/${k}<sup>n</sup> converge?`,`${M_(c-k)} &lt; x &lt; ${M_(c+k)}`,[`${M_(c-k)} ≤ x ≤ ${M_(c+k)}`,`${M_(c-1)} &lt; x &lt; ${M_(c+1)}`,`x &lt; ${M_(c+k)}`],[`It's geometric with r = ${fx}/${k}.`,`Converges ⇔ |r| &lt; 1 ⇔ ${ax} &lt; ${k} ⇔ ${M_(c-k)} &lt; x &lt; ${M_(c+k)}.`,`At the endpoints |r| = 1, so the terms don't → 0 and it diverges.`],'Write r in terms of x and solve |r| < 1.')},
 ()=>{const a=R(1,6),r=pick([2,3,-2]),N=R(3,6);const S=a*(r**N-1)/(r-1);
  return nq(`Find the finite sum ${a} + ${a}(${r}) + ${a}(${r})² + … + ${a}(${r})<sup>${N-1}</sup>.`,S,{int:true,wrong:[a*(r**(N+1)-1)/(r-1),a*r**N/(r-1),a*N*r],steps:[`${N} terms, first term ${a}, ratio ${r}.`,`S = a(r<sup>N</sup> − 1)/(r − 1) = ${a}((${r})<sup>${N}</sup> − 1)/(${r} − 1) = ${S}.`],hint:'Count the terms carefully: exponents 0 to N − 1 is N terms.'})},
 ()=>{const[rn,rd]=pick([[1,2],[1,3],[2,3],[-1,2],[1,4]]);const S=R(2,12);const a=S*(1-rn/rd);
  return nqf(`A geometric series with ratio r = ${frt(rn,rd)} has sum ${S}. What is its first term?`,a,{wrong:[S*rn/rd,S/(1-rn/rd),S*(1+rn/rd)],steps:[`S = a/(1 − r), so a = S(1 − r).`,`a = ${S}(1 − ${frt(rn,rd)}) = ${FF(a)}.`],hint:'Rearrange S = a/(1 − r).'})});
addV('phys_circ',
 ()=>{const r=round(R(5,30)/10,1),f=round(R(5,40)/10,1);const T=1/f,v=2*Math.PI*r*f;
  return nq(`A wheel of radius ${r} m turns at ${f} revolutions per second. Speed of a point on the rim?`,v,{s:3,unit:'m/s',wrong:[2*Math.PI*r/f,Math.PI*r*f,r*f],steps:[`Period T = 1/f = ${s3(T)} s.`,`v = 2πr/T = 2πrf = 2π(${r})(${f}) = ${s3(v)} m/s.`]})},
 ()=>{const r=R(20,120),v=R(8,30),at=round(R(5,30)/10,1);const ac=v*v/r,a=Math.hypot(ac,at);
  return nq(`A car on a curve of radius ${r} m is going ${v} m/s and speeding up at ${at} m/s². Magnitude of its total acceleration?`,a,{s:3,unit:'m/s²',wrong:[ac+at,ac,Math.abs(ac-at)],steps:[`Radial: a<sub>rad</sub> = v²/r = ${v}²/${r} = ${s3(ac)} m/s², toward the center.`,`Tangential: a<sub>tan</sub> = ${at} m/s², along the motion.`,`They're perpendicular, so |a| = √(${s3(ac)}² + ${at}²) = ${s3(a)} m/s².`]})},
 ()=>{const r=round(R(10,60)/10,1),ac=R(5,40);const v=Math.sqrt(ac*r),T=2*Math.PI*r/v;
  return nq(`An object moves in a circle of radius ${r} m with centripetal acceleration ${ac} m/s². What is its period?`,T,{s:3,unit:'s',wrong:[2*Math.PI*Math.sqrt(ac/r),v,2*Math.PI*r/ac],steps:[`a = v²/r ⇒ v = √(ar) = √(${ac}·${r}) = ${s3(v)} m/s.`,`T = 2πr/v = ${s3(T)} s. (Or directly: T = 2π√(r/a).)`]})},
 ()=>{const k=pick([2,3,4]);const which=pick(['speed','radius']);
  return which==='speed'?mc(`If an object's speed in a circle is multiplied by ${k} (same radius), its centripetal acceleration…`,`is multiplied by ${k*k}`,[`is multiplied by ${k}`,`is divided by ${k}`,'stays the same'],[`a = v²/r, so a scales with v²: ${k}² = ${k*k}.`]):mc(`At the same speed, the radius of the circle is multiplied by ${k}. The centripetal acceleration…`,`is divided by ${k}`,[`is multiplied by ${k}`,`is divided by ${k*k}`,'stays the same'],[`a = v²/r, so at fixed v, a ∝ 1/r.`])});


// ---------- Round 2b: congruence topics and mechanics ----------
const M_=x=>minus(String(x));
addV('m135_eea',
 ()=>{let a,b;do{a=R(6,40);b=R(6,40)}while(a===b||gcd(a,b)===1);const g=gcd(a,b);const c=g*R(2,4);
  return tf(`If ${a}x + ${b}y = ${c} has an integer solution, then gcd(${a}, ${b}) = ${c}.`,false,`gcd(${a}, ${b}) = ${g}. The equation is solvable because ${g} | ${c}, but that only says the gcd divides ${c}, not that it equals ${c}. Bézout's converse works only for the value 1 (or for the smallest positive value).`)},
 ()=>{let a,b;do{a=R(5,60);b=R(5,60)}while(a===b||gcd(a,b)!==1);const [g,x,y]=egcd(a,b);
  return tf(`Since ${a}(${M_(x)}) + ${b}(${M_(y)}) = 1, gcd(${a}, ${b}) = 1.`,true,`Coprimeness Characterization: if ax + by = 1 for some integers x, y, then gcd(a, b) = 1 (any common divisor divides 1).`)});
addV('m135_lde',
 ()=>{let a,b,c;do{a=R(3,15);b=R(3,15);c=R(20,90)}while(a===b||c%gcd(a,b)!==0);const g=gcd(a,b),A=a/g,B=b/g;const [,x0,]=egcd(a,b);const xs=mod(x0*(c/g),B);const x=xs===0?B:xs;const y=(c-a*x)/b;
  return nq(`Among all integer solutions of ${a}x + ${b}y = ${c}, find the one with the smallest positive x. What is y?`,y,{int:true,wrong:[y+A,y-A,(c-a*(x+B))/b+1],steps:[`gcd(${a}, ${b}) = ${g} divides ${c}, so solutions exist.`,`General solution: x = x₀ + ${B}n, y = y₀ − ${A}n.`,`Smallest positive x is ${x}, which gives y = (${c} − ${a}·${x})/${b} = ${y}.`],hint:'Find one solution, write the general one, then choose n.'})},
 ()=>{const a=pick([3,4,5,6,7]),b=pick([8,9,10,11,13]);if(gcd(a,b)!==1)return null;const c=R(40,140);const sols=[];for(let x=0;a*x<=c;x++)if((c-a*x)%b===0)sols.push([x,(c-a*x)/b]);
  return nq(`Stamps cost ${a}¢ and ${b}¢. In how many ways can you pay exactly ${c}¢ (using any number of each, including zero)?`,sols.length,{int:true,nonneg:true,wrong:[sols.length+1,Math.max(0,sols.length-1),sols.length+2],steps:[`Solve ${a}x + ${b}y = ${c} with x, y ≥ 0.`,sols.length?`Solutions: ${sols.map(([x,y])=>`(${x}, ${y})`).join(', ')}.`:'No solution has both x, y ≥ 0.',`Consecutive solutions differ by ${b} in x and ${a} in y.`],hint:'Find one solution, then step x by the other coefficient.'})});
addV('m135_lct',
 ()=>{let a,m,b;do{m=R(8,30);a=R(2,m-1);b=R(0,m-1)}while(gcd(a,m)===1||b%gcd(a,m)!==0);const g=gcd(a,m),S=[];for(let x=0;x<m;x++)if(mod(a*x-b,m)===0)S.push(x);
  const right=`x ≡ ${S.join(', ')} ${MOD(m)}`;
  return mc(`Solve ${a}x ≡ ${b} ${MOD(m)}. Give every solution mod ${m}.`,right,[`x ≡ ${S[0]} ${MOD(m)}`,`x ≡ ${[...S.slice(0,-1),mod(S[S.length-1]+1,m)].join(', ')} ${MOD(m)}`,'No solutions',`x ≡ ${S.slice(0,-1).join(', ')||S[0]+1} ${MOD(m)}`],[`gcd(${a}, ${m}) = ${g}, and ${g} | ${b}, so there are exactly ${g} solutions mod ${m}.`,`Divide through: ${a/g===1?'':a/g}x ≡ ${b/g} ${MOD(m/g)}, giving x ≡ ${S[0]} ${MOD(m/g)}.`,`Lift to mod ${m}: ${S.join(', ')}.`],'Linear Congruence Theorem: gcd d divides b ⇒ d solutions mod m.')},
 ()=>{let a,m,b;do{m=R(9,40);a=R(2,m-1);b=R(1,m-1)}while(gcd(a,m)!==1);const x=mod(inv(a,m)*b,m);
  return nq(`Solve ${a}x ≡ ${b} ${MOD(m)}, with 0 ≤ x &lt; ${m}.`,x,{int:true,nonneg:true,wrong:[mod(b*a,m),mod(inv(a,m)||1,m),mod(x+1,m)],steps:[`gcd(${a}, ${m}) = 1, so ${a} has an inverse mod ${m}: ${a}⁻¹ ≡ ${inv(a,m)}.`,`x ≡ ${inv(a,m)}·${b} ≡ ${x} ${MOD(m)}.`,`Check: ${a}·${x} = ${a*x} ≡ ${b} ✓`],hint:'Multiply both sides by the inverse of the coefficient.'})});
addV('m135_inv',
 ()=>{const p=pick([7,11,13]);const a=R(2,p-1);const t=inv(a,p);
  return nq(`Use Fermat's Little Theorem to find [${a}]⁻¹ in ℤ<sub>${p}</sub>, as a number from 0 to ${p-1}.`,t,{int:true,nonneg:true,wrong:[p-a,mod(a*(p-1),p),mod(t+1,p)],steps:[`FℓT: ${a}<sup>${p-1}</sup> ≡ 1, so ${a}·${a}<sup>${p-2}</sup> ≡ 1 and [${a}]⁻¹ = [${a}<sup>${p-2}</sup>].`,`${a}<sup>${p-2}</sup> ≡ ${t} ${MOD(p)}.`,`Check: ${a}·${t} = ${a*t} ≡ 1 ✓`],hint:`In ℤₚ, a⁻¹ = a^(p−2).`})});
addV('m135_mat',
 ()=>{const m=pick([12,15,18,20,21,24,26,30]);let a,b;do{a=R(2,m-1);b=R(1,m-1)}while(gcd(a,m)===1);const g=gcd(a,m);const n=b%g===0?g:0;
  return nq(`How many classes [x] in ℤ<sub>${m}</sub> satisfy [${a}][x] = [${b}]?`,n,{int:true,nonneg:true,wrong:[1,g===1?2:g+1,m/g],steps:[`gcd(${a}, ${m}) = ${g}.`,n?`${g} | ${b}, so there are exactly ${g} solutions.`:`${g} ∤ ${b}, so there are no solutions.`],hint:'Count = gcd(a, m) if it divides b, else 0.'})});
addV('phys_incline',
 ()=>{const m=R(2,25),th=pick([15,20,25,30,35,40,50]);const N=m*9.81*Math.cos(th*D2R);
  return nq(`A ${m} kg block rests on a ${th}° incline. Normal force on it? (g = 9.81 m/s²)`,N,{s:3,unit:'N',wrong:[m*9.81,m*9.81*Math.sin(th*D2R),m*9.81/Math.cos(th*D2R)],steps:[`Perpendicular to the surface, nothing accelerates: N = mg cos θ.`,`N = ${m}(9.81)cos ${th}° = ${s3(N)} N.`]})},
 ()=>{const m=R(2,20),th=pick([15,20,25,30,35]),mu=round(R(10,45)/100,2);const F=m*9.81*(Math.sin(th*D2R)+mu*Math.cos(th*D2R));
  return nq(`You push a ${m} kg block UP a ${th}° incline at constant speed, pushing parallel to the surface. μₖ = ${mu}. How hard must you push? (g = 9.81 m/s²)`,F,{s:3,unit:'N',wrong:[m*9.81*(Math.sin(th*D2R)-mu*Math.cos(th*D2R)),m*9.81*Math.sin(th*D2R),m*9.81*(Math.cos(th*D2R)+mu*Math.sin(th*D2R))],steps:[`Constant speed ⇒ net force 0.`,`Moving up, friction acts down the slope: F = mg sin θ + μₖ mg cos θ.`,`F = ${m}(9.81)(sin ${th}° + ${mu} cos ${th}°) = ${s3(F)} N.`]})});
addV('phys_atwood',
 ()=>{const m1=R(2,10),m2=R(2,10),mu=round(R(10,35)/100,2);if(m2<=mu*m1+.5)return null;const a=9.81*(m2-mu*m1)/(m1+m2);
  return nq(`A ${m1} kg block on a table (μₖ = ${mu}) is tied over a pulley to a hanging ${m2} kg block. Acceleration? (g = 9.81 m/s²)`,a,{s:3,unit:'m/s²',wrong:[9.81*m2/(m1+m2),9.81*(m2-mu*m1)/m2,9.81*(m2+mu*m1)/(m1+m2)],steps:[`Treat both blocks as one system along the rope: driving force m₂g, friction μₖm₁g.`,`a = (m₂ − μₖm₁)g/(m₁ + m₂) = (${m2} − ${mu}·${m1})(9.81)/${m1+m2} = ${s3(a)} m/s².`]})},
 ()=>{const m=R(45,100),a=round(R(5,30)/10,1);const N=m*(9.81-a);
  return nq(`${/^(8|11|18)/.test(String(m))?'An':'A'} ${m} kg person stands on a scale in an elevator accelerating DOWNWARD at ${a} m/s². Scale reading (N)? (g = 9.81 m/s²)`,N,{s:3,unit:'N',wrong:[m*(9.81+a),m*9.81,m*a],steps:[`Take up as positive: N − mg = m(−a).`,`N = m(g − a) = ${m}(9.81 − ${a}) = ${s3(N)} N. You feel lighter.`]})},
 ()=>{const m1=R(2,10),m2=R(2,10);const T=m1*m2*9.81/(m1+m2);
  return nq(`A ${m1} kg block on a frictionless table is tied over a pulley to a hanging ${m2} kg block. Rope tension? (g = 9.81 m/s²)`,T,{s:3,unit:'N',wrong:[m2*9.81,m1*9.81,(m1+m2)*9.81/2],steps:[`a = m₂g/(m₁ + m₂) = ${s3(m2*9.81/(m1+m2))} m/s².`,`The table block is pulled only by the rope: T = m₁a = ${s3(T)} N (less than m₂g, or the hanging block wouldn't accelerate).`]})});

for(const c of COURSES)for(const w of c.worlds)for(const n of w.nodes){const extra=VAR[c.id+'_'+n.id];if(!extra)continue;const base=n.gen,all=[base,...extra];n.gen=()=>{for(let g=0;g<8;g++){const q=pick(all)();if(q)return q}return base()}}

// ---------- MATH 135 · Splitting the Modulus (nonlinear congruences) ----------
function gSplit(){
  const PAIRS=[[3,5],[3,7],[4,5],[5,7],[3,8],[4,7],[3,11],[5,8],[7,8],[4,9],[5,9],[7,9],[3,13],[5,11]];
  const sols=(f,m)=>{const s=[];for(let x=0;x<m;x++)if(mod(f(x),m)===0)s.push(x);return s};
  const list=(a,m)=>a.length?`x ≡ ${a.join(', ')} ${MOD(m)}`:'No solutions';
  const v=Math.random();
  // pick polynomial family
  let m1,m2,f,txt,red;
  const [p,q]=pick(PAIRS);m1=p;m2=q;const M=m1*m2;
  const kind=Math.random();
  if(kind<.5){const r=R(2,M-2);const a=mod(r*r,M);f=x=>x*x-a;txt=`x² ≡ ${a} ${MOD(M)}`;red=m=>`x² ≡ ${mod(a,m)} ${MOD(m)}`}
  else if(kind<.8){let b,c;do{b=R(1,M-1);c=R(1,M-1)}while(sols(x=>x*x+b*x+c,M).length===0&&Math.random()<.85);f=x=>x*x+b*x+c;const pf=(B,C)=>`x²${B?` + ${B===1?'':B}x`:''}${C?` + ${C}`:''}`;txt=`${pf(b,c)} ≡ 0 ${MOD(M)}`;red=m=>`${pf(mod(b,m),mod(c,m))} ≡ 0 ${MOD(m)}`}
  else{const r=R(2,M-2);const a=mod(r*r*r,M);f=x=>x*x*x-a;txt=`x³ ≡ ${a} ${MOD(M)}`;red=m=>`x³ ≡ ${mod(a,m)} ${MOD(m)}`}
  const S=sols(f,M),S1=sols(f,m1),S2=sols(f,m2);
  const combo=[];for(const s of S1)for(const t of S2){const N=crtWork(s,m1,t,m2).N;combo.push(`x ≡ ${s} ${MOD(m1)} and x ≡ ${t} ${MOD(m2)} ⇒ x ≡ ${N} ${MOD(M)}`)}
  const steps=[`<b>Split the modulus.</b> ${M} = ${m1} · ${m2} with gcd(${m1}, ${m2}) = 1, so ${txt} ⇔ ${red(m1)} and ${red(m2)}.`,
    `<b>Solve mod ${m1}</b> (test x = 0, …, ${m1-1}): ${S1.length?`x ≡ ${S1.join(', ')} ${MOD(m1)}`:'no solutions'}.`,
    `<b>Solve mod ${m2}</b> (test x = 0, …, ${m2-1}): ${S2.length?`x ≡ ${S2.join(', ')} ${MOD(m2)}`:'no solutions'}.`,
    ...(S1.length&&S2.length?[`<b>Combine every pair with CRT</b> (${S1.length} × ${S2.length} = ${S1.length*S2.length} pair${S1.length*S2.length>1?'s':''}):`,...combo]:[`One piece has no solutions, so the original congruence has none.`]),
    `<b>Answer:</b> ${list(S,M)}.`];
  const hint=`Split ${M} into ${m1} · ${m2}, solve each small congruence by testing values, then combine every pair with CRT.`;
  if(v<.5){
    // full solution set
    const wrong=[];
    if(S.length>2)wrong.push(list(S.slice(0,2),M),list(S.slice(0,S.length-1),M));
    if(S.length===2)wrong.push(list([S[0]],M));
    const lift=[...new Set([...S1,...S2])].sort((a,b)=>a-b);wrong.push(list(lift,M));
    if(S.length)wrong.push('No solutions');else wrong.push(list(S1.length?S1:[0],M),list(S2.length?S2:[1],M));
    let g=0;while(wrong.length<6&&g++<20){const k=R(1,Math.min(4,M-1));const fake=[...new Set(Array.from({length:k},()=>R(0,M-1)))].sort((a,b)=>a-b);if(fake.join()!==S.join())wrong.push(list(fake,M))}
    return mc(`Find all solutions of ${txt}.`,list(S,M),wrong.filter(w=>w!==list(S,M)),steps,hint);
  }
  if(v<.7){
    const n=S.length;return nq(`How many solutions does ${txt} have, with 0 ≤ x &lt; ${M}?`,n,{int:true,nonneg:true,wrong:[S1.length+S2.length,Math.max(S1.length,S2.length),n?n+2:2,n===4?2:4],steps:[...steps.slice(0,3),`Number of solutions = (solutions mod ${m1}) × (solutions mod ${m2}) = ${S1.length} × ${S2.length} = ${n}.`],hint});
  }
  if(v<.85){
    const right=`${red(m1)} and ${red(m2)}`;
    const w1=`${txt.replace(MOD(M),MOD(m1))} and ${txt.replace(MOD(M),MOD(m2))}`;
    const wrong=[];if(w1!==right)wrong.push(w1);
    wrong.push(`${red(m1)} or ${red(m2)}`,`${red(m1)} and ${txt}`,`${red(m1)} only`);
    return mc(`Which pair of congruences is equivalent to ${txt}?`,right,wrong.filter(w=>w!==right),[steps[0],`Both must hold ("and", not "or"), and reduce each coefficient mod the smaller modulus.`],`Splitting the modulus needs coprime factors and keeps both conditions.`);
  }
  // SMT statements
  const T=pick([
    ()=>{const a=R(1,6);let p=R(5,11),q;do{q=R(5,13)}while(q===p||gcd(p,q)!==1);return tf(`If n ≡ ${a} ${MOD(p)} and n ≡ ${a} ${MOD(q)}, then n ≡ ${a} ${MOD(p*q)}.`,true,`gcd(${p}, ${q}) = 1, so Splitting the Modulus applies: same remainder mod each coprime factor ⇔ same remainder mod the product ${p*q}.`)},
    ()=>{const [p,q]=pick([[4,6],[6,9],[6,10],[4,10],[9,12]]);const a=R(1,3);return tf(`If n ≡ ${a} ${MOD(p)} and n ≡ ${a} ${MOD(q)}, then n ≡ ${a} ${MOD(p*q)}.`,false,`gcd(${p}, ${q}) = ${gcd(p,q)} ≠ 1, so SMT doesn't apply. You only get n ≡ ${a} (mod lcm = ${p*q/gcd(p,q)}). Counterexample: n = ${a+p*q/gcd(p,q)}.`)},
    ()=>{const [p,q]=pick(PAIRS);return tf(`x² ≡ 1 ${MOD(p*q)} has exactly two solutions, x ≡ ±1.`,false,`Split: x ≡ ±1 mod ${p} and x ≡ ±1 mod ${q} give ${sols(x=>x*x-1,p).length} × ${sols(x=>x*x-1,q).length} = ${sols(x=>x*x-1,p*q).length} solutions: ${sols(x=>x*x-1,p*q).join(', ')}.`)}
  ]);return T();
}
{const w=COURSES.find(c=>c.id==='m135').worlds.find(w=>w.id==='crt');const i=w.nodes.findIndex(n=>n.id==='crtd');w.nodes.splice(i+1,0,{id:'split',name:'Split the Modulus',icon:'✂️',gen:gSplit})}
