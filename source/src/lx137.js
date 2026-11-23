// ===== Rich lessons: MATH 137 =====

// ---------- Absolute values ----------
X('m137_abs',{
 why:'Absolute value inequalities are the language of ε–N and ε–δ proofs.',
 idea:['Read |x − a| as "the distance from x to a". Then |x − a| &lt; δ means x is within δ of a: the interval (a − δ, a + δ).','|A| &lt; B unfolds to −B &lt; A &lt; B, one double inequality. |A| &gt; B unfolds to A &gt; B or A &lt; −B, two separate pieces. When both sides have absolute values, split at the points where each inside changes sign.'],
 keys:[['|x − a| &lt; δ','a − δ &lt; x &lt; a + δ'],['|A| &lt; B','−B &lt; A &lt; B'],['|A| &gt; B','A &gt; B or A &lt; −B'],['|ab|','|a||b|'],['|x|²','x²']],
 ex:[{q:'Solve |2x − 3| &lt; 5.',s:['−5 &lt; 2x − 3 &lt; 5.','Add 3: −2 &lt; 2x &lt; 8.','Divide by 2: −1 &lt; x &lt; 4.'],a:'x ∈ (−1, 4)'},
  {q:'Solve |x − 1| &gt; |x + 3|.',s:['Distance to 1 is greater than distance to −3.','The midpoint of 1 and −3 is −1, so the points closer to −3 are those left of −1.','Check: square both sides, (x − 1)² &gt; (x + 3)², so −2x + 1 &gt; 6x + 9 and x &lt; −1.'],a:'x &lt; −1'}],
 traps:['Writing |A| &gt; B as −B &gt; A &gt; B, which is impossible.','Squaring an inequality whose sides might be negative. With absolute values on both sides it\'s safe.']});

X('m137_tri',{
 why:'The triangle inequality is how you bound the error terms in limit proofs.',
 idea:['|a + b| ≤ |a| + |b|: the length of a sum is at most the sum of the lengths. The reverse form, ||a| − |b|| ≤ |a − b|, gives you a lower bound.','In proofs you usually add and subtract the same thing, then split: |x − y| = |(x − z) + (z − y)| ≤ |x − z| + |z − y|.'],
 keys:[['Triangle Inequality','|a + b| ≤ |a| + |b|'],['Triangle Inequality II','||a| − |b|| ≤ |a − b|'],['Equality','when a and b have the same sign (or one is 0)'],['Add-and-subtract','|x − y| ≤ |x − z| + |z − y|']],
 ex:[{q:'If |x − 2| &lt; 1, bound |x + 5|.',s:['x + 5 = (x − 2) + 7.','|x + 5| ≤ |x − 2| + 7 &lt; 1 + 7.'],a:'|x + 5| &lt; 8'}],
 traps:['Assuming |a + b| = |a| + |b|. That only holds when a and b have the same sign.','Using the inequality backwards to get a lower bound. Use the reverse form for that.']});

// ---------- Sequences ----------
X('m137_rec',{
 why:'Recursive sequences combine computation, induction and the MCT.',
 idea:['A recursive sequence gives a₁ and a rule aₙ₊₁ = f(aₙ). Compute a few terms to see the pattern: increasing or decreasing, and bounded or not.','If the sequence converges to L, then L must satisfy L = f(L), because aₙ and aₙ₊₁ have the same limit. This finds the candidate limit. You still need the MCT, or another argument, to show the limit exists.'],
 keys:[['Recursive','a₁ given, aₙ₊₁ = f(aₙ)'],['Fixed point','if aₙ → L then L = f(L)'],['Plan','show monotone + bounded (by induction), then MCT, then solve L = f(L)']],
 ex:[{q:'a₁ = 1, aₙ₊₁ = √(2 + aₙ). Find the limit, assuming it exists.',s:['a₂ = √3 ≈ 1.73 and a₃ = √(2 + 1.73) ≈ 1.93. Increasing, apparently bounded by 2.','L = √(2 + L), so L² = L + 2 and (L − 2)(L + 1) = 0.','The terms are positive, so L ≠ −1.'],a:'L = 2'}],
 traps:['Solving L = f(L) and stopping. That only says what the limit would be if it exists.','Keeping a root that\'s impossible given the signs of the terms.']});

X('m137_seqlim',{
 why:'Most sequence limit questions are solved with a few algebraic moves.',
 idea:['For rational expressions in n, divide the top and bottom by the highest power of n in the denominator. Terms like c/nᵏ go to 0.','For square-root differences, multiply by the conjugate. For terms squeezed between two things with the same limit, use the Squeeze Theorem. Useful scale: ln n ≪ nᵖ ≪ rⁿ ≪ n! as n → ∞.'],
 keys:[['Rational','divide by the highest power in the denominator'],['Conjugate','√A − √B = (A − B)/(√A + √B)'],['Squeeze','aₙ ≤ bₙ ≤ cₙ, aₙ, cₙ → L ⇒ bₙ → L'],['rⁿ','→ 0 if |r| &lt; 1; diverges if |r| &gt; 1 or r = −1'],['Growth','ln n ≪ nᵖ ≪ rⁿ (r &gt; 1) ≪ n!']],
 ex:[{q:'Find lim (3n² − n)/(5n² + 2).',s:['Divide the top and bottom by n².','(3 − 1/n)/(5 + 2/n²) → 3/5.'],a:'3/5'},
  {q:'Find lim (√(n² + n) − n).',s:['Multiply by the conjugate: n/(√(n² + n) + n).','Divide by n: 1/(√(1 + 1/n) + 1) → 1/2.'],a:'1/2'}],
 traps:['"∞ − ∞ = 0". That form is indeterminate, so use the conjugate.','Comparing only leading coefficients when the degrees differ.']});

