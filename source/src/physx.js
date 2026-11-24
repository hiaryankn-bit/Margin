// ---------- PHYS 121 in exam style ----------
// The midterms are conceptual multiple choice (5 options, "None of the above is correct" as e),
// some "Choose all correct answers", and multi-part problems solved in symbols.
// Numeric plug-in questions are replaced, except vector addition (which appeared as MC) and the lab/units topics.
const PX={};
const pxMC=(it)=>mc(it.q,it.a,shuffle(it.w.slice()).slice(0,3),[it.why],it.hint||'Picture the situation and ask what each force or quantity is actually doing.');
const pxWhich=(bank)=>{const T=shuffle(bank.filter(s=>s[1])),F=shuffle(bank.filter(s=>!s[1]));if(!T.length||F.length<3)return null;const k=T[0],w=F.slice(0,3);
  return mc('Which one of the following statements is correct?',k[0],w.map(s=>s[0]),[`<b>Correct:</b> ${k[0]} ${k[2]}`,...w.map(s=>`<b>Not correct:</b> ${s[0]} ${s[2]}`)],'Test each statement against a definition or a quick example.')};
const pxSel=(bank,stem)=>{const pick5=shuffle(bank.slice()).slice(0,5);return selAll(stem||'Which of the following statements are correct?',pick5.map(s=>({text:s[0],true:s[1],why:s[2]})),'Choose all correct answers.')};
// Symbolic multi-part: parts = [{q,a,w:[...],why}]
const pxSym=(stem,parts)=>multi(stem,parts.map(p=>mc(p.q,p.a,shuffle(p.w.slice()).slice(0,3),[p.why],p.hint||'Write the general relation first, then specialise it to this problem.')));
function pxNode(id,{mcs=[],bank=[],sym=[],num=[]}){PX[id]=()=>{const r=Math.random();
  if(sym.length&&r<.22)return pick(sym)();
  if(num.length&&r<.32)return pick(num)();
  if(bank.length>=5&&r<.5)return Math.random()<.55?pxSel(bank):pxWhich(bank)||pxMC(pick(mcs));
  return mcs.length?pxMC(pick(mcs)):pxSel(bank)}}

// ===== Vectors =====
pxNode('vec',{
 mcs:[
  {q:'Vector A points in the second quadrant. What are the signs of its components?',a:'A<sub>x</sub> &lt; 0, A<sub>y</sub> &gt; 0',w:['A<sub>x</sub> &gt; 0, A<sub>y</sub> &gt; 0','A<sub>x</sub> &lt; 0, A<sub>y</sub> &lt; 0','A<sub>x</sub> &gt; 0, A<sub>y</sub> &lt; 0'],why:'Second quadrant is up and to the left: x negative, y positive.'},
  {q:'Two nonzero vectors A and B have A · B = 0. Which must be true?',a:'A and B are perpendicular.',w:['A and B are parallel.','|A × B| = 0.','A + B = 0.'],why:'A · B = AB cos θ = 0 with A, B ≠ 0 means cos θ = 0, so θ = 90°.'},
  {q:'Two nonzero vectors have |A × B| = 0. Which must be true?',a:'A and B are parallel or antiparallel.',w:['A and B are perpendicular.','A · B = 0.','|A| = |B|.'],why:'|A × B| = AB sin θ = 0 means θ = 0° or 180°.'},
  {q:'Vectors A (magnitude 3) and B (magnitude 5) can be added in any direction. Which magnitude is impossible for A + B?',a:'9',w:['2','5','8'],why:'|A + B| lies between |5 − 3| = 2 and 5 + 3 = 8.'},
  {q:'The direction of A × B is…',a:'perpendicular to both A and B, given by the right-hand rule.',w:['along A.','halfway between A and B.','along B.'],why:'The cross product is perpendicular to the plane of A and B; the right-hand rule picks which way.'}],
 bank:[
  ['A · B is a scalar.',true,'The dot product gives a number.'],
  ['A × B = B × A.',false,'The cross product is anticommutative: A × B = −(B × A).'],
  ['If A · B &lt; 0, the angle between A and B is more than 90°.',true,'cos θ &lt; 0 for 90° &lt; θ ≤ 180°.'],
  ['The magnitude of a vector can be negative.',false,'Magnitudes are lengths, always ≥ 0.'],
  ['A unit vector has magnitude 1.',true,'That is the definition.'],
  ['The components of a vector depend on the choice of axes, but its magnitude doesn\'t.',true,'Rotating the axes changes components but not length.'],
  ['|A + B| is always greater than |A|.',false,'If B points against A, the sum can be shorter.']],
 sym:[()=>{const th=pick(['θ','φ']);return pxSym(`A vector A has magnitude A and makes angle ${th} with the +x axis, measured counterclockwise.`,[
   {q:'What is A<sub>x</sub>?',a:`A cos ${th}`,w:[`A sin ${th}`,`A tan ${th}`,`A/cos ${th}`],why:'Adjacent side to the angle: A cos θ.'},
   {q:'What is A<sub>y</sub>?',a:`A sin ${th}`,w:[`A cos ${th}`,`−A sin ${th}`,`A/sin ${th}`],why:'Opposite side to the angle: A sin θ.'},
   {q:`Express ${th} in terms of the components.`,a:`tan ${th} = A<sub>y</sub>/A<sub>x</sub>`,w:[`tan ${th} = A<sub>x</sub>/A<sub>y</sub>`,`sin ${th} = A<sub>x</sub>/A`,`cos ${th} = A<sub>y</sub>/A`],why:'Divide the two component equations: A_y/A_x = sin θ/cos θ = tan θ. Check the quadrant when taking arctan.'}])}],
 num:[()=>{const v=pick([80,100,120,150]),w=pick([20,30,40]),ang=pick([30,45,60]);const vx=w*Math.cos(ang*D2R),vy=v+w*Math.sin(ang*D2R);const m=Math.hypot(vx,vy),d=Math.atan(vx/vy)/D2R;
   const f=(M,D,dir)=>`${Math.round(M)} m/s at ${Math.round(D)}° ${dir} of north`;
   return mc(`An airplane heads due north with an airspeed of ${v} m/s. A ${w} m/s wind blows toward ${ang}° north of east. What is the plane's velocity relative to the ground?`,f(m,d,'east'),[f(v+w,ang,'east'),f(m,d,'west'),f(Math.hypot(v,w),Math.atan(w/v)/D2R,'east')],[`v<sub>ground</sub> = v<sub>plane, air</sub> + v<sub>air, ground</sub>.`,`East: ${w} cos ${ang}° = ${s3(vx)} m/s. North: ${v} + ${w} sin ${ang}° = ${s3(vy)} m/s.`,`Magnitude √(${s3(vx)}² + ${s3(vy)}²) = ${s3(m)} m/s, at arctan(${s3(vx)}/${s3(vy)}) = ${s3(d)}° east of north.`])}]});

