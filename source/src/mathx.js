// =====================================================================
// Math engine for the workspace: parse (calculator syntax or LaTeX), evaluate,
// render to HTML and LaTeX, check that two steps agree, find roots, plot.
// No eval: everything goes through this parser.
// =====================================================================
const MX_FN={sin:Math.sin,cos:Math.cos,tan:Math.tan,sec:x=>1/Math.cos(x),csc:x=>1/Math.sin(x),cot:x=>1/Math.tan(x),asin:Math.asin,acos:Math.acos,atan:Math.atan,arcsin:Math.asin,arccos:Math.acos,arctan:Math.atan,sinh:Math.sinh,cosh:Math.cosh,tanh:Math.tanh,ln:Math.log,log:Math.log10,exp:Math.exp,sqrt:Math.sqrt,abs:Math.abs,floor:Math.floor,ceil:Math.ceil};
const MX_CONST={pi:Math.PI,e:Math.E};
const MX_GREEK={alpha:'α',beta:'β',gamma:'γ',delta:'δ',theta:'θ',lambda:'λ',mu:'μ',sigma:'σ',omega:'ω',phi:'φ',tau:'τ',rho:'ρ'};
const MX_NAMES=Object.keys(MX_FN).concat(Object.keys(MX_GREEK),['pi']).sort((a,b)=>b.length-a.length);

// LaTeX and Unicode to calculator syntax
function mxPre(s){s=String(s);
 const grab=(str,i)=>{if(str[i]!=='{'){const m=str.slice(i).match(/^\s*(\\[a-zA-Z]+|.)/);return m?[m[1],i+m[0].length]:['',i]}let d=0,j=i;for(;j<str.length;j++){if(str[j]==='{')d++;else if(str[j]==='}'){d--;if(!d)break}}return[str.slice(i+1,j),j+1]};
 let guard=0;while(/\\[dt]?frac/.test(s)&&guard++<50){const i=s.search(/\\[dt]?frac/);const k=s.indexOf('frac',i)+4;const[a,j]=grab(s,k);const[b,l]=grab(s,j);s=s.slice(0,i)+`((${a})/(${b}))`+s.slice(l)}
 guard=0;while(/\\sqrt/.test(s)&&guard++<50){const i=s.indexOf('\\sqrt');let k=i+5,n=null;if(s[k]==='['){const c=s.indexOf(']',k);n=s.slice(k+1,c);k=c+1}const[a,j]=grab(s,k);s=s.slice(0,i)+(n?`((${a})^(1/(${n})))`:`sqrt(${a})`)+s.slice(j)}
 s=s.replace(/\\left|\\right|\\,|\\;|\\!|\\ /g,'').replace(/\\cdot|\\times/g,'*').replace(/\\div/g,'/').replace(/\\operatorname\{([a-z]+)\}/g,'$1').replace(/\\(arcsin|arccos|arctan|sinh|cosh|tanh|sin|cos|tan|sec|csc|cot|ln|log|exp|pi|alpha|beta|gamma|delta|theta|lambda|mu|sigma|omega|phi|tau|rho)\b/g,'$1 ').replace(/\\infty/g,'∞').replace(/[{]/g,'(').replace(/[}]/g,')');
 s=s.replace(/[×·∙]/g,'*').replace(/÷/g,'/').replace(/[−–]/g,'-').replace(/π/g,'pi').replace(/√/g,'sqrt').replace(/²/g,'^2').replace(/³/g,'^3').replace(/\*\*/g,'^').replace(/θ/g,'theta').replace(/α/g,'alpha').replace(/β/g,'beta').replace(/λ/g,'lambda').replace(/ω/g,'omega').replace(/μ/g,'mu');
 return s}

