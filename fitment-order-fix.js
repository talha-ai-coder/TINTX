/* TINTX fitment: route Search Fitment to the website COD checkout instead of WhatsApp. */
(() => {
  function init() {
    document.addEventListener('click', (e) => {
      const button = e.target.closest('#browser-search');
      if (!button || typeof window.openCheckout !== 'function') return;
      const make = document.getElementById('browser-make');
      const model = document.getElementById('browser-model');
      if (!make || !model || !make.value || !model.value) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      const selected = model.value;
      const product = {id:'tintx-removable-shades', name:'TINTX Removable Car Window Shades', price:2499, qty:1, image:'product-main.jpg', fitment:`${make.value} ${selected}`};
      localStorage.setItem('tintx-cart', JSON.stringify([product]));
      window.openCheckout();
    }, true);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
