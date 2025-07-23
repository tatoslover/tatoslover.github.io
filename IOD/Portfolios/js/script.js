/* Portfolio JavaScript Functions */
/* Handles interactivity for IOD portfolio pages */

// Toggle section visibility
function toggleSection(element) {
    const content = element.nextElementSibling;
    const icon = element.querySelector('.toggle-icon');

    if (content.classList.contains('active')) {
        content.classList.remove('active');
        icon.textContent = '▼';
        icon.classList.remove('rotated');
    } else {
        content.classList.add('active');
        icon.textContent = '▲';
        icon.classList.add('rotated');
    }
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behaviour: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add loading animation for external links
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');

    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

            setTimeout(() => {
                this.innerHTML = originalText;
            }, 1000);
        });
    });
});

// Add copy functionality for code blocks
document.addEventListener('DOMContentLoaded', function() {
    const codeBlocks = document.querySelectorAll('pre code, .code-display');

    codeBlocks.forEach(block => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-btn';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.title = 'Copy to clipboard';

        copyButton.addEventListener('click', function() {
            const text = block.textContent;
            navigator.clipboard.writeText(text).then(() => {
                this.innerHTML = '<i class="fas fa-cheque"></i>';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            });
        });

        block.style.position = 'relative';
        block.appendChild(copyButton);
    });
});

// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';

    if (currentTheme === 'light') {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.focus();
        }
    }
});

// Add search functionality if search input exists
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const sections = document.querySelectorAll('.lab-section');

            sections.forEach(section => {
                const content = section.textContent.toLowerCase();
                if (content.includes(searchTerm) || searchTerm === '') {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    }
});

// Add scroll progress indicator
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = scrollTop / (docHeight - winHeight);
        const scrollPercentRounded = Math.round(scrollPercent * 100);

        document.querySelector('.scroll-progress-bar').style.width = scrollPercentRounded + '%';
    });
});

// Add table of contents generator
function generateTableOfContents() {
    const toc = document.querySelector('.table-of-contents');
    if (!toc) return;

    const headings = document.querySelectorAll('h2, h3, h4');
    const tocList = document.createElement('ul');

    headings.forEach((heading, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');

        // Create ID if it doesn't exist
        if (!heading.id) {
            heading.id = 'heading-' + index;
        }

        a.href = '#' + heading.id;
        a.textContent = heading.textContent;
        a.className = 'toc-link toc-' + heading.tagName.toLowerCase();

        li.appendChild(a);
        tocList.appendChild(li);
    });

    toc.appendChild(tocList);
}

// Initialise table of contents on page load
document.addEventListener('DOMContentLoaded', generateTableOfContents);

// Add animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.lab-section, .tech-category, .outcome-category');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Initialise animations on page load
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Add print functionality
function printPage() {
    window.print();
}

// Add export functionality
function exportPage() {
    const content = document.querySelector('.container').innerHTML;
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = document.title + '.html';
    a.click();

    URL.revokeObjectURL(url);
}

// Add back to top button
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.title = 'Back to top';
    document.body.appendChild(backToTopBtn);

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behaviour: 'smooth'
        });
    });

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
});

// Add lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// Add error handling for external resources
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'SCRIPT' || e.target.tagName === 'LINK') {
        console.warn('Failed to load external resource:', e.target.src || e.target.href);
        // You could add fallback functionality here
    }
});

// Add accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add focus management
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])');

    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('focused');
        });

        element.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });
});