function mxTok(s){const t=[];let i=0;while(i<s.length){const c=s[i];if(/\s/.test(c)){i++;continue}
 const n=s.slice(i).match(/^(\d+\.?\d*|\.\d+)/);if(n){t.push({t:'n',v:+n[1],s:n[1]});i+=n[1].length;continue}
 if(/[a-zA-Z]/.test(c)){const rest=s.slice(i);const nm=MX_NAMES.find(w=>rest.startsWith(w));if(nm){t.push(MX_FN[nm]?{t:'f',v:nm}:nm==='pi'?{t:'c',v:'pi'}:{t:'v',v:nm});i+=nm.length;continue}
  let v=c;i++;const sub=s.slice(i).match(/^_\(?([a-zA-Z0-9]+)\)?/);if(sub){v+='_'+sub[1];i+=sub[0].length}t.push(v==='e'?{t:'c',v:'e'}:{t:'v',v});continue}
 if('+-*/^()|!,'.includes(c)){t.push({t:c});i++;continue}
 if(c==='≡')throw new Error('Add the modulus, like 3x ≡ 6 (mod 9)');
 if(c==='∞')throw new Error('Infinity can’t be evaluated. Use a large number instead.');
 throw new Error(`I can’t read “${c}”`)}return t}

function mxParse(src){const T=mxTok(mxPre(src));let p=0,absD=0;const pk=()=>T[p],eat=t=>{if(!T[p]||T[p].t!==t)throw new Error(t===')'?'A bracket isn’t closed':`Expected “${t}”`);return T[p++]};
 const startsPrimary=k=>k&&(k.t==='n'||k.t==='v'||k.t==='c'||k.t==='f'||k.t==='('||(k.t==='|'&&absD===0));
 function expr(){let a=term();while(pk()&&(pk().t==='+'||pk().t==='-')){const o=T[p++].t;a={k:'b',o,a,b:term()}}return a}
 function term(){let a=unary();for(;;){const k=pk();if(k&&(k.t==='*'||k.t==='/')){p++;a={k:'b',o:k.t,a,b:unary()}}else if(startsPrimary(k)){a={k:'b',o:'*',a,b:power(),im:true}}else break}return a}
 function unary(){const k=pk();if(k&&k.t==='-'){p++;return{k:'neg',a:unary()}}if(k&&k.t==='+'){p++;return unary()}return power()}
 function power(){const b=postfix();if(pk()&&pk().t==='^'){p++;return{k:'b',o:'^',a:b,b:unary()}}return b}
 function postfix(){let a=primary();while(pk()&&pk().t==='!'){p++;a={k:'fact',a}}return a}
 function primary(){const k=T[p++];if(!k)throw new Error('The line ends too early');
  if(k.t==='n')return{k:'n',v:k.v,s:k.s};if(k.t==='c')return{k:'c',v:k.v};if(k.t==='v')return{k:'v',v:k.v};
  if(k.t==='('){const e=expr();eat(')');return{k:'p',a:e}}
  if(k.t==='|'){absD++;const e=expr();absD--;eat('|');return{k:'f',f:'abs',a:e}}
  if(k.t==='f'){let ex=null;if(pk()&&pk().t==='^'){p++;ex=postfix()}let a;if(pk()&&pk().t==='('){p++;a=expr();eat(')')}else{if(!startsPrimary(pk()))throw new Error(`${k.v} needs something to act on`);a=power()}const c={k:'f',f:k.v,a};return ex?{k:'b',o:'^',a:c,b:ex}:c}
  throw new Error(k.t===')'?'There’s an extra closing bracket':`Unexpected “${k.t}”`)}
 if(!T.length)throw new Error('Empty');const e=expr();if(p<T.length)throw new Error(T[p].t===')'?'There’s an extra closing bracket':`Unexpected “${T[p].t==='v'?T[p].v:T[p].t}”`);return e}

function mxEval(n,env){switch(n.k){case'n':return n.v;case'c':return MX_CONST[n.v];case'v':return n.v in env?env[n.v]:NaN;case'p':return mxEval(n.a,env);case'neg':return-mxEval(n.a,env);
 case'fact':{const v=mxEval(n.a,env);if(v<0||v>170||Math.abs(v-Math.round(v))>1e-9)return NaN;let r=1;for(let i=2;i<=Math.round(v);i++)r*=i;return r}
 case'f':return MX_FN[n.f](mxEval(n.a,env));
 case'b':{const a=mxEval(n.a,env),b=mxEval(n.b,env);switch(n.o){case'+':return a+b;case'-':return a-b;case'*':return a*b;case'/':return a/b;case'^':{if(a<0&&Math.abs(b-Math.round(b))>1e-12){const q=1/b,qi=Math.round(q);if(Math.abs(q-qi)<1e-9&&qi%2)return-Math.pow(-a,b);return NaN}return Math.pow(a,b)}}}}return NaN}
