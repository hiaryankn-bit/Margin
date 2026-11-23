// ===== Rich lessons: PHYS 121 (g = 9.81 m/s²) =====

X('phys_vec',{
 why:'Almost every 2-D mechanics problem starts by splitting vectors into components.',
 idea:['A vector has a magnitude and a direction. Resolve it into perpendicular components, then work with each axis separately. With θ measured from the +x axis: Aₓ = A cos θ and Aᵧ = A sin θ.','To go back: A = √(Aₓ² + Aᵧ²) and θ = tan⁻¹(Aᵧ/Aₓ), then fix the quadrant using the signs of the components. Add vectors by adding their components.'],
 keys:[['Components','Aₓ = A cos θ, Aᵧ = A sin θ (θ from +x)'],['Magnitude','√(Aₓ² + Aᵧ²)'],['Direction','tan⁻¹(Aᵧ/Aₓ), then check the quadrant'],['Addition','add x parts and y parts separately'],['Dot product','A·B = AB cos φ = AₓBₓ + AᵧBᵧ'],['Cross product','|A × B| = AB sin φ (right-hand rule)']],
 ex:[{q:'Add A = 5.0 m at 30° and B = 3.0 m at 120°.',s:['A: (4.33, 2.50).','B: (3 cos 120°, 3 sin 120°) = (−1.50, 2.60).','Sum: (2.83, 5.10).','Magnitude √(2.83² + 5.10²) = 5.83 m. Angle tan⁻¹(5.10/2.83) = 61°.'],a:'5.8 m at 61° above +x'}],
 traps:['Using sin for x when θ is measured from +x.','Trusting tan⁻¹ in quadrants II and III. Add 180° when Aₓ &lt; 0.']});

X('phys_units',{
 why:'Unit mistakes and sloppy significant figures cost easy marks on every problem.',
 idea:['Convert everything to SI before substituting: m, kg, s. Check dimensions: both sides of an equation must have the same units, which catches many algebra errors.','Significant figures: for × and ÷, the answer keeps the fewest sig figs of any input. For + and −, it keeps the fewest decimal places. Round only at the end.'],
 keys:[['km/h → m/s','divide by 3.6'],['× and ÷','fewest significant figures'],['+ and −','fewest decimal places'],['Prefixes','k = 10³, c = 10⁻², m = 10⁻³, μ = 10⁻⁶, n = 10⁻⁹'],['Dimensional check','both sides have the same units']],
 ex:[{q:'Convert 72 km/h to m/s.',s:['72 km/h × (1000 m/1 km) × (1 h/3600 s).'],a:'20 m/s'},
  {q:'Compute 12.1 × 0.0300 with correct sig figs.',s:['12.1 has 3 sig figs and 0.0300 has 3.','12.1 × 0.0300 = 0.363.'],a:'0.363'}],
 traps:['Squared units: 1 cm² = 10⁻⁴ m², not 10⁻² m².','Rounding intermediate answers.']});

X('phys_kin',{
 why:'The constant-acceleration equations solve every 1-D motion problem with constant a.',
 idea:['With constant acceleration there are five quantities: Δx, v₀, v, a and t. Each equation leaves one out. List what you know and what you want, then pick the equation without the quantity you neither know nor need.','For free fall, a = −g with up positive, g = 9.81 m/s². At the top of a vertical throw, v = 0 but a is still −g.'],
 keys:[['No Δx','v = v₀ + at'],['No v','Δx = v₀t + ½at²'],['No t','v² = v₀² + 2aΔx'],['No a','Δx = ½(v₀ + v)t'],['Free fall','a = −9.81 m/s² (up positive)'],['Top of flight','v = 0, a = −g']],
 ex:[{q:'A ball is thrown up at 15 m/s. Find the maximum height.',s:['At the top, v = 0. a = −9.81 and Δx is unknown, with no t needed.','0 = 15² − 2(9.81)Δx.','Δx = 225/19.62.'],a:'11.5 m'},
  {q:'A car brakes from 25 m/s to rest in 50 m. Find a.',s:['No t: 0 = 25² + 2a(50).'],a:'a = −6.25 m/s²'}],
 traps:['Mixed sign conventions: choose positive once and stick to it.','Setting a = 0 at the top of the flight.']});

