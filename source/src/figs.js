// ===== Lesson diagrams (inline SVG, themed with CSS variables) =====
const FIG={};
(()=>{
const W=320,H=200;
const svg=(body,h=H,label='')=>`<svg viewBox="0 0 ${W} ${h}" role="img" aria-label="${label}" class="figsvg">${body}</svg>`;
const ln=(x1,y1,x2,y2,c='fl',extra='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${c}" ${extra}/>`;
const tx=(x,y,t,a='start',c='ft')=>`<text x="${x}" y="${y}" text-anchor="${a}" class="${c}">${t}</text>`;
const arrow=(x1,y1,x2,y2,c='fc',lab='',lx=0,ly=0)=>{const a=Math.atan2(y2-y1,x2-x1),s=7;const p1=[x2-s*Math.cos(a-.4),y2-s*Math.sin(a-.4)],p2=[x2-s*Math.cos(a+.4),y2-s*Math.sin(a+.4)];return`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${c}"/><path d="M${x2} ${y2}L${p1[0].toFixed(1)} ${p1[1].toFixed(1)}L${p2[0].toFixed(1)} ${p2[1].toFixed(1)}Z" class="${c}f"/>${lab?tx(x2+lx,y2+ly,lab):''}`};
const path=(f,x0,x1,X,Y,c='fl',n=120)=>{let d='';for(let i=0;i<=n;i++){const x=x0+(x1-x0)*i/n,y=f(x);if(!isFinite(y))continue;d+=(d?'L':'M')+X(x).toFixed(1)+' '+Y(y).toFixed(1)}return`<path d="${d}" class="${c}" fill="none"/>`};
const axes=(ox,oy,w,h,xl='x',yl='y')=>arrow(ox,oy,ox+w,oy,'fa')+arrow(ox,oy,ox,oy-h,'fa')+tx(ox+w,oy-7,xl,'end','fs')+tx(ox-6,oy-h+4,yl,'end','fs');

// MATH 137: linear approximation
{const X=x=>40+x*55,Y=y=>170-y*55,f=x=>Math.sqrt(x)*1.1,a=1.4,fa=f(a),d=1.1/(2*Math.sqrt(a));
 FIG.m137_lin={cap:'Near x = a the graph and its tangent line Lₐ(x) almost coincide, so Lₐ(x) ≈ f(x).',svg:svg(axes(40,170,265,160)+path(f,0,4.6,X,Y,'fl')+path(x=>fa+d*(x-a),0,4.6,X,Y,'fc')+`<circle cx="${X(a)}" cy="${Y(fa)}" r="4" class="fdot"/>`+tx(X(a)+6,Y(fa)+16,'(a, f(a))','start','fs')+tx(X(4.4),Y(f(4.4))+16,'f(x)','end')+tx(X(4.3),Y(fa+d*(4.3-a))-6,'Lₐ(x)','end','fcl'),200,'Curve with its tangent line at a')}}
// MATH 137: MVT
{const X=x=>40+x*60,Y=y=>172-y*32,f=x=>.18*(x-.3)**3-.9*(x-.3)**2+1.6*(x-.3)+1.2,a=.3,b=4.3,m=(f(b)-f(a))/(b-a);
 let c=a,best=1e9;for(let x=a;x<=b;x+=.001){const d=(f(x+1e-5)-f(x))/1e-5;if(Math.abs(d-m)<best&&x>a+.3&&x<b-.3){best=Math.abs(d-m);c=x}}
 FIG.m137_mvtc={cap:'Somewhere between a and b, the tangent slope f′(c) equals the slope of the secant line.',svg:svg(axes(40,175,265,165)+path(f,a,b,X,Y,'fl')+ln(X(a),Y(f(a)),X(b),Y(f(b)),'fd')+path(x=>f(c)+m*(x-c),c-1.2,c+1.2,X,Y,'fc')+`<circle cx="${X(a)}" cy="${Y(f(a))}" r="3.5" class="fdot"/><circle cx="${X(b)}" cy="${Y(f(b))}" r="3.5" class="fdot"/><circle cx="${X(c)}" cy="${Y(f(c))}" r="4" class="fdotc"/>`+tx(X(a),190,'a','middle','fs')+tx(X(b),190,'b','middle','fs')+tx(X(c),Y(f(c))-10,'c','middle','fcl')+ln(X(c),Y(f(c))+5,X(c),175,'fg'),200,'Mean value theorem: tangent parallel to secant')}}
// MATH 137: IVT
{const X=x=>40+x*60,Y=y=>175-y*30,f=x=>.35*x**3-2*x**2+3.4*x+.4,a=.2,b=4.3,al=2.6;
 FIG.m137_ivt={cap:'A continuous graph from f(a) to f(b) must cross every height α in between, at least once.',svg:svg(axes(40,175,265,165)+path(f,a,b,X,Y,'fl')+ln(40,Y(al),300,Y(al),'fd')+tx(300,Y(al)-6,'y = α','end','fcl')+`<circle cx="${X(a)}" cy="${Y(f(a))}" r="3.5" class="fdot"/><circle cx="${X(b)}" cy="${Y(f(b))}" r="3.5" class="fdot"/>`+tx(X(a),190,'a','middle','fs')+tx(X(b),190,'b','middle','fs'),200,'Intermediate value theorem')}}
// MATH 137: Taylor
{const X=x=>160+x*36,Y=y=>100-y*55;const T=n=>x=>{let s=0,t=x;for(let k=1;k<=n;k+=2){s+=t;t*=-x*x/((k+1)*(k+2))}return s};
 FIG.m137_taylor={cap:'Taylor polynomials of sin x about 0. Each extra term hugs the curve over a wider interval.',svg:svg(ln(20,100,300,100,'fa')+ln(160,15,160,185,'fa')+path(Math.sin,-3.9,3.9,X,Y,'fl',200)+path(T(1),-1.6,1.6,X,Y,'fd2')+path(T(3),-2.45,2.45,X,Y,'fc')+path(T(5),-3.9,3.9,X,Y,'fd')+[['sin x','fl'],['T₁','fd2'],['T₃','fc'],['T₅','fd']].map(([l,c],i)=>ln(236,140+i*14,254,140+i*14,c)+tx(260,144+i*14,l,'start',c==='fc'?'fcl':'fs')).join(''),200,'Taylor polynomials of sine')}}
// MATH 137: bisection
{const X=x=>40+(x-1)*230,Y=y=>110-y*45,f=x=>x*x-2;
 FIG.m137_bisect={cap:'Each step keeps the half where the sign changes, so the interval around √2 halves every time.',svg:svg(ln(30,110,300,110,'fa')+path(f,1,2,X,Y,'fl')+[[1,2,150],[1,1.5,165],[1.25,1.5,180]].map(([a,b,y],i)=>ln(X(a),y,X(b),y,'fc','stroke-width="4"')+tx(X(b)+6,y+4,`step ${i}`,'start','fs')).join('')+`<circle cx="${X(Math.SQRT2)}" cy="110" r="4" class="fdotc"/>`+tx(X(Math.SQRT2),100,'√2','middle','fcl'),200,'Bisection intervals')}}
// MATH 135: polar form
{const ox=110,oy=150,s=55,r=2,th=2*Math.PI/3,px=ox+s*r*Math.cos(th),py=oy-s*r*Math.sin(th);
 FIG.m135_cpolar={cap:'z = r(cos θ + i sin θ): r is the distance from 0, θ the angle from the positive real axis.',svg:svg(arrow(10,oy,300,oy,'fa')+arrow(ox,195,ox,10,'fa')+tx(298,oy+15,'Re','end','fs')+tx(ox+6,18,'Im','start','fs')+ln(ox,oy,px,py,'fc')+`<circle cx="${px}" cy="${py}" r="4" class="fdotc"/><path d="M${ox+28} ${oy} A28 28 0 0 0 ${(ox+28*Math.cos(th)).toFixed(1)} ${(oy-28*Math.sin(th)).toFixed(1)}" class="fl" fill="none"/>`+tx(ox+26,oy-30,'θ = 2π/3','start','fs')+tx(px-8,py-8,'−1 + √3 i','end','fcl')+tx((ox+px)/2+8,(oy+py)/2+4,'r = 2','start','fs')+ln(px,py,px,oy,'fg'),200,'Complex number in polar form')}}
// MATH 135: roots of unity style (z^3 = 8i)
{const ox=160,oy=100,R=70;const pts=[Math.PI/6,5*Math.PI/6,3*Math.PI/2];
 FIG.m135_roots={cap:'The three solutions of z³ = 8i: radius 2, angles π/6, 5π/6 and 3π/2, spaced 2π/3 apart.',svg:svg(ln(40,oy,280,oy,'fa')+ln(ox,10,ox,190,'fa')+`<circle cx="${ox}" cy="${oy}" r="${R}" class="fd" fill="none"/><polygon points="${pts.map(t=>(ox+R*Math.cos(t)).toFixed(1)+','+(oy-R*Math.sin(t)).toFixed(1)).join(' ')}" class="fc" fill="none"/>`+pts.map((t,i)=>`<circle cx="${(ox+R*Math.cos(t)).toFixed(1)}" cy="${(oy-R*Math.sin(t)).toFixed(1)}" r="4.5" class="fdotc"/>`+tx(ox+R*Math.cos(t)+[12,-12,10][i],oy-R*Math.sin(t)+[-8,-8,14][i],['√3 + i','−√3 + i','−2i'][i],['start','end','start'][i],'fs')).join(''),200,'Cube roots on a circle')}}
// CHEM: Bohr levels
{const E=n=>-1/(n*n),Y=e=>20+(-e)*160;
 FIG.chem_bohr={cap:'Hydrogen energy levels Eₙ = −R_H/n² crowd together as n grows. A drop from n = 3 to n = 2 emits a 656 nm photon.',svg:svg([1,2,3,4,5].map(n=>ln(70,Y(E(n)),230,Y(E(n)),'fl')).join('')+[1,2,3].map(n=>tx(62,Y(E(n))+4,'n = '+n,'end','fs')).join('')+tx(62,Y(E(5))+2,'n = 4, 5 …','end','fs')+ln(70,20,230,20,'fd')+tx(62,18,'n = ∞','end','fs')+arrow(150,Y(E(3)),150,Y(E(2))-2,'fc')+tx(158,(Y(E(3))+Y(E(2)))/2+4,'emits hν','start','fcl')+tx(240,Y(E(1))+4,'−R_H','start','fs')+tx(240,22,'0','start','fs'),200,'Bohr energy levels')}}
// CHEM: MO diagram for O2
{const lv=[['σ2s',178,2,1],['σ*2s',152,2,1],['σ2p',122,2,1],['π2p',100,4,2],['π*2p',68,2,2],['σ*2p',40,0,1]];
 const el=(x,y,up)=>`<path d="M${x} ${y+7}L${x} ${y-7}${up?`M${x-3} ${y-3}L${x} ${y-7}L${x+3} ${y-3}`:`M${x-3} ${y+3}L${x} ${y+7}L${x+3} ${y+3}`}" class="fe" fill="none"/>`;
 let b='';for(const[nm,y,ne,no]of lv){const xs=no===1?[160]:[138,182];xs.forEach((x,i)=>{b+=ln(x-16,y,x+16,y,'fl');const here=no===1?ne:(nm==='π*2p'?1:2);if(here>=1)b+=el(x-5,y,true);if(here>=2)b+=el(x+5,y,false)});b+=tx(212,y+4,nm,'start','fs')}
 FIG.chem_mo={cap:'O₂ valence MO diagram. The two π* electrons sit in separate orbitals, so O₂ is paramagnetic; bond order (8 − 4)/2 = 2.',svg:svg(b+tx(40,24,'energy','start','fs')+arrow(40,190,40,32,'fa'),200,'MO diagram for oxygen')}}
// CHEM: VSEPR electron-group geometries
{const cell=(cx,cy,pts,name,ang)=>`<circle cx="${cx}" cy="${cy}" r="6" class="fdotc"/>`+pts.map(([dx,dy,back])=>ln(cx,cy,cx+dx,cy+dy,back?'fd':'fl')+`<circle cx="${cx+dx}" cy="${cy+dy}" r="4.5" class="fdot"/>`).join('')+tx(cx,cy+48,name,'middle','fs')+tx(cx,cy+62,ang,'middle','fs');
 FIG.chem_vsepr={cap:'Electron-group geometries for 2 to 6 groups. Lone pairs occupy positions but are left out when you name the molecular shape.',svg:svg(cell(55,48,[[-26,0],[26,0]],'2 linear','180°')+cell(160,48,[[0,-28],[24,14],[-24,14]],'3 trigonal planar','120°')+cell(265,48,[[0,-28],[-24,16],[22,10,1],[8,22]],'4 tetrahedral','109.5°')+cell(105,170,[[0,-30],[0,30],[-28,0],[16,-14,1],[16,14]],'5 trigonal bipyramidal','90°, 120°')+cell(215,170,[[0,-30],[0,30],[-26,0],[26,0],[14,-14,1],[-14,14,1]],'6 octahedral','90°'),250,'VSEPR geometries')}}
// PHYS: vector components
{const ox=60,oy=160,A=150,t=35*Math.PI/180,x2=ox+A*Math.cos(t),y2=oy-A*Math.sin(t);
 FIG.phys_vec={cap:'With θ measured from the +x axis, Aₓ = A cos θ and Aᵧ = A sin θ.',svg:svg(arrow(30,oy,300,oy,'fa')+arrow(ox,190,ox,15,'fa')+arrow(ox,oy,x2,y2,'fc')+ln(x2,y2,x2,oy,'fd')+ln(ox,y2,x2,y2,'fd')+tx(ox+A*Math.cos(t)/2,oy+16,'Aₓ = A cos θ','middle','fs')+tx(x2+6,(oy+y2)/2,'Aᵧ = A sin θ','start','fs')+tx(ox+58,oy-60,'A','start','fcl')+`<path d="M${ox+30} ${oy} A30 30 0 0 0 ${(ox+30*Math.cos(t)).toFixed(1)} ${(oy-30*Math.sin(t)).toFixed(1)}" class="fl" fill="none"/>`+tx(ox+36,oy-6,'θ','start','fs'),200,'Vector components')}}
// PHYS: motion graphs
{const g=(ox,f,lab,yl,shade)=>{const X=t=>ox+t*28,Y=v=>150-v*22;let s=axes(ox,150,130,130,'t',yl)+path(f,0,4.4,X,Y,'fl');if(shade)s+=`<path d="M${X(0)} 150 ${Array.from({length:45},(_,i)=>`L${X(i/10).toFixed(1)} ${Y(f(i/10)).toFixed(1)}`).join(' ')} L${X(4.4)} 150Z" class="fsh"/>`;return s+tx(ox+65,185,lab,'middle','fs')};
 FIG.phys_graph={cap:'Left: slope of x–t is velocity. Right: slope of v–t is acceleration, and the shaded area is displacement.',svg:svg(g(25,t=>.25*t*t,'x–t: slope = v','x')+g(180,t=>1+.9*t,'v–t: area = Δx','v',true),200,'Position-time and velocity-time graphs')}}
// PHYS: projectile
{const v=1,X=x=>30+x*270,Y=y=>170-y*270,f=x=>Math.tan(Math.PI/4)*x-x*x;const xs=[0,.25,.5,.75];
 FIG.phys_proj={cap:'Horizontal velocity stays the same; vertical velocity shrinks, hits zero at the top, then grows downward.',svg:svg(ln(20,170,305,170,'fa')+path(f,0,1,X,Y,'fd')+xs.map(x=>{const vy=1-2*x;return arrow(X(x),Y(f(x)),X(x)+32,Y(f(x)),'fc')+(Math.abs(vy)>.05?arrow(X(x),Y(f(x)),X(x),Y(f(x))-vy*34,'fl'):'')}).join('')+tx(X(.5),Y(f(.5))-10,'vᵧ = 0','middle','fs')+tx(300,30,'vₓ constant','end','fcl')+tx(300,46,'vᵧ changes','end','fs'),200,'Projectile velocity components')}}
// PHYS: incline FBD
{const th=30*Math.PI/180,ax=40,ay=180,L=260,bx=ax+150*Math.cos(th),by=ay-150*Math.sin(th);const u=[Math.cos(th),-Math.sin(th)],n=[Math.sin(th),Math.cos(th)*-1];const nv=[-Math.sin(th),-Math.cos(th)];
 const P=(k,d)=>[bx+u[0]*k+nv[0]*d,by+u[1]*k+nv[1]*d];const c=P(0,14);
 FIG.phys_incline={cap:'Tilt the axes along the slope: mg splits into mg sin θ down the slope and mg cos θ into the surface; N balances mg cos θ.',svg:svg(`<path d="M${ax} ${ay} L${ax+L} ${ay} L${ax+L} ${ay-L*Math.tan(th)}Z" class="fwedge"/>`+`<rect x="-16" y="-14" width="32" height="28" transform="translate(${c[0].toFixed(1)} ${c[1].toFixed(1)}) rotate(-30)" class="fblock"/>`+arrow(c[0],c[1],c[0],c[1]+60,'fl','mg',6,0)+arrow(c[0],c[1],c[0]+nv[0]*55,c[1]+nv[1]*55,'fc','N',4,-2)+arrow(c[0],c[1],c[0]-u[0]*50,c[1]-u[1]*50,'fd','mg sin θ',-56,14)+arrow(c[0],c[1],c[0]-nv[0]*40,c[1]-nv[1]*40,'fd','mg cos θ',4,14)+arrow(c[0]+u[0]*8,c[1]+u[1]*8,c[0]+u[0]*48,c[1]+u[1]*48,'fcl2','f',4,-4)+tx(ax+40,ay-6,'θ','start','fs'),200,'Free-body diagram on an incline')}}
})();
