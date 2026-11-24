// ===== Rich lessons: MATH 135 =====
const LX={};
const X=(k,o)=>{LX[k]=o};

// ---------- Logic ----------
X('m135_neg',{
 why:'Every "disprove" question and every proof by contradiction starts with a correct negation.',
 idea:['To negate a statement, push the ¬ inward one layer at a time. Each quantifier flips (∀ becomes ∃ and ∃ becomes ∀), the domains and the order stay the same, and the open sentence at the end gets negated.',
  'Connectives follow De Morgan. An AND becomes an OR, an OR becomes an AND, and an implication A ⇒ B becomes A ∧ ¬B. The negation of an implication is never another implication.'],
 keys:[['¬(∀x ∈ S, P(x))','∃x ∈ S, ¬P(x)'],['¬(∃x ∈ S, P(x))','∀x ∈ S, ¬P(x)'],['¬(A ∧ B)','¬A ∨ ¬B'],['¬(A ∨ B)','¬A ∧ ¬B'],['¬(A ⇒ B)','A ∧ ¬B'],['¬(a &lt; b)','a ≥ b (not a &gt; b)']],
 ex:[{q:'Negate: ∀x ∈ ℝ, ∃y ∈ ℝ, x &lt; y ⇒ x² &lt; y².',s:['Flip ∀x to ∃x and ∃y to ∀y. Keep the order: x first, then y.','Negate the implication: ¬(A ⇒ B) is A ∧ ¬B.','¬(x² &lt; y²) is x² ≥ y².'],a:'∃x ∈ ℝ, ∀y ∈ ℝ, x &lt; y ∧ x² ≥ y²'},
  {q:'Negate: "Every integer n with n² even is even."',s:['Write it formally: ∀n ∈ ℤ, (n² even ⇒ n even).','Flip the quantifier and negate the implication.'],a:'∃n ∈ ℤ, n² is even and n is odd.'}],
 traps:['Negating &lt; as &gt;. You lose the equality case; it must be ≥.','Changing the domain. ¬(∀x ∈ ℤ, …) is still about x ∈ ℤ, never x ∉ ℤ.','Writing ¬(A ⇒ B) as A ⇒ ¬B or ¬A ⇒ ¬B.','Swapping the order of quantifiers while negating.'],
 tip:'Before you negate, rewrite the sentence in symbols. Most mistakes happen when negating English directly.'});

X('m135_truth',{
 why:'Truth tables are the official way to prove two statements are logically equivalent.',
 idea:['A truth table lists every combination of truth values for the variables: 2 rows for one variable, 4 for two, 8 for three. You build the final column from smaller pieces, one column per sub-expression.',
  'Two statements are logically equivalent when their final columns match on every row. A tautology is true on every row; a contradiction is false on every row.'],
 keys:[['A ∧ B','true only when both are true'],['A ∨ B','false only when both are false (inclusive or)'],['A ⇒ B','false only when A is T and B is F'],['A ⇔ B','true when A and B have the same value'],['Rows','2ⁿ rows for n variables']],
 ex:[{q:'Show that A ⇒ B is logically equivalent to ¬A ∨ B.',s:['Rows (A, B): TT, TF, FT, FF.','A ⇒ B: T, F, T, T.','¬A: F, F, T, T. Then ¬A ∨ B: T, F, T, T.','The columns match on every row.'],a:'Equivalent: A ⇒ B ≡ ¬A ∨ B.'}],
 traps:['Thinking a false hypothesis makes A ⇒ B false. It is vacuously true.','Missing rows. With 3 variables you need all 8.','Reading "or" as exclusive. In MATH 135, ∨ is inclusive.'],
 tip:'Use a fixed row order (TT, TF, FT, FF) every time so it\'s easy to compare tables.'});

X('m135_impl',{
 why:'Proving the contrapositive is one of your main proof methods, so you need to know which variations are equivalent.',
 idea:['Start from A ⇒ B. The contrapositive ¬B ⇒ ¬A says exactly the same thing: if B fails, A must have failed too.',
  'The converse B ⇒ A and the inverse ¬A ⇒ ¬B are different statements. They are equivalent to each other (each is the other\'s contrapositive), but not to A ⇒ B.'],
 keys:[['Original','A ⇒ B'],['Contrapositive','¬B ⇒ ¬A (equivalent to the original)'],['Converse','B ⇒ A (not equivalent)'],['Inverse','¬A ⇒ ¬B (not equivalent)'],['Negation','A ∧ ¬B'],['A ⇔ B','(A ⇒ B) ∧ (B ⇒ A)']],
 ex:[{q:'Statement: "If n² is odd, then n is odd." Write the contrapositive and converse.',s:['A: n² is odd. B: n is odd.','Contrapositive ¬B ⇒ ¬A: if n is even, then n² is even.','Converse B ⇒ A: if n is odd, then n² is odd.'],a:'The contrapositive is the easy one to prove: n = 2k gives n² = 4k², which is even.'}],
 traps:['Using the converse in a proof. Proving B ⇒ A does not prove A ⇒ B.','Forgetting that an "if and only if" needs both directions.'],
 tip:'Prove by contrapositive when ¬B gives you something concrete to work with, such as "n is even means n = 2k".'});

// ---------- Proofs ----------
X('m135_div',{
 why:'Divisibility is the language of the whole number theory half of the course.',
 idea:['a | b means b = ka for some integer k. It is a statement, not a number, so it is true or false. To use it, immediately write b = ka. To prove it, find the integer k.',
  'Three facts do most of the work. TD chains divisibility. DIC says a divisor of b and c divides every integer combination of them. BBD bounds sizes.'],
 keys:[['a | b','∃k ∈ ℤ, b = ka'],['TD (Transitivity)','a | b and b | c ⇒ a | c'],['DIC','a | b and a | c ⇒ a | (bx + cy) for all x, y ∈ ℤ'],['BBD','a | b and b ≠ 0 ⇒ |a| ≤ |b|'],['Zero','every a divides 0; 0 | b only when b = 0']],
 ex:[{q:'Prove: if a | b and a | (b + c), then a | c.',s:['From a | b and a | (b + c), DIC with x = −1, y = 1 gives a | (−b + (b + c)).','−b + (b + c) = c.'],a:'So a | c.'},
  {q:'Is the converse of DIC true? "If a | (b + c), then a | b and a | c."',s:['Try a = 2, b = 1, c = 1.','2 | 2, but 2 ∤ 1.'],a:'False. One counterexample is enough.'}],
 traps:['Writing a | b = k. Divisibility is not a number.','Using the same k twice: if a | b and a | c, write b = ka and c = ℓa with different letters.','Dividing: never write b/a unless you\'ve shown it\'s an integer.'],
 tip:'In a proof, state the theorem by name (TD, DIC, BBD). Markers look for it.'});

