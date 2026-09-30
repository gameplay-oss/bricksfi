/* BricksFi front-end only — PRD §6-44. No backend. localStorage mock. */
const $=s=>document.querySelector(s);
const fmt=n=>"₦"+Number(n||0).toLocaleString("en-NG");
const fee=a=>Math.round((+a||0)*0.015);
const pct=(a,b)=>b?((a/b)*100):0;
let S=null; try{S=JSON.parse(localStorage.getItem("bricksfi_v1"))}catch(e){}
S=S||{user:null,kyc:"Not Started",balance:500000,invests:[],txns:[{id:1,t:"Wallet funded • Bank transfer",a:500000,d:"Today",s:"Success",cat:"Deposit"}],lessons:{},notifs:[{t:"Welcome to BricksFi",d:"Explore verified properties in Lagos & Accra.",time:"Today"}],payMethods:[{n:"GTBank •• 4521",d:"Bank"}],twoFA:false,bio:false};
function save(){localStorage.setItem("bricksfi_v1",JSON.stringify(S))}
let R={route:"splash",params:{},cat:"All",q:"",fMin:"",fMax:"",fYield:"",fStatus:"",pay:"Wallet balance",showF:false,seg:"avail",payM:0};
window.go=(r,p={})=>{R.route=r;R.params=p;render();const ph=$(".phone");if(ph)ph.scrollTop=0;window.scrollTo(0,0)};
window.toast=m=>{const ph=$(".phone");if(!ph)return;const d=document.createElement("div");d.className="toast";d.textContent=m;ph.appendChild(d);setTimeout(()=>d.remove(),2400)};
function notify(t,d){S.notifs.unshift({t,d,time:"Now"});save()}
function totals(){const inv=S.invests.reduce((a,b)=>a+b.amount,0);const cur=S.invests.reduce((a,b)=>a+Math.round(b.amount*1.09),0);return{inv,cur,ret:cur-inv}}
function initials(){if(!S.user||!S.user.name)return"B";return S.user.name.replace("@","").slice(0,1).toUpperCase()}

/* ---------- chrome ---------- */
function nav(on){
  const it=[["home","⌂","Home"],["marketplace","⊕","List"],["learn","🎓","Learn"],["portfolio","◑","Portfolio"]];
  return `<div class="nav">${it.map(([k,i,l])=>`<button class="${on===k?"on":""}" onclick="go('${k}')"><span class="ic">${i}</span>${l}</button>`).join("")}<div class="homebar"></div></div>`;
}
function flag(c){return c==="Ghana"?"🇬🇭":"🇳🇬"}
function topbar(showFilter){
  const nm=S.user?(S.user.full||S.user.name):"Kolawole O.";
  const parts=String(nm).replace(/^@/,"").split(" ");
  const short=parts.length>1?parts[0]+" "+parts[1][0]+".":parts[0];
  return `<div class="top"><div class="avatar" onclick="go('profile')" style="cursor:pointer">${initials()}</div><div onclick="go('profile')" style="font-weight:700;font-size:16px;cursor:pointer">${short} <span class="muted">›</span></div><div style="flex:1"></div><div class="iconbtn" onclick="go('notifications')">🔔</div>${showFilter?`<div class="iconbtn" onclick="R.showF=!R.showF;render()">🎚️</div>`:`<div class="iconbtn" onclick="go('search')">🔍</div>`}</div>`;
}

/* ---------- splash / onboard / auth / kyc ---------- */
function vSplash(){setTimeout(()=>go(S.user?(S.kyc==="Approved"?"home":"kyc"):"onboard"),1100);
return `<div class="phone"><div class="screen"><div class="splash"><div class="logo">🧱</div><h1 style="color:#fff;margin:0">BricksFi</h1><p style="color:#C8D5CF">Real Estate. Fractionalized.<br>Accessible.</p><div class="small mono" style="color:#8FB3A5">loading…</div></div></div></div>`}

function vOnboard(){const s=R.params.s||0;const steps=[
{t:"Discover",e:"🏘️",d:"Explore verified property opportunities across Africa with valuation, yield and documents."},
{t:"Invest",e:"🧩",d:"Purchase fractions from ₦25,000. Own tokens, track ownership % from your phone."},
{t:"Earn",e:"📈",d:"Track eligible income, property performance and distributions in one portfolio."}];
const c=steps[s];
return `<div class="phone"><div class="screen"><div class="card mt center" style="padding:32px 20px"><div style="font-size:56px">${c.e}</div><h1>${c.t}</h1><p class="muted">${c.d}</p><div class="dots">${steps.map((_,i)=>`<i class="${i===s?"on":""}"></i>`).join("")}</div>
${s<2?`<button class="btn btn-p" onclick="go('onboard',{s:${s+1}})">Next</button>`:`<button class="btn btn-p" onclick="go('auth')">Get Started</button>`}
<div class="small muted mt2" onclick="go('auth')" style="cursor:pointer">Skip</div></div></div></div>`}

