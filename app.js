const $=s=>document.querySelector(s);
const fmt=n=>"₦"+Number(n||0).toLocaleString("en-NG");
let S=JSON.parse(localStorage.getItem("bricksfi_w3")||"null")||{user:null,kyc:"Not Started",balance:500000,txns:[{t:"Mint • USDC",a:500000,d:"today",s:"Success"}],invests:[],lessons:{},seed:["bright","twin","step","february","height","ability","orbit","vault","casa","lagos","brick","mint"]};
function save(){localStorage.setItem("bricksfi_w3",JSON.stringify(S))}
let R={route:"splash",params:{},tab:"Tokens",q:""};
window.S=S;window.R=R;window.save=save;window.toast=toast;window.fee=fee;
function toast(m){const d=document.createElement("div");d.className="toast";d.textContent=m;document.body.appendChild(d);setTimeout(()=>d.remove(),2400)}
function go(r,p={}){R.route=r;R.params=p;render();window.scrollTo(0,0)}
function fee(a){return Math.round(a*.015)}
function short(a){return a?a.slice(0,6)+"..."+a.slice(-4):"0xBRIX...Fi"}
function nav(on){const it=[["home","🏠","Home"],["marketplace","🌐","Market"],["portfolio","📊","Earn"],["learn","📚","Learn"],["wallet","⚡","Wallet"]];
return `<div class="nav">${it.map(([k,i,l])=>`<button class="${on===k?"on":""}" onclick="go('${k}')"><span class="ic">${i}</span>${l}</button>`).join("")}</div>`}
function topbar(){return `<div class="top"><div class="addr" onclick="go('wallet')">🟣 ${short(S.user?S.user.wallet:"0xBricksFiBase")} ⧉</div><div style="flex:1"></div><div class="addr" onclick="go('search')">🔍</div><div class="addr" onclick="go('notifications')">🔔</div></div>`}
window.go=go;
function tokRow(p){const up=p.yieldNum>0;return `<div class="tok" onclick="go('property',{id:'${p.id}'})">
<img src="${p.img}"><div class="n"><b>${p.name}</b> <span class="badge p">RWA</span><div class="small muted">${Math.floor(p.valuation/p.unitPrice).toLocaleString()} supply • ${p.network}</div></div>
<div style="text-align:right"><b>${fmt(p.unitPrice)}</b><div class="small ${up?"up":"muted"}">${up?"▲ "+p.yield+" APY":"floor"}</div></div></div>`}
// --- screens ---
function vSplash(){setTimeout(()=>go(S.user?"home":"onboard"),1000);return `<div class="phone"><div class="screen center" style="padding-top:120px"><div style="font-size:64px">👻</div><h1>BricksFi</h1><p class="muted">Web3 fractional real estate • Base</p><div class="small muted mono">connecting…</div></div></div>`}
function vOnboard(){const s=R.params.s||0;
if(s===0)return `<div class="phone"><div class="screen center" style="padding-top:60px"><div style="font-size:50px">🔒</div><h2>Protect Your Vault</h2><p class="muted">Adding biometric security ensures only you access your bricks.</p><div class="card" style="text-align:left">👤 Face ID <span style="float:right">Use Face Authentication ○</span></div><button class="btn btn-acc mt" onclick="go('onboard',{s:1})">Next</button></div></div>`;
if(s===1)return `<div class="phone"><div class="screen" style="padding-top:40px"><h2 class="center">Create Username</h2><p class="muted center">Personalize your vault. Can be changed later.</p><label>Username</label><input id="u" value="@bricklord"><div class="small up mt">✓ Username available</div><button class="btn btn-acc mt" onclick="S.user={name:document.getElementById('u').value,wallet:'0xDEAFfB8876543210BricksFi'};save();go('onboard',{s:2})">Continue</button></div></div>`;
if(s===2)return `<div class="phone"><div class="screen" style="padding-top:30px"><h2 class="center">Save Recovery Phrase</h2><p class="muted center">Get Pen & Paper. Write down 12 words. Never screenshot.</p><div class="seed mt">${S.seed.map(w=>`<div>${w}</div>`).join("")}</div><button class="btn btn-y mt" onclick="go('onboard',{s:3})">I wrote it down</button><div class="center small muted mt" onclick="go('kyc',{step:0})">Skip → KYC</div></div></div>`;
return `<div class="phone"><div class="screen" style="padding-top:30px"><h2>Confirm Recovery Phrase</h2><p class="muted">What is the 3rd word?</p>${["bright","twin","step"].map((w,i)=>`<div class="card mt" onclick="toast('${i===2?"Correct ✓":"Oops, try again!"}');if(${i===2})go('kyc',{step:0})" style="cursor:pointer">${w} <span style="float:right">${i===2?"🟡":"○"}</span></div>`).join("")}</div></div>`}
function vKyc(){return `<div class="phone"><div class="screen" style="padding-top:30px"><h2>Verify identity to mint</h2><p class="muted">KYC + wallet link. Keeps community safe.</p><label>ID type</label><select><option>National ID</option><option>Passport</option><option>Driver License</option></select><label>Document + selfie</label><input type="file"><button class="btn btn-w mt" onclick="S.kyc='Verified';save();toast('Verified ✓ 0x proof minted');go('home')">Continue</button><div class="center small muted mt">How verification works</div></div></div>`}
function vHome(){const inv=S.invests.reduce((a,b)=>a+b.amount,0);
return `<div class="phone">${topbar()}<div class="screen"><div class="small muted">Main Vault <span class="badge g"><span class="dot"></span> Base</span></div>
<div class="bal">${fmt(S.balance+Math.round(inv*1.09))}</div><div class="sub">-$0.27 -1.84% • ${S.kyc} • ${short("0xDEAF")}</div>
<div class="acts"><div class="act" onclick="go('deposit')"> <div class="i">↓</div>Receive</div><div class="act" onclick="go('deposit')"><div class="i">💳</div>Buy</div><div class="act hot" onclick="go('marketplace')"><div class="i">⇄</div>Swap</div><div class="act" onclick="go('portfolio')"><div class="i">🏦</div>Stake</div><div class="act" onclick="go('withdraw')"><div class="i">➤</div>Send</div></div>
<div class="tabs">${["Tokens","NFTs","DeFi","Activity"].map(t=>`<button class="${R.tab===t?"on":""}" onclick="R.tab='${t}';render()">${t}</button>`).join("")}<span style="flex:1"></span><span class="small muted">View all ›</span></div>
${PROPERTIES.map(tokRow).join("")}
<div class="card mt"><b>Staking</b><div class="small muted">No accounts</div><button class="btn btn-y mt" onclick="go('portfolio')">Start earning ~7%</button></div>
</div>${nav("home")}</div>`}
function vMarket(){let l=PROPERTIES.filter(p=>!R.q||(p.name+p.location).toLowerCase().includes(R.q.toLowerCase()));
return `<div class="phone">${topbar()}<div class="screen"><h2>My assets → RWA Market</h2><div class="small muted">Floor • 24H Vol • Royalties on-chain</div>
<input class="mt" placeholder="Search items — Lagos, Abuja…" value="${R.q}" oninput="R.q=this.value;render()">
<div class="mt">${l.map(p=>`<div class="nft" onclick="go('property',{id:'${p.id}'})"><img src="${p.img}"><div class="b"><span class="badge g">● ${p.funded}% minted</span><div class="mt"><b>${p.name}</b></div><div class="small muted">Floor: ${fmt(p.unitPrice)} • Best: ${p.yield} APY • ${p.investors} believers</div><div class="row mt"><button class="btn btn-g">Make offer</button><button class="btn btn-w">Buy</button></div></div></div>`).join("")}</div>
<div class="card mt"><b>Earn Hub — Stablecoin Earn</b><div class="small muted">USDT 4.04% • USDC 5.56% • Learn more ›</div></div>
</div>${nav("marketplace")}</div>`}
function vProp(){const p=PROPERTIES.find(x=>x.id===R.params.id);const avail=p.units-Math.round(p.units*p.funded/100);
return `<div class="phone"><div class="screen"><div onclick="go('marketplace')" style="cursor:pointer">‹ ${p.name}</div>
<div class="hero mt"><img src="${p.img}"></div>
<div class="card mt"><div class="small muted mono">Mint Address 8c38m...hZ5zr • Chain Base • Royalties 10%</div><h2 style="margin:6px 0">${p.name}</h2>
<div class="small muted">Owner SPV ${short("0xSPV")} • Creator ${p.developer}</div>
<div class="traits mt">${[p.type,p.duration,p.occupancy+" occ",p.yield+" APY"].map(t=>`<div class="trait">${t}</div>`).join("")}</div>
<p class="small">${p.desc}</p>
<div class="kv"><span>Floor / unit</span><b>${fmt(p.unitPrice)}</b></div><div class="kv"><span>24H change</span><b class="up">+${p.funded/10}%</b></div><div class="kv"><span>Total volume</span><b>${fmt(p.valuation)}</b></div>
<div class="kv"><span>Contract</span><b class="mono small">${short("0xBricksFiBASE01")} ⧉</b></div>
<div class="kv"><span>Network fee</span><b>~$1.86 • MEV Protected ✓</b></div>
<div class="prog mt"><i style="width:${p.funded}%"></i></div><div class="small muted">${p.funded}% minted • ${avail.toLocaleString()} left</div>
<h3>Price history</h3><div class="card">📈 Floor ${fmt(p.unitPrice)} • ATH ${fmt(p.unitPrice*1.3)} <span class="badge g">8.97% ↗</span></div>
<h3>Recent Activity <span style="float:right" class="small">View All ›</span></h3><div class="small mono muted"># AMRF…877Uz Success • # 4Zpe…9GGn2 Success</div>
<div class="row mt"><button class="btn btn-g" onclick="toast('Offer placed')">Make offer</button><button class="btn ${p.status!=="OpenFunding"?"btn-g":"btn-y"}" ${p.status!=="OpenFunding"?"disabled":""} onclick="go('invest',{id:'${p.id}'})">${p.status!=="OpenFunding"?"Sold Out":"Buy Now"}</button></div>
<div style="height:20px"></div></div></div></div>`}
function vInvest(){const p=PROPERTIES.find(x=>x.id===R.params.id);const amt=R.params.amt||p.minInvest;const u=Math.floor(amt/p.unitPrice);
return `<div class="phone"><div class="screen"><div onclick="go('property',{id:p.id})">‹ Swap</div><h2 class="center">Swap</h2><p class="center muted small">Sell and buy RWA with your Vault • 0.099 SOL</p>
<div class="swapbox"><div class="small muted">You Sell</div><h2>${fmt(amt)} <span class="small">USDC ▼</span></h2><input id="amt" type="number" value="${amt}" oninput="R.params.amt=+this.value;render()"></div>
<div class="center">↓</div>
<div class="swapbox"><div class="small muted">You Receive (est)</div><h2>${u} ${p.id.toUpperCase()} <span class="small">≈ ${(u/p.units*100).toFixed(3)}%</span></h2><div class="small">Rate 1 USDC = ${(1/p.unitPrice).toFixed(4)} RWA • Slippage 1.0% ⚙</div></div>
<div class="kv"><span>Receive at least</span><span>${u} units</span></div><div class="kv"><span>Route</span><span>Lifinity V2 +1</span></div><div class="kv"><span>Price impact</span><span class="up">&lt;0.1%</span></div><div class="kv"><span>Platform fee</span><span>Free → ${fmt(fee(amt))}</span></div><div class="kv"><span>Onchain fees</span><span>0.0005 SOL</span></div>
<button class="btn btn-w mt" onclick="go('review',{id:'${p.id}',amt:${amt}})">⏷ Confirm</button></div></div>`}
function vReview(){const p=PROPERTIES.find(x=>x.id===R.params.id);const a=R.params.amt;const t=a+fee(a);const u=Math.floor(a/p.unitPrice);
return `<div class="phone"><div class="screen"><h2 class="center">Confirm swap of USDC to ${p.name}</h2>
<div class="card"><div class="kv"><span>Swap USDC</span><span>${fmt(a)}</span></div><div class="kv"><span>Receive ${p.id}</span><span>${u}</span></div><div class="kv"><span>Chain</span><span>⛓ Base</span></div><div class="kv"><span>Wallet</span><span>🟣 Main Vault</span></div>
<div class="kv"><span>Fee estimate</span><span>${fmt(fee(a))} Normal ~45s</span></div></div>
<p class="small muted center">Review above. Once made, transaction is irreversible.</p>
<div class="row"><button class="btn btn-g" onclick="go('invest',{id:'${p.id}'})">Cancel</button><button class="btn btn-w" onclick="doPay('${p.id}',${a})">⏷ Confirm</button></div></div></div>`}
function doPay(id,a){const p=PROPERTIES.find(x=>x.id===id);const t=a+fee(a);
if(S.kyc!=="Verified"){toast("Verify identity to finish booking");go("kyc",{step:0});return}
if(S.balance<t){toast(`Insufficient ${p.network.split(" ")[0]} for gas + total`);go("wallet");return}
S.balance-=t;const u=Math.floor(a/p.unitPrice);
S.invests.push({id:Date.now(),propId:id,amount:a,units:u,fee:fee(a),date:"today",tx:"0x"+Math.random().toString(16).slice(2,10)});
S.txns.unshift({t:`Swap USDC → ${p.name}`,a:-t,d:"today",s:"Success"});save();go("success",{id:S.invests[S.invests.length-1].id})}
window.doPay=doPay;
function vSuccess(){const inv=S.invests.find(x=>x.id==R.params.id);if(!inv)return vHome();const p=PROPERTIES.find(x=>x.id===inv.propId);
return `<div class="phone"><div class="screen center" style="padding-top:50px"><span class="badge g">✓ Reported / Confirmed</span><h2>Believe ✓ Minted</h2>
<div class="card" style="text-align:left"><img src="${p.img}" style="width:100%;height:160px;object-fit:cover;border-radius:12px"><div class="mt"><b>${p.name} #${inv.units}</b></div><div class="small mono muted">${inv.tx} • ${inv.units} units • ${fmt(inv.amount)}</div></div>
<button class="btn btn-acc mt" onclick="go('portfolio')">View Vault</button></div></div>`}
function vPort(){const inv=S.invests.reduce((a,b)=>a+b.amount,0);
return `<div class="phone">${topbar()}<div class="screen"><div class="small muted">Total in Stake</div><div class="bal">${fmt(Math.round(inv*1.09))}</div>
<div class="acts"><div class="act"> <div class="i">💰</div>Balances</div><div class="act"><div class="i">📜</div>Activity</div><div class="act"><div class="i">👤</div>Account</div></div>
<h3>Overview</h3><div class="prog"><i style="width:91%"></i></div><div class="small muted mt">Accumulate 91.39% • USD 8.25%</div>
${S.invests.map(v=>{const p=PROPERTIES.find(x=>x.id===v.propId);return `<div class="tok" onclick="go('investDetail',{id:${v.id}})"><img src="${p.img}"><div class="n"><b>${p.name} Staked</b><div class="small up">~7% APY • ${v.units} units</div></div><div><b>${fmt(Math.round(v.amount*1.09))}</b></div></div>`}).join("")||`<div class="card center">Don't miss out on staking rewards.<br><button class="btn btn-y mt" onclick="go('marketplace')">Add funds</button></div>`}
<h3>Earn Hub</h3><div class="card"><div class="kv"><span>USDT Stablecoin Earn</span><b class="up">4.04% APY</b></div><div class="kv"><span>USDC Lending Yield</span><b class="up">5.56% APY</b></div></div>
</div>${nav("portfolio")}</div>`}
function vDetail(){const v=S.invests.find(x=>x.id==R.params.id);const p=PROPERTIES.find(x=>x.id===v.propId);
return `<div class="phone"><div class="screen"><div onclick="go('portfolio')">‹ Manage</div><div class="small muted">SALES | 10 US M ▸</div><div class="bal">${fmt(Math.round(v.amount*1.09))} <span class="small up">+11 (6.01%)</span></div>
<div class="tabs"><button class="on">INFO</button><button onclick="go('sell',{id:${v.id}})">SELL</button></div>
<img src="${p.img}" style="width:100%;height:200px;object-fit:cover;border-radius:16px">
<div class="kv"><span>All Time High</span><span>${fmt(v.amount*1.3)}</span></div><div class="kv"><span>All Time Low</span><span>${fmt(v.amount*.9)}</span></div>
<div class="kv"><span>Tx</span><span class="mono small">${v.tx}</span></div>
<div class="row mt"><button class="btn btn-g" onclick="go('property',{id:p.id})">View NFT</button><button class="btn btn-y" onclick="go('sell',{id:${v.id}})">Start Listing</button></div></div></div>`}
function vWallet(){return `<div class="phone">${topbar()}<div class="screen"><div class="small muted">Keyless wallet • jdo***@gmail.com</div><div class="bal">${fmt(S.balance)}</div>
<div class="acts"><div class="act" onclick="go('deposit')"><div class="i">↑</div>Send</div><div class="act" onclick="go('deposit')"><div class="i">↓</div>Receive</div><div class="act" onclick="toast('Scan')"><div class="i">◧</div>Scan</div><div class="act" onclick="go('txns')"><div class="i">📜</div>History</div></div>
<div class="tabs"><button class="on">Crypto</button><button>NFTs</button><button>DeFi</button><button>Approvals</button></div>
${S.txns.map(t=>`<div class="tok"><div class="n"><b>${t.t}</b><div class="small muted">${t.d} • ${t.s}</div></div><b>${fmt(t.a)}</b></div>`).join("")||"No activity"}
<div class="card mt"><b>Withdrawal confirmation</b><div class="small muted">Network Base • Fee 0.1 USDC</div><div class="row mt"><button class="btn btn-g" onclick="go('deposit')">Deposit</button><button class="btn btn-w" onclick="go('withdraw')">Withdraw</button></div></div>
</div>${nav("wallet")}</div>`}
function render(){const el=document.querySelector("#app");const r=R.route;let h="";
if(r==="splash")h=vSplash();else if(r==="onboard")h=vOnboard();else if(r==="kyc")h=vKyc();
else if(r==="home")h=vHome();else if(r==="marketplace")h=vMarket();else if(r==="property")h=vProp();
else if(r==="invest")h=vInvest();else if(r==="review")h=vReview();else if(r==="success")h=vSuccess();
else if(r==="portfolio")h=vPort();else if(r==="investDetail")h=vDetail();
else if(r==="wallet")h=vWallet();
else if(r==="deposit")h=`<div class="phone"><div class="screen"><h2>Receive</h2><div class="card center">0xB83d5...563B <button class="btn btn-g mt" onclick="S.balance+=100000;S.txns.unshift({t:'Receive USDC',a:100000,d:'today',s:'Success'});save();toast('Received +₦100,000');go('wallet')">⧉ COPY</button><div class="small muted mt">Add assets to your Vault. Use address above.</div></div><div class="row mt"><button class="btn btn-g" onclick="go('wallet')">Back</button><button class="btn btn-acc" onclick="S.balance+=100000;S.txns.unshift({t:'Buy SOL',a:100000,d:'today',s:'Success'});save();go('wallet')">Buy SOL</button></div></div></div>`;
else if(r==="withdraw")h=`<div class="phone"><div class="screen"><h2>Withdraw</h2><label>USDT address</label><input value="0x99d3b9281d..."><label>Network</label><select><option>USDT-X Layer</option><option>Base</option></select><label>Amount</label><input id="a" type="number" value="50000"><button class="btn btn-w mt" onclick="const v=+document.getElementById('a').value;if(v>S.balance){toast('Insufficient');return}S.balance-=v;S.txns.unshift({t:'Withdraw',a:-v,d:'today',s:'Pending'});save();go('wallet')">Confirm</button></div></div>`;
else if(r==="learn")h=`<div class="phone">${topbar()}<div class="screen"><h2>Earn Hub → Learn</h2>${LESSONS.map(l=>`<div class="tok" onclick="go('lesson',{id:'${l.id}'})"><div class="n"><b>${l.title}</b><div class="small muted">${l.cat} • ${l.mins} min ${S.lessons[l.id]?"✓":""}</div></div><span>›</span></div>`).join("")}</div>${nav("learn")}</div>`;
else if(r==="lesson"){const l=LESSONS.find(x=>x.id===R.params.id);h=`<div class="phone"><div class="screen"><div onclick="go('learn')">‹</div><h2>${l.title}</h2><div class="card">${l.body}</div><button class="btn btn-acc mt" onclick="S.lessons['${l.id}']=1;save();go('marketplace')">Start earning with DeFi</button></div></div>`}
else if(r==="search")h=`<div class="phone"><div class="screen"><h2>Search</h2><input placeholder="Search tokens, 0x…" oninput="R.q=this.value;render()"><div class="small muted mt">Trending swaps on Base • 1,993 swaps • 72% bought</div></div></div>`;
else if(r==="txns")h=`<div class="phone"><div class="screen"><div onclick="go('wallet')">‹</div><h2>Transaction history</h2>${S.txns.map(t=>`<div class="kv"><span>${t.t}<br><small class="muted">${t.s}</small></span><b>${fmt(t.a)}</b></div>`).join("")}</div></div>`;
else if(r==="notifications")h=`<div class="phone"><div class="screen"><h2>Activity</h2><div class="card">Swapping across networks — Move ETH, USDC across 8+ networks. <span class="badge p">New</span></div></div></div>`;
else if(r==="secondary")h=`<div class="phone"><div class="screen"><div onclick="go('marketplace')">‹</div><h2>Secondary swaps</h2><div class="card">STBL 50 @ ${fmt(21500)} <button class="btn btn-y mt" onclick="toast('Quick Sell confirmed')">Confirm Quick Sell</button></div></div></div>`;
else if(r==="sell")h=`<div class="phone"><div class="screen"><h2>Quick Sell</h2><div class="card">Fee Free • Slippage - • <button class="btn btn-y mt" onclick="toast('Listing live');go('portfolio')">Confirm Quick Sell</button></div></div></div>`;
else h=vHome();
el.innerHTML=h}
render();
