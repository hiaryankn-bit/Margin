// ================= PHYS 121 =================
const G=9.81,D2R=Math.PI/180;const gN='(g = 9.81 m/s²)';
const s3=x=>sig(x,3);
// ---- Vectors & units ----
function pVec(){const v=R(0,3);
  if(v===0){const A=R(5,60),th=pick([20,30,37,45,53,60,70,110,135,150,210,240,300,330]);const ax=A*Math.cos(th*D2R),ay=A*Math.sin(th*D2R);const which=pick(['x','y']);const val=which==='x'?ax:ay;
    return nq(`A vector has magnitude ${A} m at ${th}° counter-clockwise from +x. Find its <b>${which}</b>-component.`,val,{s:3,unit:'m',wrong:[which==='x'?ay:ax,-val,A*Math.cos(th),A],steps:[`A<sub>x</sub> = A cos θ = ${A} cos ${th}° = ${s3(ax)} m.`,`A<sub>y</sub> = A sin θ = ${A} sin ${th}° = ${s3(ay)} m.`],hint:'Measured from +x: x uses cos, y uses sin. Signs come out automatically.'});}
  if(v===1){const ax=R(-12,12)||5,ay=R(-12,12)||-7;const m=Math.hypot(ax,ay);let ang=Math.atan2(ay,ax)/D2R;if(ang<0)ang+=360;const ask=Math.random()<.5;
    if(ask)return nq(`Find the magnitude of A = (${ax}, ${ay}) m.`,m,{s:3,unit:'m',wrong:[Math.abs(ax)+Math.abs(ay),m*m,Math.abs(ax-ay)],steps:[`|A| = √(${ax}² + ${ay}²) = ${s3(m)} m.`]});
    return nq(`Direction of A = (${ax}, ${ay}) m, measured counter-clockwise from +x (0° to 360°)?`,ang,{s:3,unit:'°',abs:1,wrong:[Math.atan(ay/ax)/D2R,mod(ang+180,360),mod(90-ang,360)],steps:[`tan⁻¹(${ay}/${ax}) = ${s3(Math.atan(ay/ax)/D2R)}° (calculator).`,`The vector is in quadrant ${Math.floor(ang/90)+1}, so θ = ${s3(ang)}°.`],hint:'Calculator tan⁻¹ only gives −90° to 90°: check the quadrant!'});}
  if(v===2){const A=R(2,9),B=R(2,9),phi=pick([30,45,60,90,120,135,150]);const val=A*B*Math.cos(phi*D2R);
    return nq(`|A| = ${A}, |B| = ${B}, angle between them ${phi}°. Find A · B.`,val,{s:3,abs:.01,wrong:[A*B*Math.sin(phi*D2R),A*B,-val||1],steps:[`A · B = AB cos φ = ${A}·${B}·cos ${phi}° = ${s3(val)}.`,phi===90?'Perpendicular vectors have zero dot product.':''],hint:'Dot product uses cos; cross product magnitude uses sin.'});}
  const a1=R(-5,5),a2=R(-5,5),b1=R(-5,5),b2=R(-5,5);const dot=a1*b1+a2*b2,ma=Math.hypot(a1,a2)||1,mb=Math.hypot(b1,b2)||1;const ang=Math.acos(Math.max(-1,Math.min(1,dot/(ma*mb))))/D2R;
  return nq(`A = (${a1}, ${a2}), B = (${b1}, ${b2}). Angle between A and B (degrees)?`,ang,{s:3,unit:'°',abs:.5,wrong:[180-ang,90-ang,dot],nonneg:true,steps:[`A · B = ${dot}. |A| = ${s3(ma)}, |B| = ${s3(mb)}.`,`cos φ = ${dot}/(${s3(ma)}·${s3(mb)}) ⇒ φ = ${s3(ang)}°.`]});}