X('phys_graph',{
 why:'Reading motion graphs is tested constantly through concept questions.',
 idea:['On an x–t graph, the slope is velocity. On a v–t graph, the slope is acceleration and the area under the curve is displacement (area below the axis counts as negative).','An object speeds up when v and a have the same sign, and slows down when they have opposite signs. Average velocity is displacement/time; average speed is distance/time. They differ when the object turns around.'],
 keys:[['x–t slope','velocity'],['v–t slope','acceleration'],['v–t area','displacement'],['Speeding up','v and a have the same sign'],['Avg velocity','Δx/Δt'],['Avg speed','total distance/Δt']],
 ex:[{q:'A runner goes 100 m east and back to the start in 40 s. Average velocity and average speed?',s:['Displacement = 0.','Distance = 200 m.'],a:'Average velocity 0; average speed 5.0 m/s'}],
 traps:['Thinking negative acceleration always means slowing down.','Confusing distance with displacement.']});

X('phys_proj',{
 why:'Projectiles combine two 1-D problems that share the same time.',
 idea:['Treat x and y separately. Horizontally, velocity is constant (ignoring air resistance): x = v₀ cos θ · t. Vertically, acceleration is −g: y = v₀ sin θ · t − ½gt².','The time links the two directions. Solve for t in one direction, then use it in the other. For launches over level ground, the range formula is R = v₀² sin(2θ)/g, which is largest at 45°.'],
 keys:[['x','vₓ = v₀ cos θ (constant)'],['y','vᵧ = v₀ sin θ − gt'],['Time of flight (level)','T = 2v₀ sin θ/g'],['Range (level)','R = v₀² sin 2θ/g'],['Max height','H = (v₀ sin θ)²/(2g)'],['Horizontal launch from h','t = √(2h/g)']],
 ex:[{q:'A ball rolls off a 1.25 m table at 3.0 m/s. Where does it land?',s:['Vertical: 1.25 = ½(9.81)t², so t = 0.505 s.','Horizontal: x = 3.0 × 0.505.'],a:'1.5 m from the table'}],
 traps:['Using the level-ground formulas when the heights differ.','Giving vₓ an acceleration.']});

X('phys_rel',{
 why:'Relative velocity handles boats in rivers, planes in wind and moving observers.',
 idea:['Velocities add as vectors through a common reference frame: v_{A/C} = v_{A/B} + v_{B/C}. Read it as "A relative to C equals A relative to B plus B relative to C".','For a river crossing, the time to cross depends only on the component of the boat\'s velocity straight across. The current pushes the boat downstream for that time.'],
 keys:[['Chain rule','v_{A/C} = v_{A/B} + v_{B/C}'],['Reverse','v_{B/A} = −v_{A/B}'],['Crossing time','width/(across component)'],['Drift','v_current × crossing time'],['Straight across','aim upstream so the components cancel']],
 ex:[{q:'A boat moves at 4.0 m/s relative to the water, aimed straight across a 120 m river flowing at 3.0 m/s. Time and drift?',s:['Crossing time = 120/4.0 = 30 s.','Drift = 3.0 × 30 = 90 m.','Ground speed = √(4² + 3²) = 5.0 m/s.'],a:'30 s, 90 m downstream'}],
 traps:['Adding speeds as plain numbers instead of vectors.']});

X('phys_circ',{
 why:'Uniform circular motion has acceleration even at constant speed.',
 idea:['Moving in a circle at constant speed, the velocity keeps changing direction. That takes a centripetal acceleration a_c = v²/r, pointing toward the centre.','The period T is the time for one revolution, so v = 2πr/T. If the speed is also changing, there is a tangential acceleration too, and the total acceleration has both parts.'],
 keys:[['a_c','v²/r, toward the centre'],['v','2πr/T'],['a_c (period form)','4π²r/T²'],['Non-uniform','a = √(a_c² + a_t²)']],
 ex:[{q:'A car takes a 50 m radius curve at 20 m/s. Find a_c.',s:['a_c = 20²/50.'],a:'8.0 m/s² toward the centre'}],
 traps:['Thinking constant speed means zero acceleration.','Calling centripetal force a separate force on a free-body diagram. It\'s the net inward force.']});

