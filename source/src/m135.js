// ================= MATH 135 =================
const COURSES=[];
const L=(p,q,s)=>({p,ex:q?{q,s}:null});
const setS=a=>a.length?`{${a.join(', ')}}`:'∅';

// ---- Logic ----
const g135neg=bank([
 {q:'Negate: <b>∀x ∈ ℝ, x² ≥ 0</b>',a:'∃x ∈ ℝ, x² &lt; 0',w:['∀x ∈ ℝ, x² &lt; 0','∃x ∈ ℝ, x² ≤ 0','∀x ∈ ℝ, x² ≤ 0'],e:'Flip ∀ ↔ ∃ and negate the inside: ¬(x² ≥ 0) is x² &lt; 0.'},
 {q:'Negate: <b>∃n ∈ ℕ, n² = 2</b>',a:'∀n ∈ ℕ, n² ≠ 2',w:['∃n ∈ ℕ, n² ≠ 2','∀n ∈ ℕ, n² = 2','∃n ∉ ℕ, n² ≠ 2'],e:'¬∃ becomes ∀. The domain (ℕ) never changes when you negate.'},
 {q:'Negate: <b>∀x ∈ ℝ, ∃y ∈ ℝ, x + y = 0</b>',a:'∃x ∈ ℝ, ∀y ∈ ℝ, x + y ≠ 0',w:['∀x ∈ ℝ, ∃y ∈ ℝ, x + y ≠ 0','∃x ∈ ℝ, ∃y ∈ ℝ, x + y ≠ 0','∃y ∈ ℝ, ∀x ∈ ℝ, x + y ≠ 0'],e:'Flip every quantifier, keep the order, negate the open sentence.'},
 {q:'Negate the limit definition: <b>∀ε &gt; 0 ∃N ∈ ℕ ∀n &gt; N, |aₙ − L| &lt; ε</b>',a:'∃ε &gt; 0 ∀N ∈ ℕ ∃n &gt; N, |aₙ − L| ≥ ε',w:['∃ε &gt; 0 ∀N ∈ ℕ ∃n &gt; N, |aₙ − L| &gt; ε','∀ε &gt; 0 ∃N ∈ ℕ ∀n &gt; N, |aₙ − L| ≥ ε','∃ε ≤ 0 ∀N ∈ ℕ ∃n ≤ N, |aₙ − L| ≥ ε'],e:'¬(&lt;) is ≥, not &gt;. The conditions "ε &gt; 0" and "n &gt; N" are part of the domain, so they stay.'},
 {q:'Negate: <b>If x is even, then x² is even.</b>',a:'x is even and x² is odd',w:['If x is odd, then x² is odd','If x is even, then x² is odd','x is odd and x² is even'],e:'¬(A ⇒ B) ≡ A ∧ ¬B. A negated implication is <i>not</i> an implication.'},
 {q:'Negate: <b>Every integer is even or odd.</b>',a:'Some integer is neither even nor odd',w:['Every integer is neither even nor odd','Some integer is both even and odd','Some integer is not even or not odd'],e:'¬∀ → ∃, and ¬(E ∨ O) ≡ ¬E ∧ ¬O by De Morgan.'},
 {q:'Negate: <b>x &gt; 2 and y ≤ 5</b>',a:'x ≤ 2 or y &gt; 5',w:['x ≤ 2 and y &gt; 5','x &lt; 2 or y &gt; 5','x ≤ 2 or y ≥ 5'],e:'De Morgan: ¬(A ∧ B) ≡ ¬A ∨ ¬B, and ¬(x &gt; 2) is x ≤ 2.'},
 {q:'Negate "the sequence is bounded above": <b>∃M ∈ ℝ ∀n ∈ ℕ, aₙ ≤ M</b>',a:'∀M ∈ ℝ ∃n ∈ ℕ, aₙ &gt; M',w:['∀M ∈ ℝ ∃n ∈ ℕ, aₙ ≥ M','∃M ∈ ℝ ∀n ∈ ℕ, aₙ &gt; M','∀M ∈ ℝ ∀n ∈ ℕ, aₙ &gt; M'],e:'∃∀ becomes ∀∃, and ¬(≤) is &gt;.'},
]);
function g135truth(){
  if(Math.random()<0.4)return g135equiv();
  const V={A:Math.random()<.5,B:Math.random()<.5,C:Math.random()<.5};
  const ops={'∧':(a,b)=>a&&b,'∨':(a,b)=>a||b,'⇒':(a,b)=>!a||b,'⇔':(a,b)=>a===b};
  const lit=()=>{const v=pick(['A','B','C']);return Math.random()<.3?{s:`¬${v}`,v:!V[v]}:{s:v,v:V[v]}};
  const o1=pick(Object.keys(ops)),o2=pick(Object.keys(ops));const x=lit(),y=lit(),z=lit();
  const inner=ops[o1](x.v,y.v),val=ops[o2](inner,z.v);const T=b=>b?'T':'F';
  const s=`(${x.s} ${o1} ${y.s}) ${o2} ${z.s}`;
  return{prompt:`A is <b>${T(V.A)}</b>, B is <b>${T(V.B)}</b>, C is <b>${T(V.C)}</b>. What is the truth value of<div class="sys">${s}</div>`,options:[{key:'T',html:'True'},{key:'F',html:'False'}],answer:T(val),
   hint:'Work from the inside out. Remember: A ⇒ B is only false when A is true and B is false.',
   steps:[`${x.s} is ${T(x.v)}, ${y.s} is ${T(y.v)}, so (${x.s} ${o1} ${y.s}) is <b>${T(inner)}</b>.`,`${z.s} is ${T(z.v)}, so ${T(inner)} ${o2} ${T(z.v)} is <b>${T(val)}</b>.`,o2==='⇒'||o1==='⇒'?'Reminder: an implication is false only in the case T ⇒ F.':'']};
}
const g135equiv=bank([
 {q:'A ⇒ B ≡ ¬B ⇒ ¬A',t:true,e:'That\'s the contrapositive, and it is always equivalent.'},
 {q:'A ⇒ B ≡ B ⇒ A',t:false,e:'That\'s the converse. A = F, B = T makes A ⇒ B true but B ⇒ A false.'},
 {q:'¬(A ∧ B) ≡ ¬A ∨ ¬B',t:true,e:'De Morgan\'s Law.'},
 {q:'¬(A ⇒ B) ≡ ¬A ⇒ ¬B',t:false,e:'¬(A ⇒ B) ≡ A ∧ ¬B. Take A = F, B = T: LHS is F, RHS is T.'},
 {q:'A ⇒ B ≡ ¬A ∨ B',t:true,e:'Both are false exactly when A is T and B is F.'},
 {q:'(A ∨ B) ⇒ C ≡ (A ⇒ C) ∧ (B ⇒ C)',t:true,e:'If either A or B forces C, then each of them alone must force C.'},
 {q:'(A ∧ B) ⇒ C ≡ (A ⇒ C) ∧ (B ⇒ C)',t:false,e:'A = T, B = F, C = F: LHS is T (false hypothesis) but A ⇒ C is F. Correct: (A ⇒ C) ∨ (B ⇒ C).'},
 {q:'A ⇒ (B ∨ C) ≡ (A ∧ ¬B) ⇒ C',t:true,e:'This is the "elimination" trick for proving an OR conclusion: assume A and not B, then prove C.'},
 {q:'A ⇔ B ≡ (A ⇒ B) ∧ (B ⇒ A)',t:true,e:'That\'s the definition of "if and only if", and why you prove both directions.'},
]);
const IMPL=[['x &gt; 3','x² &gt; 9','x ≤ 3','x² ≤ 9'],['n² is even','n is even','n² is odd','n is odd'],['f is differentiable at a','f is continuous at a','f is not differentiable at a','f is not continuous at a'],['ab = 0','a = 0 or b = 0','ab ≠ 0','a ≠ 0 and b ≠ 0'],['p is prime and p &gt; 2','p is odd','p is not prime or p ≤ 2','p is even'],['a | b and b | c','a | c','a ∤ b or b ∤ c','a ∤ c'],['x is rational','x² is rational','x is irrational','x² is irrational']];
function g135impl(){const[A,B,nA,nB]=pick(IMPL);
  const forms={contrapositive:`If ${nB}, then ${nA}.`,converse:`If ${B}, then ${A}.`,inverse:`If ${nA}, then ${nB}.`,negation:`${A}, and ${nB}.`};
  const ask=pick(['contrapositive','converse','negation','equivalent']);const key=ask==='equivalent'?'contrapositive':ask;
  const qs={contrapositive:'Which is the <b>contrapositive</b>?',converse:'Which is the <b>converse</b>?',negation:'Which is the <b>negation</b>?',equivalent:'Which statement is <b>logically equivalent</b> to it?'};
  return mc(`Statement: <b>If ${A}, then ${B}.</b><br>${qs[ask]}`,forms[key],Object.entries(forms).filter(([k])=>k!==key).map(([,v])=>v),
   [`For "A ⇒ B": contrapositive is ¬B ⇒ ¬A (equivalent), converse is B ⇒ A, inverse is ¬A ⇒ ¬B, negation is A ∧ ¬B.`,`So the answer is: ${forms[key]}`],'Contrapositive: negate both parts AND swap them.');}

