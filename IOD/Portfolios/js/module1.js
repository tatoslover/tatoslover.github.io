/**
 * Module 1 Specific JavaScript Functions
 * Functions unique to Module 1 Lab Portfolio
 */

// ============================================================================
// MODULE 1 SPECIFIC FUNCTIONS
// ============================================================================

const Module1 = {
  // ========================================================================
  // EXERCISE 3 - COLUMN MANIPULATION
  // ========================================================================

  /**
   * Change column 1 styling and content
   */
  changeColumn1: function () {
    const column = document.getElementById("column1");
    const heading = document.getElementById("heading1");
    const input = document.getElementById("input1");

    column.style.backgroundColor = "lightblue";

    if (input.value.trim() !== "") {
      heading.innerText = input.value;
    } else {
      heading.innerText = "Changed!";
    }
  },

  /**
   * Change column 2 styling and content
   */
  changeColumn2: function () {
    const column = document.getElementById("column2");
    const heading = document.getElementById("heading2");
    const input = document.getElementById("input2");

    column.style.backgroundColor = "lightcoral";

    if (input.value.trim() !== "") {
      heading.innerText = input.value;
    } else {
      heading.innerText = "Updated!";
    }
  },

  // ========================================================================
  // EXERCISE 4 - CALCULATOR WITH SPECIFIC UI INTEGRATION
  // ========================================================================

  /**
   * Calculate operation with Module 1 specific UI handling
   */
  calculate: function (operation) {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const result = document.getElementById("calcResult");

    if (isNaN(num1) || isNaN(num2)) {
      result.textContent = "Please enter valid numbers!";
      return;
    }

    let output;
    switch (operation) {
      case "add":
        output = Portfolio.calculator.add(num1, num2);
        break;
      case "subtract":
        output = Portfolio.calculator.subtract(num1, num2);
        break;
      case "multiply":
        output = Portfolio.calculator.multiply(num1, num2);
        break;
      case "divide":
        output = Portfolio.calculator.divide(num1, num2);
        break;
    }

    result.textContent = `Result: ${output}`;
  },

  // ========================================================================
  // EXERCISE 5 - ARRAY DEMONSTRATION
  // ========================================================================

  /**
   * Demonstrate array operations specific to Module 1
   */
  demonstrateArrays: function () {
    let fruits = ["apple", "banana", "cherry", "date", "elderberry"];
    const steps = [];

    steps.push(`Initial: [${fruits.join(", ")}]`);

    fruits[1] = "blueberry"; // replaces "banana"
    fruits[4] = "fig"; // replaces "elderberry"
    steps.push(`After replacements: [${fruits.join(", ")}]`);

    fruits.unshift("avocado");
    steps.push(`After unshift: [${fruits.join(", ")}]`);

    fruits.pop();
    steps.push(`After pop: [${fruits.join(", ")}]`);

    document.getElementById("arrayResult").innerHTML = steps.join("<br>");
  },

  // ========================================================================
  // EXERCISE 6 - OBJECT DEMONSTRATION
  // ========================================================================

  /**
   * Demonstrate object operations with library books
   */
  demonstrateObjects: function () {
    let library = [
      {
        title: "The Hobbit",
        description: "A fantasy adventure",
        author: "J.R.R. Tolkien",
        pages: 310,
      },
      {
        title: "1984",
        description: "Dystopian future",
        author: "George Orwell",
        pages: 328,
      },
      {
        title: "To Kill a Mockingbird",
        description: "A novel on racial injustice",
        author: "Harper Lee",
        pages: 281,
      },
      {
        title: "The Great Gatsby",
        description: "Life in the Jazz Age",
        author: "F. Scott Fitzgerald",
        pages: 180,
      },
      {
        title: "Moby-Dick",
        description: "A whale of a tale",
        author: "Herman Melville",
        pages: 635,
      },
    ];

    // Update the description of the first book
    library[0].description = "An epic fantasy journey";

    let output = "<strong>📚 Library Collection:</strong><br><br>";
    library.forEach((book, index) => {
      output += `<strong>${index + 1}. ${book.title}</strong><br>`;
      output += `Author: ${book.author}<br>`;
      output += `Pages: ${book.pages}<br>`;
      output += `Description: ${book.description}<br>`;
      output += "----------------------<br>";
    });

    document.getElementById("objectResult").innerHTML = output;
  },

  // ========================================================================
  // EXERCISE 7 - TESTING DEMONSTRATION
  // ========================================================================

  /**
   * Run comprehensive tests for Module 1 functions
   */
  runTests: function () {
    try {
      const tests = [];
      const resultElement = document.getElementById("testResult");

      if (!resultElement) {
        console.error("Test result element not found!");
        return;
      }

      // Check if Portfolio library is available
      if (typeof Portfolio === "undefined" || !Portfolio.calculator) {
        resultElement.innerHTML = "❌ Portfolio library not loaded!";
        return;
      }

      // Tests for add()
      try {
        const result1 = Portfolio.calculator.add(5, 3);
        tests.push(
          `add(5, 3) = ${result1} (Expected: 8) ${result1 === 8 ? "✅" : "❌"}`,
        );
      } catch (error) {
        tests.push(`add(5, 3) = Error: ${error.message} ❌`);
      }

      try {
        const result2 = Portfolio.calculator.add(0, -4);
        tests.push(
          `add(0, -4) = ${result2} (Expected: -4) ${result2 === -4 ? "✅" : "❌"}`,
        );
      } catch (error) {
        tests.push(`add(0, -4) = Error: ${error.message} ❌`);
      }

      try {
        const result3 = Portfolio.calculator.add(2.5, 3.1);
        tests.push(
          `add(2.5, 3.1) = ${result3} (Expected: 5.6) ${Math.abs(result3 - 5.6) < 0.0001 ? "✅" : "❌"}`,
        );
      } catch (error) {
        tests.push(`add(2.5, 3.1) = Error: ${error.message} ❌`);
      }

      // Tests for subtract()
      try {
        const result4 = Portfolio.calculator.subtract(10, 4);
        tests.push(
          `subtract(10, 4) = ${result4} (Expected: 6) ${result4 === 6 ? "✅" : "❌"}`,
        );
      } catch (error) {
        tests.push(`subtract(10, 4) = Error: ${error.message} ❌`);
      }

      try {
        const result5 = Portfolio.calculator.subtract(0, 0);
        tests.push(
          `subtract(0, 0) = ${result5} (Expected: 0) ${result5 === 0 ? "✅" : "❌"}`,
        );
      } catch (error) {
        tests.push(`subtract(0, 0) = Error: ${error.message} ❌`);
      }

      try {
        const result6 = Portfolio.calculator.subtract(-5, 10);
        tests.push(
          `subtract(-5, 10) = ${result6} (Expected: -15) ${result6 === -15 ? "✅" : "❌"}`,
        );
      } catch (error) {
        tests.push(`subtract(-5, 10) = Error: ${error.message} ❌`);
      }

      // Tests for multiply()
      try {
        const result7 = Portfolio.calculator.multiply(7, 6);
        tests.push(
          `multiply(7, 6) = ${result7} (Expected: 42) ${result7 === 42 ? "✅" : "❌"}`,
        );
      } catch (error) {
        tests.push(`multiply(7, 6) = Error: ${error.message} ❌`);
      }

      try {
        const result8 = Portfolio.calculator.multiply(0, 100);
        tests.push(
          `multiply(0, 100) = ${result8} (Expected: 0) ${result8 === 0 ? "✅" : "❌"}`,
        );
      } catch (error) {
        tests.push(`multiply(0, 100) = Error: ${error.message} ❌`);
      }

      try {
        const result9 = Portfolio.calculator.multiply(-3, 2);
        tests.push(
          `multiply(-3, 2) = ${result9} (Expected: -6) ${result9 === -6 ? "✅" : "❌"}`,
        );
      } catch (error) {
        tests.push(`multiply(-3, 2) = Error: ${error.message} ❌`);
      }

      // Tests for divide()
      try {
        const result10 = Portfolio.calculator.divide(20, 4);
        tests.push(
          `divide(20, 4) = ${result10} (Expected: 5) ${result10 === 5 ? "✅" : "❌"}`,
        );
      } catch (error) {
        tests.push(`divide(20, 4) = Error: ${error.message} ❌`);
      }

      // Test divide by zero (should throw error)
      try {
        Portfolio.calculator.divide(20, 0);
        tests.push(`divide(20, 0) = No Error (Expected: Error) ❌`);
      } catch (error) {
        tests.push(
          `divide(20, 0) = Error: "${error.message}" (Expected: Error) ✅`,
        );
      }

      try {
        const result11 = Portfolio.calculator.divide(-10, 2);
        tests.push(
          `divide(-10, 2) = ${result11} (Expected: -5) ${result11 === -5 ? "✅" : "❌"}`,
        );
      } catch (error) {
        tests.push(`divide(-10, 2) = Error: ${error.message} ❌`);
      }

      // Display results
      const passedTests = tests.filter((test) => test.includes("✅")).length;
      const totalTests = tests.length;

      resultElement.innerHTML = `
        <div style="margin-bottom: 15px;">
          <strong>Test Results: ${passedTests}/${totalTests} passed</strong>
        </div>
        ${tests.join("<br>")}
      `;
    } catch (error) {
      const resultElement = document.getElementById("testResult");
      if (resultElement) {
        resultElement.innerHTML = `❌ Test execution failed: ${error.message}`;
      }
      console.error("Test execution failed:", error);
    }
  },

  // ========================================================================
  // GREETING FUNCTIONALITY
  // ========================================================================

  /**
   * Greet user with Module 1 specific implementation
   */
  greetUser: function () {
    const name = document.getElementById("greetName").value;
    const result = document.getElementById("greetResult");

    if (name.trim() === "") {
      result.textContent = "Please enter your name!";
      return;
    }

    result.textContent = `Hello ${name}! 👋`;
  },

  // ========================================================================
  // INITIALIZATION
  // ========================================================================

  /**
   * Initialize Module 1 specific functionality
   */
  init: function () {
    console.log("Module 1 specific functions loaded");

    // Initialize with first section open if needed
    document.addEventListener("DOMContentLoaded", function () {
      console.log("Module 1 portfolio initialized");
    });
  },
};

// ============================================================================
// LEGACY FUNCTION WRAPPERS FOR BACKWARD COMPATIBILITY
// ============================================================================

// Exercise 3 functions
function changeColumn1() {
  return Module1.changeColumn1();
}

function changeColumn2() {
  return Module1.changeColumn2();
}

// Exercise 4 calculator function
function calculate(operation) {
  return Module1.calculate(operation);
}

// Exercise 5 array function
function demonstrateArrays() {
  return Module1.demonstrateArrays();
}

// Exercise 6 object function
function demonstrateObjects() {
  return Module1.demonstrateObjects();
}

// Exercise 7 testing function
function runTests() {
  return Module1.runTests();
}

// Greeting function
function greetUser() {
  return Module1.greetUser();
}

// ============================================================================
// AUTO-INITIALIZATION
// ============================================================================

// Initialize Module 1 when loaded
Module1.init();

// Make globally available
window.Module1 = Module1;

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = Module1;
}