X('phys_incline',{
 why:'Inclines with friction are the classic Newton\'s second law problem.',
 idea:['Tilt the axes to match the slope. Gravity splits into mg sin θ down the slope and mg cos θ into the surface, so N = mg cos θ (with no other perpendicular forces).','Kinetic friction f_k = μ_k N opposes sliding. Static friction adjusts as needed up to μ_s N. An object on an incline starts to slip when tan θ &gt; μ_s.'],
 keys:[['Along the slope','mg sin θ (down the slope)'],['Normal','N = mg cos θ'],['Kinetic friction','f_k = μ_k N, opposing the motion'],['Static friction','f_s ≤ μ_s N'],['Slip angle','tan θ = μ_s'],['Sliding down','a = g(sin θ − μ_k cos θ)']],
 ex:[{q:'A block slides down a 30° incline with μ_k = 0.20. Find a.',s:['a = g(sin 30° − 0.20 cos 30°).','= 9.81(0.500 − 0.173).'],a:'3.2 m/s² down the slope'}],
 traps:['Setting N = mg on an incline.','Assuming static friction is always μ_s N. That\'s only the maximum.']});

X('phys_atwood',{
 why:'Pulley and elevator problems test free-body diagrams with more than one object.',
 idea:['Draw a free-body diagram for each mass and write ΣF = ma for each one, choosing positive directions consistently with the motion. An ideal rope (massless, over a frictionless pulley) has the same tension throughout, and the connected masses share the same magnitude of acceleration.','In an elevator, your apparent weight is the normal force: N = m(g + a), with a positive upward.'],
 keys:[['Each mass','its own FBD and ΣF = ma'],['Ideal rope','same T, same |a|'],['Atwood','a = (m₂ − m₁)g/(m₁ + m₂)'],['Tension (Atwood)','T = 2m₁m₂g/(m₁ + m₂)'],['Elevator','N = m(g + a), up positive']],
 ex:[{q:'Atwood machine with 3.0 kg and 5.0 kg masses. Find a and T.',s:['a = (5 − 3)(9.81)/8 = 2.45 m/s².','T = 3.0(9.81 + 2.45) = 36.8 N.'],a:'a = 2.45 m/s², T = 36.8 N'}],
 traps:['Assuming T = mg for a mass that is accelerating.','Inconsistent positive directions for the two masses.']});

X('phys_newton',{
 why:'Newton\'s laws concept questions catch the most common misconceptions.',
 idea:['First law: with zero net force, velocity stays constant (that includes being at rest). Second law: ΣF = ma, so the net force causes acceleration, not velocity. Third law: forces come in equal and opposite pairs acting on different objects.','A third-law pair never cancels, because the two forces act on different bodies. Weight and the normal force are not a third-law pair.'],
 keys:[['1st law','ΣF = 0 ⇔ constant velocity'],['2nd law','ΣF = ma'],['3rd law','F_{A on B} = −F_{B on A}'],['Weight','mg (Earth pulls the object)'],['Normal force','contact force, perpendicular to the surface']],
 ex:[{q:'A book rests on a table. What is the third-law partner of the table\'s normal force on the book?',s:['Normal force: the table pushes up on the book.','Partner: same pair of objects, reversed.'],a:'The book pushes down on the table.'}],
 traps:['"Motion needs a force." Only changes in motion need a net force.','Pairing weight with the normal force as action–reaction.']});

