// ===== Rich lessons: CHEM 120 (grounded in Modules 1–6) =====

// ---------- Module 1 ----------
X('chem_mole',{
 why:'Every stoichiometry problem goes through moles. Grams and particles are only the start and the finish.',
 idea:['A mole is 6.022 × 10²³ particles (Avogadro\'s number, N_A). The molar mass M (g/mol) is the mass of one mole, found by adding atomic masses from the formula.','Convert with n = m/M and N = n·N_A. Mass percent of an element is the mass of that element in one mole of the compound, divided by the molar mass.'],
 keys:[['n','m/M (mol = g ÷ g/mol)'],['N','n·N_A, N_A = 6.022 × 10²³ mol⁻¹'],['M','sum of atomic masses in the formula'],['Mass %','(mass of element in 1 mol)/M × 100%'],['Molarity','c = n/V (mol/L)']],
 ex:[{q:'How many molecules are in 36.0 g of H₂O?',s:['M(H₂O) = 2(1.008) + 16.00 = 18.02 g/mol.','n = 36.0/18.02 = 2.00 mol.','N = 2.00 × 6.022 × 10²³.'],a:'1.20 × 10²⁴ molecules'},
  {q:'Mass percent of C in CO₂?',s:['M(CO₂) = 12.01 + 2(16.00) = 44.01 g/mol.','12.01/44.01 × 100%.'],a:'27.29%'}],
 traps:['Using atomic mass for a diatomic: O₂ is 32.00 g/mol, not 16.00.','Rounding molar masses too early.']});

X('chem_balance',{
 why:'Stoichiometry only works with a balanced equation. The coefficients are the mole ratios.',
 idea:['Balancing conserves atoms: every element has the same count on both sides. Only change coefficients, never subscripts, because changing a subscript changes the substance.','Strategy: balance elements that appear in only one reactant and one product first. Leave free elements like O₂ or H₂ until last. Clear fractions at the end by multiplying everything through.'],
 keys:[['Rule','change coefficients, never subscripts'],['Order','unique elements first, free elements last'],['Combustion','CₓHᵧ + O₂ → CO₂ + H₂O; balance C, then H, then O'],['Fractions','allowed temporarily; multiply through at the end']],
 ex:[{q:'Balance C₃H₈ + O₂ → CO₂ + H₂O.',s:['C: 3 CO₂.','H: 8 H gives 4 H₂O.','O on the right: 3(2) + 4(1) = 10, so 5 O₂.'],a:'C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O'},
  {q:'Balance C₂H₆ + O₂ → CO₂ + H₂O.',s:['2 CO₂ and 3 H₂O.','O on the right: 4 + 3 = 7, so 7/2 O₂.','Multiply everything by 2.'],a:'2 C₂H₆ + 7 O₂ → 4 CO₂ + 6 H₂O'}],
 traps:['Changing H₂O to H₂O₂ to "balance" oxygen.','Forgetting to double-check every element at the end.']});

X('chem_limiting',{
 why:'Real reactions rarely use exact ratios. The limiting reagent decides how much product you get.',
 idea:['Convert each reactant to moles, then divide by its coefficient in the balanced equation. The smallest result is the limiting reagent; it runs out first. Everything else is in excess.','The theoretical yield comes from the limiting reagent. Percent yield compares what you actually got to that maximum. For solutions, moles = concentration × volume (in L).'],
 keys:[['Limiting','smallest (moles ÷ coefficient)'],['Theoretical yield','calculated from the limiting reagent'],['% yield','actual/theoretical × 100%'],['Solutions','n = cV, with V in litres'],['Excess left','initial − amount used']],
 ex:[{q:'25.0 mL of 0.325 M AgNO₃ is mixed with 30.0 mL of 0.120 M KCl. What mass of AgCl forms? (Module 1 example)',s:['n(Ag⁺) = 0.0250 × 0.325 = 8.13 × 10⁻³ mol.','n(Cl⁻) = 0.0300 × 0.120 = 3.60 × 10⁻³ mol.','1 : 1 ratio, so Cl⁻ is limiting: 3.60 × 10⁻³ mol AgCl.','× 143.32 g/mol.'],a:'0.516 g AgCl'}],
 traps:['Comparing grams instead of moles.','Forgetting to divide by the coefficients when they aren\'t 1.']});