function vAuth(){const m=R.params.m||"signup";
return `<div class="phone"><div class="screen"><h1>Welcome to<br>BricksFi</h1><p class="muted small">Own a fraction of African real estate from ₦25,000.</p>
<div class="tabs"><button class="${m==="signup"?"on":""}" onclick="go('auth',{m:'signup'})">Sign up</button><button class="${m==="login"?"on":""}" onclick="go('auth',{m:'login'})">Log in</button></div>
${m==="signup"?`<label>Full name</label><input id="n" value="Adaeze Okafor"><label>Email</label><input id="e" value="ada@example.com"><label>Phone</label><input id="p" value="+234 801 234 5678"><label>Country</label><select><option>Nigeria</option><option>Ghana</option><option>Kenya</option><option>UK</option></select><label>Password</label><input id="pw" type="password" value="password123"><button class="btn btn-p mt" onclick="doSignup()">Create account</button>`:`<label>Email</label><input id="e" value="ada@example.com"><label>Password</label><input type="password" value="password123"><button class="btn btn-p mt" onclick="doLogin()">Log in</button><div class="small muted center mt2">Biometric login available after setup</div>`}
<div class="banner green mt">🔒 Regulated flow: KYC required before investing. Projections are not guarantees.</div></div></div>`}
window.doSignup=()=>{const n=$("#n").value||"Investor";S.user={name:n.startsWith("@")?n:"@"+n.split(" ")[0].toLowerCase(),full:n};save();notify("Account created","Verify identity to unlock investing.");go("kyc")};
window.doLogin=()=>{if(!S.user)S.user={name:"@adaeze",full:"Adaeze Okafor"};save();go(S.kyc==="Approved"?"home":"kyc")};

function vKyc(){const st=S.kyc;const step=R.params.step||0;
const bar=`<div class="steps"><i class="on"></i><i class="${step>0||st!=="Not Started"?"on":""}"></i><i class="${step>1||st==="Approved"?"on":""}"></i></div>`;
if(st==="Approved")return `<div class="phone"><div class="screen"><h1>Verified ✓</h1><div class="banner green">Ownership verified • Valuation reviewed • Issuer verified. You can invest.</div><button class="btn btn-p mt" onclick="go('home')">Continue to Home</button></div></div>`;
if(st==="Under Review")return `<div class="phone"><div class="screen"><h1>Under review</h1><p class="muted small">Submitted → Under Review → Approved. Usually &lt; 24h.</p><div class="card">ID + selfie received.<br><span class="small muted">Reference KYC-${Date.now().toString().slice(-6)}</span></div><button class="btn btn-soft mt" onclick="S.kyc='Approved';save();notify('KYC approved','You can now invest.');go('home')">Simulate approval (demo)</button></div></div>`;
if(step===0)return `<div class="phone"><div class="screen">${bar}<h1>Verify identity to invest</h1><p class="muted small">Government ID + selfie. Keeps the community safe.</p><label>ID type</label><select id="idt"><option>National ID (NIN)</option><option>Passport</option><option>Driver's License</option><option>BVN</option></select><label>ID number</label><input value="1234-5678-9012"><button class="btn btn-p mt" onclick="go('kyc',{step:1})">Continue</button></div></div>`;
if(step===1)return `<div class="phone"><div class="screen">${bar}<h1>Address & suitability</h1><label>Residential address</label><input value="14 Admiralty Way, Lekki"><label>Employment</label><select><option>Employed</option><option>Self-employed</option><option>Student</option></select><label>Investment experience</label><select><option>Beginner</option><option>Experienced</option></select><button class="btn btn-p mt" onclick="go('kyc',{step:2})">Continue</button></div></div>`;
return `<div class="phone"><div class="screen">${bar}<h1>Selfie check</h1><p class="muted small">Liveness where required. We encrypt your data.</p><div class="card center">📸<br><span class="small muted">Tap to capture (demo)</span></div><button class="btn btn-p mt" onclick="S.kyc='Under Review';save();notify('KYC submitted','Under review.');go('kyc')">Submit for review</button></div></div>`}

