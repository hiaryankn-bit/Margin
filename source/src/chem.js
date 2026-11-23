// ================= CHEM 120 =================
const AM={H:1.008,He:4.003,Li:6.94,Be:9.012,B:10.81,C:12.01,N:14.01,O:16.00,F:19.00,Ne:20.18,Na:22.99,Mg:24.31,Al:26.98,Si:28.09,P:30.97,S:32.06,Cl:35.45,Ar:39.95,K:39.10,Ca:40.08,Mn:54.94,Fe:55.85,Cu:63.55,Zn:65.38,Br:79.90,Ag:107.87,I:126.90,Ba:137.33,Pb:207.2};
function parseF(f){const st=[{}];let i=0;while(i<f.length){const ch=f[i];if(ch==='('){st.push({});i++}else if(ch===')'){i++;let n='';while(/\d/.test(f[i]||''))n+=f[i++];const t=st.pop(),m=+n||1;for(const k in t)st[st.length-1][k]=(st[st.length-1][k]||0)+t[k]*m}else{let el=ch;i++;while(/[a-z]/.test(f[i]||''))el+=f[i++];let n='';while(/\d/.test(f[i]||''))n+=f[i++];st[st.length-1][el]=(st[st.length-1][el]||0)+(+n||1)}}return st[0]}
const MM=f=>{const c=parseF(f);let m=0;for(const k in c)m+=AM[k]*c[k];return m};
const CF=f=>f.replace(/(\d+)/g,'<sub>$1</sub>');
const NA=6.022e23,hP=6.626e-34,cL=2.998e8,RH=2.179e-18,Rg=8.3145;
const COMP=['H2O','CO2','NaCl','CaCO3','H2SO4','C6H12O6','NH3','Fe2O3','Al2(SO4)3','Ca(OH)2','C2H5OH','Mg(OH)2','AgNO3','BaSO4','CH4','C3H8','KMnO4','Na2CO3','HNO3','C8H18'];

function gMole(){const f=pick(COMP),M=MM(f);const v=R(0,3);
  if(v===0){const g=round(R(5,250)+Math.random(),1),n=g/M;return nq(`How many moles are in ${g} g of ${CF(f)}?`,n,{s:3,unit:'mol',wrong:[g*M,M/g,n*2],steps:[`M(${CF(f)}) = ${sig(M,5)} g/mol.`,`n = m/M = ${g}/${sig(M,5)} = ${sig(n,3)} mol.`],hint:'n = m / M.'})}
  if(v===1){const n=round(R(1,40)/10,2),m=n*M;return nq(`What is the mass of ${n} mol of ${CF(f)}?`,m,{s:3,unit:'g',wrong:[n/M,M,m/2],steps:[`M = ${sig(M,5)} g/mol.`,`m = nM = ${n}·${sig(M,5)} = ${sig(m,3)} g.`]})}
  if(v===2){const g=R(5,100),N=g/M*NA;return nq(`How many molecules (formula units) are in ${g} g of ${CF(f)}?`,N,{s:3,wrong:[g*NA,N*10,g/M],steps:[`n = ${g}/${sig(M,5)} = ${sig(g/M,4)} mol.`,`N = n·N<sub>A</sub> = ${sig(N,3)}.`]})}
  const c=parseF(f),els=Object.keys(c).filter(e=>e!=='H'||Object.keys(c).length<3);const el=pick(Object.keys(c));const pct=AM[el]*c[el]/M*100;
  return nq(`What is the mass percent of ${el} in ${CF(f)}?`,pct,{s:3,unit:'%',wrong:[AM[el]/M*100,c[el]/Object.values(c).reduce((a,b)=>a+b,0)*100,100-pct],pos:true,steps:[`Mass of ${el} per mole: ${c[el]}·${AM[el]} = ${sig(AM[el]*c[el],5)} g.`,`÷ M = ${sig(M,5)} g/mol, ×100 = ${sig(pct,3)}%.`],hint:'(mass of element in 1 mol) / (molar mass) × 100.'});}
function gBalance(){if(Math.random()<.65){const x=R(1,8),y=2*R(1,x+1);let a=1,o2=x+y/4,co2=x,h2o=y/2;let k=1;while(!Number.isInteger(o2*k)||!Number.isInteger(h2o*k))k++;a*=k;o2*=k;co2*=k;h2o*=k;
    const f=`C${x>1?x:''}H${y}`;const ask=pick(['O2','H2O','CO2']);const val={O2:o2,H2O:h2o,CO2:co2}[ask];
    return nq(`Balance with the smallest whole numbers:<div class="sys">__ ${CF(f)} + __ O₂ → __ CO₂ + __ H₂O</div>What is the coefficient of <b>${CF(ask)}</b>?`,val,{int:true,pos:true,wrong:[val+1,val-1,val*2,x+y],steps:[`Balance C: ${x} CO₂ per ${CF(f)}. Balance H: ${y/2} H₂O.`,`O needed: 2·${x} + ${y/2} = ${2*x+y/2} atoms ⇒ ${o2/k} O₂.`,k>1?`Multiply everything by ${k} to clear fractions: ${a} ${CF(f)} + ${o2} O₂ → ${co2} CO₂ + ${h2o} H₂O.`:`${a} ${CF(f)} + ${o2} O₂ → ${co2} CO₂ + ${h2o} H₂O.`],hint:'Balance C, then H, then O last (O₂ can take fractions; clear them at the end).'});}
  return bank([{q:'Balance: __ Al + __ O₂ → __ Al₂O₃. Coefficient of O₂?',a:'3',w:['2','4','6'],e:'4 Al + 3 O₂ → 2 Al₂O₃.'},{q:'Balance: __ Fe₂O₃ + __ CO → __ Fe + __ CO₂. Coefficient of CO?',a:'3',w:['1','2','4'],e:'Fe₂O₃ + 3 CO → 2 Fe + 3 CO₂.'},{q:'Balance: __ NH₃ + __ O₂ → __ NO + __ H₂O. Coefficient of O₂?',a:'5',w:['4','6','3'],e:'4 NH₃ + 5 O₂ → 4 NO + 6 H₂O.'},{q:'Balance: __ C₂H₅OH + __ O₂ → __ CO₂ + __ H₂O. Coefficient of O₂?',a:'3',w:['2','7/2','6'],e:'C₂H₅OH + 3 O₂ → 2 CO₂ + 3 H₂O (remember the O already in ethanol).'},{q:'Balance: __ KClO₃ → __ KCl + __ O₂. Coefficient of O₂?',a:'3',w:['2','1','6'],e:'2 KClO₃ → 2 KCl + 3 O₂.'}])();}