X('m137_epsN',{
 why:'The formal limit definition is the foundation of the course, and it is examined.',
 idea:['aₙ → L means: for every ε &gt; 0 there is an N such that n &gt; N implies |aₙ − L| &lt; ε. You can make the terms as close to L as you like by going far enough out.','The scratch work runs backwards: start from |aₙ − L| &lt; ε, simplify, and solve for n. That gives you N. Then write the proof forwards.'],
 keys:[['Definition','∀ε &gt; 0, ∃N, n &gt; N ⇒ |aₙ − L| &lt; ε'],['Scratch','solve |aₙ − L| &lt; ε for n'],['Simplify','replacing |aₙ − L| by a larger, simpler bound is fine'],['N','may depend on ε (and usually does)']],
 ex:[{q:'Prove (n + 1)/n → 1. What N works for ε?',s:['|(n + 1)/n − 1| = 1/n.','1/n &lt; ε ⇔ n &gt; 1/ε.','Choose N = 1/ε. Then n &gt; N gives |aₙ − 1| = 1/n &lt; ε.'],a:'N = 1/ε'}],
 traps:['Choosing an N that depends on n.','Writing only the scratch work. The proof must start with "Let ε &gt; 0".']});

X('m137_sup',{
 why:'LUBs and the MCT guarantee that limits exist even when you can\'t compute them.',
 idea:['An upper bound M of a set S satisfies x ≤ M for every x ∈ S. The least upper bound, lub(S) or sup(S), is the smallest such M. The Least Upper Bound Property says every non-empty set of reals that is bounded above has one.','The MCT applies that idea to sequences: a sequence that is monotone and bounded converges. An increasing bounded-above sequence converges to the lub of its terms.','Subsequences of a convergent sequence converge to the same limit. If two subsequences have different limits, the sequence diverges.'],
 keys:[['lub(S)','an upper bound, and ≤ every other upper bound'],['max(S)','lub(S), if it belongs to S'],['MCT','monotone + bounded ⇒ convergent'],['Subsequences','aₙ → L ⇒ every subsequence → L'],['Divergence trick','two subsequences with different limits ⇒ diverges']],
 ex:[{q:'S = {1 − 1/n : n ∈ ℕ}. Find lub(S) and decide whether S has a max.',s:['Every element is &lt; 1, so 1 is an upper bound.','Any M &lt; 1 is beaten by 1 − 1/n for large n.','1 is never attained.'],a:'lub(S) = 1, and S has no maximum.'},
  {q:'Does aₙ = (−1)ⁿ converge?',s:['The even terms give 1; the odd terms give −1.','Two subsequences with different limits.'],a:'No, it diverges.'}],
 traps:['Confusing lub with max. The lub doesn\'t have to be in the set.','Saying "bounded ⇒ convergent". (−1)ⁿ is bounded and diverges.']});

// ---------- Series ----------
X('m137_geo',{
 why:'Geometric series are the one kind of series you can sum exactly.',
 idea:['Σ rⁿ adds powers of a fixed ratio r. Its partial sums are Sₖ = (1 − r^(k+1))/(1 − r), and r^(k+1) → 0 exactly when |r| &lt; 1.','So Σₙ₌₀^∞ rⁿ = 1/(1 − r) for |r| &lt; 1, and the series diverges otherwise. For a general geometric series, the sum is (first term)/(1 − r).'],
 keys:[['Geometric Series Test','Σ arⁿ converges ⇔ |r| &lt; 1 (with a ≠ 0)'],['Sum','first term/(1 − r)'],['Partial sum','Sₖ = (1 − r^(k+1))/(1 − r)']],
 ex:[{q:'Find Σₙ₌₂^∞ 3·(2/5)ⁿ.',s:['r = 2/5, so |r| &lt; 1 and it converges.','First term (n = 2): 3·4/25 = 12/25.','Sum = (12/25)/(1 − 2/5) = (12/25)/(3/5).'],a:'4/5'}],
 traps:['Using 1/(1 − r) when the series doesn\'t start at n = 0. Use the actual first term.','Forgetting to check |r| &lt; 1.']});

