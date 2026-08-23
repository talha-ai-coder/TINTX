const PRODUCT={id:'tintx-removable-shades',name:'TINTX Removable Car Window Shades',price:2499,oldPrice:5999,badge:'TINTX ORIGINAL',models:['Honda City'],image:'1.jpg.jpg',description:'High-Density Polyester Mesh Fabric shades for privacy, heat protection and a comfortable clear inside view.'};
const HERO_IMAGE='hero-banner-tintx.jpg';

const VEHICLE_DATA = {
  "SUZUKI": ["Alto 2019-2024", "Cultus 2000-2016", "Cultus 2017-2024", "Swift 2010-2024", "WagonR 2014-2024", "Mehran 1989-2019", "Bolan 1990-2024", "Ravi 1990-2024", "Every 2018-2024", "APV 2008-2024", "Liana 2006-2014", "Jimny 2021-2024", "Grand Vitara 2008-2024"],
  "TOYOTA": ["Corolla 2003-2008", "Corolla 2009-2013", "Corolla 2014-2024", "Yaris 2020-2024", "Vitz 2005-2024", "Fortuner 2017-2024", "Hilux 2016-2024", "Land Cruiser 2010-2024", "Prado 2010-2024", "Revo 2016-2024", "Prius 2010-2024", "Aqua 2012-2024", "Camry 2015-2024", "Rush 2018-2024", "Avanza 2018-2024", "Crown 2018-2024"],
  "HONDA": ["Civic 2001-2005", "Civic 2006-2011", "Civic 2012-2015", "Civic 2016-2021", "Civic 2022-2024", "City 2009-2013", "City 2014-2020", "City 2021-2024", "BRV 2017-2024", "HRV 2022-2024", "Accord 2018-2024", "Vezel 2014-2024", "Fit 2010-2024", "CRV 2018-2024"],
  "KIA": ["Sportage 2019-2024", "Picanto 2019-2024", "Sorento 2021-2024", "Carnival 2021-2024", "Grand Carnival 2021-2024", "Stonic 2021-2024", "Rio 2018-2024"],
  "HYUNDAI": ["Tucson 2020-2024", "Elantra 2021-2024", "Sonata 2021-2024", "Santa Fe 2021-2024", "Porter 2018-2024", "H1 2015-2024"],
  "MG": ["HS 2021-2024", "ZS 2021-2024", "MG 5 2022-2024", "MG 6 2022-2024", "RX5 2022-2024"],
  "CHANGAN": ["Alsvin 2021-2024", "Oshan X7 2022-2024", "Karvaan 2019-2024", "M9 2020-2024", "CX70 2020-2024"],
  "LEXUS": ["LX570", "RX350", "IS250", "ES300h"],
  "AUDI": ["A3", "A4", "A6", "Q3", "Q5", "Q7"],
  "PROTON": ["Saga 2019-2024", "X70 2020-2024", "X50 2021-2024"],
  "UNITED": ["Alpha", "Bravo"],
  "MERCEDES": ["C-Class", "E-Class", "S-Class", "GLC", "GLE"],
  "PRINCE": ["Pearl", "K07"],
  "DFSK": ["Glory 580", "Glory 500", "Prince Pearl"],
  "ISUZU": ["D-Max"],
  "FAW": ["V2", "X-PV"],
  "HAVAL": ["H6 2022-2024", "Jolion 2022-2024", "Dargo 2023-2024"],
  "PEUGEOT": ["2008", "3008", "5008"],
  "CHERY": ["Tiggo 4 Pro", "Tiggo 8 Pro"],
  "MITSUBISHI": ["Lancer", "Pajero", "Outlander"],
  "DAIHATSU": ["Mira", "Move", "Tanto", "Hijet"],
  "NISSAN": ["Dayz", "Note", "Juke", "Sunny"],
  "BYD": ["Atto 3", "Han", "Tang"],
  "JAC": ["T6", "T8"],
  "BMW": ["3 Series", "5 Series", "X1", "X3", "X5"],
  "LAND ROVER": ["Range Rover", "Defender", "Discovery"],
  "JEEP": ["Wrangler", "Grand Cherokee"],
  "BAIC": ["BJ40 Plus"],
  "JETOUR": ["X70 Plus"],
  "JAECOO": ["J7"],
  "OMODA": ["E5", "C5"],
  "GAC": ["GS3", "GS8"],
  "DEEPAL": ["S07", "L07"],
  "OTHER": ["Other / not listed — WhatsApp check"]
};