const RXN=[{r:[[2,'H2'],[1,'O2']],p:[2,'H2O'],s:'2 H₂ + O₂ → 2 H₂O'},{r:[[1,'N2'],[3,'H2']],p:[2,'NH3'],s:'N₂ + 3 H₂ → 2 NH₃'},{r:[[1,'CH4'],[2,'O2']],p:[1,'CO2'],s:'CH₄ + 2 O₂ → CO₂ + 2 H₂O'},{r:[[1,'Fe2O3'],[3,'CO']],p:[2,'Fe'],s:'Fe₂O₃ + 3 CO → 2 Fe + 3 CO₂'},{r:[[2,'Al'],[3,'Cl2']],p:[2,'AlCl3'],s:'2 Al + 3 Cl₂ → 2 AlCl₃'},{r:[[1,'C3H8'],[5,'O2']],p:[3,'CO2'],s:'C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O'}];
function gLimiting(){const X=pick(RXN);const[[ca,A],[cb,B]]=X.r;const[cp,Pf]=X.p;const mA=round(R(10,120)+Math.random(),1),mB=round(R(10,120)+Math.random(),1);
  const nA=mA/MM(A),nB=mB/MM(B);const limA=nA/ca<nB/cb;const lim=limA?A:B;const nP=(limA?nA/ca:nB/cb)*cp;const mP=nP*MM(Pf);const act=round(mP*(R(55,95)/100),1);const py=act/mP*100;
  return multi(`${X.s}<br>You react <b>${mA} g ${CF(A)}</b> with <b>${mB} g ${CF(B)}</b>.`,[
   mc('Which reactant is limiting?',CF(lim),[CF(limA?B:A),'Neither (exact ratio)','Whichever has less mass'],[`n(${CF(A)}) = ${sig(nA,3)} mol, n(${CF(B)}) = ${sig(nB,3)} mol.`,`Divide by coefficients: ${sig(nA/ca,3)} vs ${sig(nB/cb,3)}. The smaller one, <b>${CF(lim)}</b>, is limiting.`],'Compare moles ÷ coefficient, not grams.',{keep:true}),
   nq(`Theoretical yield of ${CF(Pf)} (g)?`,mP,{s:3,unit:'g',wrong:[(limA?nB/cb:nA/ca)*cp*MM(Pf),mP*ca,mA+mB],steps:[`n(${CF(Pf)}) = ${sig(limA?nA:nB,3)} mol ${CF(lim)} × ${cp}/${limA?ca:cb} = ${sig(nP,3)} mol.`,`m = ${sig(nP,3)} × ${sig(MM(Pf),5)} = ${sig(mP,3)} g.`]}),
   nq(`If ${act} g of ${CF(Pf)} is actually collected, what is the percent yield?`,py,{s:3,unit:'%',wrong:[mP/act*100,act/(mA+mB)*100,100-py],steps:[`% yield = actual/theoretical × 100 = ${act}/${sig(mP,4)} × 100 = ${sig(py,3)}%.`]})]);}
const gPrecip=bank([
 {q:'AgNO₃(aq) + NaCl(aq): net ionic equation?',a:'Ag⁺(aq) + Cl⁻(aq) → AgCl(s)',w:['Na⁺(aq) + NO₃⁻(aq) → NaNO₃(s)','AgNO₃(aq) + Cl⁻(aq) → AgCl(s) + NO₃⁻(aq)','No reaction'],e:'AgCl is insoluble (Ag⁺ halides). Na⁺ and NO₃⁻ are spectators.'},
 {q:'BaCl₂(aq) + Na₂SO₄(aq): what precipitates?',a:'BaSO₄',w:['NaCl','BaCl₂','Nothing'],e:'Sulfates are soluble except with Ba²⁺, Pb²⁺, Ca²⁺ (slightly), Sr²⁺.'},
 {q:'Pb(NO₃)₂(aq) + 2 KI(aq): what precipitates?',a:'PbI₂',w:['KNO₃','Pb(NO₃)₂','Nothing'],e:'Halides of Pb²⁺, Ag⁺, Hg₂²⁺ are insoluble. Nitrates and K⁺ salts are always soluble.'},
 {q:'KNO₃(aq) + NaCl(aq): what happens?',a:'No reaction (all ions stay dissolved)',w:['KCl precipitates','NaNO₃ precipitates','Cl₂ gas forms'],e:'All alkali metal salts and nitrates are soluble.'},
 {q:'Which compound is INSOLUBLE in water?',a:'CaCO₃',w:['NaNO₃','NH₄Cl','K₂SO₄'],e:'Carbonates are insoluble except with group 1 and NH₄⁺.'},
 {q:'Which compound is SOLUBLE in water?',a:'(NH₄)₂CO₃',w:['AgCl','Mg(OH)₂','BaSO₄'],e:'NH₄⁺ salts are always soluble.'},
 {q:'HCl(aq) + NaOH(aq): net ionic equation?',a:'H⁺(aq) + OH⁻(aq) → H₂O(l)',w:['Na⁺(aq) + Cl⁻(aq) → NaCl(s)','HCl + OH⁻ → Cl⁻ + H₂O','No reaction'],e:'Strong acid + strong base: only H⁺ and OH⁻ react.'},
 {q:'CH₃COOH(aq) + NaOH(aq): net ionic equation?',a:'CH₃COOH(aq) + OH⁻(aq) → CH₃COO⁻(aq) + H₂O(l)',w:['H⁺(aq) + OH⁻(aq) → H₂O(l)','Na⁺ + CH₃COO⁻ → CH₃COONa(s)','No reaction'],e:'Acetic acid is WEAK: keep it molecular in the net ionic equation.'},
 {q:'FeCl₃(aq) + 3 NaOH(aq): what precipitates?',a:'Fe(OH)₃',w:['NaCl','FeCl₃','Nothing'],e:'Hydroxides are insoluble except group 1 (and Ba²⁺, Sr²⁺, Ca²⁺ somewhat).'},
 {q:'Na₂CO₃(aq) + 2 HCl(aq): products?',a:'2 NaCl + H₂O + CO₂(g)',w:['2 NaCl + H₂CO₃(s)','NaCl + NaHCO₃(s)','No reaction'],e:'Carbonate + acid → H₂CO₃ → H₂O + CO₂ (gas evolution).'},
 {q:'Spectator ions in Ba(NO₃)₂(aq) + K₂SO₄(aq)?',a:'K⁺ and NO₃⁻',w:['Ba²⁺ and SO₄²⁻','Ba²⁺ and K⁺','None'],e:'Ba²⁺ + SO₄²⁻ → BaSO₄(s); the rest are spectators.'},
]);
const GREEN=[{r:[[1,'C2H4'],[1,'H2O']],d:[1,'C2H5OH'],s:'C₂H₄ + H₂O → C₂H₅OH'},{r:[[1,'CaCO3']],d:[1,'CaO'],s:'CaCO₃ → CaO + CO₂',dn:'CaO'},{r:[[2,'NaCl'],[1,'H2SO4']],d:[2,'HCl'],s:'2 NaCl + H₂SO₄ → Na₂SO₄ + 2 HCl',dn:'HCl'},{r:[[1,'C6H12O6']],d:[2,'C2H5OH'],s:'C₆H₁₂O₆ → 2 C₂H₅OH + 2 CO₂',dn:'C₂H₅OH'},{r:[[1,'Fe2O3'],[3,'CO']],d:[2,'Fe'],s:'Fe₂O₃ + 3 CO → 2 Fe + 3 CO₂',dn:'Fe'},{r:[[1,'CH4'],[1,'H2O']],d:[3,'H2'],s:'CH₄ + H₂O → CO + 3 H₂',dn:'H₂'},{r:[[1,'N2'],[3,'H2']],d:[2,'NH3'],s:'N₂ + 3 H₂ → 2 NH₃'}];
function gGreen(){const v=Math.random();
  if(v<.5){const X=pick(GREEN);const top=X.d[0]*MM(X.d[1]),bot=X.r.reduce((s,[c,f])=>s+c*MM(f),0);const ae=top/bot*100;
    return nq(`Calculate the % atom economy for making ${X.dn||CF(X.d[1])}:<div class="sys">${X.s}</div>`,ae,{s:3,unit:'%',tol:.01,wrong:[MM(X.d[1])/bot*100,100-ae||50,top/MM(X.r[0][1])*100],steps:[`% AE = (stoichiometric mass of desired product) / (total stoichiometric mass of reactants) × 100.`,`= ${X.d[0]}·${sig(MM(X.d[1]),4)} / ${sig(bot,5)} × 100 = ${sig(ae,3)}%.`,ae>99.9?'Every reactant atom ends up in the product: an addition reaction.':''],hint:'Use coefficients × molar masses.'});}
  if(v<.8){const p=R(10,80),inp=p+R(20,400),w=R(100,900);const E=(inp-p)/p;
    return nq(`A process uses ${inp} kg of reactants, reagents and solvents, plus ${w} kg of water, and makes ${p} kg of product. What is the E-factor? (Course convention: water is not counted as waste.)`,E,{s:3,wrong:[(inp+w-p)/p,inp/p,p/inp],steps:['E-factor = (mass of waste) / (mass of product).',`Waste (excluding water) = ${inp} − ${p} = ${inp-p} kg.`,`E = ${inp-p}/${p} = ${sig(E,3)}.`],hint:'Waste = everything in that isn\'t product. Leave the water out.'});}
  return bank([
   {q:'An addition reaction with 100% yield and no solvent has E-factor…',a:'0',w:['1','100','undefined'],e:'No waste at all ⇒ E = 0, and atom economy is 100%.'},
   {q:'A <b>larger</b> E-factor means…',a:'more waste per kg of product (less green)',w:['greener','higher atom economy','higher yield'],e:'E = waste / product.'},
   {q:'Atom economy can be calculated from…',a:'the balanced equation alone',w:['only measured masses in the lab','the percent yield','the E-factor'],e:'AE is theoretical; E-factor uses real measured masses.'},
   {q:'Two routes make the same drug. Route A: AE 40%. Route B: AE 77%. Which uses atoms more efficiently?',a:'Route B',w:['Route A','Same','Can\'t compare'],e:'Higher % AE: more of the reactant atoms end up in the product.'},
  ])();}

