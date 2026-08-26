/* TINTX website checkout: direct COD orders without WhatsApp. */
(() => {
  const PRICE = 2499;
  const PRODUCT_NAME = 'TINTX Removable Car Window Shades';
  const ORDER_ENDPOINT = 'https://formsubmit.co/ajax/aqstandard141@gmail.com';
  const money = n => `PKR ${Number(n).toLocaleString('en-PK')}`;
  const getCart = () => JSON.parse(localStorage.getItem('tintx-cart') || '[]');
  const setCart = cart => localStorage.setItem('tintx-cart', JSON.stringify(cart));
  function orderId(){ return `TINTX-${Date.now().toString().slice(-8)}`; }
  function escapeHtml(value){ return String(value).replace(/[&<>\'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch])); }
  function showConfirmation(overlay,data){
    const box=overlay.querySelector('.tintx-checkout');
    box.innerHTML=`<div class="tintx-confirmation"><div class="tintx-success-icon">✓</div><p class="eyebrow">ORDER CONFIRMED</p><h2>Thank you, ${escapeHtml(data.name)}!</h2><p>Your TINTX order has been placed successfully.</p><div class="tintx-order-id"><span>Order ID</span><strong>${escapeHtml(data.order_id)}</strong></div><div class="tintx-order-id"><span>Total</span><strong>${money(data.total)}</strong></div><p class="tintx-confirmation-small">Payment: Cash on Delivery. Please keep your phone available for delivery confirmation.</p><button class="button button-primary" type="button" id="tintx-done">Done</button></div>`;
    box.querySelector('#tintx-done').addEventListener('click',()=>overlay.remove());
  }
  function openCheckout(){
    const cart=getCart(),qty=cart.reduce((sum,item)=>sum+Number(item.qty||0),0)||1,total=qty*PRICE;
    const old=document.getElementById('tintx-checkout-overlay'); if(old)old.remove();
    const overlay=document.createElement('div'); overlay.id='tintx-checkout-overlay';
    overlay.innerHTML=`<div class="tintx-checkout-backdrop" data-close></div><section class="tintx-checkout" role="dialog" aria-modal="true"><button class="tintx-checkout-close" type="button" data-close aria-label="Close">×</button><p class="eyebrow">TINTX CHECKOUT</p><h2>Place your order</h2><p class="tintx-checkout-note">Cash on Delivery — no WhatsApp message required.</p><div class="tintx-order-summary"><div><span>${PRODUCT_NAME}</span><b>${qty} × ${money(PRICE)}</b></div><div class="tintx-total"><span>Total</span><strong>${money(total)}</strong></div></div><form id="tintx-order-form"><label>Full name<input name="name" required autocomplete="name" placeholder="Your name"></label><label>Phone number<input name="phone" required autocomplete="tel" inputmode="tel" placeholder="03XXXXXXXXX"></label><label>City<input name="city" required autocomplete="address-level2" placeholder="Karachi"></label><label>Full delivery address<textarea name="address" required autocomplete="street-address" rows="3" placeholder="House, street, area"></textarea></label><label>Car make & model<input name="car" required placeholder="e.g. Honda City 2018"></label><input type="hidden" name="product" value="TINTX Removable Car Window Shades"><input type="hidden" name="quantity" value="${qty}"><input type="hidden" name="total" value="${total}"><input type="hidden" name="payment" value="Cash on Delivery"><input type="hidden" name="_subject" value="New TINTX Website Order"><input type="hidden" name="_template" value="table"><button class="button button-primary tintx-place-order" type="submit">Place Order — ${money(total)}</button><p class="tintx-checkout-foot">We’ll use these details only to process your delivery.</p></form></section>`;
    document.body.appendChild(overlay);
    const close=()=>overlay.remove(); overlay.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',close));
    const form=overlay.querySelector('#tintx-order-form');
    form.addEventListener('submit',async e=>{
      e.preventDefault(); const data=Object.fromEntries(new FormData(form).entries()); data.order_id=orderId(); data.created_at=new Date().toISOString();
      const button=form.querySelector('button[type="submit"]'); button.disabled=true; button.textContent='Placing order…';
      try{ const response=await fetch(ORDER_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)}); if(!response.ok)throw new Error('Order service error'); localStorage.setItem('tintx-last-order',JSON.stringify(data)); setCart([]); showConfirmation(overlay,data); const count=document.getElementById('cart-count'); if(count)count.textContent='0'; }
      catch(err){ button.disabled=false; button.textContent=`Place Order — ${money(total)}`; alert('Order submit nahi ho saka. Please try again.'); }
    });
  }
  function shouldOpenCheckout(target){ if(!target)return false; const link=target.closest('a[href="#cart"], a.cart-link'); if(link)return true; return !!target.closest('[data-order], .order-button'); }
  document.addEventListener('click',e=>{ if(shouldOpenCheckout(e.target)){e.preventDefault();e.stopPropagation();openCheckout();} },true);
  window.addEventListener('load',()=>{if(!document.getElementById('tintx-checkout-styles')){const link=document.createElement('link');link.id='tintx-checkout-styles';link.rel='stylesheet';link.href='checkout.css?v=1';document.head.appendChild(link);}});
})();