const pUnits=bank([
 {q:'72 km/h in m/s?',a:'20 m/s',w:['72 m/s','259 m/s','7.2 m/s'],e:'÷ 3.6: 72/3.6 = 20.'},
 {q:'How many significant figures in 0.004050?',a:'4',w:['3','6','7'],e:'Leading zeros don\'t count; trailing zeros after the decimal do: 4, 0, 5, 0.'},
 {q:'12.3 × 4.567 should be reported as…',a:'56.2',w:['56.17','56.1741','56'],e:'Multiply/divide: keep the fewest sig figs (3).'},
 {q:'12.3 + 4.567 should be reported as…',a:'16.9',w:['16.867','16.87','17'],e:'Add/subtract: keep the fewest decimal places (1).'},
 {q:'If x = ½at², the units of a are…',a:'m/s²',w:['m/s','m·s²','s²/m'],e:'Dimensional analysis: [a] = [x]/[t]² = m/s².'},
 {q:'1 m² = ? cm²',a:'10⁴ cm²',w:['100 cm²','10⁶ cm²','10³ cm²'],e:'(100 cm)² = 10 000 cm².'},
 {q:'A vector\'s components are (−3, 4). It points into quadrant…',a:'II',w:['I','III','IV'],e:'x &lt; 0, y &gt; 0.'},
]);
// ---- 1D kinematics ----
function pKin(){const v=R(0,4);
  if(v===0){const v0=R(0,25),a=R(1,8)*pick([1,1,-1]),t=R(2,9);const x=v0*t+.5*a*t*t;return nq(`A car starts at ${v0} m/s with constant acceleration ${a} m/s². Displacement after ${t} s?`,x,{s:3,unit:'m',wrong:[v0*t+a*t*t,v0*t,.5*a*t*t],steps:['Δx = v₀t + ½at².',`= ${v0}·${t} + ½·${par(a)}·${t}² = ${s3(x)} m.`],hint:'Δx = v₀t + ½at².'});}
  if(v===1){const v0=R(10,35),a=R(3,9);const d=v0*v0/(2*a);return nq(`A car moving at ${v0} m/s brakes at ${a} m/s². Stopping distance?`,d,{s:3,unit:'m',wrong:[v0*v0/a,v0/a,v0*v0/(2*a*G)],steps:['v² = v₀² + 2aΔx with v = 0 and a = −'+a+'.',`Δx = v₀²/(2·${a}) = ${s3(d)} m.`],hint:'No time given ⇒ use v² = v₀² + 2aΔx.'});}
  if(v===2){const v0=R(5,30);const ask=R(0,2);const H=v0*v0/(2*G),T=2*v0/G;
    if(ask===0)return nq(`A ball is thrown straight up at ${v0} m/s. Max height above the launch point? ${gN}`,H,{s:3,unit:'m',wrong:[v0*v0/G,v0/G,H*2],steps:['At the top v = 0: 0 = v₀² − 2gH.',`H = v₀²/(2g) = ${s3(H)} m.`]});
    if(ask===1)return nq(`A ball is thrown straight up at ${v0} m/s. How long until it returns to the launch height? ${gN}`,T,{s:3,unit:'s',wrong:[v0/G,T*2,Math.sqrt(2*v0/G)],steps:['Symmetric flight: up time v₀/g, same down.',`T = 2v₀/g = ${s3(T)} s.`]});
    const h=R(5,80);return nq(`A stone is dropped from rest from ${h} m. Speed just before it hits the ground? ${gN}`,Math.sqrt(2*G*h),{s:3,unit:'m/s',wrong:[G*h,Math.sqrt(G*h),2*G*h],steps:['v² = 0 + 2gh.',`v = √(2·9.81·${h}) = ${s3(Math.sqrt(2*G*h))} m/s.`]});}
  if(v===3){const vc=R(15,40),a=R(2,6);const t=2*vc/a,d=vc*t;return nq(`A speeder at a constant ${vc} m/s passes a police car at rest. The police car immediately accelerates at ${a} m/s². How long until it catches up?`,t,{s:3,unit:'s',wrong:[vc/a,Math.sqrt(2*vc/a),3*vc/a],steps:[`Speeder: x = ${vc}t. Police: x = ½·${a}t².`,`Set equal: ${vc}t = ${a/2}t² ⇒ t = 2·${vc}/${a} = ${s3(t)} s (distance ${s3(d)} m).`],hint:'Write x(t) for both and set them equal.'});}
  const h=R(10,60),v0=R(5,20);const t=(v0+Math.sqrt(v0*v0+2*G*h))/G;return nq(`A ball is thrown UP at ${v0} m/s from the edge of a ${h} m cliff. When does it hit the ground below? ${gN}`,t,{s:3,unit:'s',wrong:[(-v0+Math.sqrt(v0*v0+2*G*h))/G,Math.sqrt(2*h/G),2*v0/G],steps:[`Take up positive, origin at launch: −${h} = ${v0}t − 4.905t².`,`Quadratic: t = (${v0} + √(${v0}² + 2·9.81·${h}))/9.81 = ${s3(t)} s (positive root).`],hint:'Up is positive; the ground is at y = −h.'});}
const pGraph=bank([
 {q:'The slope of a position–time graph is…',a:'velocity',w:['acceleration','displacement','speed squared'],e:'v = dx/dt.'},
 {q:'The area under a velocity–time graph is…',a:'displacement',w:['acceleration','distance always','velocity'],e:'Δx = ∫v dt (signed area).'},
 {q:'At the top of a vertical throw, the ball\'s acceleration is…',a:'9.81 m/s² downward',w:['zero','9.81 m/s² upward','changing sign'],e:'Gravity never switches off; only the velocity is momentarily zero.'},
 {q:'A car has negative velocity and positive acceleration. It is…',a:'slowing down',w:['speeding up','at rest','moving backwards faster'],e:'Speeding up ⇔ v and a have the same sign.'},
 {q:'Two balls are released from the same height; one is dropped, one is thrown horizontally. Which lands first?',a:'Same time',w:['The dropped ball','The thrown ball','Depends on mass'],e:'Vertical motion is independent of horizontal motion.'},
 {q:'Average velocity over a round trip that returns to the start is…',a:'zero',w:['the average speed','half the max speed','undefined'],e:'Displacement is zero.'},
]);
// ---- 2D motion ----
function pProj(){const v=R(0,3);
  if(v<2){const v0=R(10,40),th=pick([15,20,30,37,40,45,53,60,70]);const R_=v0*v0*Math.sin(2*th*D2R)/G,H=(v0*Math.sin(th*D2R))**2/(2*G),T=2*v0*Math.sin(th*D2R)/G;const ask=pick(['range','height','time']);
    const val={range:R_,height:H,time:T}[ask];const unit=ask==='time'?'s':'m';
    return nq(`A projectile is launched at ${v0} m/s, ${th}° above horizontal, over level ground. Find the ${ask==='range'?'horizontal range':ask==='height'?'maximum height':'time of flight'}. ${gN}`,val,{s:3,unit,wrong:ask==='range'?[v0*v0*Math.sin(th*D2R)/G,R_/2,v0*v0/G]:ask==='height'?[(v0*Math.cos(th*D2R))**2/(2*G),v0*v0/(2*G),H*2]:[v0*Math.sin(th*D2R)/G,2*v0*Math.cos(th*D2R)/G,2*v0/G],
      steps:[`v₀ₓ = ${v0} cos ${th}° = ${s3(v0*Math.cos(th*D2R))} m/s, v₀ᵧ = ${v0} sin ${th}° = ${s3(v0*Math.sin(th*D2R))} m/s.`,ask==='range'?`R = v₀² sin 2θ/g = ${s3(R_)} m.`:ask==='height'?`H = v₀ᵧ²/(2g) = ${s3(H)} m.`:`T = 2v₀ᵧ/g = ${s3(T)} s.`],hint:'Split into components: x has no acceleration, y has −g.'});}
  if(v===2){const h=R(5,50),vx=R(3,25);const t=Math.sqrt(2*h/G),d=vx*t,vi=Math.hypot(vx,G*t);const ask=pick(['d','v']);
    if(ask==='d')return nq(`A ball rolls off a ${h} m high table at ${vx} m/s horizontally. How far from the table does it land? ${gN}`,d,{s:3,unit:'m',wrong:[vx*2*h/G,vx*Math.sqrt(h/G),vx*h/G],steps:[`Fall time: t = √(2h/g) = ${s3(t)} s.`,`d = vₓt = ${s3(d)} m.`]});
    return nq(`A ball rolls off a ${h} m high table at ${vx} m/s horizontally. Its speed just before landing? ${gN}`,vi,{s:3,unit:'m/s',wrong:[vx+G*t,G*t,vx],steps:[`vᵧ = gt = ${s3(G*t)} m/s, vₓ = ${vx} m/s.`,`speed = √(vₓ² + vᵧ²) = ${s3(vi)} m/s.`]});}
  const v0=R(15,40),th=pick([30,40,45,53,60]);const best=45;return mc(`Ignoring air resistance, which launch angle gives the same range as ${th}° (same speed, level ground)?`,`${90-th}°`,[`${th/2}°`,`${180-th}°`,`45°`].filter(a=>a!==`${90-th}°`),[`R ∝ sin 2θ, and sin 2θ = sin(180° − 2θ) = sin 2(90° − θ).`,`So ${th}° and ${90-th}° give equal ranges${th===45?' (45° is its own partner and gives the max range)':''}.`]);}