// ---- Module 2: Light & H atom ----
function gLight(){const v=R(0,3);const lam=R(120,900);const lm=lam*1e-9;const nu=cL/lm,E=hP*nu;
  if(v===0)return nq(`What is the frequency of light with λ = ${lam} nm?`,nu,{s:3,unit:'s⁻¹',wrong:[cL/lam,lm/cL,nu*1e-9],steps:['c = λν ⇒ ν = c/λ.',`ν = (2.998×10⁸ m/s)/(${lam}×10⁻⁹ m) = ${sig(nu,3)} s⁻¹.`],hint:'Convert nm to m first.'});
  if(v===1)return nq(`What is the energy of ONE photon with λ = ${lam} nm?`,E,{s:3,unit:'J',wrong:[hP*cL/lam,E*NA,hP/lm],steps:['E = hν = hc/λ.',`E = (6.626×10⁻³⁴)(2.998×10⁸)/(${lam}×10⁻⁹) = ${sig(E,3)} J.`]});
  if(v===2)return nq(`What is the energy of one MOLE of photons with λ = ${lam} nm (in kJ/mol)?`,E*NA/1000,{s:3,unit:'kJ/mol',wrong:[E*NA,E/1000,E*NA/1e6],steps:[`Per photon: ${sig(E,3)} J.`,`× N<sub>A</sub> = ${sig(E*NA,3)} J/mol = ${sig(E*NA/1000,3)} kJ/mol.`]});
  const phi=round(R(30,70)/10,1)*1e-19;const lam2=R(150,Math.floor(hP*cL/phi*1e9)-10);const KE=hP*cL/(lam2*1e-9)-phi;
  return nq(`A metal has work function Φ = ${sig(phi,2)} J. Light of λ = ${lam2} nm hits it. Max kinetic energy of the ejected electrons?`,KE,{s:3,unit:'J',wrong:[hP*cL/(lam2*1e-9),phi,hP*cL/(lam2*1e-9)+phi],pos:true,steps:['Photoelectric effect: E<sub>k</sub> = hν − Φ.',`hν = hc/λ = ${sig(hP*cL/(lam2*1e-9),3)} J.`,`E<sub>k</sub> = ${sig(hP*cL/(lam2*1e-9),3)} − ${sig(phi,2)} = ${sig(KE,3)} J.`]});}
function gBohr(){const nf=R(1,3),ni=nf+R(1,4);const dE=RH*(1/(nf*nf)-1/(ni*ni));const lam=hP*cL/dE*1e9;const v=R(0,3);
  const ser={1:'Lyman (UV)',2:'Balmer (visible)',3:'Paschen (IR)'};
  if(v===0)return nq(`An electron in H drops from n = ${ni} to n = ${nf}. What is the wavelength of the emitted photon (nm)?`,lam,{s:3,unit:'nm',wrong:[hP*cL/(RH*(1/nf-1/ni))*1e9,lam/2,hP*cL/(RH/(ni*ni))*1e9],steps:[`ΔE = R<sub>H</sub>(1/${nf}² − 1/${ni}²) with R<sub>H</sub> = 2.179×10⁻¹⁸ J.`,`= ${sig(dE,4)} J.`,`λ = hc/ΔE = ${sig(lam,3)} nm.`],hint:'Eₙ = −R_H/n². Photon energy = |ΔE|, then λ = hc/E.'});
  if(v===1)return nq(`Energy of the photon emitted when H goes from n = ${ni} to n = ${nf}?`,dE,{s:3,unit:'J',wrong:[RH*(1/nf-1/ni),RH/(ni*ni),RH/(nf*nf)],steps:[`ΔE = 2.179×10⁻¹⁸ (1/${nf*nf} − 1/${ni*ni}) = ${sig(dE,3)} J.`]});
  if(v===2)return mc(`The H-atom transition n = ${ni} → n = ${nf} belongs to which series?`,ser[nf],Object.values(ser).filter(s=>s!==ser[nf]).concat(['Brackett (IR)']),[`Series are named by the LOWER level: n = 1 Lyman, 2 Balmer, 3 Paschen.`]);
  const n=R(1,4);const IE=RH/(n*n);return nq(`How much energy is needed to ionize an H atom from n = ${n}?`,IE,{s:3,unit:'J',wrong:[RH*n*n,RH/n,RH],steps:[`Ionization: n → ∞. ΔE = R<sub>H</sub>/n² = 2.179×10⁻¹⁸/${n*n} = ${sig(IE,3)} J.`]});}
function gDeB(){if(Math.random()<.6){const v=R(1,9)*10**R(5,6);const lam=hP/(9.109e-31*v);return nq(`de Broglie wavelength of an electron (m = 9.109×10⁻³¹ kg) moving at ${sig(v,2)} m/s?`,lam,{s:3,unit:'m',wrong:[hP*9.109e-31*v,hP/v,lam*1e9],steps:['λ = h/(mv).',`= 6.626×10⁻³⁴ / (9.109×10⁻³¹ × ${sig(v,2)}) = ${sig(lam,3)} m.`]});}
  const m=round(R(50,200)/1000,3),v=R(10,45);const lam=hP/(m*v);return nq(`de Broglie wavelength of a ${m*1000} g ball moving at ${v} m/s?`,lam,{s:3,unit:'m',wrong:[hP/(m*1000*v),lam*1e9,hP*m*v],steps:[`m = ${m} kg.`,`λ = h/(mv) = ${sig(lam,3)} m (far too small to notice: why baseballs don't diffract).`]});}
