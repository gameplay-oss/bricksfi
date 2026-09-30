const PROPERTIES = [
{
id:"stables", name:"The Stables", location:"Lekki, Lagos, Nigeria", city:"Lagos", type:"Residential",
price:85000000, unitPrice:5000, minInvest:50000, funded:72, yield:"8.5%", yieldNum:8.5, duration:"5 years", durationTag:"Long", status:"OpenFunding",
img:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
gallery:["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80","https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"],
verified:true, rating:4.8, investors:1243,
desc:"Modern 24-unit serviced apartment block in Lekki Phase 1, 92% occupied, managed by seasoned operator. Rental income distributed quarterly.",
developer:"Adun Homes Ltd", size:"2,400 sqm", devStatus:"Completed 2023", occupancy:"92%", amenities:["Pool","Gym","24/7 Security","Parking","Solar Backup"],
valuation:85000000, purchasePrice:78000000, rentAnnual:9800000, opex:2575000, netIncome:7225000,
units:17000, network:"Base • ERC-20", structure:"SPV + Trust Deed, token = beneficial interest",
docs:["Title (C of O)","Deed of Assignment","Valuation Report","Audit Letter","Tenancy Schedule"],
risks:["Market: Lagos prices can fluctuate","Liquidity: resale via marketplace only","Regulatory: REIT-adjacent structure","Development: completed, low risk","Tech: smart-contract risk"]
},
{
id:"ikoyi", name:"Ikoyi Heights", location:"Ikoyi, Lagos, Nigeria", city:"Lagos", type:"Residential",
price:120000000, unitPrice:10000, minInvest:100000, funded:45, yield:"7.2%", yieldNum:7.2, duration:"7 years", durationTag:"Long", status:"OpenFunding",
img:"https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
gallery:["https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80","https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"],
verified:true, rating:4.9, investors:862,
desc:"12 luxury 2-bed apartments targeting diplomats and corporates. Dollar-linked rents, 88% occupancy.",
developer:"OrangeBrick Dev", size:"3,100 sqm", devStatus:"Completed 2022", occupancy:"88%", amenities:["Concierge","Elevator","Gym","Smart Locks"],
valuation:120000000, purchasePrice:112000000, rentAnnual:12400000, opex:3760000, netIncome:8640000,
units:12000, network:"Base • ERC-20", structure:"SPV equity tokens",
docs:["C of O","Survey Plan","Valuation","Insurance"],
risks:["Market risk","Liquidity risk","FX risk on USD rents"]
},
{
id:"abuja", name:"Abuja Terraces", location:"Maitama, Abuja, Nigeria", city:"Abuja", type:"Commercial",
price:95000000, unitPrice:5000, minInvest:50000, funded:88, yield:"9.1%", yieldNum:9.1, duration:"3 years", durationTag:"Medium", status:"OpenFunding",
img:"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
gallery:["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"],
verified:true, rating:4.7, investors:2105,
desc:"Grade-B office terrace fully let to 3 law firms on 3-yr leases with annual escalation.",
developer:"Capital Estates", size:"1,800 sqm", devStatus:"Completed 2021", occupancy:"100%", amenities:["Boardroom","Parking 40","Fibre","Generator"],
valuation:95000000, purchasePrice:88000000, rentAnnual:11900000, opex:3250000, netIncome:8650000,
units:19000, network:"Base • ERC-20", structure:"SPV + rental pass-through",
docs:["Title","Leases","Valuation","Tax Clearance"],
risks:["Tenant concentration","Liquidity risk","Market risk"]
},
{
id:"accra", name:"Labadi Beach Villas", location:"Labadi, Accra, Ghana", city:"Accra", type:"Hospitality",
price:150000000, unitPrice:15000, minInvest:150000, funded:34, yield:"10.4%", yieldNum:10.4, duration:"5 years", durationTag:"Long", status:"OpenFunding",
img:"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
gallery:["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80","https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80"],
verified:true, rating:4.8, investors:543,
desc:"8 short-let villas, 71% avg occupancy, managed by Jumia Travel partner. Payouts monthly.",
developer:"GoldCoast Stays", size:"4,000 sqm", devStatus:"Completed 2023", occupancy:"71%", amenities:["Beach Access","Pool","Chef","Housekeeping"],
valuation:150000000, purchasePrice:138000000, rentAnnual:21000000, opex:5400000, netIncome:15600000,
units:10000, network:"Base • ERC-20", structure:"Fractional SPV units",
docs:["Leasehold","Valuation","Operator Agreement","Audit"],
risks:["Seasonality","Tourism demand","Liquidity risk","FX GHS risk"]
},
{
id:"lekki-land", name:"Ibeju-Lekki Land Bank", location:"Ibeju-Lekki, Lagos", city:"Lagos", type:"Land",
price:60000000, unitPrice:2500, minInvest:25000, funded:61, yield:"—", yieldNum:0, duration:"4 years", durationTag:"Medium", status:"OpenFunding",
img:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
gallery:["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"],
verified:true, rating:4.6, investors:3310,
desc:"12 plots near Lekki Free Trade Zone. Appreciation play — no rental, target 18% IRR on exit.",
developer:"LandHive", size:"7,200 sqm", devStatus:"Fenced + Excision", occupancy:"—", amenities:["Registered Survey","Excision","Road Access"],
valuation:60000000, purchasePrice:52000000, rentAnnual:0, opex:400000, netIncome:-400000,
units:24000, network:"Base • ERC-20", structure:"Land trust units",
docs:["Excision","Survey","Deed"],
risks:["No income until sale","Appreciation not guaranteed","Liquidity risk"]
},
{
id:"victoria", name:"VI Mixed-Use Plaza", location:"Victoria Island, Lagos", city:"Lagos", type:"Mixed-use",
price:200000000, unitPrice:20000, minInvest:200000, funded:100, yield:"8.0%", yieldNum:8.0, duration:"6 years", durationTag:"Long", status:"Fully Funded",
img:"https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=800&q=80",
gallery:["https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=800&q=80"],
verified:true, rating:4.9, investors:1876,
desc:"Retail + office plaza. Fully funded — join waitlist / secondary market.",
developer:"VI Prime", size:"5,500 sqm", devStatus:"Completed", occupancy:"96%", amenities:["Anchor Tenant","Escalators","Parking"],
valuation:200000000, purchasePrice:185000000, rentAnnual:22000000, opex:6000000, netIncome:16000000,
units:10000, network:"Base • ERC-20", structure:"SPV equity",
docs:["Title","Valuation","Leases"],
risks:["Fully funded — secondary only"]
}
];
const LESSONS = [
{id:"l1", cat:"Getting Started", title:"How fractional ownership works", mins:4, level:"Beginner", body:"Instead of buying a whole ₦85m building, you buy units at ₦5,000 each. Each unit = beneficial interest in an SPV that owns the property. Rent is shared pro-rata, ownership recorded on-chain + in SPV register."},
{id:"l2", cat:"Real Estate", title:"Rental yield vs appreciation", mins:5, level:"Beginner", body:"Yield = annual rent ÷ price. 8.5% projected means ₦100k could target ₦8,500/yr before fees. Appreciation = price growth on sale. Land Bank has no yield, only appreciation bet."},
{id:"l3", cat:"Fractional Ownership", title:"What do your tokens represent?", mins:3, level:"Beginner", body:"Tokens are digital receipts for your SPV units. 20 units at ₦5,000 = 0.12% of The Stables. You can view transaction hash + SPV certificate in Documents."},
{id:"l4", cat:"Investing", title:"Risks every investor must know", mins:6, level:"Intermediate", body:"Market, liquidity, developer, regulatory and smart-contract risks. Projections are not guarantees. Only invest what you can lock for the stated duration."},
{id:"l5", cat:"Tokenization", title:"What is on-chain ownership?", mins:4, level:"Intermediate", body:"Ownership is mirrored on Base as ERC-20. Blockchain gives transparent ledger; legal ownership sits in SPV. You see both: wallet balance + legal docs."},
{id:"l6", cat:"Real Estate", title:"Diversification in 10 minutes", mins:5, level:"Intermediate", body:"Split ₦300k across Residential 45% / Commercial 30% / Hospitality 25% to smooth vacancy risk. BricksFi allocation chart does this automatically."}
];
const LISTINGS = [
{propId:"victoria", units:50, pricePer:21500},
{propId:"stables", units:120, pricePer:5200}
];