/* ---------- home / market ---------- */
function propCard(p){
const roi=p.yieldNum?p.yieldNum+"%":"—";
return `<div class="prop" onclick="go('property',{id:'${p.id}'})"><div class="imgwrap"><img src="${p.img}"><div class="roi"><span class="up">↗</span> ${roi} <b>ROI</b></div><div class="dots"><i class="on"></i><i></i><i></i></div></div><div class="b">
<div class="meta"><span>🛏 ${p.beds||"—"}</span><span class="sep">|</span><span>🧾 ${p.tenure||"Rented"}</span><span class="sep">|</span><span class="flag">${flag(p.country)}</span><span>${p.city}, ${p.country}</span></div>
<h3>${p.name}, ${p.location}</h3>
<div class="small muted">Real rental income + on-chain ownership</div>
<div class="foot"><div><div class="lab">Starting at</div><div class="price">${fmt(p.unitPrice)} per token</div></div><div><div class="lab">Funded</div><div class="fv">${p.funded}%</div></div></div></div></div>`;
}
function vHome(){const t=totals();const feat=PROPERTIES.slice(0,3);
return `<div class="phone">${topbar()}<div class="screen">
<div class="hero-card"><div class="small" style="color:#C8D5CF">Total Portfolio • ${S.kyc==="Approved"?"✓ Verified":"⚠ "+S.kyc}</div><div class="bal">${fmt(t.cur||S.balance)}</div><div class="sub">Invested ${fmt(t.inv)} • Returns <span style="color:#4ADE80">+${fmt(t.ret)}</span></div>
<div class="row mt"><button class="btn btn-gold" onclick="go('marketplace')">Invest</button><button class="btn btn-w" onclick="go('deposit')">Deposit</button></div></div>
<div class="quick"><div class="qact" onclick="go('deposit')"><div class="i">↓</div>Deposit</div><div class="qact alt" onclick="go('withdraw')"><div class="i">↑</div>Withdraw</div><div class="qact" onclick="go('portfolio')"><div class="i">📊</div>Portfolio</div><div class="qact" onclick="go('learn')"><div class="i">📚</div>Learn</div></div>
<div class="row" style="align-items:center"><h3 style="margin:0">Featured properties</h3><span style="flex:1"></span><span class="small muted" onclick="go('marketplace')" style="cursor:pointer">See all ›</span></div>
<div class="mt2">${feat.map(propCard).join("")}</div>
<div class="card mt"><b>📚 New to fractional?</b><div class="small muted">What is tokenization? 3 min.</div><button class="btn btn-soft mt" onclick="go('lesson',{id:'l1'})">Explore Learn</button></div>
</div>${nav("home")}</div>`}

function filtered(){return PROPERTIES.filter(p=>
(CATS_OK(p))&&(!R.q||(p.name+p.location+p.city).toLowerCase().includes(R.q.toLowerCase()))&&
(R.seg==="avail"?p.status!=="Fully funded":R.seg==="funded"?p.status==="Fully funded":false)&&
(!R.fMin||p.minInvest>=+R.fMin)&&(!R.fMax||p.minInvest<=+R.fMax)&&(!R.fYield||p.yieldNum>=+R.fYield)&&(!R.fStatus||p.status===R.fStatus))}
function CATS_OK(p){return R.cat==="All"||p.type===R.cat}
function vMarket(){
const nA=PROPERTIES.filter(p=>p.status!=="Fully funded").length,nF=PROPERTIES.filter(p=>p.status==="Fully funded").length;
return `<div class="phone">${topbar(true)}<div class="screen">
<div class="seg"><button class="${R.seg==="avail"?"on":""}" onclick="R.seg='avail';render()">Available (${nA})</button><button class="${R.seg==="funded"?"on":""}" onclick="R.seg='funded';render()">Funded (${nF})</button><button class="${R.seg==="exited"?"on":""}" onclick="R.seg='exited';render()">Exited (0)</button></div>
${R.showF?`<input placeholder="Search — name, Lagos, Accra…" value="${R.q}" oninput="R.q=this.value;render()">
<div class="chips mt2">${CATEGORIES.map(c=>`<div class="chip ${R.cat===c?"on":""}" onclick="R.cat='${c}';render()">${c}</div>`).join("")}</div>
<div class="filterbox"><div class="tiny muted">Min / Max / Yield / Status</div><div class="row mt2"><input placeholder="Min ₦" value="${R.fMin}" oninput="R.fMin=this.value;render()"><input placeholder="Max ₦" value="${R.fMax}" oninput="R.fMax=this.value;render()"></div></div>`:""}
<div class="mt">${filtered().map(propCard).join("")||"<div class='card'>No matches. Clear filters.</div>"}</div>
<div class="card mt"><b>Secondary market</b><div class="small muted">Resale listings where supported. Liquidity not guaranteed.</div><button class="btn btn-soft mt" onclick="go('secondary')">View resale</button></div>
</div>${nav("marketplace")}</div>`}