function gQN(){const v=R(0,3);
  if(v===0){const n=R(1,4),l=R(0,4),ml=R(-3,3),ms=pick(['+½','−½','+1','0']);const ok=l<n&&Math.abs(ml)<=l&&(ms==='+½'||ms==='−½');
    const why=l>=n?`ℓ must be 0 … n − 1, but ℓ = ${l} with n = ${n}.`:Math.abs(ml)>l?`mℓ must be −ℓ … ℓ, but mℓ = ${ml} with ℓ = ${l}.`:!(ms==='+½'||ms==='−½')?'mₛ must be +½ or −½.':'All rules satisfied.';
    return tf(`(n, ℓ, mℓ, mₛ) = (${n}, ${l}, ${minus(ml)}, ${ms}) is an allowed set of quantum numbers.`,ok,why,'n ≥ 1; ℓ = 0…n−1; mℓ = −ℓ…ℓ; mₛ = ±½.');}
  if(v===1){const n=R(1,5);return nq(`How many orbitals are in the n = ${n} shell?`,n*n,{int:true,pos:true,wrong:[2*n*n,n,2*n-1],steps:[`Each ℓ = 0…${n-1} gives 2ℓ + 1 orbitals: total n² = ${n*n}.`]});}
  if(v===2){const l=R(0,3);return nq(`How many orbitals are in a subshell with ℓ = ${l} (${'spdf'[l]})?`,2*l+1,{int:true,pos:true,wrong:[2*(2*l+1),l,l+1],steps:[`mℓ runs from −${l} to ${l}: 2ℓ + 1 = ${2*l+1} orbitals.`]});}
  const n=R(2,5);return nq(`Maximum number of electrons with n = ${n}?`,2*n*n,{int:true,pos:true,wrong:[n*n,2*n,8],steps:[`n² orbitals × 2 electrons = ${2*n*n}.`]});}
function gNodes(){const n=R(1,5),l=R(0,Math.min(n-1,3));const o=`${n}${'spdf'[l]}`;const v=R(0,3);
  const rad=n-l-1;
  if(v===0)return nq(`How many <b>radial</b> nodes does a ${o} orbital have?`,rad,{int:true,nonneg:true,wrong:[l,n-1,n-l],steps:[`Radial nodes = n − ℓ − 1 = ${n} − ${l} − 1 = ${rad}.`]});
  if(v===1)return nq(`How many <b>angular</b> nodes (nodal planes/cones) does a ${o} orbital have?`,l,{int:true,nonneg:true,wrong:[rad,n-1,n],steps:[`Angular nodes = ℓ = ${l}.`]});
  if(v===2)return nq(`How many nodes in total does a ${o} orbital have?`,n-1,{int:true,nonneg:true,wrong:[n,rad,l],steps:[`Total = n − 1 = ${n-1} (${rad} radial + ${l} angular).`]});
  return nq(`How many maxima does the radial probability distribution of a ${o} orbital have?`,n-l,{int:true,pos:true,wrong:[rad,n,l+1],steps:[`# maxima = n − ℓ = ${n-l} (one more than the number of radial nodes).`]});}

// ---- Module 3: configurations & trends ----
const ORD=['1s','2s','2p','3s','3p','4s','3d','4p','5s','4d','5p'];const CAP={s:2,p:6,d:10};
const SYM=['','H','He','Li','Be','B','C','N','O','F','Ne','Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca','Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn','Ga','Ge','As','Se','Br','Kr'];
function cfgOf(Z){let left=Z;const occ={};for(const o of ORD){if(!left)break;const c=Math.min(CAP[o[1]],left);occ[o]=c;left-=c}if(Z===24){occ['4s']=1;occ['3d']=5}if(Z===29){occ['4s']=1;occ['3d']=10}return occ}
function cfgStr(occ,Z){const core=Z>18?['[Ar]',18]:Z>10?['[Ne]',10]:Z>2?['[He]',2]:['',0];const sorted=Object.keys(occ).filter(o=>occ[o]>0).sort((a,b)=>a[0]-b[0]||'spdf'.indexOf(a[1])-'spdf'.indexOf(b[1]));
  let cnt=0;const out=[];for(const o of sorted){cnt+=occ[o];if(cnt<=core[1]&&core[1])continue;out.push(`${o}<sup>${occ[o]}</sup>`)}return (core[0]+' '+out.join(' ')).trim()||'(empty)'}
function unpaired(occ){let u=0;for(const o in occ){const k=o[1],n=occ[o],orb=CAP[k]/2;u+=n<=orb?n:2*orb-n}return u}
function ionCfg(Z,q){const occ={...cfgOf(Z)};let rem=q;const order=Object.keys(occ).sort((a,b)=>b[0]-a[0]||'spdf'.indexOf(b[1])-'spdf'.indexOf(a[1]));for(const o of order){while(rem>0&&occ[o]>0){occ[o]--;rem--}}return occ}
function gConfig(){const v=Math.random();
  if(v<.45){const Z=pick([...Array(36).keys()].slice(3).concat([24,29,24,29,26]));const occ=cfgOf(Z);const right=cfgStr(occ,Z);
    const naive={...occ};if(Z===24){naive['4s']=2;naive['3d']=4}if(Z===29){naive['4s']=2;naive['3d']=9}
    const w=[cfgStr(naive,Z),cfgStr(cfgOf(Z+1),Z),cfgStr(cfgOf(Z-1),Z)];
    return mc(`Ground-state electron configuration of <b>${SYM[Z]}</b> (Z = ${Z})?`,right,w,[`Fill 1s 2s 2p 3s 3p 4s 3d 4p… (Aufbau) for ${Z} electrons.`,Z===24||Z===29?`Exception! ${SYM[Z]} takes 4s¹ so the 3d subshell is ${Z===24?'half':'completely'} filled.`:`Result: ${right}.`],'Count electrons and fill in Aufbau order. Watch Cr and Cu.');}
  if(v<.75){const[Z,q]=pick([[26,2],[26,3],[29,1],[29,2],[25,2],[30,2],[24,3],[27,2],[22,2],[28,2],[20,2],[17,-1],[8,-2],[16,-2],[11,1],[12,2]]);
    const occ=q>0?ionCfg(Z,q):cfgOf(Z-q);const right=cfgStr(occ,Z-q);let wrongOcc;if(q>0&&Z>20){wrongOcc={...cfgOf(Z)};let r=q;for(const o of ['3d','4s']){while(r>0&&wrongOcc[o]>0){wrongOcc[o]--;r--}}}
    const w=[wrongOcc?cfgStr(wrongOcc,Z-q):cfgStr(cfgOf(Z),Z),cfgStr(cfgOf(Z-q),Z-q),cfgStr(cfgOf(Z+(q>0?-q-1:q+1)),Z)].filter(x=>x!==right);
    return mc(`Electron configuration of <b>${SYM[Z]}${q>0?`<sup>${q>1?q:''}+</sup>`:`<sup>${-q>1?-q:''}−</sup>`}</b>?`,right,w.concat([cfgStr(cfgOf(Z-q+1),Z-q+1)]),[q>0&&Z>20?'Transition metals lose their 4s electrons FIRST, then 3d.':q>0?'Remove electrons from the highest-n subshell.':'Add electrons following Aufbau.',`Answer: ${right}.`],'Cations of transition metals: 4s empties before 3d.');}
  const Z=pick([5,6,7,8,9,15,16,22,23,24,25,26,27,28,29,30]);const u=unpaired(cfgOf(Z));
  return nq(`How many unpaired electrons does a ground-state <b>${SYM[Z]}</b> atom have?`,u,{int:true,nonneg:true,wrong:[u+1,u-1,u+2,0],steps:[`Configuration: ${cfgStr(cfgOf(Z),Z)}.`,`Hund\'s rule: fill degenerate orbitals singly first ⇒ ${u} unpaired. ${u?'Paramagnetic':'Diamagnetic'}.`]});}