function mxVars(n,s=new Set()){if(n.k==='v')s.add(n.v);for(const c of['a','b'])if(n[c])mxVars(n[c],s);return s}

// ---- rendering ----
const MX_PREC={'+':1,'-':1,'*':2,'/':2,'neg':3,'^':4};
const mxVarH=v=>{const[b,sub]=v.split('_');return`<i>${MX_GREEK[b]||b}</i>${sub?`<sub>${sub}</sub>`:''}`};
function mxHtml(n,ctx=0){const wrap=(s,need)=>need?`(${s})`:s;switch(n.k){
 case'n':return(n.s||String(n.v)).replace('-','−');case'c':return n.v==='pi'?'π':'<i>e</i>';case'v':return mxVarH(n.v);
 case'p':return n.a.k==='b'&&n.a.o==='/'&&ctx===0?mxHtml(n.a,0):`(${mxHtml(n.a,0)})`;
 case'neg':return wrap('−'+mxHtml(n.a,3),ctx>3);
 case'fact':return mxHtml(n.a,9)+'!';
 case'f':return n.f==='sqrt'?`<span class="mx-sq">√<span class="mx-rad">${mxHtml(n.a,0)}</span></span>`:n.f==='abs'?`|${mxHtml(n.a,0)}|`:`${n.f.replace(/^arc/,'arc')} ${n.a.k==='v'||n.a.k==='n'||n.a.k==='c'?mxHtml(n.a,9):`(${mxHtml(n.a.k==='p'?n.a.a:n.a,0)})`}`;
 case'b':{const pr=MX_PREC[n.o];
  if(n.o==='/')return`<span class="mx-fr"><span>${mxHtml(un(n.a),0)}</span><span>${mxHtml(un(n.b),0)}</span></span>`;
  if(n.o==='^')return wrap(`${mxHtml(n.a,5)}<sup>${mxHtml(un(n.b),0)}</sup>`,ctx>4);
  if(n.o==='*'){const juxt=mxJuxt(n);return wrap(mxHtml(n.a,2)+(juxt?'':' · ')+mxHtml(n.b,2.5),ctx>2)}
  return wrap(`${mxHtml(n.a,pr)} ${n.o==='-'?'−':'+'} ${mxHtml(n.b,pr+.5)}`,ctx>pr)}}return''}
const un=n=>n.k==='p'?n.a:n;
const mxJuxt=n=>n.im||(n.a.k==='n'&&(n.b.k==='v'||n.b.k==='c'||n.b.k==='f'||n.b.k==='p'||(n.b.k==='b'&&n.b.o==='^'&&n.b.a.k!=='n')));
function mxTex(n,ctx=0){const wrap=(s,need)=>need?`\\left(${s}\\right)`:s;switch(n.k){
 case'n':return n.s||String(n.v);case'c':return n.v==='pi'?'\\pi':'e';case'v':{const[b,s]=n.v.split('_');return(MX_GREEK[b]?'\\'+b:b)+(s?`_{${s}}`:'')}
 case'p':return n.a.k==='b'&&n.a.o==='/'?mxTex(n.a,0):wrap(mxTex(n.a,0),true);case'neg':return wrap('-'+mxTex(n.a,3),ctx>3);case'fact':return mxTex(n.a,9)+'!';
 case'f':return n.f==='sqrt'?`\\sqrt{${mxTex(un(n.a),0)}}`:n.f==='abs'?`\\left|${mxTex(un(n.a),0)}\\right|`:['sec','csc','cot','sin','cos','tan','ln','log','exp','sinh','cosh','tanh','arcsin','arccos','arctan'].includes(n.f)?`\\${n.f}${n.a.k==='p'?mxTex(n.a):`\\left(${mxTex(n.a,0)}\\right)`}`:`\\operatorname{${n.f}}\\left(${mxTex(un(n.a),0)}\\right)`;
 case'b':{const pr=MX_PREC[n.o];if(n.o==='/')return`\\frac{${mxTex(un(n.a),0)}}{${mxTex(un(n.b),0)}}`;if(n.o==='^')return wrap(`${mxTex(n.a,5)}^{${mxTex(un(n.b),0)}}`,ctx>4);
  if(n.o==='*')return wrap(mxTex(n.a,2)+(mxJuxt(n)?' ':' \\cdot ')+mxTex(n.b,2.5),ctx>2);return wrap(`${mxTex(n.a,pr)} ${n.o} ${mxTex(n.b,pr+.5)}`,ctx>pr)}}return''}