// ===== 1D kinematics =====
const KIN_BANK=[
 ['An object can have zero velocity and nonzero acceleration at the same instant.',true,'A ball at the top of its flight: v = 0, a = −g.'],
 ['If velocity is negative, the object must be slowing down.',false,'Slowing down means v and a have opposite signs; the sign of v alone says nothing.'],
 ['The slope of a position–time graph is the velocity.',true,'v = dx/dt.'],
 ['The area under a velocity–time graph is the displacement.',true,'Δx = ∫ v dt.'],
 ['The slope of a velocity–time graph is the displacement.',false,'The slope is the acceleration, a = dv/dt.'],
 ['For constant acceleration, v<sub>avg</sub> = ½(v<sub>i</sub> + v<sub>f</sub>).',true,'Velocity changes linearly, so the average is the midpoint.'],
 ['An object speeding up in the −x direction has negative acceleration.',true,'Speeding up: a has the same sign as v, which is negative.'],
 ['Distance travelled and displacement are always equal in magnitude.',false,'They differ whenever the object reverses direction.'],
 ['If two objects have the same acceleration, they have the same velocity.',false,'Same acceleration only means their velocities change at the same rate.']];
pxNode('kin',{
 mcs:[
  {q:'A car starts from rest with constant acceleration a. How far has it gone after time t?',a:'½at²',w:['at²','at','2at²'],why:'Δx = v<sub>i</sub>t + ½at² with v<sub>i</sub> = 0.'},
  {q:'A car starts from rest with constant acceleration a. What is its speed after travelling distance d?',a:'√(2ad)',w:['2ad','√(ad)','ad/2'],why:'v<sub>f</sub>² = v<sub>i</sub>² + 2aΔx = 2ad.'},
  {q:'A car moving at speed v brakes with constant deceleration of magnitude a. What is its stopping distance?',a:'v²/(2a)',w:['v²/a','v/(2a)','2v²/a'],why:'0 = v² − 2a·d ⇒ d = v²/(2a).'},
  {q:'If a car\'s initial speed doubles and its braking deceleration is the same, its stopping distance…',a:'is multiplied by 4.',w:['doubles.','stays the same.','is multiplied by √2.'],why:'d = v²/(2a), so d ∝ v².'},
  {q:'A ball is thrown straight up. At the top of its flight, which is true?',a:'v = 0 and a = −g (taking up as +).',w:['v = 0 and a = 0.','v = 0 and a = +g.','v is maximum and a = 0.'],why:'Gravity keeps acting: the acceleration is −g throughout the flight.'}],
 bank:KIN_BANK,
 sym:[()=>pxSym('A car starts from rest at x = 0 and accelerates with constant acceleration a. A friend at x = 0 throws a ball at t = 0 that lands in the car when the car has travelled distance d. Take g &gt; 0 as the magnitude of free-fall acceleration and ignore air resistance.',[
   {q:'How long is the ball in the air?',a:'t = √(2d/a)',w:['t = √(d/a)','t = 2d/a','t = √(2a/d)'],why:'The car must reach d at the landing time: d = ½at² ⇒ t = √(2d/a).'},
   {q:'What is the car\'s speed when the ball lands?',a:'√(2ad)',w:['√(ad)','2ad','a√(d/2)'],why:'v = at = a√(2d/a) = √(2ad).'},
   {q:'What is the ball\'s initial horizontal velocity?',a:'√(ad/2)',w:['√(2ad)','√(ad)','d/a'],why:'Horizontal motion is uniform: v<sub>x</sub> = d/t = d/√(2d/a) = √(ad/2).'},
   {q:'What is the ball\'s initial vertical velocity (it lands at launch height)?',a:'g√(d/(2a))',w:['g√(2d/a)','√(2gd)','g d/a'],why:'0 = v<sub>y</sub>t − ½gt² ⇒ v<sub>y</sub> = gt/2 = (g/2)√(2d/a) = g√(d/(2a)).'},
   {q:'What is the ratio (car\'s final speed)/(ball\'s horizontal speed)?',a:'2',w:['1','½','√2'],why:'√(2ad)/√(ad/2) = 2. Same displacement in the same time: the car averages the ball\'s speed, so it ends at twice it.'}])]});
