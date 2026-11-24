const fs=require('fs'),vm=require('vm');
const files=process.argv.slice(2);
const code=['src/core0.js','src/core1.js','src/q8.js',...files].map(f=>fs.readFileSync(f,'utf8')).join('\n')+'\n;this.COURSES=COURSES;';
const ctx={console,Math,JSON};vm.createContext(ctx);vm.runInContext(code,ctx);
const strip=s=>String(s).replace(/<[^>]+>/g,'');
let errs=0,total=0;const EXPECT_N=files.some(f=>/examfmt/.test(f))?{chem:5,phys:5,m135:4,m137:4}:undefined;
function check(q,id){
  if(q.multi){q.multi.forEach(p=>check(p,id));return}
  total++;
  const bad=(m)=>{if(errs++<40)console.log('FAIL',id,m,'|',strip(q.prompt).slice(0,140),'| ans',q.answer,'| opts',q.options&&q.options.map(o=>strip(o.html)).join(' ; '))};
  if(!q.prompt)bad('no prompt');
  if(!q.options||q.options.length<2)return bad('few options');
  const keys=q.options.map(o=>o.key);
  if(q.sel){if(q.answer&&!q.answer.split(',').every(k=>keys.includes(k)))bad('sel answer missing')}
  else if(!keys.includes(q.answer))bad('answer missing');
  if(typeof EXPECT_N!=='undefined'&&EXPECT_N[id.split('_')[0]]&&!q.sel&&!q.keep&&!q.options.every(o=>/^Line \d+$/.test(strip(o.html)))&&q.options.length!==2&&!(q.options.length===EXPECT_N[id.split('_')[0]]||(EXPECT_N[id.split('_')[0]]===5&&q.options.length===4)||(EXPECT_N[id.split('_')[0]]===4&&q.options.length===3)))bad('option count '+q.options.length);
  if(new Set(keys).size!==keys.length)bad('dup keys');
  const htmls=q.options.map(o=>strip(o.html));if(new Set(htmls).size!==htmls.length)bad('dup option text');
  if(q.options.length<3&&!(q.options.length===2))bad('count');
  
  const all=JSON.stringify(q).replace(/"html":"undefined"/g,'').replace(/NaN(₃|3|O|<sub>)/g,'');if(/(?<!is |or )undefined|NaN|Infinity|\[object/.test(all))bad('bad token');
  if(q.num&&q.num.int&&!Number.isInteger(q.num.value))bad('int not int');
}
for(const c of ctx.COURSES){for(const w of c.worlds)for(const n of w.nodes){const t0=Date.now();for(let i=0;i<300;i++){if(Date.now()-t0>3000){console.log("SLOW",n.id,i);break}let q;try{q=n.gen()}catch(e){if(errs++<40)console.log('THROW',c.id,n.id,e.message);break}check(q,c.id+'_'+n.id)}}}
console.log('checked',total,'errors',errs);if(errs)process.exit(1);