// ---- a line: expression, equation or inequality ----
function mxLine(src){const raw=String(src).trim();if(!raw)return null;
 {const c=mxCongParse(raw.replace(/\\equiv/g,'≡').replace(/\\pmod\{([^}]+)\}/g,'(mod $1)'));if(c){c.src=raw;return c}}
 const dd=raw.match(/^\s*d\s*\/\s*d([a-z])\s*(.+)$/);if(dd){const inner=mxParse(dd[2]);return{kind:'expr',E:mxDiff(inner,dd[1]),dOf:inner,dv:dd[1],vars:mxVars(inner),src:raw,label:null,isD:true}}
 let s=mxPre(raw);let label=null;
 const fx=s.match(/^\s*([a-zA-Z])\s*\(\s*([a-z])\s*\)\s*=(.*)$/);if(fx){label=`${fx[1]}(${fx[2]})`;s=fx[3]}
 const rel=s.match(/<=|>=|≤|≥|=|<|>/);
 if(rel&&!fx){const i=rel.index,op=rel[0].replace('<=','≤').replace('>=','≥');const L=mxParse(s.slice(0,i)),R=mxParse(s.slice(i+rel[0].length));if(/[=<>≤≥]/.test(s.slice(i+rel[0].length)))throw new Error('Use one = per line');return{kind:op==='='?'eq':'ineq',op,L,R,vars:new Set([...mxVars(L),...mxVars(R)]),src:raw,label:L.k==='v'&&L.v==='y'?'y':null}}
 const E=mxParse(s);return{kind:'expr',E,vars:mxVars(E),src:raw,label}}
function mxLineHtml(l){if(l.kind==='cong')return`${mxHtml(l.L)} ≡ ${mxHtml(l.R)} (mod ${l.n})`;if(l.isD)return`<span class="mx-fr"><span>d</span><span>d<i>${l.dv}</i></span></span>[${mxHtml(l.dOf)}]`;if(l.kind==='expr')return(l.label?`${l.label.replace(/^(\w)\((\w)\)$/,'<i>$1</i>(<i>$2</i>)')} = `:'')+mxHtml(l.E);return`${mxHtml(l.L)} ${l.op==='≤'||l.op==='≥'?l.op:l.op} ${mxHtml(l.R)}`}
function mxLineTex(l){if(l.kind==='cong')return`${mxTex(l.L)} \\equiv ${mxTex(l.R)} \\pmod{${l.n}}`;if(l.isD)return`\\frac{d}{d${l.dv}}\\left[${mxTex(l.dOf)}\\right]`;if(l.kind==='expr')return(l.label?`${l.label} = `:'')+mxTex(l.E);return`${mxTex(l.L)} ${{'=':'=','<':'<','>':'>','≤':'\\le','≥':'\\ge'}[l.op]} ${mxTex(l.R)}`}
// function of x for plotting, if the line is one
function mxPlotFn(l){if(!l)return null;let E=null;if(l.kind==='expr')E=l.E;else if(l.kind==='eq'&&l.L.k==='v'&&l.L.v==='y'&&!mxVars(l.R).has('y'))E=l.R;if(!E)return null;const vs=[...mxVars(E)];if(vs.some(v=>v!=='x'))return null;if(!vs.length&&l.kind==='expr'&&!l.label)return null;return x=>mxEval(E,{x})}