// ---- Proofs & divisibility ----
function g135div(){
  if(Math.random()<.55)return g135divbank();
  let a=R(-12,12),b;if(Math.random()<.15)a=0;
  const yes=Math.random()<.5;if(a===0)b=yes?0:R(1,30)*pick([-1,1]);else b=yes?a*R(-9,9):a*R(-9,9)+R(1,Math.max(1,Math.abs(a)-1))*(Math.abs(a)>1?1:0);
  if(a!==0&&Math.abs(a)===1)b=R(-40,40);
  const t=a===0?b===0:b%a===0;
  return tf(`${a} | ${b}`,t,t?(a===0?'0 = 0·k for any k, so 0 | 0 is true by the definition.':`${b} = ${par(a)}·${par(b/a)}, and ${b/a} is an integer.`):(a===0?`0·k = 0 ≠ ${b} for every k.`:`${b}/${par(a)} is not an integer.`),'a | b means b = ka for some integer k.');}
const g135divbank=bank([
 {q:'If a | b and b | c, then a | c.',t:true,e:'Transitivity of Divisibility (TD).'},
 {q:'If a | b and a | c, then a | (bx + cy) for all integers x, y.',t:true,e:'Divisibility of Integer Combinations (DIC).'},
 {q:'If a | bc, then a | b or a | c.',t:false,e:'6 | 4·3 but 6 ∤ 4 and 6 ∤ 3. (It IS true when a is prime: that\'s PAD.)'},
 {q:'If a | b and b | a, then a = b.',t:false,e:'2 | −2 and −2 | 2, but 2 ≠ −2. You only get a = ±b.'},
 {q:'If a | b and b ≠ 0, then |a| ≤ |b|.',t:true,e:'Bounds by Divisibility (BBD).'},
 {q:'If a | (b + c) and a | b, then a | c.',t:true,e:'c = (b + c)·1 + b·(−1), so DIC gives a | c.'},
 {q:'If a | (b + c), then a | b or a | c.',t:false,e:'2 | (1 + 1) but 2 ∤ 1.'},
 {q:'If a | c and b | c, then ab | c.',t:false,e:'2 | 2 and 2 | 2 but 4 ∤ 2. (True if gcd(a, b) = 1.)'},
 {q:'If p is prime and p | ab, then p | a or p | b.',t:true,e:'Primes and Divisibility (PAD).'},
]);
const g135method=bank([
 {q:'Best way to prove: <b>If n² is even, then n is even.</b>',a:'Contrapositive',w:['Direct proof from n² = 2k','Induction','Counterexample'],e:'Contrapositive: "if n is odd then n² is odd" is easy: n = 2k+1 ⇒ n² = 2(2k²+2k)+1.'},
 {q:'Best way to prove: <b>√2 is irrational.</b>',a:'Contradiction',w:['Contrapositive','Induction','Direct proof'],e:'Assume √2 = a/b in lowest terms, derive that a and b are both even: contradiction.'},
 {q:'Best way to prove: <b>For all n ∈ ℕ, 1 + 2 + ⋯ + n = n(n+1)/2.</b>',a:'Induction',w:['Contradiction','Counterexample','Contrapositive'],e:'Statement indexed by n ∈ ℕ with a natural k → k+1 step: induction.'},
 {q:'How do you deal with: <b>Every prime is odd.</b>',a:'Disprove it with a counterexample',w:['Prove it by contradiction','Prove it by induction','Prove it directly'],e:'2 is prime and even. One counterexample kills a ∀ statement.'},
 {q:'Best way to prove: <b>There exists an integer x with x² − 5x + 6 = 0.</b>',a:'Give an explicit example and check it',w:['Assume all integers fail, find a contradiction','Induction on x','Prove it for an arbitrary x'],e:'For ∃, just exhibit one: x = 2 gives 4 − 10 + 6 = 0.'},
 {q:'Best way to prove: <b>For every integer n, n² + n is even.</b>',a:'Split into cases: n even, n odd',w:['Counterexample','Contradiction on n = 0','Induction starting at n = 1 only'],e:'Cases on parity (or note n² + n = n(n+1), a product of consecutive integers).'},
 {q:'Best way to prove: <b>There are infinitely many primes.</b>',a:'Contradiction',w:['Induction','Counterexample','Direct listing'],e:'Assume finitely many p₁…pₖ, then p₁p₂⋯pₖ + 1 has a prime factor not on the list.'},
 {q:'How do you prove <b>uniqueness</b> of an object?',a:'Assume two objects both work and show they are equal',w:['Show one object works','Assume none work and get a contradiction','Use a counterexample'],e:'Standard uniqueness proof: suppose x₁ and x₂ both satisfy it, show x₁ = x₂.'},
 {q:'Best way to prove: <b>For all a, b, c ∈ ℤ, if a | b and b | c then a | c.</b>',a:'Direct proof',w:['Contradiction','Counterexample','Induction on c'],e:'Write b = ka, c = ℓb, so c = (kℓ)a.'},
]);
const g135err=bank([
 {q:'Claim: for all n ∈ ℕ, n² + n + 41 is prime.',err:['For n = 1, 1 + 1 + 41 = 43 is prime.','For n = 2, 4 + 2 + 41 = 47 is prime.','For n = 3, 9 + 3 + 41 = 53 is prime.','It works in every case we checked, so it holds for all n ∈ ℕ.'],bad:3,e:'Examples never prove a ∀ statement. (n = 40 gives 41², not prime.)'},
 {q:'Claim: 1 = 2. Let a and b be real numbers with a = b.',err:['a² = ab','a² − b² = ab − b²','(a − b)(a + b) = b(a − b)','a + b = b','2b = b, so 2 = 1.'],bad:3,e:'Line 4 divides by a − b, which is 0.'},
 {q:'Claim: if n² is even then n is even.',err:['Assume n is even.','Then n = 2k for some k ∈ ℤ.','So n² = 4k² = 2(2k²).','Hence n² is even.'],bad:0,e:'This assumes the conclusion and proves the <i>converse</i>. Start from "n² is even", or use the contrapositive.'},
 {q:'Claim: if a | b and a | c then a | (b + c).',err:['Since a | b, b = ka for some k ∈ ℤ.','Since a | c, c = ka.','So b + c = 2ka.','Therefore a | (b + c).'],bad:1,e:'You can\'t reuse k: c = ℓa for some (possibly different) ℓ ∈ ℤ.'},
 {q:'Claim: ∀x ∈ ℝ, ∃y ∈ ℝ, xy = 1.',err:['Let x ∈ ℝ be arbitrary.','Choose y = 1/x.','Then xy = x·(1/x) = 1.','Since x was arbitrary, the claim holds.'],bad:1,e:'1/x is undefined when x = 0. The claim is actually false (x = 0).'},
 {q:'Claim: for all n ≥ 1, 3 | (4ⁿ + 1).',err:['Assume 3 | (4ᵏ + 1) for some k ≥ 1.','Then 4ᵏ⁺¹ + 1 = 4(4ᵏ + 1) − 3.','3 divides both 4(4ᵏ + 1) and 3.','So 3 | (4ᵏ⁺¹ + 1), and the claim holds for all n ≥ 1 by induction.'],bad:3,e:'There is no base case, and it fails: n = 1 gives 5. The inductive step alone proves nothing.'},
 {q:'Claim: for x ∈ ℤ, if x² − 6x + 5 is even, then x is odd. (Proof by contrapositive.)',err:['We prove: if x is odd, then x² − 6x + 5 is even.','Let x = 2k + 1.','Then x² − 6x + 5 = 4k² − 8k = 2(2k² − 4k).','So it is even.'],bad:0,e:'The contrapositive is "if x is even, then x² − 6x + 5 is odd". Line 1 states the converse.'},
 {q:'Claim: if gcd(a, b) = 1 and a | bc, then a | c.',err:['Since gcd(a, b) = 1, by Bézout there are x, y with ax + by = 1.','Multiply by c: acx + bcy = c.','a | acx, and a | bcy since a | bc.','So a | c by DIC, and since a | c, a | b too.'],bad:3,e:'Everything is fine until the extra claim "a | b", which doesn\'t follow (and is usually false).'},
]);
const g135quant=bank([
 {q:'∀x ∈ ℝ, ∃y ∈ ℝ, x + y = 0',t:true,e:'Given x, take y = −x.'},
 {q:'∃y ∈ ℝ, ∀x ∈ ℝ, x + y = 0',t:false,e:'One fixed y would have to work for every x: x = −y and x = 1 − y can\'t both give 0.'},
 {q:'∀x ∈ ℝ, ∃y ∈ ℝ, xy = 1',t:false,e:'x = 0 has no such y.'},
 {q:'∃x ∈ ℝ, ∀y ∈ ℝ, xy = 0',t:true,e:'x = 0 works for every y.'},
 {q:'∀n ∈ ℕ, ∃m ∈ ℕ, m &gt; n',t:true,e:'Take m = n + 1.'},
 {q:'∃m ∈ ℕ, ∀n ∈ ℕ, m &gt; n',t:false,e:'That would be a largest natural number: n = m breaks it.'},
 {q:'∀x ∈ ℤ, x² ≥ x',t:true,e:'x² − x = x(x − 1), a product of consecutive integers, is never negative for integers.'},
 {q:'∀x ∈ ℝ, x² ≥ x',t:false,e:'x = 1/2: 1/4 &lt; 1/2.'},
 {q:'∃x ∈ ℕ, x² = 3x',t:true,e:'x = 3.'},
]);

