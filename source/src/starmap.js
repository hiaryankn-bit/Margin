// =====================================================================
// Star map: every topic of a course as a star. Size = estimated mastery,
// colour = status, lines = prerequisite links. Tap a star to light up what it
// requires and what builds on it.
// =====================================================================
const SM={sel:null,labels:null,view:null,lay:{},drag:null};
const SM_W=520,SM_H=540;
function smLayout(cid){if(SM.lay[cid])return SM.lay[cid];const C=CREG[cid];const ns=allNodes(cid);const P=PRE();const rnd=seededRandom(cid.split('').reduce((a,c)=>a*31+c.charCodeAt(0),7));
 const nw=C.worlds.length;const pos={};const cen={};
 C.worlds.forEach((w,i)=>{const a=-Math.PI/2+i/nw*Math.PI*2;cen[w.key]=[SM_W/2+Math.cos(a)*175,SM_H/2+Math.sin(a)*170];w.nodes.forEach((n,j)=>{const b=j/w.nodes.length*Math.PI*2+rnd()*.6;pos[n.key]=[cen[w.key][0]+Math.cos(b)*(20+rnd()*22),cen[w.key][1]+Math.sin(b)*(20+rnd()*22)]})});
 const E=[];for(const n of ns)for(const p of(P[n.key]||[]))if(pos[p])E.push([p,n.key]);const ks=ns.map(n=>n.key);
 for(let it=0;it<320;it++){const F={};ks.forEach(k=>F[k]=[0,0]);const cool=1-it/360;
  for(let i=0;i<ks.length;i++)for(let j=i+1;j<ks.length;j++){const a=pos[ks[i]],b=pos[ks[j]];let dx=a[0]-b[0],dy=a[1]-b[1];const d2=Math.max(36,dx*dx+dy*dy),d=Math.sqrt(d2);const f=1500/d2;F[ks[i]][0]+=dx/d*f;F[ks[i]][1]+=dy/d*f;F[ks[j]][0]-=dx/d*f;F[ks[j]][1]-=dy/d*f}
  for(const[u,v]of E){const a=pos[u],b=pos[v];const dx=b[0]-a[0],dy=b[1]-a[1],d=Math.hypot(dx,dy)||1;const f=(d-62)*.02;F[u][0]+=dx/d*f;F[u][1]+=dy/d*f;F[v][0]-=dx/d*f;F[v][1]-=dy/d*f}
  for(const n of ns){const c=cen[n.world.key],p=pos[n.key];F[n.key][0]+=(c[0]-p[0])*.012;F[n.key][1]+=(c[1]-p[1])*.012}
  for(const k of ks){const p=pos[k];const m=Math.min(9,Math.hypot(...F[k]))*cool,h=Math.hypot(...F[k])||1;p[0]=Math.max(28,Math.min(SM_W-28,p[0]+F[k][0]/h*m));p[1]=Math.max(28,Math.min(SM_H-28,p[1]+F[k][1]/h*m))}}
 const stars=[...Array(140)].map(()=>[rnd()*SM_W,rnd()*SM_H,rnd()*1.3+.2,rnd()]);
 return SM.lay[cid]={pos,E,cen,stars}}