function pRel(){const v=R(0,2);
  if(v===0){const vb=R(2,6),vr=R(1,vb-1),w=R(40,200);const t=w/vb,dr=vr*t;const ask=Math.random()<.5;
    if(ask)return nq(`A boat moves at ${vb} m/s relative to the water and points straight across a ${w} m wide river flowing at ${vr} m/s. How far downstream does it land?`,dr,{s:3,unit:'m',wrong:[w*vb/vr,w*vr/Math.hypot(vb,vr),w],steps:[`Crossing time uses only the across component: t = ${w}/${vb} = ${s3(t)} s.`,`Drift = v<sub>river</sub>·t = ${vr}·${s3(t)} = ${s3(dr)} m.`]});
    const ang=Math.asin(vr/vb)/D2R;return nq(`Same boat (${vb} m/s rel. water, river ${vr} m/s). At what angle upstream from "straight across" must it head to land directly opposite?`,ang,{s:3,unit:'°',wrong:[Math.atan(vr/vb)/D2R,Math.acos(vr/vb)/D2R,90-ang],steps:[`Need the upstream component of the boat\'s velocity to cancel the current: ${vb} sin θ = ${vr}.`,`θ = sin⁻¹(${vr}/${vb}) = ${s3(ang)}°.`]});}
  if(v===1){const vp=R(150,300),vw=R(20,80);const g=Math.hypot(vp,vw);return nq(`A plane flies due north at ${vp} km/h relative to the air. The wind blows due east at ${vw} km/h. Ground speed?`,g,{s:3,unit:'km/h',wrong:[vp+vw,vp-vw,Math.sqrt(vp*vp-vw*vw)],steps:['v<sub>P/G</sub> = v<sub>P/A</sub> + v<sub>A/G</sub> (vector sum, perpendicular).',`|v| = √(${vp}² + ${vw}²) = ${s3(g)} km/h.`]});}
  const vA=R(15,35),vB=R(10,30);return mc(`Car A moves east at ${vA} m/s, car B moves west at ${vB} m/s. Velocity of A relative to B?`,`${vA+vB} m/s east`,[`${Math.abs(vA-vB)} m/s east`,`${vA+vB} m/s west`,`${Math.abs(vA-vB)} m/s west`],[`v<sub>A/B</sub> = v<sub>A</sub> − v<sub>B</sub> = ${vA} − (−${vB}) = ${vA+vB} m/s (east positive).`]);}
function pCirc(){const v=R(0,1);
  if(v===0){const s=R(5,40),r=R(10,200);const a=s*s/r;return nq(`A car takes a curve of radius ${r} m at ${s} m/s. Its centripetal acceleration?`,a,{s:3,unit:'m/s²',wrong:[s/r,s*s*r,s*r],steps:[`a<sub>c</sub> = v²/r = ${s}²/${r} = ${s3(a)} m/s², toward the center.`]});}
  const r=round(R(5,30)/10,1),T=round(R(5,40)/10,1);const vv=2*Math.PI*r/T,a=vv*vv/r;return nq(`An object moves in a circle of radius ${r} m with period ${T} s. Centripetal acceleration?`,a,{s:3,unit:'m/s²',wrong:[vv,4*Math.PI*r/T,2*Math.PI*r/(T*T)],steps:[`v = 2πr/T = ${s3(vv)} m/s.`,`a = v²/r = 4π²r/T² = ${s3(a)} m/s².`]});}
// ---- Newton's laws ----
function pIncline(){const th=pick([15,20,25,30,35,40]),mu=round(R(5,Math.max(6,Math.floor(Math.tan(th*D2R)*100)-5))/100,2),m=R(2,20);const v=R(0,2);
  if(v===0){const a=G*(Math.sin(th*D2R)-mu*Math.cos(th*D2R));return nq(`A ${m} kg block slides DOWN a ${th}° incline with μₖ = ${mu}. Its acceleration? ${gN}`,a,{s:3,unit:'m/s²',pos:true,wrong:[G*Math.sin(th*D2R),G*(Math.sin(th*D2R)+mu*Math.cos(th*D2R)),G*(Math.cos(th*D2R)-mu*Math.sin(th*D2R))],steps:['Along the incline: mg sin θ − μₖN = ma, with N = mg cos θ.',`a = g(sin θ − μₖ cos θ) = 9.81(${s3(Math.sin(th*D2R))} − ${mu}·${s3(Math.cos(th*D2R))}) = ${s3(a)} m/s².`,'(Mass cancels!)'],hint:'Tilt your axes along the incline. N = mg cos θ.'});}
  if(v===1){const a=G*(Math.sin(th*D2R)+mu*Math.cos(th*D2R));return nq(`A block is shoved UP a ${th}° incline (μₖ = ${mu}). While it slides up, the magnitude of its acceleration? ${gN}`,a,{s:3,unit:'m/s²',wrong:[G*(Math.sin(th*D2R)-mu*Math.cos(th*D2R)),G*Math.sin(th*D2R),G],steps:['Going UP: gravity\'s component AND friction both point down the slope.',`a = g(sin θ + μₖ cos θ) = ${s3(a)} m/s².`]});}
  return nq(`What is the minimum μₛ for a block to stay at rest on a ${th}° incline?`,Math.tan(th*D2R),{s:3,wrong:[Math.sin(th*D2R),Math.cos(th*D2R),1/Math.tan(th*D2R)],steps:['On the verge of slipping: mg sin θ = μₛ mg cos θ.',`μₛ = tan ${th}° = ${s3(Math.tan(th*D2R))}.`]});}
