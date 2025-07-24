// Performance Monitoring Script
// Tracks and reports website performance metrics to measure optimization benefits

(function() {
    'use strict';

    // Performance monitoring configuration
    const PERF_CONFIG = {
        enableLogging: true,
        enableMetrics: true,
        reportInterval: 5000, // Report every 5 seconds
        trackResourceTiming: true,
        trackUserTiming: true,
        trackNavigationTiming: true,
        trackPaintTiming: true,
        trackLargestContentfulPaint: true,
        trackFirstInputDelay: true,
        trackCumulativeLayoutShift: true
    };

    // Performance data storage
    let performanceData = {
        navigation: {},
        resources: [],
        customMetrics: {},
        vitals: {}
    };

    // Utility functions
    function log(message, level = 'info') {
        if (!PERF_CONFIG.enableLogging) return;

        const timestamp = new Date().toISOString();
        const styles = {
            info: 'color: #2196F3',
            success: 'color: #4CAF50',
            warning: 'color: #FF9800',
            error: 'color: #F44336'
        };

        console.log(`%c[PERF ${timestamp}] ${message}`, styles[level] || styles.info);
    }

    function roundToTwo(num) {
        return Math.round((num + Number.EPSILON) * 100) / 100;
    }

    // Navigation Timing API
    function measureNavigationTiming() {
        if (!PERF_CONFIG.trackNavigationTiming) return;

        const navigation = performance.getEntriesByType('navigation')[0];
        if (!navigation) return;

        performanceData.navigation = {
            domainLookup: roundToTwo(navigation.domainLookupEnd - navigation.domainLookupStart),
            tcpConnection: roundToTwo(navigation.connectEnd - navigation.connectStart),
            tlsHandshake: navigation.secureConnectionStart > 0 ?
                roundToTwo(navigation.connectEnd - navigation.secureConnectionStart) : 0,
            requestResponse: roundToTwo(navigation.responseEnd - navigation.requestStart),
            documentProcessing: roundToTwo(navigation.loadEventEnd - navigation.responseEnd),
            totalPageLoad: roundToTwo(navigation.loadEventEnd - navigation.navigationStart),
            timeToFirstByte: roundToTwo(navigation.responseStart - navigation.navigationStart),
            domContentLoaded: roundToTwo(navigation.domContentLoadedEventEnd - navigation.navigationStart),
            windowLoad: roundToTwo(navigation.loadEventEnd - navigation.navigationStart)
        };

        log(`Navigation Timing captured: TTFB ${performanceData.navigation.timeToFirstByte}ms,
             Total Load: ${performanceData.navigation.totalPageLoad}ms`);
    }

    // Resource Timing API
    function measureResourceTiming() {
        if (!PERF_CONFIG.trackResourceTiming) return;

        const resources = performance.getEntriesByType('resource');
        performanceData.resources = resources.map(resource => ({
            name: resource.name.split('/').pop() || resource.name,
            type: resource.initiatorType,
            size: resource.transferSize || 0,
            duration: roundToTwo(resource.duration),
            startTime: roundToTwo(resource.startTime),
            url: resource.name
        }));

        // Analyze resource performance
        const cssResources = performanceData.resources.filter(r => r.type === 'link' || r.name.endsWith('.css'));
        const jsResources = performanceData.resources.filter(r => r.type === 'script' || r.name.endsWith('.js'));
        const imageResources = performanceData.resources.filter(r => r.type === 'img' || /\.(png|jpg|jpeg|gif|svg|webp)$/.test(r.name));

        log(`Resources loaded: ${cssResources.length} CSS, ${jsResources.length} JS, ${imageResources.length} images`);
    }

    // Paint Timing API
    function measurePaintTiming() {
        if (!PERF_CONFIG.trackPaintTiming) return;

        const paintEntries = performance.getEntriesByType('paint');
        paintEntries.forEach(entry => {
            performanceData.vitals[entry.name] = roundToTwo(entry.startTime);
        });

        if (performanceData.vitals['first-contentful-paint']) {
            log(`First Contentful Paint: ${performanceData.vitals['first-contentful-paint']}ms`);
        }
    }

    // Largest Contentful Paint
    function measureLCP() {
        if (!PERF_CONFIG.trackLargestContentfulPaint) return;

        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                performanceData.vitals.largestContentfulPaint = roundToTwo(lastEntry.startTime);
                log(`Largest Contentful Paint: ${performanceData.vitals.largestContentfulPaint}ms`);
            });

            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            log('LCP measurement not supported', 'warning');
        }
    }

    // First Input Delay
    function measureFID() {
        if (!PERF_CONFIG.trackFirstInputDelay) return;

        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    performanceData.vitals.firstInputDelay = roundToTwo(entry.processingStart - entry.startTime);
                    log(`First Input Delay: ${performanceData.vitals.firstInputDelay}ms`);
                });
            });

            observer.observe({ entryTypes: ['first-input'] });
        } catch (e) {
            log('FID measurement not supported', 'warning');
        }
    }

    // Cumulative Layout Shift
    function measureCLS() {
        if (!PERF_CONFIG.trackCumulativeLayoutShift) return;

        try {
            let clsValue = 0;
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                performanceData.vitals.cumulativeLayoutShift = roundToTwo(clsValue);
            });

            observer.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
            log('CLS measurement not supported', 'warning');
        }
    }

    // Custom metrics
    function measureCustomMetrics() {
        // Time to Interactive (approximation)
        const domContentLoaded = performance.getEntriesByName('DOMContentLoaded')[0];
        if (domContentLoaded) {
            performanceData.customMetrics.timeToInteractive = roundToTwo(domContentLoaded.startTime);
        }

        // Critical resource count
        const criticalResources = performanceData.resources.filter(r =>
            r.type === 'link' || r.type === 'script' ||
            (r.type === 'img' && r.name.includes('pp.png'))
        );
        performanceData.customMetrics.criticalResourceCount = criticalResources.length;

        // Total resource size
        const totalSize = performanceData.resources.reduce((sum, r) => sum + (r.size || 0), 0);
        performanceData.customMetrics.totalResourceSize = Math.round(totalSize / 1024); // KB

        // CSS/JS bundle sizes
        const cssSize = performanceData.resources
            .filter(r => r.type === 'link' || r.name.endsWith('.css'))
            .reduce((sum, r) => sum + (r.size || 0), 0);
        const jsSize = performanceData.resources
            .filter(r => r.type === 'script' || r.name.endsWith('.js'))
            .reduce((sum, r) => sum + (r.size || 0), 0);

        performanceData.customMetrics.cssSize = Math.round(cssSize / 1024);
        performanceData.customMetrics.jsSize = Math.round(jsSize / 1024);
    }

    // Performance grade calculation
    function calculatePerformanceGrade() {
        const metrics = performanceData.vitals;
        let score = 100;

        // FCP scoring (good: <1.8s, needs improvement: 1.8s-3s, poor: >3s)
        if (metrics['first-contentful-paint']) {
            if (metrics['first-contentful-paint'] > 3000) score -= 20;
            else if (metrics['first-contentful-paint'] > 1800) score -= 10;
        }

        // LCP scoring (good: <2.5s, needs improvement: 2.5s-4s, poor: >4s)
        if (metrics.largestContentfulPaint) {
            if (metrics.largestContentfulPaint > 4000) score -= 25;
            else if (metrics.largestContentfulPaint > 2500) score -= 15;
        }

        // FID scoring (good: <100ms, needs improvement: 100ms-300ms, poor: >300ms)
        if (metrics.firstInputDelay) {
            if (metrics.firstInputDelay > 300) score -= 20;
            else if (metrics.firstInputDelay > 100) score -= 10;
        }

        // CLS scoring (good: <0.1, needs improvement: 0.1-0.25, poor: >0.25)
        if (metrics.cumulativeLayoutShift) {
            if (metrics.cumulativeLayoutShift > 0.25) score -= 25;
            else if (metrics.cumulativeLayoutShift > 0.1) score -= 15;
        }

        return Math.max(0, score);
    }

    // Generate performance report
    function generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            connection: navigator.connection ? {
                effectiveType: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
                rtt: navigator.connection.rtt
            } : null,
            performance: performanceData,
            grade: calculatePerformanceGrade()
        };

        return report;
    }

    // Display performance summary
    function displaySummary() {
        const report = generateReport();

        console.group('🚀 Performance Summary');
        console.log(`Overall Grade: ${report.grade}/100`);

        if (performanceData.vitals['first-contentful-paint']) {
            console.log(`First Contentful Paint: ${performanceData.vitals['first-contentful-paint']}ms`);
        }

        if (performanceData.vitals.largestContentfulPaint) {
            console.log(`Largest Contentful Paint: ${performanceData.vitals.largestContentfulPaint}ms`);
        }

        if (performanceData.navigation.timeToFirstByte) {
            console.log(`Time to First Byte: ${performanceData.navigation.timeToFirstByte}ms`);
        }

        if (performanceData.customMetrics.totalResourceSize) {
            console.log(`Total Resource Size: ${performanceData.customMetrics.totalResourceSize}KB`);
        }

        console.log(`Resources Loaded: ${performanceData.resources.length}`);
        console.groupEnd();

        // Store in sessionStorage for debugging
        try {
            sessionStorage.setItem('performanceReport', JSON.stringify(report, null, 2));
        } catch (e) {
            log('Could not store performance report in sessionStorage', 'warning');
        }
    }

    // Initialize performance monitoring
    function init() {
        log('Performance monitoring initialized');

        // Wait for page load to get complete metrics
        if (document.readyState === 'complete') {
            startMeasurement();
        } else {
            window.addEventListener('load', startMeasurement);
        }
    }

    function startMeasurement() {
        log('Starting performance measurement');

        // Immediate measurements
        measureNavigationTiming();
        measureResourceTiming();
        measurePaintTiming();
        measureCustomMetrics();

        // Async measurements
        measureLCP();
        measureFID();
        measureCLS();

        // Generate report after delay to capture async metrics
        setTimeout(() => {
            displaySummary();

            // Dispatch custom event for other scripts
            document.dispatchEvent(new CustomEvent('performanceReportReady', {
                detail: generateReport()
            }));
        }, 2000);
    }

    // Expose API for external access
    window.PerformanceMonitor = {
        getReport: generateReport,
        getData: () => performanceData,
        displaySummary: displaySummary,
        config: PERF_CONFIG
    };

    // Auto-initialize
    init();

})();