X('m135_quant',{
 why:'Half of a proof is knowing what you must show, and that depends entirely on the quantifiers.',
 idea:['To prove ∀x ∈ S, P(x), take an arbitrary x ∈ S and prove P(x) for it. To disprove it, find one counterexample.',
  'To prove ∃x ∈ S, P(x), give one specific x and check it. To disprove it, prove ∀x ∈ S, ¬P(x).',
  'Order matters. In ∀x ∃y, y may depend on x. In ∃y ∀x, a single y must work for every x.'],
 keys:[['Prove ∀','arbitrary element, general argument'],['Disprove ∀','one counterexample'],['Prove ∃','one example, verified'],['Disprove ∃','prove the ∀¬ statement'],['∀x ∃y','y can depend on x'],['∃y ∀x','one y for all x (much stronger)']],
 ex:[{q:'True or false: ∀x ∈ ℝ, ∃y ∈ ℝ, x + y = 0.',s:['Given x, choose y = −x.','Then x + y = 0.'],a:'True: y depends on x.'},
  {q:'True or false: ∃y ∈ ℝ, ∀x ∈ ℝ, x + y = 0.',s:['Suppose such a y exists. x = 0 forces y = 0.','But x = 1 then gives 1 + 0 ≠ 0.'],a:'False. No single y works for every x.'}],
 traps:['"Proving" a ∀ statement with a few examples.','Picking a specific value for an arbitrary element.','Treating ∀x ∃y and ∃y ∀x as the same statement.']});

X('m135_method',{
 why:'Choosing the right method early saves a page of algebra.',
 idea:['Look at what the statement gives you and what it asks for.','Direct proof suits hypotheses you can unfold ("a | b" becomes b = ka). Contrapositive suits a negated conclusion that is easier to start from ("n is not prime", "n is odd"). Contradiction suits "there is no…", irrationality and infinitely many. Cases suit parity, sign and remainders. Induction suits statements about every n ≥ n₀ built from smaller cases.'],
 keys:[['Direct','assume A, derive B'],['Contrapositive','assume ¬B, derive ¬A'],['Contradiction','assume the statement is false, reach an impossibility'],['Cases','split the domain; every case must be covered'],['Induction','base case + (P(k) ⇒ P(k + 1))'],['Counterexample','disproves a ∀ statement']],
 ex:[{q:'Prove √2 is irrational. Which method?',s:['"Irrational" means "not rational", so the conclusion is already negative.','Assume √2 = a/b in lowest terms, show a and b are both even.'],a:'Contradiction.'},
  {q:'Prove: if n² is even, then n is even.',s:['Directly, "n² = 2k" doesn\'t tell you much about n.','Contrapositive: if n is odd, n = 2k + 1, so n² = 4k² + 4k + 1 is odd.'],a:'Contrapositive.'}],
 traps:['Starting a contradiction proof but never using the assumption.','Missing a case, such as forgetting n = 0 or negative numbers.']});

X('m135_err',{
 why:'Spotting bad lines trains you to check your own proofs before submitting.',
 idea:['A proof is only as good as its weakest line. The common failures: dividing by something that might be 0; assuming the conclusion; proving the converse; reusing a variable for two different integers; and checking examples instead of proving a ∀ statement.',
  'Read each line and ask two questions: what justifies this, and does it follow from earlier lines only?'],
 keys:[['Circular','the conclusion is used as a step'],['Division by 0','cancelling a factor that could be zero'],['Variable reuse','b = ka and c = ka forces b = c'],['Converse','proved B ⇒ A instead of A ⇒ B'],['Examples','n = 1, 2, 3 work, so it\'s true for all n']],
 ex:[{q:'"Let a = b. Then a² = ab, so a² − b² = ab − b², (a + b)(a − b) = b(a − b), so a + b = b and 2b = b, so 2 = 1." Find the bad line.',s:['Going from (a + b)(a − b) = b(a − b) to a + b = b divides by a − b.','Since a = b, a − b = 0.'],a:'The cancellation divides by zero.'}],
 traps:['Only checking that algebra is correct. Logic errors are just as fatal.']});

// ---------- Induction ----------
X('m135_rec',{
 why:'Sums and recurrences are what induction proofs are about.',
 idea:['Σ notation is shorthand for a sum: Σᵢ₌₁ⁿ f(i) = f(1) + f(2) + ⋯ + f(n). The index name doesn\'t matter.','A recurrence defines terms from earlier terms, e.g. x₁ = 1, xₙ = 2xₙ₋₁ + 1. To compute, go one term at a time. To prove a closed form, use induction.','The key move in induction on sums: peel off the last term, Σᵢ₌₁ᵏ⁺¹ f(i) = Σᵢ₌₁ᵏ f(i) + f(k + 1).'],
 keys:[['Σᵢ₌₁ⁿ i','n(n + 1)/2'],['Σᵢ₌₁ⁿ i²','n(n + 1)(2n + 1)/6'],['Σᵢ₌₀ⁿ rⁱ','(rⁿ⁺¹ − 1)/(r − 1), r ≠ 1'],['Peel off','Σᵢ₌₁ᵏ⁺¹ = Σᵢ₌₁ᵏ + (term k + 1)'],['Recurrence','each term from earlier ones, plus starting values']],
 ex:[{q:'x₁ = 1 and xₙ = 2xₙ₋₁ + 1. Find x₄ and guess a formula.',s:['x₂ = 2(1) + 1 = 3.','x₃ = 2(3) + 1 = 7.','x₄ = 2(7) + 1 = 15.','Pattern: one less than a power of 2.'],a:'x₄ = 15, and xₙ = 2ⁿ − 1 (prove it by induction).'}],
 traps:['Off-by-one: check where the index starts.','Pulling a factor out of Σ that depends on i.']});

