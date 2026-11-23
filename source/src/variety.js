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
for(const c of COURSES)for(const w of c.worlds)for(const n of w.nodes){const extra=VAR[c.id+'_'+n.id];if(!extra)continue;const base=n.gen,all=[base,...extra];n.gen=()=>{for(let g=0;g<8;g++){const q=pick(all)();if(q)return q}return base()}}
