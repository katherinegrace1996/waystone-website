/* nav.js — injects consistent header and footer, highlights active nav link */
(function () {
  const pages = [
    { label: 'Home',           href: 'index.html' },
    { label: 'About',          href: 'about.html' },
    { label: 'Services',       href: 'services.html' },
    { label: 'Fees & Rebates', href: 'fees.html' },
    { label: 'Contact',        href: 'contact.html' },
    { label: 'FAQ',            href: 'faq.html' },
    { label: 'Your Privacy',   href: 'privacy.html' },
  ];

  const current = window.location.pathname.split('/').pop() || 'index.html';

  /* ── Header ── */
  const navLinks = pages
    .map(p => `<a href="${p.href}"${p.href === current ? ' class="active" aria-current="page"' : ''}>${p.label}</a>`)
    .join('\n');

  const headerHTML = `
<header class="site-header">
  <div class="header-inner">
    <a href="index.html" class="logo" aria-label="Waystone Clinical Psychology — Home">
      <span class="logo__wordmark">Waystone</span>
      <span class="logo__sub">Clinical Psychology</span>
    </a>
    <button class="nav-toggle" aria-controls="site-nav" aria-expanded="false" aria-label="Toggle navigation">
      <span></span><span></span><span></span>
    </button>
    <nav class="site-nav" id="site-nav" role="navigation" aria-label="Main navigation">
      ${navLinks}
    </nav>
  </div>
</header>`;

  /* ── Footer ── */
  const footerHTML = `
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-logo">
      <a href="index.html" class="logo">
        <span class="logo__wordmark">Waystone</span>
        <span class="logo__sub">Clinical Psychology</span>
      </a>
      <p>Telehealth only practice<br>Suite 202, 165-167 Phillip Street<br>Sydney NSW 2000</p>
    </div>
    <div class="footer-contact">
      <p class="footer-heading">Get in touch</p>
      <p><a href="mailto:katy@waystoneclinicalpsychology.com.au">katy@waystoneclinicalpsychology.com.au</a></p>
      <p style="margin-top:1.2rem;font-size:0.82rem;color:var(--stone-light);">Tuesday – Friday, 9am – 5pm</p>
      <p style="font-size:0.82rem;color:var(--stone-light);">Enquiries responded to within 1–2 business days</p>
    </div>
  </div>
  <div class="footer-bottom">
    <p class="acknowledgement">Waystone Clinical Psychology acknowledges the Traditional Custodians of the lands on which we work and live, and pays respect to Elders past, present and emerging.</p>
    <p class="copyright">© 2026 Waystone Clinical Psychology</p>
  </div>
</footer>`;

  /* ── Inject ── */
  const headerTarget = document.getElementById('site-header-placeholder');
  const footerTarget = document.getElementById('site-footer-placeholder');
  if (headerTarget) headerTarget.outerHTML = headerHTML;
  if (footerTarget) footerTarget.outerHTML = footerHTML;

  /* ── Hamburger toggle ── */
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('is-open', !expanded);
    });

    /* Close nav when a link is clicked (mobile) */
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      });
    });
  }
})();