X('m135_ind',{
 why:'Induction proves statements for every n from a base case onward, and it is on every MATH 135 exam.',
 idea:['Think of dominoes. The base case knocks over the first one. The inductive step shows that if domino k falls, so does domino k + 1. Together, every domino falls.',
  'In the inductive step, assume P(k) for an arbitrary k ≥ n₀ (the inductive hypothesis) and prove P(k + 1). You must actually use P(k); if you don\'t, something is off.',
  'Strong induction assumes P(n₀), …, P(k) all at once. Use it when P(k + 1) depends on several earlier cases, as with recurrences like xₙ = xₙ₋₁ + xₙ₋₂. You need as many base cases as the recurrence looks back.'],
 keys:[['Base case','prove P(n₀) directly'],['Inductive hypothesis','assume P(k) for some arbitrary k ≥ n₀'],['Inductive step','prove P(k + 1), using the IH'],['Strong induction','assume P(n₀), …, P(k)'],['Base cases needed','one per step the recurrence looks back']],
 ex:[{q:'Prove Σᵢ₌₁ⁿ (2i − 1) = n² for all n ≥ 1.',s:['Base case n = 1: left side 1, right side 1. ✓','IH: assume Σᵢ₌₁ᵏ (2i − 1) = k² for some k ≥ 1.','Σᵢ₌₁ᵏ⁺¹ (2i − 1) = k² + (2(k + 1) − 1), using the IH.','= k² + 2k + 1 = (k + 1)².'],a:'By the Principle of Mathematical Induction, it holds for all n ≥ 1.'}],
 traps:['Assuming P(k) for all k. That\'s the conclusion, not the hypothesis.','Writing the step as P(k + 1) ⇒ P(k), which is backwards.','Too few base cases with strong induction.','Starting with the equation you want and manipulating both sides.']});

// ---------- Sets ----------
X('m135_setops',{
 why:'Set operations come up everywhere, from logic to number theory to the solution sets of equations.',
 idea:['Think of each operation as a logical condition on an element x. Intersection is AND, union is OR, difference is "in the first, not the second", and complement is NOT (relative to a universal set).','The power set 𝒫(S) is the set of all subsets of S. The Cartesian product S × T is the set of all ordered pairs (s, t).'],
 keys:[['S ∩ T','x ∈ S ∧ x ∈ T'],['S ∪ T','x ∈ S ∨ x ∈ T'],['S − T','x ∈ S ∧ x ∉ T'],['S̄','x ∈ U ∧ x ∉ S'],['|𝒫(S)|','2^|S|'],['|S × T|','|S|·|T|'],['De Morgan for sets','complement of (S ∩ T) is S̄ ∪ T̄']],
 ex:[{q:'S = {1, 2, 3}, T = {2, 4}. Find S − T, S × T and |𝒫(S)|.',s:['S − T = {1, 3}.','S × T = {(1,2), (1,4), (2,2), (2,4), (3,2), (3,4)}.','|𝒫(S)| = 2³ = 8, including ∅ and S itself.'],a:'{1, 3}; 6 pairs; 8 subsets.'}],
 traps:['Forgetting ∅ is in every power set.','Treating (1, 2) and (2, 1) as the same pair. Order matters in S × T.']});

X('m135_setlogic',{
 why:'Subset and set-equality proofs follow a template, and markers expect it.',
 idea:['To show S ⊆ T, let x ∈ S be arbitrary and show x ∈ T. To show S = T, prove both S ⊆ T and T ⊆ S.','Watch the difference between ∈ and ⊆. ∈ means "is an element of". ⊆ means "every element of the left set is in the right set".'],
 keys:[['S ⊆ T','∀x, x ∈ S ⇒ x ∈ T'],['S = T','S ⊆ T and T ⊆ S'],['∅','subset of every set'],['{1} vs 1','{1} ⊆ {1, 2}, but {1} ∉ {1, 2}'],['Set builder','x ∈ {3k + 1 : k ∈ ℤ} ⇔ x = 3k + 1 for some k ∈ ℤ']],
 ex:[{q:'Prove {6k : k ∈ ℤ} ⊆ {2k : k ∈ ℤ}.',s:['Let x ∈ {6k : k ∈ ℤ}. Then x = 6k for some integer k.','x = 2(3k), and 3k ∈ ℤ.'],a:'So x ∈ {2k : k ∈ ℤ}.'}],
 traps:['Showing only one direction for set equality.','Using a specific element instead of an arbitrary one.']});

// ---------- GCD ----------
X('m135_divalg',{
 why:'The Division Algorithm underlies remainders, the Euclidean Algorithm and congruences.',
 idea:['For any integer a and positive integer b, there are unique integers q and r with a = qb + r and 0 ≤ r &lt; b. q is the quotient and r is the remainder.','The remainder is never negative. For negative a, round the quotient down, so −17 = (−4)(5) + 3, not (−3)(5) − 2.'],
 keys:[['DA','a = qb + r, 0 ≤ r &lt; b, q and r unique'],['Negative a','q = ⌊a/b⌋, so r stays in [0, b)'],['r = 0','exactly when b | a']],
 ex:[{q:'Apply the DA to a = −23, b = 7.',s:['−23/7 ≈ −3.29, so q = ⌊−3.29⌋ = −4.','r = −23 − (−4)(7) = −23 + 28 = 5.'],a:'−23 = (−4)(7) + 5.'}],
 traps:['A negative remainder.','Forgetting that b must be positive.']});

X('m135_gcd',{
 why:'gcd(a, b) is the most-used number in the course: it decides whether equations and congruences have solutions.',
 idea:['gcd(a, b) is the largest integer dividing both. The Euclidean Algorithm finds it fast using GCD WR: if a = qb + r, then gcd(a, b) = gcd(b, r).','Divide, keep the remainder, then repeat with (divisor, remainder). The last non-zero remainder is the gcd.'],
 keys:[['GCD WR','a = qb + r ⇒ gcd(a, b) = gcd(b, r)'],['gcd(a, 0)','|a|'],['Coprime','gcd(a, b) = 1'],['Signs','gcd(a, b) = gcd(|a|, |b|)']],
 ex:[{q:'Find gcd(1071, 462).',s:['1071 = 2·462 + 147.','462 = 3·147 + 21.','147 = 7·21 + 0.'],a:'gcd = 21, the last non-zero remainder.'}],
 traps:['Reporting the last remainder (0) instead of the last non-zero one.','Arithmetic slips. Check that the gcd divides both numbers at the end.']});

