import puppeteer from 'puppeteer-core';
import {readFile,writeFile,mkdir,mkdtemp,rm} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {dirname,resolve,join} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {tmpdir} from 'node:os';
const root=dirname(fileURLToPath(import.meta.url));
const output=resolve(process.argv[2]??'Canteen.mp4');
const beats=JSON.parse(await readFile(join(root,'timeline.json'),'utf8'));
const open=async()=>{
 const browser=await puppeteer.launch({executablePath:process.env.CHROME_PATH??'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,protocolTimeout:90000,args:['--allow-file-access-from-files']});
 const page=await browser.newPage();
 const failures=[];page.on('pageerror',e=>failures.push(e.message));
 await page.setViewport({width:1920,height:1080});
 await page.goto(pathToFileURL(join(root,'index.html')).href);
 await page.evaluate(()=>document.fonts.ready);
 if(failures.length){await browser.close();throw Error(failures.join('\n'));}
 return {page,browser};
};
const seek=(page,frame)=>page.evaluate(f=>window.seekCanteen(f),frame);
const initial=await open();
const {page,browser}=initial;
let data;
try{
 data=await page.evaluate(()=>({motion:window.motion,focus:window.focusFrames,frames:window.timing.frames}));
 const key=['title','bill1','bill3','pack','operations','tilt','rowfinal','prices','free','credits'];
 const proof=join(root,'proof');await mkdir(proof,{recursive:true});
 for(const [i,id] of key.entries()){
  const beat=beats.find(b=>b.id===id);await seek(page,Math.round(beat.start+(beat.end-beat.start)*(id==='bill1'?.22:.62)));
  const state=await page.evaluate(id=>[...document.querySelectorAll('.stage')].filter(el=>+getComputedStyle(el).opacity>.9).map(el=>el.id),id);
  if(state[0]!==id||state.length!==1)throw Error('Unexpected scene '+state.join(','));
  await page.screenshot({path:join(proof,'frame-'+(i+1)+'.jpg'),type:'jpeg',quality:90});
 }
}finally{await browser.close();}
if(process.argv.includes('--proof'))process.exit(0);
const {motion,focus,frames}=data;
const set=new Set([0,frames-1,...focus,...beats.map(b=>b.start)]);
for(let f=0;f<frames;f+=4)set.add(f);
for(const [a,b] of motion)for(let f=Math.floor(a*30);f<=Math.ceil(b*30);f+=2)set.add(f);
const [first,last]=process.env.FRAME_RANGE?.split(':').map(Number)??[0,frames];
set.add(first);set.add(last-1);
const indices=[...set].filter(f=>f>=first&&f<last).sort((a,b)=>a-b);
const temp=await mkdtemp(join(tmpdir(),'canteen-render-'));
let done=0;
try{
 const workers=4;
 const results=await Promise.allSettled(Array.from({length:workers},async (_,i)=>{
  let session;
  try{
   for(let k=i;k<indices.length;k+=workers){
    const frame=indices[k];
    for(let n=0;;n++){
     try{
      session??=await open();
      await seek(session.page,frame);
      await session.page.screenshot({path:join(temp,frame+'.jpg'),type:'jpeg',quality:92});
      break;
     }catch(e){
      await session?.browser.close().catch(()=>{});session=undefined;
      if(n>=2)throw e;
     }
    }
    if(++done%400===0||done===indices.length)console.log('Captured '+done+'/'+indices.length);
   }
  }finally{await session?.browser.close().catch(()=>{});}
 }));
 const fail=results.find(x=>x.status==='rejected');if(fail)throw fail.reason;
 const list=indices.flatMap((f,i)=>["file '"+f+".jpg'","option framerate 30","duration "+(((indices[i+1]??last)-f)/30).toFixed(9)]);
 await writeFile(join(temp,'frames.ffconcat'),'ffconcat version 1.0\n'+list.join('\n')+'\n');
 const chapters=[';FFMETADATA1','title=Gaussian Elimination | The Canteen Puzzle'];
 for(const first of beats.filter((b,i)=>i===0||b.chapter!==beats[i-1].chapter)){
  const last=beats.filter(b=>b.chapter===first.chapter).at(-1);
  chapters.push('[CHAPTER]','TIMEBASE=1/30','START='+first.start,'END='+last.end,'title='+first.title);
 }
 const metadata=join(temp,'chapters.txt');await writeFile(metadata,chapters.join('\n')+'\n');
 execFileSync('ffmpeg',['-v','warning','-y','-safe','0','-f','concat','-i',join(temp,'frames.ffconcat'),'-i',join(root,'mix.wav'),'-i',metadata,
  '-map','0:v','-map','1:a','-map_metadata','2','-map_chapters',first===0&&last===frames?'2':'-1','-vf','fps=30','-frames:v',String(last-first),'-t',String((last-first)/30),
  '-c:v','libx264','-preset','veryfast','-crf','18','-pix_fmt','yuv420p','-c:a','aac','-b:a','160k','-movflags','+faststart',output],{stdio:'inherit'});
}finally{await rm(temp,{recursive:true,force:true});}