X('chem_precip',{
 why:'Precipitation reactions and net ionic equations show what is really happening in solution.',
 idea:['Strong electrolytes (soluble ionic compounds, strong acids and bases) split completely into ions in water. When two solutions mix, a precipitate forms if any cation–anion pair is insoluble.','Molecular equation → complete ionic equation (split the aqueous strong electrolytes) → cancel the spectator ions that appear unchanged on both sides → net ionic equation.'],
 keys:[['Always soluble','Group 1 cations, NH₄⁺, NO₃⁻, CH₃COO⁻'],['Usually soluble','Cl⁻, Br⁻, I⁻ (except with Ag⁺, Pb²⁺, Hg₂²⁺); SO₄²⁻ (except Ba²⁺, Pb²⁺, Ca²⁺, Sr²⁺)'],['Usually insoluble','CO₃²⁻, PO₄³⁻, S²⁻, OH⁻ (except with Group 1, NH₄⁺; some Group 2)'],['Spectator ions','unchanged on both sides; cancel them'],['Keep together','solids, liquids, gases and weak electrolytes']],
 ex:[{q:'Write the net ionic equation for AgNO₃(aq) + NaCl(aq).',s:['Products: AgCl and NaNO₃. AgCl is insoluble.','Complete ionic: Ag⁺ + NO₃⁻ + Na⁺ + Cl⁻ → AgCl(s) + Na⁺ + NO₃⁻.','Cancel the spectators Na⁺ and NO₃⁻.'],a:'Ag⁺(aq) + Cl⁻(aq) → AgCl(s)'}],
 traps:['Splitting a solid precipitate into ions.','Forgetting to balance charge in the net ionic equation.']});

X('chem_green',{
 why:'Green chemistry metrics measure how wasteful a reaction or process is.',
 idea:['Atom economy is a theoretical measure from the balanced equation: what fraction of the reactant mass ends up in the desired product? Addition reactions with one product have 100% atom economy.','The E-factor is a practical measure: kilograms of waste per kilogram of product. Water is not counted as waste, but substances dissolved in wastewater are. A smaller E-factor is better.'],
 keys:[['% atom economy','(stoichiometric mass of desired product)/(mass of stoichiometric mixture of reactants) × 100%'],['E-factor','mass of waste/mass of product'],['Water','excluded from waste (dissolved substances count)'],['Ideal','100% atom economy and E-factor = 0'],['Process E-factor','(kg raw materials − kg product)/kg product']],
 ex:[{q:'Atom economy for making CaO by CaCO₃ → CaO + CO₂?',s:['Reactant mass: M(CaCO₃) = 100.09 g.','Desired product: M(CaO) = 56.08 g.','56.08/100.09 × 100%.'],a:'56.03%'},
  {q:'A process uses 10.0 kg of raw materials (not counting water) and yields 2.0 kg of product. E-factor?',s:['Waste = 10.0 − 2.0 = 8.0 kg.','8.0/2.0.'],a:'E-factor = 4.0'}],
 traps:['Using actual yield in atom economy. It\'s based on the balanced equation only.','Including water in the E-factor.','Forgetting the coefficients in the reactant mass.']});