X('m137_series',{
 why:'The Divergence Test is the first check on any series.',
 idea:['A series Σ aₙ converges if its partial sums Sₖ converge. If the series converges, the terms must go to 0.','Contrapositive, the Divergence Test: if aₙ does not go to 0, the series diverges. The converse is false. The harmonic series Σ 1/n has terms going to 0 but still diverges.'],
 keys:[['Convergent series','partial sums Sₖ converge'],['Divergence Test','aₙ ↛ 0 ⇒ Σ aₙ diverges'],['Not a test','aₙ → 0 proves nothing'],['Harmonic','Σ 1/n diverges']],
 ex:[{q:'Does Σ n/(n + 1) converge?',s:['aₙ = n/(n + 1) → 1 ≠ 0.'],a:'It diverges, by the Divergence Test.'}],
 traps:['Concluding convergence because aₙ → 0.']});

// ---------- Limits ----------
X('m137_limalg',{
 why:'0/0 forms are the most common limits on quizzes.',
 idea:['If substituting gives a number, that\'s the limit (for continuous functions). If it gives 0/0, there is a hidden common factor or cancellation.','Factor and cancel, multiply by a conjugate for roots, or combine fractions. After simplifying, substitute again.'],
 keys:[['Plug in first','continuous ⇒ lim f(x) = f(a)'],['0/0','indeterminate: simplify before substituting'],['Factor','x² − a² = (x − a)(x + a)'],['Conjugate','multiply by (√A + B)/(√A + B)'],['c/0, c ≠ 0','infinite or does not exist: check one-sided signs']],
 ex:[{q:'lim as x → 2 of (x² − 4)/(x − 2).',s:['Substituting gives 0/0.','(x − 2)(x + 2)/(x − 2) = x + 2 for x ≠ 2.','Substitute: 4.'],a:'4'},
  {q:'lim as x → 0 of (√(x + 9) − 3)/x.',s:['0/0. Multiply by (√(x + 9) + 3) on top and bottom.','Top: x + 9 − 9 = x. Cancel x: 1/(√(x + 9) + 3).','Substitute x = 0: 1/6.'],a:'1/6'}],
 traps:['Concluding the limit is 0 or undefined from 0/0.']});

X('m137_limtrig',{
 why:'The Fundamental Trig Limit gives the derivative of sin x, and it appears in many limit questions.',
 idea:['FTL: lim as x → 0 of sin(x)/x = 1, with x in radians. It was proved with the Squeeze Theorem and a geometric argument.','To use it, make the argument of sin match the denominator: sin(5x)/x = 5·sin(5x)/(5x) → 5.'],
 keys:[['FTL','lim sin x/x = 1 (x → 0)'],['Scaled','lim sin(ax)/(bx) = a/b'],['Cosine','lim (1 − cos x)/x = 0'],['Squeeze','−1 ≤ sin(…) ≤ 1 for things like x sin(1/x)']],
 ex:[{q:'lim as x → 0 of sin(3x)/sin(7x).',s:['Write it as [sin 3x/(3x)]·[7x/sin 7x]·(3x/7x).','The two bracketed factors → 1.'],a:'3/7'},
  {q:'lim as x → 0 of x² sin(1/x).',s:['−x² ≤ x² sin(1/x) ≤ x².','Both bounds → 0.'],a:'0, by the Squeeze Theorem'}],
 traps:['Using the FTL when x does not go to 0. lim sin x/x = 0 as x → ∞.']});

X('m137_liminf',{
 why:'Limits at ∞ describe end behaviour and horizontal asymptotes.',
 idea:['For rational functions, divide by the highest power of x in the denominator. Equal degrees give the ratio of the leading coefficients. A higher degree on the bottom gives 0. A higher degree on the top gives ±∞.','Be careful with roots: √(x²) = |x|, which is −x when x → −∞.'],
 keys:[['deg top &lt; deg bottom','→ 0'],['Equal degrees','ratio of the leading coefficients'],['deg top &gt; deg bottom','→ ±∞'],['√(x²)','|x|, which is −x as x → −∞'],['Horizontal asymptote','y = L if f(x) → L as x → ±∞']],
 ex:[{q:'lim as x → −∞ of √(4x² + 1)/(x + 3).',s:['√(4x² + 1) = |x|√(4 + 1/x²) = −x√(4 + 1/x²) for x &lt; 0.','Divide by x: −√(4 + 1/x²)/(1 + 3/x) → −2.'],a:'−2'}],
 traps:['Getting +2 by forgetting that |x| = −x for negative x.']});

X('m137_onesided',{
 why:'One-sided limits decide whether a two-sided limit exists and find vertical asymptotes.',
 idea:['lim as x → a⁻ approaches from the left; lim as x → a⁺ approaches from the right. The two-sided limit exists exactly when both one-sided limits exist and are equal.','For c/0 forms with c ≠ 0, the answer is ±∞. Find the sign by testing a value close to a on each side.'],
 keys:[['Two-sided','exists ⇔ the left and right limits exist and are equal'],['c/0 (c ≠ 0)','±∞: check the sign on each side'],['Vertical asymptote','x = a if a one-sided limit is ±∞'],['Piecewise','use the rule for each side']],
 ex:[{q:'lim as x → 3⁻ of (x + 1)/(x − 3).',s:['Top → 4, bottom → 0.','For x slightly less than 3, x − 3 &lt; 0.','Positive divided by a tiny negative.'],a:'−∞'}],
 traps:['Saying a limit "is ∞" and treating it like a number. It describes divergence.']});

