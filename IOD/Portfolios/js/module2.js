/**
 * Module 2 Specific JavaScript Functions
 * Functions unique to Module 2 Lab Portfolio
 */

// ============================================================================
// MODULE 2 SPECIFIC FUNCTIONS
// ============================================================================

const Module2 = {

    // ========================================================================
    // MODULE 2 UTILITIES (Currently minimal)
    // ========================================================================

    /**
     * Module 2 specific greeting (if needed in future)
     */
    greetUser: function(inputId = 'greetName', outputId = 'greetResult') {
        return Portfolio.greetUser(inputId, outputId, 'Welcome to Module 2');
    },

    /**
     * Demonstrate responsive design concepts (placeholder for future use)
     */
    demonstrateResponsive: function() {
        // Placeholder for future responsive design demonstrations
        console.log('Module 2: Responsive design concepts');
    },

    /**
     * CSS demonstration helper (placeholder for future use)
     */
    demonstrateCSS: function() {
        // Placeholder for future CSS demonstrations
        console.log('Module 2: CSS fundamentals');
    },

    /**
     * Flexbox demonstration helper (placeholder for future use)
     */
    demonstrateFlexbox: function() {
        // Placeholder for future Flexbox demonstrations
        console.log('Module 2: Flexbox layout system');
    },

    // ========================================================================
    // INITIALISATION
    // ========================================================================

    /**
     * Initialise Module 2 specific functionality
     */
    init: function() {
        console.log('Module 2 specific functions loaded');

        // Module 2 specific initialisation
        document.addEventListener("DOMContentLoaded", function () {
            console.log('Module 2 portfolio initialised');

            // Any Module 2 specific DOM manipulation can go here
        });
    }
};

// ============================================================================
// LEGACY FUNCTION WRAPPERS FOR BACKWARD COMPATIBILITY
// ============================================================================

// Module 2 specific greeting function (if needed)
function greetUser() {
    return Module2.greetUser();
}

// Placeholder functions for future Module 2 specific functionality
function demonstrateResponsive() {
    return Module2.demonstrateResponsive();
}

function demonstrateCSS() {
    return Module2.demonstrateCSS();
}

function demonstrateFlexbox() {
    return Module2.demonstrateFlexbox();
}

// ============================================================================
// AUTO-INITIALISATION
// ============================================================================

// Initialise Module 2 when loaded
Module2.init();

// Make globally available
window.Module2 = Module2;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Module2;
}
