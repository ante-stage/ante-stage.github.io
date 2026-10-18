/* あんて｡ OFFICIAL STAGE — 共通スクリプト */
(function(){
'use strict';
/* =====================================================
   ここだけ編集すれば、サイトの文言・リンクが変わります
   ===================================================== */
var CONFIG={
  name:'あんて｡', kana:'あんて｡➶♡',
  tagline:'雑談×ゲーム｜史上最強のエンジョイ勢',
  profile:[['活動名','あんて｡➶♡'],['ジャンル','雑談 × ゲーム ／ 歌ってみた'],['誕生日','4月24日'],['ファンネーム','てて教'],['X','@antevx_']],
  hashtags:['#あんてに届け','#おいあんて','#あんてのふぁんあーと'],
  links:[
    {label:'Mirrativ（配信）',icon:'▶',url:'https://www.mirrativ.com/user/102348987'},
    {label:'YouTube（歌ってみた）',icon:'▷',url:'https://www.youtube.com/@akumante'},
    {label:'TikTok',icon:'♪',url:'https://www.tiktok.com/@antevx_0424'},
    {label:'X',icon:'✕',url:'https://x.com/antevx_'},
    {label:'X（インフォ垢）',icon:'i',url:'https://x.com/subantevx_'},
    {label:'グッズ（SUZURI）',icon:'♡',url:'https://suzuri.jp/Ante_'}
  ],
  liveUrl:'https://www.mirrativ.com/user/102348987',
  /* 歌ってみた一覧: 動画を足すときは1行ずつ追加（idはYouTubeのURLの11文字） */
  covers:[
    {id:'iU6hErquIGQ',title:'神っぽいな / ピノキオピー',sub:'Full ver.'},
    {id:'-53EOxCVAII',title:'ファンサ'},
    {id:'79Ki3coWP6M',title:'きみだけは。'},
    {id:'K8WoPSxqQB8',title:'ヴァンパイア'},
    {id:'4gxbKkyLXFU',title:'グッバイ宣言'},
    {id:'up13KqZrLtU',title:'小悪魔だってかまわない！'}
  ],
  pickup:{title:'神っぽいな / ピノキオピー',sub:'歌ってみた Full ver.',url:'https://youtu.be/iU6hErquIGQ'},
  /* つながるまでの仮データ */
  schedule:[
    {date:'2026-10-16',time:'21:00',title:'【サンプル】ゲーム配信',note:'予定は本人に確認して差し替え',tag:'ゲーム'},
    {date:'2026-10-18',time:'23:00',title:'【サンプル】深夜の歌枠',note:'眠れない子、おいで',tag:'歌枠'}
  ],
  songs:[
    {title:'（サンプル）曲名1',artist:'アーティストA',genre:'ボカロ'},
    {title:'（サンプル）曲名2',artist:'アーティストB',genre:'アイドル'},
    {title:'（サンプル）曲名3',artist:'アーティストC',genre:'J-POP'}
  ],
  posts:[]
};
var SB='https://uglxilcwbgqoofnzngux.supabase.co/rest/v1/rpc/',SBKEY='sb_publishable_R83zSq90hslRd5jl04sIPg_hZlLxfRC';
var NAV=[['index.html','HOME','ホーム','♛'],['profile.html','PROFILE','プロフィール','♡'],['schedule.html','SCHEDULE','配信予定','◷'],['songs.html','SONGS','歌える曲','♪'],['news.html','NEWS','ニュース','✦']];

var $=function(s,r){return (r||document).querySelector(s);};
var $$=function(s,r){return [].slice.call((r||document).querySelectorAll(s));};
var esc=function(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});};
var page=document.body.getAttribute('data-page')||'home';
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var fine=window.matchMedia&&matchMedia('(hover:hover) and (pointer:fine)').matches;
function ss(k,v){try{if(v===undefined)return sessionStorage.getItem(k);if(v===null)sessionStorage.removeItem(k);else sessionStorage.setItem(k,v);}catch(e){}return null;}
function toast(m){var t=$('#toast');if(!t)return;t.textContent=m;t.classList.add('on');clearTimeout(toast._t);toast._t=setTimeout(function(){t.classList.remove('on');},2300);}
function rpc(fn,body){return fetch(SB+fn,{method:'POST',headers:{apikey:SBKEY,'Content-Type':'application/json'},body:JSON.stringify(body||{})}).then(function(r){return r.json().catch(function(){return null;}).then(function(d){if(!r.ok)throw new Error((d&&d.message)||'server');return d;});});}