X('m137_seqchar',{
 why:'The sequential characterization connects sequence limits to function limits. It is the standard way to show a limit does not exist.',
 idea:['lim as x → a of f(x) = L exactly when, for every sequence xₙ → a with xₙ ≠ a, f(xₙ) → L.','To show a limit doesn\'t exist, find two sequences approaching a whose images go to different values, or one sequence whose images diverge.'],
 keys:[['SC of Limits','lim f(x) = L ⇔ f(xₙ) → L for every xₙ → a, xₙ ≠ a'],['DNE strategy','two sequences, two different limits'],['SC of Continuity','f continuous at a ⇔ xₙ → a implies f(xₙ) → f(a)']],
 ex:[{q:'Show lim as x → 0 of sin(1/x) does not exist.',s:['xₙ = 1/(2πn) → 0 and sin(1/xₙ) = sin(2πn) = 0.','yₙ = 1/(π/2 + 2πn) → 0 and sin(1/yₙ) = 1.','Different limits, 0 and 1.'],a:'The limit does not exist.'}],
 traps:['Checking only one sequence and concluding the limit exists.']});

// ---------- Continuity ----------
X('m137_contk',{
 why:'Choosing constants to make a piecewise function continuous is a standard exam question.',
 idea:['f is continuous at a when lim as x → a of f(x) = f(a). That means the limit exists and equals the function\'s value.','For a piecewise function, set the left-hand limit equal to the right-hand limit at each break point, and solve for the unknown constants.'],
 keys:[['Continuous at a','lim as x → a of f(x) = f(a)'],['Three conditions','f(a) defined, limit exists, the two are equal'],['Piecewise','left limit = right limit = f(a)'],['Two unknowns','two break points give two equations']],
 ex:[{q:'f(x) = kx + 1 for x &lt; 2 and x² − k for x ≥ 2. Find k so f is continuous.',s:['Left limit at 2: 2k + 1.','Right limit and f(2): 4 − k.','2k + 1 = 4 − k, so 3k = 3.'],a:'k = 1'}],
 traps:['Matching values without checking the left and right formulas are the right ones for each side.']});

X('m137_disc',{
 why:'Classifying discontinuities shows you understand what goes wrong at a point.',
 idea:['Removable: the limit exists, but f(a) is missing or wrong, like a hole in the graph. Jump: the one-sided limits exist but differ. Infinite: a one-sided limit is ±∞, giving a vertical asymptote. Oscillating: no limit at all, such as sin(1/x) at 0.'],
 keys:[['Removable','limit exists ≠ f(a) (or f(a) undefined)'],['Jump','left and right limits exist but differ'],['Infinite','a one-sided limit is ±∞'],['Oscillating','the function wiggles with no limit']],
 ex:[{q:'Classify f(x) = (x² − 1)/(x − 1) at x = 1.',s:['f(1) is undefined.','The limit is lim (x + 1) = 2, which exists.'],a:'Removable. Defining f(1) = 2 fixes it.'}],
 traps:['Calling a 0/0 point a vertical asymptote. Simplify first.']});

X('m137_ivt',{
 why:'The IVT proves that equations have solutions without solving them.',
 idea:['IVT: if f is continuous on [a, b] and α is strictly between f(a) and f(b), then f(c) = α for some c ∈ (a, b). A continuous graph can\'t skip values.','To show f(x) = 0 has a root, find a and b where f has opposite signs, and confirm f is continuous on [a, b].'],
 keys:[['IVT','continuous on [a, b], α between f(a) and f(b) ⇒ ∃c ∈ (a, b), f(c) = α'],['Root form','f(a)f(b) &lt; 0 ⇒ a root in (a, b)'],['Hypothesis','continuous on the closed interval'],['g = f − h','to solve f(x) = h(x), apply the IVT to f − h']],
 ex:[{q:'Show x³ + x − 1 = 0 has a root in (0, 1).',s:['f is a polynomial, so it\'s continuous on [0, 1].','f(0) = −1 &lt; 0 and f(1) = 1 &gt; 0.'],a:'By the IVT, there is c ∈ (0, 1) with f(c) = 0.'}],
 traps:['Forgetting to state continuity.','Thinking the IVT tells you how many roots there are. It only guarantees at least one.']});

X('m137_bisect',{
 why:'Bisection turns the IVT into an algorithm with a guaranteed error bound.',
 idea:['Start with [a, b] where f(a) and f(b) have opposite signs. Evaluate f at the midpoint m. Keep the half where the sign still changes. Repeat.','After n steps, the interval length is (b − a)/2ⁿ. If you guess its midpoint, the error is at most half of that.'],
 keys:[['Step','m = (a + b)/2; keep the half with a sign change'],['Length after n steps','(b − a)/2ⁿ'],['Midpoint error','≤ (b − a)/2ⁿ⁺¹'],['Steps for tolerance ε','smallest n with (b − a)/2ⁿ &lt; ε']],
 ex:[{q:'f(x) = x² − 2 on [1, 2]. Do two bisection steps.',s:['m = 1.5: f = 0.25 &gt; 0. The sign changes on [1, 1.5].','m = 1.25: f = −0.4375 &lt; 0. The sign changes on [1.25, 1.5].'],a:'√2 ∈ [1.25, 1.5]'}],
 traps:['Keeping the wrong half. Compare signs with an endpoint.']});

