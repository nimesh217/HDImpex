// SEO and Performance optimization for H D IMPEX
const SEOConfig = {
    siteName: 'H D IMPEX',
    siteUrl: 'https://hdimpex.com', // Replace with actual domain
    companyName: 'H D IMPEX - Merchant Exporters & Importers',
    description: 'H D IMPEX is a trusted merchant exporter and importer delivering quality agricultural products, industrial materials, and consumer goods worldwide.',
    keywords: 'export, import, merchant exporter, agricultural products, spices, grains, industrial materials, consumer goods, international trade, India',
    author: 'H D IMPEX',
    language: 'en',
    country: 'IN',
    phone: '+91-XXXXXXXXXX',
    email: 'info@hdimpex.com',
    address: 'India',
    logo: 'assets/logo.svg',
    socialMedia: {
        whatsapp: '+91XXXXXXXXXX'
    }
};

// Add structured data (JSON-LD)
function addStructuredData() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": SEOConfig.companyName,
        "url": SEOConfig.siteUrl,
        "logo": `${SEOConfig.siteUrl}/${SEOConfig.logo}`,
        "description": SEOConfig.description,
        "telephone": SEOConfig.phone,
        "email": SEOConfig.email,
        "address": {
            "@type": "PostalAddress",
            "addressCountry": SEOConfig.country,
            "addressLocality": SEOConfig.address
        },
        "sameAs": [
            `https://wa.me/${SEOConfig.socialMedia.whatsapp.replace(/[^0-9]/g, '')}`
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": SEOConfig.phone,
            "contactType": "customer service",
            "availableLanguage": "English"
        }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(organizationSchema);
    document.head.appendChild(script);
}

// Add Open Graph and Twitter meta tags
function addSocialMetaTags(pageData) {
    const metaTags = [
        // Open Graph
        { property: 'og:site_name', content: SEOConfig.siteName },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: pageData.title },
        { property: 'og:description', content: pageData.description },
        { property: 'og:url', content: pageData.url },
        { property: 'og:image', content: `${SEOConfig.siteUrl}/${SEOConfig.logo}` },
        { property: 'og:locale', content: 'en_US' },
        
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: pageData.title },
        { name: 'twitter:description', content: pageData.description },
        { name: 'twitter:image', content: `${SEOConfig.siteUrl}/${SEOConfig.logo}` },
        
        // Additional SEO
        { name: 'robots', content: 'index, follow' },
        { name: 'googlebot', content: 'index, follow' },
        { name: 'author', content: SEOConfig.author },
        { name: 'language', content: SEOConfig.language },
        { name: 'geo.country', content: SEOConfig.country }
    ];

    metaTags.forEach(tag => {
        const meta = document.createElement('meta');
        if (tag.property) meta.setAttribute('property', tag.property);
        if (tag.name) meta.setAttribute('name', tag.name);
        meta.setAttribute('content', tag.content);
        document.head.appendChild(meta);
    });
}

// Performance optimizations
function optimizePerformance() {
    // Lazy load images
    lazyLoadImages();
    
    // Preload critical resources
    preloadCriticalResources();
    
    // Optimize third-party scripts
    optimizeThirdPartyScripts();
    
    // Add performance monitoring
    addPerformanceMonitoring();
}

// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// Preload critical resources
function preloadCriticalResources() {
    const criticalResources = [
        { href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap', as: 'style' },
        { href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css', as: 'style' },
        { href: 'custom-style.css', as: 'style' }
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        if (resource.as === 'style') {
            link.onload = function() { this.rel = 'stylesheet'; };
        }
        document.head.appendChild(link);
    });
}

// Optimize third-party scripts
function optimizeThirdPartyScripts() {
    // Defer non-critical scripts
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach(script => {
        if (!script.hasAttribute('async') && !script.hasAttribute('defer')) {
            script.setAttribute('defer', '');
        }
    });
}

// Add performance monitoring
function addPerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                
                // Log performance metrics (you can send to analytics)
                console.log('Page Load Time:', loadTime + 'ms');
                
                // Add performance badge if load time is good
                if (loadTime < 3000) {
                    addPerformanceBadge();
                }
            }, 0);
        });
    }
}

// Add performance badge
function addPerformanceBadge() {
    const badge = document.createElement('div');
    badge.style.cssText = `
        position: fixed;
        bottom: 10px;
        left: 10px;
        background: #28a745;
        color: white;
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 12px;
        z-index: 1000;
        opacity: 0.8;
    `;
    badge.textContent = '⚡ Fast Loading';
    document.body.appendChild(badge);
    
    // Remove after 3 seconds
    setTimeout(() => badge.remove(), 3000);
}

// Initialize SEO and performance optimizations
function initializeSEO(pageData) {
    // Add structured data
    addStructuredData();
    
    // Add social meta tags
    addSocialMetaTags(pageData);
    
    // Optimize performance
    optimizePerformance();
    
    // Add canonical URL
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = pageData.url;
    document.head.appendChild(canonical);
}

// Export SEO functions
window.SEOJS = {
    initializeSEO,
    SEOConfig
};