pxNode('graph',{
 mcs:[
  {q:'On a position–time graph, a straight line with negative slope means the object…',a:'moves in the −x direction at constant velocity.',w:['is slowing down.','has negative acceleration.','is at rest below the origin.'],why:'Constant slope = constant velocity; negative slope = moving in −x.'},
  {q:'A velocity–time graph is a horizontal line above the axis. The acceleration–time graph is…',a:'zero for all times.',w:['a horizontal line above the axis.','a line with positive slope.','a horizontal line below the axis.'],why:'Constant velocity has zero slope, so a = 0.'},
  {q:'On a velocity–time graph, the object reverses direction where…',a:'the graph crosses v = 0.',w:['the slope is zero.','the graph has a maximum.','the area under the graph is zero.'],why:'Direction changes when v changes sign.'},
  {q:'A velocity–time graph is a straight line from (0, 10 m/s) down to (5 s, −10 m/s). The displacement over the 5 s is…',a:'0 m',w:['50 m','25 m','−50 m'],why:'Area above the axis (+25 m) cancels the area below (−25 m).'}],
 bank:KIN_BANK});

// ===== 2D motion =====
const PROJ_BANK=[
 ['At the top of a projectile\'s path, its velocity is zero.',false,'Only v<sub>y</sub> = 0; v<sub>x</sub> is unchanged.'],
 ['A projectile\'s acceleration is the same at every point of its flight (no air resistance).',true,'a = g, straight down, throughout.'],
 ['The horizontal velocity of a projectile is constant (no air resistance).',true,'No horizontal force, so a<sub>x</sub> = 0.'],
 ['A ball dropped and a ball thrown horizontally from the same height land at the same time.',true,'Vertical motion is the same: v<sub>y,i</sub> = 0 for both.'],
 ['On level ground, launch angles of 30° and 60° give the same range at the same speed.',true,'R = v²sin(2θ)/g and sin 60° = sin 120°.'],
 ['A heavier projectile falls faster (no air resistance).',false,'Free-fall acceleration doesn\'t depend on mass.'],
 ['At the highest point, the acceleration and velocity are perpendicular.',true,'v is horizontal there and a = g is vertical.']];
pxNode('proj',{
 mcs:[
  {q:'A projectile is launched at speed v₀ and angle θ above level ground. Its time of flight is…',a:'2v₀ sin θ / g',w:['v₀ sin θ / g','2v₀ cos θ / g','v₀² sin 2θ / g'],why:'y = v₀ sin θ · t − ½gt² = 0 ⇒ t = 2v₀ sin θ / g.'},
  {q:'A projectile is launched at speed v₀ and angle θ. Its maximum height above the launch point is…',a:'v₀² sin²θ / (2g)',w:['v₀² sin θ / g','v₀² sin 2θ / g','v₀ sin θ / (2g)'],why:'0 = (v₀ sin θ)² − 2gH.'},
  {q:'On level ground, which launch angle gives the maximum range (no air resistance)?',a:'45°',w:['30°','60°','90°'],why:'R ∝ sin 2θ, largest when 2θ = 90°.'},
  {q:'A ball rolls off a table at speed v and falls height h. How far from the table does it land?',a:'v√(2h/g)',w:['v√(h/g)','2vh/g','√(2gh)'],why:'Fall time t = √(2h/g); horizontal distance = vt.'}],
 bank:PROJ_BANK});
pxNode('rel',{
 mcs:[
  {q:'A boat heads straight across a river (perpendicular to the current). Compared with still water, the time to cross is…',a:'the same.',w:['longer.','shorter.','impossible to tell without the current speed.'],why:'The current is parallel to the banks, so it doesn\'t change the across-component of velocity.'},
  {q:'To land directly across from its start, a boat must…',a:'aim partly upstream.',w:['aim straight across.','aim partly downstream.','go faster than the current only if it aims downstream.'],why:'The upstream component of its velocity must cancel the current.'},
  {q:'Car A moves east at 20 m/s and car B moves west at 15 m/s. The velocity of A relative to B is…',a:'35 m/s east',w:['5 m/s east','35 m/s west','5 m/s west'],why:'v<sub>AB</sub> = v<sub>A</sub> − v<sub>B</sub> = 20 − (−15) = 35 m/s east.'}],
 bank:[
  ['v<sub>AB</sub> = −v<sub>BA</sub>.',true,'Swapping the observer reverses the relative velocity.'],
  ['Acceleration is the same in every frame moving at constant velocity relative to the first.',true,'Adding a constant velocity doesn\'t change dv/dt.'],
  ['A passenger walking forward on a train has a ground speed less than the train\'s.',false,'Speeds add: v<sub>ground</sub> = v<sub>train</sub> + v<sub>walk</sub>.'],
  ['Viewed from a frame drifting left at V₀, an object at rest appears to move right at V₀.',true,'v′ = v − v<sub>frame</sub> = 0 − (−V₀) = +V₀.'],
  ['The time to cross a river depends on how fast the current is, for a boat aimed straight across.',false,'Only the across-component matters for crossing time.']],
 num:PX.vec?[]:[]});
