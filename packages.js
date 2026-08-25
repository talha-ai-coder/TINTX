/* TINTX — three package cards inspired by the package structure requested */
(function(){
  const packages = [
    {
      id:'package-1',
      name:'Package 1',
      title:'Essential Shade',
      items:['4 Door Window Shades']
    },
    {
      id:'package-2',
      name:'Package 2',
      title:'Complete Shade',
      items:['4 Door Window Shades','Rear WindScreen Shade']
    },
    {
      id:'package-3',
      name:'Package 3',
      title:'Full Coverage',
      items:['4 Door Window Shades','Rear WindScreen Shade','Third Row Quarter Shades']
    }
  ];

  function render(){
    const app=document.getElementById('app');
    if(!app || app.querySelector('.tintx-packages')) return;
    const hero=app.querySelector('.exact-hero');
    if(!hero) return;

    const section=document.createElement('section');
    section.className='section tintx-packages';
    section.id='packages';
    section.innerHTML=`
      <div class="section-heading tintx-packages-heading">
        <div>
          <p class="eyebrow">CHOOSE YOUR PACKAGE</p>
          <h2>Pick the coverage that fits your car.</h2>
        </div>
        <p class="hero-lede">From the essential 4-door setup to full coverage, choose your TINTX package.</p>
      </div>
      <div class="tintx-package-grid">
        ${packages.map((p,i)=>`
          <article class="tintx-package-card ${i===1?'is-featured':''}">
            ${i===1?'<span class="tintx-package-badge">MOST POPULAR</span>':''}
            <div class="tintx-package-number">0${i+1}</div>
            <h3>${p.name}</h3>
            <h4>${p.title}</h4>
            <ul>${p.items.map(x=>`<li>✓ ${x}</li>`).join('')}</ul>
            <a class="button button-primary" href="#product" data-package="${p.id}">Choose ${p.name} →</a>
          </article>
        `).join('')}
      </div>
    `;
    hero.insertAdjacentElement('afterend',section);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',render);
  else render();
  new MutationObserver(render).observe(document.documentElement,{childList:true,subtree:true});
})();