// ---- step checking ----
const mxClose=(a,b)=>Math.abs(a-b)<=1e-7*(1+Math.abs(a)+Math.abs(b));
const mxFmt=v=>!isFinite(v)?'undefined':Math.abs(v)>=1e6||(Math.abs(v)<1e-4&&v!==0)?v.toExponential(3):String(+v.toFixed(6));
function mxSamples(vars,n){const out=[];const r=()=>{const u=Math.random();return u<.5?(Math.random()*6-3):(Math.random()*4+.05)};for(let i=0;i<n;i++){const e={};vars.forEach(v=>e[v]=+r().toFixed(4));out.push(e)}return out}
function mxRoots(h,lo=-10,hi=10){const N=4000,dx=(hi-lo)/N,rs=[];let px=lo,py=h(lo);const add=x=>{if(!rs.some(r=>Math.abs(r-x)<1e-6))rs.push(x)};
 for(let i=1;i<=N;i++){const x=lo+i*dx,y=h(x);if(isFinite(py)&&Math.abs(py)<1e-12)add(px);
  if(isFinite(py)&&isFinite(y)&&py*y<0){let a=px,b=x,fa=py;for(let k=0;k<80;k++){const m=(a+b)/2,fm=h(m);if(!isFinite(fm))break;if(fa*fm<=0)b=m;else{a=m;fa=fm}}const m=(a+b)/2;if(Math.abs(h(m))<1e-6*(1+Math.abs(py)+Math.abs(y)))add(m)}
  px=x;py=y}
 // touching roots (like x² = 0): local minimum of |h| near zero
 for(let i=1;i<N;i++){const x=lo+i*dx,a=Math.abs(h(x-dx)),b=Math.abs(h(x)),c=Math.abs(h(x+dx));if(b<=a&&b<=c&&b<1e-3){let L=x-dx,R=x+dx;for(let k=0;k<60;k++){const m1=L+(R-L)/3,m2=R-(R-L)/3;if(Math.abs(h(m1))<Math.abs(h(m2)))R=m2;else L=m1}const m=(L+R)/2;if(Math.abs(h(m))<1e-9)add(m)}}
 return rs.sort((a,b)=>a-b)}
// Compare consecutive lines. Returns {s:'ok'|'bad'|'unk', msg}
function mxCheck(A,B){if(!A||!B)return null;if(A.kind==='cong'&&B.kind==='cong')return mxCongCheck(A,B);if(A.kind==='cong'||B.kind==='cong')return null;
 if(A.kind==='expr'&&B.kind==='expr'){const vs=[...new Set([...A.vars,...B.vars])];let ok=0,dom=0;
  for(const e of mxSamples(vs,40)){const a=mxEval(A.E,e),b=mxEval(B.E,e);if(isFinite(a)&&isFinite(b)){if(!mxClose(a,b))return{s:'bad',msg:`Not equal: ${vs.length?`at ${vs.map(v=>`${v.replace('_','')} = ${e[v]}`).join(', ')}, `:''}the line above is ${mxFmt(a)} but this one is ${mxFmt(b)}`};ok++}else if(isFinite(a)!==isFinite(b))dom++}
  if(ok<6)return{s:'unk',msg:'Couldn’t check: too few values where both lines are defined'};return{s:'ok',msg:dom?'Equal wherever both are defined (one line is defined in places the other isn’t)':'Equal for every value tested'}}
 if(A.kind==='eq'&&B.kind==='eq'){const vs=[...new Set([...A.vars,...B.vars])];
  if(vs.length===0){const ta=mxClose(mxEval(A.L,{}),mxEval(A.R,{})),tb=mxClose(mxEval(B.L,{}),mxEval(B.R,{}));return tb?{s:'ok',msg:'True'}:{s:'bad',msg:`False: the left side is ${mxFmt(mxEval(B.L,{}))}, the right side is ${mxFmt(mxEval(B.R,{}))}`}}
  if(vs.length>1)return{s:'unk',msg:'Step checks for equations work with one variable'};const v=vs[0];
  const ha=x=>mxEval(A.L,{[v]:x})-mxEval(A.R,{[v]:x}),hb=x=>mxEval(B.L,{[v]:x})-mxEval(B.R,{[v]:x});
  const idA=mxSamples([v],30).every(e=>{const y=ha(e[v]);return!isFinite(y)||Math.abs(y)<1e-9}),idB=mxSamples([v],30).every(e=>{const y=hb(e[v]);return!isFinite(y)||Math.abs(y)<1e-9});
  if(idA||idB)return idA&&idB?{s:'ok',msg:'Both are true for every value'}:{s:'bad',msg:idB?`This line is true for every ${v}, but the line above isn’t`:`The line above is true for every ${v}, this one isn’t`};
  const ra=mxRoots(ha),rb=mxRoots(hb);const lost=ra.filter(r=>!rb.some(q=>Math.abs(q-r)<1e-5)),extra=rb.filter(r=>!ra.some(q=>Math.abs(q-r)<1e-5));
  const f=rs=>rs.slice(0,4).map(r=>`${v} ≈ ${mxFmt(+r.toFixed(6))}`).join(', ')+(rs.length>4?'…':'');
  if(!lost.length&&!extra.length)return{s:'ok',msg:ra.length?`Same solutions (${f(ra)}), checked for ${v} between −10 and 10`:`Neither has a solution with ${v} between −10 and 10`};
  return{s:'bad',msg:[lost.length?`Lost solution${lost.length>1?'s':''} ${f(lost)}`:'',extra.length?`gained ${f(extra)}, which doesn’t solve the line above`:''].filter(Boolean).join('; ').replace(/^g/,'G')+'. Did you divide by something that can be 0, or square both sides?'}}
 if(A.kind==='expr'&&B.kind==='eq')return null;
 return{s:'unk',msg:A.kind==='ineq'||B.kind==='ineq'?'Inequality steps aren’t checked yet':null}}

