(function () {
  "use strict";

  const navLinks = [
    { href: "/services", label: "Services", match: (p) => p === "/services" || p.startsWith("/services/") },
    { href: "/blog", label: "Blog", match: (p) => p === "/blog" || p.startsWith("/blog/") },
    { href: "/about", label: "About", match: (p) => p === "/about" },
    { href: "/contact", label: "Contact", match: (p) => p === "/contact" },
  ];

  const salesLinks = [
    { href: "/sales/hardware", label: "Hardware", group: "sales" },
    { href: "/sales/software", label: "Software", group: "sales" },
    { href: "/sales/training", label: "Training", group: "sales" },
    { href: "/sales/professional-services", label: "Professional services", group: "sales" },
    { href: "/services/expertise", label: "IMS expertise", group: "ims" },
  ];

  const toolLinks = [
    { href: "/tools/ims-species-guide/", label: "IMS Species Guide" },
    { href: "/interactive-tools/hullCalc.html", label: "Fouling Cost Calculator" },
    { href: "/interactive-tools/bfmpGen.html", label: "BFMP Generator" },
    { href: "/core-pages/rov-autoconnect.html", label: "ROV AutoConnect" },
  ];

  const path = window.location.pathname.replace(/\/$/, "") || "/";

  function isNavItemCurrent(href) {
    if (href.startsWith("http")) return false;
    const normalizedHref = href.replace(/\/$/, "").replace(/\.html$/, "");
    const normalizedPath = path.replace(/\.html$/, "");
    if (normalizedPath === normalizedHref) return true;
    if (normalizedHref.endsWith("/ims-species-guide") && normalizedPath.includes("/ims-species-guide")) return true;
    return normalizedPath.startsWith(normalizedHref + "/");
  }

  function isSalesCurrent() {
    return path === "/sales" || path.startsWith("/sales/") || path === "/services/expertise";
  }

  function isToolsCurrent() {
    return toolLinks.some((tool) => isNavItemCurrent(tool.href));
  }

  function renderSalesMenu() {
    return salesLinks
      .map((item) => {
        const current = isNavItemCurrent(item.href) ? ' aria-current="page"' : "";
        if (item.group === "ims") {
          return `<li class="nav-dropdown__divider-item"><span class="nav-dropdown__label">Professional services</span><a href="${item.href}"${current}>${item.label}</a></li>`;
        }
        return `<li><a href="${item.href}"${current}>${item.label}</a></li>`;
      })
      .join("");
  }

  function renderHeader() {
    const servicesLink = navLinks[0];
    const servicesCurrent = servicesLink.match(path) ? ' aria-current="page"' : "";
    const otherNav = navLinks
      .slice(1)
      .map((link) => {
        const current = link.match(path) ? ' aria-current="page"' : "";
        return `<a href="${link.href}"${current}>${link.label}</a>`;
      })
      .join("");

    const toolItems = toolLinks
      .map((tool) => {
        const current = isNavItemCurrent(tool.href) ? ' aria-current="page"' : "";
        return `<li><a href="${tool.href}"${current}>${tool.label}</a></li>`;
      })
      .join("");

    const salesOpen = isSalesCurrent();
    const toolsOpen = isToolsCurrent();

    return `
      <div class="ms-v2-chrome">
        <header class="site-header">
          <div class="container site-header__inner">
            <a class="logo" href="/" aria-label="MarineStream home">
              <img src="/images/brand/marinestream_logo_white.png" alt="MarineStream™" width="180" height="40" />
            </a>
            <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="ms-v2-site-nav" id="ms-v2-nav-toggle">Menu</button>
            <nav class="nav" id="ms-v2-site-nav" aria-label="Primary">
              <a href="${servicesLink.href}"${servicesCurrent}>${servicesLink.label}</a>
              <div class="nav-dropdown${salesOpen ? " is-open" : ""}" data-nav-dropdown>
                <button class="nav-dropdown__toggle" type="button" aria-expanded="${salesOpen ? "true" : "false"}" aria-controls="ms-v2-sales-menu" aria-haspopup="true">Sales</button>
                <ul class="nav-dropdown__menu" id="ms-v2-sales-menu"${salesOpen ? "" : " hidden"}>${renderSalesMenu()}</ul>
              </div>
              ${otherNav}
              <div class="nav-dropdown${toolsOpen ? " is-open" : ""}" data-nav-dropdown>
                <button class="nav-dropdown__toggle" type="button" aria-expanded="${toolsOpen ? "true" : "false"}" aria-controls="ms-v2-tools-menu" aria-haspopup="true">Tools</button>
                <ul class="nav-dropdown__menu" id="ms-v2-tools-menu"${toolsOpen ? "" : " hidden"}>${toolItems}</ul>
              </div>
            </nav>
          </div>
        </header>
      </div>
    `;
  }

  function renderFooter() {
    const year = new Date().getFullYear();
    const footerNav = [
      `<a href="/services">Services</a>`,
      `<a href="/sales">Sales</a>`,
      ...navLinks.slice(1).map((link) => `<a href="${link.href}">${link.label}</a>`),
      `<a href="/privacy">Privacy</a>`,
    ].join("");
    const footerTools = toolLinks.map((tool) => `<li><a href="${tool.href}">${tool.label}</a></li>`).join("");

    return `
      <div class="ms-v2-chrome">
        <footer class="site-footer">
          <div class="container site-footer__inner">
            <div>
              <img class="footer-logo" src="/images/brand/marinestream_logo_white.png" alt="MarineStream™" width="160" height="36" />
              <p class="footer-tag">Enabling IMO-compliant biofouling inspections and cleans.</p>
              <p><a href="https://www.franmarine.com.au/" rel="noopener noreferrer">A division of Franmarine</a></p>
            </div>
            <nav class="footer-nav" aria-label="Footer">${footerNav}</nav>
            <div class="footer-tools">
              <h2 class="footer-tools__title">Tools</h2>
              <ul class="footer-tools__list">${footerTools}</ul>
            </div>
          </div>
          <div class="container site-footer__bottom">
            <span>© ${year} MarineStream</span>
            <span>13 Possner Way, Henderson WA 6166 · +61 8 9437 3900</span>
          </div>
        </footer>
      </div>
    `;
  }

  function mountChrome() {
    const navMount = document.getElementById("nav-placeholder");
    const footerMount = document.getElementById("footer-placeholder");

    if (navMount) navMount.outerHTML = renderHeader();
    if (footerMount) footerMount.outerHTML = renderFooter();

    const rovHeader = document.querySelector(".main-header");
    if (rovHeader) rovHeader.outerHTML = renderHeader();

    const rovFooter = document.getElementById("main-footer");
    if (rovFooter) rovFooter.outerHTML = renderFooter();

    initNav();
  }

  function initNav() {
    const toggle = document.getElementById("ms-v2-nav-toggle");
    const nav = document.getElementById("ms-v2-site-nav");
    const dropdowns = document.querySelectorAll("[data-nav-dropdown]");

    toggle?.addEventListener("click", () => {
      const open = nav?.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    dropdowns.forEach((dropdown) => {
      const menu = dropdown.querySelector(".nav-dropdown__menu");
      const menuToggle = dropdown.querySelector(".nav-dropdown__toggle");
      let hoverCloseTimer;

      function openMenu() {
        dropdown.classList.add("is-open");
        menu?.removeAttribute("hidden");
        menuToggle?.setAttribute("aria-expanded", "true");
      }

      function closeMenu() {
        dropdown.classList.remove("is-open");
        menu?.setAttribute("hidden", "");
        menuToggle?.setAttribute("aria-expanded", "false");
      }

      menuToggle?.addEventListener("click", (event) => {
        event.stopPropagation();
        if (dropdown.classList.contains("is-open")) closeMenu();
        else {
          dropdowns.forEach((other) => {
            if (other !== dropdown) {
              other.classList.remove("is-open");
              other.querySelector(".nav-dropdown__menu")?.setAttribute("hidden", "");
              other.querySelector(".nav-dropdown__toggle")?.setAttribute("aria-expanded", "false");
            }
          });
          openMenu();
        }
      });

      dropdown.addEventListener("mouseenter", () => {
        if (window.innerWidth <= 760) return;
        clearTimeout(hoverCloseTimer);
        dropdowns.forEach((other) => {
          if (other !== dropdown) {
            other.classList.remove("is-open");
            other.querySelector(".nav-dropdown__menu")?.setAttribute("hidden", "");
            other.querySelector(".nav-dropdown__toggle")?.setAttribute("aria-expanded", "false");
          }
        });
        openMenu();
      });

      dropdown.addEventListener("mouseleave", () => {
        if (window.innerWidth <= 760) return;
        hoverCloseTimer = setTimeout(closeMenu, 120);
      });
    });

    document.addEventListener("click", (event) => {
      if (!event.target) return;
      dropdowns.forEach((dropdown) => {
        if (event.target instanceof Node && dropdown.contains(event.target)) return;
        dropdown.classList.remove("is-open");
        dropdown.querySelector(".nav-dropdown__menu")?.setAttribute("hidden", "");
        dropdown.querySelector(".nav-dropdown__toggle")?.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountChrome);
  } else {
    mountChrome();
  }
})();
