// ===== math helpers =====
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const mod=(a,m)=>((a%m)+m)%m;
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a};
function egcd(a,b){if(b===0)return[a,1,0];const[g,x,y]=egcd(b,a%b);return[g,y,x-Math.floor(a/b)*y]}
function inv(a,m){a=mod(a,m);if(m===1)return 0;const[g,x]=egcd(a,m);return g===1?mod(x,m):null}
function powmod(b,e,m){let r=1%m;b=mod(b,m);while(e>0){if(e&1)r=r*b%m;b=b*b%m;e=Math.floor(e/2)}return r}

// ===== html helpers =====
const C=x=>`<span class="cl">[${x}]</span>`;
const Z=m=>`ℤ<sub>${m}</sub>`;
const MOD=m=>`(mod ${m})`;
const P=(b,e)=>`${b}<sup>${e}</sup>`;
const INV=x=>`${C(x)}<sup>−1</sup>`;
const pm=k=>k<0?`− ${-k}`:`+ ${k}`;
const par=x=>x<0?`(${x})`:`${x}`;

function buildOptions(correctKey,correctHtml,cands,fill){
  const seen=new Set([String(correctKey)]);const out=[{key:String(correctKey),html:correctHtml}];
  for(const c of cands){if(out.length>=4)break;if(!c)continue;const[k,h]=c;if(k==null||seen.has(String(k)))continue;seen.add(String(k));out.push({key:String(k),html:h})}
  let g=0;while(out.length<4&&g++<300){const[k,h]=fill();if(seen.has(String(k)))continue;seen.add(String(k));out.push({key:String(k),html:h})}
  return shuffle(out);
}
const numOpts=(ans,m,cands,fmt)=>buildOptions(ans,fmt(ans),cands.filter(v=>v!=null&&v>=0&&v<m).map(v=>[v,fmt(v)]),()=>{const v=R(0,m-1);return[v,fmt(v)]});

// x^s mod p with shown work
function powWork(r,s,p){
  if(s===0)return `${P(r,0)} = 1`;
  if(s===1)return `${P(r,1)} = ${r}`;
  if(s<=6){const parts=[];let v=1;for(let k=1;k<=s;k++){v=v*r%p;parts.push(`${P(r,k)} ≡ ${v}`)}return parts.join(', ')}
  const sq=[];let v=r%p,k=1;while(k<=s){sq.push([k,v]);v=v*v%p;k*=2}
  const used=sq.filter(([k])=>s&k);
  const ans=powmod(r,s,p);
  return `squaring: ${sq.map(([k,v])=>`${P(r,k)} ≡ ${v}`).join(', ')}. Since ${s} = ${used.map(([k])=>k).reverse().join(' + ')}, ${P(r,s)} ≡ ${used.map(([,v])=>v).reverse().join('·')} ≡ ${ans}`;
}

