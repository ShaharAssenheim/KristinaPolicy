(function () {
  var links = document.querySelectorAll('[data-page]');
  var heading = document.querySelector('.hero__doc');
  var labels = { prices: '\u05de\u05d7\u05d9\u05e8\u05d5\u05df \u05d4\u05d8\u05d9\u05e4\u05d5\u05dc\u05d9\u05dd', terms: '\u05ea\u05e7\u05e0\u05d5\u05df \u05d4\u05e1\u05d8\u05d5\u05d3\u05d9\u05d5' };

  function render() {
    var page = location.hash === '#terms' ? 'terms' : 'prices';
    // Preserve existing links to individual policy sections.
    if (/^#s\d+$/.test(location.hash)) {
      page = 'terms';
    }
    document.getElementById('terms').style.display = page === 'terms' ? 'block' : 'none';
    document.getElementById('prices').style.display = page === 'prices' ? 'block' : 'none';
    links.forEach(function (link) {
      if (link.dataset.page === page) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    heading.textContent = labels[page];
    document.title = labels[page] + ' \u00b7 Kristina Place Of Beauty';
    window.dispatchEvent(new Event('resize'));
  }

  links.forEach(function (link) {
    link.addEventListener('click', function (event) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      var hash = link.getAttribute('href');
      if (location.hash !== hash) history.pushState(null, '', hash);
      render();
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  });
  window.addEventListener('popstate', render);
  window.addEventListener('hashchange', render);
  render();
})();