// ---- Induction ----
function g135rec(){
  if(Math.random()<.4){const n=R(4,7),a=R(1,4),b=R(-3,5);let s=0;const terms=[];for(let i=1;i<=n;i++){const t=a*i*i+b;s+=t;terms.push(t)}
    return nq(`Evaluate <span class="cl">Σ<sub>i=1</sub><sup>${n}</sup> (${a===1?'':a}i² ${pm(b)})</span>`,s,{int:true,wrong:[s-terms[n-1],s+a*(n+1)**2+b,a*n*(n+1)/2+b*n],hint:'Write out each term and add.',steps:[`Terms: ${terms.join(', ')}.`,`Sum = ${s}.`]});}
  const p=R(1,3),q=R(-2,3),a1=R(1,4),a2=R(1,6);const a=[0,a1,a2];for(let i=3;i<=7;i++)a.push(p*a[i-1]+q*a[i-2]);const k=R(5,7);
  return nq(`x₁ = ${a1}, x₂ = ${a2}, and x<sub>n</sub> = ${p===1?'':p}x<sub>n−1</sub> ${q<0?'−':'+'} ${Math.abs(q)===1?'':Math.abs(q)}x<sub>n−2</sub> for n ≥ 3. Find x<sub>${k}</sub>.`,a[k],{int:true,wrong:[a[k-1],a[k+1]||a[k]+p,p*a[k-1]-q*a[k-2]],hint:'Just apply the rule one term at a time.',steps:a.slice(3,k+1).map((v,i)=>`x<sub>${i+3}</sub> = ${p}·${par(a[i+2])} ${pm(q)}·${par(a[i+1])} = ${v}`)});}
const g135ind=bank([
 {q:'To prove P(n) for all n ≥ 1 by (simple) induction, the inductive hypothesis is…',a:'Assume P(k) is true for some k ≥ 1',w:['Assume P(k) is true for all k ≥ 1','Assume P(k + 1) is true','Assume P(n) is true for all n ∈ ℕ'],e:'"For some k" (arbitrary but fixed). "For all k" assumes what you are trying to prove.'},
 {q:'x₁ = 1, x₂ = 3, xₙ = xₙ₋₁ + 2xₙ₋₂ (n ≥ 3). How many base cases does strong induction need?',a:'2',w:['1','3','0'],e:'The recurrence looks back two terms, so check n = 1 and n = 2.'},
 {q:'Σ<sub>i=1</sub><sup>k+1</sup> f(i) equals…',a:'Σ<sub>i=1</sub><sup>k</sup> f(i) + f(k+1)',w:['Σ<sub>i=1</sub><sup>k</sup> f(i) + f(k)','Σ<sub>i=1</sub><sup>k</sup> f(i) + k + 1','(k+1)·Σ<sub>i=1</sub><sup>k</sup> f(i)'],e:'Peel off the last term: this is how you use the inductive hypothesis.'},
 {q:'Claim: 2ⁿ &gt; n² for all n ≥ 5. What is the base case?',a:'n = 5',w:['n = 1','n = 0','n = 4'],e:'Start where the claim starts. (It fails at n = 4: 16 = 16.)'},
 {q:'In strong induction, the inductive hypothesis is…',a:'Assume P(1), P(2), …, P(k) are all true for some k',w:['Assume P(k) only','Assume P(n) for all n','Assume P(k + 1)'],e:'Strong induction assumes every case up to k.'},
 {q:'x₁ = 3 and xₙ = 2xₙ₋₁ for n ≥ 2. Which closed form is correct?',a:'xₙ = 3·2ⁿ⁻¹',w:['xₙ = 3·2ⁿ','xₙ = 2·3ⁿ⁻¹','xₙ = 6ⁿ⁻¹'],e:'x₁ = 3, x₂ = 6, x₃ = 12: matches 3·2ⁿ⁻¹.'},
 {q:'x₁ = 5 and xₙ = xₙ₋₁ + 4 for n ≥ 2. Closed form?',a:'xₙ = 4n + 1',w:['xₙ = 5 + 4n','xₙ = 5·4ⁿ⁻¹','xₙ = 4n − 1'],e:'Arithmetic: 5, 9, 13, … = 4n + 1.'},
 {q:'Claim: for all n ≥ 1, 3 | (4ⁿ + 1).',err:['Assume 3 | (4ᵏ + 1) for some k ≥ 1.','Then 4ᵏ⁺¹ + 1 = 4(4ᵏ + 1) − 3.','3 divides both 4(4ᵏ + 1) and 3.','So 3 | (4ᵏ⁺¹ + 1), and the claim holds for all n ≥ 1 by induction.'],bad:3,e:'There is no base case, and it fails: n = 1 gives 5.'},
]);

// ---- Sets ----
function g135setops(){
  const U=[1,2,3,4,5,6,7,8,9,10];const sub=()=>{const n=R(3,6);return shuffle(U).slice(0,n).sort((a,b)=>a-b)};
  const S=sub(),T=sub();const I=S.filter(x=>T.includes(x)),Un=uniq([...S,...T]).sort((a,b)=>a-b),D=S.filter(x=>!T.includes(x)),D2=T.filter(x=>!S.includes(x)),Cm=U.filter(x=>!S.includes(x));
  const ops=[['S ∩ T',I],['S ∪ T',Un],['S − T',D],['T − S',D2],['S̄ (complement in U)',Cm]];
  if(Math.random()<.3){const k=pick([0,1]);if(k)return nq(`U = {1, …, 10}, S = ${setS(S)}. What is |𝒫(S)|?`,2**S.length,{int:true,wrong:[S.length**2,2*S.length,2**(S.length-1)],steps:[`|S| = ${S.length}, and |𝒫(S)| = 2<sup>|S|</sup> = ${2**S.length}.`]});
    return nq(`S = ${setS(S)}, T = ${setS(T)}. What is |S × T|?`,S.length*T.length,{int:true,wrong:[S.length+T.length,Un.length,I.length*Un.length],steps:[`|S × T| = |S|·|T| = ${S.length}·${T.length} = ${S.length*T.length}.`]});}
  const[name,ans]=pick(ops);
  return mc(`U = {1, 2, …, 10}, S = ${setS(S)}, T = ${setS(T)}.<br>Find <b>${name}</b>.`,setS(ans),ops.filter(([n])=>n!==name).map(([,v])=>setS(v)),[`${name} = ${setS(ans)}.`,'∩: in both. ∪: in either. S − T: in S but not T. Complement: in U but not S.'],'Go element by element.');}
const g135setlogic=bank([
 {q:'A ⊆ A ∪ B',t:true,e:'Anything in A is in A or B.'},
 {q:'A − B = A ∩ B̄',t:true,e:'"In A and not in B".'},
 {q:'(A ∪ B)̄ = Ā ∪ B̄',t:false,e:'De Morgan: the complement of a union is the intersection of complements.'},
 {q:'∅ ⊆ A for every set A',t:true,e:'Vacuously true: ∅ has no element that could fail to be in A.'},
 {q:'∅ ∈ A for every set A',t:false,e:'∅ ∈ {1, 2}? No. ∅ is a subset of everything, but an element of very few sets.'},
 {q:'{1} ∈ {1, 2}',t:false,e:'The elements are 1 and 2. {1} ⊆ {1, 2} is true, but {1} ∈ {1, 2} is false.'},
 {q:'{1} ∈ {{1}, 2}',t:true,e:'{1} is literally listed as an element.'},
 {q:'A × B = B × A for all sets A, B',t:false,e:'(1, 2) ∈ {1} × {2} but (1, 2) ∉ {2} × {1}.'},
 {q:'To prove S ⊆ T, you…',a:'Let x ∈ S be arbitrary and show x ∈ T',w:['Show some x ∈ S is in T','Show |S| ≤ |T|','Let x ∈ T and show x ∈ S'],e:'Subset = every element of S is in T.'},
 {q:'To prove S = T for sets, you…',a:'Show S ⊆ T and T ⊆ S',w:['Show |S| = |T|','Find one element in both','Show S ∩ T ≠ ∅'],e:'Set equality is mutual inclusion.'},
 ()=>{const a=R(3,7),b=R(0,a-1),x=R(-30,40),t=mod(x-b,a)===0;return tf(`${x} ∈ {${a}k + ${b} : k ∈ ℤ}`,t,t?`${x} = ${a}·${par((x-b)/a)} + ${b}.`:`${x} − ${b} = ${x-b} is not a multiple of ${a}.`)},
]);

