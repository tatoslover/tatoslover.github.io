// CSS Loader Utility - Optimized non-critical CSS loading
// Provides fallback and performance optimization for CSS loading

(function() {
    'use strict';

    // CSS loading utility
    function loadCSS(href, before, media, attributes) {
        const ss = window.document.createElement('link');
        const ref = before || window.document.getElementsByTagName('script')[0];
        const sheets = window.document.styleSheets;

        ss.rel = 'stylesheet';
        ss.href = href;
        ss.media = 'only x'; // Temporarily set to non-matching media query

        // Add any additional attributes
        if (attributes) {
            Object.keys(attributes).forEach(key => {
                ss.setAttribute(key, attributes[key]);
            });
        }

        // Insert before the reference element
        ref.parentNode.insertBefore(ss, before ? before : ref);

        // Set media back to specified media or 'all' once loaded
        ss.onload = function() {
            ss.media = media || 'all';
        };

        // Fallback for older browsers
        if (ss.addEventListener) {
            ss.addEventListener('load', ss.onload);
        }

        return ss;
    }

    // Load critical external resources
    function loadExternalCSS() {
        // FontAwesome with integrity check
        loadCSS(
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
            null,
            'all',
            {
                'integrity': 'sha512-Avb2QiuDEEvB4bZJYdft2mNjVShBftLdPG8FJ0V7irTLQ8Uo0qcPxh4Plq7G5tGm0rU+1SPhVotteLpBERwTkw==',
                'crossorigin': 'anonymous',
                'referrerpolicy': 'no-referrer'
            }
        );
    }

    // Enhanced CSS preloader with error handling
    function enhancedLoadCSS(cssFiles) {
        cssFiles.forEach(file => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = file.href;

            // Add loading and error handling
            link.onload = function() {
                console.log(`✅ CSS loaded: ${file.name}`);
                // Dispatch custom event for tracking
                document.dispatchEvent(new CustomEvent('cssLoaded', {
                    detail: { file: file.name, href: file.href }
                }));
            };

            link.onerror = function() {
                console.warn(`⚠️ CSS failed to load: ${file.name}`);
                // Attempt fallback if provided
                if (file.fallback) {
                    const fallbackLink = document.createElement('link');
                    fallbackLink.rel = 'stylesheet';
                    fallbackLink.href = file.fallback;
                    document.head.appendChild(fallbackLink);
                }
            };

            document.head.appendChild(link);
        });
    }

    // CSS files configuration
    const cssFiles = [
        {
            name: 'Main Styles',
            href: 'css/style.css'
        },
        {
            name: 'Animations',
            href: 'css/animations.css'
        },
        {
            name: 'Mobile Styles',
            href: 'css/mobile.css'
        }
    ];

    // Performance observer for CSS loading
    function observePerformance() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.initiatorType === 'link' && entry.name.includes('.css')) {
                        console.log(`📊 CSS Performance: ${entry.name} loaded in ${entry.duration.toFixed(2)}ms`);
                    }
                });
            });

            observer.observe({ entryTypes: ['resource'] });
        }
    }

    // Initialize CSS loading optimization
    function initializeCSSOptimization() {
        // Check if critical CSS is already loaded
        const criticalStylesLoaded = document.querySelector('style[data-critical]') ||
                                   document.querySelector('style').textContent.includes('--header-height');

        if (criticalStylesLoaded) {
            console.log('✅ Critical CSS detected');
        }

        // Load external CSS
        loadExternalCSS();

        // Setup performance monitoring
        observePerformance();

        // Enhanced loading for local CSS files
        enhancedLoadCSS(cssFiles);

        // Add CSS loading complete event
        let loadedCount = 0;
        document.addEventListener('cssLoaded', function(e) {
            loadedCount++;
            if (loadedCount === cssFiles.length) {
                document.dispatchEvent(new CustomEvent('allCSSLoaded'));
                console.log('🎉 All CSS files loaded successfully');
            }
        });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeCSSOptimization);
    } else {
        initializeCSSOptimization();
    }

    // Expose utility functions globally
    window.CSSLoader = {
        loadCSS: loadCSS,
        enhancedLoadCSS: enhancedLoadCSS
    };

})();
