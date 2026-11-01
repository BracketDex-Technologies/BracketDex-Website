export const SITE_LOADER_BOOTSTRAP = `(() => {
  try {
    const key = 'bracketdex:site-loader:visited';
    if (sessionStorage.getItem(key) === 'true') return;
    sessionStorage.setItem(key, 'true');
  } catch {
    // Private browsing may disable storage; still allow this visit's intro.
  }
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const root = document.documentElement;
  root.dataset.siteLoader = 'pending';
  root.dataset.siteLoaderStarted = String(performance.now());
  root.classList.add('bd-site-loader-active');
  setTimeout(function () {
    window.dispatchEvent(new Event('bd-site-loader-timeout'));
    root.dataset.siteLoader = 'done';
    root.classList.remove('bd-site-loader-active');
    const content = document.getElementById('site-content');
    if (content) content.removeAttribute('inert');
  }, 10000);
})();`;