const IE1={Li:520,Be:899,B:801,C:1086,N:1402,O:1314,F:1681,Ne:2081,Na:496,Mg:738,Al:578,Si:786,P:1012,S:1000,Cl:1251,Ar:1521,K:419,Ca:590};
const RAD={Li:152,Be:112,B:85,C:77,N:75,O:73,F:72,Na:186,Mg:160,Al:143,Si:118,P:110,S:103,Cl:99,K:227,Ca:197,Rb:248,Cs:265};
const EN={Li:.98,Be:1.57,B:2.04,C:2.55,N:3.04,O:3.44,F:3.98,Na:.93,Mg:1.31,Al:1.61,Si:1.9,P:2.19,S:2.58,Cl:3.16,K:.82,Br:2.96,I:2.66,Ca:1.0};
function gTrend(){const v=R(0,3);
  if(v===3){const set=pick([['O²⁻','F⁻','Na⁺','Mg²⁺'],['S²⁻','Cl⁻','K⁺','Ca²⁺'],['N³⁻','O²⁻','F⁻','Na⁺']]);return mc(`These ions are isoelectronic. Which is <b>largest</b>?`,set[0],set.slice(1),[`Same number of electrons, but fewer protons pulls them in less: the ion with the lowest Z is largest (${set[0]}).`]);}
  const[tab,name,best]=[[IE1,'highest first ionization energy',Math.max],[RAD,'largest atomic radius',Math.max],[EN,'highest electronegativity',Math.max]][v];
  let els;do{els=shuffle(Object.keys(tab)).slice(0,4)}while(new Set(els.map(e=>tab[e])).size<4);const top=els.reduce((a,b)=>tab[a]>tab[b]?a:b);
  const special=(v===0&&els.includes('N')&&els.includes('O'))?' Note N &gt; O: N\'s half-filled 2p is extra stable, and O has a paired 2p electron.':(v===0&&els.includes('Be')&&els.includes('B'))?' Note Be &gt; B: B\'s 2p electron is higher in energy and shielded by 2s.':'';
  return mc(`Which has the <b>${name}</b>?`,top,els.filter(e=>e!==top),[`Values: ${els.map(e=>`${e} ${tab[e]}`).join(', ')}.`,`${v===1?'Radius grows down a group and shrinks across a period (Z<sub>eff</sub> increases).':'IE and EN grow across a period and shrink down a group.'}${special}`],'Across a period: Z_eff ↑. Down a group: n ↑.');}

// ---- Module 4/5: molecules ----
// [formula, total valence e-, shape, angle, polar, central hybridization, sigma, pi, lone pairs on central]
const MOL=[['CO2',16,'linear','180°',false,'sp',2,2,0],['H2O',8,'bent','≈104.5°',true,'sp³',2,0,2],['NH3',8,'trigonal pyramidal','≈107°',true,'sp³',3,0,1],['CH4',8,'tetrahedral','109.5°',false,'sp³',4,0,0],['BF3',24,'trigonal planar','120°',false,'sp²',3,0,0],['SO2',18,'bent','≈119°',true,'sp²',2,1,1],['SF6',48,'octahedral','90°',false,'sp³d²',6,0,0],['PCl5',40,'trigonal bipyramidal','90° and 120°',false,'sp³d',5,0,0],['SF4',34,'seesaw','&lt;90° and &lt;120°',true,'sp³d',4,0,1],['ClF3',28,'T-shaped','≈90°',true,'sp³d',3,0,2],['XeF2',22,'linear','180°',false,'sp³d',2,0,3],['XeF4',36,'square planar','90°',false,'sp³d²',4,0,2],['BrF5',42,'square pyramidal','≈90°',true,'sp³d²',5,0,1],['CH2O',12,'trigonal planar','≈120°',true,'sp²',3,1,0],['HCN',10,'linear','180°',true,'sp',2,2,0],['CCl4',32,'tetrahedral','109.5°',false,'sp³',4,0,0],['CH2Cl2',20,'tetrahedral','≈109.5°',true,'sp³',4,0,0],['O3',18,'bent','≈117°',true,'sp²',2,1,1],['NH4+',8,'tetrahedral','109.5°',null,'sp³',4,0,0],['NO3-',24,'trigonal planar','120°',null,'sp²',3,1,0],['SO4 2-',32,'tetrahedral','109.5°',null,'sp³',4,0,0],['I3-',22,'linear','180°',null,'sp³d',2,0,3],['PF3',26,'trigonal pyramidal','≈97°',true,'sp³',3,0,1],['H2S',8,'bent','≈92°',true,'sp³',2,0,2]];
const SHAPES=['linear','bent','trigonal planar','trigonal pyramidal','tetrahedral','seesaw','T-shaped','trigonal bipyramidal','square planar','square pyramidal','octahedral'];
const MF=f=>CF(f.replace(' ','')).replace(/(\d?)([+-])$/,(m,d,s)=>`<sup>${d}${s==='-'?'−':'+'}</sup>`).replace(/<sub>(\d)<\/sub><sup>/,(m,d)=>`<sup>${d}`);
function gVSEPR(){const M=pick(MOL);const[f,ve,shape,ang,polar,hyb]=M;const v=R(0,3);
  if(v===0)return nq(`How many valence electrons are in the Lewis structure of <b>${MF(f)}</b>?`,ve,{int:true,pos:true,wrong:[ve+2,ve-2,ve+8,ve-1],steps:[`Add valence electrons of each atom, then add one per negative charge / subtract one per positive charge.`,`Total = ${ve}.`]});
  if(v===1)return mc(`VSEPR molecular shape of <b>${MF(f)}</b>?`,shape,shuffle(SHAPES.filter(s=>s!==shape)),[`${ve} valence electrons. Central atom: ${M[6]} bonded atoms + ${M[8]} lone pair${M[8]===1?'':'s'} = ${M[6]+M[8]} electron domains.`,`Electron geometry → molecular shape: <b>${shape}</b> (lone pairs are invisible in the shape).`],'Count electron domains on the central atom (lone pairs + bonded atoms; a multiple bond counts once).');
  if(v===2||polar===null)return mc(`Approximate bond angle in <b>${MF(f)}</b>?`,ang,['180°','120°','109.5°','90°','≈107°','≈104.5°'].filter(a=>a!==ang),[`Shape: ${shape}.`,M[8]?'Lone pairs squeeze the bond angles below the ideal value.':'No lone pairs on the central atom: ideal angle.'],'Ideal angles: linear 180°, trigonal 120°, tetrahedral 109.5°, octahedral 90°. Lone pairs compress them.');
  return mc(`Is <b>${MF(f)}</b> polar or non-polar?`,polar?'Polar':'Non-polar',[polar?'Non-polar':'Polar','Polar only in water','Depends on temperature'],[`Shape: ${shape}.`,polar?'The bond dipoles do not cancel (asymmetric shape or lone pairs).':'Symmetric shape: the bond dipoles cancel.'],'Polar bonds + asymmetric shape ⇒ polar molecule.',{n:2});}