/* ---------- 共通パーツの差し込み ---------- */
function chrome(){
  var b=document.body;
  if(!$('#sl')){var sl=document.createElement('div');sl.id='sl';sl.setAttribute('aria-hidden','true');b.appendChild(sl);if(!reduce){var t=0;addEventListener('scroll',function(){if(t)return;t=requestAnimationFrame(function(){t=0;var y=Math.max(0,Math.min(1,(scrollY%1400)/1400));sl.style.setProperty('--sy',(46+8*Math.sin(y*6.2832))+'%');});},{passive:true});}}
  if(!$('#pl')&&!reduce){var pl=document.createElement('div');pl.id='pl';pl.setAttribute('aria-hidden','true');var cs=['#ffe9a8','#ff8fa6','#fff6dc','#f3dc9c','#ff6f8a'];
    for(var q=0;q<(innerWidth<700?14:26);q++){var d=document.createElement('i'),sz=3+Math.random()*6,c=cs[q%cs.length];d.style.cssText='left:'+(Math.random()*100)+'%;width:'+sz+'px;height:'+sz+'px;background:'+c+';box-shadow:0 0 '+(sz*2.2)+'px '+(sz*.6)+'px '+c+';animation-duration:'+(16+Math.random()*16)+'s,'+(2+Math.random()*3)+'s;animation-delay:-'+(Math.random()*28)+'s,-'+(Math.random()*4)+'s;--dx:'+((Math.random()*80-40)|0)+'px';pl.appendChild(d);}
    b.appendChild(pl);}
  /* ライブ会場演出: ムービングライト・客席ペンライト・スモーク */
  if(!$('#mh')&&!reduce){var mh=document.createElement('div');mh.id='mh';mh.setAttribute('aria-hidden','true');
    var mc=['255,111,138','255,226,150','255,150,190','255,236,190','255,90,120'],mn=innerWidth<700?3:5;
    for(var m=0;m<mn;m++){var s=document.createElement('i');s.style.cssText='left:'+(8+m*(84/(mn-1)))+'%;--c:'+mc[m%mc.length]+';animation-duration:'+(7+m*1.7)+'s;animation-delay:-'+(m*2.3)+'s;--a:'+(m%2?-1:1);mh.appendChild(s);}
    b.appendChild(mh);}
  if(!$('#cr')){var cr=document.createElement('div');cr.id='cr';cr.setAttribute('aria-hidden','true');
    var pc=['#ff6f8a','#ffe9a8','#ff8fa6','#fff6dc','#e8546b','#f3dc9c'],cn=innerWidth<700?16:34,h='<u class="sm"></u>';
    for(var k=0;k<cn;k++){var cl=pc[(Math.random()*pc.length)|0],hh=26+Math.random()*20;h+='<i style="left:'+((k+.5)*(100/cn)+(Math.random()*2-1))+'%;--c:'+cl+';--h:'+hh+'px;animation-duration:'+(1.4+Math.random()*1.4)+'s;animation-delay:-'+(Math.random()*3)+'s"></i>';}
    cr.innerHTML=h+'<u class="hd"></u>';b.appendChild(cr);}
  var nav='<a class="skip" href="#main">本文へ</a>'+
  '<header class="topnav"><div class="pg in"><a class="brand" href="index.html"><img src="img/logo-gold.png" alt="">あんて｡</a><nav aria-label="メインメニュー"><ul>'+
  NAV.map(function(n){return '<li><a href="'+n[0]+'"'+(n[0]===curFile()?' aria-current="page"':'')+'><small>'+n[1]+'</small>'+n[2]+'</a></li>';}).join('')+'</ul></nav></div></header>'+
  '<nav class="tabbar" aria-label="メインメニュー">'+NAV.map(function(n){return '<a href="'+n[0]+'"'+(n[0]===curFile()?' aria-current="page"':'')+'><i aria-hidden="true">'+n[3]+'</i>'+n[2]+'</a>';}).join('')+'</nav>';
  b.insertAdjacentHTML('afterbegin',nav);
  (function(){
    var lit=false;try{lit=localStorage.getItem('ante-lights')==='lit';}catch(e){}
    var bt=document.createElement('button');bt.type='button';bt.id='ltBtn';
    function ui(){b.classList.toggle('lights-lit',lit);bt.setAttribute('aria-pressed',lit?'true':'false');bt.setAttribute('aria-label',lit?'ライトを消灯する(スポットライト演出)':'ライトを全灯にする(演出なし)');
      bt.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 21h6M10 17h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" fill="'+(lit?'currentColor':'none')+'" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg><span>'+(lit?'ON':'OFF')+'</span>';}
    bt.addEventListener('click',function(){lit=!lit;try{localStorage.setItem('ante-lights',lit?'lit':'spot');}catch(e){}ui();});
    ui();b.appendChild(bt);
  })();
  b.insertAdjacentHTML('beforeend',
   '<footer class="ft"><img src="img/logo-gold.png" alt="あんて｡ ロゴ"><nav aria-label="フッター">'+NAV.map(function(n){return '<a href="'+n[0]+'">'+n[2]+'</a>';}).join('')+'</nav><button type="button" class="upd" id="updBtn">↻ 最新版に更新</button><small>© ANTE OFFICIAL STAGE ・ v'+VER+'</small></footer>'+
   '<div class="toast" id="toast" role="status" aria-live="polite"></div><div id="lb" aria-hidden="true"><img alt=""></div>');
}
function curFile(){var f=location.pathname.split('/').pop();return f===''?'index.html':f;}

/* ---------- ページ遷移の幕 ---------- */
function transitions(){
  var pt=document.createElement('div');pt.id='pt';pt.innerHTML='<b></b><b></b>';document.body.appendChild(pt);
  if(document.documentElement.classList.contains('pt-in')){
    pt.className='cover instant';
    requestAnimationFrame(function(){requestAnimationFrame(function(){
      document.documentElement.classList.remove('pt-in');
      pt.className='';pt.classList.add('open');
      setTimeout(function(){pt.className='';},700);
    });});
    ss('ptin',null);
  }
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;
    var h=a.getAttribute('href');
    if(!h||h.charAt(0)==='#'||a.target==='_blank'||/^(https?:|mailto:|tel:)/.test(h)||e.metaKey||e.ctrlKey||e.shiftKey||a.hasAttribute('download'))return;
    if(h.replace(/#.*/,'')===curFile()||(h==='index.html'&&curFile()==='index.html'))return;
    if(reduce)return;
    e.preventDefault();ss('ptin','1');pt.className='cover';
    setTimeout(function(){location.href=h;},620);
  });
  window.addEventListener('pageshow',function(e){if(e.persisted){pt.className='';document.documentElement.classList.remove('pt-in');}});
}

/* ---------- 見出しの飾り（矢の刺さるハート） ---------- */
var ORN='<img class="orn" src="img/logo-gold.png" alt="" width="900" height="438" loading="lazy">';
var VER='20261018e';
function autoUpdate(){
  function chk(){try{fetch('version.json?t='+Date.now(),{cache:'no-store'}).then(function(r){return r.ok?r.json():null;}).then(function(j){
    if(!j||!j.v||j.v===VER)return;var k='verTry';if(ss(k)===j.v)return;ss(k,j.v);
    location.replace(location.pathname+'?r='+Date.now()+(location.hash||''));
  }).catch(function(){});}catch(e){}}
  chk();document.addEventListener('visibilitychange',function(){if(document.visibilityState==='visible')chk();});addEventListener('pageshow',function(e){if(e.persisted)chk();});
}
function updater(){var b=$('#updBtn');if(!b)return;b.addEventListener('click',function(){b.textContent='更新中…';b.disabled=true;var go=function(){try{sessionStorage.removeItem('antedata');}catch(e){}var u=location.pathname+'?r='+Date.now()+(location.hash||'');location.replace(u);};try{var jobs=[];if(window.caches&&caches.keys)jobs.push(caches.keys().then(function(k){return Promise.all(k.map(function(x){return caches.delete(x);}));}));if(navigator.serviceWorker&&navigator.serviceWorker.getRegistrations)jobs.push(navigator.serviceWorker.getRegistrations().then(function(r){return Promise.all(r.map(function(x){return x.unregister();}));}));Promise.all(jobs).then(go,go);}catch(e){go();}});}
function decorate(){
  $$('.h').forEach(function(h){h.insertAdjacentHTML('beforeend',ORN);});
}

/* ---------- スクロール演出 ---------- */
function reveal(){
  var els=$$('.rv,.h');
  els.forEach(function(el,i){if(el.classList.contains('rv')){var sib=$$('.rv',el.parentNode);el.style.setProperty('--d',Math.min(sib.indexOf(el),6));}});
  if(!('IntersectionObserver' in window)||reduce){els.forEach(function(e){e.classList.add('in');});return;}
  var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  els.forEach(function(e){io.observe(e);});
}

/* ---------- タップ演出・スポットライト・チルト ---------- */
var BG=['♡','♛','✦','♥','✧','➶'];
function burst(x,y,n){
  if(reduce)return;n=n||7;
  for(var i=0;i<n;i++){var s=document.createElement('i');s.className='bst';s.textContent=BG[(Math.random()*BG.length)|0];
    s.style.left=x+'px';s.style.top=y+'px';var a=Math.random()*Math.PI*2,d=36+Math.random()*60;
    s.style.setProperty('--bx',Math.cos(a)*d+'px');s.style.setProperty('--by',(Math.sin(a)*d-20)+'px');s.style.setProperty('--br',((Math.random()*120-60)|0)+'deg');
    s.style.fontSize=(14+Math.random()*14)+'px';document.body.appendChild(s);setTimeout(function(el){el.remove();}.bind(null,s),950);}
}
function fx(){
  var last=0;
  document.addEventListener('pointerdown',function(e){var t=Date.now();if(t-last<120)return;last=t;
    if(e.target.closest('input,textarea,select,.sheet'))return;burst(e.clientX,e.clientY,e.target.closest('.btn,.chip,button,a')?9:5);});
  if(fine&&!reduce){
    var raf=0,px=innerWidth/2,py=innerHeight*.3;
    document.addEventListener('pointermove',function(e){px=e.clientX;py=e.clientY;if(!raf)raf=requestAnimationFrame(function(){raf=0;document.documentElement.style.setProperty('--mx',px+'px');document.documentElement.style.setProperty('--my',py+'px');});});
    $$('.photo').forEach(function(p){
      p.addEventListener('pointermove',function(e){var r=p.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
        p.style.setProperty('--ry',(x*12)+'deg');p.style.setProperty('--rx',(-y*10)+'deg');p.style.setProperty('--tx',(-x*14)+'px');p.style.setProperty('--ty',(-y*14)+'px');p.style.setProperty('--gx',(x*100+50)+'%');});
      p.addEventListener('pointerleave',function(){['--ry','--rx','--tx','--ty'].forEach(function(k){p.style.removeProperty(k);});p.style.setProperty('--gx','-100%');});
    });
  }else if(!reduce){
    var ph=$('.photo img');
    if(ph){addEventListener('scroll',function(){var y=Math.min(scrollY,500);ph.style.setProperty('--ty',(y*-.05)+'px');},{passive:true});}
  }
}
function lightbox(){
  var lb=$('#lb'),im=$('img',lb);
  $$('[data-zoom]').forEach(function(el){el.addEventListener('click',function(){im.src=el.getAttribute('data-zoom');lb.classList.add('on');lb.setAttribute('aria-hidden','false');});});
  lb.addEventListener('click',function(){lb.classList.remove('on');lb.setAttribute('aria-hidden','true');});
  addEventListener('keydown',function(e){if(e.key==='Escape')lb.click();});
}

/* ---------- オープニング（HOMEの初回のみ） ---------- */
function kamifubuki(){var c=document.createElement('div');c.id='cf';c.setAttribute('aria-hidden','true');var cs=['#e8546b','#d9b25f','#fff6dc','#ff8fa6','#f3dc9c'];
  for(var i=0;i<(innerWidth<700?36:70);i++){var e=document.createElement('i');e.style.cssText='left:'+(Math.random()*100)+'%;background:'+cs[i%cs.length]+';width:'+(5+Math.random()*7)+'px;height:'+(9+Math.random()*9)+'px;animation-duration:'+(2.6+Math.random()*2.4)+'s;animation-delay:'+(Math.random()*1.1)+'s;--dx:'+((Math.random()*160-80)|0)+'px;--r:'+((Math.random()*720)|0)+'deg';c.appendChild(e);}
  document.body.appendChild(c);setTimeout(function(){c.remove();},6500);}
function opening(){
  var op=$('#opening');if(!op)return;
  var fxb=$('#fx'),g=['♡','♛','✦','♥','✧'];
  for(var i=0;i<16;i++){var e=document.createElement('i');e.textContent=g[i%g.length];e.style.left=(Math.random()*96)+'%';e.style.fontSize=(12+Math.random()*16)+'px';e.style.animationDuration=(4+Math.random()*4)+'s';e.style.animationDelay=(Math.random()*5)+'s';fxb.appendChild(e);}
  var done=false;
  var phase=0;
  function place(){var fig=$('#opening .fig'),ph=$('.hero .photo');if(!fig||!ph||phase)return;var R=ph.getBoundingClientRect();if(!R.width)return;var nm=$('.hero .name'),kk=$('.hero .kick'),pn=$('#opening .pname');if(nm&&kk&&pn){var N=nm.getBoundingClientRect(),K=kk.getBoundingClientRect(),cs=getComputedStyle(nm);pn.style.cssText='left:'+N.left+'px;width:'+N.width+'px;top:'+K.top+'px;--nfs:'+cs.fontSize+';--nls:'+cs.letterSpacing+';--nlh:'+(N.top-K.top)+'px';}
  op.style.setProperty('--fx',(R.left+R.width/2)+'px');op.style.setProperty('--fw',R.width+'px');op.style.setProperty('--fb',(R.bottom)+'px');
  fig.style.cssText='position:fixed;left:'+R.left+'px;top:'+R.top+'px;width:'+R.width+'px;height:'+R.height+'px;max-width:none;aspect-ratio:auto';}
  place();addEventListener('resize',place);addEventListener('load',place);
  function fin(){if(!reduce)kamifubuki();op.classList.add('out');document.body.classList.add('reveal');setTimeout(function(){document.body.classList.remove('lock');},500);ss('opened','1');}
  function out(){if(phase>1)return;phase=2;
    var fig=$('#opening .fig'),ph=$('.hero .photo');
    if(reduce||!fig||!ph){fin();return;}
    try{op.classList.add('land');setTimeout(function(){document.body.classList.add('reveal');},60);setTimeout(fin,900);
    }catch(e){fin();}}
  function go(){if(phase)return;phase=1;op.classList.add('go');setTimeout(out,950);}
  if(ss('opened')==='1'||document.documentElement.classList.contains('pt-in')||reduce){op.style.display='none';done=true;document.body.classList.remove('lock');document.body.classList.add('reveal');return;}
  document.body.classList.add('lock');
  op.addEventListener('click',go);setTimeout(go,7000);
}

/* ---------- データ ---------- */
var DATA={schedule:CONFIG.schedule,songs:CONFIG.songs,posts:CONFIG.posts,news:[],requestOpen:true,live:false};
var subs=[];
function load(){
  var cached=null;try{cached=JSON.parse(ss('antedata')||'null');}catch(e){}
  if(cached&&Date.now()-cached.t<45000){apply(cached.d);return Promise.resolve();}
  return rpc('ante_public').then(function(d){if(!d){subs.forEach(function(f){f();});return;}ss('antedata',JSON.stringify({t:Date.now(),d:d}));apply(d);}).catch(function(){subs.forEach(function(f){f();});});
}
function apply(d){DATA.schedule=d.schedule||[];DATA.songs=d.songs||[];DATA.posts=d.posts||[];DATA.news=d.news||[];DATA.requestOpen=d.request_open!==false;DATA.live=true;subs.forEach(function(f){f();});}
function ymd(d){return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2);}
var WK=['日','月','火','水','木','金','土'];
function upcoming(){var t=ymd(new Date());return DATA.schedule.filter(function(s){return s.date>=t;}).sort(function(a,b){return (a.date+(a.time||'')).localeCompare(b.date+(b.time||''));});}
function isOff(s){return s.tag==='off';}
function isMemo(s){return s.tag==='memo';}
function schedRows(){return upcoming().filter(function(s){return !isMemo(s);});}
function schedNote(){var m=upcoming().filter(isMemo)[0];return m?m.title:'';}
function schedItem(s){var d=new Date(s.date+'T00:00:00'),w=d.getDay(),k=ymd(new Date()),today=s.date===k,off=isOff(s);
  return '<li class="'+(w===6?'sat ':'')+(w===0?'sun ':'')+(off?'is-off ':'')+(today?'is-today':'')+'"><span class="wd">'+(d.getMonth()+1)+'/'+d.getDate()+'<small>'+WK[w]+'</small></span>'+
    (off?'<span class="ww">おやすみ 💤</span>':'<span class="wt">'+esc(s.time||'--:--')+'</span><span class="ww">'+esc(s.title)+(s.note?'<em>'+esc(s.note)+'</em>':'')+'</span>')+'</li>';}