X('m135_eea',{
 why:'The EEA is how you actually solve Diophantine equations, find inverses and run RSA.',
 idea:['Bézout\'s Lemma: gcd(a, b) = ax + by for some integers x, y. The Extended Euclidean Algorithm finds such x and y alongside the gcd.','Keep a table with columns x, y, r, q. Start with rows (1, 0, a) and (0, 1, b). Each new row is (row two up) − q·(row one up), where q is the quotient of the two remainders above. Stop when r = 0; the row just above gives gcd = ax + by.'],
 keys:[['Bézout (BL)','∃x, y ∈ ℤ, ax + by = gcd(a, b)'],['Starting rows','(1, 0, a) and (0, 1, b)'],['New row','Rᵢ = Rᵢ₋₂ − qᵢ·Rᵢ₋₁'],['Check','always verify ax + by = d at the end']],
 ex:[{q:'Find x, y with 56x + 15y = gcd(56, 15).',s:['Rows: (1, 0, 56), (0, 1, 15).','q = 3: (1, −3, 11).','q = 1: (−1, 4, 4).','q = 2: (3, −11, 3).','q = 1: (−4, 15, 1). Next q = 3 gives r = 0, so gcd = 1.'],a:'56(−4) + 15(15) = −224 + 225 = 1.'}],
 traps:['Computing q from the wrong pair of remainders.','Not verifying. One arithmetic slip breaks everything after it.']});

X('m135_gcdprops',{
 why:'These theorems are the tools you cite in gcd proofs.',
 idea:['Most gcd proofs reduce to an equation ax + by = something.','GCD CT: if d is a non-negative common divisor of a and b, and d = ax + by, then d is the gcd. CCT: gcd(a, b) = 1 exactly when ax + by = 1 has an integer solution.','CAD and PAD let you "cancel" divisibility when there is no common factor.'],
 keys:[['GCD CT','d | a, d | b, d ≥ 0, d = ax + by ⇒ d = gcd(a, b)'],['CCT','gcd(a, b) = 1 ⇔ ∃x, y: ax + by = 1'],['DB GCD','gcd(a/d, b/d) = 1 where d = gcd(a, b)'],['CAD','a | bc and gcd(a, b) = 1 ⇒ a | c'],['PAD (Euclid)','p prime, p | ab ⇒ p | a or p | b'],['CDD GCD','c | a and c | b ⇒ c | gcd(a, b)']],
 ex:[{q:'Prove: if gcd(a, b) = 1, then gcd(a, a + b) = 1.',s:['By CCT, ax + by = 1 for some x, y.','Rewrite: a(x − y) + (a + b)y = ax + by = 1.','So there are integers with a·X + (a + b)·Y = 1.'],a:'By CCT, gcd(a, a + b) = 1.'}],
 traps:['Using GCD CT without checking d is a common divisor. ax + by = d alone isn\'t enough when d ≠ 1.','Using PAD with a composite: 6 | 4·9 but 6 ∤ 4 and 6 ∤ 9.']});

X('m135_ufc',{
 why:'Prime factorizations make gcd, lcm and divisor counting mechanical.',
 idea:['UFT: every integer n &gt; 1 is a product of primes in exactly one way, up to order.','Once you have factorizations, compare exponents. The gcd takes the smaller exponent of each prime and the lcm takes the larger. A divisor of n uses each prime with an exponent between 0 and its exponent in n.'],
 keys:[['UFT','n = p₁^e₁ ⋯ pₖ^eₖ, unique'],['gcd','min exponent of each prime'],['lcm','max exponent of each prime'],['gcd·lcm','= ab for a, b &gt; 0'],['# divisors','(e₁ + 1)(e₂ + 1)⋯(eₖ + 1)'],['Perfect square','all exponents even']],
 ex:[{q:'a = 2³·3·5², b = 2·3⁴·7. Find gcd, lcm and the number of positive divisors of a.',s:['gcd: 2¹·3¹ = 6.','lcm: 2³·3⁴·5²·7 = 113400.','Divisors of a: (3 + 1)(1 + 1)(2 + 1) = 24.'],a:'gcd 6, lcm 113400, 24 divisors.'}],
 traps:['Forgetting a prime that appears in only one number (exponent 0 in the other).','Adding 1 to exponents for the gcd. That only applies to divisor counting.']});

// ---------- Congruences ----------
X('m135_lde',{
 why:'Linear Diophantine equations come up in congruences and word problems.',
 idea:['ax + by = c has integer solutions exactly when d = gcd(a, b) divides c (LDET 1).','To solve: use the EEA to write d = ax₀ + by₀, multiply by c/d, then write the general solution (LDET 2). Moving from one solution to the next steps x by b/d and y by −a/d.'],
 keys:[['LDET 1','solvable ⇔ gcd(a, b) | c'],['Particular','EEA for d, then multiply by c/d'],['LDET 2','x = x₀ + (b/d)n, y = y₀ − (a/d)n, n ∈ ℤ'],['Check','plug the particular solution back in']],
 ex:[{q:'Solve 14x + 22y = 10.',s:['d = gcd(14, 22) = 2, and 2 | 10, so solutions exist.','EEA: 14(−3) + 22(2) = 2.','Multiply by 5: 14(−15) + 22(10) = 10.','b/d = 11 and a/d = 7.'],a:'x = −15 + 11n, y = 10 − 7n, n ∈ ℤ.'}],
 traps:['Using b and a instead of b/d and a/d in the general solution.','Opposite signs: if x increases, y must decrease.']});

X('m135_cong',{
 why:'Congruences let you do arithmetic with remainders, which makes huge numbers manageable.',
 idea:['a ≡ b (mod m) means m | (a − b): a and b leave the same remainder when divided by m.','You can add, subtract and multiply congruences, and raise both sides to the same power. You cannot reduce an exponent mod m. For huge powers, find a small power that is ≡ 1 or ≡ −1, then use it repeatedly.'],
 keys:[['Definition','a ≡ b (mod m) ⇔ m | (a − b)'],['CISR','same remainder ⇔ congruent'],['PC','add, multiply, raise to powers'],['Never','reduce exponents mod m (only mod p − 1 with FℓT)'],['Last digit','n mod 10']],
 ex:[{q:'Find the remainder when 7¹⁰⁰ is divided by 5.',s:['7 ≡ 2 (mod 5).','2² = 4 ≡ −1, so 2⁴ ≡ 1 (mod 5).','100 = 4·25, so 2¹⁰⁰ = (2⁴)²⁵ ≡ 1.'],a:'The remainder is 1.'}],
 traps:['Writing 7¹⁰⁰ ≡ 7⁰ because 100 ≡ 0 mod 5. Exponents don\'t reduce mod m.','Dividing both sides. That needs CD and a gcd condition.']});