// ---------- Module 2 ----------
X('chem_light',{
 why:'Light connects the energy of electrons to what we can measure: colours and wavelengths.',
 idea:['Light is a wave: c = λν, with c = 2.998 × 10⁸ m/s. It also comes in packets called photons, each with energy E = hν = hc/λ. Shorter wavelength means higher frequency and more energy per photon.','The photoelectric effect showed the particle picture: electrons are ejected only above a threshold frequency, whatever the intensity. Brighter light gives more photons, not more energetic ones.'],
 keys:[['c','λν = 2.998 × 10⁸ m/s'],['E (photon)','hν = hc/λ'],['h','6.626 × 10⁻³⁴ J·s'],['Per mole','E × N_A'],['Photoelectric','KE(electron) = hν − Φ (work function)'],['Units','nm = 10⁻⁹ m']],
 ex:[{q:'Find ν and the photon energy for λ = 500. nm.',s:['ν = c/λ = (2.998 × 10⁸)/(5.00 × 10⁻⁷) = 6.00 × 10¹⁴ Hz.','E = hν = (6.626 × 10⁻³⁴)(6.00 × 10¹⁴).'],a:'3.97 × 10⁻¹⁹ J per photon'}],
 traps:['Forgetting to convert nm to m.','Thinking higher intensity means higher energy per photon.']});

X('chem_bohr',{
 why:'The Bohr model explains the line spectrum of hydrogen from quantized energy levels.',
 idea:['In hydrogen, the electron\'s energy is quantized: Eₙ = −R_H/n², with R_H = 2.179 × 10⁻¹⁸ J. n = 1 is the lowest energy (ground state). As n → ∞, E → 0 (ionized).','When the electron drops from n_i to a lower n_f, it emits a photon with energy equal to the energy gap. Absorption goes upward. Bigger jumps give more energy and shorter wavelengths.'],
 keys:[['Eₙ','−R_H/n², R_H = 2.179 × 10⁻¹⁸ J'],['ΔE','R_H(1/n_f² − 1/n_i²) in magnitude'],['Emission','high n → low n (photon out)'],['Absorption','low n → high n (photon in)'],['λ','hc/|ΔE|'],['Ionization from n = 1','R_H per atom']],
 ex:[{q:'Find λ for the transition n = 3 → n = 2 in H.',s:['|ΔE| = 2.179 × 10⁻¹⁸ (1/2² − 1/3²) = 2.179 × 10⁻¹⁸ × 5/36.','|ΔE| = 3.026 × 10⁻¹⁹ J.','λ = hc/ΔE = (6.626 × 10⁻³⁴)(2.998 × 10⁸)/(3.026 × 10⁻¹⁹).'],a:'6.56 × 10⁻⁷ m = 656 nm (red)'}],
 traps:['Mixing up which n goes first. Use the absolute value and think about the direction.','Applying the Bohr formula to atoms with more than one electron.']});

X('chem_debroglie',{
 why:'de Broglie and Heisenberg explain why electrons need quantum mechanics instead of orbits.',
 idea:['de Broglie proposed that matter also has a wavelength: λ = h/(mv). For everyday objects it is far too small to notice. For electrons, it is about the size of an atom.','The Heisenberg Uncertainty Principle says Δx·Δp ≥ h/(4π): you can\'t know a particle\'s position and momentum exactly at the same time. So electrons don\'t have definite trajectories, and Bohr-style orbits fail.'],
 keys:[['de Broglie','λ = h/(mv) = h/p'],['m','in kg (electron: 9.109 × 10⁻³¹ kg)'],['HUP','Δx·Δp ≥ h/(4π)'],['Δp','m·Δv'],['Meaning','no exact trajectories for electrons']],
 ex:[{q:'Find λ for an electron moving at 1.00 × 10⁶ m/s.',s:['λ = h/(mv) = 6.626 × 10⁻³⁴/(9.109 × 10⁻³¹ × 1.00 × 10⁶).'],a:'7.27 × 10⁻¹⁰ m (about the size of an atom)'}],
 traps:['Using grams instead of kilograms.','Reading the HUP as a limit of our instruments. It\'s a property of nature.']});