/* ---------- property detail ---------- */
function vProp(){const p=PROPERTIES.find(x=>x.id===R.params.id);if(!p)return vMarket();const img=R.params.g||0;
const minTk=Math.max(1,Math.ceil(p.minInvest/p.unitPrice));let n=+R.params.tk||minTk;
const avail=p.units-Math.round(p.units*p.funded/100);
return `<div class="phone"><div class="screen" style="padding-top:0">
<div class="imgwrap" style="margin:0 -16px"><img src="${p.gallery[img]}" style="width:100%;height:380px;object-fit:cover;display:block;border-radius:0 0 24px 24px">
<div style="position:absolute;top:14px;left:16px"><button class="roundbtn" onclick="go('marketplace')">‹</button></div>
<div style="position:absolute;top:14px;right:16px;display:flex;gap:10px"><button class="roundbtn" onclick="toast('Saved to wishlist')">🔖</button><button class="roundbtn" onclick="toast('Support opening…')">?</button></div>
<div class="dots"><i class="on"></i><i></i><i></i></div></div>
<h2 style="font-size:21px;margin-top:14px">${p.name}, ${p.location}</h2>
<div class="meta" style="padding-top:0"><span>🛏 ${p.beds||"—"}</span><span class="sep">|</span><span>🧾 ${p.tenure||"Rented"}</span><span class="sep">|</span><span class="flag">${flag(p.country)}</span><span>${p.country}</span><span class="sep">|</span><span>📐 ${p.area||p.size}</span></div>
<div class="tourrow"><button class="tour" onclick="toast('3D tour opening…')"><span class="tag">3D</span> Tour</button><button class="tour" onclick="toast('3D tour opening…')"><span class="tag">3D</span> Tour</button><button class="tour" onclick="R.params.g=(${(img+1)})%${p.gallery.length};render()">🖼 ${p.gallery.length+10} Photos</button></div>
<div class="fin"><div class="kv"><span>Yearly investment return</span><b>${p.yieldNum?p.yieldNum+"%":"—"} <span class="info">i</span></b></div><div class="kv"><span>Price</span><b>${fmt(p.valuation)} <span class="info">i</span></b></div><div class="kv"><span>Current Valuation</span><b>${fmt(Math.round(p.valuation*1.02))} <span class="info">i</span></b></div></div>
<div class="card mt"><b>How it works</b><div class="row mt2 small"><div><b>1. Verify</b><div class="muted">KYC once</div></div><div><b>2. Fund</b><div class="muted">Wallet top-up</div></div><div><b>3. Own</b><div class="muted">Tokens + income</div></div></div></div>
<div class="card mt"><div class="kv"><span>🏢 Floors</span><b>${p.beds||"—"}</b></div><div class="kv"><span>Type / Status</span><b>${p.type} • ${p.devStatus}</b></div><div class="kv"><span>Occupancy</span><b>${p.occupancy}</b></div></div>
<div class="card mt"><b>Developer</b><p class="small muted">${p.developer} — verified issuer. ${p.desc}</p><div class="check"><div class="c">✓</div><div>Ownership verified • Valuation reviewed • Inspection completed</div></div></div>
<div class="mt"><b>🧾 Documents (${p.docs.length})</b>${p.docs.map(d=>`<div class="docrow" onclick="toast('Opening document…')"><div class="pdf">📄</div><div class="t">${d.n}</div><span class="ext">PDF ›</span></div>`).join("")}</div>
<div class="card mt center"><b>Have more questions about this property?</b><div class="small muted">Contact our real estate experts</div><button class="btn btn-soft mt" onclick="toast('Chat opening…')">💬 Message us</button></div>
<div class="investbar"><div class="row"><div class="stepper"><button onclick="R.params.tk=Math.max(${minTk},${n}-1);render()">−</button><b>${n}</b><button onclick="R.params.tk=Math.min(${avail},${n}+1);render()">+</button></div><button class="investbtn" ${p.status==="Fully funded"?"disabled":""} onclick="go('invest',{id:'${p.id}',tokens:${n}})">${p.status==="Fully funded"?"Funded":"Invest"}</button></div><div class="total">= ${fmt(n*p.unitPrice)}</div><div class="homebar"></div></div>
</div></div>`}

/* ---------- invest flow §19 ---------- */
function vInvest(){const p=PROPERTIES.find(x=>x.id===R.params.id);if(!p)return vMarket();
const minTk=Math.max(1,Math.ceil(p.minInvest/p.unitPrice));let n=Math.max(0,+R.params.tokens||minTk);
const methods=["Wallet balance","Bank transfer","Debit card"];const m=methods[R.payM%methods.length];
return `<div class="phone"><div class="screen"><div class="small" onclick="go('property',{id:p.id})" style="cursor:pointer">‹</div>
<div class="bigcount"><span class="n">${n}</span> <span class="u">token</span><div class="eq">⬇ ${fmt(n*p.unitPrice)}</div></div>
<div class="card mt"><div class="row" style="align-items:center"><img src="${p.img}" style="width:56px;height:56px;border-radius:14px;object-fit:cover"><div style="flex:1"><b>${p.name}</b><div class="small muted">🛏 ${p.beds||"—"} &nbsp;|&nbsp; ${flag(p.country)} ${p.country}</div></div><div style="text-align:right"><b>${fmt(p.valuation)}</b><div class="small muted">${fmt(p.unitPrice)} per token</div></div></div></div>
<div class="payrow" onclick="R.payM=(R.payM+1)%3;R.pay=R.payM===0?'Wallet balance':R.payM===1?'Bank transfer':'Debit card';render()"><div class="pic">💳</div><div style="flex:1"><b>Pay with</b><div class="small muted">${m} • Balance ${fmt(S.balance)}</div></div><span>›</span></div>
<button class="btn btn-p mt" onclick="go('review',{id:'${p.id}',tokens:${n}})">Preview</button>
<div class="keypad2">${[1,2,3,4,5,6,7,8,9].map(d=>`<button onclick="keyTok(${d})">${d}</button>`).join("")}<button onclick="keyTok('.')">.</button><button onclick="keyTok(0)">0</button><button onclick="keyTok('c')">⌫</button></div>
</div></div>`}
window.keyTok=d=>{const p=PROPERTIES.find(x=>x.id===R.params.id);const minTk=Math.max(1,Math.ceil(p.minInvest/p.unitPrice));let s=String(R.params.tokens||minTk);if(d==="c")s=s.slice(0,-1)||"0";else s=(s==="0"?String(d):s+String(d)).slice(0,5);R.params.tokens=Math.max(0,+s||0);render()};