X('m135_lct',{
 why:'The LCT decides whether ax ≡ c (mod m) is solvable and how many solutions it has.',
 idea:['ax ≡ c (mod m) is the same as the Diophantine equation ax + my = c. So it is solvable exactly when d = gcd(a, m) divides c.','When it is solvable, the solutions form one class mod m/d. Mod m, that is d different classes.'],
 keys:[['LCT','ax ≡ c (mod m) solvable ⇔ gcd(a, m) | c'],['Solutions','x ≡ x₀ (mod m/d), i.e. d classes mod m'],['CD','ac ≡ bc (mod m) and gcd(c, m) = 1 ⇒ a ≡ b'],['Coprime case','d = 1 ⇒ exactly one class mod m']],
 ex:[{q:'Solve 6x ≡ 4 (mod 10).',s:['d = gcd(6, 10) = 2, and 2 | 4. Solvable.','Divide through by 2: 3x ≡ 2 (mod 5).','3·2 = 6 ≡ 1 (mod 5), so x ≡ 2·2 = 4 (mod 5).'],a:'x ≡ 4 (mod 5), i.e. x ≡ 4 or 9 (mod 10).'}],
 traps:['Cancelling a factor that shares a divisor with m without dividing m too.','Giving one answer mod m when there are d of them.']});

// ---------- Zm ----------
X('m135_warm',{
 why:'ℤₘ turns congruence work into algebra with familiar rules.',
 idea:['ℤₘ = {[0], [1], …, [m − 1]} is the set of congruence classes mod m. [a] contains every integer congruent to a.','You add and multiply classes by adding and multiplying representatives, then reducing. [a] = [b] exactly when a ≡ b (mod m).'],
 keys:[['[a]','{x ∈ ℤ : x ≡ a (mod m)}'],['[a] + [b]','[a + b]'],['[a]·[b]','[ab]'],['[a] = [b]','⇔ a ≡ b (mod m)'],['Size','ℤₘ has m elements']],
 ex:[{q:'In ℤ₇, compute [5]·[6] + [3].',s:['[5]·[6] = [30] = [2], since 30 = 4·7 + 2.','[2] + [3] = [5].'],a:'[5]'}],
 traps:['Leaving the answer unreduced, like [30] in ℤ₇. It\'s correct, but reduce it.']});

X('m135_inv',{
 why:'Inverses are how you "divide" in ℤₘ.',
 idea:['[a] has an inverse [a]⁻¹ when [a][b] = [1]. INV ℤₘ: [a] has an inverse exactly when gcd(a, m) = 1.','To find it, solve ax + my = 1 with the EEA. Then [a]⁻¹ = [x]. For small m, you can also test values.'],
 keys:[['INV ℤₘ','[a]⁻¹ exists ⇔ gcd(a, m) = 1'],['Find it','EEA: ax + my = 1 ⇒ [a]⁻¹ = [x]'],['ℤₚ, p prime','every non-zero class is invertible'],['Zero divisors','classes with gcd(a, m) &gt; 1 have no inverse']],
 ex:[{q:'Find [11]⁻¹ in ℤ₂₆.',s:['gcd(11, 26) = 1, so it exists.','EEA: 26 = 2·11 + 4, 11 = 2·4 + 3, 4 = 3 + 1.','Back-substitute: 1 = 4 − 3 = 3·4 − 11 = 3·26 − 7·11.','So 11·(−7) ≡ 1, and −7 ≡ 19.'],a:'[11]⁻¹ = [19]. Check: 11·19 = 209 = 8·26 + 1. ✓'}],
 traps:['Giving a negative representative without reducing.','Claiming an inverse exists when gcd ≠ 1.']});

X('m135_mat',{
 why:'Multi-step ℤₘ problems combine the rules into one calculation, the way exam questions do.',
 idea:['Treat equations in ℤₘ like ordinary algebra. Collect terms, then multiply by the inverse of the coefficient. Only "divide" when an inverse exists.','Reduce at every step to keep numbers small, and check the final answer by substituting it back.'],
 keys:[['Solve [a][x] = [c]','[x] = [a]⁻¹[c] when gcd(a, m) = 1'],['Squares','[x]² = [c]: test every class (m is small)'],['Reduce often','keep representatives between 0 and m − 1']],
 ex:[{q:'Solve [4][x] + [3] = [1] in ℤ₉.',s:['[4][x] = [1] − [3] = [−2] = [7].','[4]⁻¹ = [7] because 28 ≡ 1 (mod 9).','[x] = [7][7] = [49] = [4].'],a:'[x] = [4]. Check: 16 + 3 = 19 ≡ 1. ✓'}],
 traps:['Subtracting incorrectly when moving terms across.','Dividing when gcd(a, m) ≠ 1, where there may be 0 or several solutions.']});

X('m135_sys',{
 why:'Systems in ℤₘ use the same elimination you know from linear algebra.',
 idea:['Solve by substitution or elimination, multiplying by inverses instead of dividing. In ℤₚ with p prime, every non-zero coefficient has an inverse, so elimination always works.','When m isn\'t prime, a coefficient might not be invertible. Then look for another way to eliminate, or test values.'],
 keys:[['Elimination','scale an equation so the coefficients match, then subtract'],['Substitution','isolate a variable using an inverse'],['Check','substitute into both equations']],
 ex:[{q:'In ℤ₇: [2]x + [3]y = [1] and x + y = [2].',s:['From the second equation, x = [2] − y.','Substitute: [2]([2] − y) + [3]y = [1], so [4] + y = [1].','y = [−3] = [4], and x = [2] − [4] = [5].'],a:'x = [5], y = [4]. Check: 10 + 12 = 22 ≡ 1. ✓'}],
 traps:['Checking only one equation.']});

// ---------- FLT ----------
X('m135_flt',{
 why:'FℓT makes enormous powers easy, and it is the engine behind RSA.',
 idea:['Fermat\'s Little Theorem: if p is prime and p ∤ a, then a^(p−1) ≡ 1 (mod p).','To compute a^N mod p: reduce the base mod p, write N = q(p − 1) + r, and then a^N ≡ (a^(p−1))^q · a^r ≡ a^r. So the exponent reduces mod p − 1, not mod p.'],
 keys:[['FℓT','p prime, p ∤ a ⇒ a^(p−1) ≡ 1 (mod p)'],['Corollary','a^p ≡ a (mod p) for every integer a'],['Exponents','reduce mod p − 1'],['Hypotheses','state "p is prime and p ∤ a" each time']],
 ex:[{q:'Find 3¹⁰⁰ mod 13.',s:['13 is prime and 13 ∤ 3, so 3¹² ≡ 1 (mod 13).','100 = 8·12 + 4, so 3¹⁰⁰ ≡ 3⁴.','3⁴ = 81 = 6·13 + 3.'],a:'3¹⁰⁰ ≡ 3 (mod 13).'}],
 traps:['Reducing the exponent mod p instead of p − 1.','Using FℓT with a composite modulus.','Forgetting p ∤ a. If p | a, then a^N ≡ 0.']});