PX.relNum=()=>{const v=pick([80,100,120]),w=pick([20,30]),ang=pick([30,45,60]);const vx=w*Math.cos(ang*D2R),vy=v+w*Math.sin(ang*D2R);const m=Math.hypot(vx,vy),d=Math.atan(vx/vy)/D2R;const f=(M,D,dir)=>`${Math.round(M)} m/s at ${Math.round(D)}° ${dir} of north`;
  return mc(`An airplane heads due north with an airspeed of ${v} m/s. A ${w} m/s wind blows toward ${ang}° north of east. What is the plane's velocity relative to the ground?`,f(m,d,'east'),[f(v+w,ang,'east'),f(m,d,'west'),f(Math.hypot(v,w),Math.atan(w/v)/D2R,'east')],[`v<sub>ground</sub> = v<sub>plane, air</sub> + v<sub>air, ground</sub>.`,`East: ${w} cos ${ang}° = ${s3(vx)}. North: ${v} + ${w} sin ${ang}° = ${s3(vy)}.`,`|v| = ${s3(m)} m/s at ${s3(d)}° east of north.`])};
{const g0=PX.rel;PX.rel=()=>Math.random()<.25?PX.relNum():g0()}
pxNode('circ',{
 mcs:[
  {q:'A ball swings in a vertical circle and is speeding up on the way down. At a point on the descending side, its acceleration points…',a:'partly toward the center and partly along the motion (down the path).',w:['exactly toward the center.','straight down only.','exactly along the velocity.'],why:'Speeding up adds a tangential component along v; moving in a circle needs a radial component toward the center.'},
  {q:'An object moves in a circle at constant speed. Its acceleration…',a:'points toward the center, with magnitude v²/r.',w:['is zero because the speed is constant.','points along the velocity.','points away from the center.'],why:'The direction of v changes, so a ≠ 0; a<sub>c</sub> = v²/r toward the center.'},
  {q:'At the same speed, the radius of a circular path is halved. The centripetal acceleration…',a:'doubles.',w:['halves.','is multiplied by 4.','stays the same.'],why:'a = v²/r ∝ 1/r.'},
  {q:'At the same radius, the speed doubles. The centripetal acceleration…',a:'is multiplied by 4.',w:['doubles.','halves.','stays the same.'],why:'a = v²/r ∝ v².'}],
 bank:[
  ['In uniform circular motion, velocity and acceleration are perpendicular.',true,'v is tangent; a points to the center.'],
  ['In uniform circular motion, the velocity is constant.',false,'Speed is constant but the direction keeps changing.'],
  ['If an object slows down while moving in a circle, its acceleration has a component opposite to its velocity.',true,'The tangential component points against v when slowing.'],
  ['Centripetal acceleration is a separate force acting on the object.',false,'It\'s an acceleration; real forces (tension, friction, normal, gravity) supply it.'],
  ['The period of uniform circular motion is T = 2πr/v.',true,'One circumference per period.']]});

// ===== Newton's laws =====
const INC_BANK=[
 ['On an incline, the normal force equals mg cos θ when nothing else pushes perpendicular to the surface.',true,'No acceleration perpendicular to the surface.'],
 ['A block at rest on an incline feels static friction of magnitude μ<sub>s</sub>mg cos θ.',false,'μ<sub>s</sub>N is only the maximum. At rest, friction is whatever balances: mg sin θ.'],
 ['Static friction can point up or down the incline depending on the other forces.',true,'It opposes the direction the block would slip.'],
 ['Kinetic friction always points opposite the velocity relative to the surface.',true,'It opposes relative sliding.'],
 ['A block sliding up a frictionless incline accelerates down the incline, even while moving up.',true,'The only force along the slope is mg sin θ, down the slope.'],
 ['The acceleration of a box on a frictionless incline is zero at its highest point.',false,'a = g sin θ down the slope at every point, including the top.']];
pxNode('incline',{
 mcs:[
  {q:'A block slides DOWN an incline with kinetic friction μ<sub>k</sub>. Its acceleration is…',a:'g(sin θ − μ<sub>k</sub> cos θ) down the slope',w:['g(sin θ + μ<sub>k</sub> cos θ) down the slope','g sin θ down the slope','μ<sub>k</sub>g cos θ up the slope'],why:'Along the slope: mg sin θ down, friction μ<sub>k</sub>mg cos θ up.'},
  {q:'A box slides up a frictionless incline, stops, and slides back down. Its acceleration is…',a:'down the incline the whole time, including at the top.',w:['up the incline while moving up.','zero at its highest point.','down the incline only while moving down.'],why:'The net force is always mg sin θ down the slope.'},
  {q:'A block rests on an incline without slipping. As the angle is slowly increased (still not slipping), the friction force…',a:'increases.',w:['decreases.','stays μ<sub>s</sub>mg cos θ.','stays the same.'],why:'At rest, f = mg sin θ, which grows with θ.'},
  {q:'A block is just about to slip on an incline. The angle satisfies…',a:'tan θ = μ<sub>s</sub>',w:['sin θ = μ<sub>s</sub>','cos θ = μ<sub>s</sub>','tan θ = μ<sub>k</sub>'],why:'mg sin θ = μ<sub>s</sub>mg cos θ.'}],
 bank:INC_BANK,
 sym:[()=>pxSym('A block of mass m slides down an incline of angle θ with kinetic friction coefficient μ<sub>k</sub>. Take the i-axis down the slope and j perpendicular to it.',[
   {q:'The j-component of Newton\'s 2nd law gives…',a:'N = mg cos θ',w:['N = mg','N = mg sin θ','N = mg/cos θ'],why:'No acceleration perpendicular to the slope: N − mg cos θ = 0.'},
   {q:'The i-component of Newton\'s 2nd law gives…',a:'mg sin θ − μ<sub>k</sub>N = ma',w:['mg sin θ + μ<sub>k</sub>N = ma','mg cos θ − μ<sub>k</sub>N = ma','μ<sub>k</sub>N − mg sin θ = ma'],why:'Gravity\'s component down the slope minus friction up the slope.'},
   {q:'So the acceleration is…',a:'g(sin θ − μ<sub>k</sub> cos θ)',w:['g(sin θ + μ<sub>k</sub> cos θ)','g(cos θ − μ<sub>k</sub> sin θ)','g sin θ'],why:'Substitute N = mg cos θ and divide by m.'},
   {q:'Special case: for what μ<sub>k</sub> does the block slide at constant speed?',a:'μ<sub>k</sub> = tan θ',w:['μ<sub>k</sub> = sin θ','μ<sub>k</sub> = cos θ','μ<sub>k</sub> = 1'],why:'a = 0 ⇒ sin θ = μ<sub>k</sub> cos θ.'}])]});