function gFormal(){const E=pick([['C',4],['N',5],['O',6],['S',6],['Cl',7],['B',3],['P',5]]);const[el,V]=E;let lp,b;do{lp=R(0,3);b=R(1,4)}while(2*lp+2*b!==8||(el==='B'&&2*lp+2*b>8));
  if(el==='B'){lp=0;b=pick([3,4])}const fc=V-2*lp-b;
  if(Math.random()<.35)return bank([{q:'In CO (:C≡O:), the formal charge on C is…',a:'−1',w:['0','+1','−2'],e:'C: 4 − 2 − 3 = −1. O: 6 − 2 − 3 = +1.'},{q:'In NO₃⁻ (one N=O, two N−O), formal charge on N?',a:'+1',w:['0','−1','+2'],e:'N: 5 − 0 − 4 = +1. Each single-bonded O is −1; total = +1 − 2 = −1 ✓.'},{q:'Best Lewis structure for OCN⁻ puts the −1 formal charge on…',a:'O',w:['C','N','spread equally'],e:'Place negative formal charge on the most electronegative atom.'},{q:'Number of resonance structures for NO₃⁻?',a:'3',w:['1','2','4'],e:'The double bond can sit on any of the three O atoms. Average N–O bond order = 4/3.'},{q:'Average C–O bond order in CO₃²⁻?',a:'4/3',w:['1','1.5','2'],e:'3 resonance structures: one double + two single bonds spread over 3 bonds.'},{q:'Average O–O bond order in O₃?',a:'1.5',w:['1','2','4/3'],e:'2 resonance structures: (1 + 2)/2.'}])();
  return nq(`An <b>${el}</b> atom in a Lewis structure has ${lp} lone pair${lp===1?'':'s'} and ${b} bond${b===1?'':'s'} (each bond = 1 shared pair). What is its formal charge?`,fc,{int:true,wrong:[fc+1,fc-1,V-lp-b,V-2*lp-2*b],steps:['FC = (valence e⁻) − (lone-pair e⁻) − ½(bonding e⁻).',`= ${V} − ${2*lp} − ${b} = ${fc}.`]});}
function gHybrid(){const M=pick(MOL.filter(m=>m[0]!=='SO4 2-'));const[f,,shape,,,hyb,s,p]=M;
  if(Math.random()<.5)return mc(`Hybridization of the central atom in <b>${MF(f)}</b>?`,hyb,['sp','sp²','sp³','sp³d','sp³d²'].filter(h=>h!==hyb),[`Electron domains on the central atom: ${M[6]+M[8]} ⇒ ${hyb}. (2: sp, 3: sp², 4: sp³, 5: sp³d, 6: sp³d²)`],'Hybridization matches the number of electron domains.');
  const org=pick([['C2H4',5,1],['C2H2',3,2],['HCN',2,2],['CH2O',3,1],['CO2',2,2],['C2H6',7,0],['CH3COOH',7,1],['C6H6 (benzene)',12,3],['N2',1,2],['HCOOH',4,1]]);
  return mc(`How many σ and π bonds are in <b>${CF(org[0])}</b>?`,`${org[1]} σ, ${org[2]} π`,[`${org[1]+org[2]} σ, 0 π`,`${org[1]} σ, ${org[2]+1} π`,`${org[1]-1} σ, ${org[2]} π`,`${org[2]} σ, ${org[1]} π`],['Every single bond is 1 σ. A double bond = 1 σ + 1 π. A triple = 1 σ + 2 π.',`Total: ${org[1]} σ and ${org[2]} π.`]);}
function gMO(){const base=pick(['H2','He2','Li2','Be2','B2','C2','N2','O2','F2','Ne2']);const q=pick([0,0,1,-1]);const Zv={H2:1,He2:2,Li2:1,Be2:2,B2:3,C2:4,N2:5,O2:6,F2:7,Ne2:8}[base];let e=2*Zv-q;
  if((base==='H2'||base==='He2')&&(e<1||e>4))return gMO();
  const small=['H2','He2'].includes(base);const lowPi=['Li2','Be2','B2','C2','N2'].includes(base);
  const ord=small?[['σ1s',2,1],['σ*1s',2,-1]]:lowPi?[['σ2s',2,1],['σ*2s',2,-1],['π2p',4,1],['σ2p',2,1],['π*2p',4,-1],['σ*2p',2,-1]]:[['σ2s',2,1],['σ*2s',2,-1],['σ2p',2,1],['π2p',4,1],['π*2p',4,-1],['σ*2p',2,-1]];
  let left=e,nb=0,na=0,unp=0;const cfg=[];for(const[name,cap,s]of ord){if(!left)break;const k=Math.min(cap,left);left-=k;if(s>0)nb+=k;else na+=k;const orbs=cap/2;unp+=k<=orbs?k:cap-k;cfg.push(`(${name})<sup>${k}</sup>`)}
  const bo=(nb-na)/2;const sp=CF(base)+(q?`<sup>${q>0?'+':'−'}</sup>`:'');const v=R(0,2);
  const st=[`${small?'':'Valence '}electrons: ${e}. ${small?'':lowPi?'For B₂, C₂, N₂ (and Li₂, Be₂): π2p is BELOW σ2p.':'For O₂, F₂, Ne₂: σ2p is below π2p.'}`,`Configuration: ${cfg.join(' ')}.`,`Bond order = ½(${nb} − ${na}) = ${FF(bo)}. Unpaired electrons: ${unp} ⇒ ${unp?'paramagnetic':'diamagnetic'}.`];
  if(v===0)return nq(`MO theory: bond order of <b>${sp}</b>?`,bo,{fmt:FF,tol:0,wrong:[bo+.5,bo-.5,bo+1,Math.max(0,bo-1)],nonneg:true,steps:st,hint:'Bond order = ½(bonding e⁻ − antibonding e⁻).'});
  if(v===1)return mc(`Is <b>${sp}</b> paramagnetic or diamagnetic?`,unp?'Paramagnetic':'Diamagnetic',[unp?'Diamagnetic':'Paramagnetic','Neither','Both'],st,'Unpaired electrons ⇒ paramagnetic.',{n:2});
  return nq(`MO theory: how many unpaired electrons in <b>${sp}</b>?`,unp,{int:true,nonneg:true,wrong:[unp+1,unp+2,Math.max(0,unp-1),0],steps:st});}
const gVBMO=bank([
 {q:'A π bond is formed by…',a:'side-by-side overlap of p orbitals',w:['end-to-end overlap of s orbitals','overlap of two hybrid orbitals','lone pairs on adjacent atoms'],e:'σ: overlap along the internuclear axis. π: sideways overlap above and below it.'},
 {q:'Why is O₂ paramagnetic?',a:'It has two unpaired electrons in π*2p orbitals',w:['It has a double bond','Its Lewis structure has unpaired electrons','It has a bond order of 2'],e:'The Lewis structure misses this; MO theory predicts it.'},
 {q:'If the bond order is 0, the molecule…',a:'is not expected to exist (e.g. He₂, Ne₂)',w:['has a single bond','is paramagnetic','is very reactive but stable'],e:'Bonding and antibonding electrons cancel.'},
 {q:'Higher bond order generally means…',a:'shorter and stronger bond',w:['longer and weaker bond','more polar bond','no change'],e:'N₂ (BO 3) has a very short, very strong bond.'},
 {q:'Rotation around a C=C double bond is restricted because…',a:'twisting would break the π overlap',w:['the σ bond is too strong','the carbons are sp³','of lone pair repulsion'],e:'This is why cis/trans isomers exist.'},
 {q:'Removing an electron from N₂ to make N₂⁺ changes the bond order…',a:'from 3 to 2.5',w:['from 3 to 3.5','from 2 to 1.5','not at all'],e:'The electron comes out of a bonding orbital (σ2p).'},
 {q:'Removing an electron from O₂ to make O₂⁺ changes the bond order…',a:'from 2 to 2.5',w:['from 2 to 1.5','from 3 to 2.5','not at all'],e:'The electron leaves an ANTIbonding π* orbital, so bonding gets stronger.'},
]);