X('m135_poly',{
 why:'Polynomial congruences mod a prime become a finite search once FℓT shrinks the powers.',
 idea:['To solve f(x) ≡ 0 (mod p): reduce the coefficients mod p, use xᵖ ≡ x (true for every x) to knock exponents down, then test every x from 0 to p − 1.','Since p is small in these problems, testing is fast and complete.'],
 keys:[['Corollary of FℓT','xᵖ ≡ x (mod p) for all x'],['Lower exponents','x^(k) ≡ x^(k − (p − 1)) for x ≢ 0; check x = 0 separately'],['Then','test x = 0, 1, …, p − 1']],
 ex:[{q:'Solve x¹⁰ + x ≡ 2 (mod 5).',s:['Test x = 0: 0 ≢ 2.','For x ≢ 0: x⁴ ≡ 1, so x¹⁰ = x⁸·x² ≡ x².','Need x² + x ≡ 2. Test x = 1: 2 ✓. x = 2: 6 ≡ 1. x = 3: 12 ≡ 2 ✓. x = 4: 20 ≡ 0.'],a:'x ≡ 1 or 3 (mod 5).'}],
 traps:['Forgetting x ≡ 0, where x^(p−1) ≡ 1 fails.','Reducing coefficients mod p − 1. Coefficients reduce mod p, exponents mod p − 1.']});

X('m135_trap',{
 why:'These questions test whether you check hypotheses, which is where most marks are lost.',
 idea:['Before using any theorem, check its hypotheses. FℓT needs p prime and p ∤ a. Inverses need gcd(a, m) = 1. CRT needs coprime moduli. CD needs gcd(c, m) = 1 to cancel c.','Also check the answer\'s modulus. CRT gives a unique answer mod m₁m₂, not m₁ + m₂.'],
 keys:[['FℓT','p prime and p ∤ a'],['INV ℤₘ','gcd(a, m) = 1'],['CRT','gcd(m₁, m₂) = 1, answer mod m₁m₂'],['CD','gcd(c, m) = 1 to cancel c'],['LCT','gcd(a, m) | c to be solvable']],
 ex:[{q:'Is 2⁸ ≡ 1 (mod 9) by FℓT?',s:['9 isn\'t prime, so FℓT doesn\'t apply.','Compute directly: 2⁶ = 64 ≡ 1 (mod 9), so 2⁸ ≡ 2² = 4.'],a:'No. 2⁸ ≡ 4 (mod 9).'}],
 traps:['Applying a theorem because the numbers "look right".']});

// ---------- CRT ----------
X('m135_crt2',{
 why:'CRT combines information about remainders mod different numbers into one answer.',
 idea:['If gcd(m₁, m₂) = 1, the system n ≡ a₁ (mod m₁), n ≡ a₂ (mod m₂) has exactly one solution mod m₁m₂.','Method: write n = a₁ + m₁x, substitute into the second congruence, solve for x mod m₂, then substitute back.'],
 keys:[['CRT','gcd(m₁, m₂) = 1 ⇒ unique solution mod m₁m₂'],['Step 1','n = a₁ + m₁x'],['Step 2','a₁ + m₁x ≡ a₂ (mod m₂), solve for x'],['Step 3','substitute back and reduce mod m₁m₂']],
 ex:[{q:'Solve n ≡ 2 (mod 5), n ≡ 3 (mod 7).',s:['n = 2 + 5x.','2 + 5x ≡ 3 (mod 7), so 5x ≡ 1. Since 5·3 = 15 ≡ 1, x ≡ 3 (mod 7).','x = 3 + 7k, so n = 2 + 5(3 + 7k) = 17 + 35k.'],a:'n ≡ 17 (mod 35). Check: 17 = 3·5 + 2 and 17 = 2·7 + 3. ✓'}],
 traps:['Giving the answer mod m₁ + m₂ or mod m₂.','Not checking that the moduli are coprime.']});

X('m135_crt3',{
 why:'Three-congruence systems are just CRT applied twice.',
 idea:['With pairwise coprime moduli, solve the first two congruences to get one congruence mod m₁m₂. Then combine that with the third.','The final answer is unique mod m₁m₂m₃.'],
 keys:[['Pairwise coprime','gcd(mᵢ, mⱼ) = 1 for every pair'],['Combine','two at a time'],['Answer','unique mod m₁m₂m₃']],
 ex:[{q:'Solve n ≡ 1 (mod 3), n ≡ 2 (mod 4), n ≡ 3 (mod 5).',s:['First two: n = 1 + 3x ≡ 2 (mod 4), so 3x ≡ 1 and x ≡ 3. Then n ≡ 10 (mod 12).','With the third: n = 10 + 12y ≡ 3 (mod 5), so 2y ≡ 3 and y ≡ 4. Then n = 58.'],a:'n ≡ 58 (mod 60).'}],
 traps:['Assuming pairwise coprime without checking: 4 and 6 share a 2.']});

X('m135_crtd',{
 why:'Exam CRT questions hide the system inside words or linear congruences.',
 idea:['"Leaves remainder a when divided by m" means n ≡ a (mod m). If a congruence looks like bx + k ≡ r, isolate x first using an inverse.','SM (Splitting Modulus): with gcd(m₁, m₂) = 1, n ≡ a (mod m₁m₂) ⇔ n ≡ a (mod m₁) and n ≡ a (mod m₂). Use it to split a big composite modulus into small pieces, or to merge equal remainders.'],
 keys:[['Words','"remainder a on division by m" means n ≡ a (mod m)'],['Isolate','bx ≡ c ⇒ x ≡ b⁻¹c'],['SM','coprime m₁, m₂: same residue mod each ⇔ same residue mod m₁m₂']],
 ex:[{q:'Solve 3x ≡ 2 (mod 5) and 2x ≡ 1 (mod 7).',s:['3⁻¹ ≡ 2 (mod 5), so x ≡ 4 (mod 5).','2⁻¹ ≡ 4 (mod 7), so x ≡ 4 (mod 7).','Same remainder, coprime moduli: SM gives x ≡ 4 (mod 35).'],a:'x ≡ 4 (mod 35).'}],
 traps:['Running CRT before isolating x.']});