const CAR_MODELS = Object.values(VEHICLE_DATA).flat();
const WA='https://wa.me/923112205795';
const money=n=>`PKR ${Number(n).toLocaleString('en-PK')}`;
let cart=JSON.parse(localStorage.getItem('tintx-cart')||'[]');
const app=document.getElementById('app');
const save=()=>{localStorage.setItem('tintx-cart',JSON.stringify(cart));document.getElementById('cart-count').textContent=cart.reduce((s,i)=>s+i.qty,0)};
function img(src,alt){return `<img src="${src}" alt="${alt}" onerror="this.style.opacity='.08'">`}
function shell(eyebrow,title,intro,body){return `<div class="page-wrap"><p class="eyebrow">${eyebrow}</p><h1 class="page-title">${title}</h1><p class="page-intro">${intro}</p>${body}</div>`}
function productCard(){return `<article class="product-card"><a class="product-image" href="#product">${img(PRODUCT.image,PRODUCT.name)}<span class="badge">${PRODUCT.badge}</span></a><div class="product-info"><a href="#product"><h3>${PRODUCT.name}</h3></a><div class="rating">★★★★★ <small>Verified fitment</small></div><div class="price"><del>${money(PRODUCT.oldPrice)}</del><strong>${money(PRODUCT.price)}</strong></div><button class="add-button" data-add>Add to cart</button></div></article>`}

function getLogoUrl(brand) {
  const files = {
    'SUZUKI':'suzuki.png','TOYOTA':'toyota.png','HONDA':'honda.png','KIA':'kia.png','HYUNDAI':'hyundai.png',
    'MG':'mg.png','CHANGAN':'changan.png','LEXUS':'lexus.png','AUDI':'audi.png','PROTON':'proton.png',
    'UNITED':'united.png','MERCEDES':'mercedes.png','PRINCE':'prince.png','DFSK':'dfsk.png','ISUZU':'isuzu.png',
    'FAW':'faw.png','HAVAL':'haval.png','PEUGEOT':'peugeot.png','CHERY':'chery.png','MITSUBISHI':'mitsubishi.png',
    'DAIHATSU':'daihatsu.png','NISSAN':'nissan.png','BYD':'byd.svg','JAC':'jac.png','BMW':'bmw.png',
    'LAND ROVER':'land-rover.jpg','JEEP':'jeep.svg','BAIC':'baic.png','JETOUR':'jetour.png','JAECOO':'jaecoo.jpg',
    'OMODA':'omoda.jpg','GAC':'gac.png','DEEPAL':'deepal.png'
  };
  return `brand-logos/${files[brand] || 'other.png'}`;
}

