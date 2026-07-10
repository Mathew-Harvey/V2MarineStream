/**
 * MarineStream Hero Banner Configurations
 * 
 * Centralized configuration for all hero banners across the site.
 * This file contains the configuration objects for each page.
 */

const HERO_CONFIGS = {
    'index': {
        id: 'home',
        classes: ['ms-hero', 'ms-hero--video', 'main-content'],
        video: {
            src: 'heroVid01.mp4',
            id: 'hero-video'
        },
        fallbackImage: '/images/photos/hero-background.jpg',
        title: 'Streamlining <br>Biofouling & Asset<br>Management',
        subtitle: 'MarineStreamâ„¢ - The most versatile biofouling and underwater asset management technology in the world.',
        ctas: [
            {
                href: '/core-pages/sales.html',
                text: 'Explore Solutions',
                icon: 'fas fa-anchor',
                style: 'btn-primary',
                ariaLabel: 'Explore our solutions'
            },
            {
                href: '/contact',
                text: 'Contact Our Team',
                icon: 'fas fa-phone',
                style: 'btn-outline',
                ariaLabel: 'Contact MarineStream for more information'
            }
        ]
    },
    
    'sales': {
        video: {
            src: 'heroVid01.mp4'
        },
        fallbackImage: '/images/photos/hero-background.jpg',
        title: 'What brings you to MarineStream today?',
        subtitle: 'Biofouling management is a complex, multifaceted challenge that requires the combination of equipment, software, and expertise. At MarineStream, we\'ve developed solutions through our own operational experience and we\'re excited to share our proven technology with you.',
        ctas: [
            {
                href: '/contact',
                text: 'Contact Our Team',
                icon: 'fas fa-phone',
                style: 'btn-primary',
                ariaLabel: 'Contact our team for assistance'
            }
        ],
        quickAccess: {
            title: 'What are you looking for?',
            items: [
                { href: '/core-pages/equipment-products.html', icon: 'fas fa-robot', text: 'ROV Systems' },
                { href: '/core-pages/biofouling-management.html', icon: 'fas fa-leaf', text: 'Cleaning' },
                { href: '/core-pages/consultation-training.html', icon: 'fas fa-clipboard-check', text: 'Consulting' },
                { href: '/core-pages/software-platform.html', icon: 'fas fa-laptop-code', text: 'Software' }
            ]
        }
    },
    
    'blog': {
        video: {
            src: 'heroVid01.mp4'
        },
        fallbackImage: '/images/photos/hero-background.jpg',
        badge: {
            icon: 'fas fa-anchor',
            text: 'Maritime Technology'
        },
        title: 'Maritime Innovation Hub',
        subtitle: 'Discover cutting-edge insights in underwater inspections, biofouling management, and maritime technology through our expert analysis and real-world case studies.',
        ctas: [
            {
                href: '#articles',
                text: 'Latest Articles',
                icon: 'fas fa-newspaper',
                style: 'btn-primary',
                ariaLabel: 'Read latest articles'
            }
        ],
        quickAccess: {
            title: 'Popular Topics',
            items: [
                { href: '#rov-technology', icon: 'fas fa-robot', text: 'ROV Technology' },
                { href: '#biofouling', icon: 'fas fa-ship', text: 'Biofouling' },
                { href: '#case-studies', icon: 'fas fa-chart-line', text: 'Case Studies' },
                { href: '#industry-insights', icon: 'fas fa-lightbulb', text: 'Industry Insights' }
            ]
        },
        visual: {
            badge: 'Knowledge Hub',
            title: 'Expert Maritime Content',
            stats: [
                { id: 'blog-count', number: '0', label: 'Expert Articles' },
                { number: '2025', label: 'Latest Research' },
                { number: '55+', label: 'Years Experience' }
            ]
        }
    },
    
    'equipment-products': {
        video: {
            src: 'heroVid01.mp4'
        },
        fallbackImage: '/images/photos/hero-background.jpg',
        title: 'Equipment & Products',
        subtitle: 'Advanced technology solutions for maritime operations, including ROVs, cleaning systems, and specialised equipment designed for the modern marine industry.',
        ctas: [
            {
                href: '#products',
                text: 'Browse Products',
                icon: 'fas fa-search',
                style: 'btn-primary',
                ariaLabel: 'Browse our products'
            },
            {
                href: '/contact',
                text: 'Contact Our Team',
                icon: 'fas fa-phone',
                style: 'btn-outline',
                ariaLabel: 'Contact our team for assistance'
            }
        ],
        quickAccess: {
            title: 'Product Categories',
            items: [
                { href: '#rov-systems', icon: 'fas fa-robot', text: 'ROV Systems' },
                { href: '#cleaning-equipment', icon: 'fas fa-tools', text: 'Cleaning Equipment' },
                { href: '#accessories', icon: 'fas fa-cogs', text: 'Accessories' },
                { href: '#software', icon: 'fas fa-laptop-code', text: 'Software' }
            ]
        },
        visual: {
            badge: 'Request for Quote',
            title: 'Tailored Solutions',
            description: 'Use "Add to Quote" to build a custom RFQ that helps us understand your specific needs and provide tailored solutions.',
            link: {
                href: '#products',
                text: 'Start Quote'
            }
        }
    },
    
    'consultation-training': {
        video: {
            src: 'heroVid01.mp4'
        },
        fallbackImage: '/images/photos/hero-background.jpg',
        title: 'Consultation & Training Services',
        subtitle: 'Comprehensive maritime expertise delivered by industry professionals with decades of operational experience. Select the service you need for expert consultation and training.',
        ctas: [
            {
                href: '#services',
                text: 'Browse Services',
                icon: 'fas fa-search',
                style: 'btn-primary',
                ariaLabel: 'Browse our services'
            },
            {
                href: '/contact',
                text: 'Contact Our Team',
                icon: 'fas fa-phone',
                style: 'btn-outline',
                ariaLabel: 'Contact our team for assistance'
            }
        ],
        quickAccess: {
            title: 'Training & Consultation Areas',
            items: [
                { href: '#rov-training', icon: 'fas fa-robot', text: 'ROV Training' },
                { href: '#biofouling-management', icon: 'fas fa-ship', text: 'Biofouling Management' },
                { href: '#compliance', icon: 'fas fa-clipboard-check', text: 'Compliance' },
                { href: '#maintenance', icon: 'fas fa-tools', text: 'Maintenance' }
            ]
        },
        visual: {
            badge: 'Expert-Led Training',
            title: 'Professional Development',
            description: 'Use "Add to Quote" to build a custom RFQ that helps us understand your specific needs and provide tailored training solutions.',
            link: {
                href: '#services',
                text: 'Start Quote'
            }
        }
    },
    
    'meet-the-team': {
        classes: ['ms-hero', 'ms-hero--video', 'team-hero'],
        video: {
            src: 'heroVid01.mp4'
        },
        fallbackImage: '/images/photos/hero-background.jpg',
        title: {
            html: 'Meet Our <span class="highlight">Expert Team</span>'
        },
        subtitle: 'Behind MarineStream\'s innovative solutions is a dedicated team of maritime professionals, engineers, and technology experts working together to revolutionize underwater asset management.',
        ctas: [
            {
                href: '#leadership-team',
                text: 'Meet Leadership',
                icon: 'fas fa-users',
                style: 'btn-primary',
                ariaLabel: 'Meet our leadership'
            },
            {
                href: '#technical-team',
                text: 'Technical Team',
                icon: 'fas fa-cogs',
                style: 'btn-outline',
                ariaLabel: 'Meet our technical team'
            }
        ],
        quickAccess: {
            title: 'Team Sections',
            items: [
                { href: '#leadership-team', icon: 'fas fa-users', text: 'Leadership' },
                { href: '#technical-team', icon: 'fas fa-laptop-code', text: 'Technical Team' },
                { href: '../core-pages/sales.html', icon: 'fas fa-briefcase', text: 'Our Services' },
                { href: '../core-pages/consultation-training.html', icon: 'fas fa-graduation-cap', text: 'Training' }
            ]
        },
        visual: {
            badge: 'Expert Team',
            title: 'Combined Expertise',
            description: 'Our team brings together decades of operational experience and technical innovation.',
            link: {
                href: '#leadership-team',
                text: 'Meet the Team'
            }
        }
    },
    
    'rov-autoconnect': {
        video: {
            src: 'rov.mp4',
            id: 'hero-video'
        },
        fallbackImage: '/images/photos/rov-inspection.png',
        breadcrumb: {
            id: 'breadcrumb-nav'
        },
        title: {
            html: 'ROV AutoConnect<span class="beta-badge">BETA</span>'
        },
        subtitle: 'Simplifying ROV video streaming through automatic RTSP detection and VLC integration',
        ctas: [
            {
                href: 'https://github.com/Mathew-Harvey/ROV_Connect/releases/download/v1.0.9/ROV_AutoConnect.exe',
                text: 'Download ROV AutoConnect v1.0.9',
                icon: 'fas fa-download',
                style: 'btn-primary',
                target: '_blank',
                rel: 'noopener noreferrer'
            },
            {
                href: 'https://www.videolan.org/vlc/',
                text: 'Download VLC Media Player',
                icon: 'fas fa-external-link-alt',
                style: 'btn-outline',
                target: '_blank',
                rel: 'noopener noreferrer'
            }
        ]
    },
    
    'bfmpGen': {
        video: {
            src: 'heroVid01.mp4'
        },
        fallbackImage: '/images/photos/hero-background.jpg',
        badge: {
            icon: 'fas fa-ship',
            text: 'Biofouling Management'
        },
        title: 'Biofouling Management Plan Generator',
        subtitle: 'Create compliant, vessel-specific Biofouling Management Plans (BFMP) that meet international standards and regulatory requirements for marine environmental protection.',
        ctas: [
            {
                href: '#generator',
                text: 'Create Your BFMP',
                icon: 'fas fa-plus-circle',
                style: 'btn-primary',
                ariaLabel: 'Start creating your BFMP'
            },
            {
                href: '/contact',
                text: 'Contact Our Team',
                icon: 'fas fa-phone',
                style: 'btn-outline',
                ariaLabel: 'Contact our team for assistance'
            }
        ],
        quickAccess: {
            title: 'BFMP Benefits',
            items: [
                { href: '#compliance', icon: 'fas fa-check-circle', text: 'Regulatory Compliance' },
                { href: '#environmental', icon: 'fas fa-leaf', text: 'Environmental Protection' },
                { href: '#efficiency', icon: 'fas fa-gas-pump', text: 'Fuel Efficiency' },
                { href: '#ports', icon: 'fas fa-anchor', text: 'Port Compliance' }
            ]
        },
        visual: {
            badge: 'BFMP Generator',
            title: 'Compliant Documentation',
            description: 'Generate professional Biofouling Management Plans that meet international standards.',
            link: {
                href: '#generator',
                text: 'Start Creating'
            }
        }
    },
    
    'hullCalc': {
        video: {
            src: 'heroVid01.mp4'
        },
        fallbackImage: '/images/photos/hero-background.jpg',
        badge: {
            icon: 'fas fa-calculator',
            text: 'Hull Analysis Tool'
        },
        title: 'Hull Fouling Cost Calculator',
        subtitle: 'Calculate the economic and environmental impact of hull fouling with precision, backed by advanced 3D underwater scanning research and academic studies from the University of Melbourne.',
        ctas: [
            {
                href: '#calculator',
                text: 'Start Calculator',
                icon: 'fas fa-play',
                style: 'btn-primary',
                ariaLabel: 'Start calculating hull fouling costs'
            },
            {
                href: '/contact',
                text: 'Contact Our Team',
                icon: 'fas fa-phone',
                style: 'btn-outline',
                ariaLabel: 'Contact our team for assistance'
            }
        ],
        quickAccess: {
            title: 'Calculator Features',
            items: [
                { href: '#vessel-selection', icon: 'fas fa-ship', text: 'Vessel Types' },
                { href: '#fouling-rating', icon: 'fas fa-algae', text: 'Fouling Rating' },
                { href: '#cost-analysis', icon: 'fas fa-chart-line', text: 'Cost Analysis' },
                { href: '#environmental-impact', icon: 'fas fa-leaf', text: 'Environmental Impact' }
            ]
        },
        visual: {
            badge: 'Cost Calculator',
            title: 'Precision Analysis',
            description: 'Calculate the real cost of hull fouling with data-backed precision.',
            link: {
                href: '#calculator',
                text: 'Start Calculating'
            }
        }
    }
};

/**
 * Get hero configuration for a page
 * @param {string} pageName - Page identifier (e.g., 'index', 'sales', 'blog')
 * @returns {Object|null} - Hero configuration or null if not found
 */
function getHeroConfig(pageName) {
    return HERO_CONFIGS[pageName] || null;
}

// Make available globally
if (typeof window !== 'undefined') {
    window.HERO_CONFIGS = HERO_CONFIGS;
    window.getHeroConfig = getHeroConfig;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HERO_CONFIGS, getHeroConfig };
}