pxNode('atwood',{
 mcs:[
  {q:'Two blocks are tied by a massless, unstretchable rope over a massless, frictionless pulley. Compared with each other, their accelerations are…',a:'equal in magnitude.',w:['different; the heavier one accelerates more.','equal only if the masses are equal.','zero unless one is heavier.'],why:'An unstretchable rope makes both move the same distance in the same time.'},
  {q:'A hanging mass M₂ pulls a block M₁ across a frictionless table through a massless pulley. The rope tension is…',a:'less than M₂g.',w:['equal to M₂g.','greater than M₂g.','equal to M₁g.'],why:'M₂ accelerates down, so M₂g − T = M₂a &gt; 0.'},
  {q:'In a two-mass system with a movable pulley, M₂ hangs from the movable pulley. The acceleration of M₂ is…',a:'half the acceleration of M₁.',w:['equal to that of M₁.','twice that of M₁.','g.'],why:'The rope on each side of the movable pulley shortens by half of M₁\'s displacement.'},
  {q:'An elevator accelerates downward at a &lt; g. The scale reading for a person of mass m is…',a:'m(g − a)',w:['m(g + a)','mg','ma'],why:'N − mg = −ma ⇒ N = m(g − a).'}],
 bank:[
  ['The tension is the same throughout a massless rope over a massless, frictionless pulley.',true,'No mass and no friction means no net force is needed to change the tension.'],
  ['In an Atwood machine, the acceleration of the hanging masses can be greater than g.',false,'a = (m₂ − m₁)g/(m₁ + m₂) &lt; g.'],
  ['If M₂ is heavier than M₁ and moving up the incline, M₁\'s acceleration is greater than M₂\'s.',false,'They\'re connected by one rope: same magnitude.'],
  ['The scale reading in an elevator moving up at constant speed equals mg.',true,'Constant velocity: a = 0, so N = mg.'],
  ['A hanging mass falling while attached to a rope has acceleration g.',false,'The tension slows it: a &lt; g.']],
 sym:[()=>pxSym('Masses m₁ and m₂ (m₂ &gt; m₁) hang on either side of a massless, frictionless pulley on a massless rope.',[
   {q:'Newton\'s 2nd law for m₂ (taking down as +) is…',a:'m₂g − T = m₂a',w:['T − m₂g = m₂a','m₂g + T = m₂a','m₂g − T = 0'],why:'Gravity down, tension up.'},
   {q:'Newton\'s 2nd law for m₁ (taking up as +) is…',a:'T − m₁g = m₁a',w:['m₁g − T = m₁a','T + m₁g = m₁a','T = m₁g'],why:'Tension up, gravity down; m₁ accelerates up.'},
   {q:'Adding the equations, a = …',a:'(m₂ − m₁)g/(m₁ + m₂)',w:['(m₂ − m₁)g/m₂','(m₁ + m₂)g/(m₂ − m₁)','m₂g/(m₁ + m₂)'],why:'T cancels: (m₂ − m₁)g = (m₁ + m₂)a.'},
   {q:'The tension is T = …',a:'2m₁m₂g/(m₁ + m₂)',w:['m₂g','(m₁ + m₂)g/2','m₁m₂g/(m₁ + m₂)'],why:'T = m₁(g + a) = m₁g·2m₂/(m₁ + m₂).'},
   {q:'Check the special case m₁ = m₂. What happens?',a:'a = 0 and T = mg: balanced.',w:['a = g/2.','T = 0.','a = g.'],why:'Equal masses balance; the formulas give a = 0, T = mg.'}])]});
pxNode('newton',{
 mcs:[
  {q:'A heavy truck hits a light car. During the collision, the force of the truck on the car is…',a:'equal in magnitude to the force of the car on the truck.',w:['larger than the force of the car on the truck.','smaller than the force of the car on the truck.','zero, because the truck keeps moving.'],why:'Newton\'s 3rd law: the pair forces are always equal and opposite.'},
  {q:'Which pair is a Newton\'s 3rd-law pair for a book resting on a table?',a:'Earth pulls the book down; the book pulls Earth up.',w:['Gravity on the book and the normal force on the book.','The normal force on the book and the book\'s weight on the table.','The table\'s weight and the floor\'s normal force.'],why:'3rd-law pairs act on two different objects and are the same type of force.'},
  {q:'A constant net force acts on an object. Its velocity…',a:'changes at a constant rate.',w:['is constant.','increases forever at an increasing rate.','must be in the direction of the force.'],why:'F = ma: constant force gives constant acceleration.'},
  {q:'A wedge (mass M) on a frictionless floor is pushed with force F<sub>a</sub>; a block (mass m) rides on it without slipping. Their common acceleration is…',a:'F<sub>a</sub>/(M + m)',w:['F<sub>a</sub>/M','F<sub>a</sub>/m','F<sub>a</sub>(M + m)'],why:'Treat block + wedge as one system: the internal forces cancel.'}],
 bank:[
  ['Newton\'s 3rd-law pair forces act on different objects.',true,'That\'s why they don\'t cancel each other.'],
  ['The normal force on a book resting on a table and its weight are a 3rd-law pair.',false,'Both act on the book; they\'re different kinds of force.'],
  ['An object can move without a net force acting on it.',true,'Constant velocity needs no net force (1st law).'],
  ['The normal force always equals mg.',false,'It\'s whatever is needed: e.g. mg cos θ on an incline, m(g + a) in an accelerating elevator.'],
  ['In a collision, the lighter object feels the larger force.',false,'Equal forces; the lighter one has the larger acceleration.'],
  ['In a free-body diagram, you draw only forces acting ON the chosen object.',true,'Forces it exerts on other things go on their diagrams.']]});