X('phys_bank',{
 why:'Banked curves and loops apply circular motion to real forces.',
 idea:['Pick the centre of the circle and add the force components pointing toward it: Σ F_in = mv²/r. For a car on a banked curve, the centre is horizontal. Don\'t tilt the axes along the bank, because the acceleration is horizontal.','Frictionless bank: N sin θ supplies the centripetal force and N cos θ balances weight, so tan θ = v²/(rg). At the top of a vertical loop, gravity alone can provide the centripetal force at the minimum speed v = √(gr).'],
 keys:[['Circular dynamics','Σ F_toward centre = mv²/r'],['Frictionless bank','tan θ = v²/(rg)'],['Flat curve with friction','μ_s mg = mv²/r'],['Loop top (minimum)','v = √(gr)'],['Loop top','N + mg = mv²/r'],['Loop bottom','N − mg = mv²/r']],
 ex:[{q:'What bank angle lets a car take a 100 m radius curve at 20 m/s with no friction?',s:['tan θ = v²/(rg) = 400/(100 × 9.81) = 0.408.'],a:'θ ≈ 22°'}],
 traps:['Tilting the axes along the bank. That makes the algebra much harder.','Adding "centripetal force" as an extra force on the FBD.']});

X('phys_work',{
 why:'Work and power connect forces to energy.',
 idea:['Work done by a constant force: W = Fd cos θ, where θ is the angle between the force and the displacement. A force perpendicular to the motion does no work, such as the normal force on level ground.','The work–energy theorem: W_net = ΔK. A spring\'s work comes from the area under F = kx, ½kx². Power is how fast work is done: P = W/t = Fv.'],
 keys:[['W','Fd cos θ (J)'],['W_net','ΔK = ½mv₂² − ½mv₁²'],['Spring work','½kx² (from equilibrium)'],['Power','P = W/t = Fv (W)'],['⊥ force','does no work']],
 ex:[{q:'You pull a sled 20 m with 50 N at 30° above horizontal. Find the work.',s:['W = (50)(20) cos 30°.'],a:'866 J'}],
 traps:['Using the angle to the vertical.','Saying friction does positive work.']});

X('phys_energy',{
 why:'Energy conservation solves many problems faster than forces.',
 idea:['Track energy between two moments: K₁ + U₁ + W_other = K₂ + U₂. With only gravity and springs doing work, mechanical energy is conserved: K₁ + U₁ = K₂ + U₂.','Friction removes mechanical energy as heat, W_f = −f_k d. Energy methods don\'t care about the path for gravity and springs, which is why they work so well on curved tracks.'],
 keys:[['Energy equation','K₁ + U₁ + W_other = K₂ + U₂'],['K','½mv²'],['U_g','mgh'],['U_s','½kx²'],['Friction','W = −μ_k N d'],['Path','independent for conservative forces']],
 ex:[{q:'A 2.0 kg block slides from rest down a frictionless track from a height of 5.0 m. Speed at the bottom?',s:['mgh = ½mv².','v = √(2gh) = √(2 × 9.81 × 5.0).'],a:'9.9 m/s (the mass cancels)'}],
 traps:['Forgetting friction\'s energy loss.','Measuring h from different reference levels in the same problem.']});

X('phys_mom',{
 why:'Momentum conservation handles collisions, where forces are too complicated to track.',
 idea:['Momentum p = mv is a vector. Impulse J = FΔt = Δp: a force acting over time changes momentum.','For an isolated system, total momentum is conserved in every collision. Kinetic energy is conserved only in elastic collisions. In a perfectly inelastic collision, the objects stick together and the KE loss is as large as possible.'],
 keys:[['p','mv (vector)'],['Impulse','J = FΔt = Δp = area under F–t'],['Conservation','Σp_before = Σp_after (isolated system)'],['Elastic','KE conserved too'],['Perfectly inelastic','common final velocity'],['2-D','conserve x and y separately']],
 ex:[{q:'A 1000 kg car at 20 m/s hits a stationary 1500 kg car and they lock together. Find v and the % of KE lost.',s:['1000(20) = 2500v, so v = 8.0 m/s.','KE before: ½(1000)(400) = 200 kJ. After: ½(2500)(64) = 80 kJ.'],a:'8.0 m/s; 60% of the KE is lost'}],
 traps:['Assuming KE is conserved in every collision.','Forgetting momentum is a vector, so direction signs matter.']});

