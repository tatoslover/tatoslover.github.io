/**
 * Main JavaScript Library for IOD Portfolio Labs
 * Provides reusable functions and utilities for Modules 1-3
 * Similar to main.css approach for consistent functionality
 */

// ============================================================================
// CORE UTILITY FUNCTIONS
// ============================================================================

/**
 * Main namespace for portfolio utilities
 */
const Portfolio = {
  // ========================================================================
  // UI INTERACTION FUNCTIONS
  // ========================================================================

  /**
   * Toggle section visibility with smooth animation
   * Used across all module portfolios for collapsible sections
   */
  toggleSection: function (header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector(".toggle-icon");

    if (!content) {
      console.error("No content element found next to header");
      return;
    }

    if (!icon) {
      console.error("No toggle icon found in header");
      return;
    }

    content.classList.toggle("active");
    icon.style.transform = content.classList.contains("active")
      ? "rotate(180deg)"
      : "rotate(0deg)";
  },

  /**
   * Generic form input handler with validation
   * @param {string} inputId - ID of the input element
   * @param {string} outputId - ID of the output element
   * @param {function} processor - Function to process the input
   * @param {object} options - Optional configuration
   */
  handleInput: function (inputId, outputId, processor, options = {}) {
    const input = document.getElementById(inputId);
    const output = document.getElementById(outputId);

    if (!input || !output) {
      console.error(`Elements not found: ${inputId} or ${outputId}`);
      return;
    }

    const value = input.value.trim();

    // Validation
    if (value === "" && !options.allowEmpty) {
      output.textContent = options.emptyMessage || "Please enter a value!";
      return;
    }

    try {
      const result = processor(value);
      output.textContent = result;
    } catch (error) {
      output.textContent = `Error: ${error.message}`;
    }
  },

  /**
   * Generic number input handler with validation
   * @param {string} input1Id - First number input ID
   * @param {string} input2Id - Second number input ID (optional)
   * @param {string} outputId - Output element ID
   * @param {function} processor - Function to process the numbers
   */
  handleNumberInput: function (input1Id, input2Id, outputId, processor) {
    const num1 = parseFloat(document.getElementById(input1Id).value);
    const num2 = input2Id
      ? parseFloat(document.getElementById(input2Id).value)
      : null;
    const output = document.getElementById(outputId);

    if (isNaN(num1) || (input2Id && isNaN(num2))) {
      output.textContent = "Please enter valid numbers!";
      return;
    }

    try {
      const result = processor(num1, num2);
      output.textContent = result;
    } catch (error) {
      output.textContent = `Error: ${error.message}`;
    }
  },

  /**
   * Generic greeting function
   * @param {string} inputId - ID of the name input element
   * @param {string} outputId - ID of the output element
   * @param {string} greeting - Custom greeting message (optional)
   */
  greetUser: function (inputId, outputId, greeting = "Hello") {
    const name = document.getElementById(inputId).value;
    const result = document.getElementById(outputId);

    if (name.trim() === "") {
      result.textContent = "Please enter your name!";
      return;
    }

    result.textContent = `${greeting} ${name}! 👋`;
  },

  // ========================================================================
  // MATHEMATICAL OPERATIONS
  // ========================================================================

  /**
   * Basic calculator operations
   */
  calculator: {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => {
      if (b === 0) throw new Error("Cannot divide by zero!");
      return a / b;
    },

    /**
     * Precision currency operations to avoid floating point errors
     * @param {number} float1 - First number
     * @param {number} float2 - Second number
     * @param {string} operation - Operation (+, -, *, /)
     * @param {number} decimals - Number of decimal places
     */
    currencyOperation: function (float1, float2, operation, decimals = 2) {
      const factor = 10 ** decimals;
      let int1 = Math.round(float1 * factor);
      let int2 = Math.round(float2 * factor);
      let result;

      switch (operation) {
        case "+":
          result = (int1 + int2) / factor;
          break;
        case "-":
          result = (int1 - int2) / factor;
          break;
        case "*":
          result = (int1 * int2) / (factor * factor);
          break;
        case "/":
          if (int2 === 0) throw new Error("Cannot divide by zero!");
          result = int1 / int2;
          break;
        default:
          throw new Error("Invalid operation");
      }

      return parseFloat(result.toFixed(decimals));
    },
  },

  // ========================================================================
  // STRING UTILITIES
  // ========================================================================

  /**
   * String manipulation utilities
   */
  strings: {
    /**
     * Capitalise first letter of each word
     */
    ucFirstLetters: function (str) {
      return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },

    /**
     * Truncate string with ellipsis
     * @param {string} str - String to truncate
     * @param {number} length - Maximum length
     */
    truncate: function (str, length = 100) {
      return str.length > length ? str.substring(0, length) + "..." : str;
    },

    /**
     * Convert string to camelCase
     */
    camelCase: function (str) {
      return str
        .toLowerCase()
        .split(/[\s-_]+/)
        .map((word, index) =>
          index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
        )
        .join("");
    },

    /**
     * Cheque if string is empty or whitespace
     */
    isEmpty: function (str) {
      return !str || str.trim() === "";
    },
  },

  // ========================================================================
  // ARRAY UTILITIES
  // ========================================================================

  /**
   * Array manipulation utilities
   */
  arrays: {
    /**
     * Remove duplicates from array
     */
    unique: function (arr) {
      return [...new Set(arr)];
    },

    /**
     * Find items in array matching condition
     */
    findMatching: function (arr, condition) {
      return arr.filter(condition);
    },

    /**
     * Group array items by property
     */
    groupBy: function (arr, property) {
      return arr.reduce((groups, item) => {
        const key =
          typeof property === "function" ? property(item) : item[property];
        groups[key] = groups[key] || [];
        groups[key].push(item);
        return groups;
      }, {});
    },

    /**
     * Get random item from array
     */
    randomItem: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
  },

  // ========================================================================
  // OBJECT UTILITIES
  // ========================================================================

  /**
   * Object manipulation utilities
   */
  objects: {
    /**
     * Deep clone an object
     */
    deepClone: function (obj) {
      return JSON.parse(JSON.stringify(obj));
    },

    /**
     * Merge objects
     */
    merge: function (target, ...sources) {
      return Object.assign({}, target, ...sources);
    },

    /**
     * Get nested property value safely
     */
    getNestedProperty: function (obj, path) {
      return path.split(".").reduce((current, key) => current?.[key], obj);
    },

    /**
     * Cheque if object has property
     */
    hasProperty: function (obj, property) {
      return obj.hasOwnProperty(property);
    },
  },

  // ========================================================================
  // VALIDATION UTILITIES
  // ========================================================================

  /**
   * Input validation utilities
   */
  validation: {
    /**
     * Validate email format
     */
    isEmail: function (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    /**
     * Validate number range
     */
    isInRange: function (num, min, max) {
      return num >= min && num <= max;
    },

    /**
     * Validate required fields
     */
    isRequired: function (value) {
      return (
        value !== null && value !== undefined && value.toString().trim() !== ""
      );
    },

    /**
     * Validate string length
     */
    isValidLength: function (str, min, max) {
      const length = str.length;
      return length >= min && length <= max;
    },
  },

  // ========================================================================
  // DISPLAY UTILITIES
  // ========================================================================

  /**
   * Display and formatting utilities
   */
  display: {
    /**
     * Format output with consistent styling
     */
    formatOutput: function (title, content, type = "info") {
      const typeClasses = {
        success: "text-success",
        error: "text-danger",
        warning: "text-warning",
        info: "text-info",
      };

      return `<div class="output-section ${typeClasses[type] || ""}">
                <h5>${title}</h5>
                <div class="output-content">${content}</div>
            </div>`;
    },

    /**
     * Create formatted table from array of objects
     */
    createTable: function (data, columns = null) {
      if (!data.length) return "<p>No data available</p>";

      const cols = columns || Object.keys(data[0]);
      const headers = cols.map((col) => `<th>${col}</th>`).join("");
      const rows = data
        .map(
          (item) =>
            `<tr>${cols.map((col) => `<td>${item[col] || ""}</td>`).join("")}</tr>`,
        )
        .join("");

      return `<table class="table table-striped">
                <thead><tr>${headers}</tr></thead>
                <tbody>${rows}</tbody>
            </table>`;
    },

    /**
     * Show loading spinner
     */
    showLoading: function (elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        element.innerHTML = '<div class="spinner">Loading...</div>';
      }
    },

    /**
     * Hide loading spinner
     */
    hideLoading: function (elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        element.innerHTML = "";
      }
    },
  },

  // ========================================================================
  // DEMO HELPERS
  // ========================================================================

  /**
   * Demo and testing utilities
   */
  demo: {
    /**
     * Run a demonstration with formatted output
     */
    runDemo: function (title, demoFunction, outputId) {
      const output = document.getElementById(outputId);
      try {
        const result = demoFunction();
        output.innerHTML = Portfolio.display.formatOutput(
          title,
          result,
          "success",
        );
      } catch (error) {
        output.innerHTML = Portfolio.display.formatOutput(
          title,
          `Error: ${error.message}`,
          "error",
        );
      }
    },

    /**
     * Create interactive demo with input and output
     */
    createDemo: function (config) {
      const { inputId, outputId, processor, title } = config;

      return function () {
        Portfolio.handleInput(inputId, outputId, (value) => {
          const result = processor(value);
          return Portfolio.display.formatOutput(title, result);
        });
      };
    },
  },

  // ========================================================================
  // ASYNC UTILITIES
  // ========================================================================

  /**
   * Asynchronous operation utilities
   */
  async: {
    /**
     * Delay execution
     */
    delay: function (ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },

    /**
     * Debounce function calls
     */
    debounce: function (func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    /**
     * Throttle function calls
     */
    throttle: function (func, limit) {
      let inThrottle;
      return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    },
  },

  // ========================================================================
  // INITIALISATION
  // ========================================================================

  /**
   * Initialise portfolio functionality
   */
  init: function () {
    // Add event listeners for common elements
    document.addEventListener("DOMContentLoaded", () => {
      // Add click handlers for toggle sections that don't already have onclick
      document.querySelectorAll(".lab-header").forEach((header) => {
        if (!header.hasAttribute("onclick")) {
          header.addEventListener("click", () => {
            Portfolio.toggleSection(header);
          });
        }
      });

      // Add keyboard navigation
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          // Close any open modals or dropdowns
          document.querySelectorAll(".modal, .dropdown").forEach((el) => {
            el.style.display = "none";
          });
        }
      });

      // Auto-initialise first section by default for all portfolios
      this.initFirstSectionOpen();

      console.log("Portfolio JavaScript library initialised");
    });
  },

  /**
   * Initialise first section as open
   * @param {number} sectionIndex - Index of section to open (default: 0)
   */
  initFirstSectionOpen: function (sectionIndex = 0) {
    const sections = document.querySelectorAll(".lab-content");
    const icons = document.querySelectorAll(".toggle-icon");

    if (sections[sectionIndex] && icons[sectionIndex]) {
      sections[sectionIndex].classList.add("active");
      icons[sectionIndex].style.transform = "rotate(180deg)";
    }
  },

  /**
   * Initialise specific sections as open
   * @param {Array} sectionIndices - Array of section indices to open
   */
  initSectionsOpen: function (sectionIndices = [0]) {
    const sections = document.querySelectorAll(".lab-content");
    const icons = document.querySelectorAll(".toggle-icon");

    sectionIndices.forEach((index) => {
      if (sections[index] && icons[index]) {
        sections[index].classList.add("active");
        icons[index].style.transform = "rotate(180deg)";
      }
    });
  },
};

// ============================================================================
// LEGACY COMPATIBILITY FUNCTIONS
// ============================================================================

/**
 * Legacy function names for backward compatibility
 */
function toggleSection(header) {
  if (typeof Portfolio !== "undefined" && Portfolio.toggleSection) {
    return Portfolio.toggleSection(header);
  } else {
    console.error("Portfolio library not loaded yet!");
  }
}

function add(a, b) {
  return Portfolio.calculator.add(a, b);
}

function subtract(a, b) {
  return Portfolio.calculator.subtract(a, b);
}

function multiply(a, b) {
  return Portfolio.calculator.multiply(a, b);
}

function divide(a, b) {
  return Portfolio.calculator.divide(a, b);
}

function ucFirstLetters(str) {
  return Portfolio.strings.ucFirstLetters(str);
}

function truncate(str, length) {
  return Portfolio.strings.truncate(str, length);
}

function unique(arr) {
  return Portfolio.arrays.unique(arr);
}

// ============================================================================
// AUTO-INITIALISATION
// ============================================================================

// Initialise the library when loaded
Portfolio.init();

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = Portfolio;
}

// Make globally available
window.Portfolio = Portfolio;