X('m137_evt',{
 why:'Theorem traps test whether you know exactly when the EVT and IVT apply.',
 idea:['EVT: a function continuous on a closed, bounded interval [a, b] attains both a maximum and a minimum there.','Drop any hypothesis and it can fail. On an open interval, f(x) = x on (0, 1) has no max. With a discontinuity, there may be no max. On an unbounded interval, x² on [0, ∞) has no max.'],
 keys:[['EVT','continuous on [a, b] ⇒ attains max and min'],['Needs','closed, bounded, continuous'],['IVT','continuous on [a, b] ⇒ hits every value in between'],['Converses','both fail: a function can hit all values without being continuous']],
 ex:[{q:'Does f(x) = 1/x attain a max on (0, 1]?',s:['f(x) → ∞ as x → 0⁺.','The interval isn\'t closed, so the EVT doesn\'t apply.'],a:'No.'}],
 traps:['Assuming a conclusion fails just because a hypothesis fails. It might still happen to hold.']});

// ---------- Derivatives ----------
X('m137_defn',{
 why:'First principles is how every derivative rule is proved, and it is examined directly.',
 idea:['f′(a) = lim as h → 0 of (f(a + h) − f(a))/h: the limit of the slopes of secant lines, which is the slope of the tangent line.','To compute: write f(a + h), subtract f(a), simplify the top until an h cancels, then let h → 0.'],
 keys:[['Derivative','f′(a) = lim (f(a + h) − f(a))/h'],['Alternate form','lim as x → a of (f(x) − f(a))/(x − a)'],['Tangent line','y = f(a) + f′(a)(x − a)'],['Differentiable ⇒ continuous','but not the converse (|x| at 0)']],
 ex:[{q:'Find f′(x) for f(x) = 1/x from first principles.',s:['(1/(x + h) − 1/x)/h = ((x − (x + h))/(x(x + h)))/h.','= −h/(h·x(x + h)) = −1/(x(x + h)).','Let h → 0.'],a:'f′(x) = −1/x²'}],
 traps:['Stopping at 0/0 instead of simplifying.']});

X('m137_rules',{
 why:'The differentiation rules are the tools you use in every later topic.',
 idea:['Linearity handles sums and constant multiples. The product rule is (fg)′ = f′g + fg′. The quotient rule is (f/g)′ = (f′g − fg′)/g². The chain rule is (f(g(x)))′ = f′(g(x))·g′(x): differentiate the outside, keep the inside, and multiply by the derivative of the inside.'],
 keys:[['Power','(xⁿ)′ = nxⁿ⁻¹'],['Product','(fg)′ = f′g + fg′'],['Quotient','(f/g)′ = (f′g − fg′)/g²'],['Chain','(f∘g)′ = f′(g(x))·g′(x)'],['eˣ, ln x','(eˣ)′ = eˣ, (ln x)′ = 1/x'],['aˣ','(aˣ)′ = aˣ ln a']],
 ex:[{q:'Differentiate f(x) = x² e^(3x).',s:['Product rule: (x²)′e^(3x) + x²(e^(3x))′.','Chain: (e^(3x))′ = 3e^(3x).','f′(x) = 2xe^(3x) + 3x²e^(3x).'],a:'f′(x) = xe^(3x)(2 + 3x)'}],
 traps:['Forgetting the inner derivative in the chain rule.','Getting the order wrong in the quotient rule numerator.']});

X('m137_trig',{
 why:'Trig and inverse-trig derivatives come up constantly, especially combined with the chain rule.',
 idea:['(sin x)′ = cos x and (cos x)′ = −sin x. The rest follow from the quotient rule: (tan x)′ = sec² x.','Inverse trig derivatives come from the IFT or implicit differentiation. Each has an algebraic answer, with no trig left in it.'],
 keys:[['sin, cos','(sin x)′ = cos x, (cos x)′ = −sin x'],['tan','(tan x)′ = sec² x'],['sec','(sec x)′ = sec x tan x'],['arcsin','1/√(1 − x²)'],['arccos','−1/√(1 − x²)'],['arctan','1/(1 + x²)']],
 ex:[{q:'Differentiate arctan(x²).',s:['Outside: 1/(1 + u²) with u = x².','Inside derivative: 2x.'],a:'2x/(1 + x⁴)'}],
 traps:['Forgetting the minus sign on cos.','Writing arcsin as 1/sin.']});

X('m137_ift',{
 why:'The IFT finds derivatives of inverses without a formula for the inverse.',
 idea:['If f is invertible and differentiable, and f′(f⁻¹(b)) ≠ 0, then (f⁻¹)′(b) = 1/f′(f⁻¹(b)). The slope of the inverse is the reciprocal of the original slope at the mirrored point.','In practice: find a with f(a) = b, then (f⁻¹)′(b) = 1/f′(a).'],
 keys:[['IFT','(f⁻¹)′(b) = 1/f′(a), where f(a) = b'],['Condition','f′(a) ≠ 0'],['Mirror','(a, b) on f corresponds to (b, a) on f⁻¹']],
 ex:[{q:'f(x) = x³ + x + 1. Find (f⁻¹)′(3).',s:['Solve f(a) = 3: a = 1 works (1 + 1 + 1).','f′(x) = 3x² + 1, so f′(1) = 4.'],a:'(f⁻¹)′(3) = 1/4'}],
 traps:['Computing 1/f′(3) instead of 1/f′(f⁻¹(3)).']});