X('m135_split',{
 why:'Quizzes ask you to solve congruences like x² ≡ 4 (mod 21) that no inverse can undo. Splitting the modulus turns one hard problem into small ones you can solve by testing.',
 idea:['Splitting the Modulus (SM): if gcd(m₁, m₂) = 1, then n ≡ a (mod m₁m₂) ⇔ n ≡ a (mod m₁) and n ≡ a (mod m₂). The remainder a is the same on both sides.','For a polynomial congruence f(x) ≡ 0 (mod m₁m₂): solve f(x) ≡ 0 (mod m₁) and f(x) ≡ 0 (mod m₂) separately by testing every residue. The two pieces usually give different answers (say 1 and 5). That is not a problem: each pair of answers is a small CRT system, and CRT glues it into one answer mod m₁m₂.','So the count multiplies: (solutions mod m₁) × (solutions mod m₂). If either piece has no solutions, neither does the original.'],
 keys:[['SM','same remainder mod coprime m₁ and m₂ ⇔ same remainder mod m₁m₂'],['Reduce','replace each coefficient by its remainder mod the small modulus'],['Test','try x = 0, 1, …, m − 1 in each small modulus'],['Combine','every pair (s mod m₁, t mod m₂) gives one CRT answer'],['Count','#solutions = product of the counts']],
 ex:[{q:'Solve x² ≡ 1 (mod 15).',s:['15 = 3 · 5, gcd(3, 5) = 1. Split: x² ≡ 1 (mod 3) and x² ≡ 1 (mod 5).','Mod 3: x ≡ 1, 2. Mod 5: x ≡ 1, 4.','Pairs: (1, 1) → 1, (1, 4) → 4, (2, 1) → 11, (2, 4) → 14. List trick: for x ≡ 4 (mod 5) try 4, 9, 14 and keep the one that is right mod 3.'],a:'x ≡ 1, 4, 11, 14 (mod 15).'},
     {q:'Solve x² ≡ 4 (mod 21).',s:['21 = 3 · 7. Split: x² ≡ 4 ≡ 1 (mod 3) and x² ≡ 4 (mod 7).','Mod 3: x ≡ 1, 2. Mod 7: x ≡ 2, 5 (since 5² = 25 ≡ 4).','Combine: (1, 2) → 16, (2, 2) → 2, (1, 5) → 19, (2, 5) → 5.'],a:'x ≡ 2, 5, 16, 19 (mod 21).'},
     {q:'Solve x ≡ 2 (mod 5), x ≡ 3 (mod 7) by substitution.',s:['From the first: x = 2 + 5k.','Plug in: 2 + 5k ≡ 3 (mod 7) ⇒ 5k ≡ 1 ⇒ k ≡ 3 (mod 7), since 5 · 3 = 15 ≡ 1.','Plug back: x = 2 + 5 · 3 = 17.'],a:'x ≡ 17 (mod 35).'}],
 traps:['Using SM when the moduli are not coprime: n ≡ 3 (mod 4) and (mod 6) only gives n ≡ 3 (mod 12), not mod 24.','Stopping at x ≡ ±a. x² ≡ 1 (mod 15) has four solutions, not two.','Forgetting to plug k back in: find k, then compute x = a + m₁k.','Writing "or" instead of "and": both small congruences must hold.'],
 tip:'Write a small table: solutions mod m₁ down the side, mod m₂ across the top, one CRT answer per cell.'});

// ---------- RSA ----------
X('m135_rsa',{
 why:'RSA puts the EEA, inverses and FℓT together in one computation.',
 idea:['Setup: choose primes p and q, set n = pq and φ = (p − 1)(q − 1). Pick e with gcd(e, φ) = 1. Find d with ed ≡ 1 (mod φ) and 0 &lt; d &lt; φ.','The public key is (e, n). The private key is (d, n). Encrypt with C ≡ Mᵉ (mod n) and decrypt with R ≡ Cᵈ (mod n), where 0 ≤ M &lt; n.'],
 keys:[['n','pq'],['φ','(p − 1)(q − 1)'],['e','gcd(e, φ) = 1'],['d','ed ≡ 1 (mod φ), found with the EEA'],['Encrypt','C ≡ Mᵉ (mod n)'],['Decrypt','R ≡ Cᵈ (mod n), which gives back M']],
 ex:[{q:'p = 5, q = 11, e = 3. Find d and encrypt M = 2.',s:['n = 55 and φ = 4·10 = 40.','3d ≡ 1 (mod 40): 3·27 = 81 = 2·40 + 1, so d = 27.','C ≡ 2³ = 8 (mod 55).'],a:'d = 27 and C = 8. Check: 8²⁷ ≡ 2 (mod 55).'}],
 traps:['Using n instead of φ when finding d.','Choosing an e that shares a factor with φ.']});

X('m135_rsac',{
 why:'Concept questions check that you understand why RSA works and what is secret.',
 idea:['Anyone can encrypt with (e, n). Only someone who knows d can decrypt, and finding d requires φ = (p − 1)(q − 1), which requires factoring n. Factoring large n is believed to be hard, and that is the whole security argument.','Why decryption works: ed = 1 + kφ, so M^(ed) = M·(M^(p−1))^(k(q−1)) ≡ M (mod p) by FℓT, and similarly mod q. Splitting the modulus then gives M^(ed) ≡ M (mod n).'],
 keys:[['Public','(e, n)'],['Private','d, plus p and q'],['Security','factoring n is hard'],['Correctness','FℓT mod p and mod q, then SM']],
 ex:[{q:'If an attacker learns p and q, can they decrypt?',s:['With p and q they can compute φ = (p − 1)(q − 1).','Then the EEA gives d from e.'],a:'Yes. Protecting the factors is the whole point.'}],
 traps:['Thinking e must be secret.']});

// ---------- Complex ----------
X('m135_cstd',{
 why:'Standard form a + bi is how you add, multiply and divide complex numbers.',
 idea:['A complex number is z = a + bi with a, b ∈ ℝ and i² = −1. Add and multiply like polynomials, replacing i² with −1.','To divide, multiply the top and bottom by the conjugate of the bottom. This makes the denominator a real number.'],
 keys:[['i²','−1'],['Conjugate','z̄ = a − bi'],['Modulus','|z| = √(a² + b²)'],['z·z̄','|z|²'],['Division','(top·w̄)/|w|²'],['Re, Im','Re(z) = a, Im(z) = b (real numbers)']],
 ex:[{q:'Write (3 + 2i)/(1 − i) in standard form.',s:['Multiply top and bottom by 1 + i.','Top: (3 + 2i)(1 + i) = 3 + 3i + 2i + 2i² = 1 + 5i.','Bottom: 1² + 1² = 2.'],a:'1/2 + (5/2)i'}],
 traps:['Saying Im(z) = bi. It\'s just b.','Forgetting the i² term when multiplying.']});