function vReview(){const p=PROPERTIES.find(x=>x.id===R.params.id);const u=Math.max(1,+R.params.tokens||Math.ceil(p.minInvest/p.unitPrice));const a=u*p.unitPrice;const f=fee(a);const t=a+f;
return `<div class="phone"><div class="screen"><div class="small" onclick="go('invest',{id:p.id,tokens:u})">‹ Edit amount</div><div class="steps"><i class="on"></i><i class="on"></i><i></i></div>
<h1 class="center">Review — ${fmt(t)}</h1><div class="card"><div class="kv"><span>Property</span><b>${p.name}</b></div><div class="kv"><span>Investment</span><b>${fmt(a)}</b></div><div class="kv"><span>Tokens</span><b>${u} @ ${fmt(p.unitPrice)}</b></div><div class="kv"><span>Ownership</span><b>${(u/p.units*100).toFixed(3)}%</b></div><div class="kv"><span>Platform fee (1.5%)</span><b>${fmt(f)}</b></div><div class="kv"><span>Total</span><b>${fmt(t)}</b></div></div>
<label>Payment method</label><select onchange="R.pay=this.value;render()">${["Wallet balance","Bank transfer","Debit card"].map(m=>`<option ${R.pay===m?"selected":""}>${m}</option>`).join("")}</select>
<div class="small muted mt2">Balance ${fmt(S.balance)} ${t>S.balance?"• ⚠ insufficient — deposit first":"• sufficient ✓"}</div>
<div class="banner green mt">You're about to invest ${fmt(t)} in ${p.name}. What happens next: tokens → Portfolio instantly.</div>
<div class="row mt"><button class="btn btn-soft" onclick="go('invest',{id:p.id,tokens:u})">Cancel</button><button class="btn btn-p" onclick="doPay('${p.id}',${a})">Confirm • ${fmt(t)}</button></div></div></div>`}
window.doPay=(id,a)=>{const p=PROPERTIES.find(x=>x.id===id);const t=a+fee(a);
if(S.kyc!=="Approved"){toast("Verify identity first");go("kyc");return}
if(S.balance<t){toast("Insufficient — deposit");go("deposit");return}
S.balance-=t;const u=Math.floor(a/p.unitPrice);const inv={id:Date.now(),propId:id,amount:a,units:u,fee:fee(a),date:"Today",tx:"BRX-"+Math.random().toString(16).slice(2,8).toUpperCase()};
S.invests.push(inv);S.txns.unshift({id:Date.now(),t:`Invest • ${p.name}`,a:-t,d:"Today",s:"Success",cat:"Investment"});notify("Investment successful",`${u} tokens of ${p.name} added.`);save();go("success",{id:inv.id})};

function vSuccess(){const inv=S.invests.find(x=>x.id==R.params.id);if(!inv)return vHome();const p=PROPERTIES.find(x=>x.id===inv.propId);
return `<div class="phone"><div class="screen center"><div class="steps"><i class="on"></i><i class="on"></i><i class="on"></i></div><div style="font-size:60px">🎉</div><span class="pill g">✓ Investment Successful</span><h1>${inv.units} tokens added</h1><p class="muted small">${p.name} • ${(inv.units/p.units*100).toFixed(3)}% • Ref ${inv.tx}</p><div class="card" style="text-align:left"><img src="${p.img}" style="width:100%;height:150px;object-fit:cover;border-radius:12px"><div class="kv"><span>Invested</span><b>${fmt(inv.amount)}</b></div><div class="kv"><span>Current value</span><b class="up">${fmt(Math.round(inv.amount*1.09))}</b></div></div><div class="row mt"><button class="btn btn-soft" onclick="go('property',{id:p.id})">View asset</button><button class="btn btn-p" onclick="go('portfolio')">View Portfolio</button></div></div></div>`}