function pAtwood(){const v=R(0,2);
  if(v===0){let m1=R(2,12),m2=R(1,11);if(m1===m2)m1++;const big=Math.max(m1,m2),sm=Math.min(m1,m2);const a=(big-sm)*G/(m1+m2),T=2*m1*m2*G/(m1+m2);const ask=Math.random()<.5;
    return nq(`Atwood machine: ${m1} kg and ${m2} kg masses hang over a massless, frictionless pulley. Find the ${ask?'acceleration':'rope tension'}. ${gN}`,ask?a:T,{s:3,unit:ask?'m/s²':'N',wrong:ask?[(big-sm)*G/big,G,(big+sm)*G/(big-sm)]:[big*G,sm*G,(m1+m2)*G/2],steps:['Heavier side: m₁g − T = m₁a. Lighter side: T − m₂g = m₂a.',`Add: a = (m₁ − m₂)g/(m₁ + m₂) = ${s3(a)} m/s².`,`T = 2m₁m₂g/(m₁ + m₂) = ${s3(T)} N.`],hint:'Write F = ma for each mass separately, then add the equations.'});}
  if(v===1){const m1=R(2,15),m2=R(1,10);const a=m2*G/(m1+m2),T=m1*a;const ask=Math.random()<.5;
    return nq(`A ${m1} kg block on a frictionless table is tied over a pulley to a hanging ${m2} kg block. Find the ${ask?'acceleration':'tension'}. ${gN}`,ask?a:T,{s:3,unit:ask?'m/s²':'N',wrong:ask?[G,m2*G/m1,m1*G/(m1+m2)]:[m2*G,m1*G,m1*m2*G/(m1-m2||1)],steps:['Table block: T = m₁a. Hanging block: m₂g − T = m₂a.',`a = m₂g/(m₁ + m₂) = ${s3(a)} m/s², T = m₁a = ${s3(T)} N.`]});}
  const m=R(40,100),a=round(R(5,30)/10,1),up=Math.random()<.5;const N=m*(G+(up?a:-a));return nq(`A ${m} kg person stands on a scale in an elevator accelerating ${up?'UPWARD':'DOWNWARD'} at ${a} m/s². Scale reading (N)?`,N,{s:3,unit:'N',wrong:[m*G,m*(G+(up?-a:a)),m*a],steps:['N − mg = ma (up positive).',`N = m(g ${up?'+':'−'} ${a}) = ${s3(N)} N.`]});}
const pNewton=bank([
 {q:'A book rests on a table. The reaction to Earth\'s gravitational pull on the book is…',a:'the book\'s gravitational pull on Earth',w:['the normal force from the table','the book\'s weight','friction'],e:'Newton\'s 3rd law pairs act on DIFFERENT objects and are the same type of force.'},
 {q:'An object moves at constant velocity. The net force on it is…',a:'zero',w:['in the direction of motion','opposite the motion','equal to its weight'],e:'Newton\'s 1st law.'},
 {q:'The normal force on a block on an incline equals…',a:'mg cos θ (if nothing else pushes perpendicular)',w:['mg','mg sin θ','mg tan θ'],e:'Perpendicular to the surface: N balances the perpendicular component of gravity.'},
 {q:'Static friction on an object at rest is…',a:'whatever is needed, up to μₛN',w:['always μₛN','always μₖN','zero'],e:'f<sub>s</sub> ≤ μₛN: it only reaches the max at the verge of slipping.'},
 {q:'A rope pulls a box at angle θ above horizontal. Compared to mg, the normal force is…',a:'smaller',w:['larger','equal','zero'],e:'The rope\'s upward component lifts some of the weight: N = mg − T sin θ.'},
 {q:'In free fall (only gravity acts), a person feels weightless because…',a:'the normal force is zero',w:['gravity is zero','mass becomes zero','the net force is zero'],e:'Apparent weight = normal force. Gravity is still mg.'},
]);
// ---- Circular dynamics ----
function pBank(){const v=R(0,3);
  if(v===0){const r=R(50,300),th=pick([8,10,12,15,18,20,25]);const vv=Math.sqrt(r*G*Math.tan(th*D2R));return nq(`A curve of radius ${r} m is banked at ${th}°. At what speed can a car take it with NO friction? ${gN}`,vv,{s:3,unit:'m/s',wrong:[Math.sqrt(r*G*Math.sin(th*D2R)),Math.sqrt(r*G/Math.tan(th*D2R)),r*G*Math.tan(th*D2R)],steps:['N cos θ = mg (vertical), N sin θ = mv²/r (horizontal).','Divide: tan θ = v²/(rg).',`v = √(rg tan θ) = ${s3(vv)} m/s.`],hint:'Don\'t tilt the axes: the acceleration is horizontal, toward the center.'});}
  if(v===1){const r=R(30,200),mu=round(R(30,90)/100,2);const vv=Math.sqrt(mu*G*r);return nq(`Max speed on a FLAT curve of radius ${r} m with μₛ = ${mu}? ${gN}`,vv,{s:3,unit:'m/s',wrong:[mu*G*r,Math.sqrt(G*r),Math.sqrt(mu*r)],steps:['Static friction provides the centripetal force: μₛmg = mv²/r.',`v = √(μₛgr) = ${s3(vv)} m/s.`]});}
  if(v===2){const r=R(50,250),th=pick([10,15,20]),mu=round(R(10,40)/100,2);const s=Math.sin(th*D2R),c=Math.cos(th*D2R);const vv=Math.sqrt(r*G*(s+mu*c)/(c-mu*s));
    return nq(`Curve: radius ${r} m, banked ${th}°, μₛ = ${mu}. Max speed without sliding up? ${gN}`,vv,{s:3,unit:'m/s',wrong:[Math.sqrt(r*G*Math.tan(th*D2R)),Math.sqrt(r*G*(s-mu*c)/(c+mu*s)),Math.sqrt(mu*G*r)],steps:['At max speed friction points DOWN the bank.','Vertical: N cos θ − f sin θ = mg. Horizontal: N sin θ + f cos θ = mv²/r, f = μₛN.',`v = √(rg(sin θ + μ cos θ)/(cos θ − μ sin θ)) = ${s3(vv)} m/s.`]});}
  const r=round(R(5,20)/1,0),m=R(50,500);const vt=Math.sqrt(G*r);const ask=Math.random()<.5;
  if(ask)return nq(`Minimum speed at the TOP of a vertical loop of radius ${r} m to stay on the track? ${gN}`,vt,{s:3,unit:'m/s',wrong:[Math.sqrt(2*G*r),G*r,Math.sqrt(5*G*r)],steps:['At the minimum, N = 0 at the top: mg = mv²/r.',`v = √(gr) = ${s3(vt)} m/s.`]});
  const vb=R(10,25);const N=m*(G+vb*vb/r);return nq(`A ${m} kg cart moves at ${vb} m/s at the BOTTOM of a loop of radius ${r} m. Normal force?`,N,{s:3,unit:'N',wrong:[m*G,m*vb*vb/r,m*(vb*vb/r-G)],steps:['At the bottom, the center is UP: N − mg = mv²/r.',`N = m(g + v²/r) = ${s3(N)} N.`]});}
