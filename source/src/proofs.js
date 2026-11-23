// ===== MATH 135 proof practice =====
// Each proof: lines [{t, why}] and bad lines [{t, err}] (a tempting wrong line and why it fails).
// proofQ turns one proof into 4 parts: next line, justification, find the bad line, why it is wrong.
const PF={};
const pf=(k,thm,lines,bad)=>{(PF[k]=PF[k]||[]).push({thm,lines:lines.map(([t,why])=>({t,why})),bad:bad.map(([t,err])=>({t,err}))})};

pf('m135_div','Prove: if a | b and b | c, then a | c.',[
 ['Assume a | b and b | c.','Assumption'],
 ['Then b = ka and c = ℓb for some integers k and ℓ.','Definition of divisibility'],
 ['Substituting, c = ℓ(ka) = (ℓk)a.','Algebra'],
 ['ℓk is an integer, since integers are closed under multiplication.','Closure of ℤ'],
 ['Therefore a | c.','Definition of divisibility']],[
 ['Then b = ka and c = kb for some integer k.','It reuses k for two different integers, which secretly assumes the two multipliers are equal.'],
 ['So c/a = ℓk, which is an integer.','It divides by a, which might be 0, and divisibility is defined without division.'],
 ['Since a | c, write c = ma for some integer m.','It uses the conclusion a | c as a step, so the argument is circular.']]);

pf('m135_div','Prove: if a | b and a | c, then a | (3b − 2c).',[
 ['Assume a | b and a | c.','Assumption'],
 ['Then b = ka and c = ℓa for some integers k and ℓ.','Definition of divisibility'],
 ['3b − 2c = 3ka − 2ℓa = (3k − 2ℓ)a.','Algebra'],
 ['3k − 2ℓ is an integer.','Closure of ℤ'],
 ['Therefore a | (3b − 2c).','Definition of divisibility']],[
 ['Then b = ka and c = ka for some integer k.','Using one k for both forces b = c, which is not given.'],
 ['Since a | (3b − 2c), write 3b − 2c = ma.','That assumes the conclusion.'],
 ['So 3b − 2c = (3k + 2ℓ)a.','The algebra is wrong: −2ℓa gives −2ℓ, not +2ℓ.']]);

pf('m135_method','Prove: if n² is even, then n is even.',[
 ['We prove the contrapositive: if n is odd, then n² is odd.','Contrapositive'],
 ['Assume n is odd, so n = 2k + 1 for some integer k.','Definition of odd'],
 ['Then n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1.','Algebra'],
 ['2k² + 2k is an integer, so n² is odd.','Definition of odd'],
 ['By the contrapositive, if n² is even then n is even.','Contrapositive']],[
 ['We prove the converse: if n is even, then n² is even.','The converse is a different statement, so proving it proves nothing here.'],
 ['Assume n² is even, so n² = 2k and n = √(2k), which is even.','√(2k) need not be an integer, let alone even.'],
 ['Then n² = 2k + 1 as well.','It reuses k from n = 2k + 1, which is false (try n = 3).']]);

pf('m135_ind','Prove: 1 + 2 + ⋯ + n = n(n + 1)/2 for all n ≥ 1.',[
 ['Base case n = 1: the left side is 1 and the right side is 1(2)/2 = 1.','Base case'],
 ['Assume 1 + 2 + ⋯ + k = k(k + 1)/2 for some k ≥ 1.','Inductive hypothesis'],
 ['Then 1 + ⋯ + k + (k + 1) = k(k + 1)/2 + (k + 1).','Inductive hypothesis'],
 ['= (k + 1)(k + 2)/2.','Algebra'],
 ['By the Principle of Mathematical Induction, the formula holds for all n ≥ 1.','POMI']],[
 ['Assume 1 + 2 + ⋯ + n = n(n + 1)/2 for all n ≥ 1.','That assumes the whole statement. The hypothesis is for one arbitrary k.'],
 ['Checking n = 2 and n = 3 also works, so it holds for all n.','Examples never prove a ∀ statement.'],
 ['So the sum up to k + 1 is (k + 1)(k + 2)/2, as required.','It states the goal without deriving it from the hypothesis.']]);