X('chem_qn',{
 why:'The four quantum numbers label every electron. They underpin configurations and the periodic table.',
 idea:['n (principal) sets the size and energy level: 1, 2, 3, …. ℓ (angular momentum) sets the shape: 0 to n − 1, labelled s, p, d, f. m_ℓ (magnetic) sets the orientation: −ℓ to +ℓ. m_s (spin) is +½ or −½.','The Pauli exclusion principle says no two electrons share all four numbers, so each orbital holds at most 2 electrons, with opposite spins.'],
 keys:[['n','1, 2, 3, …'],['ℓ','0 … n − 1 (s, p, d, f = 0, 1, 2, 3)'],['m_ℓ','−ℓ … +ℓ (2ℓ + 1 orbitals)'],['m_s','±½'],['Orbitals in shell n','n²'],['Electrons in shell n','2n²']],
 ex:[{q:'Is (n, ℓ, m_ℓ, m_s) = (3, 2, −3, +½) allowed?',s:['ℓ = 2 is allowed for n = 3 (ℓ ≤ 2).','m_ℓ must be between −2 and +2.'],a:'No: m_ℓ = −3 is impossible.'},
  {q:'How many orbitals are in the 4f subshell?',s:['f means ℓ = 3.','2ℓ + 1 = 7.'],a:'7 orbitals (14 electrons)'}],
 traps:['Allowing ℓ = n.','Mixing up the labels: ℓ = 2 is d, not p.']});

X('chem_nodes',{
 why:'Nodes describe the shapes of orbitals and are a common test question.',
 idea:['A node is a place where the probability of finding the electron is zero. Radial nodes are spherical shells. Angular nodes are planes or cones through the nucleus.','Count them: angular nodes = ℓ, radial nodes = n − ℓ − 1, total nodes = n − 1.'],
 keys:[['Angular','ℓ'],['Radial','n − ℓ − 1'],['Total','n − 1'],['s orbitals','no angular nodes, spherical'],['p orbitals','one nodal plane']],
 ex:[{q:'How many radial and angular nodes does a 3p orbital have?',s:['n = 3 and ℓ = 1.','Angular = ℓ = 1.','Radial = 3 − 1 − 1 = 1.'],a:'1 radial, 1 angular (2 total)'}],
 traps:['Using n − ℓ for radial nodes. It\'s n − ℓ − 1.']});

// ---------- Module 3 ----------
X('chem_config',{
 why:'Electron configurations explain chemical behaviour and the layout of the periodic table.',
 idea:['Fill orbitals in order of increasing energy (Aufbau): 1s 2s 2p 3s 3p 4s 3d 4p 5s 4d …. Each orbital holds 2 electrons with opposite spins (Pauli). Within a subshell, spread electrons out with parallel spins before pairing (Hund\'s rule).','Know the two exceptions: Cr is [Ar]4s¹3d⁵ and Cu is [Ar]4s¹3d¹⁰, because half-filled and filled d subshells are extra stable.','For transition metal cations, remove the 4s electrons before the 3d electrons.'],
 keys:[['Aufbau order','1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p'],['Pauli','max 2 electrons per orbital, opposite spins'],['Hund','singly occupy, parallel spins, before pairing'],['Exceptions','Cr: 4s¹3d⁵; Cu: 4s¹3d¹⁰'],['Cations','remove ns before (n − 1)d'],['Paramagnetic','has unpaired electrons']],
 ex:[{q:'Write configurations for Fe and Fe³⁺.',s:['Fe (Z = 26): [Ar]4s²3d⁶.','Remove 3 electrons: 4s first (2), then one 3d.'],a:'Fe³⁺: [Ar]3d⁵ (5 unpaired, paramagnetic)'}],
 traps:['Removing 3d before 4s for cations.','Forgetting the Cr and Cu exceptions.']});