// ---- Module 6: gases & IMF ----
function gGas(){const v=R(0,4);
  if(v===0){const n=round(R(5,50)/10,2),t=R(-20,150),P=R(80,300),T=t+273.15;const V=n*Rg*T/P;
    return nq(`Volume of ${n} mol of an ideal gas at ${t} °C and ${P} kPa?`,V,{s:3,unit:'L',wrong:[n*Rg*t/P,n*0.083145*T/P,V*101.325/100],steps:['PV = nRT with R = 8.3145 L·kPa·K⁻¹·mol⁻¹.',`T = ${t} + 273.15 = ${T} K.`,`V = nRT/P = ${n}·8.3145·${T}/${P} = ${sig(V,3)} L.`],hint:'Kelvin! And use R = 8.3145 L kPa/(K mol) with kPa.'});}
  if(v===1){const V1=round(R(10,80)/10,1),P1=R(90,200),t1=R(0,40),P2=R(90,300),t2=R(0,150);const V2=V1*P1*(t2+273.15)/(P2*(t1+273.15));
    return nq(`A gas occupies ${V1} L at ${t1} °C and ${P1} kPa. Volume at ${t2} °C and ${P2} kPa?`,V2,{s:3,unit:'L',wrong:[V1*P1*(t2||1)/(P2*(t1||1)),V1*P2*(t2+273.15)/(P1*(t1+273.15)),V1],steps:['P₁V₁/T₁ = P₂V₂/T₂ (n fixed).',`V₂ = ${V1}·(${P1}/${P2})·(${t2+273.15}/${t1+273.15}) = ${sig(V2,3)} L.`]});}
  if(v===2){const g=pick(['CO2','N2','O2','CH4','Ar','C3H8','SO2']);const M=MM(g);const P=R(95,105),t=R(20,120),V=round(R(20,90)/100,2);const m=P*V/(Rg*(t+273.15))*M;
    return nq(`A ${sig(m,3)} g gas sample occupies ${V} L at ${t} °C and ${P} kPa. Molar mass?`,M,{s:3,unit:'g/mol',wrong:[m*Rg*t/(P*V),M/2,P*V/(Rg*(t+273.15))],steps:[`n = PV/RT = ${P}·${V}/(8.3145·${t+273.15}) = ${sig(P*V/(Rg*(t+273.15)),3)} mol.`,`M = m/n = ${sig(M,3)} g/mol (≈ ${CF(g)}).`]});}
  if(v===3){const X=pick([['2 NaN₃ → 2 Na + 3 N₂','NaN3',2,3],['2 KClO₃ → 2 KCl + 3 O₂','KClO3',2,3],['CaCO₃ → CaO + CO₂','CaCO3',1,1]]);const g=R(10,80),t=R(0,40),P=R(95,110);const n=g/MM(X[1])*X[3]/X[2];const V=n*Rg*(t+273.15)/P;
    return nq(`${X[0]}. What volume of gas forms from ${g} g of ${CF(X[1])} at ${t} °C and ${P} kPa?`,V,{s:3,unit:'L',wrong:[g/MM(X[1])*Rg*(t+273.15)/P,V*X[2]/X[3]*X[2]/X[3],n*22.4],steps:[`n(${CF(X[1])}) = ${g}/${sig(MM(X[1]),4)} = ${sig(g/MM(X[1]),3)} mol.`,`× ${X[3]}/${X[2]} ⇒ n(gas) = ${sig(n,3)} mol.`,`V = nRT/P = ${sig(V,3)} L.`]});}
  const nA=round(R(5,30)/10,1),nB=round(R(5,30)/10,1),Pt=R(100,400);const PA=nA/(nA+nB)*Pt;
  return nq(`A mixture has ${nA} mol N₂ and ${nB} mol O₂ at a total pressure of ${Pt} kPa. Partial pressure of N₂?`,PA,{s:3,unit:'kPa',wrong:[nB/(nA+nB)*Pt,Pt/2,nA*Pt],steps:[`x(N₂) = ${nA}/(${nA} + ${nB}) = ${sig(nA/(nA+nB),3)}.`,`P(N₂) = x·P<sub>tot</sub> = ${sig(PA,3)} kPa (Dalton\'s law).`]});}
function gKMT(){const g=pick(['H2','He','N2','O2','CO2','Ar','CH4']);const M=MM(g)/1000,T=R(250,600);const u=Math.sqrt(3*Rg*T/M);
  if(Math.random()<.6)return nq(`Root-mean-square speed of ${CF(g)} at ${T} K?`,u,{s:3,unit:'m/s',wrong:[Math.sqrt(3*Rg*T/(M*1000)),Math.sqrt(Rg*T/M),u*Math.sqrt(2)],steps:['u<sub>rms</sub> = √(3RT/M), with R = 8.3145 J/(K·mol) and M in <b>kg/mol</b>.',`M = ${sig(M,4)} kg/mol.`,`u = √(3·8.3145·${T}/${sig(M,4)}) = ${sig(u,3)} m/s.`],hint:'M must be in kg/mol!'});
  const g2=pick(['H2','He','N2','O2','CO2','Ar','CH4'].filter(x=>x!==g));const r=Math.sqrt(MM(g2)/MM(g));return nq(`Graham's law: rate of effusion of ${CF(g)} relative to ${CF(g2)} (rate₁/rate₂)?`,r,{s:3,wrong:[1/r,MM(g2)/MM(g),r*r],steps:['rate ∝ 1/√M.',`rate(${CF(g)})/rate(${CF(g2)}) = √(${sig(MM(g2),4)}/${sig(MM(g),4)}) = ${sig(r,3)}.`]});}
const gIMF=bank([
 {q:'Highest boiling point?',a:'H₂O',w:['H₂S','H₂Se','CH₄'],e:'H₂O hydrogen-bonds (H on O). Without H-bonding, H₂O would boil far lower than H₂S.'},
 {q:'Highest boiling point?',a:'I₂',w:['Br₂','Cl₂','F₂'],e:'All non-polar: dispersion forces grow with the number of electrons (polarizability).'},
 {q:'Higher boiling point: n-pentane or neopentane (same formula C₅H₁₂)?',a:'n-pentane',w:['neopentane','same','can\'t tell'],e:'Long chains have more surface contact, so stronger dispersion forces.'},
 {q:'Which molecule can hydrogen-bond with itself?',a:'CH₃OH',w:['CH₃OCH₃','CH₃F','H₂S'],e:'Needs an H bonded directly to N, O or F. In CH₃F and CH₃OCH₃ the H is on C.'},
 {q:'Strongest intermolecular force in liquid HCl?',a:'dipole–dipole',w:['hydrogen bonding','London dispersion only','ionic'],e:'HCl is polar, but Cl isn\'t N, O or F, so no H-bond.'},
 {q:'Real gases deviate most from ideal behaviour at…',a:'high pressure and low temperature',w:['low pressure and high temperature','STP always','high temperature and low pressure'],e:'Molecules are close together (volume matters) and slow (attractions matter).'},
 {q:'In the van der Waals equation, the "a" term corrects for…',a:'intermolecular attractions',w:['molecular volume','temperature','molar mass'],e:'"b" corrects for the volume of the molecules.'},
 {q:'Highest boiling point?',a:'HF',w:['HCl','HBr','F₂'],e:'HF hydrogen-bonds. Among the others, dispersion increases HCl → HBr.'},
 {q:'Average kinetic energy of gas molecules depends only on…',a:'temperature',w:['molar mass','pressure','volume'],e:'KMT: E<sub>k</sub> = (3/2)RT per mole.'},
 {q:'STP in this course means…',a:'0 °C and 1 bar (100 kPa)',w:['25 °C and 1 atm','0 °C and 1 atm only','25 °C and 1 bar'],e:'SATP is 25 °C and 1 bar.'},
]);