// ---- Work & energy ----
function pWork(){const v=R(0,3);
  if(v===0){const F=R(10,200),d=R(2,30),th=pick([0,20,30,45,60,90,120,180]);const W=F*d*Math.cos(th*D2R);return nq(`A ${F} N force pulls a crate ${d} m; the force is ${th}° from the direction of motion. Work done by the force?`,W,{s:3,abs:.5,unit:'J',wrong:[F*d,F*d*Math.sin(th*D2R),-W||F],steps:[`W = Fd cos θ = ${F}·${d}·cos ${th}° = ${s3(W)} J.`,th===90?'Perpendicular forces do no work.':th>90?'Negative work: the force opposes the motion.':'']});}
  if(v===1){const m=R(2,20),v0=R(0,10),W=R(50,800);const vf=Math.sqrt(v0*v0+2*W/m);return nq(`A ${m} kg object moving at ${v0} m/s has ${W} J of net work done on it. Final speed?`,vf,{s:3,unit:'m/s',wrong:[v0+W/m,Math.sqrt(2*W/m),Math.sqrt(v0*v0+W/m)],steps:['Work–energy theorem: W<sub>net</sub> = ΔK = ½mv² − ½mv₀².',`v = √(v₀² + 2W/m) = ${s3(vf)} m/s.`]});}
  if(v===2){const k=R(100,2000),x=round(R(5,40)/100,2);const W=.5*k*x*x;return nq(`How much work is needed to stretch a spring (k = ${k} N/m) by ${x} m from equilibrium?`,W,{s:3,unit:'J',wrong:[k*x,k*x*x,.5*k*x],steps:[`W = ½kx² = ½·${k}·${x}² = ${s3(W)} J.`]});}
  const m=R(50,1500),h=R(5,50),t=R(5,60);const P=m*G*h/t;return nq(`A motor lifts ${m} kg up ${h} m at constant speed in ${t} s. Average power output? ${gN}`,P,{s:3,unit:'W',wrong:[m*h/t,m*G*h,m*G*h*t],steps:[`W = mgh = ${s3(m*G*h)} J.`,`P = W/t = ${s3(P)} W.`]});}
function pEnergy(){const v=R(0,3);
  if(v===0){const h=R(2,60),v0=R(0,10);const vf=Math.sqrt(v0*v0+2*G*h);return nq(`A skier starts at ${v0} m/s and descends a frictionless slope, dropping ${h} m. Speed at the bottom? ${gN}`,vf,{s:3,unit:'m/s',wrong:[v0+Math.sqrt(2*G*h),Math.sqrt(2*G*h),Math.sqrt(v0*v0+G*h)],steps:['½mv₀² + mgh = ½mv² (mass cancels, slope shape doesn\'t matter).',`v = √(v₀² + 2gh) = ${s3(vf)} m/s.`]});}
  if(v===1){const k=R(200,3000),x=round(R(5,30)/100,2),m=round(R(5,50)/100,2);const h=.5*k*x*x/(m*G);return nq(`A spring (k = ${k} N/m) compressed ${x} m launches a ${m} kg ball straight up. Max height above the launch point? ${gN}`,h,{s:3,unit:'m',wrong:[k*x/(m*G),.5*k*x/(m*G),k*x*x/(m*G)],steps:['½kx² = mgh (ignoring the small height change during launch).',`h = kx²/(2mg) = ${s3(h)} m.`]});}
  if(v===2){const L_=round(R(5,30)/10,1),th=pick([20,30,40,45,60]);const vv=Math.sqrt(2*G*L_*(1-Math.cos(th*D2R)));return nq(`A pendulum of length ${L_} m is released from rest at ${th}° from vertical. Speed at the bottom? ${gN}`,vv,{s:3,unit:'m/s',wrong:[Math.sqrt(2*G*L_),Math.sqrt(2*G*L_*Math.cos(th*D2R)),Math.sqrt(2*G*L_*Math.sin(th*D2R))],steps:[`Drop height: h = L(1 − cos θ) = ${s3(L_*(1-Math.cos(th*D2R)))} m.`,`v = √(2gh) = ${s3(vv)} m/s.`]});}
  const m=R(2,20),h=R(3,20),d=R(5,30),mu=round(R(5,30)/100,2);const v2=2*G*h-2*mu*G*d;if(v2<=0)return pEnergy();const vv=Math.sqrt(v2);
  return nq(`A ${m} kg block slides from rest down a frictionless ramp of height ${h} m, then across ${d} m of rough floor (μₖ = ${mu}). Speed at the end of the rough patch? ${gN}`,vv,{s:3,unit:'m/s',wrong:[Math.sqrt(2*G*h),Math.sqrt(2*G*h-mu*G*d),Math.sqrt(2*G*(h-mu))],steps:['mgh − μₖmg·d = ½mv².',`v = √(2g(h − μₖd)) = √(2·9.81·(${h} − ${s3(mu*d)})) = ${s3(vv)} m/s.`]});}
