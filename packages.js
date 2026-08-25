/* TINTX package section — exact customer-supplied package image */
(function(){
  const packages=[
    {id:'tintx-package-1',name:'Package 1 — 4 Door Window Shades',price:2499,details:'4 Door Window Shades'},
    {id:'tintx-package-2',name:'Package 2 — 4 Door + Back WindScreen Shade',price:3600,details:'4 Door Window Shades + Back WindScreen Shade'},
    {id:'tintx-package-3',name:'Package 3 — Full Coverage',price:4100,details:'4 Door Window Shades + Back WindScreen Shade + Third Row Quarter Shades'}
  ];

  function moneyValue(value){return `PKR ${Number(value).toLocaleString('en-PK')}`;}

  function render(){
    const app=document.getElementById('app');
    if(!app || !app.querySelector('.exact-hero') || app.querySelector('.tintx-packages')) return;
    const section=document.createElement('section');
    section.className='section tintx-packages';
    section.id='packages';
    section.innerHTML=`
      <div class="tintx-packages-heading">
        <p class="eyebrow">CHOOSE YOUR PACKAGE</p>
        <h2>Pick the package that fits your car</h2>
        <p>Simple coverage options. Choose your package below and we’ll confirm fitment before dispatch.</p>
      </div>
      <div class="tintx-package-picture">
        <img src="package-options.png" alt="TINTX Package 1, Package 2 and Package 3 with window shade coverage details">
      </div>
      <div class="tintx-package-price-grid">
        ${packages.map((pkg,index)=>`
          <article class="tintx-package-price-card${index===1?' is-popular':''}">
            ${index===1?'<span class="tintx-popular-label">MOST POPULAR</span>':''}
            <span class="tintx-package-price-name">${pkg.name}</span>
            <strong>${moneyValue(pkg.price)}</strong>
            <small>${pkg.details}</small>
            <button class="tintx-package-button" type="button" data-package="${pkg.id}">Order this package →</button>
          </article>
        `).join('')}
      </div>
    `;
    app.appendChild(section);
  }

  function bindButtons(){
    if(window.__tintxPackageButtonsBound) return;
    window.__tintxPackageButtonsBound=true;
    document.addEventListener('click',function(event){
      const button=event.target.closest('[data-package]');
      if(!button) return;
      const pkg=packages.find(item=>item.id===button.dataset.package);
      if(!pkg || typeof cart==='undefined') return;
      const found=cart.find(item=>item.id===pkg.id);
      if(found) found.qty++;
      else cart.push({id:pkg.id,name:pkg.name,price:pkg.price,oldPrice:0,badge:'TINTX PACKAGE',models:[],image:'package-options.png',description:pkg.details,qty:1});
      if(typeof save==='function') save();
      button.textContent='Added ✓';
      window.setTimeout(()=>{button.textContent='Order this package →';},1200);
      window.location.hash='cart';
    });
  }

  function init(){render();bindButtons();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
  new MutationObserver(render).observe(document.documentElement,{childList:true,subtree:true});
})();