pxNode('bank',{
 mcs:[
  {q:'A car rounds a banked curve so slowly that it\'s about to slip. The friction force on the tires points…',a:'up the bank.',w:['down the bank.','toward the center of the curve.','opposite the direction of driving.'],why:'Too slow: the car would slide down the slope, so friction acts up the bank.'},
  {q:'A car rounds a banked curve faster than the design speed. Friction points…',a:'down the bank.',w:['up the bank.','zero.','forward.'],why:'Too fast: it tends to slide up and out, so friction acts down the slope.'},
  {q:'A roller coaster car goes around a vertical loop of radius R. The minimum speed at the top to stay on the track is…',a:'√(gR)',w:['0','√(2gR)','gR'],why:'At the minimum, N = 0 and gravity alone provides v²/R.'},
  {q:'Starting from rest on a frictionless track, the minimum release height to make it around a loop of diameter D is…',a:'5D/4',w:['D','2D','3D/2'],why:'mgh = mg(2R) + ½m(gR) ⇒ h = 5R/2 = 5D/4.'}],
 bank:[
  ['At the design speed of a banked curve, no friction is needed.',true,'The normal force\'s horizontal component supplies exactly mv²/r.'],
  ['At the top of a loop, the minimum speed condition is v = 0.',false,'It\'s N = 0, which gives v = √(gR).'],
  ['On a flat curve, static friction points toward the center of the curve.',true,'It supplies the centripetal force.'],
  ['The normal force at the bottom of a loop is greater than mg.',true,'N − mg = mv²/R &gt; 0.'],
  ['Centripetal force is an extra force you add to the free-body diagram.',false,'It\'s the net of the real radial forces.']],
 sym:[()=>pxSym('A roller-coaster car of mass m starts from rest at height h on a frictionless track and goes around a vertical loop of diameter D.',[
   {q:'Using ΔE<sub>tot</sub> = 0, the speed v<sub>t</sub> at the top of the loop is…',a:'√(2g(h − D))',w:['√(2gh)','√(2g(h − D/2))','√(g(h − D))'],why:'mgh = mgD + ½mv<sub>t</sub>² (the top is at height D).'},
   {q:'At the top of the loop, Newton\'s 2nd law (toward the center) reads…',a:'N + mg = mv<sub>t</sub>²/(D/2)',w:['N − mg = mv<sub>t</sub>²/(D/2)','mg − N = mv<sub>t</sub>²/(D/2)','N = mg'],why:'Both N and gravity point down, toward the center.'},
   {q:'The minimum h to keep contact is…',a:'5D/4',w:['D','2D','3D/2'],why:'Set N = 0: v<sub>t</sub>² = gD/2. Then 2g(h − D) = gD/2 ⇒ h = 5D/4.'},
   {q:'Is your answer dimensionally consistent?',a:'Yes: h and D are both lengths.',w:['No: h should depend on m.','No: h should depend on g.','Only if D is in metres.'],why:'Mass and g cancel; a length equals a number times a length.'}])]});

// ===== Work & energy =====
const WE_BANK=[
 ['The normal force on a block sliding on a fixed surface does no work.',true,'It\'s perpendicular to the displacement.'],
 ['Kinetic friction on a block sliding over a fixed surface does negative work.',true,'It points opposite the displacement.'],
 ['W<sub>net</sub> = ΔK only if there\'s no friction.',false,'The work–kinetic energy theorem always holds; friction is included in W<sub>net</sub>.'],
 ['The power delivered by gravity to a falling coin is positive and increasing.',true,'P = F · v = mgv, and v grows as it falls.'],
 ['Doing positive work on an object always increases its potential energy.',false,'Net positive work increases its kinetic energy (W<sub>net</sub> = ΔK).'],
 ['The work done by a spring on a mass moving away from equilibrium is negative.',true,'The spring force points back toward equilibrium, opposite the displacement.'],
 ['When the same force pushes two masses from rest over the same distance, they gain the same kinetic energy.',true,'W = Fd is the same, so ΔK is the same.'],
 ['When the same force pushes two masses from rest for the same time, they gain the same momentum.',true,'Impulse FΔt is the same, so Δp is the same.']];
pxNode('work',{
 mcs:[
  {q:'Two objects of different masses start from rest on a frictionless surface and are pushed by the same force over the same DISTANCE. Which is correct?',a:'They have the same final kinetic energy.',w:['They have the same final speed.','They have the same final momentum.','The lighter one has less kinetic energy.'],why:'W = Fd is the same, so ΔK is the same.'},
  {q:'Two objects of different masses start from rest and are pushed by the same force for the same TIME. Which is correct?',a:'They have the same final momentum.',w:['They have the same final kinetic energy.','They have the same final speed.','The heavier one has more momentum.'],why:'Impulse FΔt = Δp is the same.'},
  {q:'A coin falls from a high bridge (no air resistance). The power delivered to it by gravity is…',a:'positive and increasing with time.',w:['positive and constant.','negative and constant.','zero, since gravity is conservative.'],why:'P = mg·v and v increases linearly.'},
  {q:'A block slides down an incline with kinetic friction. Which statement is correct?',a:'W<sub>gravity</sub> (+) + W<sub>friction</sub> (−) = ΔK, and the normal force does no work.',w:['W<sub>gravity</sub> (+) + W<sub>friction</sub> (+) = ΔK.','W<sub>gravity</sub> (−) + W<sub>friction</sub> (−) = ΔK.','The normal force does negative work.'],why:'Gravity has a component along the motion (+), friction opposes it (−), and N ⊥ motion.'}],
 bank:WE_BANK});