// ---- GCD ----
function g135divalg(){const b=R(3,19),a=R(-250,250);const q=Math.floor(a/b),r=a-q*b;const tq=Math.trunc(a/b),tr=a-tq*b;
  const f=(q,r)=>`q = ${minus(q)}, r = ${minus(r)}`;
  return mc(`By the Division Algorithm, find q, r with <b>${minus(a)} = ${b}q + r</b> and 0 ≤ r &lt; ${b}.`,f(q,r),[f(tq,tr),f(q+1,r-b),f(-q,r),f(q,b-r),f(q-1,r+b),f(q,r+1)],[`${b}·${par(q)} = ${b*q} ≤ ${a} &lt; ${b*(q+1)} = ${b}·${par(q+1)}.`,`r = ${a} − ${b*q} = ${r}. Check 0 ≤ ${r} &lt; ${b} ✓`,a<0?'For negative a, round q DOWN so r stays non-negative.':''],'r must satisfy 0 ≤ r < b, even when a is negative.');}
function g135gcd(){const g=pick([1,2,3,4,5,6,7,8,9,12,14,15,18,21]);let u,v;do{u=R(5,90);v=R(5,90)}while(gcd(u,v)!==1||u===v);
  let a=g*u,b=g*v;if(a<b)[a,b]=[b,a];const rows=[];let x=a,y=b;while(y){rows.push(`${x} = ${Math.floor(x/y)}·${y} + ${x%y}`);[x,y]=[y,x%y]}
  return nq(`Find gcd(${a}, ${b}).`,g,{int:true,wrong:[g*2,Math.max(1,g/ (g%2?1:2)),g*3,gcd(a,b+1),u],nonneg:true,hint:'Euclidean Algorithm: gcd(a, b) = gcd(b, r) where r is the remainder.',steps:[...rows.map(s=>s),`The last non-zero remainder is ${g}, so gcd = ${g}.`]});}
function g135eea(){let a,b,d;do{a=R(20,300);b=R(10,200);d=gcd(a,b)}while(a===b||d>12);const[,x,y]=egcd(a,b);
  const ok=(p,q)=>a*p+b*q===d;const f=(p,q)=>`x = ${minus(p)}, y = ${minus(q)}`;
  const cands=[[y,x],[x,-y],[-x,y],[x+b/d,y],[x,y+1],[x-1,y],[-y,-x]].filter(([p,q])=>!ok(p,q)).map(([p,q])=>f(p,q));
  return mc(`gcd(${a}, ${b}) = ${d}. Which pair satisfies <b>${a}x + ${b}y = ${d}</b>?`,f(x,y),cands,[`EEA gives ${a}·${par(x)} + ${b}·${par(y)} = ${a*x} ${pm(b*y)} = ${d} ✓`,'Fastest check in a test: just plug the pair in.'],'Plug each pair in, or run the EEA table.');}
const g135gcdprops=bank([
 {q:'If gcd(a, b) = d, then there are integers x, y with ax + by = d.',t:true,e:'Bézout\'s Lemma (EEA).'},
 {q:'If ax + by = d for some integers x, y, then gcd(a, b) = d.',t:false,e:'2·2 + 3·0 = 4, but gcd(2, 3) = 1. You also need d | a, d | b (GCD Characterization).'},
 {q:'If ax + by = 1 for some integers x, y, then gcd(a, b) = 1.',t:true,e:'Coprimeness Characterization: 1 is the only positive integer dividing 1.'},
 {q:'If a | bc and gcd(a, b) = 1, then a | c.',t:true,e:'Coprimeness and Divisibility (CAD).'},
 {q:'gcd(a, b) = gcd(b, a − 7b)',t:true,e:'GCD With Remainders works for a = qb + r with any integer q.'},
 {q:'If gcd(a, b) = d ≠ 0, then gcd(a/d, b/d) = 1.',t:true,e:'Division by the GCD.'},
 {q:'If p is prime and p ∤ a, then gcd(p, a) = 1.',t:true,e:'The only positive divisors of p are 1 and p.'},
 {q:'gcd(a, b) = gcd(a + b, b)',t:true,e:'GCD WR with q = −1: (a + b) = 1·b + a.'},
 {q:'If gcd(a, b) = 1 and gcd(a, c) = 1, then gcd(a, bc) = 1.',t:true,e:'No prime divides both a and bc (by PAD it would divide b or c).'},
]);
function g135ufc(){const P=[2,3,5,7,11];
  if(Math.random()<.5){const ps=shuffle(P).slice(0,3).sort((a,b)=>a-b),e=ps.map(()=>R(1,4));const n=ps.map((p,i)=>`${p}${e[i]>1?`<sup>${e[i]}</sup>`:''}`).join('·');const ans=e.reduce((s,x)=>s*(x+1),1);
    return nq(`How many positive divisors does <b>n = ${n}</b> have?`,ans,{int:true,wrong:[e.reduce((s,x)=>s*x,1),e.reduce((s,x)=>s+x,0)+1,ans*2],hint:'Each divisor picks an exponent 0…eᵢ for each prime.',steps:[`A divisor is ${ps.map((p,i)=>`${p}<sup>a${i+1}</sup>`).join('·')} with 0 ≤ aᵢ ≤ eᵢ.`,`Count: ${e.map(x=>`(${x}+1)`).join('·')} = ${ans}.`]});}
  const ps=[2,3,5,7];const ea=ps.map(()=>R(0,4)),eb=ps.map(()=>R(0,4));const fm=e=>ps.map((p,i)=>e[i]?`${p}${e[i]>1?`<sup>${e[i]}</sup>`:''}`:'').filter(Boolean).join('·')||'1';
  const gE=ea.map((x,i)=>Math.min(x,eb[i])),lE=ea.map((x,i)=>Math.max(x,eb[i]));const isG=Math.random()<.5;
  return mc(`a = ${fm(ea)}, b = ${fm(eb)}. Find <b>${isG?'gcd(a, b)':'lcm(a, b)'}</b>.`,fm(isG?gE:lE),[fm(isG?lE:gE),fm(ea.map((x,i)=>x+eb[i])),fm(ea.map((x,i)=>Math.abs(x-eb[i])))],[`${isG?'gcd: take the MIN':'lcm: take the MAX'} exponent of each prime (GCD PF).`,`${isG?'gcd':'lcm'} = ${fm(isG?gE:lE)}.`],'GCD from Prime Factorizations: compare exponents prime by prime.');}

// ---- LDE & congruences ----
function g135lde(){let a,b,d;do{a=R(4,60);b=R(4,60);d=gcd(a,b)}while(a===b||d>10);
  const solv=d===1||Math.random()<.8;let c;if(solv)c=d*R(-12,15);else{do{c=R(-90,90)}while(c%d===0)}
  const f=(x0,dx,y0,dy)=>`x = ${minus(x0)} ${dx<0?'−':'+'} ${Math.abs(dx)}n, y = ${minus(y0)} ${dy<0?'−':'+'} ${Math.abs(dy)}n, n ∈ ℤ`;
  if(!solv)return mc(`Find all integer solutions to <b>${a}x + ${b}y = ${minus(c)}</b>.`,'No integer solutions',[f(1,b,0,-a),f(c,b/d,-c,-a/d),f(0,b/d,1,-a/d)],[`gcd(${a}, ${b}) = ${d}, and ${d} ∤ ${c}.`,'By the LDE Theorem there are no integer solutions.'],'First check: does gcd(a, b) divide c?');
  const[,x,y]=egcd(a,b);const B=b/d,A=a/d;let x0=mod(x*(c/d),B),y0=(c-a*x0)/b;
  return mc(`Find all integer solutions to <b>${a}x + ${b}y = ${minus(c)}</b>.`,f(x0,B,y0,-A),[f(x0,b,y0,-a),f(x0,B,y0,A),f(x0,A,y0,-B),'No integer solutions'],[`d = gcd(${a}, ${b}) = ${d}, and ${d} | ${c}, so solutions exist.`,`A particular solution: x₀ = ${x0}, y₀ = ${y0} (check: ${a}·${par(x0)} + ${b}·${par(y0)} = ${c}).`,`LDE Theorem: x = x₀ + (b/d)n, y = y₀ − (a/d)n = ${f(x0,B,y0,-A)}.`],'Complete solution: x = x₀ + (b/d)n, y = y₀ − (a/d)n.');}
function g135cong(){
  if(Math.random()<.5){const a=R(2,9),k=R(50,3000),m=pick([10,10,4,6,8,9,12]);const pw=[];let v=1%m,seen={},i=0;while(!(v in seen)){seen[v]=i;pw.push(v);v=v*a%m;i++}
    const st=seen[v],cyc=i-st;const ans=powmod(a,k,m);
    return nq(m===10?`What is the last digit of ${a}<sup>${k}</sup>?`:`What is the remainder when ${a}<sup>${k}</sup> is divided by ${m}?`,ans,{int:true,wrong:[powmod(a,k+1,m),powmod(a,k%m,m),k%m,(ans+1)%m],nonneg:true,hint:`${m} isn't prime, so FℓT doesn't apply. List powers of ${a} mod ${m} until they repeat.`,steps:[`Powers of ${a} mod ${m}: ${pw.map((p,j)=>`${a}<sup>${j}</sup> ≡ ${p}`).join(', ')}, then it repeats.`,`The cycle has length ${cyc}${st?` (starting at exponent ${st})`:''}.`,`${a}<sup>${k}</sup> ≡ ${ans} ${MOD(m)}, and 0 ≤ ${ans} &lt; ${m}, so the answer is ${ans}.`]});}
  return g135congbank();}