pf('m135_ind','Prove: 3 | (4ⁿ − 1) for all n ≥ 0.',[
 ['Base case n = 0: 4⁰ − 1 = 0, and 3 | 0.','Base case'],
 ['Assume 3 | (4ᵏ − 1) for some k ≥ 0, so 4ᵏ − 1 = 3m for some integer m.','Inductive hypothesis'],
 ['Then 4ᵏ⁺¹ − 1 = 4·4ᵏ − 1 = 4(3m + 1) − 1.','Inductive hypothesis'],
 ['= 12m + 3 = 3(4m + 1).','Algebra'],
 ['So 3 | (4ᵏ⁺¹ − 1), and by POMI the statement holds for all n ≥ 0.','POMI']],[
 ['Then 4ᵏ⁺¹ − 1 = 4(4ᵏ − 1), so 3 divides it.','4(4ᵏ − 1) = 4ᵏ⁺¹ − 4, not 4ᵏ⁺¹ − 1.'],
 ['Assume 3 | (4ⁿ − 1) for every n ≥ 0.','That assumes the conclusion instead of one case k.'],
 ['Since 3 | (4ᵏ⁺¹ − 1), we get 3 | (4ᵏ − 1).','This runs backwards: the step must go from k to k + 1.']]);

pf('m135_setlogic','Prove: A ∩ B ⊆ A ∪ B.',[
 ['Let x ∈ A ∩ B be arbitrary.','Definition of ⊆'],
 ['Then x ∈ A and x ∈ B.','Definition of ∩'],
 ['In particular, x ∈ A.','Logic'],
 ['So x ∈ A or x ∈ B, which means x ∈ A ∪ B.','Definition of ∪'],
 ['Since x was arbitrary, A ∩ B ⊆ A ∪ B.','Definition of ⊆']],[
 ['Let x = 1, which is in A ∩ B.','A specific element proves nothing about every element.'],
 ['Then x ∈ A or x ∈ B, so x ∈ A ∩ B.','"Or" does not give membership in the intersection.'],
 ['Therefore A ∪ B ⊆ A ∩ B.','That is the reverse inclusion, which is false in general.']]);

pf('m135_gcdprops','Prove: if gcd(a, b) = 1 and a | bc, then a | c.',[
 ['Assume gcd(a, b) = 1 and a | bc.','Assumption'],
 ['There are integers x, y with ax + by = 1.','Bézout\'s Lemma'],
 ['Multiplying by c: a(cx) + (bc)y = c.','Algebra'],
 ['a | a and a | bc, so a divides a(cx) + (bc)y.','DIC'],
 ['That combination equals c, so a | c.','Algebra']],[
 ['Since a | bc, a | b or a | c.','That is PAD, which needs a to be prime (6 | 4·9 but 6 ∤ 4 and 6 ∤ 9).'],
 ['Dividing ax + by = 1 by a gives x + by/a = 1/a.','Division leaves the integers, and a could be 0.'],
 ['Since gcd(a, b) = 1, a = 1.','Coprime does not mean a = 1 (gcd(4, 9) = 1).']]);

pf('m135_gcdprops','Prove: gcd(a, a + 1) = 1 for every integer a.',[
 ['Let x = −1 and y = 1.','Choice of witnesses'],
 ['Then a·x + (a + 1)·y = −a + a + 1 = 1.','Algebra'],
 ['So there are integers x, y with ax + (a + 1)y = 1.','Logic'],
 ['By CCT, gcd(a, a + 1) = 1.','CCT']],[
 ['By Bézout\'s Lemma, ax + (a + 1)y = 1 means gcd(a, a + 1) = 1.','Bézout goes the other way. Reaching 1 needs CCT (or GCD CT).'],
 ['a and a + 1 are both prime, so their gcd is 1.','Most consecutive integers are not both prime (8 and 9).'],
 ['So gcd(a, a + 1) = (a + 1) − a.','A difference is not automatically the gcd.']]);

pf('m135_cong','Prove: if a ≡ b (mod m), then a² ≡ b² (mod m).',[
 ['Assume a ≡ b (mod m), so m | (a − b).','Definition of congruence'],
 ['Then a − b = km for some integer k.','Definition of divisibility'],
 ['a² − b² = (a − b)(a + b) = km(a + b).','Algebra'],
 ['k(a + b) is an integer, so m | (a² − b²).','Definition of divisibility'],
 ['Therefore a² ≡ b² (mod m).','Definition of congruence']],[
 ['a² − b² = (a − b)², so m | (a² − b²).','(a − b)² = a² − 2ab + b², not a² − b².'],
 ['Since a ≡ b, a = b, so a² = b².','Congruent numbers need not be equal (2 ≡ 7 mod 5).'],
 ['Divide both sides of a ≡ b by a to get 1 ≡ b/a.','Division is not allowed in congruences without an inverse.']]);