/* ---------- portfolio ---------- */
function vPort(){const t=totals();const byType={};S.invests.forEach(v=>{const p=PROPERTIES.find(x=>x.id===v.propId);byType[p.type]=(byType[p.type]||0)+v.amount});
const tot=t.inv||1;const colors={Residential:"#0B2E23",Commercial:"#C9A86A",Hospitality:"#12994A",Land:"#98A2B3","Mixed-use":"#175CD3"};
const segs=Object.entries(byType);let acc=0;const grad=segs.length?`conic-gradient(${segs.map(([k,v])=>{const s=`${colors[k]||"#333"} ${acc/tot*100}% ${(acc+=v)/tot*100}%`;return s}).join(",")})`:"#EDEBE4";
return `<div class="phone">${topbar()}<div class="screen">
<div class="card"><div class="tiny muted">TOTAL PORTFOLIO VALUE</div><div style="font-size:30px;font-weight:800">${fmt(t.cur)}</div><div class="small">Invested ${fmt(t.inv)} • <span class="up">+${fmt(t.ret)} returns</span></div>
<div class="alloc-bar">${segs.map(([k,v])=>`<div style="flex:${v};background:${colors[k]||"#333"}"></div>`).join("")||'<div style="flex:1;background:#EDEBE4"></div>'}</div>
<div class="small muted">${segs.map(([k,v])=>`${k} ${Math.round(v/tot*100)}%`).join(" • ")||"Residential 0% • No holdings yet"}</div></div>
<h3>Your investments</h3>${S.invests.map(v=>{const p=PROPERTIES.find(x=>x.id===v.propId);return `<div class="tok" onclick="go('investDetail',{id:${v.id}})"><img src="${p.img}"><div class="n"><b>${p.name}</b><div class="small muted">${v.units} tokens • ${(v.units/p.units*100).toFixed(3)}%</div></div><div style="text-align:right"><b>${fmt(Math.round(v.amount*1.09))}</b><div class="small up">+${fmt(Math.round(v.amount*.09))}</div></div></div>`}).join("")||`<div class="card center">No investments yet.<br><button class="btn btn-p mt" onclick="go('marketplace')">Explore properties</button></div>`}
<div class="card mt"><b>Returns & distributions</b><div class="small muted">Next payout Sep 30 where applicable</div><div class="kv"><span>Rental — The Stables</span><b class="up">+₦84,500 • Paid</b></div></div>
</div>${nav("portfolio")}</div>`}

function vDetail(){const v=S.invests.find(x=>x.id==R.params.id);if(!v)return vPort();const p=PROPERTIES.find(x=>x.id===v.propId);const cur=Math.round(v.amount*1.09);
const bars=[12,28,20,45,38,60,52,78,70,95].map(h=>`<i style="height:${h}px"></i>`).join("");
return `<div class="phone"><div class="screen"><div class="small" onclick="go('portfolio')">‹ Portfolio</div><h2>${p.name}</h2>
<div class="card"><div class="tiny muted">CURRENT VALUE</div><div style="font-size:28px;font-weight:800">${fmt(cur)} <span class="small up">+${fmt(cur-v.amount)}</span></div><div class="chart">${bars}</div><div class="tiny muted">Performance • Investment value vs property value</div></div>
<div class="grid2 mt"><div class="stat"><div class="l">Tokens</div><div class="v">${v.units}</div></div><div class="stat"><div class="l">Ownership</div><div class="v">${(v.units/p.units*100).toFixed(3)}%</div></div><div class="stat"><div class="l">Avg price</div><div class="v">${fmt(Math.round(v.amount/v.units))}</div></div><div class="stat"><div class="l">Yield</div><div class="v up">${p.yield}</div></div></div>
<div class="card mt"><b>Income</b><div class="kv"><span>Rental distribution</span><b class="up">+₦12,400 • Paid</b></div><div class="kv"><span>Next distribution</span><b>Sep 30</b></div></div>
<div class="card mt"><b>Transactions</b><div class="kv"><span>Purchase • ${v.date}</span><b>-${fmt(v.amount+v.fee)}</b></div><div class="kv"><span>Ref</span><b class="mono small">${v.tx}</b></div></div>
<div class="row mt"><button class="btn btn-soft" onclick="go('property',{id:p.id})">Asset page</button><button class="btn btn-gold" onclick="go('sell',{id:${v.id}})">Sell tokens</button></div></div></div>`}

/* ---------- wallet ---------- */
function vWallet(){const t=totals();
return `<div class="phone">${topbar()}<div class="screen">
<div class="hero-card"><div class="small" style="color:#C8D5CF">Available balance</div><div class="bal">${fmt(S.balance)}</div><div class="sub">Invested ${fmt(t.inv)} • Pending ₦0</div><div class="row mt"><button class="btn btn-gold" onclick="go('deposit')">Deposit</button><button class="btn btn-w" onclick="go('withdraw')">Withdraw</button></div></div>
<div class="tabs"><button class="on">Transactions</button><button onclick="go('txns')">See all</button></div>
${S.txns.slice(0,8).map(x=>`<div class="txn"><div class="ic">${x.a<0?"📤":"📥"}</div><div style="flex:1"><b style="font-size:13px">${x.t}</b><div class="tiny muted">${x.d} • ${x.s} • ${x.cat||""}</div></div><b style="font-size:13px" class="${x.a<0?"":"up"}">${x.a<0?"-":"+"}${fmt(Math.abs(x.a)).slice(1)===""?"":fmt(Math.abs(x.a))}</b></div>`).join("")}
</div>${nav("wallet")}</div>`}
function vDeposit(){const s=R.params.s||0;
if(s===0)return `<div class="phone"><div class="screen"><div class="small" onclick="go('wallet')">‹ Wallet</div><h1>Deposit</h1><label>Amount</label><input id="a" type="number" value="100000"><div class="chips mt2">${[50000,100000,250000].map(v=>`<div class="chip" onclick="document.querySelector('#a').value=${v}">${fmt(v)}</div>`).join("")}</div><label>Method</label><select><option>Bank transfer</option><option>Debit card</option></select><button class="btn btn-p mt" onclick="R.params.a=+document.querySelector('#a').value;go('deposit',{s:1})">Review</button></div></div>`;
const a=+R.params.a||100000;
return `<div class="phone"><div class="screen"><h1>Confirm • ${fmt(a)}</h1><div class="card"><div class="kv"><span>Amount</span><b>${fmt(a)}</b></div><div class="kv"><span>Fee</span><b>Free</b></div><div class="kv"><span>Arrives</span><b>Instant (demo)</b></div></div><button class="btn btn-p mt" onclick="S.balance+=${a};S.txns.unshift({id:Date.now(),t:'Deposit • Bank',a:${a},d:'Today',s:'Success',cat:'Deposit'});notify('Deposit successful','${fmt(a)} added.');save();go('wallet')">Confirm deposit</button></div></div>`}
function vWithdraw(){
return `<div class="phone"><div class="screen"><div class="small" onclick="go('wallet')">‹ Wallet</div><h1>Withdraw</h1><div class="small muted">Balance ${fmt(S.balance)} • Fee ₦0 • 1-2 days</div><label>Amount</label><input id="a" type="number" value="50000"><label>Destination</label><select><option>GTBank •• 4521</option><option>Add bank…</option></select><button class="btn btn-p mt" onclick="const v=+document.querySelector('#a').value;if(v>S.balance){toast('Insufficient');return}S.balance-=v;S.txns.unshift({id:Date.now(),t:'Withdrawal • Bank',a:-v,d:'Today',s:'Pending',cat:'Withdrawal'});notify('Withdrawal pending','Processing.');save();go('wallet')">Confirm withdrawal</button></div></div>`}
function vTxns(){return `<div class="phone"><div class="screen"><div class="small" onclick="go('wallet')">‹ Wallet</div><h1>Transactions</h1>${S.txns.map(x=>`<div class="kv"><span>${x.t}<br><small class="muted">${x.d} • ${x.s}</small></span><b>${fmt(x.a)}</b></div>`).join("")}</div></div>`}

/* ---------- learn / notifs / profile / secondary ---------- */
function vLearn(){return `<div class="phone">${topbar()}<div class="screen"><div class="chips">${["All","Real Estate","Tokenization","Investing","Platform"].map(c=>`<div class="chip" onclick="toast('${c}')">${c}</div>`).join("")}</div>${LESSONS.map(l=>`<div class="tok" onclick="go('lesson',{id:'${l.id}'})"><div class="file" style="width:48px;height:48px;border-radius:12px;background:var(--accent-soft);display:flex;align-items:center;justify-content:center">📚</div><div class="n"><b>${l.title}</b><div class="small muted">${l.cat} • ${l.mins} min ${S.lessons[l.id]?"• ✓ read":""}</div></div><span>›</span></div>`).join("")}</div>${nav("learn")}</div>`}
function vLesson(){const l=LESSONS.find(x=>x.id===R.params.id);return `<div class="phone"><div class="screen"><div class="small" onclick="go('learn')">‹ Learn</div><span class="pill gold">${l.cat} • ${l.mins} min</span><h1>${l.title}</h1><div class="card">${l.body}</div><div class="banner green mt">Never invest in what you don't understand. What you own, how you earn, risks, fees, exit — all on the asset page.</div><button class="btn btn-p mt" onclick="S.lessons['${l.id}']=1;save();go('marketplace')">Explore opportunities</button></div></div>`}
function vNotifs(){return `<div class="phone"><div class="screen"><div class="small" onclick="go('home')">‹ Home</div><h1>Notifications</h1>${S.notifs.map(n=>`<div class="card mt"><b>${n.t}</b><div class="small muted">${n.d} • ${n.time}</div></div>`).join("")}</div></div>`}
function vProfile(){return `<div class="phone">${topbar()}<div class="screen">
<div class="card"><div class="row" style="align-items:center"><div class="avatar" style="width:48px;height:48px">${initials()}</div><div><b>${S.user?S.user.full:"Guest"}</b><div class="small muted">${S.user?S.user.name:""} • ${S.kyc}</div></div></div></div>
<div class="card mt"><b>Account</b>${[["Personal info","profileEdit"],["Verification — "+S.kyc,"kyc"],["Payment methods","pay"],["Documents & statements","docs"]].map(([t,r])=>`<div class="doc" onclick="go('${r}')"><div style="flex:1">${t}</div><span>›</span></div>`).join("")}</div>
<div class="card mt"><b>Security</b><div class="kv"><span>Biometrics</span><b onclick="S.bio=!S.bio;save();render()" style="cursor:pointer">${S.bio?"On ✓":"Off"}</b></div><div class="kv"><span>2FA</span><b onclick="S.twoFA=!S.twoFA;save();render()" style="cursor:pointer">${S.twoFA?"On ✓":"Off"}</b></div><div class="doc" onclick="toast('Password reset link sent')"><div style="flex:1">Change password</div><span>›</span></div></div>
<div class="card mt"><b>Support</b><div class="doc" onclick="go('support')"><div style="flex:1">Help center & FAQs</div><span>›</span></div><div class="doc" onclick="toast('Chat opening…')"><div style="flex:1">Contact support</div><span>›</span></div></div>
<button class="btn btn-soft mt" onclick="localStorage.removeItem('bricksfi_v1');location.reload()">Log out (reset demo)</button>
</div>${nav("profile")}</div>`}
function vSecondary(){return `<div class="phone"><div class="screen"><div class="small" onclick="go('marketplace')">‹ Market</div><h1>Secondary market</h1><div class="banner">Liquidity is not guaranteed. Sales need buyers. Demo prices only.</div>${SECONDARY.map((s,i)=>{const p=PROPERTIES.find(x=>x.id===s.propId);return `<div class="card mt"><b>${p.name} • ${s.units} units</b><div class="small muted">${fmt(s.pricePer)}/token by ${s.seller}</div><button class="btn btn-p mt" onclick="toast('Offer sent to seller')">Make offer</button></div>`}).join("")}</div></div>`}
function vSell(){const v=S.invests.find(x=>x.id==R.params.id);if(!v)return vPort();const p=PROPERTIES.find(x=>x.id===v.propId);
return `<div class="phone"><div class="screen"><div class="small" onclick="go('investDetail',{id:v.id})">‹ Investment</div><h1>Sell ${v.units} tokens?</h1><div class="card"><div class="kv"><span>Asset</span><b>${p.name}</b></div><div class="kv"><span>Quantity</span><b>${v.units}</b></div><div class="kv"><span>List price</span><b>${fmt(p.unitPrice)}</b></div><div class="kv"><span>You receive (est)</span><b>${fmt(v.amount)}</b></div></div><div class="banner mt">No buyers guarantee. Listing stays active until filled or cancelled.</div><button class="btn btn-gold mt" onclick="toast('Listing live (demo)');notify('Listing active','${p.name} listed.');go('portfolio')">Confirm listing</button></div></div>`}

/* ---------- misc ---------- */
function vSearch(){return `<div class="phone"><div class="screen"><div class="small" onclick="go('home')">‹</div><h1>Search</h1><input placeholder="Lagos, villa, commercial…" value="${R.q}" oninput="R.q=this.value;render()"><div class="mt">${filtered().slice(0,4).map(propCard).join("")}</div></div></div>`}

/* ---------- render ---------- */
function render(){const el=document.querySelector("#app");const r=R.route;let h="";
if(r==="splash")h=vSplash();else if(r==="onboard")h=vOnboard();else if(r==="auth")h=vAuth();else if(r==="kyc")h=vKyc();
else if(r==="home")h=vHome();else if(r==="marketplace")h=vMarket();else if(r==="property")h=vProp();
else if(r==="invest")h=vInvest();else if(r==="review")h=vReview();else if(r==="success")h=vSuccess();
else if(r==="portfolio")h=vPort();else if(r==="investDetail")h=vDetail();
else if(r==="wallet")h=vWallet();else if(r==="deposit")h=vDeposit();else if(r==="withdraw")h=vWithdraw();else if(r==="txns")h=vTxns();
else if(r==="learn")h=vLearn();else if(r==="lesson")h=vLesson();else if(r==="notifications")h=vNotifs();
else if(r==="profile")h=vProfile();else if(r==="secondary")h=vSecondary();else if(r==="sell")h=vSell();
else if(r==="search")h=vSearch();
else if(r==="pay")h=`<div class="phone"><div class="screen"><div class="small" onclick="go('profile')">‹</div><h1>Payment methods</h1>${S.payMethods.map(m=>`<div class="card mt"><b>${m.n}</b><div class="small muted">${m.d}</div></div>`).join("")}<button class="btn btn-soft mt" onclick="S.payMethods.push({n:'New bank •• '+(1000+Math.floor(Math.random()*9000)),d:'Bank'});save();render()">+ Add bank</button></div></div>`;
else if(r==="docs")h=`<div class="phone"><div class="screen"><div class="small" onclick="go('profile')">‹</div><h1>Documents</h1><div class="card">${S.invests.map(v=>{const p=PROPERTIES.find(x=>x.id===v.propId);return `<div class="doc"><div class="file">📄</div><div style="flex:1"><b>SPV certificate — ${p.name}</b><div class="tiny muted">${v.tx} • ${v.units} units</div></div></div>`}).join("")||"No investment documents yet."}</div></div></div>`;
else if(r==="support")h=`<div class="phone"><div class="screen"><div class="small" onclick="go('profile')">‹</div><h1>Help center</h1><div class="card"><b>How do I exit?</b><div class="small muted">Via secondary market where supported. No guarantee of buyers.</div></div><div class="card mt"><b>When are payouts?</b><div class="small muted">Rental assets pay quarterly/monthly per asset page.</div></div><div class="card mt"><b>What do tokens represent?</b><div class="small muted">Beneficial interest in the SPV that owns the property.</div></div></div></div>`;
else if(r==="profileEdit")h=`<div class="phone"><div class="screen"><div class="small" onclick="go('profile')">‹</div><h1>Personal info</h1><label>Full name</label><input id="fn" value="${S.user?S.user.full:""}"><button class="btn btn-p mt" onclick="S.user.full=document.querySelector('#fn').value;save();go('profile')">Save</button></div></div>`;
else h=vHome();
el.innerHTML=h.replace('<div class="phone">','<div class="phone"><div class="statusbar"><span>9:41</span><span class="sicons">📶&nbsp;&nbsp;🔋</span></div>')}
render();