// ---- Momentum ----
function pMom(){const v=R(0,4);
  if(v===0){const m=round(R(50,500)/1000,2),vi=R(5,40),vf=R(3,30),t=round(R(2,30)/1000,3);const J=m*(vf+vi),F=J/t;const ask=Math.random()<.5;
    return nq(`A ${m} kg ball hits a wall at ${vi} m/s and bounces straight back at ${vf} m/s. ${ask?'Magnitude of the impulse?':`Contact lasts ${t} s. Average force?`}`,ask?J:F,{s:3,unit:ask?'N·s':'N',wrong:ask?[m*Math.abs(vi-vf),m*vi,m*vf]:[m*Math.abs(vi-vf)/t,m*vi/t,J],steps:['Take the rebound direction as positive: Δp = m(v<sub>f</sub> − v<sub>i</sub>) = m(' +vf+' − (−'+vi+')).',`J = ${s3(J)} N·s.${ask?'':` F = J/Δt = ${s3(F)} N.`}`],hint:'Direction reversal: the velocity change is vᵢ + v_f, not the difference.'});}
  if(v===1){const m1=R(500,2500),m2=R(500,2500),v1=R(5,30),v2=R(-15,15);const vf=(m1*v1+m2*v2)/(m1+m2);
    return nq(`A ${m1} kg car at ${v1} m/s collides and sticks to a ${m2} kg car moving at ${v2} m/s (same line). Velocity just after?`,vf,{s:3,abs:.05,unit:'m/s',wrong:[(m1*v1-m2*v2)/(m1+m2),(v1+v2)/2,m1*v1/(m1+m2)],steps:['Perfectly inelastic: total momentum conserved.',`v = (m₁v₁ + m₂v₂)/(m₁ + m₂) = (${m1*v1} ${pm(m2*v2)})/${m1+m2} = ${s3(vf)} m/s.`]});}
  if(v===2){const m1=R(1,10),m2=R(1,10),v1=R(2,12);const a=(m1-m2)/(m1+m2)*v1,b=2*m1/(m1+m2)*v1;const ask=Math.random()<.5;
    return nq(`Elastic head-on collision: ${m1} kg moving at ${v1} m/s hits a ${m2} kg block at rest. Final velocity of the ${ask?`${m1} kg`:`${m2} kg`} block?`,ask?a:b,{s:3,abs:.05,unit:'m/s',wrong:ask?[b,-a||1,m1*v1/(m1+m2)]:[a,v1,m1*v1/(m1+m2)],steps:['Elastic 1D, target at rest:',`v₁′ = (m₁ − m₂)/(m₁ + m₂)·v₁ = ${s3(a)} m/s.`,`v₂′ = 2m₁/(m₁ + m₂)·v₁ = ${s3(b)} m/s.`]});}
  if(v===3){const m1=R(1000,3000),m2=R(1000,3000),v1=R(5,25);const vf=m1*v1/(m1+m2);const lost=.5*m1*v1*v1-.5*(m1+m2)*vf*vf;
    return nq(`A ${m1} kg car at ${v1} m/s rear-ends and locks onto a stopped ${m2} kg car. How much kinetic energy is lost?`,lost,{s:3,unit:'J',wrong:[.5*m1*v1*v1,.5*(m1+m2)*vf*vf,0.5*m2*vf*vf],pos:true,steps:[`v<sub>f</sub> = ${m1}·${v1}/${m1+m2} = ${s3(vf)} m/s.`,`K<sub>i</sub> = ${s3(.5*m1*v1*v1)} J, K<sub>f</sub> = ${s3(.5*(m1+m2)*vf*vf)} J.`,`Lost: ${s3(lost)} J (momentum is conserved, KE is not).`]});}
  const ms=[R(1,5),R(1,5),R(1,5)],xs=[R(-3,0),R(0,3),R(2,6)];const xc=ms.reduce((s,m,i)=>s+m*xs[i],0)/ms.reduce((a,b)=>a+b,0);
  return nq(`Masses ${ms.join(' kg, ')} kg sit at x = ${xs.join(' m, ')} m. Center of mass x-coordinate?`,xc,{s:3,abs:.01,unit:'m',wrong:[xs.reduce((a,b)=>a+b,0)/3,ms.reduce((s,m,i)=>s+m*xs[i],0),xc+1],steps:[`x<sub>cm</sub> = Σmᵢxᵢ/Σmᵢ = ${ms.reduce((s,m,i)=>s+m*xs[i],0)}/${ms.reduce((a,b)=>a+b,0)} = ${s3(xc)} m.`]});}
// ---- Rotation ----
function pRot(){const v=R(0,4);
  if(v===0){const w0=R(0,20),al=R(1,8),t=R(2,10);const th=w0*t+.5*al*t*t;const ask=Math.random()<.5;
    return nq(`A wheel starts at ${w0} rad/s with angular acceleration ${al} rad/s². ${ask?`Angle turned in ${t} s (rad)?`:`Angular speed after ${t} s?`}`,ask?th:w0+al*t,{s:3,unit:ask?'rad':'rad/s',wrong:ask?[w0*t+al*t*t,w0*t,th/(2*Math.PI)]:[al*t,w0+.5*al*t,(w0+al*t)*2*Math.PI],steps:[ask?`θ = ω₀t + ½αt² = ${s3(th)} rad.`:`ω = ω₀ + αt = ${w0+al*t} rad/s.`,'Same equations as linear kinematics with x → θ, v → ω, a → α.']});}
  if(v===1){const h=round(R(5,50)/10,1);const sh=pick([['solid sphere',2/5],['solid cylinder (disk)',1/2],['hoop (thin ring)',1],['hollow sphere',2/3]]);const vv=Math.sqrt(2*G*h/(1+sh[1]));
    return nq(`A ${sh[0]} rolls without slipping from rest down a ramp of height ${h} m. Speed at the bottom? ${gN}`,vv,{s:3,unit:'m/s',wrong:[Math.sqrt(2*G*h),Math.sqrt(2*G*h/(2+sh[1])),Math.sqrt(G*h)],steps:[`I = c·mR² with c = ${FF(sh[1])}, and rolling means ω = v/R.`,'mgh = ½mv² + ½Iω² = ½mv²(1 + c).',`v = √(2gh/(1 + c)) = ${s3(vv)} m/s.`],hint:'Rolling: KE = ½mv² + ½Iω² with ω = v/R.'});}
  if(v===2){const m1=R(20,60),d1=round(R(5,25)/10,1),m2=R(20,80);const d2=m1*d1/m2;return nq(`On a seesaw, a ${m1} kg child sits ${d1} m from the pivot. Where must a ${m2} kg child sit (other side) to balance?`,d2,{s:3,unit:'m',wrong:[m2*d1/m1,d1,(m1+m2)*d1/m2],steps:['Balance: net torque = 0 ⇒ m₁gd₁ = m₂gd₂.',`d₂ = ${m1}·${d1}/${m2} = ${s3(d2)} m.`]});}
  if(v===3){const I1=round(R(20,60)/10,1),I2=round(R(8,I1*10-5)/10,1),w1=round(R(10,40)/10,1);const w2=I1*w1/I2;return nq(`A skater spins at ${w1} rev/s with I = ${I1} kg·m². She pulls her arms in to I = ${I2} kg·m². New spin rate?`,w2,{s:3,unit:'rev/s',wrong:[w1*I2/I1,w1,w1*Math.sqrt(I1/I2)],steps:['No external torque ⇒ angular momentum conserved: I₁ω₁ = I₂ω₂.',`ω₂ = ${I1}·${w1}/${I2} = ${s3(w2)} rev/s.`,'(Her kinetic energy increases: she does work pulling her arms in.)']});}
  const F=R(10,100),r=round(R(10,80)/100,2),phi=pick([30,45,60,90,120]);const t=r*F*Math.sin(phi*D2R);return nq(`A ${F} N force is applied ${r} m from a pivot at ${phi}° to the lever arm. Torque magnitude?`,t,{s:3,unit:'N·m',wrong:[r*F*Math.cos(phi*D2R),r*F,F/r],steps:[`τ = rF sin φ = ${r}·${F}·sin ${phi}° = ${s3(t)} N·m.`]});}
