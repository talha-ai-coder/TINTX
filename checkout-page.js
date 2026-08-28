(() => {
  const PRICE = 2499;
  const PRODUCT_NAME = 'TINTX Removable Car Window Shades';
  const ORDER_ENDPOINT = 'https://formsubmit.co/ajax/aqstandard141@gmail.com';
  const money = value => `PKR ${Number(value || 0).toLocaleString('en-PK')}`;
  const escapeHtml = value => String(value ?? '').replace(/[&<>\'\"]/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[character]));

  function readCart() {
    try {
      const saved = JSON.parse(localStorage.getItem('tintx-cart') || '[]');
      if (Array.isArray(saved) && saved.length) return saved;
    } catch (_) {}
    return [{
      id: 'tintx-removable-shades',
      name: PRODUCT_NAME,
      price: PRICE,
      qty: 1,
      fitment: ''
    }];
  }

  function quantityOf(items) {
    return items.reduce((sum, item) => sum + Math.max(1, Number(item.qty || 1)), 0);
  }

  function totalOf(items) {
    return items.reduce((sum, item) => sum + Number(item.price || PRICE) * Math.max(1, Number(item.qty || 1)), 0);
  }

  function orderId() {
    return `TINTX-${Date.now().toString().slice(-8)}`;
  }

  function renderSummary(items) {
    const summary = document.getElementById('order-summary');
    const count = quantityOf(items);
    const total = totalOf(items);
    document.getElementById('order-count').textContent = `${count} ${count === 1 ? 'item' : 'items'}`;
    document.getElementById('order-total').textContent = money(total);
    document.getElementById('submit-total').textContent = `— ${money(total)}`;
    summary.innerHTML = items.map(item => {
      const qty = Math.max(1, Number(item.qty || 1));
      const price = Number(item.price || PRICE);
      const fitment = item.fitment ? `Fitment: ${escapeHtml(item.fitment)}` : `${qty} × ${money(price)}`;
      return `<div class="order-line">
        <img class="order-line-image" src="${escapeHtml(item.image || 'product-main.jpg')}" alt="${escapeHtml(item.name || PRODUCT_NAME)}">
        <div class="order-line-copy"><strong>${escapeHtml(item.name || PRODUCT_NAME)}</strong><small>${fitment}</small></div>
        <span class="order-line-price">${money(price * qty)}</span>
      </div>`;
    }).join('');
  }

  function prefillFitment(items) {
    const field = document.getElementById('car-field');
    if (!field) return;
    const queryCar = new URLSearchParams(window.location.search).get('car');
    const itemCar = items.find(item => item.fitment || item.car)?.fitment || items.find(item => item.fitment || item.car)?.car || '';
    field.value = queryCar || itemCar || '';
  }

  function showError(message) {
    let error = document.getElementById('checkout-error');
    if (!error) {
      error = document.createElement('p');
      error.id = 'checkout-error';
      error.className = 'checkout-error';
      document.getElementById('tintx-order-form').appendChild(error);
    }
    error.textContent = message;
  }

  function showConfirmation(data) {
    document.getElementById('checkout-app').innerHTML = `<section class="checkout-card checkout-confirmation">
      <div class="checkout-success-icon">✓</div>
      <p class="checkout-card-kicker">ORDER CONFIRMED</p>
      <h2>Thank you, ${escapeHtml(data.name)}!</h2>
      <p>Your TINTX order has been received. We will contact you shortly to confirm fitment and delivery.</p>
      <div class="checkout-confirmation-meta">
        <div><span>Order ID</span><strong>${escapeHtml(data.order_id)}</strong></div>
        <div><span>Total</span><strong>${money(data.total)}</strong></div>
      </div>
      <p>Payment method: <b>Cash on Delivery</b>. Please keep your phone available for our delivery confirmation call.</p>
      <a class="checkout-home-button" href="index.html">Back to TINTX home</a>
    </section>`;
    document.querySelector('.checkout-step.is-active')?.classList.remove('is-active');
    document.querySelectorAll('.checkout-step')[1]?.classList.add('is-active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function init() {
    const items = readCart();
    const quantity = quantityOf(items);
    const total = totalOf(items);
    const form = document.getElementById('tintx-order-form');
    renderSummary(items);
    prefillFitment(items);
    form.elements.product.value = items.map(item => item.name || PRODUCT_NAME).join(' + ');
    form.elements.quantity.value = quantity;
    form.elements.total.value = total;

    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const button = form.querySelector('button[type="submit"]');
      const data = Object.fromEntries(new FormData(form).entries());
      data.order_id = orderId();
      data.created_at = new Date().toISOString();
      button.disabled = true;
      button.innerHTML = 'Placing your order…';
      showError('');
      try {
        const response = await fetch(ORDER_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Order service error');
        localStorage.setItem('tintx-last-order', JSON.stringify(data));
        localStorage.removeItem('tintx-cart');
        showConfirmation(data);
      } catch (error) {
        button.disabled = false;
        button.innerHTML = `Place order <span>— ${money(total)}</span> <b>→</b>`;
        showError('Order submit nahi ho saka. Please try again ya WhatsApp par message karein.');
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
