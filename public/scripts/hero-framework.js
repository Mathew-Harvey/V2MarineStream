/**
 * MarineStream Hero Framework JavaScript
 * 
 * Handles hero section functionality including:
 * - Video background management
 * - Responsive behavior
 * - Intersection observers for performance
 * - Accessibility features
 * 
 * @author MarineStream Development Team
 * @version 1.0.0
 */

class MarineStreamHero {
    constructor() {
        this.heroes = [];
        this.videoObservers = new Map();
        this.init();
    }

    /**
     * Initialize all hero sections on the page
     */
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupHeroes());
        } else {
            this.setupHeroes();
        }
    }

    /**
     * Set up all hero sections found on the page
     */
    setupHeroes() {
        const heroElements = document.querySelectorAll('.ms-hero');
        
        heroElements.forEach((hero, index) => {
            this.setupSingleHero(hero, index);
        });

        console.log(`MarineStream Hero Framework: Initialized ${heroElements.length} hero sections`);
    }

    /**
     * Set up a single hero section
     * @param {HTMLElement} heroElement - The hero element
     * @param {number} index - Hero index for identification
     */
    setupSingleHero(heroElement, index) {
        const heroConfig = {
            element: heroElement,
            index: index,
            type: this.getHeroType(heroElement),
            video: null,
            isVideoReady: false
        };

        // Set up video background if needed
        if (heroConfig.type === 'video') {
            this.setupVideoHero(heroConfig);
        }

        // Set up responsive behavior
        this.setupResponsiveHero(heroConfig);

        // Set up accessibility features
        this.setupAccessibility(heroConfig);

        this.heroes.push(heroConfig);
    }

    /**
     * Determine the type of hero section
     * @param {HTMLElement} heroElement - The hero element
     * @returns {string} - Hero type ('video', 'image', 'gradient')
     */
    getHeroType(heroElement) {
        if (heroElement.classList.contains('ms-hero--video')) {
            return 'video';
        } else if (heroElement.classList.contains('ms-hero--image')) {
            return 'image';
        } else if (heroElement.classList.contains('ms-hero--gradient')) {
            return 'gradient';
        }
        
        // Default to video if video element is present
        const video = heroElement.querySelector('video');
        if (video) {
            heroElement.classList.add('ms-hero--video');
            return 'video';
        }

        // Default to gradient
        heroElement.classList.add('ms-hero--gradient');
        return 'gradient';
    }

    /**
     * Set up video hero functionality
     * @param {Object} heroConfig - Hero configuration object
     */
    setupVideoHero(heroConfig) {
        let video = heroConfig.element.querySelector('video');
        
        // If no video element exists, create one from data attributes
        if (!video) {
            video = this.createVideoElement(heroConfig.element);
        }

        if (!video) {
            console.warn('MarineStream Hero: Video hero specified but no video source found');
            return;
        }

        heroConfig.video = video;

        // Ensure video is properly configured for autoplay
        this.configureVideo(video);

        // Set up intersection observer for performance
        this.setupVideoObserver(heroConfig);

        // Handle video events
        this.setupVideoEvents(heroConfig);
    }

    /**
     * Create video element from data attributes
     * @param {HTMLElement} heroElement - The hero element
     * @returns {HTMLVideoElement|null} - Created video element or null
     */
    createVideoElement(heroElement) {
        const videoSrc = heroElement.dataset.video || heroElement.dataset.videoSrc;
        
        if (!videoSrc) {
            return null;
        }

        const video = document.createElement('video');
        video.className = 'ms-hero-video';
        video.setAttribute('autoplay', '');
        video.setAttribute('loop', '');
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('preload', 'auto');

        // Create source element
        const source = document.createElement('source');
        source.src = this.resolveVideoPath(videoSrc);
        source.type = 'video/mp4';

        video.appendChild(source);
        
        // Add fallback text
        video.appendChild(document.createTextNode('Your browser does not support the video tag.'));

        // Insert video as first child
        heroElement.insertBefore(video, heroElement.firstChild);

        return video;
    }

    /**
     * Resolve video path based on current page location
     * @param {string} videoSrc - Original video source
     * @returns {string} - Resolved video path
     */
    resolveVideoPath(videoSrc) {
        // If it's already an absolute path or URL, return as-is
        if (videoSrc.startsWith('http') || videoSrc.startsWith('/')) {
            return videoSrc;
        }

        // Determine the correct relative path based on page location
        const path = window.location.pathname;
        
        if (path.includes('/blog/')) {
            return `../../assets/${videoSrc}`;
        } else if (path.includes('/core-pages/')) {
            return `../assets/${videoSrc}`;
        } else {
            return `./assets/${videoSrc}`;
        }
    }

    /**
     * Configure video element for optimal performance and autoplay
     * @param {HTMLVideoElement} video - Video element
     */
    configureVideo(video) {
        video.muted = true; // Required for autoplay
        video.playsInline = true; // iOS compatibility
        video.preload = 'auto';
        
        // Set loading attribute for better performance
        if ('loading' in video) {
            video.loading = 'eager';
        }
    }

    /**
     * Set up intersection observer for video performance
     * @param {Object} heroConfig - Hero configuration object
     */
    setupVideoObserver(heroConfig) {
        const video = heroConfig.video;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Video is visible, try to play
                    this.playVideo(video);
                } else {
                    // Video is not visible, pause to save resources
                    this.pauseVideo(video);
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% visible
            rootMargin: '50px' // Start loading 50px before entering viewport
        });

        observer.observe(heroConfig.element);
        this.videoObservers.set(heroConfig.element, observer);
    }

    /**
     * Set up video event handlers
     * @param {Object} heroConfig - Hero configuration object
     */
    setupVideoEvents(heroConfig) {
        const video = heroConfig.video;

        video.addEventListener('loadeddata', () => {
            heroConfig.isVideoReady = true;
            console.log('MarineStream Hero: Video loaded successfully');
        });

        video.addEventListener('error', (e) => {
            console.error('MarineStream Hero: Video failed to load', e);
            this.handleVideoError(heroConfig);
        });

        video.addEventListener('canplay', () => {
            // Try to play the video if it's in the viewport
            if (this.isElementInViewport(heroConfig.element)) {
                this.playVideo(video);
            }
        });
    }

    /**
     * Play video with error handling
     * @param {HTMLVideoElement} video - Video element
     */
    playVideo(video) {
        if (video.paused || video.ended) {
            const playPromise = video.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('MarineStream Hero: Video playing');
                }).catch(error => {
                    console.log('MarineStream Hero: Autoplay prevented', error);
                    // Autoplay was prevented, which is normal behavior
                    // The video will play when the user interacts with the page
                });
            }
        }
    }

    /**
     * Pause video
     * @param {HTMLVideoElement} video - Video element
     */
    pauseVideo(video) {
        if (!video.paused) {
            video.pause();
        }
    }

    /**
     * Handle video loading errors
     * @param {Object} heroConfig - Hero configuration object
     */
    handleVideoError(heroConfig) {
        const heroElement = heroConfig.element;
        
        // Remove video class and add fallback
        heroElement.classList.remove('ms-hero--video');
        heroElement.classList.add('ms-hero--image');
        
        // Set fallback background image
        const fallbackImage = heroConfig.element.dataset.fallbackImage || '/images/photos/hero-background.jpg';
        heroElement.style.backgroundImage = `url(${this.resolveVideoPath(fallbackImage)})`;
        
        console.log('MarineStream Hero: Switched to fallback image due to video error');
    }

    /**
     * Set up responsive behavior
     * @param {Object} heroConfig - Hero configuration object
     */
    setupResponsiveHero(heroConfig) {
        // Add resize listener for responsive adjustments
        const resizeHandler = () => {
            this.handleResize(heroConfig);
        };

        window.addEventListener('resize', resizeHandler);
        
        // Initial resize handling
        this.handleResize(heroConfig);
    }

    /**
     * Handle window resize
     * @param {Object} heroConfig - Hero configuration object
     */
    handleResize(heroConfig) {
        const heroElement = heroConfig.element;
        const container = heroElement.querySelector('.container');
        
        if (!container) return;

        // Adjust layout based on screen size
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;

        if (isMobile) {
            heroElement.classList.add('ms-hero--mobile');
            heroElement.classList.remove('ms-hero--tablet', 'ms-hero--desktop');
        } else if (isTablet) {
            heroElement.classList.add('ms-hero--tablet');
            heroElement.classList.remove('ms-hero--mobile', 'ms-hero--desktop');
        } else {
            heroElement.classList.add('ms-hero--desktop');
            heroElement.classList.remove('ms-hero--mobile', 'ms-hero--tablet');
        }
    }

    /**
     * Set up accessibility features
     * @param {Object} heroConfig - Hero configuration object
     */
    setupAccessibility(heroConfig) {
        const heroElement = heroConfig.element;
        
        // Ensure proper ARIA labels
        if (!heroElement.getAttribute('role')) {
            heroElement.setAttribute('role', 'banner');
        }

        // Add skip link if it doesn't exist
        this.addSkipLink(heroElement);

        // Handle reduced motion preferences
        this.handleReducedMotion(heroConfig);

        // Set up keyboard navigation
        this.setupKeyboardNavigation(heroConfig);
    }

    /**
     * Add skip link for accessibility
     * @param {HTMLElement} heroElement - Hero element
     */
    addSkipLink(heroElement) {
        // Check if skip links should be excluded on this page
        const currentPath = window.location.pathname;
        const excludePages = [
            'equipment-products.html',
            'servicing-maintenance.html',
            'sales.html',
            'consultation-training.html'
        ];
        
        const shouldExcludeSkipLink = excludePages.some(page => currentPath.includes(page));
        if (shouldExcludeSkipLink) {
            return;
        }

        const existingSkipLink = document.querySelector('.skip-link');
        if (existingSkipLink) return;

        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--accent-color, #FF6600);
            color: white;
            padding: 8px;
            text-decoration: none;
            z-index: 1000;
            border-radius: 4px;
            transition: top 0.3s;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        heroElement.appendChild(skipLink);
    }

    /**
     * Handle reduced motion preferences
     * @param {Object} heroConfig - Hero configuration object
     */
    handleReducedMotion(heroConfig) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            heroConfig.element.classList.add('ms-hero--reduced-motion');
            
            // Pause video if present
            if (heroConfig.video) {
                heroConfig.video.pause();
            }
        }
    }

    /**
     * Set up keyboard navigation
     * @param {Object} heroConfig - Hero configuration object
     */
    setupKeyboardNavigation(heroConfig) {
        const buttons = heroConfig.element.querySelectorAll('.btn, .quick-access-item');
        
        buttons.forEach(button => {
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });
    }

    /**
     * Check if element is in viewport
     * @param {HTMLElement} element - Element to check
     * @returns {boolean} - Whether element is in viewport
     */
    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    /**
     * Update video source for a specific hero
     * @param {number} heroIndex - Index of the hero to update
     * @param {string} newVideoSrc - New video source path
     */
    updateVideoSource(heroIndex, newVideoSrc) {
        const heroConfig = this.heroes[heroIndex];
        
        if (!heroConfig || heroConfig.type !== 'video') {
            console.warn('MarineStream Hero: Cannot update video source for non-video hero');
            return;
        }

        const video = heroConfig.video;
        const source = video.querySelector('source');
        
        if (source) {
            source.src = this.resolveVideoPath(newVideoSrc);
            video.load(); // Reload the video with new source
        }
    }

    /**
     * Get hero configuration by index
     * @param {number} index - Hero index
     * @returns {Object|null} - Hero configuration or null
     */
    getHero(index) {
        return this.heroes[index] || null;
    }

    /**
     * Get all hero configurations
     * @returns {Array} - Array of hero configurations
     */
    getAllHeroes() {
        return this.heroes;
    }

    /**
     * Clean up resources
     */
    destroy() {
        // Clean up intersection observers
        this.videoObservers.forEach(observer => {
            observer.disconnect();
        });
        this.videoObservers.clear();

        // Remove event listeners
        this.heroes.forEach(heroConfig => {
            if (heroConfig.video) {
                heroConfig.video.removeEventListener('loadeddata', () => {});
                heroConfig.video.removeEventListener('error', () => {});
                heroConfig.video.removeEventListener('canplay', () => {});
            }
        });

        this.heroes = [];
    }
}

// Video source configuration object for easy management
const HERO_VIDEO_SOURCES = {
    home: 'heroVid01.mp4',
    sales: 'heroVid01.mp4', // Will be replaced with page-specific video
    equipment: 'heroVid01.mp4', // Will be replaced with page-specific video
    consultation: 'heroVid01.mp4', // Will be replaced with page-specific video
    servicing: 'heroVid01.mp4', // Will be replaced with page-specific video
    blog: 'heroVid01.mp4', // Will be replaced with page-specific video
    team: 'heroVid01.mp4' // Will be replaced with page-specific video
};

// Global instance
let marineStreamHero = null;

// Initialize when DOM is ready
if (typeof window !== 'undefined') {
    marineStreamHero = new MarineStreamHero();
    
    // Make it globally accessible for debugging and external control
    window.MarineStreamHero = MarineStreamHero;
    window.marineStreamHero = marineStreamHero;
    window.HERO_VIDEO_SOURCES = HERO_VIDEO_SOURCES;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MarineStreamHero, HERO_VIDEO_SOURCES };
}