// ---- degrees mode (workspace toggle) ----
let MX_DEG=false;
{const k=Math.PI/180;for(const f of['sin','cos','tan']){const g=Math[f];MX_FN[f]=x=>g(MX_DEG?x*k:x)}MX_FN.sec=x=>1/MX_FN.cos(x);MX_FN.csc=x=>1/MX_FN.sin(x);MX_FN.cot=x=>1/MX_FN.tan(x);
 for(const[f,g]of[['asin',Math.asin],['acos',Math.acos],['atan',Math.atan]]){MX_FN[f]=x=>MX_DEG?g(x)/k:g(x);MX_FN['arc'+f.slice(1)]=MX_FN[f]}}

// ---- symbolic derivative with light simplification ----
const mN=v=>({k:'n',v,s:String(v)}),mB=(o,a,b)=>({k:'b',o,a,b}),mF=(f,a)=>({k:'f',f,a});
function mxSimp(n){if(!n)return n;if(n.k==='p')return mxSimp(n.a);if(n.k==='neg'){const a=mxSimp(n.a);if(a.k==='n')return mN(-a.v);if(a.k==='neg')return a.a;return{k:'neg',a}}
 if(n.k==='f')return mF(n.f,mxSimp(n.a));if(n.k==='fact')return{k:'fact',a:mxSimp(n.a)};if(n.k!=='b')return n;
 const a=mxSimp(n.a),b=mxSimp(n.b),isN=(x,v)=>x.k==='n'&&x.v===v;
 if(a.k==='n'&&b.k==='n'&&n.o!=='/'&&n.o!=='^'){const v=n.o==='+'?a.v+b.v:n.o==='-'?a.v-b.v:a.v*b.v;return v<0?{k:'neg',a:mN(-v)}:mN(v)}
 switch(n.o){case'+':if(isN(a,0))return b;if(isN(b,0))return a;if(b.k==='neg')return mB('-',a,b.a);break;
  case'-':if(isN(b,0))return a;if(isN(a,0))return mxSimp({k:'neg',a:b});if(b.k==='neg')return mB('+',a,b.a);break;
  case'*':if(isN(a,0)||isN(b,0))return mN(0);if(isN(a,1))return b;if(isN(b,1))return a;if(isN(a,-1))return{k:'neg',a:b};if(a.k==='neg')return mxSimp({k:'neg',a:mB('*',a.a,b)});if(b.k==='neg')return mxSimp({k:'neg',a:mB('*',a,b.a)});if(b.k==='n'&&a.k!=='n')return mB('*',b,a);if(a.k==='n'&&b.k==='b'&&b.o==='*'&&b.a.k==='n')return mB('*',mN(a.v*b.a.v),b.b);break;
  case'/':if(isN(a,0))return mN(0);if(isN(b,1))return a;break;
  case'^':if(isN(b,0))return mN(1);if(isN(b,1))return a;break}
 return mB(n.o,a,b)}
