/* TINTX advanced UI/UX layer. Loaded after app.js. */
(function(){
  const fitmentCopy={
    supported:'✓ Honda City is supported. We will confirm fitment before dispatch.',
    manual:'Manual fitment check required. WhatsApp us with your make, model and year.',
    empty:'Select your make, model and year to see fitment.'
  };

  function updateMobileOrderBar(){
    const bar=document.getElementById('mobile-order-bar');
    if(!bar) return;
    const route=(location.hash||'#home').replace('#','');
    bar.style.display=route==='checkout'||route==='cart'?'none':'';
  }

  function bindMenuAccessibility(){
    const menu=document.getElementById('menu-btn');
    const nav=document.getElementById('mobile-nav');
    if(!menu||!nav||menu.dataset.uxBound) return;
    menu.dataset.uxBound='1';
    menu.addEventListener('click',function(){
      const open=nav.classList.contains('open');
      menu.setAttribute('aria-expanded',String(!open));
      menu.setAttribute('aria-label',open?'Open menu':'Close menu');
    });
    nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded','false');
      menu.setAttribute('aria-label','Open menu');
    }));
  }

  function bindFitmentEnhancement(){
    const make=document.getElementById('fit-make');
    const model=document.getElementById('fit-model');
    const year=document.getElementById('fit-year');
    const result=document.getElementById('fit-result');
    if(!model||!result||model.dataset.uxBound) return;
    model.dataset.uxBound='1';
    const check=()=>{
      const modelValue=model.value||'';
      const makeValue=make?.value||'';
      const yearValue=year?.value||'';
      if(!modelValue||modelValue==='Select model'){
        result.className='fit-result';
        result.textContent=fitmentCopy.empty;
        return;
      }
      const supported=modelValue==='Honda City';
      result.className=supported?'fit-result good':'fit-result';
      result.textContent=supported?fitmentCopy.supported:fitmentCopy.manual;
      const wa=document.querySelector('.fit-card a[href*="wa.me"]');
      if(wa&&!supported){
        const text=`TINTX fitment check - Make: ${makeValue||'Not selected'} | Model: ${modelValue} | Year: ${yearValue||'Not selected'}`;
        wa.href='https://wa.me/923112205795?text='+encodeURIComponent(text);
      }
    };
    [make,model,year].filter(Boolean).forEach(el=>el.addEventListener('change',check));
  }

  function decorateProductCards(){
    document.querySelectorAll('.product-card').forEach(card=>{
      if(card.dataset.uxDecorated) return;
      card.dataset.uxDecorated='1';
      const info=card.querySelector('.product-info');
      const image=card.querySelector('.product-image');
      if(image) image.setAttribute('aria-label','View TINTX product details');
      if(info){
        const button=info.querySelector('[data-add]');
        if(button) button.setAttribute('aria-label','Add TINTX removable car window shades to cart');
      }
    });
  }

  function bindBrandCarouselDrag(){
    const viewport=document.querySelector('.brand-marquee');
    if(!viewport||viewport.dataset.dragBound) return;
    viewport.dataset.dragBound='1';
    let dragging=false;
    let startX=0;
    let startScroll=0;
    let moved=false;
    let suppressClick=false;
    const tracks=()=>viewport.querySelectorAll('.brand-track');
    const pauseAnimation=(pause)=>tracks().forEach(track=>{
      track.style.animationPlayState=pause?'paused':'';
    });
    const finish=(event)=>{
      if(!dragging) return;
      dragging=false;
      if(moved){
        suppressClick=true;
        window.setTimeout(()=>{suppressClick=false;},300);
      }
      viewport.classList.remove('is-dragging');
      pauseAnimation(false);
      try{viewport.releasePointerCapture(event.pointerId);}catch(error){}
    };
    viewport.addEventListener('pointerdown',event=>{
      if(event.pointerType==='mouse'&&event.button!==0) return;
      dragging=true;
      moved=false;
      startX=event.clientX;
      startScroll=viewport.scrollLeft;
      viewport.classList.add('is-dragging');
      pauseAnimation(true);
      try{viewport.setPointerCapture(event.pointerId);}catch(error){}
    });
    viewport.addEventListener('pointermove',event=>{
      if(!dragging) return;
      const distance=event.clientX-startX;
      if(Math.abs(distance)>6) moved=true;
      if(moved){
        viewport.scrollLeft=startScroll-distance;
        event.preventDefault();
      }
    },{passive:false});
    viewport.addEventListener('pointerup',finish);
    viewport.addEventListener('pointercancel',finish);
    viewport.addEventListener('click',event=>{
      if(!suppressClick) return;
      event.preventDefault();
      event.stopPropagation();
      suppressClick=false;
    },true);
  }

  function enhance(){
    updateMobileOrderBar();
    bindMenuAccessibility();
    bindFitmentEnhancement();
    decorateProductCards();
    bindBrandCarouselDrag();
  }

  window.addEventListener('hashchange',()=>setTimeout(enhance,0));
  window.addEventListener('load',enhance);
  const observer=new MutationObserver(()=>enhance());
  observer.observe(document.getElementById('app')||document.body,{childList:true,subtree:true});
  setTimeout(enhance,0);
})();