const pRotB=bank([
 {q:'A solid sphere, a solid cylinder and a hoop race down a ramp (rolling). Who wins?',a:'Solid sphere',w:['Hoop','Solid cylinder','All tie'],e:'Smallest I/(mR²) ⇒ least energy goes into rotation ⇒ fastest. Mass and radius don\'t matter.'},
 {q:'Static equilibrium requires…',a:'net force = 0 AND net torque = 0',w:['net force = 0 only','net torque = 0 only','zero velocity'],e:'Both conditions, about ANY pivot.'},
 {q:'Moment of inertia depends on…',a:'mass AND how it\'s distributed relative to the axis',w:['mass only','angular speed','torque applied'],e:'I = Σmr²: same mass farther out ⇒ bigger I.'},
 {q:'Angular momentum is conserved when…',a:'net external torque is zero',w:['net force is zero','kinetic energy is conserved','the object is rigid'],e:'dL/dt = τ<sub>ext</sub>.'},
 {q:'Rolling without slipping means…',a:'v<sub>cm</sub> = ωR',w:['v<sub>cm</sub> = 0','ω = 0','the contact point moves at 2v'],e:'The contact point is instantaneously at rest.'},
]);
// ---- Lab: uncertainty ----
function pLab(){const v=R(0,2);
  if(v===0){const L_=round(R(40,150)/100,2),dL=pick([.001,.002,.005]),T=2*Math.PI*Math.sqrt(L_/G);const Tm=round(T,3),dT=pick([.005,.01,.02]);const g=4*Math.PI**2*L_/(Tm*Tm);const dg=g*Math.sqrt((dL/L_)**2+(2*dT/Tm)**2);
    return nq(`Pendulum lab: L = ${L_} ± ${dL} m, T = ${Tm} ± ${dT} s. With g = 4π²L/T², what is the uncertainty δg?`,dg,{s:2,tol:.05,unit:'m/s²',wrong:[g*Math.sqrt((dL/L_)**2+(dT/Tm)**2),g*(dL/L_+2*dT/Tm)*2,g*dT/Tm],steps:[`g = 4π²(${L_})/(${Tm})² = ${sig(g,4)} m/s².`,'Products/powers: add RELATIVE uncertainties in quadrature, power 2 doubles T\'s relative uncertainty.',`δg/g = √((${dL}/${L_})² + (2·${dT}/${Tm})²) = ${sig(dg/g,3)}.`,`δg = ${sig(dg,2)} m/s².`],hint:'δg/g = √((δL/L)² + (2δT/T)²).'});}
  if(v===1){let a;do{a=round(9.6+Math.random()*.5,2)}while(Math.abs(a-9.81)<.005);const da=round(R(2,15)/100,2),b=9.81,db=.01;const t=Math.abs(a-b)/Math.sqrt(da*da+db*db);
    return nq(`Your measured g = ${a} ± ${da} m/s². Accepted g = ${b} ± ${db} m/s². Compute t′ = |a − b|/√(δa² + δb²).`,t,{s:2,tol:.05,wrong:[Math.abs(a-b)/(da+db),Math.abs(a-b)/da/10,Math.abs(a-b)],nonneg:true,steps:[`t′ = |${a} − ${b}|/√(${da}² + ${db}²) = ${sig(Math.abs(a-b),2)}/${sig(Math.sqrt(da*da+db*db),2)} = ${sig(t,2)}.`,t<1?'t′ &lt; 1: the values agree within uncertainty.':t>3?'t′ &gt; 3: the values disagree.':'1 ≤ t′ ≤ 3: inconclusive (that\'s the usual guideline, but check your lab manual\'s exact wording).']});}
  const x=R(20,90),dx=R(1,4),y=R(10,60),dy=R(1,3);const q=x*y;const dq=q*Math.sqrt((dx/x)**2+(dy/y)**2);const isProd=Math.random()<.5;
  if(isProd)return nq(`q = xy with x = ${x} ± ${dx} and y = ${y} ± ${dy} (independent). δq?`,dq,{s:2,tol:.05,wrong:[dx+dy,dx*dy,q*(dx/x+dy/y)*1.6],steps:[`q = ${q}.`,`δq/q = √((${dx}/${x})² + (${dy}/${y})²) = ${sig(dq/q,3)}.`,`δq = ${sig(dq,2)}.`]});
  const s=x+y,ds=Math.sqrt(dx*dx+dy*dy);return nq(`s = x + y with x = ${x} ± ${dx} and y = ${y} ± ${dy} (independent). δs?`,ds,{s:2,tol:.05,wrong:[dx+dy,s*(dx/x+dy/y),dx*dy],steps:['Sums/differences: add ABSOLUTE uncertainties in quadrature.',`δs = √(${dx}² + ${dy}²) = ${sig(ds,2)}.`]});}