pf('m135_cong','Prove: n² ≡ 0 or 1 (mod 4) for every integer n.',[
 ['Every integer n is even or odd.','Cases (parity)'],
 ['Case 1: n = 2k. Then n² = 4k² ≡ 0 (mod 4).','Algebra'],
 ['Case 2: n = 2k + 1. Then n² = 4k² + 4k + 1 ≡ 1 (mod 4).','Algebra'],
 ['The cases cover every integer, so n² ≡ 0 or 1 (mod 4).','Cases (parity)']],[
 ['Checking n = 1, 2, 3 gives 1, 0, 1, so it holds for all n.','Examples cannot prove a statement about every integer.'],
 ['Case 1: n = 2k. Then n² = 2k² ≡ 0 (mod 4).','(2k)² = 4k², not 2k², and 2k² need not be divisible by 4.'],
 ['Case 2: n = 2k + 1. Then n² = 4k² + 1.','The middle term 4k is missing from (2k + 1)².']]);

pf('m135_inv','Prove: in ℤₘ, if [a] has an inverse, it is unique.',[
 ['Suppose [b] and [c] are both inverses of [a].','Assumption'],
 ['Then [a][b] = [1] and [a][c] = [1].','Definition of inverse'],
 ['[b] = [b][1] = [b]([a][c]).','Algebra'],
 ['= ([b][a])[c] = [1][c] = [c].','Associativity and commutativity'],
 ['So [b] = [c]: the inverse is unique.','Conclusion']],[
 ['Since [a][b] = [1], [b] = [1]/[a].','Division is not defined in ℤₘ.'],
 ['Then b = 1/a and c = 1/a, so b = c.','1/a is not an integer, and classes are not fractions.'],
 ['Then [a][b] = [1], so [b] = [1].','Only [a] = [1] would give that.']]);

pf('m135_flt','Prove: if p is prime and p ∤ a, then a^(2(p−1)) ≡ 1 (mod p).',[
 ['p is prime and p ∤ a.','Assumption'],
 ['a^(p−1) ≡ 1 (mod p).','FℓT'],
 ['Squaring both sides: (a^(p−1))² ≡ 1² (mod p).','PC (powers)'],
 ['So a^(2(p−1)) ≡ 1 (mod p).','Exponent rules']],[
 ['By FℓT, aᵖ ≡ 1 (mod p).','FℓT gives a^(p−1) ≡ 1; aᵖ ≡ a.'],
 ['Reducing the exponent mod p, 2(p − 1) ≡ −2, so a^(2(p−1)) ≡ a⁻².','Exponents reduce mod p − 1, never mod p.'],
 ['Since p ∤ a, a ≡ 1 (mod p).','p ∤ a only means a ≢ 0.']]);

pf('m135_cstd','Prove: z·z̄ = |z|² for every z ∈ ℂ.',[
 ['Write z = x + yi with x, y ∈ ℝ.','Standard form'],
 ['Then z̄ = x − yi.','Definition of conjugate'],
 ['z·z̄ = (x + yi)(x − yi) = x² − y²i².','Algebra'],
 ['= x² + y², since i² = −1.','i² = −1'],
 ['= |z|², by the definition of modulus.','Definition of modulus']],[
 ['Then z̄ = −x + yi.','The conjugate flips the sign of the imaginary part, not the real part.'],
 ['z·z̄ = x² − y².','i² = −1 turns −y²i² into +y².'],
 ['Write z = x + yi with x, y ∈ ℂ.','x and y must be real for standard form.']]);