X('m137_implicit',{
 why:'Implicit differentiation handles curves you can\'t solve for y.',
 idea:['Treat y as a function of x. Differentiate both sides with respect to x; every time y appears, the chain rule attaches dy/dx. Then solve for dy/dx.'],
 keys:[['(y²)′','2y·dy/dx'],['(xy)′','y + x·dy/dx (product rule)'],['Solve','collect the dy/dx terms on one side, factor, divide'],['Tangent','evaluate dy/dx at the point']],
 ex:[{q:'x² + y² = 25. Find the slope at (3, 4).',s:['2x + 2y·dy/dx = 0.','dy/dx = −x/y.','At (3, 4): −3/4.'],a:'−3/4'}],
 traps:['Forgetting dy/dx on y terms.','Missing the product rule on xy.']});

// ---------- Approximation ----------
X('m137_lin',{
 why:'Linear approximation estimates hard values using a tangent line.',
 idea:['Near x = a, the graph looks like its tangent line. So f(x) ≈ L_a(x) = f(a) + f′(a)(x − a).','Choose a close to the value you want, where f(a) and f′(a) are easy to compute.'],
 keys:[['L_a(x)','f(a) + f′(a)(x − a)'],['Good when','x is close to a'],['Concave up','the tangent line lies below the graph: underestimate'],['Concave down','overestimate']],
 ex:[{q:'Estimate √26.',s:['f(x) = √x, a = 25: f(25) = 5, f′(x) = 1/(2√x) = 1/10.','L(26) = 5 + (1/10)(1).'],a:'√26 ≈ 5.1 (actual 5.0990…)'}],
 traps:['Choosing an a where f(a) is hard to compute.']});

X('m137_linerr',{
 why:'An error bound tells you how good the approximation is.',
 idea:['The error is |f(x) − L_a(x)|. If |f″(t)| ≤ M for all t between a and x, then |f(x) − L_a(x)| ≤ (M/2)(x − a)².','The sign of f″ tells you the direction: concave up (f″ &gt; 0) means L underestimates.'],
 keys:[['Error','|f(x) − L_a(x)|'],['Bound','≤ (M/2)(x − a)², where |f″| ≤ M between a and x'],['f″ &gt; 0','L_a(x) ≤ f(x) (underestimate)'],['f″ &lt; 0','L_a(x) ≥ f(x) (overestimate)']],
 ex:[{q:'Bound the error in √26 ≈ 5.1.',s:['f″(x) = −1/(4x^(3/2)). On [25, 26], |f″| ≤ 1/(4·125) = 1/500.','Error ≤ (1/500)/2·1² = 1/1000.','f″ &lt; 0, so 5.1 is an overestimate.'],a:'Error ≤ 0.001, and 5.1 is slightly too big.'}],
 traps:['Taking M at the wrong end of the interval. Use the largest |f″|.']});

X('m137_newton',{
 why:'Newton\'s Method finds roots very quickly by following tangent lines.',
 idea:['From a guess xₙ, follow the tangent line to where it crosses the x-axis: xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ). Near a simple root, the number of correct digits roughly doubles each step.','It can fail if f′(xₙ) = 0 (a horizontal tangent), if it cycles, or if the start is too far from the root.'],
 keys:[['Iteration','xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ)'],['Fails when','f′(xₙ) = 0, cycling, or a bad start'],['Stop','when successive estimates agree to the precision you need']],
 ex:[{q:'Approximate √2 with f(x) = x² − 2 and x₀ = 1.',s:['x₁ = 1 − (−1)/2 = 1.5.','x₂ = 1.5 − 0.25/3 = 1.41667.','x₃ ≈ 1.414216.'],a:'√2 ≈ 1.41421'}],
 traps:['Adding f/f′ instead of subtracting.']});

X('m137_related',{
 why:'Related rates are word problems where quantities change together over time.',
 idea:['1) Draw and label the picture, with variables for anything that changes. 2) Find an equation relating the quantities (Pythagoras, similar triangles, area or volume). 3) Differentiate with respect to t. 4) Only now substitute the values at the given instant, and solve.'],
 keys:[['Order','differentiate before substituting numbers'],['Units','rates carry units per time'],['Signs','a decreasing quantity has a negative rate'],['Common','x² + y² = z², V = (1/3)πr²h, similar triangles']],
 ex:[{q:'A 10 m ladder slides down a wall. The base moves out at 1 m/s. How fast is the top falling when the base is 6 m out?',s:['x² + y² = 100.','2x·x′ + 2y·y′ = 0.','At x = 6, y = 8: 2(6)(1) + 2(8)y′ = 0.','y′ = −12/16 = −3/4.'],a:'The top falls at 0.75 m/s.'}],
 traps:['Substituting x = 6 before differentiating, which turns a variable into a constant.']});