COURSES.push({id:'chem',name:'CHEM 120',full:'Physical & Chemical Properties of Matter',icon:'⚗️',color:'#10b981',dark:'#047857',worlds:[
 {id:'m1',name:'Module 1 · Stoichiometry & Green Chem',nodes:[
  {id:'mole',name:'Moles & Mass',icon:'⚖️',gen:gMole,L:L(['n = m/M. N = n·N<sub>A</sub> (6.022×10²³).','Mass % = (mass of element in 1 mol)/(molar mass) × 100.'],'Moles in 36.0 g H₂O?',['M = 18.02 g/mol.','n = 36.0/18.02 = 2.00 mol.'])},
  {id:'balance',name:'Balancing',icon:'⚖️',gen:gBalance,L:L(['Balance elements that appear in only one reactant and product first.','Combustion: C → CO₂, H → H₂O, O₂ last. Clear fractions at the end.'],'Balance C₃H₈ + O₂ → CO₂ + H₂O',['3 CO₂, 4 H₂O.','O: 6 + 4 = 10 atoms ⇒ 5 O₂.'])},
  {id:'limiting',name:'Limiting Reagent & Yield',icon:'🧪',gen:gLimiting,L:L(['Convert each reactant to moles; divide by its coefficient. The smallest is limiting.','Theoretical yield comes from the limiting reagent.','% yield = actual/theoretical × 100.'],null)},
  {id:'precip',name:'Precipitation & Net Ionic',icon:'🌧️',gen:gPrecip,L:L(['Always soluble: group 1, NH₄⁺, NO₃⁻ salts.','Usually insoluble: carbonates, hydroxides, phosphates; AgCl, PbI₂, BaSO₄.','Net ionic: drop spectator ions. Weak acids stay molecular.'],null)},
  {id:'green',name:'Atom Economy & E-factor',icon:'🌱',gen:gGreen,L:L(['% AE = (mass of desired product)/(mass of all reactants) × 100, from the balanced equation.','E-factor = mass of waste / mass of product (measured). Course convention: water isn\'t counted.','Greener: high AE, low E.'],null)},
 ]},
 {id:'m2',name:'Module 2 · Quantum Theory & H Atom',nodes:[
  {id:'light',name:'Light & Photons',icon:'💡',gen:gLight,L:L(['c = λν, E = hν = hc/λ.','h = 6.626×10⁻³⁴ J s, c = 2.998×10⁸ m/s.','Photoelectric: E<sub>k</sub> = hν − Φ.'],null)},
  {id:'bohr',name:'H-atom Transitions',icon:'⚛️',gen:gBohr,L:L(['Eₙ = −R<sub>H</sub>/n², R<sub>H</sub> = 2.179×10⁻¹⁸ J.','Photon energy = |ΔE|; λ = hc/|ΔE|.','Series by final level: 1 Lyman (UV), 2 Balmer (visible), 3 Paschen (IR).'],null)},
  {id:'debroglie',name:'de Broglie',icon:'🌊',gen:gDeB,L:L(['λ = h/(mv): matter has wave properties.','Only noticeable for tiny masses (electrons).'],null)},
  {id:'qn',name:'Quantum Numbers',icon:'🔢',gen:gQN,L:L(['n = 1, 2, 3, … ; ℓ = 0 … n − 1 ; mℓ = −ℓ … ℓ ; mₛ = ±½.','n² orbitals per shell, 2ℓ + 1 per subshell.'],null)},
  {id:'nodes',name:'Orbital Nodes',icon:'🎯',gen:gNodes,L:L(['Radial nodes = n − ℓ − 1. Angular nodes = ℓ. Total = n − 1.','Radial distribution has n − ℓ maxima.'],'4d orbital?',['Radial: 4 − 2 − 1 = 1. Angular: 2. Total: 3.'])},
 ]},
 {id:'m3',name:'Module 3 · Multielectron Atoms',nodes:[
  {id:'config',name:'Electron Configurations',icon:'📝',gen:gConfig,L:L(['Aufbau: 1s 2s 2p 3s 3p 4s 3d 4p…','Exceptions: Cr = [Ar] 3d⁵ 4s¹, Cu = [Ar] 3d¹⁰ 4s¹.','Transition-metal cations lose 4s electrons first: Fe²⁺ = [Ar] 3d⁶.','Hund: singly occupy degenerate orbitals first.'],null)},
  {id:'trend',name:'Periodic Trends',icon:'📊',gen:gTrend,L:L(['Across a period: Z<sub>eff</sub> ↑ ⇒ radius ↓, IE ↑, EN ↑.','Down a group: n ↑ ⇒ radius ↑, IE ↓.','IE exceptions: Be &gt; B, N &gt; O.','Isoelectronic ions: more protons ⇒ smaller.'],null)},
 ]},
 {id:'m4',name:'Module 4 · Bonding & Structure',nodes:[
  {id:'vsepr',name:'VSEPR & Polarity',icon:'🧊',gen:gVSEPR,L:L(['Count electron domains on the central atom: bonded atoms + lone pairs (a multiple bond counts once).','2 linear, 3 trigonal planar, 4 tetrahedral, 5 trig. bipyramidal, 6 octahedral.','Lone pairs change the shape name and shrink the angles.','Polar = polar bonds that don\'t cancel.'],null)},
  {id:'formal',name:'Formal Charge & Resonance',icon:'⚡',gen:gFormal,L:L(['FC = V − (lone-pair e⁻) − ½(bonding e⁻).','Best structure: smallest formal charges, negative FC on the most electronegative atom.','Resonance: average bond order = total bonds / number of positions.'],null)},
 ]},
 {id:'m5',name:'Module 5 · VB & MO Theory',nodes:[
  {id:'hybrid',name:'Hybridization & σ/π',icon:'🧬',gen:gHybrid,L:L(['Domains → hybridization: 2 sp, 3 sp², 4 sp³, 5 sp³d, 6 sp³d².','Single = σ. Double = σ + π. Triple = σ + 2π.'],null)},
  {id:'mo',name:'MO Diagrams',icon:'🧲',gen:gMO,L:L(['B₂, C₂, N₂: π2p below σ2p. O₂, F₂: σ2p below π2p.','Bond order = ½(bonding − antibonding).','Unpaired electrons ⇒ paramagnetic (O₂!).'],'O₂ bond order?',['12 valence e⁻: σ2s² σ*2s² σ2p² π2p⁴ π*2p².','BO = ½(8 − 4) = 2, two unpaired e⁻ ⇒ paramagnetic.'])},
  {id:'vbmo',name:'VB vs MO Concepts',icon:'🧠',gen:gVBMO,L:L(['VB: bonds = overlapping orbitals on two atoms.','MO: electrons occupy molecular orbitals spread over the molecule.','Higher BO ⇒ shorter, stronger bond.'],null)},
 ]},
 {id:'m6',name:'Module 6 · Gases & IMFs',nodes:[
  {id:'gas',name:'Ideal Gas Law',icon:'🎈',gen:gGas,L:L(['PV = nRT, R = 8.3145 L·kPa·K⁻¹·mol⁻¹ (= 0.083145 L·bar·K⁻¹·mol⁻¹).','T in KELVIN: T = t + 273.15.','Dalton: P<sub>A</sub> = x<sub>A</sub>P<sub>total</sub>.'],null)},
  {id:'kmt',name:'KMT & Effusion',icon:'💨',gen:gKMT,L:L(['u<sub>rms</sub> = √(3RT/M), M in kg/mol, R = 8.3145 J K⁻¹ mol⁻¹.','Graham: rate₁/rate₂ = √(M₂/M₁).'],null)},
  {id:'imf',name:'Intermolecular Forces',icon:'🧲',gen:gIMF,L:L(['Dispersion (all molecules; grows with size) &lt; dipole–dipole &lt; H-bonding (H on N, O, F).','Stronger IMFs ⇒ higher boiling point.','Real gases deviate at high P, low T.'],null)},
 ]},
]});
