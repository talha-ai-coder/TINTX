/* Car-first TINTX catalog: brand -> model/generation -> exact year -> shade option. */
(() => {
  const PRODUCTS = [
    { id: 'tintx-full-window', name: 'Full Window Coverage Sunshades', price: 2499, label: 'FULL WINDOW' },
    { id: 'tintx-half-window', name: 'Half Window Coverage Sunshades', price: 2499, label: 'HALF WINDOW' },
    { id: 'tintx-front-shield', name: 'Front Window Shield', price: 3500, label: 'FRONT WINDOW' },
    { id: 'tintx-rear-shield', name: 'Rear Window Shield', price: 2800, label: 'REAR WINDOW' }
  ];
  const WA = 'https://wa.me/923112205795';
  const money = value => `PKR ${Number(value).toLocaleString('en-PK')}`;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  const slug = value => String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  let photos = {};
  let activeBrand = '';
  let activeRecord = null;
  let selectedVehicle = null;
  let pendingProduct = '';

  window.TINTX_FOUR_PRODUCT_CATALOG = true;
  window.TINTX_PRODUCTS = PRODUCTS;

  function splitGeneration(raw) {
    const match = String(raw).match(/^(.*?)\s+((?:19|20)\d{2})-((?:19|20)\d{2})$/);
    if (!match) return { name: String(raw), start: null, end: null };
    return { name: match[1].trim(), start: Number(match[2]), end: Number(match[3]) };
  }

  function getPhoto(brand, rawModel) {
    const generation = splitGeneration(rawModel);
    const photo = photos[`${brand}|${rawModel}`] || photos[`${brand}|${generation.name}`] || null;
    const title = photo?.title || '';
    const titleLower = title.toLowerCase();
    const yearMatch = photo?.title?.match(/^(19|20)\d{2}\b/);
    if (photo && generation.start && yearMatch && !/^\d{4}[-_]\d{2}[-_]\d{2}\b/.test(title)) {
      const titledYear = Number(yearMatch[0]);
      if (titledYear < generation.start || titledYear > generation.end) return null;
    }
    if (brand === 'SUZUKI' && generation.name.toLowerCase() === 'alto' && /\bvan\b/.test(titleLower)) return null;
    if (brand === 'HONDA' && generation.name.toLowerCase() === 'city' && /\b(hatchback|civic)\b/.test(titleLower)) return null;
    if (brand === 'TOYOTA' && generation.name.toLowerCase() === 'corolla' && /\bspacio\b/.test(titleLower)) return null;
    if (brand === 'LAND ROVER' && generation.name.toLowerCase() === 'range rover' && /\b(evoque|velar|sport)\b/.test(titleLower)) return null;
    return photo;
  }

  function photoMarkup(brand, rawModel, className = '') {
    const photo = getPhoto(brand, rawModel);
    const modelName = splitGeneration(rawModel).name;
    if (!photo) {
      return `<div class="tintx-car-photo-fallback ${className}" role="img" aria-label="Car photo for ${esc(brand)} ${esc(modelName)} is not available yet">
        <svg viewBox="0 0 160 90" aria-hidden="true"><path d="M24 57h112l-9-23a13 13 0 0 0-12-8H52a14 14 0 0 0-12 8L31 47h-7a8 8 0 0 0-8 8v12h10a13 13 0 0 0 26 0h52a13 13 0 0 0 26 0h10V57zM48 35a5 5 0 0 1 4-2h18v14H39zm29-2h37a5 5 0 0 1 5 4l6 10H77zM39 73a7 7 0 1 1 0-14 7 7 0 0 1 0 14m68 0a7 7 0 1 1 0-14 7 7 0 0 1 0 14"/></svg>
        <span>Car photo not sourced yet</span>
      </div>`;
    }
    const source = photo.sourceUrl || '';
    const credit = photo.author || 'Wikimedia Commons contributor';
    const license = photo.license || 'Open-license image';
    const attribution = `“${photo.title || 'Vehicle photo'}” by ${credit} · ${license}`;
    return `<figure class="tintx-car-photo ${className}">
      <img src="${esc(photo.src)}" alt="Representative photo of ${esc(brand)} ${esc(modelName)}" loading="lazy" decoding="async">
      <figcaption>${source ? `<a href="${esc(source)}" title="${esc(attribution)}" target="_blank" rel="noopener noreferrer">${esc(attribution)}</a>` : esc(attribution)}</figcaption>
    </figure>`;
  }

  function modelPhotoMarkup(brand, rawModel) {
    const photo = getPhoto(brand, rawModel);
    const name = splitGeneration(rawModel).name;
    if (!photo) return photoMarkup(brand, rawModel, 'tintx-generation-photo');
    return `<div class="tintx-generation-photo tintx-car-photo"><img src="${esc(photo.src)}" alt="Representative photo of ${esc(brand)} ${esc(name)}" loading="lazy" decoding="async"><span class="tintx-photo-badge">REPRESENTATIVE PHOTO</span></div>`;
  }

  function productIcon(id) {
    const variants = {
      'tintx-full-window': '<rect x="18" y="15" width="64" height="30" rx="8"/><rect x="18" y="51" width="64" height="26" rx="8"/>',
      'tintx-half-window': '<path d="M18 15h64v16H18z"/><path d="M18 51h64v15H18z"/>',
      'tintx-front-shield': '<path d="M17 54 28 23q3-8 12-8h24q9 0 12 8l11 31z"/>',
      'tintx-rear-shield': '<path d="m18 31 12-16h40l12 16-4 23H22z"/>'
    };
    return `<svg class="tintx-product-icon" viewBox="0 0 100 92" aria-hidden="true"><path class="tintx-icon-car" d="M14 61h72v11H14zM23 60l7-26q2-7 9-7h22q7 0 10 7l7 26"/><g class="tintx-icon-shade">${variants[id] || variants['tintx-full-window']}</g><circle cx="27" cy="74" r="6"/><circle cx="73" cy="74" r="6"/></svg>`;
  }

  function simpleProductCards(context = 'browse') {
    return `<div class="tintx-product-option-grid">${PRODUCTS.map(product => `
      <article class="tintx-product-option" data-product-card="${product.id}">
        <div class="tintx-product-option-art">${productIcon(product.id)}<span>${esc(product.label)}</span></div>
        <div class="tintx-product-option-copy">
          <p class="tintx-product-kicker">TINTX SHADE TYPE</p>
          <h3>${esc(product.name)}</h3>
          <strong class="tintx-product-price">${money(product.price)}</strong>
          <p>Choose your exact car year; our team will confirm fitment before dispatch.</p>
          <button type="button" class="button button-primary tintx-choose-car" data-choose-product="${product.id}">Choose your car →</button>
        </div>
      </article>`).join('')}</div>`;
  }

  function injectHomeProducts() {
    const section = document.querySelector('.product-section');
    if (!section || section.dataset.tintxCatalog === 'v2') return;
    section.dataset.tintxCatalog = 'v2';
    section.innerHTML = `<div class="section-heading"><div><p class="eyebrow">FOUR WAYS TO SHADE</p><h2>Choose your coverage</h2></div><a class="text-link" href="#vehicle-browser">Select your car →</a></div>${simpleProductCards('home')}`;
  }

  function replaceLegacySelector() {
    const model = document.getElementById('browser-model');
    const search = document.getElementById('browser-search');
    if (model) model.remove();
    if (search) search.remove();
    const make = document.getElementById('browser-make');
    if (make) make.onchange = null;
    const intro = document.querySelector('.vehicle-browser .hero-lede');
    if (intro) intro.textContent = 'Choose a brand, model generation and exact year. Then compare all four TINTX shade options.';
  }

  function renderShop() {
    const grid = document.querySelector('.catalogue .product-grid');
    if (!grid || grid.dataset.tintxCatalog === 'v2') return;
    grid.dataset.tintxCatalog = 'v2';
    grid.innerHTML = simpleProductCards('shop');
    const heading = document.querySelector('.catalogue-head span:first-child');
    if (heading) heading.textContent = '4 shade options';
    const layout = grid.closest('.shop-layout');
    layout?.classList.add('tintx-shop-layout');
    layout?.querySelector('.filters')?.remove();
    const search = document.getElementById('search');
    const sort = document.getElementById('sort');
    const applyShopControls = () => {
      const query = (search?.value || '').trim().toLowerCase();
      const cards = [...grid.querySelectorAll('[data-product-card]')];
      cards.forEach(card => { card.hidden = !!query && !card.textContent.toLowerCase().includes(query); });
      const direction = sort?.value || '';
      if (direction.includes('low to high')) cards.sort((a, b) => Number(a.querySelector('.tintx-product-price').textContent.replace(/\D/g, '')) - Number(b.querySelector('.tintx-product-price').textContent.replace(/\D/g, '')));
      if (direction.includes('high to low')) cards.sort((a, b) => Number(b.querySelector('.tintx-product-price').textContent.replace(/\D/g, '')) - Number(a.querySelector('.tintx-product-price').textContent.replace(/\D/g, '')));
      cards.forEach(card => grid.appendChild(card));
    };
    search?.addEventListener('input', applyShopControls);
    sort?.addEventListener('change', applyShopControls);
  }

  function renderProductPage() {
    const page = document.querySelector('#app .page-wrap');
    if (!page || (location.hash || '#home') !== '#product' || page.dataset.tintxCatalog === 'v2') return;
    page.dataset.tintxCatalog = 'v2';
    page.innerHTML = `<p class="eyebrow">TINTX SHADE OPTIONS</p><h1 class="page-title">Choose your coverage.</h1><p class="page-intro">Four window-shade options. Pick your car and year to see the right order details; fitment is confirmed before dispatch.</p>${simpleProductCards('product')}<div class="tintx-catalog-footer"><a class="button button-ghost" href="#home">Browse car brands →</a></div>`;
  }

  function cardPhotoCredit(photo) {
    if (!photo) return '';
    const source = photo.sourceUrl || '';
    const text = `“${photo.title || 'Vehicle photo'}” by ${photo.author || 'Commons contributor'} · ${photo.license || 'Open-license'}`;
    return source ? `<a class="tintx-credit" href="${esc(source)}" target="_blank" rel="noopener noreferrer">${esc(text)}</a>` : `<span class="tintx-credit">${esc(text)}</span>`;
  }

  function modelCard(brand, rawModel, index) {
    const info = splitGeneration(rawModel);
    const years = info.start ? `${info.start}–${info.end}` : 'Enter exact year';
    const photo = getPhoto(brand, rawModel);
    return `<article class="tintx-generation-card">
      <button type="button" class="tintx-generation-select" data-generation-index="${index}">
        ${modelPhotoMarkup(brand, rawModel)}
        <span class="tintx-generation-meta"><span>${esc(brand)}</span><strong>${esc(info.name)}</strong><small>${esc(years)}</small><b>SELECT MODEL →</b></span>
      </button>
      ${cardPhotoCredit(photo)}
    </article>`;
  }

  function showModels(brand) {
    activeBrand = brand;
    activeRecord = null;
    selectedVehicle = null;
    const results = document.getElementById('browser-results');
    const models = VEHICLE_DATA[brand] || [];
    if (!results) return;
    if (!models.length) {
      results.innerHTML = `<div class="empty-state">Choose a car brand to start.</div>`;
      return;
    }
    results.innerHTML = `<section class="tintx-model-step" aria-live="polite">
      <div class="tintx-step-heading"><div><p class="eyebrow">STEP 2 · MODEL</p><h3>Choose your ${esc(brand)} model</h3></div><span>${models.length} model/generation options</span></div>
      <p class="tintx-fitment-disclaimer">Photos are representative model references. Fitment is checked against the exact year before dispatch.</p>
      <div class="tintx-generation-grid">${models.map((model, index) => modelCard(brand, model, index)).join('')}</div>
    </section>`;
  }

  function yearButtons(info) {
    const years = [];
    for (let year = info.start; year <= info.end; year += 1) years.push(year);
    return `<div class="tintx-year-grid" role="group" aria-label="Select exact model year">${years.map(year => `<button type="button" class="tintx-year-button" data-year="${year}">${year}</button>`).join('')}</div>`;
  }

  function showYearSelection(brand, rawModel) {
    activeBrand = brand;
    activeRecord = rawModel;
    const info = splitGeneration(rawModel);
    const photo = getPhoto(brand, rawModel);
    const results = document.getElementById('browser-results');
    if (!results) return;
    const yearContent = info.start
      ? yearButtons(info)
      : `<div class="tintx-manual-year"><label for="tintx-exact-year">Your car's model year</label><input id="tintx-exact-year" type="number" min="1950" max="2026" inputmode="numeric" placeholder="e.g. 2022"><button type="button" class="button button-primary" data-confirm-year>Continue →</button></div>`;
    const customOther = brand === 'OTHER' || /not listed/i.test(info.name)
      ? `<label class="tintx-custom-model-label" for="tintx-custom-model">Enter your make and model</label><input id="tintx-custom-model" type="text" required placeholder="e.g. Toyota Corolla Cross">`
      : '';
    results.innerHTML = `<section class="tintx-year-step" aria-live="polite">
      <button type="button" class="tintx-back-link" data-action="back-models">← Back to ${esc(brand)} models</button>
      <div class="tintx-selected-vehicle">${photoMarkup(brand, rawModel, 'tintx-selected-vehicle-photo')}<div><p class="eyebrow">STEP 3 · YEAR</p><h3>${esc(brand)} ${esc(info.name)}</h3><span>${info.start ? `Model years ${info.start}–${info.end}` : 'Year confirmation needed'}</span><p class="tintx-fitment-disclaimer">Select the exact year. The year range on this card is used to identify the generation; it is not a fitment guarantee.</p></div></div>
      ${customOther}<div class="tintx-year-picker">${info.start ? '<p class="tintx-picker-label">Select your exact year</p>' : ''}${yearContent}</div>
      ${cardPhotoCredit(photo)}
    </section>`;
  }

  function vehicleName(brand, rawModel, year) {
    const info = splitGeneration(rawModel);
    const custom = document.getElementById('tintx-custom-model')?.value?.trim();
    const make = brand === 'OTHER' ? 'Other' : brand;
    const model = custom || info.name;
    return `${make} ${model} ${year}`.replace(/\s+/g, ' ').trim();
  }

  function productOrderLink(product, car) {
    const message = `Hi TINTX, I want to place a Cash on Delivery order. Product: ${product.name}. Price: ${money(product.price)}. Car: ${car}. Please confirm fitment before dispatch.`;
    return `${WA}?text=${encodeURIComponent(message)}`;
  }

  function showProductOptions(brand, rawModel, year, carOverride = '') {
    activeBrand = brand;
    activeRecord = rawModel;
    const info = splitGeneration(rawModel);
    const car = carOverride || vehicleName(brand, rawModel, year);
    selectedVehicle = { brand, rawModel, year, car, info };
    const photo = getPhoto(brand, rawModel);
    const currentFit = brand === 'HONDA' && /^City$/i.test(info.name);
    const status = currentFit ? 'Honda City is listed · confirm exact year' : 'Fitment confirmation required';
    const results = document.getElementById('browser-results');
    if (!results) return;
    results.innerHTML = `<section class="tintx-product-step" aria-live="polite">
      <button type="button" class="tintx-back-link" data-action="back-years">← Change car year</button>
      <div class="tintx-selected-vehicle">${photoMarkup(brand, rawModel, 'tintx-selected-vehicle-photo')}<div><p class="eyebrow">STEP 4 · SHADE OPTIONS</p><h3>${esc(car)}</h3><span class="tintx-fitment-status${currentFit ? ' is-current' : ' is-check'}">${esc(status)}</span><p class="tintx-fitment-disclaimer">Exact fitment and included panels will be confirmed before dispatch.</p></div></div>
      <div class="tintx-step-heading"><div><p class="eyebrow">FOUR TINTX PRODUCTS</p><h3>Choose your window coverage</h3></div><span>Cash on Delivery available</span></div>
      <div class="tintx-product-option-grid tintx-product-option-grid-selected">${PRODUCTS.map(product => {
        const selected = pendingProduct === product.id;
        return `<article class="tintx-product-option${selected ? ' is-pending' : ''}" id="tintx-product-${product.id}" data-product-card="${product.id}">
          <div class="tintx-product-option-art">${productIcon(product.id)}<span>${esc(product.label)}</span></div>
          <div class="tintx-product-option-copy"><p class="tintx-product-kicker">TINTX SHADE TYPE</p><h3>${esc(product.name)}</h3><strong class="tintx-product-price">${money(product.price)}</strong><p>For ${esc(car)}. Exact fitment is confirmed before dispatch.</p>
            <button type="button" class="button button-primary tintx-add-to-cart" data-add-product="${product.id}">Add to website cart</button>
            <a class="button button-ghost tintx-whatsapp-order" href="${productOrderLink(product, car)}" target="_blank" rel="noopener noreferrer">Order on WhatsApp COD</a>
          </div>
        </article>`;
      }).join('')}</div>
      ${cardPhotoCredit(photo)}
    </section>`;
    if (pendingProduct) {
      const target = document.getElementById(`tintx-product-${pendingProduct}`);
      window.setTimeout(() => target?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
    }
  }

  function addToCart(productId) {
    const product = PRODUCTS.find(item => item.id === productId);
    if (!product || !selectedVehicle || typeof cart === 'undefined' || typeof save !== 'function') return;
    const existing = cart.find(item => item.productId === product.id && item.fitment === selectedVehicle.car);
    if (existing) existing.qty = Math.max(1, Number(existing.qty || 1)) + 1;
    else cart.push({
      id: `${product.id}::${slug(selectedVehicle.car)}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      oldPrice: 0,
      badge: 'TINTX SHADE',
      qty: 1,
      fitment: selectedVehicle.car,
      model: selectedVehicle.info.name,
      year: String(selectedVehicle.year),
      fitmentStatus: selectedVehicle.brand === 'HONDA' && /^City$/i.test(selectedVehicle.info.name) ? 'Current Honda City listing; verify exact fitment' : 'Fitment confirmation required',
      image: getPhoto(selectedVehicle.brand, selectedVehicle.rawModel)?.src || 'product-main.jpg'
    });
    save();
    const button = document.querySelector(`[data-add-product="${CSS.escape(productId)}"]`);
    if (button) {
      button.textContent = 'Added to cart ✓';
      window.setTimeout(() => { if (button.isConnected) button.textContent = 'Add to website cart'; }, 1400);
    }
  }

  function scrollToVehicleBrowser() {
    const browser = document.getElementById('vehicle-browser');
    if (browser) browser.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function chooseProduct(productId) {
    pendingProduct = productId;
    if ((location.hash || '#home') !== '#home') {
      location.hash = '#home';
      window.setTimeout(scrollToVehicleBrowser, 450);
    } else scrollToVehicleBrowser();
  }

  function bindDelegatedEvents() {
    document.addEventListener('click', event => {
      const brandButton = event.target.closest('.brand-item[data-brand]');
      if (brandButton) {
        event.preventDefault();
        event.stopImmediatePropagation();
        const brand = brandButton.dataset.brand;
        const make = document.getElementById('browser-make');
        if (make) make.value = brand;
        document.querySelectorAll('.brand-item').forEach(item => item.classList.toggle('active', item.dataset.brand === brand));
        showModels(brand);
        scrollToVehicleBrowser();
        return;
      }
      const productChoice = event.target.closest('[data-choose-product]');
      if (productChoice) {
        event.preventDefault();
        chooseProduct(productChoice.dataset.chooseProduct);
        return;
      }
      const generation = event.target.closest('[data-generation-index]');
      if (generation) {
        event.preventDefault();
        const models = VEHICLE_DATA[activeBrand] || [];
        const rawModel = models[Number(generation.dataset.generationIndex)];
        if (rawModel) showYearSelection(activeBrand, rawModel);
        return;
      }
      const year = event.target.closest('[data-year]');
      if (year) {
        event.preventDefault();
        if (activeBrand && activeRecord) showProductOptions(activeBrand, activeRecord, Number(year.dataset.year));
        return;
      }
      if (event.target.closest('[data-confirm-year]')) {
        event.preventDefault();
        const customModel = document.getElementById('tintx-custom-model');
        if (customModel && !customModel.value.trim()) { customModel.setCustomValidity('Enter your car make and model.'); customModel.focus(); customModel.reportValidity(); return; }
        customModel?.setCustomValidity('');
        const input = document.getElementById('tintx-exact-year');
        const value = Number(input?.value);
        if (!Number.isInteger(value) || value < 1950 || value > 2026) { input?.focus(); input?.setCustomValidity('Enter a year between 1950 and 2026.'); input?.reportValidity(); return; }
        input.setCustomValidity('');
        if (activeBrand && activeRecord) showProductOptions(activeBrand, activeRecord, value);
        return;
      }
      if (event.target.closest('[data-action="back-models"]')) {
        event.preventDefault();
        showModels(activeBrand);
        return;
      }
      if (event.target.closest('[data-action="back-years"]')) {
        event.preventDefault();
        if (activeBrand && activeRecord) showYearSelection(activeBrand, activeRecord);
        return;
      }
      const add = event.target.closest('[data-add-product]');
      if (add) {
        event.preventDefault();
        addToCart(add.dataset.addProduct);
      }
    });

    document.addEventListener('change', event => {
      if (event.target?.id !== 'browser-make') return;
      event.stopImmediatePropagation();
      const brand = event.target.value;
      if (brand) {
        document.querySelectorAll('.brand-item').forEach(item => item.classList.toggle('active', item.dataset.brand === brand));
        showModels(brand);
      } else {
        const results = document.getElementById('browser-results');
        if (results) results.innerHTML = '<div class="empty-state">Select a brand above, or click a brand logo, to see its models.</div>';
      }
    }, true);
  }

  function enhance() {
    replaceLegacySelector();
    const route = (location.hash || '#home').replace('#', '');
    if (!route || route === 'home') injectHomeProducts();
    if (route === 'shop') renderShop();
    if (route === 'product') renderProductPage();
  }

  function refreshDisplayedFlow() {
    if (!document.getElementById('browser-results') || (location.hash || '#home') !== '#home' || !activeBrand) return;
    if (selectedVehicle) return showProductOptions(activeBrand, activeRecord, selectedVehicle.year, selectedVehicle.car);
    if (activeRecord) {
      if (['tintx-custom-model', 'tintx-exact-year'].includes(document.activeElement?.id)) return;
      return showYearSelection(activeBrand, activeRecord);
    }
    showModels(activeBrand);
  }

  function init() {
    const result = document.getElementById('browser-results');
    if (result) result.innerHTML = '<div class="empty-state">Select a brand above, or click a brand logo, to see its models.</div>';
    const make = document.getElementById('browser-make');
    if (make) make.onchange = null;
    bindDelegatedEvents();
    enhance();
    fetch('vehicle-photo-credits.json?v=2').then(response => response.ok ? response.json() : {}).then(data => {
      photos = data || {};
      enhance();
      refreshDisplayedFlow();
    }).catch(() => { photos = {}; });
    window.addEventListener('hashchange', () => window.setTimeout(enhance, 0));
    const app = document.getElementById('app');
    if (app) new MutationObserver(() => window.setTimeout(enhance, 0)).observe(app, { childList: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
