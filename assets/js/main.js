/* Coventry — interacciones mínimas (sin frameworks) */
(function () {
  // Menú móvil
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.nav a').forEach(function (a) {
      a.addEventListener('click', function () { document.body.classList.remove('nav-open'); toggle.setAttribute('aria-expanded', 'false'); });
    });
  }

  // Filtros del catálogo
  var filters = document.querySelectorAll('.filter');
  if (filters.length) {
    var cards = document.querySelectorAll('[data-cat]');
    var count = document.querySelector('[data-count]');
    var empty = document.querySelector('.empty');
    var apply = function (cat) {
      var shown = 0;
      filters.forEach(function (f) { f.setAttribute('aria-pressed', f.dataset.filter === cat ? 'true' : 'false'); });
      cards.forEach(function (c) {
        var ok = cat === 'todos' || c.dataset.cat === cat;
        c.hidden = !ok;
        if (ok) shown++;
      });
      if (count) count.textContent = shown;
      if (empty) empty.style.display = shown ? 'none' : 'block';
    };
    filters.forEach(function (f) { f.addEventListener('click', function () { apply(f.dataset.filter); }); });
    var initial = (location.hash || '').replace('#', '');
    if (initial && document.querySelector('[data-filter="' + initial + '"]')) apply(initial);
  }

  // Galería de la ficha
  document.querySelectorAll('.thumb').forEach(function (t) {
    t.addEventListener('click', function () {
      document.querySelectorAll('.thumb').forEach(function (o) { o.removeAttribute('aria-current'); });
      t.setAttribute('aria-current', 'true');
      var label = document.querySelector('[data-gallery-label]');
      if (label) label.textContent = t.dataset.label;
    });
  });

  // Capacidad seleccionada en la ficha
  document.querySelectorAll('input[name="capacidad"]').forEach(function (r) {
    r.addEventListener('change', function () {
      var out = document.querySelector('[data-cap-out]');
      if (out) out.textContent = r.value;
    });
  });

  // Formularios (contacto y distribuidores): confirmación de envío de prueba
  document.querySelectorAll('[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = form.querySelector('.form-ok');
      if (ok) { ok.classList.add('is-visible'); ok.focus(); }
    });
  });

  // ¿Dónde comprar?
  var finder = document.querySelector('[data-finder]');
  if (finder) {
    finder.addEventListener('submit', function (e) {
      e.preventDefault();
      var sel = finder.querySelector('select');
      var title = document.querySelector('[data-finder-title]');
      if (sel.value && title) title.textContent = 'Tiendas en ' + sel.options[sel.selectedIndex].text;
    });
  }

  // Año en el pie
  document.querySelectorAll('[data-year]').forEach(function (y) { y.textContent = new Date().getFullYear(); });
})();