function mxD(n,v){const d=x=>mxD(x,v),has=x=>mxVars(x).has(v);if(!has(n))return mN(0);switch(n.k){
 case'v':return mN(1);case'p':return d(n.a);case'neg':return{k:'neg',a:d(n.a)};
 case'b':{const{a,b}=n;switch(n.o){case'+':case'-':return mB(n.o,d(a),d(b));
  case'*':return!has(a)?mB('*',a,d(b)):!has(b)?mB('*',b,d(a)):mB('+',mB('*',d(a),b),mB('*',a,d(b)));
  case'/':return!has(b)?mB('/',d(a),b):mB('/',mB('-',mB('*',d(a),b),mB('*',a,d(b))),mB('^',b,mN(2)));
  case'^':if(!has(b))return mB('*',mB('*',b,mB('^',a,mxSimp(mB('-',b,mN(1))))),d(a));if(!has(a))return a.k==='c'&&a.v==='e'?mB('*',n,d(b)):mB('*',mB('*',n,mF('ln',a)),d(b));
   return mB('*',n,d(mB('*',b,mF('ln',a))))}}
 case'f':{const a=n.a,da=d(a);const ch=x=>mB('*',x,da);switch(n.f){case'sin':return ch(mF('cos',a));case'cos':return ch({k:'neg',a:mF('sin',a)});case'tan':return ch(mB('^',mF('sec',a),mN(2)));
  case'sec':return ch(mB('*',mF('sec',a),mF('tan',a)));case'csc':return ch({k:'neg',a:mB('*',mF('csc',a),mF('cot',a))});case'cot':return ch({k:'neg',a:mB('^',mF('csc',a),mN(2))});
  case'ln':return mB('/',da,a);case'log':return mB('/',da,mB('*',a,mF('ln',mN(10))));case'exp':return ch(n);case'sqrt':return mB('/',da,mB('*',mN(2),n));
  case'asin':case'arcsin':return mB('/',da,mF('sqrt',mB('-',mN(1),mB('^',a,mN(2)))));case'acos':case'arccos':return{k:'neg',a:mB('/',da,mF('sqrt',mB('-',mN(1),mB('^',a,mN(2)))))};case'atan':case'arctan':return mB('/',da,mB('+',mN(1),mB('^',a,mN(2))));
  case'sinh':return ch(mF('cosh',a));case'cosh':return ch(mF('sinh',a));case'tanh':return ch(mB('^',mF('sech',a),mN(2)));case'abs':return ch(mB('/',a,n))}}}
 throw new Error('Can’t differentiate that')}
MX_FN.sech=x=>1/Math.cosh(x);
function mxDiff(E,v='x'){let r=mxD(E,v);for(let i=0;i<4;i++)r=mxSimp(r);return r}

// ---- congruences: A ≡ B (mod n), solved over residues with exact integer arithmetic ----
const gcdI=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a};
const modP=(a,n)=>((a%n)+n)%n;
function modInv(a,n){let[o,r]=[modP(a,n),n],[s0,s1]=[1,0];while(r){const q=Math.floor(o/r);[o,r]=[r,o-q*r];[s0,s1]=[s1,s0-q*s1]}return o===1?modP(s0,n):null}
function modPow(b,e,n){let r=1%n;b=modP(b,n);while(e>0){if(e&1)r=r*b%n;b=b*b%n;e=Math.floor(e/2)}return r}
// returns residue or {inv:true} when a division by a non-invertible number happens
function mxModEval(n,env,m){const ev=x=>mxModEval(x,env,m);switch(n.k){case'n':if(!Number.isInteger(n.v))throw{bad:'Congruences only work with whole numbers'};return modP(n.v,m);
 case'v':if(!(n.v in env))throw{bad:'Unknown letter'};return modP(env[n.v],m);case'p':return ev(n.a);case'neg':return modP(-ev(n.a),m);
 case'b':{if(n.o==='^'){const e=mxEval(n.b,{});if(!Number.isInteger(e)||e<0)throw{bad:'Exponents in a congruence must be whole numbers ≥ 0'};return modPow(ev(n.a),e,m)}const a=ev(n.a),b=ev(n.b);
  if(n.o==='+')return(a+b)%m;if(n.o==='-')return modP(a-b,m);if(n.o==='*')return a*b%m;if(n.o==='/'){const iv=modInv(b,m);if(iv==null)throw{div:b};return a*iv%m}}}
 throw{bad:'Only +, −, ×, powers and whole numbers work in a congruence'}}
