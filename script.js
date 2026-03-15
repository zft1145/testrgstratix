// 检测浏览器显示遮罩
function checkBrowser(){
    var u = navigator.userAgent.toLowerCase();
    var isWeChat = u.indexOf('micromessenger') > -1;
    var isQQ = u.indexOf(' qq') > -1 || u.indexOf('txmini') > -1;
    var isQQBrowser = u.indexOf('qqbrowser') > -1;
    if(isWeChat || isQQ || isQQBrowser){
        document.getElementById('browserOverlay').classList.add('show');
    }
}

// 复制链接
document.getElementById('copyBtn').addEventListener('click', function(){
    navigator.clipboard.writeText('rgstratix.pages.dev').then(()=>{
        this.innerHTML='<span>复制成功！</span>';
        setTimeout(()=>this.innerHTML='<span>复制链接</span>',1500);
    });
});

checkBrowser();

// 蜘蛛网动效
const webBg = document.getElementById('webBg');
const ctx = webBg.getContext('2d');
let points = [];

function resizeCanvas() {
    webBg.width = window.innerWidth;
    webBg.height = window.innerHeight;
    initPoints();
}

function initPoints() {
    points = [];
    for (let i = 0; i < 40; i++) {
        points.push({
            x: Math.random() * webBg.width,
            y: Math.random() * webBg.height,
            vx: (Math.random()-0.5)*0.3,
            vy: (Math.random()-0.5)*0.3
        });
    }
}

function animateWeb() {
    ctx.clearRect(0,0,webBg.width,webBg.height);
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;

    points.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if(p.x<0||p.x>webBg.width) p.vx*=-1;
        if(p.y<0||p.y>webBg.height) p.vy*=-1;
    });

    for(let i=0;i<points.length;i++){
        for(let j=i+1;j<points.length;j++){
            const dx = points[i].x - points[j].x;
            const dy = points[i].y - points[j].y;
            const d = Math.hypot(dx,dy);
            if(d<160){
                ctx.beginPath();
                ctx.moveTo(points[i].x,points[i].y);
                ctx.lineTo(points[j].x,points[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateWeb);
}

window.addEventListener('resize',resizeCanvas);
resizeCanvas();
animateWeb();

// 顶部导航
const topBar = document.getElementById('topBar');
window.addEventListener('scroll',()=>{
    if(window.scrollY>60) topBar.classList.add('show');
    else topBar.classList.remove('show');
});

// 特性滚动显示
const featureItems = document.querySelectorAll('.feature-item');
const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>entry.target.classList.toggle('show',entry.isIntersecting));
},{threshold:0.1});
featureItems.forEach(item=>observer.observe(item));

// 按钮涟漪
const getBtn = document.getElementById('getBtn');
getBtn.addEventListener('click',e=>{
    const r = document.createElement('span');
    r.className='ripple';
    const rect=getBtn.getBoundingClientRect();
    r.style.left=e.clientX-rect.left+'px';
    r.style.top=e.clientY-rect.top+'px';
    getBtn.appendChild(r);
    setTimeout(()=>r.remove(),600);
    window.location.href='https://www.youbaopu.com/item/axa7ka';
});

// 点击粒子
document.addEventListener('click',e=>{
    for(let i=0;i<8;i++){
        const p=document.createElement('div');
        p.className='particle';
        p.style.left=e.clientX+'px';
        p.style.top=e.clientY+'px';
        const a=(Math.PI*2*i)/8;
        const dist=35+Math.random()*25;
        p.style.setProperty('--tx',Math.cos(a)*dist+'px');
        p.style.setProperty('--ty',Math.sin(a)*dist+'px');
        document.body.appendChild(p);
        setTimeout(()=>p.remove(),850);
    }
});

// 打字机
async function typeMainTitle(){
    const l1="绕过Stratix",l2="注入检测";
    const t=document.getElementById('mainTitle');
    t.innerHTML='';
    for(let c of l1){t.innerHTML+=c;await new Promise(r=>setTimeout(r,60));}
    t.innerHTML+='<br>';
    for(let c of l2){t.innerHTML+=c;await new Promise(r=>setTimeout(r,60));}
    const cur=document.createElement('span');
    cur.className='type-cursor';
    t.appendChild(cur);
    setTimeout(()=>cur.remove(),1200);
}

async function typeAdvantageLoop(){
    const el=document.getElementById('advantageType');
    const arr=["注入无检测","稳定不闪退","全设备兼容","自动秒发货"];
    while(1){
        for(let s of arr){
            for(let i=0;i<s.length;i++){
                el.innerHTML=s.slice(0,i+1)+'<span class="type-cursor"></span>';
                await new Promise(r=>setTimeout(r,70));
            }
            await new Promise(r=>setTimeout(r,1600));
            for(let i=s.length;i>=0;i--){
                el.innerHTML=s.slice(0,i)+'<span class="type-cursor"></span>';
                await new Promise(r=>setTimeout(r,40));
            }
            await new Promise(r=>setTimeout(r,300));
        }
    }
}

setTimeout(()=>{
    typeMainTitle();
    setTimeout(typeAdvantageLoop,1800);
},300);
