(() => {
const rows0=[[1,1,1,45],[2,3,1,85],[1,2,3,100]];
const rows1=[[1,1,1,45],[0,1,-1,-5],[1,2,3,100]];
const rows2=[[1,1,1,45],[0,1,-1,-5],[0,1,2,55]];
const rows3=[[1,1,1,45],[0,1,-1,-5],[0,0,3,60]];
const hues=['#a34613','#12665b','#9b3b62'];
const fmt=n=>String(n).replace('-','−');
const esc=t=>t.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const tag=t=>'<span class="kicker">'+t+'</span>';
const eq=(t,c='')=>'<div class="equation '+c+'" data-reveal>'+t+'</div>';
const v=(t,c)=>'<span class="'+c+'">'+t+'</span>';
const x=v('x','x'), y=v('y','y'), z=v('z','z');
const equations=[x+' + '+y+' + '+z+' = 45','2'+x+' + 3'+y+' + '+z+' = 85',x+' + 2'+y+' + 3'+z+' = 100'];
const panel=(t,body)=>'<div class="panel">'+tag(t)+body+'</div>';
const split=(t,head,body,right)=>'<div class="layout"><div>'+tag(t)+'<h2 data-reveal>'+head+'</h2>'+body+'</div>'+right+'</div>';
const sub=t=>'<p class="sub" data-reveal>'+t+'</p>';
const arrow=()=>'<svg class="arrow" viewBox="0 0 75 110"><path data-draw pathLength="1" d="M37 99 V16 M19 34 L37 16 L55 34"/></svg>';
const stairTrace=()=>'<svg class="stair-trace" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true"><path data-draw pathLength="1" d="M45 64 H129 V160 H224 V255 H269"/></svg>';
const matrix=(rows, pivots=[], active=-1, target=-1)=>'<div class="mx">'+(pivots.length===3?stairTrace():'')+rows.flatMap((r,i)=>r.map((n,j)=>
'<span class="'+(['x','y','z','rhs'][j])+(pivots.includes(i*4+j)?' pivot':'')+(active===i?' active':'')+'"'+(target===i?' data-cell="'+j+'"':'')+'>'+fmt(n)+'</span>')).join('')+'</div>';
const vector=(row,cls='')=>'<div class="vector '+cls+'">'+row.map((n,j)=>'<span class="'+(['x','y','z',''][j])+'">'+fmt(n)+'</span>').join('')+'</div>';
const foods=['chai','samosa','maggi'];
const eqParts=[['x','y','z','45'],['2x','3y','z','85'],['x','2y','3z','100']];
const equationsToPack=()=>eqParts.map((row,i)=>'<div class="equation pack-equation" data-pack-row="'+i+'">'+row.map((t,j)=>
 (j?'<i>'+(j===3?' = ':' + ')+'</i>':'')+'<span data-coeff="'+i+'-'+j+'" class="'+(['x','y','z',''][j])+'">'+t+'</span>').join('')+'</div>').join('');
const foodName=['Chai','Samosa','Maggi'];
const foodClass=['x','y','z'];
const art=i=>'<span class="food-art '+foods[i]+'" aria-hidden="true"></span>';
const foodCard=(i,price)=>'<div class="food-card '+foodClass[i]+'" data-food-card="'+foods[i]+'">'+
  '<div class="food-plate">'+art(i)+'</div><strong>'+foodName[i]+'</strong><span class="food-price">'+(price?'Rs '+[10,15,20][i]:'?')+'</span></div>';
const bill=(i,latest)=>'<div class="receipt '+(i===latest?'latest':'')+'" '+(i===latest?'data-receipt':'')+'><strong>Bill '+(i+1)+'</strong><div class="pieces">'+
rows0[i].slice(0,3).map((n,j)=>'<span class="'+foodClass[j]+'" '+(i===latest?'data-item="'+foods[j]+'"':'')+'>'+art(j)+'<span>'+n+' '+foods[j]+'</span></span>').join('')+
'</div><b '+(i===latest?'data-total':'')+'>Rs '+rows0[i][3]+'</b></div>';
const graph=(id)=>panel(id==='none'?'Pairwise crossings · no common point':id==='free'?'Consistent system · one free variable':'Three planes in price space',
'<svg class="diagram" data-geometry="'+id+'" viewBox="0 0 780 500" aria-label="Animated three-dimensional plane diagram"></svg>'+
(['none','free'].includes(id)?'':'<div class="legend">'+equations.map((e,i)=>'<span style="color:'+hues[i]+'">'+(['tilt','undo','simpler'].includes(id)?'Plane '+(i+1):e)+'</span>').join('')+'</div>'));
const elim=(headline,rows,pivots,op,from,subtract,to,target)=>split('Forward elimination',headline,
eq(op)+(from?'<div class="op">Subtract across the entire row</div>'+'<div class="row-work">'+vector(from)+'<div class="minus-strip">'+vector(subtract,'ghost')+'</div></div>'+
'<div class="row-result" data-result>'+vector(to)+'</div>':sub('The pivot makes zeros below it.')),
panel('Augmented matrix',matrix(rows,pivots,target,to?target:-1)));
const solve=(head,i,formula,replacement,value,cls)=>split('Back-substitution',head,
eq(formula)+eq(replacement)+arrow()+
'<div class="equation hero solved '+cls+'" data-reveal>'+value.slice(0,4)+'<span data-solved-value>'+value.slice(4)+'</span></div>',panel('Read row '+(i+1),matrix(rows3,[0,5,10],i)));
function shot(id){
 switch(id){
 case 'title':return '<div class="full"><div class="title-back">'+['x + y + z = 45','R₂ ← R₂ − 2R₁','2x + 3y + z = 85','3z = 60','x + 2y + 3z = 100','[ A | b ]'].map(e=>eq(e)).join('')+'</div>'+
 '<div>'+tag('A college canteen puzzle')+'<h1 data-reveal>Gaussian Elimination</h1>'+sub('Linear Algebra and Calculus (M3) | Ankit | ID: e25b070753')+'</div></div>';
 case 'bill1': case 'bill2': case 'bill3': {
 const n=Number(id.at(-1));
 return '<div class="hook-layout">'+split('The hook','Three bills,<br>no prices',
  eq('chai · samosa · maggi','hook-mono')+sub('Can you find the price of each item?'),
  panel('Canteen menu board','<div class="food-spread">'+foods.map((_,i)=>foodCard(i,false)).join('')+'</div>'+
   '<div class="receipts">'+Array.from({length:n},(_,i)=>bill(i,n-1)).join('')+'</div>'))+'</div>'+
   (n===1?window.canteenVisual.scene():'');
 }
 case 'swarm':return split('From three to thousands','Gaussian<br>elimination',sub('One method for systems of linear equations.'),panel('Unknown prices and variables','<span class="counter" data-counter>3</span><div class="swarm">'+Array.from({length:63},(_,i)=>'<span data-swarm>x<sub>'+String(i+1)+'</sub></span>').join('')+'</div>'));
 case 'variables':return split('Set up','Name the unknowns',
 eq('chai = '+x)+eq('samosa = '+y)+eq('maggi = '+z),panel('One equation for each bill',equations.map(e=>eq(e)).join('')));
 case 'pack':return split('Augmented matrix','Equations to<br>a matrix',equationsToPack(),
 panel('Augmented matrix','<div data-pack><div class="matrix-mapping">'+
  ['x','y','z','Right-hand side'].map((t,i)=>'<span class="'+(foodClass[i]??'')+'">'+t+'</span>').join('')+
  '</div>'+matrix(rows0)+'</div><div class="matrix-annotations"><span>Coefficients</span><span>Each row = one equation</span></div>'));
 case 'stair':return split('The goal','Build a staircase',sub('Clear entries below pivots, then solve upward.'),panel('Row-echelon form',matrix(rows3,[0,5,10])+arrow()));
 case 'operations':return split('The rules','Three allowed<br>moves',sub('Each move can be reversed.'),
 '<div class="demo-wrap panel">'+window.canteenVisual.demos()+'</div>');
 case 'planes':return split('Geometry','Each equation<br>is a plane',eq(equations[0])+sub('A solution lies on all three planes.'),graph(id));
 case 'tilt':return split('Row operation','Tilt a plane',eq('R₂ ← R₂ − 2·R₁')+sub('The shared point stays fixed.'),graph(id));
 case 'undo':return split('Why it works','The point never moves',eq('↶ Add 2·R₁ back to undo')+sub('The row replacement is reversible.'),graph(id));
 case 'simpler':return split('Why it works','Simpler planes',sub('Elimination tilts the planes until we can read off the answer.'),graph(id));
 case 'pivot':return elim('First pivot',rows0,[0],'R₁: start in column 1');
 case 'row2':return elim('Clear column 1',rows1,[0],'R₂ ← R₂ − 2·R₁',rows0[1],[2,2,2,90],rows1[1],1);
 case 'row3':return elim('Clear column 1',rows2,[0],'R₃ ← R₃ − R₁',rows0[2],rows0[0],rows2[2],2);
 case 'pivot2':return elim('Second pivot',rows2,[0,5],'R₂: move to column 2');
 case 'rowfinal':return elim('Row-echelon form',rows3,[0,5,10],'R₃ ← R₃ − R₂',rows2[2],rows2[1],rows3[2],2);
 case 'solvez':return solve('Last row first',2,'3'+z+' = 60',z+' = 60 ÷ 3','z = 20','z');
 case 'solvey':return solve('Move up',1,y+' − '+z+' = −5',y+' = −5 + '+v('20','z'),'y = 15','y');
 case 'solvex':return solve('Top row',0,x+' + '+y+' + '+z+' = 45',x+' = 45 − '+v('15','y')+' − '+v('20','z'),'x = 10','x');
 case 'prices':return '<div class="canteen-layout payoff"><div class="canteen-heading">'+tag('Back at the canteen')+
 '<h2 data-reveal>The price board</h2></div><div class="food-spread">'+foods.map((_,i)=>foodCard(i,true)).join('')+'</div></div>';
 case 'checks':return split('Back at the canteen','Always check',sub('Put the prices back into the original bills.'),
 panel('All three receipts',[[10,15,20,45],[20,45,20,85],[10,30,60,100]].map((r,i)=>'<div class="check" data-reveal><span>Bill '+(i+1)+'</span><b class="math">'+r[0]+' + '+r[1]+' + '+r[2]+' = '+r[3]+'</b><b class="ok" data-tick="'+i+'">✓</b></div>').join('')));
 case 'unique':return split('Three pivots','One unique<br>solution',matrix(rows3,[0,5,10])+sub('A pivot in each variable column.'),graph(id));
 case 'none':return split('Failure 1','No solution',eq('[ 0  0  0  |  5 ]','bad')+eq('0 = 5 · impossible','bad')+sub('There is no point common to all three planes.'),graph(id));
 case 'free':return split('Failure 2','Infinitely many<br>solutions',eq('[ 0  0  0  |  0 ]','ghost')+sub('In this example one variable has no pivot. Its value is free.'),graph(id));
 case 'swap':return split('Zero pivot?','Swap rows',sub('Choose a row below with a nonzero entry in this column.'),
 panel('Bring a nonzero entry into the pivot position','<div class="slot"><div data-swap="top">'+vector([0,1,2,30])+'</div><div data-swap="bottom">'+vector([1,1,1,45])+'</div></div>'+eq('R₁ ↔ R₂')));
 case 'recap':return split('Summary','Three takeaways',sub('A procedure for solving linear systems.'),
 panel('Recap', ['A system of equations is an augmented matrix.','Row operations are reversible, so the solution never changes.','Eliminate downward to a staircase, then back-substitute upward.'].map((t,i)=>'<div class="takeaway" data-reveal><b class="pivot">0'+(i+1)+'</b><span>'+t+'</span></div>').join('')));
 case 'credits':return '<div class="full"><div class="credit-scroll" data-credit><strong>Gaussian Elimination</strong><span>Linear Algebra and Calculus (M3) | Ankit | ID: e25b070753</span><span>Narration: Ankit · recorded for M3</span><span>AI disclosure: AI tools assisted with the visuals, audio editing and subtitle timing.</span><span>Animation: HTML, SVG, GSAP and HyperFrames</span></div></div>';
 default:throw Error(id);
 }
}
const cross=([a,b,c],[d,e,f])=>[b*f-c*e,c*d-a*f,a*e-b*d];
const unit=v=>v.map(n=>n/Math.hypot(...v));
function diagram(svg,id,p,change){
 const focus=[0,0,0], tilt=.27*Math.sin(p*2*Math.PI-.85);
 const proj=([x,y,z])=>[390+73*(Math.cos(tilt)*x-Math.sin(tilt)*y)-55*(Math.sin(tilt)*x+Math.cos(tilt)*y),
  245+25*(Math.cos(tilt)*x-Math.sin(tilt)*y)+29*(Math.sin(tilt)*x+Math.cos(tilt)*y)-61*z];
 const line=(a,b,style)=>{const [x1,y1]=proj(a),[x2,y2]=proj(b);return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" '+style+'/>';};
 const lerp=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t);
 const ease=t=>gsap.parseEase('sine.inOut')(Math.max(0,Math.min(1,t)));
 const move=change??ease((p-.22)/.50);
 let rowSet=rows0.map(r=>r.slice(0,3));
 if(id==='tilt') rowSet[1]=lerp(rowSet[1],rows1[1].slice(0,3),move);
 if(id==='undo') rowSet[1]=lerp(rows1[1].slice(0,3),rowSet[1],move);
 if(id==='simpler'){
   rowSet[1]=lerp(rowSet[1],rows1[1].slice(0,3),ease(p*3));
   rowSet[2]=p<.54?lerp(rowSet[2],rows2[2].slice(0,3),ease((p-.21)/.33)):
    lerp(rows2[2].slice(0,3),rows3[2].slice(0,3),ease((p-.54)/.36));
 }
 const variant=['none','free'].includes(id);
 const centers=variant?[[0,0,0],[0,0,0],id==='none'?[.92,.92,0]:focus]:[focus,focus,focus];
 if(variant)rowSet=[[1,0,0],[0,1,0],[1,1,0]];
 const origin=[-1,-1.5,-2];
 let result='';
 [[3,-1.5,-2],[-1,3,-2],[-1,-1.5,2.10]].forEach((end,i)=>{
  const [xx,yy]=proj(end);
  result+=line(origin,end,'stroke="#718178" stroke-width="2"')+'<text x="'+(xx+8)+'" y="'+(yy+4)+'" fill="'+hues[i]+'">'+['x','y','z'][i]+'</text>';
 });
 rowSet.forEach((n,i)=>{
   const u=unit(cross(n,variant?[0,0,1]:[0,1,0])), w=unit(cross(n,u));
   const vertices=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([a,b])=>proj(centers[i].map((c,j)=>c+2.03*a*u[j]+1.94*b*w[j])).join(','));
   const opacity=id==='planes'?ease((p-i*.16)/.14):1;
   result+='<polygon points="'+vertices.join(' ')+'" stroke="'+hues[i]+'" fill="'+hues[i]+'" fill-opacity=".15" stroke-width="2.5" opacity="'+opacity+'"/>';
 });
 const [cx,cy]=proj(focus);
 if(id==='free')result+=line([0,0,-2.4],[0,0,2.4],'stroke="#17664f" stroke-width="7"');
 if(!variant){
  const opacity=id==='planes'?ease((p-.42)/.17):1;
  result+='<g opacity="'+opacity+'"><circle cx="'+cx+'" cy="'+cy+'" r="'+(14+10*(1+Math.sin(p*23)))+'" fill="none" stroke="#17664f" stroke-opacity=".6"/>'+
   '<circle cx="'+cx+'" cy="'+cy+'" r="8" fill="#17664f"/><text x="'+(cx+22)+'" y="'+(cy-12)+'" fill="#17664f">(10, 15, 20)</text></g>';
 }
 svg.innerHTML=result;
}
const {beats,captions,frames,fps}=window.timing;
const tl=gsap.timeline({paused:true});
const container=document.querySelector('#scenes'), chapter=document.querySelector('#chapter');
const retime=(frame)=>frame/fps;
const motions=[];

const focusFrames=new Set();
const mark=(t,d)=>motions.push([t,t+d]);
let prior,priorHeader;
for(const beat of beats){
 const start=retime(beat.start), end=retime(beat.end), dur=end-start, spoken=retime(beat.speech_end-beat.speech);
 const elem=document.createElement('section');elem.className='stage';elem.id=beat.id;elem.innerHTML=shot(beat.id);container.append(elem);
 const h=document.createElement('span');
 const sections=['The hook','Concept','Visual intuition','Forward elimination','Back-substitution','Interpretation'];
 h.textContent=(['recap','credits'].includes(beat.id)?'Summary':sections[beat.chapter-1]).toUpperCase();h.style.display='none';chapter.append(h);
 if(prior)tl.set(prior,{opacity:0},start);
 if(priorHeader)tl.set(priorHeader,{display:'none'},start);
 tl.set(h,{display:'inline'},start);

 tl.set(elem,{opacity:1},start);
 prior=elem;priorHeader=h;
 tl.fromTo(elem,{scale:1},{scale:1.018,duration:dur,ease:'none',immediateRender:false},start);
 const seen=[...elem.querySelectorAll('[data-reveal]')];
 if(beat.id==='title')seen.sort((a,b)=>Number(a.closest('.title-back')!==null)-Number(b.closest('.title-back')!==null));
 const words=captions.filter(c=>c.start>=beat.start&&c.start<beat.end).flatMap(c=>c.words);
 const normalize=t=>t.toLowerCase().replace(/[^a-z0-9-]+/g,'');
 const cue=(phrase,fallback=0)=>{
  const tokens=phrase.split(' ').map(normalize);
  const index=words.findIndex((_,i)=>tokens.every((w,j)=>normalize(words[i+j]?.text??'')===w));
  return index<0?start+fallback:retime(words[index].start);
 };
 if(beat.id==='planes'){
  const head=elem.querySelector('h2'), kicker=elem.querySelector('.kicker');
  const at=cue('where they meet',spoken*.55);
  const original=head.innerHTML;
  tl.set(head,{innerHTML:original},start);
  tl.set(head,{innerHTML:'Where all<br>three meet'},at);
  tl.set(kicker,{textContent:'THE SOLUTION'},at);
  tl.fromTo(head,{opacity:.2,y:12},{opacity:1,y:0,duration:.44,ease:'power2.out',immediateRender:false},at);
  mark(at,.44);
 }
 const solved=elem.querySelector('[data-solved-value]');
 if(solved){
  const goal=Number(solved.textContent);
  const value={n:0};
  const at=cue({solvez:'z equals twenty',solvey:'which is fifteen',solvex:'which is ten'}[beat.id],spoken*.68);
  tl.to(value,{n:goal,duration:.65,ease:'power2.out',onUpdate:()=>{solved.textContent=Math.round(value.n);}},at);
  mark(at,.65);
 }
 const staged={
  variables:['let','chai','samosa','maggi','our bills','our bills','our bills'],
  operations:['three operations','swap','swap','multiply','add'],
  checks:['always check','always check','ten plus fifteen','twenty plus','ten plus thirty'],
  recap:['three things','three things','one a system','two row operations','three eliminate'],
  solvez:['last row','three z','so z','twenty'],
  solvey:['back-substitution','row two','so y','fifteen'],
  solvex:['row one','x plus','so x','which is ten']
 }[beat.id]??[];
 const spread={title:.22,bill2:.45,bill3:.80,variables:.9,operations:1.7,prices:.68,checks:2.4,recap:2.8};
 const interval=spread[beat.id]??.47;
 for(const [i,node] of seen.entries()){
  const at=Math.min(end-.75,staged[i]?cue(staged[i],.20+i*interval):start+.20+i*interval);
  tl.set(node,{opacity:0},start);
  tl.fromTo(node,{opacity:0,y:18,clipPath:'inset(0 100% 0 0)'},{opacity:1,y:0,clipPath:'inset(0 0% 0 0)',duration:.60,ease:'power2.out',immediateRender:false},at);
  mark(at,.60);
 }
 if(beat.id==='checks'){
  const ticks=[...elem.querySelectorAll('[data-tick]')];
  for(const [i,tick] of ticks.entries()){
   const at=cue(['is forty-five','is eighty-five','is one hundred'][i],spoken*(.25+i*.20));
   tl.set(tick,{opacity:0},start);
   tl.fromTo(tick,{opacity:0,scale:.56},{opacity:1,scale:1,duration:.38,ease:'back.out(1.55)',immediateRender:false},at);
   mark(at,.38);
  }
 }
 const newest=elem.querySelector('[data-receipt]');
 if(newest){
  tl.set(newest,{opacity:0},start);
  const at=cue('bill '+['one','two','three'][Number(beat.id.at(-1))-1],.25);
  tl.fromTo(newest,{opacity:0,x:50},{opacity:1,x:0,duration:.55,ease:'power3.out',immediateRender:false},at);
  mark(at,.55);
  const total=newest.querySelector('[data-total]');
  const totalWord={bill1:'forty-five',bill2:'eighty-five',bill3:'one hundred'}[beat.id];
  const totalAt=cue(totalWord,spoken*.75);
  tl.set(total,{opacity:0},start);
  tl.fromTo(total,{opacity:0,scale:.85},{opacity:1,scale:1,duration:.45,ease:'back.out(1.5)',immediateRender:false},totalAt);
  mark(totalAt,.45);
 }
 for(const [i,name] of foods.entries()){
  const food=elem.querySelector('[data-food-card="'+name+'"]');
  if(!food)continue;
  const wordTime=cue(name,.7+i);
  const item=elem.querySelector('[data-item="'+name+'"]');
  const artNode=food.querySelector('.food-art');
  if(beat.id==='prices')tl.set(food,{opacity:0},start);
  if(beat.id==='bill1'){
   tl.set(artNode,{opacity:0},start);
   tl.to(artNode,{opacity:1,duration:.28},wordTime);
  }
  if(item)tl.set(item,{opacity:.16},start);
  if(beat.id==='prices')tl.fromTo(food,{y:28,opacity:0},{y:0,opacity:1,duration:.45,ease:'power3.out',immediateRender:false},wordTime);
  tl.fromTo(artNode,{y:0,scale:1},{y:-22,scale:1.12,duration:.32,yoyo:true,repeat:1,ease:'sine.inOut',immediateRender:false},wordTime);
  tl.fromTo(food,{backgroundColor:'#fcfaf1'},{backgroundColor:'#f5e7ce',duration:.32,yoyo:true,repeat:1,ease:'sine.inOut',immediateRender:false},wordTime);
  if(item)tl.to(item,{opacity:1,duration:.24},wordTime);
  mark(wordTime,.7);
 }
 for(const draw of elem.querySelectorAll('[data-draw]')){
  tl.set(draw,{strokeDasharray:1,strokeDashoffset:1},start);
  const at=cue(draw.closest('.stair-trace')?'staircase':'so',Math.max(1,spoken*.55));
  tl.to(draw,{strokeDashoffset:0,duration:.85,ease:'power2.inOut'},at);mark(at,.85);
 }
 const svg=elem.querySelector('[data-geometry]');
 if(svg){
  const pose={p:0,m:0};
  const controlled=['tilt','undo'].includes(beat.id);
  const draw=()=>diagram(svg,beat.id,pose.p,controlled?pose.m:undefined);
  draw();
  tl.to(pose,{p:1,duration:dur,ease:'none',onUpdate:draw},start);
  if(controlled){
   const at=cue(beat.id==='tilt'?'tilted differently':'undo it',spoken*.46);
   tl.to(pose,{m:1,duration:2.8,ease:'sine.inOut',onUpdate:draw},at);
   mark(at,2.8);
  }
 }
 const glow=elem.querySelectorAll('[data-question],.mx .pivot');
 if(glow.length)tl.fromTo(glow,{opacity:.62},{opacity:1,duration:1.15,repeat:Math.max(0,Math.floor(dur/1.15)-1),yoyo:true,ease:'sine.inOut',immediateRender:false},start);
 const result=elem.querySelector('[data-result]');
 if(result){
  const at=cue('gives',Math.min(spoken*.71,dur-2));
  const nextPivot=elem.querySelector('.mx .pivot[data-cell="2"]');
  if(nextPivot){
   tl.set(nextPivot,{borderColor:'transparent',backgroundColor:'#e7eee6',color:'#9b3b62'},start);
   tl.to(nextPivot,{borderColor:'#b48b20',backgroundColor:'#fff0b8',color:'#6e4d06',duration:.3},at+.8);
   mark(at+.8,.3);
  }
  tl.set(result,{opacity:0},start);
  tl.fromTo(result,{opacity:0,y:28},{opacity:1,y:0,duration:.65,ease:'power2.out',immediateRender:false},at);
  mark(at,.8);
  const rowMap={row2:rows0[1],row3:rows0[2],rowfinal:rows2[2]};
  for(const cell of elem.querySelectorAll('[data-cell]')){
   const j=Number(cell.dataset.cell), init=rowMap[beat.id][j], dest=Number(cell.textContent.replace('−','-'));
   const state={n:init};cell.textContent=fmt(init);
   tl.to(state,{n:dest,duration:.8,ease:'power2.out',onUpdate:()=>{cell.textContent=fmt(Math.round(state.n));}},at);
  }
  const ghost=elem.querySelector('.vector.ghost');
  tl.set(ghost,{opacity:0},start);
  tl.fromTo(ghost,{opacity:0,x:-66},{opacity:.60,x:0,duration:.68,ease:'power2.out',immediateRender:false},cue('minus',spoken*.41));
  mark(cue('minus',spoken*.41),.68);
 }
 const counter=elem.querySelector('[data-counter]');
 if(counter){
  const value={n:3};
  for(const [i,goal] of [10,1000].entries()){
   const at=cue(i===0?'ten items':'a thousand',spoken*(.19+i*.12));
   tl.to(value,{n:goal,duration:1.7,ease:'power2.out',onUpdate:()=>{counter.textContent=Math.round(value.n).toLocaleString('en-IN');}},at);
   mark(at,1.7);
  }
  tl.fromTo(elem.querySelectorAll('[data-swarm]'),{opacity:.10,y:20},{opacity:1,y:0,duration:.55,stagger:.075,immediateRender:false},start+2);
 }
 const pack=elem.querySelector('[data-pack]');
 if(pack){
  const cells=[...pack.querySelectorAll('.mx span')];
  const terms=[...elem.querySelectorAll('[data-coeff]')];
  const origin=elem.getBoundingClientRect();
  const shifted=cue('augmented matrix',2);
  tl.set(cells,{opacity:0},start);
  for(const [i,c] of cells.entries()){
   const src=terms[i], a=src.getBoundingClientRect(), b=c.getBoundingClientRect();
   const token=document.createElement('b');token.className='flight-number '+(foodClass[i%4]??'');
   token.textContent=c.textContent;elem.append(token);
   token.style.left=(a.x-origin.x+a.width/2)+'px';
   token.style.top=(a.y-origin.y+a.height/2)+'px';
   const at=shifted+Math.floor(i/4)*.36+(i%4)*.06;
   mark(at,.75);
   tl.set(token,{opacity:1},at);
   tl.to(token,{x:b.x+b.width/2-a.x-a.width/2,y:b.y+b.height/2-a.y-a.height/2,duration:.65,ease:'power2.inOut'},at);
   tl.set(c,{opacity:1},at+.65);
   tl.set(token,{opacity:0},at+.65);
  }
  const rows=cue('each row',spoken*.52);
  const coeff=cue('first three columns',spoken*.66);
  const rhs=cue('last column',spoken*.82);
  for(const [nodes,at,col] of [[cells.slice(0,4),rows,'#e8efe2'],[cells.filter((_,i)=>i%4!==3),coeff,'#e8efe2'],[cells.filter((_,i)=>i%4===3),rhs,'#f4e8c8']]){
   tl.fromTo(nodes,{backgroundColor:'transparent'},{backgroundColor:col,duration:.36,repeat:3,yoyo:true,immediateRender:false},at);
   mark(at,1.44);
  }
 }
 const campus=elem.querySelector('[data-campus]');
 if(campus){
  const ordering=elem.querySelector('.hook-layout');
  const transition=cue('bill one',4.0);
  const friends=[...campus.querySelectorAll('[data-student]')];
  tl.set(ordering,{opacity:0},start);
  tl.fromTo(campus.querySelector('[data-campus-building]'),{opacity:0,y:25},{opacity:1,y:0,duration:.52,ease:'power2.out',immediateRender:false},start+.12);
  const friendAt=cue('three friends',1.6);
  tl.fromTo(friends,{opacity:0,x:-19,y:22},{opacity:1,x:0,y:0,duration:.42,stagger:.20,ease:'power2.out',immediateRender:false},friendAt);
  const puzzled=cue('nobody remembers',2.7);
  tl.fromTo(campus.querySelectorAll('.student-actor span'),{scale:.6,opacity:0},{scale:1,opacity:1,duration:.42,stagger:.11,ease:'back.out(1.6)',immediateRender:false},puzzled);
  tl.to(campus,{opacity:0,y:-12,duration:.38,ease:'power2.in'},transition);
  tl.fromTo(ordering,{opacity:0,y:16},{opacity:1,y:0,duration:.40,ease:'power2.out',immediateRender:false},transition);
  mark(friendAt,1);mark(puzzled,.75);mark(transition,.45);
 }
 const demos=[...elem.querySelectorAll('[data-demo]')];
 if(demos.length){
  const moments=['swap two rows','multiply a row','add a multiple'].map((word,i)=>cue(word,1+i*2.8));
  demos.forEach((demo,i)=>{
   const at=moments[i];
   tl.set(demo,{opacity:0},start);
   tl.fromTo(demo,{opacity:0,y:24},{opacity:1,y:0,duration:.45,ease:'power2.out',immediateRender:false},at);
   if(i)tl.to(demos[i-1],{opacity:0,duration:.23},at);
   const answer=demo.querySelector('[data-demo-answer]');
   if(answer){
    tl.set(answer,{opacity:0},start);
    tl.fromTo(answer,{opacity:0,x:32},{opacity:1,x:0,duration:.55,ease:'power2.out',immediateRender:false},at+1.2);
   }
   mark(at,1.8);
  });
  const pair=[demos[0].querySelector('[data-demo-top]'),demos[0].querySelector('[data-demo-bottom]')];
  tl.to(pair[0],{y:72,x:-22,duration:.48},moments[0]+.65);
  tl.to(pair[1],{y:-72,x:22,duration:.48},moments[0]+.65);
  tl.to(pair,{x:0,duration:.28},moments[0]+1.13);
 }
 const up=elem.querySelector('[data-swap="bottom"]');
 if(up){
  const down=elem.querySelector('[data-swap="top"]'), t=start+spoken*.66;
  tl.to(up,{y:-78,x:40,duration:.52},t);tl.to(down,{y:78,x:-40,duration:.52},t);
  tl.to([up,down],{x:0,duration:.4},t+.52);mark(t,1);
 }
 const credits=elem.querySelector('[data-credit]');
 if(credits)tl.fromTo(credits,{y:115},{y:-85,duration:dur,ease:'none',immediateRender:false},start);
}
const tray=document.querySelector('#captions');
for(const cue of captions){
 const card=document.createElement('div');card.className='caption';tray.append(card);
 tl.fromTo(card,{opacity:0,y:9},{opacity:1,y:0,duration:.10,ease:'power2.out',immediateRender:false},retime(cue.start));tl.set(card,{opacity:0},retime(cue.end));
 focusFrames.add(cue.start);focusFrames.add(cue.end);
 for(const [i,word] of cue.words.entries()){
  const span=document.createElement('span');span.textContent=word.text;card.append(span);
  if(cue.breakAt===i+1) card.append(document.createElement('br'));
  else if(i+1<cue.words.length)card.append(document.createTextNode(' '));
  focusFrames.add(word.start);
 }
}
const length=frames/fps;
tl.fromTo('.grid',{x:0,y:0,opacity:.60},{x:56,y:-56,opacity:.85,duration:15,repeat:27,yoyo:true,ease:'sine.inOut',immediateRender:false},0);

const particles=document.querySelector('#particles');
for(let i=0;i<8;i++){
 const node=document.createElement('i');node.className='particle';particles.append(node);
 node.style.left=(4+i*43%92)+'%';node.style.top=(9+i*61%69)+'%';
 const speed=7+i%7;
 tl.fromTo(node,{x:-13,y:16,opacity:.12},{x:18,y:-25,opacity:.5,duration:speed,repeat:Math.floor(length/speed),yoyo:true,ease:'sine.inOut',immediateRender:false},0);
}
window.canteenTimeline=tl;
window.seekCanteen=frame=>{tl.seek(frame/fps,false);};
window.motion=motions;
window.focusFrames=[...focusFrames];
})();
