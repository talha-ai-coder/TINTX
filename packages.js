/* TINTX coverage options and Honda pilot navigation */
(function(){
  const options=[
    {id:'full',name:'Full',price:2499,detail:'Full Window Coverage'},
    {id:'half',name:'Half',price:2499,detail:'Half Window Coverage'},
    {id:'front',name:'Front',price:4100,detail:'Front Window Shades'},
    {id:'rear',name:'Rear',price:3600,detail:'Rear Window Shades'}
  ];
  const money=value=>`PKR ${Number(value).toLocaleString('en-PK')}`;
  function coverageIllustration(id){
    const fill=id==='full'?'#08b99e':id==='half'?'#43cfbd':id==='front'?'#35b8e8':'#f0b842';
    const front=id==='full'||id==='half'||id==='front'?fill:'#c8d9dc';
    const rear=id==='full'||id==='rear'?fill:'#c8d9dc';
    return `<svg class="coverage-visual" viewBox="0 0 180 72" aria-hidden="true"><path d="M13 48h13l11-20c3-6 8-9 15-9h73c8 0 13 3 18 9l13 20h8v11H13z" fill="#d9e4e6" stroke="#567078" stroke-width="2.5"/><path d="M42 29c2-4 6-6 11-6h31v21H32z" fill="${front}" stroke="#526b73" stroke-width="2"/><path d="M88 23h36c6 0 10 3 13 7l10 14H88z" fill="${rear}" stroke="#526b73" stroke-width="2"/><circle cx="48" cy="59" r="8" fill="#193039" stroke="white" stroke-width="2"/><circle cx="135" cy="59" r="8" fill="#193039" stroke="white" stroke-width="2"/></svg>`;
  }
  function packageCard(option,index){
    return `<article class="tintx-package-card${index===0?' is-popular':''}"><div class="tintx-coverage-art tintx-coverage-${option.id}">${coverageIllustration(option.id)}</div><div class="tintx-package-content">${index===0?'<span class="tintx-popular-label">POPULAR</span>':''}<span class="tintx-package-price-name">${option.name}</span><strong>${money(option.price)}</strong><small>${option.detail}</small><button class="tintx-package-button" type="button" data-coverage="${option.id}">Choose ${option.name} →</button></div></article>`;
  }
  function addToCart(option,fitment=''){
    if(typeof cart==='undefined') return;
    const id=`tintx-${option.id}-coverage`;
    const found=cart.find(item=>item.id===id&&item.fitment===fitment);
    if(found) found.qty++;
    else cart.push({id,name:`TINTX ${option.name} Coverage Shades`,price:option.price,oldPrice:0,badge:'TINTX SHADE OPTION',models:[],image:'product-main.jpg',description:option.detail,fitment,qty:1});
    if(typeof save==='function')save();
    window.location.hash='cart';
  }
  function renderHomePackages(){
    const app=document.getElementById('app');
    if(!app||!app.querySelector('.exact-hero')||app.querySelector('.tintx-packages'))return;
    const section=document.createElement('section');
    section.className='section tintx-packages';
    section.id='packages';
    section.innerHTML=`<div class="tintx-packages-heading"><p class="eyebrow">CHOOSE YOUR COVERAGE</p><h2>Pick the shade coverage you need</h2><p>Select an option. We’ll confirm fitment before dispatch.</p></div><div class="tintx-package-grid">${options.map(packageCard).join('')}</div>`;
    app.appendChild(section);
  }
  function renderProductOptions(){
    const app=document.getElementById('app'),container=app?.querySelector('.detail-grid')?.children[1];
    if(!container||container.querySelector('.tintx-detail-options'))return;
    const price=container.querySelector('.detail-price strong');
    if(!price)return;
    const chooser=document.createElement('section');
    chooser.className='tintx-detail-options';
    chooser.setAttribute('aria-label','Choose shade coverage');
    chooser.innerHTML=`<p class="tintx-detail-label">Choose coverage</p><div class="tintx-detail-option-grid">${options.map((o,i)=>`<button type="button" class="tintx-detail-option${i===0?' is-selected':''}" data-detail-coverage="${o.id}" aria-pressed="${i===0}"><span>${o.name}</span><strong>${money(o.price)}</strong></button>`).join('')}</div>`;
    price.textContent=money(options[0].price);
    (container.querySelector('.detail-description')||price.parentElement).insertAdjacentElement('afterend',chooser);
    chooser.addEventListener('click',event=>{
      const button=event.target.closest('[data-detail-coverage]');if(!button)return;
      const option=options.find(o=>o.id===button.dataset.detailCoverage);if(!option)return;
      chooser.querySelectorAll('.tintx-detail-option').forEach(el=>{const selected=el===button;el.classList.toggle('is-selected',selected);el.setAttribute('aria-pressed',String(selected));});
      price.textContent=money(option.price);
      if(typeof PRODUCT!=='undefined'){PRODUCT.id=`tintx-${option.id}-coverage`;PRODUCT.name=`TINTX ${option.name} Coverage Shades`;PRODUCT.price=option.price;PRODUCT.badge='TINTX SHADE OPTION';}
    });
    if(typeof PRODUCT!=='undefined'){PRODUCT.id='tintx-full-coverage';PRODUCT.name='TINTX Full Coverage Shades';PRODUCT.price=2499;PRODUCT.badge='TINTX SHADE OPTION';}
  }
  function syncFitment(){
    if(typeof cart==='undefined')return;
    document.querySelectorAll('.cart-item').forEach((row,index)=>{
      const item=cart[index];if(!item?.fitment||row.querySelector('.cart-fitment'))return;
      const note=document.createElement('small');note.className='cart-fitment';note.textContent=`Fitment: ${item.fitment}`;row.children[1]?.appendChild(note);
    });
    const fitment=cart.find(item=>item.fitment)?.fitment;
    if(!fitment)return;
    const match=fitment.match(/^(Honda)\s+(.+)\s+(\d{4}-\d{4})$/);
    if(!match)return;
    const inputs=document.querySelectorAll('#checkout-form input');
    if(inputs[5])inputs[5].value=match[1];
    if(inputs[6])inputs[6].value=match[2];
    if(inputs[7])inputs[7].value=match[3];
    const summary=document.querySelector('.checkout-grid .order-summary');
    if(summary&&!summary.querySelector('.honda-fitment-note')){
      const note=document.createElement('p');note.className='honda-fitment-note';note.textContent=`Fitment: ${fitment}`;
      summary.querySelector('.summary-line')?.insertAdjacentElement('afterend',note);
    }
  }
  function bindInteractions(){
    if(window.__tintxCoverageFlowBound)return;
    window.__tintxCoverageFlowBound=true;
    document.addEventListener('click',event=>{
      const brand=event.target.closest('.brand-item[data-brand="HONDA"]');
      if(brand){event.preventDefault();event.stopImmediatePropagation();window.location.hash='brand-honda';return;}
      const homeOption=event.target.closest('[data-coverage]');
      if(homeOption){const option=options.find(o=>o.id===homeOption.dataset.coverage);if(option)addToCart(option);return;}
      const resultOption=event.target.closest('[data-result-coverage]');
      if(resultOption){const option=options.find(o=>o.id===resultOption.dataset.resultCoverage);if(option)addToCart(option,resultOption.dataset.fitment);}
    },true);
  }
  function init(){renderHomePackages();renderProductOptions();bindInteractions();syncFitment();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  new MutationObserver(()=>{renderHomePackages();renderProductOptions();syncFitment();}).observe(document.documentElement,{childList:true,subtree:true});
})();