pf('m135_cpoly','Prove: if p(x) has real coefficients and p(z) = 0, then p(z̄) = 0.',[
 ['Write p(x) = aₙxⁿ + ⋯ + a₁x + a₀ with every aₖ ∈ ℝ.','Assumption'],
 ['Since p(z) = 0, the conjugate of p(z) is 0̄ = 0.','Conjugate of a real number'],
 ['The conjugate of p(z) equals āₙz̄ⁿ + ⋯ + ā₁z̄ + ā₀.','PCJ (conjugates of sums, products, powers)'],
 ['Each aₖ is real, so āₖ = aₖ, and that expression is p(z̄).','Conjugate of a real number'],
 ['Therefore p(z̄) = 0.','Conclusion']],[
 ['Since z is a root, z̄ = z.','Only real numbers equal their conjugates.'],
 ['Each aₖ is complex, so āₖ = −aₖ.','The aₖ are real, and conjugation does not negate.'],
 ['The conjugate of p(z) equals p(z), so p(z̄) = 0.','The conjugate of p(z) is p(z̄) here, not p(z).']]);

// Reasons offered as distractors for the "what justifies" part.
const PF_REASONS=['Assumption','Definition of divisibility','Algebra','Closure of ℤ','DIC','TD','Bézout\'s Lemma','CCT','GCD CT','PAD','Inductive hypothesis','Base case','POMI','Contrapositive','Definition of odd','Definition of congruence','PC (powers)','FℓT','Definition of ⊆','Definition of ∩','Definition of ∪','Logic','Definition of conjugate','Definition of modulus','i² = −1','Definition of inverse','Associativity and commutativity','Cases (parity)','PCJ (conjugates of sums, products, powers)','Conjugate of a real number','Exponent rules','Standard form'];

function proofQ(P){const L=P.lines,n=L.length,num=(arr)=>`<ol class="pf">${arr.map(l=>`<li>${l}</li>`).join('')}</ol>`;const parts=[];
 // a) next line
 const k=1+Math.floor(Math.random()*(n-2));const b1=pick(P.bad);const later=L.slice(k+1).map(l=>l.t);
 parts.push(mc(`<div class="pf-l">Proof so far</div>${num(L.slice(0,k).map(l=>l.t))}Which line comes next?`,L[k].t,[b1.t,...(later.length?[pick(later)]:[]),...P.bad.filter(b=>b!==b1).map(b=>b.t)],
  [`Next is line ${k+1}: ${L[k].t} (${L[k].why}).`,`Not “${b1.t}”: ${b1.err}`],'What does the last line give you, and what does the goal still need?'));
 // b) justification
 const js=L.map((l,i)=>i).filter(i=>!/^(Assumption|Conclusion)$/.test(L[i].why));const j=pick(js);const others=shuffle(PF_REASONS.filter(r=>r!==L[j].why&&!L.some(l=>l.why===r))).slice(0,3);
 parts.push(mc(`${num(L.map(l=>l.t))}What justifies line ${j+1}?`,L[j].why,others,[`Line ${j+1} follows from ${L[j].why}.`],'Name the definition or theorem the line uses.'));
 // c) find the bad line, d) why it fails
 const f=1+Math.floor(Math.random()*(n-1));const b2=pick(P.bad);const shown=L.map((l,i)=>i===f?b2.t:l.t);const nums=shuffle(L.map((_,i)=>i).filter(i=>i!==f)).slice(0,3);
 parts.push(mc(`${num(shown)}One line is wrong. Which one?`,`Line ${f+1}`,nums.map(i=>`Line ${i+1}`),[`Line ${f+1} is wrong. It should be: ${L[f].t}`],'Check each line against only the lines above it.',{keep:false}));
 const errs=shuffle(P.bad.filter(b=>b!==b2).map(b=>b.err).concat(['Nothing is wrong with it; another line is the problem.']));
 parts.push(mc(`Line ${f+1} said: “${b2.t}”. Why is it wrong?`,b2.err,errs,[b2.err]));
 return multi(`<b>${P.thm}</b>`,parts)}

// Wire proofs into their topics (about 1 in 4 practice questions there) and add a Proof Lab topic.
(()=>{const C=COURSES.find(c=>c.id==='m135');const all=[];
 for(const w of C.worlds)for(const n of w.nodes){const list=PF['m135_'+n.id];if(!list)continue;all.push(...list);const base=n.gen;n.gen=()=>Math.random()<.25?proofQ(pick(list)):base()}
 const W=C.worlds.find(w=>w.id==='proofs');W.nodes.push({id:'prooflab',name:'Proof Lab',icon:'∎',gen:()=>proofQ(pick(all))})})();