X('phys_rot',{
 why:'Rotational dynamics mirrors linear motion with new variables.',
 idea:['Every linear quantity has a rotational partner: θ, ω and α for x, v and a; torque τ for force; moment of inertia I for mass. So Στ = Iα, and the constant-α kinematics equations look exactly like the linear ones.','Torque τ = rF sin φ: the force times its lever arm. For rolling without slipping, v = ωR and KE = ½mv² + ½Iω². Angular momentum L = Iω is conserved with no external torque.'],
 keys:[['Kinematics','ω = ω₀ + αt, θ = ω₀t + ½αt²'],['Torque','τ = rF sin φ'],['2nd law','Στ = Iα'],['Rolling','v = ωR, KE = ½mv² + ½Iω²'],['I','solid disk ½MR², hoop MR², solid sphere ⅖MR², rod (centre) MR²/12'],['Angular momentum','L = Iω, conserved if Στ_ext = 0']],
 ex:[{q:'A solid ball rolls from rest down a 2.0 m high ramp without slipping. Speed at the bottom?',s:['mgh = ½mv² + ½(⅖mR²)(v/R)² = (7/10)mv².','v = √(10gh/7) = √(10 × 9.81 × 2.0/7).'],a:'5.3 m/s (slower than sliding, √(2gh) = 6.3 m/s)'}],
 traps:['Forgetting rotational KE for rolling objects.','Using degrees in ω and α. Use radians.']});

X('phys_rotb',{
 why:'Rotation concept questions test intuition about I, torque and equilibrium.',
 idea:['Moment of inertia depends on how far the mass is from the axis, not only on how much mass there is. A hoop is harder to spin than a disk of the same mass and radius.','Static equilibrium needs both ΣF = 0 and Στ = 0. You may take torques about any point, so choose one that eliminates unknown forces.','A skater pulling in their arms decreases I, so ω increases (L = Iω stays the same).'],
 keys:[['I','Σmr², depends on the mass distribution'],['Equilibrium','ΣF = 0 and Στ = 0'],['Pivot choice','put it where an unknown force acts'],['Conservation','I₁ω₁ = I₂ω₂']],
 ex:[{q:'A 4.0 m plank is supported at both ends. A 600 N person stands 1.0 m from the left end. Ignoring the plank\'s weight, find the force at the right support.',s:['Take torques about the left end: R(4.0) = 600(1.0).'],a:'R = 150 N (the left support takes 450 N)'}],
 traps:['Thinking more mass always means more I. Its position matters more.']});

X('phys_lab',{
 why:'Lab reports need uncertainty propagation and a fair comparison between results.',
 idea:['Every measurement has an uncertainty. When you combine measurements, combine their uncertainties in quadrature. For sums and differences, combine absolute uncertainties. For products and quotients, combine relative uncertainties. A power n multiplies the relative uncertainty by n.','To compare two values a ± δa and b ± δb, use t′ = |a − b|/√(δa² + δb²). The usual guideline: t′ &lt; 1 means they agree, 1 ≤ t′ ≤ 3 is inconclusive, and t′ &gt; 3 means they disagree. Check your lab manual for its exact thresholds.'],
 keys:[['Sum or difference','δs = √(δx² + δy²)'],['Product or quotient','δq/q = √((δx/x)² + (δy/y)²)'],['Power','q = xⁿ ⇒ δq/q = |n|·δx/x'],['t′','|a − b|/√(δa² + δb²)'],['Guideline','&lt; 1 agree; 1–3 inconclusive; &gt; 3 disagree'],['Reporting','uncertainty to 1–2 sig figs; value to the same decimal place']],
 ex:[{q:'Measured g = 9.70 ± 0.08 m/s². Accepted g = 9.81 ± 0.01 m/s². Compare them.',s:['|a − b| = 0.11.','√(0.08² + 0.01²) = 0.0806.','t′ = 0.11/0.0806 = 1.4.'],a:'t′ ≈ 1.4: inconclusive'}],
 traps:['Adding uncertainties directly instead of in quadrature.','Reporting 9.7034 ± 0.08. Round the value to match the uncertainty.']});