// ---------- MVT and curve analysis ----------
X('m137_crit',{
 why:'Curve analysis puts derivatives together to describe the shape of a graph.',
 idea:['Critical points are where f′(c) = 0 or f′(c) doesn\'t exist, with c in the domain. Use the sign of f′ for increasing and decreasing, and f″ for concavity.','The First Derivative Test: if f′ changes from + to −, it\'s a local max; from − to +, a local min; no change, neither. Inflection points are where concavity actually changes.'],
 keys:[['Critical point','f′(c) = 0 or DNE, with c in the domain'],['f′ &gt; 0','increasing'],['FDT','sign change of f′ classifies the critical point'],['SDT','f′(c) = 0, f″(c) &lt; 0 ⇒ local max; f″(c) &gt; 0 ⇒ local min; = 0 ⇒ test fails'],['Inflection','concavity changes (f″ = 0 alone isn\'t enough)']],
 ex:[{q:'Classify the critical points of f(x) = x³ − 3x.',s:['f′ = 3x² − 3 = 0 gives x = ±1.','f″ = 6x: f″(−1) = −6 &lt; 0, f″(1) = 6 &gt; 0.'],a:'Local max at x = −1, local min at x = 1.'}],
 traps:['Counting points outside the domain as critical points.','Calling every point with f″ = 0 an inflection point (x⁴ at 0 is not).']});

X('m137_absext',{
 why:'Absolute extrema on a closed interval come from a short, mechanical procedure.',
 idea:['Closed Interval Method: on [a, b] with f continuous, the EVT guarantees a max and a min. They occur at critical points or at endpoints.','Evaluate f at every critical point inside (a, b) and at a and b. The largest value is the absolute max and the smallest is the absolute min.'],
 keys:[['Candidates','critical points in (a, b) and the endpoints a, b'],['Compare','evaluate f at every candidate'],['Needs','f continuous on [a, b] (EVT)']],
 ex:[{q:'Find the absolute extrema of f(x) = x³ − 3x on [0, 2].',s:['Critical points: x = ±1; only x = 1 is in [0, 2].','f(0) = 0, f(1) = −2, f(2) = 2.'],a:'Absolute max 2 at x = 2; absolute min −2 at x = 1.'}],
 traps:['Forgetting the endpoints.','Including a critical point outside the interval.']});

X('m137_mvtc',{
 why:'Finding the MVT point checks that you understand what the theorem promises.',
 idea:['MVT: if f is continuous on [a, b] and differentiable on (a, b), there is a c ∈ (a, b) with f′(c) = (f(b) − f(a))/(b − a). Somewhere, the instantaneous slope equals the average slope.','Rolle\'s Theorem is the special case f(a) = f(b), where f′(c) = 0.'],
 keys:[['MVT','f′(c) = (f(b) − f(a))/(b − a) for some c ∈ (a, b)'],['Hypotheses','continuous on [a, b], differentiable on (a, b)'],['Rolle','f(a) = f(b) ⇒ f′(c) = 0'],['Answer','only keep c inside (a, b)']],
 ex:[{q:'f(x) = x² on [1, 3]. Find c.',s:['Average slope: (9 − 1)/2 = 4.','f′(c) = 2c = 4.'],a:'c = 2'}],
 traps:['Keeping a solution outside (a, b).']});

X('m137_mvtb',{
 why:'The MVT\'s consequences are what make derivatives useful for proofs.',
 idea:['f′ = 0 on an interval means f is constant. f′ = g′ means f and g differ by a constant. f′ &gt; 0 means f is increasing.','Bounded Derivative Theorem: if m ≤ f′ ≤ M on (a, b), then f(a) + m(x − a) ≤ f(x) ≤ f(a) + M(x − a). This turns derivative bounds into value bounds and inequalities.'],
 keys:[['Constant Function Thm','f′ = 0 on an interval ⇒ f constant'],['Antiderivative Thm','f′ = g′ ⇒ f = g + C'],['Increasing Function Thm','f′ &gt; 0 ⇒ f increasing'],['Bounded Derivative','m ≤ f′ ≤ M ⇒ f(a) + m(x − a) ≤ f(x) ≤ f(a) + M(x − a)']],
 ex:[{q:'Show eˣ ≥ 1 + x for x ≥ 0.',s:['Let g(x) = eˣ − 1 − x. Then g(0) = 0.','g′(x) = eˣ − 1 ≥ 0 for x ≥ 0, so g is increasing.','So g(x) ≥ g(0) = 0.'],a:'eˣ ≥ 1 + x'}],
 traps:['Applying the Constant Function Theorem on a domain that isn\'t an interval (1/x has pieces).']});