COURSES.push({id:'phys',name:'PHYS 121',full:'Mechanics',icon:'🚀',color:'#f97316',dark:'#c2410c',worlds:[
 {id:'vec',name:'Ch 1 · Units & Vectors',nodes:[
  {id:'vec',name:'Vector Components',icon:'➡️',gen:pVec,L:L(['Aₓ = A cos θ, Aᵧ = A sin θ (θ from +x).','|A| = √(Aₓ² + Aᵧ²); direction from tan⁻¹ plus a quadrant check.','A · B = AB cos φ = AₓBₓ + AᵧBᵧ.'],null)},
  {id:'units',name:'Units & Sig Figs',icon:'📏',gen:pUnits,L:L(['km/h ÷ 3.6 = m/s.','×÷: fewest sig figs. +−: fewest decimal places.','Check units on both sides (dimensional analysis).'],null)},
 ]},
 {id:'k1',name:'Ch 2 · 1D Kinematics',nodes:[
  {id:'kin',name:'Constant Acceleration',icon:'🏎️',gen:pKin,L:L(['v = v₀ + at, Δx = v₀t + ½at², v² = v₀² + 2aΔx.','Free fall: a = −g (up positive), g = 9.81 m/s².','Pick the equation that skips the unknown you don\'t need.'],'Thrown up at 20 m/s: max height?',['0 = 20² − 2(9.81)H','H = 400/19.62 = 20.4 m.'])},
  {id:'graph',name:'Motion Concepts',icon:'📈',gen:pGraph,L:L(['Slope of x–t = v. Slope of v–t = a.','Area under v–t = displacement.','Speeding up ⇔ v and a have the same sign.'],null)},
 ]},
 {id:'k2',name:'Ch 3 · 2D Motion',nodes:[
  {id:'proj',name:'Projectiles',icon:'🏀',gen:pProj,L:L(['x: constant velocity v₀cos θ. y: acceleration −g.','Level ground: R = v₀² sin 2θ/g, H = (v₀ sin θ)²/(2g), T = 2v₀ sin θ/g.','Horizontal launch from height h: t = √(2h/g).'],null)},
  {id:'rel',name:'Relative Velocity',icon:'🚤',gen:pRel,L:L(['v<sub>A/C</sub> = v<sub>A/B</sub> + v<sub>B/C</sub> (add as vectors).','River crossing: the time depends only on the across component.'],null)},
  {id:'circ',name:'Circular Kinematics',icon:'⭕',gen:pCirc,L:L(['a<sub>c</sub> = v²/r, toward the center.','v = 2πr/T.'],null)},
 ]},
 {id:'nl',name:'Ch 4–5 · Newton\'s Laws',nodes:[
  {id:'incline',name:'Inclines & Friction',icon:'⛷️',gen:pIncline,L:L(['Axes along the incline: mg sin θ down the slope, N = mg cos θ.','Kinetic friction μₖN opposes the sliding.','Static: f ≤ μₛN; it slips when tan θ &gt; μₛ.'],null)},
  {id:'atwood',name:'Pulleys & Elevators',icon:'🛗',gen:pAtwood,L:L(['Free-body diagram for EACH mass, then ΣF = ma for each.','Ideal rope: same tension throughout, same |a| for both masses.','Elevator: N = m(g + a), up positive.'],null)},
  {id:'newton',name:'Newton\'s Laws Concepts',icon:'🍎',gen:pNewton,L:L(['1st: constant velocity ⇔ net force 0.','2nd: ΣF = ma.','3rd: pairs act on different objects.'],null)},
 ]},
 {id:'cd',name:'Ch 5 · Circular Dynamics',nodes:[
  {id:'bank',name:'Banked Curves & Loops',icon:'🛣️',gen:pBank,L:L(['ΣF toward the center = mv²/r. Don\'t tilt axes: the acceleration is horizontal.','Frictionless bank: tan θ = v²/(rg).','Loop top minimum: v = √(gr).'],null)},
 ]},
 {id:'we',name:'Ch 6–7 · Work & Energy',nodes:[
  {id:'work',name:'Work & Power',icon:'💪',gen:pWork,L:L(['W = Fd cos θ. W<sub>net</sub> = ΔK.','Spring: W = ½kx². Power: P = W/t = Fv.'],null)},
  {id:'energy',name:'Energy Conservation',icon:'🔋',gen:pEnergy,L:L(['K₁ + U₁ + W<sub>other</sub> = K₂ + U₂.','U<sub>g</sub> = mgh, U<sub>s</sub> = ½kx².','Friction: W = −μₖNd turns energy into heat.'],null)},
 ]},
 {id:'mom',name:'Ch 8 · Momentum',nodes:[
  {id:'mom',name:'Collisions & Impulse',icon:'💥',gen:pMom,L:L(['J = FΔt = Δp.','Isolated system: total momentum is conserved in EVERY collision.','Elastic: KE conserved too. Perfectly inelastic: they stick.'],null)},
 ]},
 {id:'rot',name:'Ch 9–10 · Rotation',nodes:[
  {id:'rot',name:'Rotational Dynamics',icon:'🎡',gen:pRot,L:L(['ω = ω₀ + αt, θ = ω₀t + ½αt².','τ = rF sin φ, Στ = Iα.','Rolling: KE = ½mv² + ½Iω², v = ωR.','L = Iω is conserved with no external torque.'],null)},
  {id:'rotb',name:'Rotation Concepts',icon:'🧠',gen:pRotB,L:L(['I depends on how mass is distributed.','Equilibrium: ΣF = 0 and Στ = 0.'],null)},
 ]},
 {id:'lab',name:'Lab · Uncertainty',nodes:[
  {id:'lab',name:'Uncertainty & t′',icon:'🔬',gen:pLab,L:L(['Sum/difference: δs = √(δx² + δy²).','Product/quotient: δq/q = √((δx/x)² + (δy/y)²). A power n multiplies the relative uncertainty by n.','t′ = |a − b|/√(δa² + δb²).'],null)},
 ]},
]});
