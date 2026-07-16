(function () {
  "use strict";

  const serviceLinks = [
    { href: "/services/inspection", label: "Inspection" },
    { href: "/services/cleaning", label: "Cleaning with capture" },
    { href: "/services/software", label: "Software" },
    { href: "/services/hardware", label: "Hardware" },
    { href: "/services/training", label: "Training" },
    { href: "/services/professional-services", label: "Professional services" },
  ];

  const toolLinks = [
    { href: "/tools/ims-species-guide/", label: "IMS Species Guide" },
    { href: "/interactive-tools/hullCalc.html", label: "Fouling Cost Calculator" },
    { href: "/interactive-tools/bfmpGen.html", label: "BFMP Generator" },
    { href: "/tools/rov-autoconnect", label: "ROV AutoConnect" },
  ];

  const path = window.location.pathname.replace(/\/$/, "") || "/";

  function isCurrent(href) {
    const n = href.replace(/\/$/, "").replace(/\.html$/, "");
    const p = path.replace(/\.html$/, "");
    return p === n || p.startsWith(n + "/") || (n.includes("ims-species-guide") && p.includes("ims-species-guide"));
  }

  function servicesOpen() {
    return path === "/services" || path.startsWith("/services/") || path.startsWith("/sales/");
  }

  function toolsOpen() {
    return toolLinks.some((tool) => isCurrent(tool.href));
  }

  function renderHeader() {
    const servicesActive = servicesOpen();
    const toolsActive = toolsOpen();
    const serviceItems = serviceLinks
      .map((item) => {
        const cur = isCurrent(item.href) ? ' aria-current="page"' : "";
        return `<li><a href="${item.href}"${cur}>${item.label}</a></li>`;
      })
      .join("");
    const toolItems = toolLinks
      .map((tool) => {
        const cur = isCurrent(tool.href) ? ' aria-current="page"' : "";
        return `<li><a href="${tool.href}"${cur}>${tool.label}</a></li>`;
      })
      .join("");

    return `
      <div class="ms-v2-chrome">
        <header class="site-header">
          <div class="container site-header__inner">
            <a class="logo" href="/" aria-label="MarineStream home">
              <img src="/images/brand/marinestream_logo_white.png" alt="MarineStream™" width="180" height="40" />
            </a>
            <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="ms-v2-site-nav" id="ms-v2-nav-toggle">Menu</button>
            <nav class="nav" id="ms-v2-site-nav" aria-label="Primary">
              <a href="/"${path === "/" ? ' aria-current="page"' : ""}>Home</a>
              <a href="/news"${path.startsWith("/news") || path.startsWith("/blog") ? ' aria-current="page"' : ""}>News</a>
              <div class="nav-dropdown${servicesActive ? " is-active" : ""}" data-nav-dropdown>
                <button class="nav-dropdown__toggle" type="button" aria-expanded="false" aria-controls="ms-v2-services-menu" aria-haspopup="true">Services</button>
                <ul class="nav-dropdown__menu" id="ms-v2-services-menu" hidden>${serviceItems}</ul>
              </div>
              <div class="nav-dropdown${toolsActive ? " is-active" : ""}" data-nav-dropdown>
                <button class="nav-dropdown__toggle" type="button" aria-expanded="false" aria-controls="ms-v2-tools-menu" aria-haspopup="true">Tools</button>
                <ul class="nav-dropdown__menu" id="ms-v2-tools-menu" hidden>${toolItems}</ul>
              </div>
              <a href="/about"${path === "/about" ? ' aria-current="page"' : ""}>About</a>
              <a class="nav-cta" href="/contact">Contact us</a>
            </nav>
          </div>
        </header>
      </div>
    `;
  }

  function renderFooter() {
    const year = new Date().getFullYear();
    const tools = toolLinks.map((t) => `<li><a href="${t.href}">${t.label}</a></li>`).join("");
    return `
      <div class="ms-v2-chrome">
        <footer class="site-footer">
          <div class="container site-footer__inner">
            <div>
              <img class="footer-logo" src="/images/brand/marinestream_logo_white.png" alt="MarineStream™" width="160" height="36" />
              <p class="footer-tag">Enabling IMO-aligned biofouling inspections and cleans.</p>
              <p><a href="https://www.franmarine.com.au/" rel="noopener noreferrer">A division of Franmarine</a></p>
            </div>
            <nav class="footer-nav" aria-label="Footer">
              <a href="/">Home</a>
              <a href="/news">News</a>
              <a href="/services">Services</a>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
              <a href="/privacy">Privacy</a>
            </nav>
            <div class="footer-tools">
              <h2 class="footer-tools__title">Tools</h2>
              <ul class="footer-tools__list">${tools}</ul>
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
