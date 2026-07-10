class BreadcrumbNavigation {
    constructor() {
        this.currentPage = this.detectCurrentPage();
        this.breadcrumbData = this.getBreadcrumbData();
    }

    detectCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('index.html') || path === '/' || path === '') return 'home';
        if (path.includes('blog.html')) return 'blog';
        if (path.includes('/blog/') && path.includes('.html')) return 'blog-article';
        if (path.includes('sales.html')) return 'sales';
        if (path.includes('consultation-training.html')) return 'consultation-training';
        if (path.includes('privacy.html')) return 'privacy';
        if (path.includes('hullCalc.html')) return 'hull-calc';
        if (path.includes('bfmpGen.html')) return 'bfmp-gen';
        return 'home';
    }

    getBreadcrumbData() {
        const data = {
            'home': [
                { text: 'Home', href: '/core-pages/index.html' }
            ],
            'blog': [
                { text: 'Home', href: '/core-pages/index.html' },
                { text: 'Blog', href: '/core-pages/blog.html', active: true }
            ],
            'blog-article': [
                { text: 'Home', href: '/core-pages/index.html' },
                { text: 'Blog', href: '/core-pages/blog.html' },
                { text: 'Article', active: true }
            ],
            'sales': [
                { text: 'Home', href: '/core-pages/index.html' },
                { text: 'Solutions', href: '/core-pages/sales.html', active: true }
            ],
            'consultation-training': [
                { text: 'Home', href: '/core-pages/index.html' },
                { text: 'Consultation & Training', href: '/core-pages/consultation-training.html', active: true }
            ],
            'privacy': [
                { text: 'Home', href: '/core-pages/index.html' },
                { text: 'Privacy Policy', href: '/core-pages/privacy.html', active: true }
            ],
            'hull-calc': [
                { text: 'Home', href: '/core-pages/index.html' },
                { text: 'Resources', href: '/core-pages/blog.html' },
                { text: 'Fouling Cost Calculator', href: '/interactive-tools/hullCalc.html', active: true }
            ],
            'bfmp-gen': [
                { text: 'Home', href: '/core-pages/index.html' },
                { text: 'Resources', href: '/core-pages/blog.html' },
                { text: 'Biofouling Management Plan Generator', href: '/interactive-tools/bfmpGen.html', active: true }
            ],
            'rov-autoconnect': [
                { text: 'Home', href: '/core-pages/index.html' },
                { text: 'Resources', href: '/core-pages/blog.html' },
                { text: 'ROV AutoConnect', href: '/core-pages/rov-autoconnect.html', active: true }
            ]
        };
        return data[this.currentPage] || data['home'];
    }

    generateBreadcrumb() {
        return `
            <nav class="breadcrumb" aria-label="Breadcrumb navigation">
                <div class="container">
                    <ol class="breadcrumb-list">
                        ${this.breadcrumbData.map((item, index) => `
                            <li class="breadcrumb-item${item.active ? ' active' : ''}" ${item.active ? 'aria-current="page"' : ''}>
                                ${item.active ? item.text : `<a href="${item.href}" class="breadcrumb-link">${item.text}</a>`}
                            </li>
                        `).join('')}
                    </ol>
                </div>
            </nav>
        `;
    }

    init() {
        try {
            const breadcrumbPlaceholder = document.getElementById('breadcrumb-placeholder');
            if (breadcrumbPlaceholder) {
                breadcrumbPlaceholder.innerHTML = this.generateBreadcrumb();
                console.log('Breadcrumb.js: Breadcrumb navigation initialized');
            } else {
                console.warn('Breadcrumb.js: Breadcrumb placeholder not found');
            }
        } catch (error) {
            console.error('Breadcrumb.js: Error initializing breadcrumb:', error);
        }
    }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Breadcrumb.js: DOM loaded, initializing breadcrumb...');
    const breadcrumb = new BreadcrumbNavigation();
    breadcrumb.init();
    console.log('Breadcrumb.js: Breadcrumb initialization complete');
}); 