pxNode('energy',{
 mcs:[
  {q:'A box is pushed, then slides across a rough floor into a spring and stops momentarily. From just after the push until it stops, which is correct?',a:'ΔU<sub>spring</sub> is positive and ΔE<sub>thermal</sub> is positive.',w:['ΔE<sub>total</sub> is negative.','ΔU<sub>spring</sub> is negative.','ΔK is negative and ΔE<sub>thermal</sub> is negative.'],why:'The spring compresses (+U), friction heats things (+E<sub>th</sub>), K drops; the total for the isolated system is 0.'},
  {q:'A mass on a horizontal spring moves from its far-right position back to equilibrium. Which is correct?',a:'The spring does positive work equal to ΔK; gravity and the normal force do no work.',w:['The spring does negative work.','The spring removes kinetic energy and the mass slows down.','Gravity does positive work.'],why:'Force and displacement both point toward equilibrium, so W<sub>spring</sub> &gt; 0 and the mass speeds up.'},
  {q:'A car of mass m is released from rest at height h, crosses a rough patch of length s (μ<sub>k</sub>), then compresses a spring (k) by d. Energy conservation gives…',a:'mgh = μ<sub>k</sub>mgs + ½kd²',w:['mgh = ½kd²','mgh + μ<sub>k</sub>mgs = ½kd²','½kd² = μ<sub>k</sub>mgs'],why:'Gravitational energy becomes thermal energy (friction) and spring energy.'},
  {q:'A car of mass m is released from rest at height h on a frictionless track, then must cross a rough horizontal patch of length s (μ<sub>k</sub>) to reach a spring. The minimum h for it to reach the spring is…',a:'μ<sub>k</sub>s',w:['s','μ<sub>k</sub>s/2','s/μ<sub>k</sub>'],why:'It needs mgh &gt; μ<sub>k</sub>mgs.'}],
 bank:WE_BANK,
 sym:[()=>pxSym('A car of mass m starts from rest at height h on a frictionless track, then crosses a horizontal patch of length s with kinetic friction μ<sub>k</sub>, then compresses a spring of constant k by a distance d before stopping.',[
   {q:'Over the whole trip, the signs of the energy changes are…',a:'ΔU<sub>g</sub> −, ΔE<sub>th</sub> +, ΔU<sub>s</sub> +, ΔK 0',w:['ΔU<sub>g</sub> +, ΔE<sub>th</sub> −, ΔU<sub>s</sub> +, ΔK 0','ΔU<sub>g</sub> −, ΔE<sub>th</sub> +, ΔU<sub>s</sub> −, ΔK +','ΔU<sub>g</sub> −, ΔE<sub>th</sub> 0, ΔU<sub>s</sub> +, ΔK −'],why:'It descends (−U<sub>g</sub>), friction heats (+E<sub>th</sub>), the spring compresses (+U<sub>s</sub>), and it starts and ends at rest (ΔK = 0).'},
   {q:'Solving ΔE<sub>tot</sub> = 0 for d gives…',a:'d = √(2mg(h − μ<sub>k</sub>s)/k)',w:['d = √(2mgh/k)','d = √(2mg(h + μ<sub>k</sub>s)/k)','d = 2mg(h − μ<sub>k</sub>s)/k'],why:'−mgh + μ<sub>k</sub>mgs + ½kd² = 0.'},
   {q:'Check units: inside the square root, mg(h − μ<sub>k</sub>s)/k has units of…',a:'m²',w:['m','J','N'],why:'N·m / (N/m) = m², so d is in metres.'},
   {q:'The minimum h needed to reach the spring is…',a:'μ<sub>k</sub>s',w:['s','0','2μ<sub>k</sub>s'],why:'d must be real: h − μ<sub>k</sub>s ≥ 0.'}])]});

