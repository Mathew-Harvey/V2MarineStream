/**
 * MarineStream Hero Banner Initialization
 * 
 * Automatically initializes hero banners on pages based on page detection.
 * This script should be loaded after hero-generator.js and hero-configs.js
 */

(function() {
    'use strict';
    
    /**
     * Detect page name from current URL/path
     * @returns {string} - Page identifier
     */
    function detectPageName() {
        const path = window.location.pathname;
        const filename = path.split('/').pop().replace('.html', '');
        
        // Handle root index
        if (path === '/' || path.endsWith('/index.html') || filename === '' || filename === 'index') {
            return 'index';
        }
        
        // Handle subdirectories
        if (path.includes('/core-pages/')) {
            return filename;
        }
        
        if (path.includes('/interactive-tools/')) {
            if (filename.includes('bfmp') || filename.toLowerCase().includes('bfmp')) {
                return 'bfmpGen';
            }
            if (filename.includes('hull') || filename.includes('calc')) {
                return 'hullCalc';
            }
        }
        
        return filename;
    }
    
    /**
     * Find existing hero section
     * @returns {HTMLElement|null} - Hero section element or null
     */
    function findHeroSection() {
        // Try to find by class first
        let hero = document.querySelector('.ms-hero');
        
        // If not found, look for section with role="banner"
        if (!hero) {
            hero = document.querySelector('section[role="banner"]');
        }
        
        return hero;
    }
    
    /**
     * Initialize hero banner for current page
     */
    function initHero() {
        // Wait for required dependencies
        if (typeof renderHero === 'undefined' || typeof getHeroConfig === 'undefined') {
            console.warn('Hero generator not loaded yet, retrying...');
            setTimeout(initHero, 100);
            return;
        }
        
        const pageName = detectPageName();
        const config = getHeroConfig(pageName);
        
        if (!config) {
            console.log(`No hero config found for page: ${pageName}`);
            return;
        }
        
        const existingHero = findHeroSection();
        
        if (!existingHero) {
            console.warn(`Hero section not found on page: ${pageName}`);
            return;
        }
        
        // Special handling for index page - preserve custom visual section
        if (pageName === 'index') {
            const customVisual = existingHero.querySelector('.ms-hero-visual');
            if (customVisual) {
                // Store custom visual HTML
                const customVisualHTML = customVisual.outerHTML;
                
                // Generate new hero (without visual - config doesn't include it)
                const newHero = renderHero(config);
                
                // Find the container and append custom visual
                const container = newHero.querySelector('.container');
                if (container) {
                    container.insertAdjacentHTML('beforeend', customVisualHTML);
                }
                
                // Replace old hero with new one
                existingHero.replaceWith(newHero);
            } else {
                // Standard replacement
                const newHero = renderHero(config);
                existingHero.replaceWith(newHero);
            }
        } else if (pageName === 'rov-autoconnect') {
            // Special handling for rov-autoconnect - preserve breadcrumb container
            const breadcrumbContainer = existingHero.querySelector('.breadcrumb-container');
            if (breadcrumbContainer) {
                // Store breadcrumb HTML
                const breadcrumbHTML = breadcrumbContainer.outerHTML;
                
                // Generate new hero (config includes breadcrumb, but we'll replace it)
                const newHero = renderHero(config);
                
                // Replace breadcrumb in new hero with preserved one
                const newBreadcrumb = newHero.querySelector('.breadcrumb-container');
                if (newBreadcrumb) {
                    newBreadcrumb.outerHTML = breadcrumbHTML;
                } else {
                    // If no breadcrumb in generated hero, add it to content
                    const content = newHero.querySelector('.ms-hero-content');
                    if (content) {
                        content.insertAdjacentHTML('afterbegin', breadcrumbHTML);
                    }
                }
                
                // Replace old hero with new one
                existingHero.replaceWith(newHero);
            } else {
                // Standard replacement
                const newHero = renderHero(config);
                existingHero.replaceWith(newHero);
            }
        } else {
            // Standard replacement for other pages
            const newHero = renderHero(config);
            existingHero.replaceWith(newHero);
        }
        
        // Reinitialize hero framework if it exists
        // Wait a bit for hero framework to initialize
        setTimeout(() => {
            if (typeof window.marineStreamHero !== 'undefined' && window.marineStreamHero) {
                window.marineStreamHero.setupHeroes();
            }
        }, 100);
        
        console.log(`Hero banner initialized for page: ${pageName}`);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHero);
    } else {
        // DOM already ready
        initHero();
    }
})();