X('chem_trend',{
 why:'Periodic trends let you predict properties from position alone.',
 idea:['The key idea is effective nuclear charge, Z_eff: the pull a valence electron actually feels after shielding by inner electrons. Across a period, Z_eff increases, so atoms get smaller and hold their electrons more tightly. Down a group, the valence electrons are in larger shells farther from the nucleus.','Results: atomic radius decreases across and increases down. Ionization energy and electronegativity increase across and decrease down. Cations are smaller than their atoms and anions are larger. In an isoelectronic series, more protons means a smaller ion.'],
 keys:[['Z_eff','increases across a period'],['Radius','smaller to the right, larger down'],['IE₁','larger to the right, smaller down'],['Electronegativity','larger to the right, smaller down; F is highest'],['Ions','cation &lt; atom &lt; anion'],['IE exceptions','Be &gt; B and N &gt; O']],
 ex:[{q:'Order by radius: Na⁺, F⁻, Ne, Mg²⁺, O²⁻.',s:['All have 10 electrons (isoelectronic).','More protons pull harder: O (8) &lt; F (9) &lt; Ne (10) &lt; Na (11) &lt; Mg (12).'],a:'O²⁻ &gt; F⁻ &gt; Ne &gt; Na⁺ &gt; Mg²⁺'}],
 traps:['Thinking more electrons always means larger. Across a period, the radius shrinks.','Forgetting the N &gt; O ionization-energy exception (a paired-electron repulsion in O).']});

// ---------- Module 4 ----------
X('chem_vsepr',{
 why:'VSEPR predicts 3-D shapes, and shape decides polarity and properties.',
 idea:['Electron groups around the central atom (bonds and lone pairs) repel and spread out. A double or triple bond counts as one group. The number of groups sets the electron-group geometry. The molecular shape describes only where the atoms are.','Lone pairs take up more room and squeeze bond angles. A molecule is polar if its bond dipoles don\'t cancel. Symmetric shapes with identical surrounding atoms are nonpolar.'],
 keys:[['2 groups','linear, 180°'],['3','trigonal planar, 120° (1 lone pair: bent)'],['4','tetrahedral, 109.5° (1 LP: trigonal pyramidal; 2 LP: bent)'],['5','trigonal bipyramidal (1 LP: seesaw; 2: T-shaped; 3: linear)'],['6','octahedral (1 LP: square pyramidal; 2: square planar)'],['Polar','bond dipoles don\'t cancel']],
 ex:[{q:'Predict the shape and polarity of SF₄.',s:['S has 6 valence electrons: 4 bonds to F plus 1 lone pair, so 5 groups.','5 groups with 1 lone pair: seesaw.','The asymmetric shape means the dipoles don\'t cancel.'],a:'Seesaw, polar'},
  {q:'Is CO₂ polar?',s:['2 groups on C: linear.','The two equal C=O dipoles point in opposite directions.'],a:'Nonpolar (it has polar bonds)'}],
 traps:['Naming the shape from electron groups instead of atoms (NH₃ is pyramidal, not tetrahedral).','Polar bonds don\'t always make a polar molecule.']});

X('chem_formal',{
 why:'Formal charge picks the best Lewis structure, and resonance describes bonds Lewis structures can\'t.',
 idea:['Formal charge = valence electrons − non-bonding electrons − ½(bonding electrons). The best structure keeps formal charges near zero and puts any negative formal charge on the more electronegative atom.','When more than one valid structure differs only in where the electrons are, the real molecule is a resonance hybrid, an average. Its bonds are intermediate in length and strength.','Ionic bond strength is measured by lattice energy, which grows with ion charge and shrinks with ion size (Coulomb\'s law).'],
 keys:[['FC','V − N − B/2'],['Best structure','FCs near 0; negative FC on the more electronegative atom'],['Resonance','same atoms, different electron placement; the real molecule is the average'],['Bond order (resonance)','total bonds/number of positions'],['Expanded octet','only row 3 and below'],['Lattice energy','∝ |q₁q₂|/(r₁ + r₂)']],
 ex:[{q:'Find the C–O bond order in CO₃²⁻.',s:['Three resonance structures, each with one C=O and two C–O.','Total bonds: 4 spread across 3 positions.'],a:'Bond order 4/3 (all three bonds equal)'},
  {q:'Which has the larger lattice energy, NaCl or MgO?',s:['MgO: charges +2 and −2, so |q₁q₂| = 4. NaCl: 1.','The ions are similar in size.'],a:'MgO, by a lot'}],
 traps:['Counting both electrons of a bond toward FC. Only half counts.','Thinking the molecule flips between resonance structures.']});

