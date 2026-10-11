(() => {
  function goToCheckout() {
    window.location.href = 'checkout.html';
  }

  // Keep this public for the fitment helper and any future order buttons.
  window.openCheckout = goToCheckout;

  function shouldOpenCheckout(target) {
    if (!target || !target.closest) return false;
    return Boolean(target.closest('[data-order], .order-button'));
  }

  document.addEventListener('click', event => {
    if (!shouldOpenCheckout(event.target)) return;
    event.preventDefault();
    event.stopPropagation();
    goToCheckout();
  }, true);
})();