const g135congbank=bank([
 {q:'If a ≡ b (mod m), then a² ≡ b² (mod m).',t:true,e:'Congruence Power (CP).'},
 {q:'If ac ≡ bc (mod m), then a ≡ b (mod m).',t:false,e:'2·3 ≡ 4·3 (mod 6) but 2 ≢ 4 (mod 6). You need gcd(c, m) = 1 (Cancellation).'},
 {q:'a ≡ b (mod m) iff a and b have the same remainder when divided by m.',t:true,e:'Congruent Iff Same Remainder (CISR).'},
 {q:'If a ≡ b (mod m), then 2ᵃ ≡ 2ᵇ (mod m).',t:false,e:'Exponents don\'t reduce mod m: 0 ≡ 3 (mod 3), but 2⁰ = 1 ≢ 8 ≡ 2 (mod 3).'},
 {q:'An integer is divisible by 9 iff the sum of its digits is divisible by 9.',t:true,e:'10 ≡ 1 (mod 9), so each digit counts once.'},
 {q:'If a ≡ b (mod m) and d is a positive divisor of m, then a ≡ b (mod d).',t:true,e:'m | (a − b) and d | m ⇒ d | (a − b).'},
 {q:'An integer is divisible by 11 iff the alternating sum of its digits is divisible by 11.',t:true,e:'10 ≡ −1 (mod 11).'},
]);
function g135lct(){const m=R(8,40);let a=R(2,m-1);const d=gcd(a,m);let c=Math.random()<.75?d*R(0,m/d-1):R(1,m-1);
  const sols=[];for(let x=0;x<m;x++)if(mod(a*x-c,m)===0)sols.push(x);const M=m/d;const f=(x,mm)=>`x ≡ ${x} (mod ${mm})`;
  if(!sols.length)return mc(`Solve the linear congruence <b>${a}x ≡ ${c} (mod ${m})</b>.`,'No solution',[f(mod(c,M),M),f(R(0,m-1),m),f(R(0,M-1),M)],[`gcd(${a}, ${m}) = ${d} ∤ ${c}.`,'By the Linear Congruence Theorem (LCT): no solutions.'],'LCT: solvable iff gcd(a, m) | c.');
  const x0=sols[0];return mc(`Solve the linear congruence <b>${a}x ≡ ${c} (mod ${m})</b>.`,f(x0,M),[f(x0,m),f(mod(x0+1,M),M),d>1?f(sols[0],M*d===m?m:M):'No solution','No solution',f(mod(-x0,M),M)].filter((s,i,arr)=>s!==f(x0,M)),
    [`gcd(${a}, ${m}) = ${d} | ${c}, so by LCT there are solutions, unique mod m/d = ${M}.`,`Try / solve: ${a}·${x0} = ${a*x0} ≡ ${c} ${MOD(m)}.`,`All solutions: ${f(x0,M)}${d>1?` (that's ${d} classes mod ${m}: ${sols.join(', ')})`:''}.`],'Divide through by d = gcd(a, m), then use an inverse.');}

// ---- RSA ----
function g135rsa(){const PS=[5,7,11,13,17,19,23];let p,q;do{p=pick(PS);q=pick(PS)}while(p===q);const n=p*q,ph=(p-1)*(q-1);let e,tries=0;do{e=R(3,ph-1);tries++}while(gcd(e,ph)!==1||(inv(e,ph)===e&&tries<60));const d=inv(e,ph);const M=R(2,n-1),Cc=powmod(M,e,n);
  return multi(`RSA with p = ${p}, q = ${q}, e = ${e}.`,[
   nq(`Compute n = pq and φ = (p − 1)(q − 1). What is (p − 1)(q − 1)?`,ph,{int:true,wrong:[n,(p+1)*(q+1),p*q-1],steps:[`n = ${p}·${q} = ${n}.`,`(p − 1)(q − 1) = ${p-1}·${q-1} = ${ph}.`],hint:'Not n − 1!'}),
   nq(`Find the private key d: 0 &lt; d &lt; ${ph} with ed ≡ 1 (mod ${ph}).`,d,{int:true,wrong:[inv(e,n)||d+1,ph-d,mod(d+e,ph)],steps:[`gcd(${e}, ${ph}) = 1, so d exists.`,`EEA on ${e}x + ${ph}y = 1 gives d = ${d}.`,`Check: ${e}·${d} = ${e*d} = ${ph}·${(e*d-1)/ph} + 1 ✓`],hint:'d is the inverse of e modulo (p − 1)(q − 1), NOT modulo n.'}),
   nq(`Encrypt M = ${M}: C ≡ M<sup>e</sup> (mod n), 0 ≤ C &lt; n.`,Cc,{int:true,wrong:[powmod(M,d,n),powmod(M,e,ph),(M*e)%n],steps:[`C ≡ ${M}<sup>${e}</sup> (mod ${n}).`,`Using repeated squaring: C = ${Cc}.`,`Sanity check: decrypting, ${Cc}<sup>${d}</sup> ≡ ${powmod(Cc,d,n)} (mod ${n}) = M ✓`],hint:'Repeated squaring, reducing mod n each time.'})]);}
const g135rsac=bank([
 {q:'In RSA, which of these is kept <b>secret</b>?',a:'d (and p, q)',w:['n','e','The ciphertext C'],e:'(e, n) is public; d is private, and p, q must stay secret too since they reveal d.'},
 {q:'Why must gcd(e, (p − 1)(q − 1)) = 1?',a:'So e has an inverse d modulo (p − 1)(q − 1)',w:['So that n is prime','So that M &lt; n','So that C ≠ M'],e:'Inverses in ℤₘ exist exactly for coprime classes.'},
 {q:'RSA is believed secure because…',a:'factoring a large n = pq is computationally hard',w:['d is chosen at random','e is always prime','n is kept secret'],e:'Knowing p and q gives (p−1)(q−1) and then d.'},
 {q:'Decrypting C gives…',a:'R ≡ C<sup>d</sup> (mod n), 0 ≤ R &lt; n',w:['R ≡ C<sup>e</sup> (mod n)','R ≡ C<sup>d</sup> (mod (p−1)(q−1))','R ≡ Cd (mod n)'],e:'RSA works: (Mᵉ)ᵈ ≡ M (mod n).'},
 {q:'The proof that RSA works uses…',a:'FℓT mod p and mod q, then CRT / Splitting the Modulus',w:['Only the Division Algorithm','Induction on M','The Fundamental Theorem of Algebra'],e:'Show M<sup>ed</sup> ≡ M mod p and mod q, then combine (SMT).'},
 {q:'The message M must satisfy…',a:'0 ≤ M &lt; n',w:['M is prime','gcd(M, e) = 1','M &lt; e'],e:'M is recovered as the unique remainder mod n.'},
]);

// ---- Complex numbers ----
const cs=(re,im)=>{const r=minus(re),i=Math.abs(im)===1?'':minus(Math.abs(im));if(im===0)return r;if(re===0)return `${im<0?'−':''}${i}i`;return `${r} ${im<0?'−':'+'} ${i}i`};
function exactStr(x){if(Math.abs(x-Math.round(x))<1e-9)return{s:minus(Math.round(x)),k:''};for(const[r,rs]of[[Math.SQRT2,'√2'],[Math.sqrt(3),'√3'],[Math.sqrt(6),'√6']]){const c=x/r;if(Math.abs(c-Math.round(c))<1e-9){const n=Math.round(c);return{s:n===1?rs:n===-1?'−'+rs:minus(n)+rs,k:rs}}}return{s:sig(x,4),k:'?'}}
function cstr(re,im){const R_=exactStr(re),I_=exactStr(im);const ri=Math.abs(Math.round(im)),iz=Math.abs(im)<1e-9,rz=Math.abs(re)<1e-9;
  let ims=I_.s.replace(/^−/,'');if(ims==='1')ims='';if(iz)return R_.s;const sg=im<0?'−':'+';if(rz)return `${im<0?'−':''}${ims}i`;return `${R_.s} ${sg} ${ims}i`}
function g135cstd(){const v=Math.random();
  const a=R(-6,6),b=R(-6,6)||1,c=R(-5,5),d=R(-5,5)||2;
  if(v<.3){const re=a*c-b*d,im=a*d+b*c;return mc(`Compute (${cs(a,b)})(${cs(c,d)}).`,cs(re,im),[cs(a*c+b*d,im),cs(a*c,b*d),cs(re,-im),cs(-re,im)],[`FOIL: ${a}·${c} + ${a}·${d}i + ${b}i·${c} + ${b}·${d}i².`,`i² = −1, so real part ${a*c} − ${b*d} = ${re}, imaginary part ${a*d} + ${b*c} = ${im}.`],'Use i² = −1.');}
  if(v<.55){const den=c*c+d*d,re=frt(a*c+b*d,den),im=frt(b*c-a*d,den);const f=(r,i)=>`${r} + (${i})i`;
    return mc(`Write (${cs(a,b)}) / (${cs(c,d)}) in standard form.`,f(re,im),[f(frt(a*c-b*d,den),frt(b*c+a*d,den)),f(frt(a*c+b*d,c*c-d*d||1),frt(b*c-a*d,c*c-d*d||1)),f(im,re)],[`Multiply top and bottom by the conjugate ${cs(c,-d)}.`,`Denominator: ${c}² + ${d}² = ${den}.`,`Numerator: (${cs(a,b)})(${cs(c,-d)}) = ${cs(a*c+b*d,b*c-a*d)}.`,`So ${f(re,im)}.`],'Multiply by the conjugate of the denominator.');}
  if(v<.8){const t=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17],[1,1,'√2'],[2,2,'2√2'],[1,2,'√5'],[3,1,'√10']]);const[x,y,m]=t;const sx=pick([1,-1]),sy=pick([1,-1]);
    return mc(`Find |${cs(sx*x,sy*y)}|.`,String(m),[String(x+y),`√${x+y}`,String(Math.max(x,y))],[`|a + bi| = √(a² + b²) = √(${x*x} + ${y*y}) = ${m}.`],'|z| = √(a² + b²).');}
  return tf(`For all z, w ∈ ℂ: ${pick(['the conjugate of zw is z̄·w̄','|zw| = |z|·|w|','z·z̄ = |z|²','z + z̄ = 2Re(z)'])}`,true,'These are the standard properties of conjugate and modulus (PCJ / PM).');}
const ANG=[[0,'0'],[30,'π/6'],[45,'π/4'],[60,'π/3'],[90,'π/2'],[120,'2π/3'],[135,'3π/4'],[150,'5π/6'],[180,'π'],[210,'7π/6'],[225,'5π/4'],[240,'4π/3'],[270,'3π/2'],[300,'5π/3'],[315,'7π/4'],[330,'11π/6']];
const angS=deg=>{deg=mod(deg,360);const f=ANG.find(a=>a[0]===deg);return f?f[1]:deg+'°'};
function g135cpolar(){const[deg]=pick(ANG.filter(a=>a[0]%90!==0));const k=R(1,3);const is45=deg%45===0;const r=is45?Math.SQRT2*k:2*k;const th=deg*Math.PI/180;
  const re=r*Math.cos(th),im=r*Math.sin(th);const rs=is45?(k===1?'√2':`${k}√2`):String(2*k);
  const P_=(rr,d)=>`${rr}(cos ${angS(d)} + i sin ${angS(d)})`;
  return mc(`Write <b>${cstr(re,im)}</b> in polar form with θ ∈ [0, 2π).`,P_(rs,deg),[P_(rs,180-deg),P_(rs,-deg),P_(rs,deg+180),P_(is45?String(2*k):String(4*k*k),deg)],[`r = |z| = ${rs}.`,`cos θ = ${sig(Math.cos(th),3)}, sin θ = ${sig(Math.sin(th),3)}: z is in quadrant ${Math.floor(mod(deg,360)/90)+1}, so θ = ${angS(deg)}.`],'Find r first, then use the signs of a and b to pick the quadrant.');}
function g135demoivre(){const B=pick([[1,1],[1,-1],[-1,1],[Math.sqrt(3),1],[1,Math.sqrt(3)],[-1,Math.sqrt(3)],[Math.sqrt(3),-1]]);const n=R(3,10);
  const r=Math.hypot(...B),th=Math.atan2(B[1],B[0]);const Rn=r**n,re=nz(Rn*Math.cos(n*th)),im=nz(Rn*Math.sin(n*th));
  const ans=cstr(re,im);const deg=Math.round(th*180/Math.PI);
  return mc(`Use De Moivre's Theorem to compute <b>(${cstr(B[0],B[1])})<sup>${n}</sup></b> in standard form.`,ans,[cstr(re,-im),cstr(-re,-im),cstr(im,re),cstr(nz(r*n*Math.cos(n*th)),nz(r*n*Math.sin(n*th)))],[`${cstr(B[0],B[1])} = ${exactStr(r).s}(cos ${angS(deg)} + i sin ${angS(deg)}).`,`DMT: raise r to the ${n}, multiply the angle by ${n}: ${exactStr(r).s}<sup>${n}</sup>(cos ${n}θ + i sin ${n}θ), with ${n}θ ≡ ${angS(deg*n)}.`,`= ${ans}.`],'Convert to polar, then (r e^{iθ})ⁿ = rⁿ e^{inθ}.');}
const ROOTS=[[4,'−16',['√2 + √2i','√2 − √2i','−√2 + √2i','−√2 − √2i'],['2i','−2','2 + 2i','4i']],[3,'8',['2','−1 + √3i','−1 − √3i'],['−2','1 + √3i','2i','√3 + i']],[3,'−8',['−2','1 + √3i','1 − √3i'],['2','−1 + √3i','2i','√3 − i']],[4,'1',['1','−1','i','−i'],['1 + i','(1 + i)/√2','2','√2']],[2,'2i',['1 + i','−1 − i'],['1 − i','√2i','2','−1 + i']],[4,'−4',['1 + i','1 − i','−1 + i','−1 − i'],['2i','√2','2','√2 + √2i']],[3,'i',['−i','√3/2 + i/2','−√3/2 + i/2'],['i','1/2 + (√3/2)i','1','−1']],[6,'1',['1','−1','1/2 + (√3/2)i','−1/2 − (√3/2)i'],['i','−i','√2/2 + (√2/2)i','2']]];
function g135croots(){const[n,w,good,bad]=pick(ROOTS);
  if(Math.random()<.3)return nq(`How many distinct complex solutions does <b>z<sup>${n}</sup> = ${w}</b> have?`,n,{int:true,wrong:[n-1,2,1,2*n],pos:true,steps:[`By the Complex n-th Roots Theorem (CNRT), a non-zero complex number has exactly n distinct n-th roots: here ${n}.`]});
  const g=pick(good);return mc(`Which of these is a solution of <b>z<sup>${n}</sup> = ${w}</b>?`,g,shuffle(bad),[`CNRT: write ${w} in polar form r(cos φ + i sin φ). The roots are r<sup>1/${n}</sup>(cos((φ + 2kπ)/${n}) + i sin((φ + 2kπ)/${n})), k = 0, …, ${n-1}.`,`All solutions: ${good.join(', ')}${n>good.length?', …':''}. Check by raising ${g} to the ${n}.`],'Raise each option to the power n, or use CNRT in polar form.');}
function g135cpoly(){if(Math.random()<.5){const a=R(-4,4),b=R(1,5),p=-2*a,q=a*a+b*b;
    return mc(`Solve <b>z² ${p<0?'−':'+'} ${Math.abs(p)||''}${p?'z':''} ${p===0?'':''}+ ${q} = 0</b>.`.replace('  ',' ').replace('+  +','+'),`z = ${cs(a,b)} or z = ${cs(a,-b)}`,[`z = ${cs(-a,b)} or z = ${cs(-a,-b)}`,`z = ${a+b} or z = ${a-b}`,`z = ${cs(a,2*b)} or z = ${cs(a,-2*b)}`],[`Quadratic formula: z = (${-p} ± √(${p*p} − ${4*q}))/2 = (${-p} ± √(${p*p-4*q}))/2.`,`√(${p*p-4*q}) = ${2*b}i, so z = ${a} ± ${b}i.`],'Discriminant negative ⇒ complex conjugate roots.');}
  return bank([
   {q:'A polynomial with <b>real</b> coefficients has root 2 + 3i. Which must also be a root?',a:'2 − 3i',w:['−2 + 3i','−2 − 3i','3 + 2i'],e:'Conjugate Roots Theorem (CJRT): non-real roots of real polynomials come in conjugate pairs.'},
   {q:'f(x) = x³ − 4x² + 9x − 10 has root 1 + 2i. What is the real root?',a:'2',w:['−2','5','10'],e:'1 ± 2i are roots, giving factor x² − 2x + 5. Divide: f(x) = (x² − 2x + 5)(x − 2).'},
   {q:'Every real polynomial of odd degree has at least one real root.',t:true,e:'Non-real roots pair up (CJRT), so an odd count leaves at least one real root.'},
   {q:'If z is a root of a polynomial with complex coefficients, then z̄ is also a root.',t:false,e:'Only for REAL coefficients. f(z) = z − i has root i but not −i.'},
   {q:'A degree n ≥ 1 complex polynomial has exactly n complex roots, counted with multiplicity.',t:true,e:'Fundamental Theorem of Algebra + factoring.'},
   {q:'x² + 1 is irreducible over ℂ.',t:false,e:'x² + 1 = (x − i)(x + i). Over ℝ it\'s irreducible, but not over ℂ.'},
  ])();}

COURSES.push({id:'m135',name:'MATH 135',full:'Algebra for Honours Mathematics',icon:'🔢',color:'#8b5cf6',dark:'#5b34c4',worlds:[
 {id:'logic',name:'Ch 1–2 · Logic & Language',nodes:[
  {id:'neg',name:'Negation Ninja',icon:'🥷',gen:g135neg,L:L(['Negating flips every quantifier: ∀ ↔ ∃. Keep the order and the domains.','Then negate the open sentence: ¬(&lt;) is ≥, ¬(=) is ≠.','De Morgan: ¬(A ∧ B) ≡ ¬A ∨ ¬B and ¬(A ∨ B) ≡ ¬A ∧ ¬B.','¬(A ⇒ B) ≡ A ∧ ¬B. A negated implication is an AND.'],'Negate: ∀ε &gt; 0, ∃δ &gt; 0, |x| &lt; δ ⇒ |f(x)| &lt; ε',['Flip quantifiers: ∃ε &gt; 0, ∀δ &gt; 0, …','Negate the implication A ⇒ B into A ∧ ¬B:','∃ε &gt; 0, ∀δ &gt; 0, |x| &lt; δ ∧ |f(x)| ≥ ε.'])},
  {id:'truth',name:'Truth Tables',icon:'🔣',gen:g135truth,L:L(['A ∧ B: true only if both are true. A ∨ B: true if at least one is.','A ⇒ B is false <b>only</b> when A is T and B is F.','A ⇔ B: true when A and B match.','Two statements are logically equivalent if their truth tables match on every row.'],'A = T, B = F. Evaluate (A ⇒ B) ∨ ¬A.',['A ⇒ B = T ⇒ F = F.','¬A = F.','F ∨ F = F.'])},
  {id:'impl',name:'Converse & Contrapositive',icon:'🔁',gen:g135impl,L:L(['For A ⇒ B:','Contrapositive ¬B ⇒ ¬A is <b>equivalent</b>.','Converse B ⇒ A and inverse ¬A ⇒ ¬B are NOT equivalent to the original.','Negation: A ∧ ¬B.'],'If x² &gt; 9 then x &gt; 3. Is the converse true?',['Converse: if x &gt; 3 then x² &gt; 9. True.','The original is false (x = −4): so a statement and its converse can differ.'])},
 ]},
 {id:'proofs',name:'Ch 3 · Proofs & Divisibility',nodes:[
  {id:'div',name:'Divisibility',icon:'➗',gen:g135div,L:L(['a | b means b = ka for some integer k.','TD: a | b and b | c ⇒ a | c.','DIC: a | b and a | c ⇒ a | (bx + cy) for all x, y ∈ ℤ.','BBD: a | b and b ≠ 0 ⇒ |a| ≤ |b|.','0 | 0 is true; 0 | b is false for b ≠ 0.'],'Prove: if a | b then a | b² + 3b.',['b = ka.','b² + 3b = k²a² + 3ka = a(k²a + 3k).','k²a + 3k ∈ ℤ, so a | b² + 3b.'])},
  {id:'quant',name:'Prove or Disprove',icon:'⚖️',gen:g135quant,L:L(['∀x, P(x): prove for an arbitrary x, or kill it with one counterexample.','∃x, P(x): give one example.','Order matters! ∀x ∃y lets y depend on x; ∃y ∀x needs one y that works for everything.'],'∀n ∈ ℤ ∃m ∈ ℤ, m &lt; n. True?',['Given n, take m = n − 1.','True. But ∃m ∀n, m &lt; n is false (no smallest integer).'])},
  {id:'method',name:'Pick the Method',icon:'🧭',gen:g135method,L:L(['<b>Direct:</b> assume the hypothesis, push forward.','<b>Contrapositive:</b> when ¬B is easier to work with (e.g. "n is odd").','<b>Contradiction:</b> irrationality, infinitude, "there is no…".','<b>Cases:</b> parity, sign, remainders.','<b>Counterexample:</b> to disprove ∀.'],null)},
  {id:'err',name:'Spot the Bad Line',icon:'🔍',gen:g135err,L:L(['Classic errors: dividing by something that could be 0.','Assuming what you want to prove (proving the converse).','Reusing the same variable for two different integers ("b = ka, c = ka").','Proving ∀ with examples. Induction with no base case.'],null)},
 ]},
 {id:'ind',name:'Ch 4 · Induction & Recurrences',nodes:[
  {id:'rec',name:'Sums & Recurrences',icon:'🔢',gen:g135rec,L:L(['Σ<sub>i=1</sub><sup>n</sup> f(i) = f(1) + ⋯ + f(n).','A recurrence defines each term from earlier ones; compute one at a time.','Σ<sub>i=1</sub><sup>k+1</sup> f(i) = Σ<sub>i=1</sub><sup>k</sup> f(i) + f(k+1): the key move in induction proofs.'],'x₁ = 1, x₂ = 2, xₙ = xₙ₋₁ + 2xₙ₋₂. Find x₄.',['x₃ = 2 + 2·1 = 4.','x₄ = 4 + 2·2 = 8.'])},
  {id:'ind',name:'Induction Logic',icon:'🪜',gen:g135ind,L:L(['Base case: prove P(first n).','Inductive hypothesis: assume P(k) for <b>some</b> k.','Inductive step: prove P(k + 1) USING the hypothesis.','Strong induction: assume P(1), …, P(k). Number of base cases = how far back the recurrence reaches.'],null)},
 ]},
 {id:'sets',name:'Ch 5 · Sets',nodes:[
  {id:'setops',name:'Set Operations',icon:'⭕',gen:g135setops,L:L(['S ∩ T: in both. S ∪ T: in at least one.','S − T: in S, not in T. S̄: in U, not in S.','|𝒫(S)| = 2<sup>|S|</sup>, |S × T| = |S|·|T|.'],'S = {1, 2, 3}, T = {2, 4}. Find S − T and |S × T|.',['S − T = {1, 3}.','|S × T| = 3·2 = 6.'])},
  {id:'setlogic',name:'Subsets & Proofs',icon:'⊆',gen:g135setlogic,L:L(['S ⊆ T: let x ∈ S be arbitrary, show x ∈ T.','S = T: show S ⊆ T AND T ⊆ S.','∈ vs ⊆: {1} ⊆ {1, 2} but {1} ∉ {1, 2}.','x ∈ {3k + 1 : k ∈ ℤ} iff x = 3k + 1 for some integer k.'],null)},
 ]},
 {id:'gcd',name:'Ch 6 · GCD & Primes',nodes:[
  {id:'divalg',name:'Division Algorithm',icon:'🍰',gen:g135divalg,L:L(['For a ∈ ℤ, b &gt; 0: unique q, r with a = qb + r, 0 ≤ r &lt; b.','For negative a, round q <b>down</b>: −17 = (−4)·5 + 3.'],'Divide −17 by 5.',['q = ⌊−17/5⌋ = ⌊−3.4⌋ = −4.','r = −17 − (−20) = 3. ✓ 0 ≤ 3 &lt; 5.'])},
  {id:'gcd',name:'Euclidean Algorithm',icon:'🧮',gen:g135gcd,L:L(['GCD WR: if a = qb + r then gcd(a, b) = gcd(b, r).','Repeat until the remainder is 0; the last non-zero remainder is the gcd.'],'gcd(84, 30)',['84 = 2·30 + 24','30 = 1·24 + 6','24 = 4·6 + 0','gcd = 6.'])},
  {id:'eea',name:'Bézout & EEA',icon:'🧷',gen:g135eea,L:L(['Bézout: gcd(a, b) = ax + by for some integers x, y.','EEA table: rows (x, y, r, q), new row = row₋₂ − q·row₋₁.','There are infinitely many (x, y). Always verify by plugging in.'],'Find x, y with 84x + 30y = 6.',['From the EA: 6 = 30 − 24 and 24 = 84 − 2·30.','6 = 30 − (84 − 2·30) = 3·30 − 84.','x = −1, y = 3.'])},
  {id:'gcdprops',name:'GCD Theorems',icon:'📜',gen:g135gcdprops,L:L(['GCD Characterization: if d | a, d | b, d ≥ 0 and ax + by = d, then d = gcd(a, b).','Coprimeness: gcd(a, b) = 1 ⇔ ax + by = 1 has a solution.','CAD: a | bc and gcd(a, b) = 1 ⇒ a | c.','PAD: p prime, p | ab ⇒ p | a or p | b.'],null)},
  {id:'ufc',name:'Prime Factorizations',icon:'🧱',gen:g135ufc,L:L(['UFT: every n &gt; 1 is a product of primes, uniquely up to order.','gcd: min exponent of each prime. lcm: max exponent.','# positive divisors of p₁<sup>e₁</sup>⋯pₖ<sup>eₖ</sup> is (e₁+1)⋯(eₖ+1).'],'How many positive divisors does 72 = 2³·3² have?',['(3 + 1)(2 + 1) = 12.'])},
 ]},
 {id:'cong',name:'Ch 7–8 · LDEs & Congruences',nodes:[
  {id:'lde',name:'Diophantine Equations',icon:'📐',gen:g135lde,L:L(['ax + by = c has integer solutions ⇔ d = gcd(a, b) divides c.','If (x₀, y₀) is one solution, all are x = x₀ + (b/d)n, y = y₀ − (a/d)n.','Find (x₀, y₀): EEA for ax + by = d, then multiply by c/d.'],'Solve 6x + 9y = 21.',['d = 3 | 21 ✓.','6(−1) + 9(1) = 3, times 7: x₀ = −7, y₀ = 7.','x = −7 + 3n, y = 7 − 2n, n ∈ ℤ.'])},
  {id:'cong',name:'Congruence Power',icon:'🔁',gen:g135cong,L:L(['a ≡ b (mod m) ⇔ m | (a − b).','You can add, multiply and raise to powers (CAM, CP) but you can NOT reduce exponents mod m.','For big powers with composite m: find the cycle of powers.'],'Last digit of 7²⁰²⁶?',['Powers of 7 mod 10: 1, 7, 9, 3, then repeat (cycle 4).','2026 = 4·506 + 2, so 7²⁰²⁶ ≡ 7² ≡ 9.'])},
  {id:'lct',name:'Linear Congruences',icon:'🎯',gen:g135lct,L:L(['LCT: ax ≡ c (mod m) is solvable ⇔ d = gcd(a, m) | c.','Then the solution is one class mod m/d (which is d classes mod m).'],'Solve 4x ≡ 6 (mod 10).',['d = 2 | 6 ✓. Divide: 2x ≡ 3 (mod 5).','[2]⁻¹ = [3] in ℤ₅: x ≡ 9 ≡ 4 (mod 5).'])},
 ]},
 {id:'zm',name:'§8.6 · ℤₘ Arithmetic',nodes:[
  {id:'warm',name:'ℤₘ Warm-up',icon:'➕',gen:Q8.warm,L:L(['[a] is the set of every integer ≡ a (mod m).','[a] + [b] = [a + b], [a][b] = [ab]: compute, then reduce to 0…m − 1.','Negatives: add m until you\'re in range.'],'In ℤ₇: [5][4] + [6]',['[20 + 6] = [26].','26 = 3·7 + 5 ⇒ [5].'])},
  {id:'inv',name:'Inverse Hunter',icon:'🎯',gen:Q8.inv,L:L(['INV ℤₘ: [a]⁻¹ exists ⇔ gcd(a, m) = 1, and it is unique.','Find it with the EEA on ax + my = 1: [a]⁻¹ = [x].','Always check: a·answer ≡ 1 (mod m).'],'[5]⁻¹ in ℤ₁₂?',['gcd(5, 12) = 1 ✓.','5·5 = 25 = 2·12 + 1, so [5]⁻¹ = [5].'])},
  {id:'mat',name:'MAT Master',icon:'🧮',gen:Q8.mat,L:L(['[a][x] = [c] in ℤₘ, d = gcd(a, m).','d ∤ c → no solutions.','d | c → exactly d solutions: x₀, x₀ + m/d, …'],'[9][x] = [12] in ℤ₁₅',['d = 3 | 12 → 3 solutions.','Divide by 3: 3x ≡ 4 (mod 5) → x ≡ 3 (mod 5).','{[3], [8], [13]}.'])},
  {id:'sys',name:'System Solver',icon:'⚔️',gen:Q8.sys,L:L(['Solve like regular algebra, but multiply by an inverse instead of dividing.','In ℤₚ (p prime) every non-zero class has an inverse.','Always check both equations.'],null)},
 ]},
 {id:'flt',name:'§8.7 · Fermat\'s Little Theorem',nodes:[
  {id:'flt',name:'Fermat Power',icon:'⚡',gen:Q8.flt,L:L(['FℓT: p prime, p ∤ a ⇒ a<sup>p−1</sup> ≡ 1 (mod p).','Reduce the base mod p, the exponent mod <b>p − 1</b>.','State "p is prime and p ∤ a" every time.','[a]⁻¹ = [a<sup>p−2</sup>] in ℤₚ.'],'Remainder of 3¹⁰⁰ ÷ 7',['7 prime, 7 ∤ 3: 3⁶ ≡ 1.','100 = 6·16 + 4 ⇒ 3¹⁰⁰ ≡ 3⁴ = 81 ≡ 4.'])},
  {id:'poly',name:'Polynomial Crusher',icon:'🔨',gen:Q8.poly,L:L(['Corollary: xᵖ ≡ x (mod p) for EVERY integer x.','So knock (p − 1) off exponents until they\'re in 1…p − 1.','Reduce coefficients mod p, then test all p values.'],null)},
  {id:'trap',name:'Trap Detector',icon:'🪤',gen:Q8.trap,L:L(['Is the modulus prime? Is the gcd 1? Is p ∤ a?','Unique mod <i>what</i>? (CRT: m₁m₂, not m₁ + m₂.)'],null)},
 ]},
 {id:'crt',name:'§8.8–8.9 · Chinese Remainder Theorem',nodes:[
  {id:'crt2',name:'CRT Duo',icon:'🔗',gen:Q8.crt2,L:L(['CRT: gcd(m₁, m₂) = 1 ⇒ unique solution mod m₁m₂.','n = m₁x + a₁ → plug into the 2nd → solve for x → back-substitute.'],'n ≡ 2 (mod 3), n ≡ 3 (mod 5)',['n = 3x + 2 ⇒ 3x + 2 ≡ 3 (mod 5) ⇒ 3x ≡ 1 ⇒ x ≡ 2.','n = 8 ⇒ n ≡ 8 (mod 15).'])},
  {id:'crt3',name:'CRT Trio',icon:'🧩',gen:Q8.crt3,L:L(['Pairwise coprime moduli: combine two at a time (GCRT).'],null)},
  {id:'crtd',name:'CRT in Disguise',icon:'🕵️',gen:Q8.crtd,L:L(['Isolate x first: bx + k ≡ r ⇒ x ≡ b⁻¹(r − k).','"Remainder a when divided by m" means n ≡ a (mod m).','SMT: n ≡ a (mod m₁) and (mod m₂) with coprime moduli ⇔ n ≡ a (mod m₁m₂).'],null)},
 ]},
 {id:'rsa',name:'Ch 9 · RSA',nodes:[
  {id:'rsa',name:'RSA by Hand',icon:'🔐',gen:g135rsa,L:L(['Pick primes p, q. n = pq. Public e with gcd(e, (p−1)(q−1)) = 1.','Private d: ed ≡ 1 (mod (p−1)(q−1)), 0 &lt; d &lt; (p−1)(q−1).','Encrypt: C ≡ Mᵉ (mod n). Decrypt: R ≡ Cᵈ (mod n).'],'p = 3, q = 11, e = 3. Find d.',['(p−1)(q−1) = 20.','3d ≡ 1 (mod 20) ⇒ d = 7 (21 = 20 + 1).'])},
  {id:'rsac',name:'RSA Concepts',icon:'🧠',gen:g135rsac,L:L(['Public: (e, n). Private: d (and p, q).','Security rests on factoring n being hard.','Proof uses FℓT and splitting the modulus.'],null)},
 ]},
 {id:'cx',name:'Ch 10 · Complex Numbers',nodes:[
  {id:'cstd',name:'Standard Form',icon:'🅸',gen:g135cstd,L:L(['i² = −1. Multiply by FOIL.','Divide: multiply top and bottom by the conjugate of the bottom.','|a + bi| = √(a² + b²), z·z̄ = |z|².'],'(1 + 2i)/(3 − i)',['× (3 + i)/(3 + i).','Top: 3 + i + 6i + 2i² = 1 + 7i. Bottom: 10.','= 1/10 + (7/10)i.'])},
  {id:'cpolar',name:'Polar Form',icon:'🧭',gen:g135cpolar,L:L(['z = r(cos θ + i sin θ), r = |z|.','Pick θ by the quadrant of (a, b), not just tan⁻¹(b/a).'],'−1 + √3i in polar form',['r = 2.','cos θ = −1/2, sin θ = √3/2 ⇒ θ = 2π/3.','2(cos 2π/3 + i sin 2π/3).'])},
  {id:'dm',name:'De Moivre',icon:'🌀',gen:g135demoivre,L:L(['DMT: (r(cos θ + i sin θ))ⁿ = rⁿ(cos nθ + i sin nθ).','Reduce nθ mod 2π, then convert back.'],'(1 + i)⁸',['1 + i = √2(cos π/4 + i sin π/4).','(√2)⁸ = 16, 8·π/4 = 2π.','= 16.'])},
  {id:'roots',name:'Complex Roots',icon:'🌸',gen:g135croots,L:L(['CNRT: zⁿ = w (w ≠ 0) has exactly n distinct roots.','Roots: r<sup>1/n</sup>(cos((θ + 2kπ)/n) + i sin(…)), k = 0…n−1: equally spaced on a circle.'],null)},
  {id:'cpoly',name:'Polynomials over ℂ',icon:'📈',gen:g135cpoly,L:L(['FTA: degree n ⇒ n roots (with multiplicity) in ℂ.','CJRT: real coefficients ⇒ non-real roots come in conjugate pairs.','Quadratic formula still works; √(negative) gives i.'],null)},
 ]},
]});