function home(){
  const brands = Object.keys(VEHICLE_DATA).filter(b => b !== 'OTHER');
  const brandLogos = brands.map(brand => `
    <div class="brand-item" data-brand="${brand}" title="${brand}">
      <img src="${getLogoUrl(brand)}" alt="${brand} logo">
      <span>${brand}</span>
    </div>
  `).join('');

  return `
    <section class="hero">
      <div>
        <p class="eyebrow">REMOVABLE · CUSTOM-FIT · PAKISTAN</p>
        <h1>Privacy on demand.<br><em>Comfort every drive.</em></h1>
        <p class="hero-lede">One carefully designed high-density mesh shade product that keeps your cabin comfortable and your car looking refined.</p>
        <div class="button-row">
          <a class="button button-primary" href="#product">Shop the TINTX shade →</a>
          <a class="button button-ghost" href="#vehicle-browser">Find my car →</a>
        </div>
        <div class="hero-proof">
          <span>✓ Full coverage</span><span>✓ Easy to install</span><span>✓ Cash on delivery</span>
        </div>
      </div>
      <div class="hero-media hero-media-unique">
        <span class="hero-window-contour" aria-hidden="true"></span>
        ${img(HERO_IMAGE,'TINTX removable window shade installed on a car')}
        <div class="image-caption">
          <span>MESH SHADE INSTALLED</span>
          <strong>Fitment, without compromise.</strong>
        </div>
        <div class="hero-fit-badge" aria-label="Custom fit perfect fit every time">
          <span class="hero-fit-icon">◇</span>
          <span><b>CUSTOM FIT</b><small>Perfect fit.<br>Every time.</small></span>
        </div>
        <div class="hero-system-meter" aria-label="Custom-fit shade system">
          <span class="meter-label">CUSTOM-FIT SHADE SYSTEM</span>
          <span class="meter-line"><i></i><i></i><i class="active"></i><i></i><i></i></span>
        </div>
        <div class="hero-drive-badge"><small>BUILT FOR</small><strong>YOUR DRIVE</strong></div>
      </div>
    </section>

    <div class="brand-strip" aria-label="Shop shades by car brand">
      <div class="brand-marquee">
        <div class="brand-track">${brandLogos}</div>
        <div class="brand-track" aria-hidden="true">${brandLogos}</div>
      </div>
    </div>

    <section class="vehicle-browser" id="vehicle-browser">
      <div class="browser-container">
        <p class="eyebrow">FIND YOUR FIT</p>
        <h2>Browse by Vehicle</h2>
        <p class="hero-lede">Select your car brand and model to see the custom-fit TINTX shade for your vehicle.</p>
        
        <div class="browser-selector">
          <select class="browser-select" id="browser-make">
            <option value="">Select Brand</option>
            ${Object.keys(VEHICLE_DATA).map(make => `<option value="${make}">${make}</option>`).join('')}
          </select>
          <select class="browser-select" id="browser-model" disabled>
            <option value="">Select Model</option>
          </select>
          <button class="button button-primary" id="browser-search">Search Fitment</button>
        </div>

        <div class="browser-results" id="browser-results">
          <div class="empty-state">Select your car details above to see available shades.</div>
        </div>
      </div>
    </section>

    <div class="trust-strip">
      <div><b>Cash on Delivery</b><span>Pay when received</span></div>
      <div><b>Free Pakistan Delivery</b><span>Nationwide dispatch</span></div>
      <div><b>Fitment Checked</b><span>Before dispatch</span></div>
      <div><b>WhatsApp Support</b><span>Fast human help</span></div>
    </div>

    <section class="section fabric-section" id="why">
      <div class="fabric-photo"><div class="fabric-texture"></div><span class="photo-tag">HIGH-DENSITY MESH</span></div>
      <div>
        <p class="eyebrow">THE TINTX MATERIAL</p>
        <h2>Protection that<br><em>doesn’t feel permanent.</em></h2>
        <p class="hero-lede">High-Density Polyester Mesh Fabric gives you privacy and heat control when you need it, then disappears when you don’t.</p>
        <div class="benefit"><span class="benefit-icon">◈</span><div><b>Privacy + clear view</b><p>Bahar se kam dikhe, andar se clear dikhe.</p></div></div>
        <div class="benefit"><span class="benefit-icon">✦</span><div><b>Heat protection</b><p>Dhoop aur UV ka asar kam, cabin zyada comfortable.</p></div></div>
        <div class="benefit"><span class="benefit-icon">◌</span><div><b>Breathable & washable</b><p>Hawa pass hoti hai, fogging kam aur fabric halka.</p></div></div>
        <a class="text-link" href="#help">Learn about the fabric →</a>
      </div>
    </section>

    <section class="section product-section">
      <div class="section-heading">
        <div><p class="eyebrow">THE TINTX SHADE</p><h2>Our current product</h2></div>
        <a class="text-link" href="#shop">View product →</a>
      </div>
      <div class="product-grid">${productCard()}</div>
    </section>

    <section class="fitment-banner">
      <div>
        <p class="eyebrow">FIND YOUR FIT</p>
        <h2>Not sure what fits your car?</h2>
        <p>Choose your car details and we’ll confirm the current shade.</p>
      </div>
      <a class="button button-primary" href="#fit-guide">Check fitment →</a>
    </section>
  `;
}