// ---------- Module 5 ----------
X('chem_hybrid',{
 why:'Hybridization explains bond angles and counts σ and π bonds in valence bond theory.',
 idea:['In VB theory, atomic orbitals mix (hybridize) to point along the bond directions. The number of electron groups on an atom sets the hybridization: 2 is sp, 3 is sp², 4 is sp³, 5 is sp³d, 6 is sp³d².','Every single bond is one σ bond. A double bond is σ + π, and a triple bond is σ + 2π. π bonds come from unhybridized p orbitals overlapping side by side.'],
 keys:[['2 groups','sp (linear)'],['3','sp² (trigonal planar)'],['4','sp³ (tetrahedral)'],['5','sp³d'],['6','sp³d²'],['Single','1σ'],['Double','1σ + 1π'],['Triple','1σ + 2π']],
 ex:[{q:'Count the σ and π bonds in C₂H₄, and give each carbon\'s hybridization.',s:['Each C has 3 groups (2 H plus C), so sp².','Bonds: 4 C–H (σ) and 1 C=C (σ + π).'],a:'5σ, 1π; each C is sp²'},
  {q:'HCN?',s:['C has 2 groups (H and N), so sp.','H–C σ; C≡N σ + 2π.'],a:'2σ, 2π; C is sp'}],
 traps:['Counting a double bond as two σ bonds.','Forgetting to count lone pairs as groups.']});

X('chem_mo',{
 why:'MO diagrams predict bond order and magnetism, which Lewis structures can\'t.',
 idea:['In MO theory, atomic orbitals combine into molecular orbitals spread over the whole molecule. Bonding orbitals are lower in energy; antibonding orbitals (*) are higher. Fill them like atomic orbitals: lowest first, Pauli, Hund.','The order of the 2p-derived orbitals depends on the molecule. For B₂, C₂ and N₂, π2p lies below σ2p (because of s–p mixing). For O₂, F₂ and Ne₂, σ2p lies below π2p. Unpaired electrons make a molecule paramagnetic.'],
 keys:[['Bond order','(bonding e⁻ − antibonding e⁻)/2'],['BO = 0','molecule not stable'],['B₂, C₂, N₂','σ2s σ*2s π2p σ2p π*2p σ*2p'],['O₂, F₂, Ne₂','σ2s σ*2s σ2p π2p π*2p σ*2p'],['Paramagnetic','any unpaired electrons'],['Higher BO','shorter, stronger bond']],
 ex:[{q:'Use MO theory for O₂: bond order and magnetism.',s:['12 valence electrons.','σ2s² σ*2s² σ2p² π2p⁴ π*2p².','The two π* electrons sit in separate orbitals (Hund), so they\'re unpaired.','BO = (8 − 4)/2 = 2.'],a:'BO 2, paramagnetic (VB theory can\'t explain this)'},
  {q:'B₂?',s:['6 valence electrons: σ2s² σ*2s² π2p².','The two π electrons are unpaired.','BO = (4 − 2)/2 = 1.'],a:'BO 1, paramagnetic'}],
 traps:['Using the O₂ ordering for N₂ or B₂.','Pairing up degenerate π* electrons in O₂.']});