function weekRange(){var t=new Date();t.setHours(0,0,0,0);var e=new Date(t);e.setDate(t.getDate()+6);return (t.getMonth()+1)+'/'+t.getDate()+'〜'+(e.getMonth()+1)+'/'+e.getDate();}

function newsRows(list){return list.map(function(n){var d=new Date(n.date+'T00:00:00');return '<li class="nw"><time datetime="'+esc(n.date)+'">'+d.getFullYear()+'.'+('0'+(d.getMonth()+1)).slice(-2)+'.'+('0'+d.getDate()).slice(-2)+'</time><p>'+esc(n.body)+'</p></li>';}).join('');}
/* ---------- ページごと ---------- */
var P={};
P.home=function(){
  var vis=$('.hero .vis');if(vis&&!$('.sw',vis)){vis.insertAdjacentHTML('beforeend','<i class="sw a" aria-hidden="true"></i><i class="sw b" aria-hidden="true"></i>');}
  $('#liveBtn').href=CONFIG.liveUrl;
  var pk=CONFIG.pickup;if(pk){$('#pickCard').href=pk.url;$('#pickTitle').textContent=pk.title;$('#pickSub').textContent=pk.sub;
    var m=String(pk.url).match(/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/)([\w-]{11})/);
    if(m)$('#ytFrame').src='https://www.youtube-nocookie.com/embed/'+m[1]+'?rel=0&playsinline=1';else $('#ytBox').style.display='none';}
  subs.push(function(){
    var u=schedRows().slice(0,4);
    var nb=$('#homeNews');if(nb){var nn=DATA.news.slice(0,3);$('#newsHome').hidden=!nn.length;nb.innerHTML=newsRows(nn);}
    $('#homeSched').innerHTML=u.length?u.map(schedItem).join(''):'<li class="empty" style="display:block;border:0">配信予定は準備中です。Xをチェックしてね♡</li>';
    $('#songCount').textContent=DATA.live?DATA.songs.length:'—';
    $('#reqNote').textContent=DATA.live&&!DATA.requestOpen?'いまはリクエストをお休み中です':'聴きたい曲を、そっと送ってね';
  });
};
P.profile=function(){
  $('#pfDl').innerHTML=CONFIG.profile.map(function(r){return '<dt>'+esc(r[0])+'</dt><dd>'+esc(r[1])+'</dd>';}).join('');
  $('#tags').innerHTML=CONFIG.hashtags.map(function(t){return '<button class="chip" data-t="'+esc(t)+'">'+esc(t)+'</button>';}).join('');
  links('#links');copyTags('#tags');
};
function links(sel){var el=$(sel);if(!el)return;el.innerHTML=CONFIG.links.map(function(l){return '<a class="'+(l.url?'':'off')+'" '+(l.url?'href="'+esc(l.url)+'" target="_blank" rel="noopener"':'')+'><span class="ic">'+l.icon+'</span>'+esc(l.label)+'<span class="ar">'+(l.url?'›':'準備中')+'</span></a>';}).join('');}
function copyTags(sel){var el=$(sel);if(!el)return;el.addEventListener('click',function(e){var b=e.target.closest('.chip');if(!b)return;var t=b.dataset.t;(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){toast(t+' をコピーしました');},function(){toast(t);});});}
P.schedule=function(){
  function draw(){
    var rows=schedRows(),t0=new Date();t0.setHours(0,0,0,0);var e=new Date(t0);e.setDate(t0.getDate()+6);var lim=ymd(e);
    var wk=rows.filter(function(s){return s.date<=lim;}),later=rows.filter(function(s){return s.date>lim;});
    $('#weekRange').textContent=weekRange();
    $('#sList').innerHTML=wk.length?wk.map(schedItem).join(''):'<li class="empty" style="display:block;border:0">今週の配信予定は準備中です。Xをチェックしてね♡</li>';
    var n=schedNote(),nb=$('#wNote');nb.hidden=!n;nb.textContent=n?'♡ '+n:'';
    $('#laterBox').hidden=!later.length;$('#laterList').innerHTML=later.map(schedItem).join('');
  }
  $('#liveBtn').href=CONFIG.liveUrl;
  subs.push(draw);draw();
};
P.songs=function(){
  var genre='すべて',q='';
  function draw(){
    var gs=['すべて'].concat(DATA.songs.map(function(s){return s.genre;}).filter(function(g,i,a){return g&&a.indexOf(g)===i;}));
    if(gs.indexOf(genre)<0)genre='すべて';
    $('#chips').innerHTML=gs.length>1?gs.map(function(g){return '<button class="chip '+(g===genre?'on':'')+'" data-g="'+esc(g)+'">'+esc(g)+'</button>';}).join(''):'';
    var list=DATA.songs.filter(function(s){return (genre==='すべて'||s.genre===genre)&&((s.title||'')+(s.artist||'')).toLowerCase().indexOf(q)>=0;});
    $('#songN').textContent=DATA.live?DATA.songs.length+'曲':'';
    $('#songList').innerHTML=list.length?list.slice(0,300).map(function(s,i){return '<li><span class="no">'+('0'+(i+1)).slice(-2)+'</span><div class="m"><div class="st">'+esc(s.title)+'</div><div class="sa">'+esc(s.artist||'')+'</div></div>'+(s.genre?'<span class="g">'+esc(s.genre)+'</span>':'')+'<button data-t="'+esc(s.title)+'" data-a="'+esc(s.artist||'')+'">リクエスト</button></li>';}).join('')+(list.length>300?'<li class="empty" style="display:block">先頭300曲を表示しています。検索で絞ってね</li>':''):'<li class="empty" style="display:block">'+(DATA.songs.length?'見つかりませんでした':'曲リストは準備中です')+'</li>';
    $('#reqClosed').hidden=DATA.requestOpen;$('#openReq').hidden=!DATA.requestOpen;
  }
  $('#chips').addEventListener('click',function(e){var b=e.target.closest('.chip');if(b){genre=b.dataset.g;draw();}});
  $('#q').addEventListener('input',function(e){q=e.target.value.trim().toLowerCase();draw();});
  /* リクエスト */
  var dr=$('#drawer');
  function open(t,a){dr.classList.add('on');$('#reqSong').value=t||'';$('#reqArtist').value=a||'';setTimeout(function(){(t?$('#reqName'):$('#reqSong')).focus();},60);}
  function close(){dr.classList.remove('on');}
  $('#songList').addEventListener('click',function(e){var b=e.target.closest('button');if(b)open(b.dataset.t,b.dataset.a);});
  $('#openReq').addEventListener('click',function(){open('','');});
  $('#reqCancel').addEventListener('click',close);dr.addEventListener('click',function(e){if(e.target===dr)close();});
  addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  $('#reqForm').addEventListener('submit',function(e){
    e.preventDefault();
    if(!DATA.live){toast('リクエスト受付は準備中です');return;}
    var last=0;try{last=+localStorage.getItem('ante_req_last')||0;}catch(_){}
    if(Date.now()-last<60000){toast('少し時間をあけてね（1分に1回まで）');return;}
    var btn=$('button[type=submit]',e.target);btn.disabled=true;
    rpc('ante_req_submit',{p_song:$('#reqSong').value.trim(),p_artist:$('#reqArtist').value.trim(),p_name:$('#reqName').value.trim(),p_comment:$('#reqMsg').value.trim()})
    .then(function(){try{localStorage.setItem('ante_req_last',String(Date.now()));}catch(_){}toast('リクエスト送信しました♡');e.target.reset();close();burst(innerWidth/2,innerHeight/2,16);})
    .catch(function(err){toast(err.message==='closed'?'いまはリクエストをお休み中です':err.message==='busy'?'混み合っています。少し待ってね':'送信できませんでした');if(err.message==='closed'){DATA.requestOpen=false;draw();close();}})
    .then(function(){btn.disabled=false;});
  });
  if(location.hash==='#request')setTimeout(function(){open('','');},700);
  /* おまかせ選曲 */
  var slot=$('#slot'),spin=$('#spin'),pick=null,tm=0;
  spin.addEventListener('click',function(){
    if(!DATA.songs.length){toast('曲リストは準備中です');return;}
    slot.classList.add('spin');spin.disabled=true;var n=0;
    clearInterval(tm);tm=setInterval(function(){var s=DATA.songs[(Math.random()*DATA.songs.length)|0];$('b',slot).textContent=s.title;$('small',slot).textContent=s.artist||'';
      if(++n>14){clearInterval(tm);slot.classList.remove('spin');spin.disabled=false;pick=s;$('#slotReq').hidden=false;var r=slot.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,10);}},reduce?10:90);
  });
  $('#slotReq').addEventListener('click',function(){if(pick)open(pick.title,pick.artist||'');});
  subs.push(draw);draw();
};
P.covers=function(){
  var g=$('#coverGrid');if(!g)return;
  g.innerHTML=CONFIG.covers.map(function(c){return '<a class="cv rv" href="https://youtu.be/'+esc(c.id)+'" target="_blank" rel="noopener"><span class="th"><img src="https://i.ytimg.com/vi/'+esc(c.id)+'/hqdefault.jpg" alt="" loading="lazy"><i aria-hidden="true">▶</i></span><b>'+esc(c.title)+'</b>'+(c.sub?'<small>'+esc(c.sub)+'</small>':'')+'</a>';}).join('');
};
P.news=function(){
  subs.push(function(){var l=$('#newsList');if(!l)return;l.innerHTML=DATA.news.length?newsRows(DATA.news):'<li class="empty" style="display:block;border:0">お知らせはまだありません。更新をお待ちください。</li>';});
  var pk=CONFIG.pickup;if(pk){$('#pickCard').href=pk.url;$('#pickTitle').textContent=pk.title;$('#pickSub').textContent=pk.sub;
    var m=String(pk.url).match(/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/)([\w-]{11})/);
    if(m)$('#ytFrame').src='https://www.youtube-nocookie.com/embed/'+m[1]+'?rel=0&playsinline=1';else $('#ytBox').style.display='none';}
  $('#tags').innerHTML=CONFIG.hashtags.map(function(t){return '<button class="chip" data-t="'+esc(t)+'">'+esc(t)+'</button>';}).join('');
  copyTags('#tags');links('#links');
  var tw=false;
  function draw(){
    var box=$('#xposts');
    if(!DATA.posts.length){box.innerHTML='<a class="twitter-timeline" data-theme="dark" data-height="640" data-dnt="true" data-chrome="noheader nofooter transparent" data-lang="ja" href="https://twitter.com/antevx_?ref_src=twsrc%5Etfw">@antevx_ のポスト</a><p class="note" style="margin-top:10px"><a href="https://x.com/antevx_" target="_blank" rel="noopener" style="color:var(--gold-l);text-decoration:underline">表示されないときは @antevx_ をみる ›</a></p>';
      if(window.twttr&&twttr.widgets)twttr.widgets.load(box);else if(!tw){tw=true;var sc0=document.createElement('script');sc0.async=true;sc0.src='https://platform.twitter.com/widgets.js';document.body.appendChild(sc0);}return;}
    var norm=function(u){return String(u).replace(/^https?:\/\/(www\.)?x\.com\//,'https://twitter.com/');};
    box.innerHTML=DATA.posts.map(function(u){return '<blockquote class="twitter-tweet" data-theme="dark" data-dnt="true"><a href="'+esc(norm(u))+'"></a></blockquote>';}).join('');
    if(window.twttr&&twttr.widgets)twttr.widgets.load(box);else if(!tw){tw=true;var sc=document.createElement('script');sc.async=true;sc.src='https://platform.twitter.com/widgets.js';document.body.appendChild(sc);}
  }
  subs.push(draw);draw();
};

/* ---------- 起動 ---------- */
chrome();updater();autoUpdate();decorate();transitions();opening();
if(P[page])P[page]();
fx();lightbox();reveal();
load();
})();