// ===== Momentum =====
pxNode('mom',{
 mcs:[
  {q:'In a perfectly inelastic collision between two objects of different masses, which is correct?',a:'Their final velocities just after the collision are the same.',w:['Their final momenta are the same.','The total momentum just before is greater than just after.','Kinetic plus potential energy is unchanged.'],why:'They stick together, so they move with one common velocity. Total momentum is conserved; kinetic energy is not.'},
  {q:'A ball is caught in one case and bounces back in another (arriving with the same speed). The change in momentum is…',a:'larger when it bounces back.',w:['larger when it\'s caught.','the same in both cases.','zero in both cases.'],why:'Caught: Δp = mv. Bouncing back: Δp = mv + mv′ &gt; mv.'},
  {q:'A red puck moving right hits an identical black puck at rest elastically. Afterwards the black puck moves up and to the right. The red puck…',a:'moves down and to the right.',w:['moves straight to the right.','moves up and to the right.','stops.'],why:'y-momentum starts at 0, so the red puck must move down; in an equal-mass elastic glancing collision the two move off at 90°.'},
  {q:'Two masses m and M at rest are pushed apart by a spring. The ratio of their speeds v/V is…',a:'M/m',w:['m/M','1','√(M/m)'],why:'Momentum: mv = MV.'},
  {q:'Two masses m and M at rest are pushed apart by a spring. The ratio of their kinetic energies K<sub>m</sub>/K<sub>M</sub> is…',a:'M/m',w:['m/M','1','(M/m)²'],why:'K = p²/(2m) with equal p, so K ∝ 1/m.'}],
 bank:[
  ['Total momentum is conserved in every collision if there\'s no net external force.',true,'Internal forces cancel in pairs.'],
  ['Kinetic energy is conserved in every collision.',false,'Only in elastic collisions.'],
  ['In a perfectly inelastic collision the objects move together afterwards.',true,'That\'s what "stick together" means.'],
  ['A larger impulse means a larger change in momentum.',true,'J = Δp.'],
  ['The center-of-mass velocity of an isolated system is constant.',true,'Σ F<sub>ext</sub> = 0 ⇒ dp<sub>tot</sub>/dt = 0.'],
  ['A ball that bounces off a wall has a smaller momentum change than one that sticks.',false,'Bouncing reverses the momentum, so the change is larger.']],
 sym:[()=>pxSym('Two masses m and M start at rest on a frictionless surface with a compressed spring between them storing energy U. When released, m moves one way at speed v and M the other way at speed V.',[
   {q:'Momentum conservation gives v/V = …',a:'M/m',w:['m/M','1','√(M/m)'],why:'0 = mv − MV.'},
   {q:'Energy conservation gives K<sub>m</sub> = …',a:'MU/(m + M)',w:['mU/(m + M)','U/2','U·m/M'],why:'K<sub>m</sub> + K<sub>M</sub> = U and K<sub>m</sub>/K<sub>M</sub> = M/m.'},
   {q:'And K<sub>M</sub> = …',a:'mU/(m + M)',w:['MU/(m + M)','U/2','U·M/m'],why:'The rest of U.'},
   {q:'Which mass gets more kinetic energy?',a:'The lighter one.',w:['The heavier one.','They get equal shares.','It depends on U.'],why:'K = p²/(2m) with equal momenta: smaller mass, larger K.'}])]});

// ===== Rotation =====
const ROT_BANK=[
 ['A hoop has a larger moment of inertia than a solid disk of the same mass and radius.',true,'All of the hoop\'s mass is at the rim (β = 1 vs ½).'],
 ['Rolling without slipping means v<sub>CM</sub> = Rω.',true,'The contact point is momentarily at rest.'],
 ['A solid sphere and a hoop released together roll down an incline; the hoop wins.',false,'The sphere has smaller β, so more energy goes to translation and it wins.'],
 ['Torque depends on where the force is applied, not just its size.',true,'τ = r × F.'],
 ['Angular momentum is conserved when the net external torque is zero.',true,'dL/dt = Στ<sub>ext</sub>.'],
 ['A skater pulling in her arms spins faster because her angular momentum increases.',false,'L stays the same; I decreases, so ω increases.'],
 ['For an object in equilibrium, the net torque is zero about every point.',true,'If ΣF = 0 and τ = 0 about one point, it\'s zero about all points.']];
pxNode('rot',{
 mcs:[
  {q:'An object with moment of inertia βMR² rolls without slipping down an incline of angle θ. Its acceleration is…',a:'g sin θ / (1 + β)',w:['g sin θ','g sin θ / β','g sin θ (1 + β)'],why:'Energy or torque: Mg sin θ = Ma(1 + β).'},
  {q:'A disk, a hoop and a solid sphere roll down the same incline from rest. Which reaches the bottom first?',a:'The solid sphere.',w:['The hoop.','The disk.','They tie.'],why:'Smallest β (2/5) gives the largest a = g sin θ/(1 + β).'},
  {q:'A skater spinning with arms out pulls them in. Her rotational kinetic energy…',a:'increases.',w:['decreases.','stays the same.','becomes zero.'],why:'K = L²/(2I): L fixed, I smaller, so K larger (she does work pulling in).'},
  {q:'The parallel-axis theorem says I about an axis a distance D from the CM is…',a:'I<sub>CM</sub> + MD²',w:['I<sub>CM</sub> − MD²','MD²','I<sub>CM</sub>·D²'],why:'I<sub>∥</sub> = I<sub>CM</sub> + MD².'}],
 bank:ROT_BANK});
pxNode('rotb',{
 mcs:[
  {q:'For a rolling object, the fraction of its kinetic energy that is rotational is…',a:'β/(1 + β)',w:['1/(1 + β)','β','½'],why:'K<sub>rot</sub> = ½βMv², K<sub>tot</sub> = ½(1 + β)Mv².'},
  {q:'A wheel rolls without slipping. The point at the top of the wheel moves at…',a:'2v<sub>CM</sub>',w:['v<sub>CM</sub>','0','√2 v<sub>CM</sub>'],why:'v<sub>top</sub> = v<sub>CM</sub> + Rω = 2v<sub>CM</sub>.'},
  {q:'A wheel rolls without slipping. The point touching the ground moves at…',a:'0',w:['v<sub>CM</sub>','2v<sub>CM</sub>','Rω'],why:'v = v<sub>CM</sub> − Rω = 0.'}],
 bank:ROT_BANK});

// Install: replace generators for topics with an exam-style pool (keep units and lab)
{const P=COURSES.find(c=>c.id==='phys');for(const w of P.worlds)for(const n of w.nodes){const g=PX[n.id];if(g){n.genOld=n.gen;n.gen=()=>{for(let t=0;t<5;t++){const q=g();if(q)return q}return n.genOld()}}}}