function shop(){return shell('TINTX SHOP','Find your perfect shade.','Shop the current TINTX removable shade product, with fitment confirmation before dispatch.',`<div class="shop-toolbar"><div class="shop-search">⌕<input id="search" placeholder="Search the TINTX shade..."></div><select id="sort"><option>Sort the shade</option><option>Price: low to high</option><option>Price: high to low</option></select></div><div class="shop-layout"><aside class="filters"><div class="filter-title"><b>⚙ Filter by</b><span>1 product</span></div><label>Car model</label><select id="model-filter"><option>All models</option>${CAR_MODELS.slice(0,15).map(m=>`<option>${m}</option>`).join('')}<option>Other model — WhatsApp check</option></select><label>Maximum price</label><select><option>Up to PKR 10,000</option><option>Up to PKR 3,000</option><option>Up to PKR 1,500</option></select><div class="filter-note">◈ Every shade is checked for fitment before dispatch.</div></aside><div class="catalogue"><div class="catalogue-head"><span>1 product</span><span>Premium mesh · COD available</span></div><div class="product-grid">${productCard()}</div></div></div>`)}
function product(){return shell('PRODUCT DETAILS',PRODUCT.name,'Custom-fit removable mesh shade, made for comfortable drives.',`<div class="detail-grid"><div><div class="detail-main"><img id="main-product-image" src="product-main-new.png.png" alt="TINTX Removable Car Window Shades"></div><div class="thumb-row"><img class="gallery-thumb" src="window-installed-new.png.png" alt="Shade installed on car window" onclick="document.getElementById('main-product-image').src=this.src"><img class="gallery-thumb" src="inside-view-new.png.png" alt="View from inside car" onclick="document.getElementById('main-product-image').src=this.src"><img class="gallery-thumb" src="mesh-detail-new.png.png" alt="Mesh fabric detail" onclick="document.getElementById('main-product-image').src=this.src"></div></div><div><span class="badge">${PRODUCT.badge}</span><h2>${PRODUCT.name}</h2><div class="rating">★★★★★ <small>Verified fitment support</small></div><p class="detail-description">${PRODUCT.description}</p><div class="detail-price"><del>${money(PRODUCT.oldPrice)}</del><strong>${money(PRODUCT.price)}</strong><span>COD available</span></div><label class="form-label">Select your car for fitment</label><select id="detail-model"><option value="">Make, model & year</option>${CAR_MODELS.map(model=>`<option value="${model}">${model}</option>`).join('')}</select><div class="qty-row"><button data-qty="-1">−</button><b id="qty">1</b><button data-qty="1">+</button></div><button class="button button-primary" id="detail-add">Add to cart →</button><a class="text-link" style="display:block;margin-top:20px" href="${WA}" target="_blank">Need help? Ask on WhatsApp</a><div class="benefit"><span class="benefit-icon">✓</span><div><b>Free delivery across Pakistan</b><p>Fitment confirmed before dispatch.</p></div></div></div></div><section class="material-section"><p class="eyebrow">THE MATERIAL</p><h2>See the mesh.<br><em>Feel the difference.</em></h2><p class="hero-lede">High-Density Polyester Mesh is lightweight, washable and breathable. Privacy outside, clear view inside.</p><div class="material-grid"><div><div class="fabric-texture"></div><p><b>High-density weave</b><br>Privacy outside, clear view inside.</p></div><div><div class="fabric-texture"></div><p><b>Lightweight + washable</b><br>Easy to remove and clean.</p></div></div></section>`)}
function fitGuide(){return shell('FIT GUIDE','Choose your car. We’ll confirm the fit.','No guessing. Select your car details and we’ll confirm whether the current TINTX shade fits.',`<div class="fit-card"><h2>Find the right TINTX shade</h2><p class="hero-lede">Currently available for Honda City. For another car, send us a WhatsApp message for a manual check.</p><div class="fit-fields"><select id="fit-make"><option>Select make</option><option>Honda</option><option>Toyota</option><option>Suzuki</option><option>Kia</option><option>Hyundai</option><option>MG</option><option>Changan</option><option>Haval</option><option>Nissan</option><option>Daihatsu</option><option>Other make — WhatsApp check</option></select><select id="fit-model"><option>Select model</option>${CAR_MODELS.map(model=>`<option value="${model}">${model}</option>`).join('')}</select><select id="fit-year"><option>Select year</option><option>2021+</option><option>2020</option><option>2019</option><option>2018</option><option>2017</option><option>2016</option><option>2015</option><option>Other year</option></select></div><div id="fit-result" class="fit-result">Select your model to see fitment.</div><a class="button button-ghost" href="${WA}" target="_blank">Ask us to check my car →</a></div><div class="fit-points"><div class="benefit"><span class="benefit-icon">◈</span><div><b>Precision fit</b><p>Honda City is the current supported fit.</p></div></div><div class="benefit"><span class="benefit-icon">✦</span><div><b>Fast confirmation</b><p>We confirm details before dispatch.</p></div></div><div class="benefit"><span class="benefit-icon">✓</span><div><b>Easy ordering</b><p>COD and nationwide delivery.</p></div></div></div>`)}
function cartPage(){let total=cart.reduce((s,i)=>s+i.price*i.qty,0);return shell('YOUR BAG','Ready for a more comfortable drive?',cart.length?'Review your TINTX shade before checkout.':'Your cart is empty.',cart.length?`<div class="cart-grid"><div>${cart.map(i=>`<div class="cart-item">${img(i.image,i.name)}<div><h3>${i.name}</h3><small>${money(i.price)} · Qty ${i.qty}</small><br><button class="remove" data-remove>Remove</button></div></div>`).join('')}</div><aside class="order-summary"><h3>Order summary</h3><div class="summary-line"><span>Subtotal</span><b>${money(total)}</b></div><div class="summary-line"><span>Delivery</span><b>Free</b></div><div class="summary-total"><span>Total</span><strong>${money(total)}</strong></div><a class="button button-primary full" href="#checkout">Proceed to COD checkout</a></aside></div>`:`<div class="form-card"><h2>Your cart is empty</h2><p class="hero-lede">Find out whether the current TINTX shade fits your car.</p><a class="button button-primary" href="#shop">Shop the shade →</a></div>`)}
function checkout(){let total=cart.reduce((s,i)=>s+i.price*i.qty,0);return shell('CASH ON DELIVERY','Complete your order.','Tell us where to deliver. We’ll confirm the fit before dispatch.',`<div class="checkout-grid"><form class="form-card" id="checkout-form"><h3>Customer details</h3><div class="form-grid"><input class="form-field" required placeholder="Full name"><input class="form-field" required type="tel" placeholder="Phone number"></div><input class="form-field" required placeholder="Complete delivery address"><div class="form-grid"><input class="form-field" required placeholder="City"><input class="form-field" placeholder="Order notes (optional)"></div><h3>Car details</h3><div class="form-grid"><input class="form-field" required placeholder="Car make"><input class="form-field" required placeholder="Car model"></div><input class="form-field" placeholder="Year / variant"><div class="cod-box">✓ <div><b>Cash on Delivery</b><br><small>Pay when your shade arrives. No online payment required.</small></div></div><button class="button button-primary full">Place COD order →</button></form><aside class="order-summary"><h3>Your order</h3><div class="summary-line"><span>TINTX shade</span><b>${money(total||PRODUCT.price)}</b></div><div class="summary-total"><span>Total</span><strong>${money(total||PRODUCT.price)}</strong></div><p>🚚 Free nationwide delivery</p></aside></div>`)}
function help(){return shell('HELP · FAQS · CONTACT','Questions? We’ve got you.','Everything you need to know about TINTX fabric, fitment, delivery and Cash on Delivery.',`<div class="form-card"><h2>High-Density Polyester Mesh Fabric</h2><div class="faq"><details open><summary>Privacy aur view kaisa hai?</summary><p>Bahar se visibility kam hoti hai, andar se view clear rehta hai.</p></details><details><summary>Garmi kitni kam hoti hai?</summary><p>Mesh dhoop aur UV ka asar kam karne mein madad karta hai, jis se cabin zyada comfortable rehta hai.</p></details><details><summary>Hawa pass hoti hai?</summary><p>Haan, fabric breathable, halka aur washable hai; fogging kam hoti hai.</p></details><details><summary>Delivery aur payment?</summary><p>Pakistan-wide delivery available hai. Payment sirf Cash on Delivery par hoti hai.</p></details><details><summary>Agar meri car Honda City nahi hai?</summary><p><a class="text-link" href="${WA}" target="_blank">WhatsApp par model bhejein</a>; team manual fitment check karegi.</p></details></div><a class="button button-primary" href="${WA}" target="_blank">Chat with TINTX on WhatsApp →</a></div>`)}

