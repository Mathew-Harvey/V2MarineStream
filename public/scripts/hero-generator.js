/**
 * MarineStream Hero Banner Generator
 * 
 * Centralized system for generating hero banners across all pages.
 * This eliminates code duplication and ensures consistency.
 * 
 * Usage:
 * 1. Create a hero configuration object
 * 2. Call renderHero(config) to generate the HTML
 * 3. Insert the HTML into the page
 * 
 * @author MarineStream Development Team
 * @version 1.0.0
 */

/**
 * Resolve asset path based on current page location
 * @param {string} assetPath - Asset path (e.g., "heroVid01.mp4")
 * @returns {string} - Resolved path
 */
function resolveAssetPath(assetPath) {
    // If it's already an absolute path or URL, return as-is
    if (assetPath.startsWith('http') || assetPath.startsWith('/')) {
        return assetPath;
    }

    // Determine the correct relative path based on page location
    const path = window.location.pathname;
    
    if (path.includes('/blog/')) {
        return `../../assets/${assetPath}`;
    } else if (path.includes('/core-pages/')) {
        return `../assets/${assetPath}`;
    } else if (path.includes('/interactive-tools/')) {
        return `../assets/${assetPath}`;
    } else {
        // Root level
        return `/assets/${assetPath}`;
    }
}

/**
 * Generate hero badge HTML
 * @param {Object} badge - Badge configuration { icon: string, text: string }
 * @returns {string} - Badge HTML
 */
function generateHeroBadge(badge) {
    if (!badge) return '';
    
    return `
        <div class="hero-badge">
            <i class="${badge.icon || 'fas fa-anchor'}"></i>
            <span>${badge.text || ''}</span>
        </div>
    `;
}

/**
 * Generate CTA button HTML
 * @param {Object|Array} ctas - CTA button configuration(s)
 * @returns {string} - CTA buttons HTML
 */
function generateCTAs(ctas) {
    if (!ctas) return '';
    
    // Handle single button or array of buttons
    const buttons = Array.isArray(ctas) ? ctas : [ctas];
    
    return `
        <div class="ms-hero-cta">
            ${buttons.map(cta => {
                if (!cta) return '';
                
                const isButton = cta.type === 'button' || cta.onclick || cta.action;
                const tag = isButton ? 'button' : 'a';
                const href = tag === 'a' ? `href="${cta.href || '#'}"` : '';
                const onclick = cta.onclick ? `onclick="${cta.onclick}"` : '';
                const target = cta.target ? `target="${cta.target}" rel="${cta.rel || 'noopener noreferrer'}"` : '';
                const ariaLabel = cta.ariaLabel ? `aria-label="${cta.ariaLabel}"` : '';
                const buttonId = cta.id ? `id="${cta.id}"` : '';
                const classes = `btn ${cta.style || 'btn-primary'}`;
                
                // Build attributes array and filter empty ones
                const buttonAttrs = [
                    buttonId,
                    href,
                    onclick,
                    target,
                    `class="${classes}"`,
                    ariaLabel
                ].filter(attr => attr).join(' ');
                
                return `
                    <${tag} ${buttonAttrs}>
                        ${cta.icon ? `<i class="${cta.icon}"></i>` : ''}
                        ${cta.text || ''}
                    </${tag}>
                `;
            }).join('')}
        </div>
    `;
}

/**
 * Generate quick access section HTML
 * @param {Object} quickAccess - Quick access configuration
 * @returns {string} - Quick access HTML
 */
function generateQuickAccess(quickAccess) {
    if (!quickAccess) return '';
    
    const items = quickAccess.items || [];
    if (items.length === 0) return '';
    
    return `
        <div class="ms-hero-quick-access">
            ${quickAccess.title ? `<h3>${quickAccess.title}</h3>` : ''}
            <div class="quick-access-grid">
                ${items.map(item => `
                    <a href="${item.href || '#'}" class="quick-access-item">
                        <i class="${item.icon || 'fas fa-circle'}"></i>
                        <span>${item.text || ''}</span>
                    </a>
                `).join('')}
            </div>
        </div>
    `;
}

/**
 * Generate visual section HTML (info card)
 * @param {Object} visual - Visual section configuration
 * @returns {string} - Visual section HTML
 */