// ---------- Taylor ----------
X('m137_lhop',{
 why:'L\'Hôpital\'s Rule handles indeterminate forms that algebra can\'t.',
 idea:['For 0/0 or ∞/∞ forms: lim f/g = lim f′/g′, if the second limit exists. Differentiate the top and bottom separately; this is not the quotient rule.','Other forms convert. 0·∞ becomes f/(1/g). ∞ − ∞ becomes one fraction. For 1^∞, 0⁰ and ∞⁰, take ln first, then exponentiate at the end.'],
 keys:[['Rule','0/0 or ∞/∞: lim f/g = lim f′/g′'],['Check','confirm the indeterminate form at every application'],['0·∞','rewrite as a fraction'],['1^∞ etc.','y = f^g, then ln y = g ln f'],['Classic','lim (1 + 1/n)ⁿ = e']],
 ex:[{q:'lim as x → 0⁺ of x ln x.',s:['Form 0·(−∞). Rewrite as ln x/(1/x): −∞/∞.','L\'H: (1/x)/(−1/x²) = −x → 0.'],a:'0'},
  {q:'lim as x → 0 of (1 + 2x)^(1/x).',s:['1^∞. ln y = ln(1 + 2x)/x, a 0/0 form.','L\'H: 2/(1 + 2x) → 2.','y → e².'],a:'e²'}],
 traps:['Using the quotient rule instead of differentiating top and bottom separately.','Applying L\'H to a form that isn\'t indeterminate.']});

X('m137_taylor',{
 why:'Taylor polynomials approximate functions with polynomials that match more and more derivatives.',
 idea:['Tₙ,ₐ(x) = Σₖ₌₀ⁿ f⁽ᵏ⁾(a)/k! · (x − a)ᵏ. It matches f and its first n derivatives at a. T₁ is the linear approximation.','Memorize the Maclaurin polynomials (a = 0) of eˣ, sin x, cos x, ln(1 + x) and 1/(1 − x). Substitute into them to get new ones: e<sup>x²</sup> comes from eˣ with x replaced by x².'],
 keys:[['Tₙ,ₐ','Σ f⁽ᵏ⁾(a)(x − a)ᵏ/k!'],['eˣ','1 + x + x²/2! + x³/3! + ⋯'],['sin x','x − x³/3! + x⁵/5! − ⋯'],['cos x','1 − x²/2! + x⁴/4! − ⋯'],['ln(1 + x)','x − x²/2 + x³/3 − ⋯'],['1/(1 − x)','1 + x + x² + ⋯']],
 ex:[{q:'Find T₄,₀ for f(x) = e^(−x²).',s:['eᵘ ≈ 1 + u + u²/2 with u = −x².','= 1 − x² + x⁴/2.'],a:'T₄(x) = 1 − x² + x⁴/2'}],
 traps:['Forgetting the k! in the denominator.','Expanding about the wrong centre.']});

X('m137_rem',{
 why:'Taylor\'s Theorem bounds the error, so you know how accurate an approximation is.',
 idea:['f(x) = Tₙ,ₐ(x) + Rₙ,ₐ(x), where Rₙ,ₐ(x) = f⁽ⁿ⁺¹⁾(c)/(n + 1)! · (x − a)ⁿ⁺¹ for some c between a and x.','For a bound, replace |f⁽ⁿ⁺¹⁾(c)| by its maximum M on that interval: |R| ≤ M|x − a|ⁿ⁺¹/(n + 1)!.'],
 keys:[['Remainder','Rₙ(x) = f⁽ⁿ⁺¹⁾(c)(x − a)ⁿ⁺¹/(n + 1)!'],['c','some point between a and x'],['Bound','|Rₙ| ≤ M|x − a|ⁿ⁺¹/(n + 1)!'],['sin, cos','M = 1 always works']],
 ex:[{q:'Bound the error using T₃,₀ of sin x to approximate sin(0.1).',s:['n = 3, so you need f⁽⁴⁾ = sin, which has |sin c| ≤ 1.','|R₃| ≤ (0.1)⁴/4! = 0.0001/24.'],a:'Error ≤ 4.2 × 10⁻⁶'}],
 traps:['Using the nth derivative instead of the (n + 1)th.']});

X('m137_bigO',{
 why:'Big-O notation tracks how big an error term is without exact constants.',
 idea:['f(x) = O(g(x)) as x → 0 means |f(x)| ≤ M|g(x)| near 0: f is at most a constant times g. Higher powers of x are smaller near 0, so O(x³) terms are smaller than O(x²) terms.','Taylor\'s Approximation Theorem II gives f(x) = Tₙ,₀(x) + O(xⁿ⁺¹). Use it to compute limits by expanding everything to enough terms.'],
 keys:[['O(g)','|f| ≤ M|g| near 0'],['Sum','O(xᵐ) + O(xⁿ) = O(x^min(m, n))'],['Product','xᵐ·O(xⁿ) = O(xᵐ⁺ⁿ)'],['TAT II','f(x) = Tₙ,₀(x) + O(xⁿ⁺¹)']],
 ex:[{q:'Use Big-O to find lim as x → 0 of (sin x − x)/x³.',s:['sin x = x − x³/6 + O(x⁵).','sin x − x = −x³/6 + O(x⁵).','Divide by x³: −1/6 + O(x²) → −1/6.'],a:'−1/6'}],
 traps:['Expanding too few terms, which leaves 0/0.','Treating O(x²) − O(x²) as 0. It\'s still O(x²).']});