X('chem_vbmo',{
 why:'Knowing what each theory does well, and where it fails, is a common concept question.',
 idea:['Valence bond theory describes bonds as overlapping orbitals localized between two atoms. It explains shapes with hybridization and is intuitive for organic molecules.','MO theory delocalizes electrons over the whole molecule. It predicts bond order, magnetism and excited states, and it handles resonance naturally. The classic case where VB fails: O₂ is paramagnetic. A Lewis or VB picture pairs every electron, but MO correctly puts 2 unpaired electrons in π*.'],
 keys:[['VB','localized bonds, hybrid orbitals, shapes'],['MO','delocalized orbitals, bond order, magnetism'],['O₂','MO predicts paramagnetism; VB doesn\'t'],['Antibonding','raises energy; only MO includes it']],
 ex:[{q:'Why does MO explain O₂ better than a Lewis structure?',s:['The Lewis structure O=O has all electrons paired, which predicts diamagnetic.','Experiment: O₂ is attracted to a magnet.','MO: 2 unpaired electrons in π*2p.'],a:'MO correctly predicts paramagnetism.'}],
 traps:['Thinking one theory is "right" and the other "wrong". They are models with different strengths.']});

// ---------- Module 6 ----------
X('chem_gas',{
 why:'The ideal gas law connects pressure, volume, temperature and amount in one equation.',
 idea:['PV = nRT. Temperature must be in kelvin. Match R to your units. With P in kPa and V in L, R = 8.3145 L·kPa/(K·mol).','For a fixed amount of gas changing conditions, P₁V₁/T₁ = P₂V₂/T₂. For molar mass, combine with n = m/M. Real gases deviate most at high pressure and low temperature.'],
 keys:[['Ideal gas law','PV = nRT'],['R','8.3145 L·kPa/(K·mol) = 0.083145 L·bar/(K·mol)'],['T','K = °C + 273.15'],['Pressure','1 bar = 100 kPa; 1 atm = 101.325 kPa = 760 Torr'],['Fixed n','P₁V₁/T₁ = P₂V₂/T₂'],['Molar mass','M = mRT/(PV)']],
 ex:[{q:'A 0.474 g gas sample occupies 0.250 L at 100 °C and 101 kPa. Find M. (Module 6, Example 6-3)',s:['T = 373.15 K.','n = PV/RT = (101 × 0.250)/(8.3145 × 373.15) = 8.14 × 10⁻³ mol.','M = 0.474/8.14 × 10⁻³.'],a:'M ≈ 58.2 g/mol'}],
 traps:['Using °C in PV = nRT.','Mixing R units (J vs L·kPa).']});

X('chem_kmt',{
 why:'Kinetic molecular theory explains why gases behave as they do, and when they stop behaving ideally.',
 idea:['KMT assumptions: molecules are tiny and far apart, in constant random motion, and they collide elastically. They don\'t attract or repel except when colliding. Average kinetic energy is proportional to kelvin temperature: KE_avg = (3/2)RT per mole.','So at the same temperature, all gases have the same average KE, and lighter molecules move faster: u_rms = √(3RT/M). By Graham\'s law, lighter gases effuse faster: rate₁/rate₂ = √(M₂/M₁).','Real gases deviate when molecules are crowded (high P) or slow (low T), because their volume and attractions start to matter. The van der Waals equation corrects for both.'],
 keys:[['KE_avg','(3/2)RT per mole: depends only on T'],['u_rms','√(3RT/M), with M in kg/mol and R = 8.3145 J/(K·mol)'],['Graham','rate₁/rate₂ = √(M₂/M₁)'],['van der Waals','(P + an²/V²)(V − nb) = nRT'],['a','attractions (lower the pressure)'],['b','molecular volume (less free space)'],['Z','PV/(nRT); 1 for an ideal gas']],
 ex:[{q:'Find u_rms for N₂ at 300 K.',s:['M = 0.02802 kg/mol.','u = √(3 × 8.3145 × 300/0.02802).'],a:'≈ 517 m/s'},
  {q:'How much faster does He effuse than CH₄?',s:['√(M(CH₄)/M(He)) = √(16.04/4.003) = √4.01.'],a:'About 2.00 times faster'}],
 traps:['Using g/mol instead of kg/mol in u_rms.','Thinking heavier gases have more average KE at the same T. They have the same KE.']});