X('m135_cpolar',{
 why:'Polar form makes multiplication, powers and roots easy.',
 idea:['Every non-zero z can be written z = r(cos θ + i sin θ), where r = |z| and θ is the angle from the positive real axis.','Find θ from the point (a, b): check which quadrant it is in, then use the reference angle. tan⁻¹(b/a) alone gives the wrong quadrant half the time.'],
 keys:[['r','|z| = √(a² + b²)'],['θ','cos θ = a/r, sin θ = b/r'],['PMC','r₁e^(iθ₁)·r₂e^(iθ₂) = r₁r₂e^(i(θ₁+θ₂))'],['Special angles','π/6, π/4, π/3 and their reflections']],
 ex:[{q:'Write −1 + √3·i in polar form.',s:['r = √(1 + 3) = 2.','The point (−1, √3) is in quadrant II. The reference angle is π/3, so θ = π − π/3 = 2π/3.'],a:'2(cos 2π/3 + i sin 2π/3)'}],
 traps:['Using tan⁻¹(b/a) directly, which gives −π/3 here (wrong quadrant).']});

X('m135_dm',{
 why:'De Moivre turns a huge power into one multiplication of an angle.',
 idea:['DMT: (r(cos θ + i sin θ))ⁿ = rⁿ(cos nθ + i sin nθ).','Convert to polar form, raise r to the power and multiply the angle, reduce the angle mod 2π, then convert back to standard form if asked.'],
 keys:[['DMT','(re^(iθ))ⁿ = rⁿe^(inθ)'],['Reduce','nθ mod 2π'],['Convert back','a = rⁿ cos(nθ), b = rⁿ sin(nθ)']],
 ex:[{q:'Compute (1 + i)⁸.',s:['1 + i = √2(cos π/4 + i sin π/4).','(√2)⁸ = 16 and 8·π/4 = 2π.','cos 2π = 1 and sin 2π = 0.'],a:'(1 + i)⁸ = 16.'}],
 traps:['Raising cos θ to the power instead of multiplying the angle.']});

X('m135_roots',{
 why:'Complex roots have a geometric structure, so you can write all n of them at once.',
 idea:['CNRT: for w = r(cos θ + i sin θ) ≠ 0, the equation zⁿ = w has exactly n distinct solutions.','They are z_k = r^(1/n)(cos((θ + 2kπ)/n) + i sin((θ + 2kπ)/n)) for k = 0, 1, …, n − 1. They lie evenly spaced on a circle of radius r^(1/n), 2π/n apart.'],
 keys:[['Count','n distinct roots'],['Modulus','r^(1/n), the positive real root'],['Angles','(θ + 2kπ)/n, k = 0…n − 1'],['Spacing','2π/n apart, forming a regular n-gon']],
 ex:[{q:'Solve z³ = 8i.',s:['8i = 8(cos π/2 + i sin π/2).','r^(1/3) = 2. Angles: (π/2 + 2kπ)/3 = π/6, 5π/6, 3π/2.','Values: 2e^(iπ/6) = √3 + i, 2e^(i5π/6) = −√3 + i, 2e^(i3π/2) = −2i.'],a:'z = √3 + i, −√3 + i, −2i'}],
 traps:['Adding 2kπ after dividing by n instead of before.','Listing only one root.']});

X('m135_cpoly',{
 why:'Polynomial factoring over ℂ is tested through the FTA, CJRT and the Factor Theorem.',
 idea:['FTA: every polynomial of degree n ≥ 1 with complex coefficients has a root in ℂ, so it factors into n linear factors.','CJRT: if the coefficients are real and z is a root, then z̄ is also a root. Pairing z and z̄ gives a real quadratic factor x² − 2Re(z)x + |z|².','Factor Theorem: c is a root ⇔ (x − c) is a factor. Rational Roots Theorem: rational roots p/q have p | constant term and q | leading coefficient.'],
 keys:[['FTA','degree n ⇒ n roots in ℂ, counted with multiplicity'],['CJRT','real coefficients: non-real roots come in conjugate pairs'],['Pair factor','(x − z)(x − z̄) = x² − 2Re(z)x + |z|²'],['FT','f(c) = 0 ⇔ (x − c) | f(x)'],['RRT','p | a₀, q | aₙ'],['RFRP','real polynomials factor into real linear and quadratic factors']],
 ex:[{q:'f(x) = x³ − 3x² + 4x − 2 has root 1 + i. Factor f over ℝ and ℂ.',s:['Real coefficients, so 1 − i is also a root.','Pair factor: x² − 2x + 2.','Divide: f(x) = (x − 1)(x² − 2x + 2).'],a:'Over ℂ: (x − 1)(x − (1 + i))(x − (1 − i)).'}],
 traps:['Using CJRT when the coefficients aren\'t all real.']});

// ---------- Proof Lab ----------
X('m135_prooflab',{
 why:'Most marks on MATH 135 tests are for written proofs. This topic practises building them line by line.',
 idea:['A proof is a chain where every line follows from the hypotheses, definitions, theorems or earlier lines. Before writing, name what you are given and what you must show, then unfold every definition into an equation.',
  'Each Proof Lab question works on one complete proof from the course in four parts: choose the next line, name what justifies a line, find the line that has been swapped for a wrong one, then say why it is wrong. Those are the same skills markers check.'],
 keys:[['Prove ∀x ∈ S, P(x)','Let x ∈ S be arbitrary. … Hence P(x).'],['Prove A ⇒ B','Assume A. … Therefore B.'],['Contrapositive','Assume ¬B. … Therefore ¬A.'],['a | b in a proof','write b = ka; use a new letter for each integer'],['S ⊆ T','Let x ∈ S. … So x ∈ T.'],['Induction','base case, then IH for one arbitrary k, then show k + 1'],['gcd = 1','find x, y with ax + by = 1, then cite CCT']],
 ex:[{q:'Prove: if a | b, then a | b².',s:['Assume a | b, so b = ka for some integer k (definition of divisibility).','Then b² = k²a² = (k²a)a (algebra).','k²a is an integer (closure of ℤ).'],a:'Therefore a | b² (definition of divisibility).'}],
 traps:['Starting from the conclusion and working backwards on the page.','Reusing one letter (k) for two different integers.','Dividing. Divisibility proofs never need it.','Citing Bézout to conclude gcd = 1. That direction needs CCT or GCD CT.','Proving a ∀ statement with examples.'],
 tip:'Write the justification in brackets after every line. If you can\'t name one, the line probably doesn\'t follow.'});