const SM_COL={mastered:'#ffe7a8',developing:'#9fd8ff',weak:'#ff9a85',new:'#6f7a8c'};
function smHtml(cid){const L=smLayout(cid);const C=CREG[cid];const sel=SM.sel&&REG[SM.sel]&&REG[SM.sel].course.id===cid?SM.sel:null;const V=SM.view||(SM.view={x:0,y:0,w:SM_W,h:SM_H});
 const pre=sel?new Set(PRE()[sel]||[]):new Set(),dep=sel?new Set(dependents(sel)):new Set();const ns=allNodes(cid);
 const M={};ns.forEach(n=>{const m=lpMastery(n.key);M[n.key]={pct:m.n?m.pct:0,n:m.n,st:statusOf(n.key)}});
 const lines=L.E.map(([u,v])=>{const a=L.pos[u],b=L.pos[v];const hl=sel&&(v===sel&&pre.has(u))?'req':sel&&(u===sel&&dep.has(v))?'dep':'';return`<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" class="sm-e ${hl}${sel&&!hl?' dim':''}"/>`}).join('');
 const nebula=C.worlds.map(w=>{const c=L.cen[w.key];return`<text x="${c[0].toFixed(0)}" y="${(c[1]-52).toFixed(0)}" class="sm-ch" text-anchor="middle">${esc(strip(w.title))}</text>`}).join('');
 const stars=L.stars.map(([x,y,r,t])=>`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" class="sm-bg${t>.85?' tw':''}" style="animation-delay:${(t*4).toFixed(2)}s"/>`).join('');
 const nodes=ns.map(n=>{const k=n.key,p=L.pos[k],m=M[k];const r=4+m.pct*.09;const on=sel===k,rel=pre.has(k)||dep.has(k);const dim=sel&&!on&&!rel;const col=SM_COL[m.st];
  return`<g class="sm-n${dim?' dim':''}${on?' on':''}" data-act="smsel" data-id="${k}" tabindex="0" role="button" aria-label="${esc(strip(n.name))}: ${m.n?m.pct+'% mastery':'not started'}">${m.st!=='new'?`<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${(r*2.2).toFixed(1)}" fill="${col}" opacity=".14"/>`:''}<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${r.toFixed(1)}" fill="${m.st==='new'?'transparent':col}" stroke="${col}" stroke-width="${m.st==='new'?1.4:0}"/>${on?`<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${(r+6).toFixed(1)}" fill="none" stroke="#fff" stroke-width="1.2"/>`:''}
  ${(SM.labels??(ns.length<=24||innerWidth>700))||on||rel?`<text x="${(p[0]+r+5).toFixed(1)}" y="${(p[1]+4).toFixed(1)}" class="sm-l${on?' on':''}">${esc(strip(n.name))}</text>`:''}<rect x="${(p[0]-22).toFixed(1)}" y="${(p[1]-22).toFixed(1)}" width="44" height="44" fill="transparent"/></g>`}).join('');
 const st={mastered:0,developing:0,weak:0,new:0};ns.forEach(n=>st[M[n.key].st]++);const avg=Math.round(ns.reduce((s,n)=>s+M[n.key].pct,0)/ns.length);
 const S_=sel?(()=>{const m=lpMastery(sel),R=recallShown(sel),n=REG[sel];return`<div class="sm-sel"><div class="sm-sel-h"><span class="dot" style="background:${SM_COL[M[sel].st]}"></span><div><b>${n.name}</b><small>${esc(n.world.title)} · ${{mastered:'Mastered',developing:'Developing',weak:'Weak',new:'Not started'}[M[sel].st]}${m.n?` · ${m.pct}% mastery (likely ${m.lo}–${m.hi}%)`:''}${R!=null?` · ${Math.round(R*100)}% recall`:''}</small></div></div>
  ${pre.size?`<p><span class="sm-k req"></span>Requires: ${[...pre].map(k=>`<button class="link" data-act="smsel" data-id="${k}">${REG[k].name}</button>`).join(', ')}</p>`:''}${dep.size?`<p><span class="sm-k dep"></span>Builds into: ${[...dep].map(k=>`<button class="link" data-act="smsel" data-id="${k}">${REG[k].name}</button>`).join(', ')}</p>`:''}
  ${M[sel].st==='weak'&&dep.size?`<p class="sm-warn">${dep.size} topic${dep.size>1?'s':''} build on this, so this gap will spread. Fix it first.</p>`:''}
  <div class="gbtns"><button class="btn btn-primary btn-sm" data-act="guided" data-id="${sel}">Guided session</button><button class="btn btn-secondary btn-sm" data-act="topic" data-id="${sel}">Details</button></div></div>`})():`<p class="sm-hint">Tap a star to see what it requires and what builds on it.</p>`;
 return`<div class="sm-card"><div class="sm-top"><div><div class="sm-t">Constellation</div><div class="sm-s">${C.name}: ${avg}% average mastery · ${st.mastered} mastered, ${st.developing} developing, ${st.weak} weak, ${st.new} not started</div></div>
  <button class="sm-tg" data-act="smlab" aria-pressed="${!!(SM.labels??(ns.length<=24||innerWidth>700))}"><i></i>Labels</button></div>
  <div class="sm-svgw"><svg id="smsvg" viewBox="${V.x.toFixed(1)} ${V.y.toFixed(1)} ${V.w.toFixed(1)} ${V.h.toFixed(1)}" role="img" aria-label="Star map of ${C.name} topics"><rect x="-2000" y="-2000" width="5000" height="5000" fill="transparent" data-act="smsel" data-id=""/>${stars}${nebula}${lines}${nodes}</svg>
  <div class="sm-zoom"><button data-act="smzoom" data-id="in" aria-label="Zoom in">+</button><button data-act="smzoom" data-id="out" aria-label="Zoom out">−</button><button data-act="smzoom" data-id="fit" aria-label="Fit">⤢</button></div></div>
  ${S_}
  <div class="sm-leg"><span><i style="background:${SM_COL.mastered}"></i>mastered</span><span><i style="background:${SM_COL.developing}"></i>developing</span><span><i style="background:${SM_COL.weak}"></i>weak</span><span><i class="o" style="border-color:${SM_COL.new}"></i>not started</span><span>star size = mastery</span><span><b class="sm-k req"></b>requires</span><span><b class="sm-k dep"></b>builds into</span></div></div>
 <div class="sec"><div class="sec-h"><h2 class="t-sec">All topics (${ns.length})</h2><span class="link">Tap to find on the map</span></div><div class="group">${C.worlds.map(w=>w.nodes.map(n=>{const m=M[n.key];return`<button class="row sm-row${SM.sel===n.key?' on':''}" data-act="smsel" data-id="${n.key}"><span class="dot" style="background:${m.st==='new'?'transparent':SM_COL[m.st]};box-shadow:inset 0 0 0 1.5px ${SM_COL[m.st]}"></span><span class="main-t"><span class="t">${n.name}</span><span class="s">${esc(w.title)}</span></span><span class="end"><span class="mastery"><span class="pct num" style="display:block">${m.n?m.pct+'%':'–'}</span><span class="bar course"><i style="width:${m.pct}%"></i></span></span></span></button>`}).join('')).join('')}</div></div>`}
function smRender(){const box=$('#smbox');if(box){box.innerHTML=smHtml(S.course);smBind()}else go('courses')}
function smSel(k){SM.sel=k||null;if(k){const p=smLayout(S.course).pos[k];const V=SM.view;if(p&&V&&(p[0]<V.x+40||p[0]>V.x+V.w-40||p[1]<V.y+40||p[1]>V.y+V.h-40)){V.x=p[0]-V.w/2;V.y=p[1]-V.h/2}}smRender();if(k){const svg=$('#smsvg');if(svg&&svg.getBoundingClientRect().top<0)svg.scrollIntoView({block:'center',behavior:'smooth'})}}
function smZoom(z){const V=SM.view||(SM.view={x:0,y:0,w:SM_W,h:SM_H});if(z==='fit'){SM.view={x:0,y:0,w:SM_W,h:SM_H};return smRender()}const k=z==='in'?.7:1/.7;const cx=V.x+V.w/2,cy=V.y+V.h/2;V.w=Math.min(SM_W*1.6,Math.max(160,V.w*k));V.h=V.w*SM_H/SM_W;V.x=cx-V.w/2;V.y=cy-V.h/2;smRender()}
function smBind(){const svg=$('#smsvg');if(!svg)return;svg.onpointerdown=e=>{SM.drag={x:e.clientX,y:e.clientY,v:{...SM.view},moved:false,r:svg.getBoundingClientRect()}};
 svg.onpointermove=e=>{const d=SM.drag;if(!d)return;const dx=e.clientX-d.x,dy=e.clientY-d.y;if(!d.moved&&Math.hypot(dx,dy)<6)return;if(!d.moved){d.moved=true;try{svg.setPointerCapture(e.pointerId)}catch(_){}}const k=d.v.w/d.r.width;SM.view.x=d.v.x-dx*k;SM.view.y=d.v.y-dy*k;svg.setAttribute('viewBox',`${SM.view.x} ${SM.view.y} ${SM.view.w} ${SM.view.h}`)};
 svg.onpointerup=svg.onpointercancel=e=>{const d=SM.drag;SM.drag=null;if(d&&d.moved){e.preventDefault();SM.justDragged=Date.now()}};
 svg.onwheel=e=>{e.preventDefault();smZoom(e.deltaY<0?'in':'out')}}
document.addEventListener('keydown',e=>{const g=e.target.closest&&e.target.closest('.sm-n');if(g&&(e.key==='Enter'||e.key===' ')){e.preventDefault();smSel(g.dataset.id)}});