X('chem_imf',{
 why:'Intermolecular forces explain boiling points, vapour pressure, viscosity and surface tension.',
 idea:['London dispersion forces act between all molecules and grow with size (more polarizable electron clouds). Dipole–dipole forces add to them for polar molecules. Hydrogen bonds are especially strong dipole interactions: an H bonded to N, O or F attracted to a lone pair on another N, O or F.','Stronger IMFs mean a higher boiling point, higher viscosity, higher surface tension and lower vapour pressure. Compare similar-sized molecules by polarity and H-bonding; compare different sizes by dispersion.'],
 keys:[['Dispersion','all molecules; increase with size and surface area'],['Dipole–dipole','polar molecules'],['H-bond','H–N, H–O or H–F ··· N, O or F'],['Stronger IMF','↑ b.p., ↑ viscosity, ↑ surface tension, ↓ vapour pressure'],['Same size','polar &gt; nonpolar (ICl &gt; Br₂)']],
 ex:[{q:'Rank by boiling point: CH₄, CH₃OH, CH₃Cl.',s:['CH₄: dispersion only, and small.','CH₃Cl: polar, so dipole–dipole plus dispersion.','CH₃OH: has O–H, so hydrogen bonding.'],a:'CH₄ &lt; CH₃Cl &lt; CH₃OH'},
  {q:'Why is the boiling point of CCl₄ much higher than CH₄?',s:['Both are nonpolar, so dispersion only.','CCl₄ is much larger with more electrons, so it is more polarizable.'],a:'Much stronger dispersion forces in CCl₄.'}],
 traps:['Calling any molecule with H an H-bonder. The H must be on N, O or F.','Thinking IMFs break covalent bonds when boiling.']});

X('chem_bond',{
 why:'Bond strengths explain reactivity and let you estimate reaction enthalpies from a table.',
 idea:['Bond energy (bond dissociation energy) is the energy needed to break a particular covalent bond, typically a few hundred kJ/mol. The same amount is released when the bond forms.','Three trends from Module 4: smaller atoms form shorter, stronger bonds (compare H₂ with Cl₂); higher bond order gives a shorter, stronger bond, though a double bond is not twice a single; and polarity matters too.','To estimate ΔH for a gas-phase reaction, add the energies of every bond broken and subtract the energies of every bond formed.'],
 keys:[['ΔH (estimate)','Σ(bonds broken) − Σ(bonds formed)'],['Breaking','costs energy (+)'],['Forming','releases energy (−)'],['Bond order ↑','shorter, stronger: C−C 347, C=C 611, C≡C 837 kJ/mol'],['Atom size ↑','longer, weaker: H−F 565, H−Cl 431, H−Br 364, H−I 297'],['Exception','F−F (159) is weaker than Cl−Cl (243): lone pairs on small F atoms repel']],
 ex:[{q:'Estimate ΔH for H₂ + Cl₂ → 2 HCl.',s:['Broken: H−H (436) + Cl−Cl (243) = 679 kJ.','Formed: 2 × H−Cl (431) = 862 kJ.','ΔH ≈ 679 − 862.'],a:'ΔH ≈ −183 kJ (exothermic)'},
  {q:'Estimate ΔH for N₂ + 3 H₂ → 2 NH₃.',s:['Broken: N≡N (946) + 3 × H−H (436) = 2254 kJ.','Formed: 6 × N−H (389) = 2334 kJ.'],a:'ΔH ≈ −80 kJ'}],
 traps:['Subtracting the wrong way round: it is broken minus formed.','Forgetting coefficients and how many bonds each molecule has (NH₃ has 3 N−H bonds).','Thinking a double bond is exactly twice as strong as a single bond.'],
 tip:'Draw every molecule\'s Lewis structure before counting bonds.'});