function mxCongParse(s){const m=s.match(/^(.*?)(?:≡|\\equiv|===)(.*?)(?:\(\s*mod\s*([^)]+)\)|\\pmod\{([^}]+)\}|\bmod\s*(.+))\s*$/i);if(!m)return null;
 const n=mxEval(mxParse(m[3]||m[4]||m[5]),{});if(!Number.isInteger(n)||n<2)throw new Error('The modulus must be a whole number of at least 2');if(n>100000)throw new Error('Modulus too large to check');
 const L=mxParse(m[1]),R=mxParse(m[2]);return{kind:'cong',L,R,n,vars:new Set([...mxVars(L),...mxVars(R)])}}
function mxCongSet(c,M){const vs=[...c.vars];if(vs.length>1)throw{bad:'Step checks for congruences work with one variable'};const v=vs[0];const out=[];
 if(!v){try{return modP(mxModEval(c.L,{},c.n)-mxModEval(c.R,{},c.n),c.n)===0?'all':[]}catch(e){throw e}}
 for(let x=0;x<M;x++){if(modP(mxModEval(c.L,{[v]:x},c.n)-mxModEval(c.R,{[v]:x},c.n),c.n)===0)out.push(x)}return out}
function mxCongCheck(A,B){const M=A.n*B.n/gcdI(A.n,B.n);if(M>200000)return{s:'unk',msg:'Moduli too large to compare'};let a,b;
 try{a=mxCongSet(A,M)}catch(e){return{s:'unk',msg:e.bad||'Couldn’t check the line above'}}
 try{b=mxCongSet(B,M)}catch(e){if(e.div!=null)return{s:'bad',msg:`You divided by ${e.div}, which has no inverse modulo ${B.n} because gcd(${e.div}, ${B.n}) = ${gcdI(e.div,B.n)}. Division mod n only works by numbers coprime to n.`,hint:`To cancel a common factor c from both sides, divide the modulus by gcd(c, n) as well.`};return{s:'unk',msg:e.bad||'Couldn’t check this line'}}
 const v=[...B.vars][0]||[...A.vars][0]||'x';const fmt=(xs,n)=>{const r=[...new Set(xs.map(x=>x%n))].sort((p,q)=>p-q);return`${v} ≡ ${r.slice(0,6).join(', ')}${r.length>6?'…':''} (mod ${n})`};
 if(a==='all'||b==='all')return a===b?{s:'ok',msg:'Both are true'}:{s:'bad',msg:b==='all'?'This line is always true, the line above isn’t':'This line is false'};
 const lost=a.filter(x=>!b.includes(x)),extra=b.filter(x=>!a.includes(x));
 if(!lost.length&&!extra.length)return{s:'ok',msg:a.length?`Same solutions: ${fmt(a,M)}`:'Neither has a solution'};
 const g=A.n!==B.n?gcdI(A.n,B.n):0;
 if(lost.length&&!extra.length)return{s:'bad',msg:`Lost solutions: ${fmt(lost,M)} solve the line above but not this one.`,hint:(()=>{const L=A.L.k==='p'?A.L.a:A.L;const c=L.k==='b'&&L.o==='*'&&L.a.k==='n'?L.a.v:0;return c&&gcdI(c,A.n)>1&&B.n===A.n?`You cancelled ${c}, but gcd(${c}, ${A.n}) = ${gcdI(c,A.n)}, so the modulus must become ${A.n} / ${gcdI(c,A.n)} = ${A.n/gcdI(c,A.n)}.`:''})()};
 if(extra.length&&!lost.length)return{s:'bad',msg:`Extra solutions: ${fmt(extra,M)} solve this line but not the line above.`,hint:B.n<A.n?`Reducing the modulus from ${A.n} to ${B.n} is only valid when you also cancel the matching factor from both sides.`:''};
 return{s:'bad',msg:`Different solution sets: the line above has ${fmt(a,M)}, this line has ${fmt(b,M)}.`}}
