/* TINTX — package selector styled like the reference layout */
(function(){
  const packages = [
    {
      id:'package-1',
      name:'Package 1',
      image:'installed-shade.jpeg',
      count:'4 SHADES',
      items:['4 Door Window Shades']
    },
    {
      id:'package-2',
      name:'Package 2',
      image:'privacy-proof.jpeg',
      count:'5 SHADES',
      items:['4 Door Window Shades','Rear WindScreen Shade']
    },
    {
      id:'package-3',
      name:'Package 3',
      image:'hero-exact-tintx.jpg',
      count:'7 SHADES',
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
      <div class="tintx-packages-heading">
        <p class="eyebrow">CHOOSE YOUR PACKAGE</p>
        <h2>Pick your coverage</h2>
      </div>
      <div class="tintx-package-grid">
        ${packages.map(p=>`
          <article class="tintx-package-card">
            <div class="tintx-package-image">
              <img src="${p.image}" alt="${p.name} TINTX removable car window shades">
              <span class="tintx-package-ribbon">${p.name.toUpperCase()}</span>
              <span class="tintx-package-count">${p.count}</span>
            </div>
            <div class="tintx-package-content">
              <h3>${p.name}</h3>
              <ul>${p.items.map(x=>`<li>${x}</li>`).join('')}</ul>
              <a class="tintx-package-button" href="#product" data-package="${p.id}">Choose ${p.name} →</a>
            </div>
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