function generateVisual(visual) {
    if (!visual) return '';
    
    // If visual has custom HTML, use it directly
    if (visual.html) {
        return `<div class="ms-hero-visual">${visual.html}</div>`;
    }
    
    return `
        <div class="ms-hero-visual">
            <div class="hero-info-card">
                ${visual.badge ? `<div class="info-badge">${visual.badge}</div>` : ''}
                ${visual.title ? `<h3>${visual.title}</h3>` : ''}
                ${visual.description ? `<p>${visual.description}</p>` : ''}
                ${visual.stats ? `
                    <div class="info-stats">
                        ${visual.stats.map(stat => `
                            <div class="stat-item">
                                <span class="stat-number" ${stat.id ? `id="${stat.id}"` : ''}>${stat.number || ''}</span>
                                <span class="stat-label">${stat.label || ''}</span>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                ${visual.link ? `
                    <a href="${visual.link.href || '#'}" class="preview-link">
                        ${visual.link.text || ''} <i class="fas fa-arrow-right"></i>
                    </a>
                ` : ''}
            </div>
        </div>
    `;
}

/**
 * Generate breadcrumb container HTML
 * @param {Object} breadcrumb - Breadcrumb configuration
 * @returns {string} - Breadcrumb HTML
 */
function generateBreadcrumb(breadcrumb) {
    if (!breadcrumb) return '';
    
    return `
        <div class="breadcrumb-container">
            <nav id="${breadcrumb.id || 'breadcrumb-nav'}" class="breadcrumb-nav">
                ${breadcrumb.html || '<!-- Breadcrumb will be generated by JavaScript -->'}
            </nav>
        </div>
    `;
}

/**
 * Generate title HTML with support for HTML content
 * @param {string|Object} title - Title string or object with HTML
 * @returns {string} - Title HTML
 */
function generateTitle(title) {
    if (!title) return '';
    
    // If title is an object with HTML property, use it directly
    if (typeof title === 'object' && title.html) {
        return `<h1 class="ms-hero-title">${title.html}</h1>`;
    }
    
    // If title is a string, use it as-is (may contain HTML)
    return `<h1 class="ms-hero-title">${title}</h1>`;
}

/**
 * Generate subtitle HTML
 * @param {string} subtitle - Subtitle text
 * @returns {string} - Subtitle HTML
 */
function generateSubtitle(subtitle) {
    if (!subtitle) return '';
    return `<p class="ms-hero-subtitle">${subtitle}</p>`;
}

/**
 * Generate video element HTML
 * @param {Object} videoConfig - Video configuration
 * @returns {string} - Video HTML
 */
function generateVideo(videoConfig) {
    if (!videoConfig || !videoConfig.src) return '';
    
    const videoId = videoConfig.id ? `id="${videoConfig.id}"` : '';
    const videoSrc = resolveAssetPath(videoConfig.src);
    
    return `
        <video ${videoId} class="ms-hero-video" autoplay loop muted playsinline preload="auto">
            <source src="${videoSrc}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    `;
}

/**
 * Main function to render hero banner
 * @param {Object} config - Hero configuration object
 * @param {HTMLElement|string} target - Target element or selector to insert hero
 * @returns {HTMLElement} - The created hero section element
 */
function renderHero(config, target = null) {
    // Default configuration
    const defaults = {
        video: {
            src: 'heroVid01.mp4',
            id: null
        },
        fallbackImage: '/images/photos/hero-background.jpg',
        classes: ['ms-hero', 'ms-hero--video'],
        id: null,
        role: 'banner',
        badge: null,
        breadcrumb: null,
        title: '',
        subtitle: '',
        ctas: [],
        quickAccess: null,
        visual: null
    };
    
    // Merge with defaults
    const cfg = { ...defaults, ...config };
    
    // Build classes string
    const classesStr = Array.isArray(cfg.classes) 
        ? cfg.classes.join(' ') 
        : cfg.classes || 'ms-hero ms-hero--video';
    
    // Build section attributes (only include if value exists)
    const sectionId = cfg.id ? `id="${cfg.id}"` : '';
    const dataVideo = (cfg.video && cfg.video.src) ? `data-video="${cfg.video.src}"` : '';
    const dataFallback = cfg.fallbackImage ? `data-fallback-image="${cfg.fallbackImage}"` : '';
    
    // Generate video HTML
    const videoHTML = cfg.video ? generateVideo(cfg.video) : '';
    
    // Generate all sections
    const breadcrumbHTML = generateBreadcrumb(cfg.breadcrumb);
    const badgeHTML = generateHeroBadge(cfg.badge);
    const titleHTML = generateTitle(cfg.title);
    const subtitleHTML = generateSubtitle(cfg.subtitle);
    const ctasHTML = generateCTAs(cfg.ctas);
    const quickAccessHTML = generateQuickAccess(cfg.quickAccess);
    const visualHTML = generateVisual(cfg.visual);
    
    // Build complete hero HTML (filter out empty attributes)
    const attributes = [
        sectionId,
        `class="${classesStr}"`,
        dataVideo,
        dataFallback,
        `role="${cfg.role}"`
    ].filter(attr => attr).join(' ');
    
    const heroHTML = `
        <section ${attributes}>
            ${videoHTML}
            <div class="container">
                <div class="ms-hero-content">
                    ${breadcrumbHTML}
                    ${badgeHTML}
                    ${titleHTML}
                    ${subtitleHTML}
                    ${ctasHTML}
                    ${quickAccessHTML}
                </div>
                ${visualHTML}
            </div>
        </section>
    `;
    
    // Create element
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = heroHTML.trim();
    const heroElement = tempDiv.firstElementChild;
    
    // Insert into target if provided
    if (target) {
        const targetElement = typeof target === 'string' 
            ? document.querySelector(target) 
            : target;
        
        if (targetElement) {
            // If target is a placeholder, replace it; otherwise append
            if (targetElement.classList.contains('hero-placeholder')) {
                targetElement.replaceWith(heroElement);
            } else {
                targetElement.appendChild(heroElement);
            }
        }
    }
    
    return heroElement;
}

/**
 * Initialize hero banner from data attribute
 * This allows pages to configure heroes via HTML data attributes
 */
function initHeroFromData() {
    const heroPlaceholders = document.querySelectorAll('.hero-placeholder[data-hero-config]');
    
    heroPlaceholders.forEach(placeholder => {
        try {
            const configJson = placeholder.getAttribute('data-hero-config');
            const config = JSON.parse(configJson);
            renderHero(config, placeholder);
        } catch (error) {
            console.error('Error parsing hero config:', error);
        }
    });
}

// Auto-initialize on DOM ready
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroFromData);
    } else {
        initHeroFromData();
    }
    
    // Make functions globally available
    window.renderHero = renderHero;
    window.resolveAssetPath = resolveAssetPath;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { renderHero, resolveAssetPath };
}