function render(){
  let route=location.hash.replace('#','')||'home';
  if(route.startsWith('product'))route='product';
  const views={home:home,shop:shop,product, 'fit-guide':fitGuide,cart:cartPage,checkout,help};
  app.innerHTML=(views[route]||home)();
  app.focus();
  bind();
  save();
}

function bind(){
  document.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>{
    const found=cart.find(i=>i.id===PRODUCT.id);
    if(found)found.qty++;else cart.push({...PRODUCT,qty:1});
    save();
    b.textContent='Added ✓';
    setTimeout(()=>b.textContent='Add to cart',1000)
  });

  document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{
    cart=[];
    save();
    render();
  });

  const q=document.getElementById('detail-add');
  if(q){
    let n=1;
    document.querySelectorAll('[data-qty]').forEach(b=>b.onclick=()=>{
      n=Math.max(1,n+Number(b.dataset.qty));
      document.getElementById('qty').textContent=n
    });
    q.onclick=()=>{
      const f=cart.find(i=>i.id===PRODUCT.id);
      if(f)f.qty+=n;else cart.push({...PRODUCT,qty:n});
      save();
      q.textContent='Added ✓'
    }
  }

  // Vehicle Browser Logic
  const makeSelect = document.getElementById('browser-make');
  const modelSelect = document.getElementById('browser-model');
  const searchBtn = document.getElementById('browser-search');
  const resultsDiv = document.getElementById('browser-results');

  if(makeSelect && modelSelect) {
    makeSelect.onchange = () => {
      const make = makeSelect.value;
      modelSelect.innerHTML = '<option value="">Select Model</option>';
      if(make && VEHICLE_DATA[make]) {
        VEHICLE_DATA[make].forEach(model => {
          modelSelect.innerHTML += `<option value="${model}">${model}</option>`;
        });
        modelSelect.disabled = false;
      } else {
        modelSelect.disabled = true;
      }
    };

    searchBtn.onclick = () => {
      const make = makeSelect.value;
      const model = modelSelect.value;
      if(!make || !model) return;

      const carName = `${make} ${model}`;
      const waMsg = `Hi TINTX, I want to order the Removable Shades for ${carName}. Please confirm fitment.`;
      const waUrl = `${WA}?text=${encodeURIComponent(waMsg)}`;

      resultsDiv.innerHTML = `
        <div class="car-card">
          <div class="car-card-img">
            <img src="${model.toLowerCase().includes('civic') ? 'civic.png' : (model.toLowerCase().includes('brv') ? 'br-v.png' : '1.jpg.jpg')}" alt="${carName}">
          </div>
          <div class="car-card-content">
            <div class="car-card-title">${carName}</div>
            <div class="car-card-price">${money(PRODUCT.price)}</div>
            <a href="${waUrl}" target="_blank" class="car-card-btn">Order on WhatsApp →</a>
          </div>
        </div>
      `;
    };

    // Brand logo clicks
    document.querySelectorAll('.brand-item').forEach(item => {
      item.onclick = () => {
        const brand = item.dataset.brand;
        makeSelect.value = brand;
        makeSelect.onchange();
        document.querySelectorAll('.brand-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        document.getElementById('vehicle-browser').scrollIntoView({ behavior: 'smooth' });
      };
    });
  }

  const menu=document.getElementById('menu-btn');
  if(menu)menu.onclick=()=>document.getElementById('mobile-nav').classList.toggle('open');

  const form=document.getElementById('checkout-form');
  if(form)form.onsubmit=e=>{
    e.preventDefault();
    const fields=[...form.querySelectorAll('input')];
    const name=fields[0]?.value||'Customer';
    const phone=fields[1]?.value||'';
    const address=fields[2]?.value||'';
    const city=fields[3]?.value||'';
    const carMake=fields[5]?.value||'';
    const carModel=fields[6]?.value||'';
    const msg=`TINTX COD order%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AAddress: ${encodeURIComponent(address)}%0ACity: ${encodeURIComponent(city)}%0ACar: ${encodeURIComponent(`${carMake} ${carModel}`)}%0AOrder: ${encodeURIComponent(PRODUCT.name)}%0ATotal: ${encodeURIComponent(money(cart.reduce((s,i)=>s+i.price*i.qty,0)||PRODUCT.price))}`;
    window.open(`${WA}?text=${msg}`,'_blank');
    form.innerHTML='<div class="success-card"><h2>Order request ready ✓</h2><p>WhatsApp opened so our team can confirm your details and fitment.</p></div>';
    cart=[];
    save()
  }
}

function sendAI(text){
  const box=document.getElementById('ai-messages');
  if(!box) return;
  box.innerHTML+=`<div class="ai-msg user">${text}</div>`;
  let t=text.toLowerCase();
  let reply=t.includes('fit')||t.includes('city')?'Honda City ke liye current TINTX shade supported hai. Other model ho to WhatsApp par details bhej dein.':t.includes('fabric')||t.includes('kapra')?'High-Density Polyester Mesh: privacy + clear view, heat/UV protection aur breathable, lightweight, washable fabric.':t.includes('delivery')||t.includes('cod')||t.includes('payment')?'Pakistan-wide free delivery aur Cash on Delivery available hai.':`TINTX ka current product removable car window shade hai — PKR 2,499. Main fitment, fabric aur delivery mein help kar sakta hoon.`;
  box.innerHTML+=`<div class="ai-msg bot">${reply}<br><a class="text-link" href="${WA}" target="_blank">Complex question? WhatsApp team →</a></div>`;
  box.scrollTop=box.scrollHeight
}

window.addEventListener('hashchange',render);
render();
