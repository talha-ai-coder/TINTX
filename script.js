// TINTX Midnight Garage interaction layer: fitment selection updates every WhatsApp CTA and keeps the order flow explicit.
const phone = '923112205795';
const select = document.getElementById('carSelect');
const fitmentStatus = document.getElementById('fitmentStatus');
const whatsappLink = document.getElementById('whatsappLink');
const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

function buildWhatsAppLink(car) {
  const selected = car || 'my car model';
  const message = `Hi TINTX, I want to order the 4 Windows Removable Shades for ${selected}. Please confirm fitment and delivery.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function updateOrderLinks() {
  const car = select ? select.value : '';
  const href = buildWhatsAppLink(car);
  document.querySelectorAll('[data-wa-link]').forEach(link => { link.href = href; });
  if (whatsappLink) {
    whatsappLink.href = href;
    whatsappLink.classList.toggle('button-cyan', Boolean(car));
    whatsappLink.classList.toggle('button-muted', !car);
    whatsappLink.textContent = car ? '◌ Confirm & order on WhatsApp' : '◌ Ask us to check my car';
  }
  if (fitmentStatus) {
    fitmentStatus.textContent = car ? `● Perfect — we’ll confirm the fit for ${car}.` : '● Choose your car to confirm the fit before ordering.';
    fitmentStatus.classList.toggle('active', Boolean(car));
  }
}

if (select) select.addEventListener('change', updateOrderLinks);
if (menuButton) menuButton.addEventListener('click', () => mobileMenu.classList.toggle('active'));
document.querySelectorAll('.mobile-menu a').forEach(link => link.addEventListener('click', () => mobileMenu.classList.remove('active')));
updateOrderLinks();
