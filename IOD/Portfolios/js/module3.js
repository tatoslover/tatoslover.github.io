/**
 * Module 3 Specific JavaScript Functions
 * Functions unique to Module 3 Lab Portfolio - JavaScript Fundamentals
 */

// ============================================================================
// MODULE 3 SPECIFIC FUNCTIONS
// ============================================================================

const Module3 = {
  // ========================================================================
  // QUESTION SELECTOR FUNCTIONALITY
  // ========================================================================

  /**
   * Handle question selection for fundamentals section
   */
  selectQuestion: function () {
    const selector = document.getElementById("question-selector");
    const submenu = document.getElementById("basketball-submenu");
    const questionNum = selector.value;

    if (questionNum === "7") {
      submenu.style.display = "block";
      Module3.basketballGame.isQuestion7Active = false;
      Module3.runQuestion7();
    } else {
      submenu.style.display = "none";
      Module3.basketballGame.isQuestion7Active = false;

      switch (questionNum) {
        case "":
          document.getElementById("fundamentals-output").textContent =
            "Select a question above to see JavaScript fundamentals in action!";
          break;
        case "1":
          Module3.runQuestion1();
          break;
        case "2":
          Module3.runQuestion2();
          break;
        case "3":
          Module3.runQuestion3();
          break;
        case "4":
          Module3.runQuestion4();
          break;
        case "5":
          Module3.runQuestion5();
          break;
        case "6":
          Module3.runQuestion6();
          break;
        case "8":
          Module3.runQuestion8();
          break;
        case "9":
          Module3.runQuestion9();
          break;
        case "10":
          Module3.runQuestion10();
          break;
      }
    }
  },

  // ========================================================================
  // FUNDAMENTALS QUESTIONS
  // ========================================================================

  runQuestion1: function () {
    const output = document.getElementById("fundamentals-output");
    let name = "John";
    let surname = "Doe";
    let age = 25;
    let height = 5.9;
    let isStudent = true;
    let isMarried = false;
    let hobbies = ["reading", "swimming", "coding"];
    let person = {
      fullName: name + " " + surname,
      age: age,
      height: height,
      isStudent: isStudent,
      hobbies: hobbies,
    };

    let result = `Variables and Data Types:\n\n`;
    result += `String: name = "${name}"\n`;
    result += `String: surname = "${surname}"\n`;
    result += `Number: age = ${age}\n`;
    result += `Number: height = ${height}\n`;
    result += `Boolean: isStudent = ${isStudent}\n`;
    result += `Boolean: isMarried = ${isMarried}\n`;
    result += `Array: hobbies = [${hobbies.join(", ")}]\n`;
    result += `Object: person = ${JSON.stringify(person, null, 2)}`;

    output.textContent = result;
  },

  runQuestion2: function () {
    const output = document.getElementById("fundamentals-output");
    let a = 10;
    let b = 5;

    let result = `Operators and Expressions (a = ${a}, b = ${b}):\n\n`;
    result += `Arithmetic Operators:\n`;
    result += `a + b = ${a + b}\n`;
    result += `a - b = ${a - b}\n`;
    result += `a * b = ${a * b}\n`;
    result += `a / b = ${a / b}\n`;
    result += `a % b = ${a % b}\n`;
    result += `a ** b = ${a ** b}\n\n`;

    result += `Comparison Operators:\n`;
    result += `a > b = ${a > b}\n`;
    result += `a < b = ${a < b}\n`;
    result += `a >= b = ${a >= b}\n`;
    result += `a <= b = ${a <= b}\n`;
    result += `a == b = ${a == b}\n`;
    result += `a != b = ${a != b}\n\n`;

    result += `Logical Operators:\n`;
    result += `(a > b) && (b > 0) = ${a > b && b > 0}\n`;
    result += `(a < b) || (b > 0) = ${a < b || b > 0}\n`;
    result += `!(a > b) = ${!(a > b)}`;

    output.textContent = result;
  },

  runQuestion3: function () {
    const output = document.getElementById("fundamentals-output");
    let result = `Control Structures:\n\n`;

    let score = 85;
    let grade;
    if (score >= 90) {
      grade = "A";
    } else if (score >= 80) {
      grade = "B";
    } else if (score >= 70) {
      grade = "C";
    } else {
      grade = "F";
    }
    result += `If-else: Score ${score} = Grade ${grade}\n\n`;

    let day = 3;
    let dayName;
    switch (day) {
      case 1:
        dayName = "Monday";
        break;
      case 2:
        dayName = "Tuesday";
        break;
      case 3:
        dayName = "Wednesday";
        break;
      case 4:
        dayName = "Thursday";
        break;
      case 5:
        dayName = "Friday";
        break;
      default:
        dayName = "Weekend";
    }
    result += `Switch: Day ${day} = ${dayName}\n\n`;

    result += `For loop (1 to 5):\n`;
    for (let i = 1; i <= 5; i++) {
      result += `${i} `;
    }
    result += `\n\n`;

    result += `While loop (countdown from 5):\n`;
    let countdown = 5;
    while (countdown > 0) {
      result += `${countdown} `;
      countdown--;
    }
    result += `Blast off!`;

    output.textContent = result;
  },

  runQuestion4: function () {
    const output = document.getElementById("fundamentals-output");

    function greet(name) {
      return `Hello, ${name}!`;
    }

    const multiply = function (a, b) {
      return a * b;
    };

    const square = (x) => x * x;

    const introduce = (name = "Guest", age = 0) => {
      return `Hi, I'm ${name} and I'm ${age} years old.`;
    };

    let result = `Functions:\n\n`;
    result += `Function Declaration: greet("Alice") = "${greet("Alice")}"\n`;
    result += `Function Expression: multiply(4, 5) = ${multiply(4, 5)}\n`;
    result += `Arrow Function: square(6) = ${square(6)}\n`;
    result += `Default Parameters: introduce() = "${introduce()}"\n`;
    result += `Default Parameters: introduce("Bob", 25) = "${introduce("Bob", 25)}"`;

    output.textContent = result;
  },

  runQuestion5: function () {
    const output = document.getElementById("fundamentals-output");

    let fruits = ["apple", "banana", "orange"];
    fruits.push("grape");
    fruits.unshift("mango");
    let removed = fruits.pop();

    let person = {
      name: "John",
      age: 30,
      city: "New York",
    };

    function getGreeting(person) {
      return `Hello, I'm ${person.name}, ${person.age} years old, from ${person.city}.`;
    }

    let result = `Arrays and Objects:\n\n`;
    result += `Array Operations:\n`;
    result += `Original: ["apple", "banana", "orange"]\n`;
    result += `After push("grape") and unshift("mango"): [${fruits.join(", ")}]\n`;
    result += `Removed with pop(): ${removed}\n`;
    result += `Final array: [${fruits.join(", ")}]\n\n`;

    result += `Object Operations:\n`;
    result += `Person object: ${JSON.stringify(person, null, 2)}\n`;
    result += `Greeting: ${getGreeting(person)}`;

    output.textContent = result;
  },

  runQuestion6: function () {
    const output = document.getElementById("fundamentals-output");

    let globalVar = "I'm global";

    function greeting() {
      let localVar = "I'm local";

      function innerFunction() {
        return `${globalVar} and ${localVar}`;
      }

      return innerFunction();
    }

    function createCounter() {
      let count = 0;
      return function () {
        count++;
        return count;
      };
    }

    const counter = createCounter();

    let result = `Scope and Closures:\n\n`;
    result += `Global variable: "${globalVar}"\n`;
    result += `Function with closure: "${greeting()}"\n`;
    result += `Counter closure:\n`;
    result += `First call: ${counter()}\n`;
    result += `Second call: ${counter()}\n`;
    result += `Third call: ${counter()}`;

    output.textContent = result;
  },

  runQuestion7: function () {
    const output = document.getElementById("fundamentals-output");

    let result = `Basketball Game Object:\n\n`;
    result += `This is an interactive basketball game object with methods:\n`;
    result += `- basket(): Score a 2-point basket\n`;
    result += `- freeThrow(): Score a 1-point free throw\n`;
    result += `- threePointer(): Score a 3-point shot\n`;
    result += `- foul(): Add a foul\n`;
    result += `- halfTime(): Start second half\n`;
    result += `- fullTime(): End game\n`;
    result += `- reset(): Reset game\n\n`;
    result += `Use the game controls above to interact with the game!`;

    output.textContent = result;
  },

  runQuestion8: function () {
    const output = document.getElementById("fundamentals-output");

    function printCityDetails(city, state, population, size) {
      return `${city} is in ${state}. Population: ${population.toLocaleString()}, Size: ${size} sq km`;
    }

    let randomNum = Math.random();
    let roundedNum = Math.round(randomNum * 100);
    let currentDate = new Date();
    let formattedDate = currentDate.toLocaleDateString();
    let text = "JavaScript is awesome!";
    let upperText = text.toUpperCase();
    let wordCount = text.split(" ").length;

    let result = `Built-in Objects and Methods:\n\n`;
    result += `City Details: ${printCityDetails("Sydney", "NSW", 5312000, 12368)}\n\n`;
    result += `Math Object:\n`;
    result += `Random number: ${randomNum.toFixed(4)}\n`;
    result += `Rounded (x100): ${roundedNum}\n`;
    result += `Square root of 16: ${Math.sqrt(16)}\n\n`;
    result += `Date Object:\n`;
    result += `Current date: ${formattedDate}\n`;
    result += `Full date: ${currentDate.toString()}\n\n`;
    result += `String Methods:\n`;
    result += `Original: "${text}"\n`;
    result += `Uppercase: "${upperText}"\n`;
    result += `Word count: ${wordCount}`;

    output.textContent = result;
  },

  runQuestion9: function () {
    const output = document.getElementById("fundamentals-output");

    let result = `Error Handling:\n\n`;

    try {
      let obj = { name: "John" };
      result += `Accessing obj.name: ${obj.name}\n`;
      result += `Accessing obj.age: ${obj.age || "undefined"}\n`;
      let invalidOperation = obj.nonExistentMethod();
    } catch (error) {
      result += `Caught error: ${error.message}\n`;
    } finally {
      result += `Finally block executed\n`;
    }

    function divide(a, b) {
      if (b === 0) {
        throw new Error("Division by zero is not allowed");
      }
      return a / b;
    }

    try {
      result += `\nDivision 10/2: ${divide(10, 2)}\n`;
      result += `Division 10/0: ${divide(10, 0)}\n`;
    } catch (error) {
      result += `Custom error caught: ${error.message}`;
    }

    output.textContent = result;
  },

  runQuestion10: function () {
    const output = document.getElementById("fundamentals-output");

    function Person(name, age) {
      this.name = name;
      this.age = age;
      this.greet = function () {
        return `Hello, I'm ${this.name}`;
      };
    }

    class PersonClass {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }

      canDrive() {
        return this.age >= 18;
      }
    }

    let person1 = new Person("Alice", 25);
    let person2 = new PersonClass("Bob", 17);

    let result = `Object-Oriented Programming:\n\n`;
    result += `Constructor Function:\n`;
    result += `Person: ${person1.name}, Age: ${person1.age}\n`;
    result += `Greeting: ${person1.greet()}\n\n`;
    result += `Class Syntax:\n`;
    result += `PersonClass: ${person2.name}, Age: ${person2.age}\n`;
    result += `Can drive: ${person2.canDrive()}\n`;
    result += `Can drive (Alice): ${new PersonClass("Alice", 25).canDrive()}`;

    output.textContent = result;
  },

  // ========================================================================
  // BASKETBALL GAME OBJECT
  // ========================================================================

  basketballGame: {
    homeScore: 0,
    awayScore: 0,
    homeFouls: 0,
    awayFouls: 0,
    quarter: 1,
    gameOver: false,
    isQuestion7Active: false,

    basket: function () {
      if (!this.gameOver) {
        this.homeScore += 2;
        this.updateDisplay();
      }
    },

    freeThrow: function () {
      if (!this.gameOver) {
        this.homeScore += 1;
        this.updateDisplay();
      }
    },

    threePointer: function () {
      if (!this.gameOver) {
        this.homeScore += 3;
        this.updateDisplay();
      }
    },

    foul: function () {
      if (!this.gameOver) {
        this.homeFouls++;
        this.updateDisplay();
      }
    },

    halfTime: function () {
      if (!this.gameOver && this.quarter < 3) {
        this.quarter = 3;
        this.updateDisplay();
        alert("Half time! Starting second half.");
      }
    },

    fullTime: function () {
      this.gameOver = true;
      this.quarter = 4;
      this.updateDisplay();
      let winner =
        this.homeScore > this.awayScore
          ? "Home"
          : this.homeScore < this.awayScore
            ? "Away"
            : "Tie";
      alert(
        `Game Over! Final Score - Home: ${this.homeScore}, Away: ${this.awayScore}. Winner: ${winner}`,
      );
    },

    reset: function () {
      this.homeScore = 0;
      this.awayScore = 0;
      this.homeFouls = 0;
      this.awayFouls = 0;
      this.quarter = 1;
      this.gameOver = false;
      this.updateDisplay();
    },

    updateDisplay: function () {
      if (this.isQuestion7Active) {
        const display = document.getElementById("basketball-display");
        if (display) {
          display.innerHTML = `
                        <strong>Basketball Game Status:</strong><br>
                        Home: ${this.homeScore} | Away: ${this.awayScore}<br>
                        Fouls - Home: ${this.homeFouls} | Away: ${this.awayFouls}<br>
                        Quarter: ${this.quarter}${this.gameOver ? " (Game Over)" : ""}
                    `;
        }
      }
    },
  },

  // ========================================================================
  // INTERMEDIATE QUESTIONS
  // ========================================================================

  selectIntermediateQuestion: function () {
    const selector = document.getElementById("intermediate-question-selector");
    const questionNum = selector.value;

    switch (questionNum) {
      case "":
        document.getElementById("intermediate-output").textContent =
          "Select a question above to explore intermediate JavaScript concepts!";
        break;
      case "1":
        Module3.runIntermediateQuestion1();
        break;
      case "2":
        Module3.runIntermediateQuestion2();
        break;
      case "3":
        Module3.runIntermediateQuestion3();
        break;
      case "4":
        Module3.runIntermediateQuestion4();
        break;
      case "5":
        Module3.runIntermediateQuestion5();
        break;
      case "6":
        Module3.runIntermediateQuestion6();
        break;
      case "7":
        Module3.runIntermediateQuestion7();
        break;
      case "8":
        Module3.runIntermediateQuestion8();
        break;
      case "9":
        Module3.runIntermediateQuestion9();
        break;
      case "10":
        Module3.runIntermediateQuestion10();
        break;
    }
  },

  runIntermediateQuestion1: function () {
    const output = document.getElementById("intermediate-output");

    function ucFirstLetters(str) {
      return str
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(" ");
    }

    let testString = "hello world javascript";
    let result = `String Manipulation:\n\n`;
    result += `Original: "${testString}"\n`;
    result += `Capitalised: "${ucFirstLetters(testString)}"`;

    output.textContent = result;
  },

  runIntermediateQuestion2: function () {
    const output = document.getElementById("intermediate-output");

    function truncate(str, length) {
      return str.length > length ? str.substring(0, length) + "..." : str;
    }

    function truncateConditional(str, length) {
      return str.length > length ? str.substring(0, length) + "..." : str;
    }

    let longString = "This is a very long string that needs to be truncated";
    let result = `String Truncation:\n\n`;
    result += `Original: "${longString}"\n`;
    result += `Truncated (20 chars): "${truncate(longString, 20)}"\n`;
    result += `Truncated (10 chars): "${truncateConditional(longString, 10)}"`;

    output.textContent = result;
  },

  runIntermediateQuestion3: function () {
    const output = document.getElementById("intermediate-output");

    let animals = ["cat", "dog", "fish", "bird", "lizard"];

    function replaceMiddleAnimal(arr, newAnimal) {
      let middle = Math.floor(arr.length / 2);
      arr[middle] = newAnimal;
      return arr;
    }

    function findMatchingAnimals(arr, searchTerm) {
      return arr.filter((animal) => animal.includes(searchTerm));
    }

    let originalAnimals = [...animals];
    let modifiedAnimals = replaceMiddleAnimal([...animals], "rabbit");
    let searchResults = findMatchingAnimals(animals, "i");

    let result = `Array Operations:\n\n`;
    result += `Original: [${originalAnimals.join(", ")}]\n`;
    result += `After replacing middle: [${modifiedAnimals.join(", ")}]\n`;
    result += `Animals containing 'i': [${searchResults.join(", ")}]`;

    output.textContent = result;
  },

  runIntermediateQuestion4: function () {
    const output = document.getElementById("intermediate-output");

    function camelCase(str) {
      return str
        .toLowerCase()
        .split(" ")
        .map((word, index) =>
          index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
        )
        .join("");
    }

    function camelCaseForOf(str) {
      let words = str.toLowerCase().split(" ");
      let result = "";
      for (let i = 0; i < words.length; i++) {
        if (i === 0) {
          result += words[i];
        } else {
          result += words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }
      }
      return result;
    }

    function camelCaseFunctional(str) {
      return str
        .toLowerCase()
        .split(" ")
        .reduce(
          (acc, word, index) =>
            acc +
            (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)),
          "",
        );
    }

    let testString = "the quick brown fox";
    let result = `Case Conversion:\n\n`;
    result += `Original: "${testString}"\n`;
    result += `Method 1 (map): "${camelCase(testString)}"\n`;
    result += `Method 2 (for loop): "${camelCaseForOf(testString)}"\n`;
    result += `Method 3 (reduce): "${camelCaseFunctional(testString)}"`;

    output.textContent = result;
  },

  runIntermediateQuestion5: function () {
    const output = document.getElementById("intermediate-output");

    function currencyAddition(float1, float2) {
      return Math.round((float1 + float2) * 100) / 100;
    }

    function currencyOperation(float1, float2, operation) {
      let result;
      switch (operation) {
        case "+":
          result = float1 + float2;
          break;
        case "-":
          result = float1 - float2;
          break;
        case "*":
          result = float1 * float2;
          break;
        case "/":
          result = float1 / float2;
          break;
        default:
          throw new Error("Invalid operation");
      }
      return Math.round(result * 100) / 100;
    }

    function currencyOperationExtended(
      float1,
      float2,
      operation,
      numDecimals = 2,
    ) {
      let result;
      switch (operation) {
        case "+":
          result = float1 + float2;
          break;
        case "-":
          result = float1 - float2;
          break;
        case "*":
          result = float1 * float2;
          break;
        case "/":
          result = float1 / float2;
          break;
        default:
          throw new Error("Invalid operation");
      }
      return (
        Math.round(result * Math.pow(10, numDecimals)) /
        Math.pow(10, numDecimals)
      );
    }

    let result = `Currency Operations:\n\n`;
    result += `Addition: ${currencyAddition(0.1, 0.2)}\n`;
    result += `Operation +: ${currencyOperation(10.5, 2.3, "+")}\n`;
    result += `Operation *: ${currencyOperation(10.5, 2.3, "*")}\n`;
    result += `Extended (3 decimals): ${currencyOperationExtended(10.555, 2.333, "*", 3)}`;

    output.textContent = result;
  },

  runIntermediateQuestion6: function () {
    const output = document.getElementById("intermediate-output");

    function unique(arr) {
      return [...new Set(arr)];
    }

    let numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5];
    let uniqueNumbers = unique(numbers);

    let result = `Array Unique Values:\n\n`;
    result += `Original: [${numbers.join(", ")}]\n`;
    result += `Unique: [${uniqueNumbers.join(", ")}]`;

    output.textContent = result;
  },

  runIntermediateQuestion7: function () {
    const output = document.getElementById("intermediate-output");

    let books = [
      { title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
      { title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
      { title: "1984", author: "George Orwell", year: 1949 },
      { title: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951 },
    ];

    function getBookTitle(book) {
      return book.title;
    }

    function getOldBooks(books) {
      return books.filter((book) => book.year < 1950);
    }

    function addGenre(books) {
      return books.map((book) => ({ ...book, genre: "Classic" }));
    }

    function getTitles(books) {
      return books.map((book) => book.title);
    }

    function latestBook(books) {
      return books.reduce((latest, current) =>
        current.year > latest.year ? current : latest,
      );
    }

    let oldBooks = getOldBooks(books);
    let booksWithGenre = addGenre(books);
    let titles = getTitles(books);
    let newest = latestBook(books);

    let result = `Book Operations:\n\n`;
    result += `Total books: ${books.length}\n`;
    result += `Old books (< 1950): ${oldBooks.length}\n`;
    result += `All titles: ${titles.join(", ")}\n`;
    result += `Latest book: ${newest.title} (${newest.year})`;

    output.textContent = result;
  },

  runIntermediateQuestion8: function () {
    const output = document.getElementById("intermediate-output");

    let phoneBook = [
      { name: "John", phone: "555-1234" },
      { name: "Jane", phone: "555-5678" },
      { name: "Bob", phone: "555-9012" },
    ];

    function printPhoneBook(contacts) {
      return contacts
        .map((contact) => `${contact.name}: ${contact.phone}`)
        .join("\n");
    }

    let result = `Phone Book:\n\n`;
    result += printPhoneBook(phoneBook);

    output.textContent = result;
  },

  runIntermediateQuestion9: function () {
    const output = document.getElementById("intermediate-output");

    let salaries = {
      John: 50000,
      Jane: 60000,
      Bob: 45000,
      Alice: 70000,
    };

    function sumSalaries(salaries) {
      return Object.values(salaries).reduce((sum, salary) => sum + salary, 0);
    }

    function topEarner(salaries) {
      let maxSalary = Math.max(...Object.values(salaries));
      return Object.keys(salaries).find((key) => salaries[key] === maxSalary);
    }

    let total = sumSalaries(salaries);
    let highest = topEarner(salaries);

    let result = `Salary Operations:\n\n`;
    result += `Employees: ${Object.keys(salaries).join(", ")}\n`;
    result += `Total salaries: $${total.toLocaleString()}\n`;
    result += `Top earner: ${highest} ($${salaries[highest].toLocaleString()})`;

    output.textContent = result;
  },

  runIntermediateQuestion10: function () {
    const output = document.getElementById("intermediate-output");

    function daysInBetween(date1, date2) {
      let d1 = new Date(date1);
      let d2 = new Date(date2);
      let timeDiff = Math.abs(d2 - d1);
      return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    }

    let startDate = "2024-01-01";
    let endDate = "2024-12-31";
    let daysBetween = daysInBetween(startDate, endDate);

    let result = `Date Operations:\n\n`;
    result += `Start date: ${startDate}\n`;
    result += `End date: ${endDate}\n`;
    result += `Days between: ${daysBetween}`;

    output.textContent = result;
  },

  // ========================================================================
  // ADVANCED QUESTIONS
  // ========================================================================

  selectAdvancedQuestion: function () {
    const selector = document.getElementById("advanced-question-selector");
    const questionNum = selector.value;

    switch (questionNum) {
      case "":
        document.getElementById("advanced-output").textContent =
          "Select a question above to explore advanced JavaScript concepts!";
        break;
      case "1":
        Module3.runAdvancedQuestion1();
        break;
      case "2":
        Module3.runAdvancedQuestion2();
        break;
      case "3":
        Module3.runAdvancedQuestion3();
        break;
      case "4":
        Module3.runAdvancedQuestion4();
        break;
      case "5":
        Module3.runAdvancedQuestion5();
        break;
      case "6":
        Module3.runAdvancedQuestion6();
        break;
      case "7":
        Module3.runAdvancedQuestion7();
        break;
      case "8":
        Module3.runAdvancedQuestion8();
        break;
      case "9":
        Module3.runAdvancedQuestion9();
        break;
      case "10":
        Module3.runAdvancedQuestion10();
        break;
    }
  },

  runAdvancedQuestion1: function () {
    const output = document.getElementById("advanced-output");

    function makeCounter(startValue) {
      let count = startValue;
      return function () {
        count++;
        return count;
      };
    }

    const counter = makeCounter(0);
    let result = `Closures and Counters:\n\n`;
    result += `Counter 1: ${counter()}\n`;
    result += `Counter 2: ${counter()}\n`;
    result += `Counter 3: ${counter()}`;

    output.textContent = result;
  },

  runAdvancedQuestion2: function () {
    const output = document.getElementById("advanced-output");

    function delayMsg(msg) {
      console.log(`This message will be delayed: ${msg}`);
    }

    setTimeout(() => delayMsg("Hello after 3 seconds"), 3000);

    let result = `Delayed Messages:\n\n`;
    result += `Message "Hello after 3 seconds" will appear in console after 3 seconds.\n`;
    result += `Cheque the browser console to see the delayed message.`;

    output.textContent = result;
  },

  runAdvancedQuestion3: function () {
    const output = document.getElementById("advanced-output");

    function debounce(func, delay) {
      let timeoutId;
      return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
      };
    }

    function printMe() {
      console.log("printing debounced message");
    }

    const debouncedPrint = debounce(printMe, 1000);

    let result = `Debouncing:\n\n`;
    result += `Created debounced function with 1 second delay.\n`;
    result += `Function will only execute after 1 second of inactivity.\n`;
    result += `Cheque console for debounced messages.`;

    output.textContent = result;
  },

  runAdvancedQuestion4: function () {
    const output = document.getElementById("advanced-output");

    function printFibonacci() {
      let a = 0,
        b = 1;
      console.log(a);
      console.log(b);

      for (let i = 2; i < 10; i++) {
        let next = a + b;
        console.log(next);
        a = b;
        b = next;
      }
    }

    let result = `Fibonacci Sequences:\n\n`;
    result += `Fibonacci sequence logged to console.\n`;
    result += `Cheque the browser console to see the sequence.`;

    printFibonacci();
    output.textContent = result;
  },

  runAdvancedQuestion5: function () {
    const output = document.getElementById("advanced-output");

    let person = {
      name: "John",
      age: 30,
      city: "New York",

      description: function () {
        return `${this.name} is ${this.age} years old and lives in ${this.city}`;
      },
    };

    let result = `'this' Context:\n\n`;
    result += `Person object: ${JSON.stringify(person, null, 2)}\n`;
    result += `Description: ${person.description()}`;

    output.textContent = result;
  },

  runAdvancedQuestion6: function () {
    const output = document.getElementById("advanced-output");

    function multiply(a, b, c, d) {
      return a * b * c * d;
    }

    function multiplyFour(a) {
      return multiply.bind(null, a, 4);
    }

    const multiplyByFour = multiplyFour(2);

    let result = `Function Binding:\n\n`;
    result += `Original multiply function: multiply(2, 3, 4, 5) = ${multiply(2, 3, 4, 5)}\n`;
    result += `Bound function result: ${multiplyByFour(3, 5)} (equivalent to multiply(2, 4, 3, 5))`;

    output.textContent = result;
  },

  runAdvancedQuestion7: function () {
    const output = document.getElementById("advanced-output");

    class DigitalClock {
      constructor(element) {
        this.element = element;
        this.interval = null;
      }

      display() {
        const now = new Date();
        if (this.element) {
          this.element.textContent = now.toLocaleTimeString();
        }
      }

      stop() {
        if (this.interval) {
          clearInterval(this.interval);
        }
      }

      start() {
        this.display();
        this.interval = setInterval(() => this.display(), 1000);
      }
    }

    let result = `Class Inheritance:\n\n`;
    result += `Created DigitalClock class with inheritance patterns.\n`;
    result += `Demonstrates constructor, methods, and interval management.`;

    output.textContent = result;
  },

  runAdvancedQuestion8: function () {
    const output = document.getElementById("advanced-output");

    function validateStringArg(func) {
      return function (arg) {
        if (typeof arg !== "string") {
          throw new Error("Argument must be a string");
        }
        return func(arg);
      };
    }

    function orderItems(items) {
      return items.sort();
    }

    let result = `Higher-Order Functions:\n\n`;
    result += `Created validator wrapper for function arguments.\n`;
    result += `Example: orderItems(['c', 'a', 'b']) = [${orderItems(["c", "a", "b"]).join(", ")}]\n`;
    result += `Validated version ensures string arguments only.`;

    output.textContent = result;
  },

  runAdvancedQuestion9: function () {
    const output = document.getElementById("advanced-output");

    function randomDelay() {
      return new Promise((resolve) => {
        const delay = Math.random() * 20 + 1;
        setTimeout(() => {
          resolve(delay);
        }, delay);
      });
    }

    randomDelay().then((delay) => {
      console.log(`Promise resolved after ${delay.toFixed(2)}ms`);
    });

    let result = `Promises:\n\n`;
    result += `Created promise with random delay (1-20ms).\n`;
    result += `Cheque console for resolution message.\n`;
    result += `Promise will resolve with the actual delay time.`;

    output.textContent = result;
  },

  runAdvancedQuestion10: function () {
    const output = document.getElementById("advanced-output");

    async function fetchURLData(url) {
      try {
        const response = await fetch(url);
        return await response.json();
      } catch (error) {
        return { error: error.message };
      }
    }

    let result = `Async/Await:\n\n`;
    result += `Created async function for URL data fetching.\n`;
    result += `Demonstrates async/await syntax and error handling.\n`;
    result += `Function handles both success and error cases gracefully.`;

    output.textContent = result;
  },

  // ========================================================================
  // ECOMMERCE EXERCISES
  // ========================================================================

  selectEcommerceExercise: function () {
    const selector = document.getElementById("ecommerce-exercise-selector");
    const exerciseNum = selector.value;

    switch (exerciseNum) {
      case "":
        document.getElementById("ecommerce-output").textContent =
          "Select an exercise above to explore ecommerce JavaScript patterns!";
        break;
      case "1":
        Module3.runEcommerceExercise1();
        break;
      case "2":
        Module3.runEcommerceExercise2();
        break;
      case "3":
        Module3.runEcommerceExercise3();
        break;
      case "4":
        Module3.runEcommerceExercise4();
        break;
      case "5":
        Module3.runEcommerceExercise5();
        break;
      case "6":
        Module3.runEcommerceExercise6();
        break;
      case "7":
        Module3.runEcommerceExercise7();
        break;
      case "8":
        Module3.runEcommerceExercise8();
        break;
    }
  },

  runEcommerceExercise1: function () {
    const output = document.getElementById("ecommerce-output");

    class Product {
      constructor(name, price, description) {
        this._name = name;
        this._price = price;
        this._description = description;
      }

      get name() {
        return this._name;
      }
      get price() {
        return this._price;
      }
      get description() {
        return this._description;
      }

      set name(value) {
        this._name = value;
      }
      set price(value) {
        if (value >= 0) {
          this._price = value;
        }
      }
      set description(value) {
        this._description = value;
      }

      displayInfo() {
        return `${this.name} - $${this.price}: ${this.description}`;
      }
    }

    const product = new Product("Laptop", 999.99, "High-performance laptop");

    let result = `Product Class with Getters/Setters:\n\n`;
    result += `${product.displayInfo()}\n\n`;
    result += `Getters and setters provide controlled access to properties.`;

    output.textContent = result;
  },

  runEcommerceExercise2: function () {
    const output = document.getElementById("ecommerce-output");

    class Product {
      constructor(name, price, description) {
        this.name = name;
        this.price = price;
        this.description = description;
      }

      displayInfo() {
        return `${this.name} - $${this.price}`;
      }
    }

    class TV extends Product {
      constructor(name, price, description, screenSize) {
        super(name, price, description);
        this.screenSize = screenSize;
      }

      displayInfo() {
        return `${super.displayInfo()}, ${this.screenSize}" Screen`;
      }
    }

    const tv = new TV("Smart TV", 599.99, "4K Ultra HD", 55);

    let result = `Inheritance Example:\n\n`;
    result += `TV: ${tv.displayInfo()}\n\n`;
    result += `Demonstrates class inheritance and method overriding.`;

    output.textContent = result;
  },

  runEcommerceExercise3: function () {
    const output = document.getElementById("ecommerce-output");

    function Book(title, author, pages) {
      this.title = title;
      this.author = author;
      this.pages = pages;
    }

    const book = new Book("JavaScript Guide", "John Doe", 350);

    let result = `Constructor Function:\n\n`;
    result += `Book: ${book.title} by ${book.author}\n`;
    result += `Pages: ${book.pages}\n\n`;
    result += `Constructor functions are the pre-ES6 way to create objects.`;

    output.textContent = result;
  },

  runEcommerceExercise4: function () {
    const output = document.getElementById("ecommerce-output");

    class Product {
      constructor(name, price) {
        this.name = name;
        this.price = price;
      }

      displayInfo() {
        return `${this.name} - $${this.price}`;
      }

      static compare(product1, product2) {
        return product1.price - product2.price;
      }
    }

    const product1 = new Product("Laptop", 999.99);
    const product2 = new Product("Mouse", 29.99);
    const comparison = Product.compare(product1, product2);

    let result = `Static Methods:\n\n`;
    result += `Product 1: ${product1.displayInfo()}\n`;
    result += `Product 2: ${product2.displayInfo()}\n`;
    result += `Price difference: $${comparison.toFixed(2)}\n\n`;
    result += `Static methods belong to the class, not instances.`;

    output.textContent = result;
  },

  runEcommerceExercise5: function () {
    const output = document.getElementById("ecommerce-output");

    class Product {
      constructor(name, price) {
        this.name = name;
        this._price = price;
      }

      set price(value) {
        if (value >= 0) {
          this._price = value;
        } else {
          throw new Error("Price cannot be negative");
        }
      }

      get price() {
        return this._price;
      }

      displayInfo() {
        return `${this.name} - $${this.price}`;
      }
    }

    const product = new Product("Tablet", 399.99);

    let result = `Price Validation:\n\n`;
    result += `${product.displayInfo()}\n\n`;
    try {
      product.price = -10;
    } catch (error) {
      result += `Error setting negative price: ${error.message}\n`;
    }
    result += `Price validation prevents invalid values.`;

    output.textContent = result;
  },

  runEcommerceExercise6: function () {
    const output = document.getElementById("ecommerce-output");

    class ProductWithStock {
      #stockCount = 0;

      constructor(name, price, initialStock) {
        this.name = name;
        this.price = price;
        this.#stockCount = initialStock;
      }

      updateStock(quantity) {
        if (this.#stockCount + quantity >= 0) {
          this.#stockCount += quantity;
        } else {
          throw new Error("Insufficient stock");
        }
      }

      get stock() {
        return this.#stockCount;
      }

      displayInfo() {
        return `${this.name} - $${this.price} (Stock: ${this.stock})`;
      }
    }

    const product = new ProductWithStock("Smartphone", 699.99, 10);

    let result = `Private Fields:\n\n`;
    result += `${product.displayInfo()}\n`;
    product.updateStock(-3);
    result += `After selling 3: ${product.displayInfo()}\n\n`;
    result += `Private fields (#stockCount) cannot be accessed directly.`;

    output.textContent = result;
  },

  runEcommerceExercise7: function () {
    const output = document.getElementById("ecommerce-output");

    class Product {
      constructor(name, price) {
        this.name = name;
        this.price = price;
      }

      displayInfo() {
        return `${this.name} - $${this.price}`;
      }
    }

    class Cart {
      constructor() {
        this.items = [];
      }

      addItem(product, quantity = 1) {
        const existingItem = this.items.find(
          (item) => item.product.name === product.name,
        );
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          this.items.push({ product, quantity });
        }
      }

      calculateTotal() {
        return this.items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0,
        );
      }

      getCartSummary() {
        return this.items
          .map(
            (item) =>
              `${item.product.name} x${item.quantity} = $${(item.product.price * item.quantity).toFixed(2)}`,
          )
          .join("\n");
      }
    }

    const cart = new Cart();
    cart.addItem(new Product("Laptop", 999.99), 1);
    cart.addItem(new Product("Mouse", 29.99), 2);

    let result = `Shopping Cart:\n\n`;
    result += `${cart.getCartSummary()}\n`;
    result += `Total: $${cart.calculateTotal().toFixed(2)}`;

    output.textContent = result;
  },

  runEcommerceExercise8: function () {
    const output = document.getElementById("ecommerce-output");

    class Product {
      constructor(name, price) {
        this.name = name;
        this.price = price;
      }

      displayInfo() {
        return `${this.name} - $${this.price}`;
      }
    }

    class TV extends Product {
      static salePrice = 0.8;

      static getSalePrice() {
        return TV.salePrice;
      }

      constructor(name, price, screenSize) {
        super(name, price);
        this.screenSize = screenSize;
      }
    }

    class Cart {
      constructor() {
        this.items = [];
        this.discountCode = null;
        this.discountAmount = 0;
      }

      addItem(product, quantity = 1) {
        this.items.push({ product, quantity });
      }

      applyDiscountCode(code) {
        if (code === "SAVE20") {
          this.discountCode = code;
          this.discountAmount = 0.2;
        }
      }

      calculateTotal() {
        let total = this.items.reduce((sum, item) => {
          let price = item.product.price;
          if (item.product instanceof TV) {
            price *= TV.getSalePrice();
          }
          return sum + price * item.quantity;
        }, 0);

        if (this.discountCode) {
          total *= 1 - this.discountAmount;
        }

        return total;
      }

      getCartSummary() {
        let summary = this.items
          .map((item) => {
            let price = item.product.price;
            let priceNote = "";
            if (item.product instanceof TV) {
              price *= TV.getSalePrice();
              priceNote = " (Sale Price)";
            }
            return `${item.product.name} x${item.quantity} = $${(price * item.quantity).toFixed(2)}${priceNote}`;
          })
          .join("\n");

        if (this.discountCode) {
          summary += `\nDiscount (${this.discountCode}): -${this.discountAmount * 100}%`;
        }

        return summary;
      }
    }

    const cart = new Cart();
    cart.addItem(new TV("Smart TV", 599.99, 55), 1);
    cart.addItem(new Product("Soundbar", 199.99), 1);
    cart.applyDiscountCode("SAVE20");

    let result = `Advanced Cart with Discounts:\n\n`;
    result += `${cart.getCartSummary()}\n`;
    result += `Total: $${cart.calculateTotal().toFixed(2)}`;

    output.textContent = result;
  },

  // ========================================================================
  // INITIALISATION
  // ========================================================================

  init: function () {
    console.log("Module 3 specific functions loaded");

    document.addEventListener("DOMContentLoaded", function () {
      Module3.basketballGame.updateDisplay();
    });
  },
};

// ============================================================================
// LEGACY FUNCTION WRAPPERS FOR BACKWARD COMPATIBILITY
// ============================================================================

// Question selectors
function selectQuestion() {
  return Module3.selectQuestion();
}

function selectIntermediateQuestion() {
  return Module3.selectIntermediateQuestion();
}

function selectAdvancedQuestion() {
  return Module3.selectAdvancedQuestion();
}

function selectEcommerceExercise() {
  return Module3.selectEcommerceExercise();
}

// Fundamentals questions
function runQuestion1() {
  return Module3.runQuestion1();
}
function runQuestion2() {
  return Module3.runQuestion2();
}
function runQuestion3() {
  return Module3.runQuestion3();
}
function runQuestion4() {
  return Module3.runQuestion4();
}
function runQuestion5() {
  return Module3.runQuestion5();
}
function runQuestion6() {
  return Module3.runQuestion6();
}
function runQuestion7() {
  return Module3.runQuestion7();
}
function runQuestion8() {
  return Module3.runQuestion8();
}
function runQuestion9() {
  return Module3.runQuestion9();
}
function runQuestion10() {
  return Module3.runQuestion10();
}

// Intermediate questions
function runIntermediateQuestion1() {
  return Module3.runIntermediateQuestion1();
}
function runIntermediateQuestion2() {
  return Module3.runIntermediateQuestion2();
}
function runIntermediateQuestion3() {
  return Module3.runIntermediateQuestion3();
}
function runIntermediateQuestion4() {
  return Module3.runIntermediateQuestion4();
}
function runIntermediateQuestion5() {
  return Module3.runIntermediateQuestion5();
}
function runIntermediateQuestion6() {
  return Module3.runIntermediateQuestion6();
}
function runIntermediateQuestion7() {
  return Module3.runIntermediateQuestion7();
}
function runIntermediateQuestion8() {
  return Module3.runIntermediateQuestion8();
}
function runIntermediateQuestion9() {
  return Module3.runIntermediateQuestion9();
}
function runIntermediateQuestion10() {
  return Module3.runIntermediateQuestion10();
}

// Advanced questions
function runAdvancedQuestion1() {
  return Module3.runAdvancedQuestion1();
}
function runAdvancedQuestion2() {
  return Module3.runAdvancedQuestion2();
}
function runAdvancedQuestion3() {
  return Module3.runAdvancedQuestion3();
}
function runAdvancedQuestion4() {
  return Module3.runAdvancedQuestion4();
}
function runAdvancedQuestion5() {
  return Module3.runAdvancedQuestion5();
}
function runAdvancedQuestion6() {
  return Module3.runAdvancedQuestion6();
}
function runAdvancedQuestion7() {
  return Module3.runAdvancedQuestion7();
}
function runAdvancedQuestion8() {
  return Module3.runAdvancedQuestion8();
}
function runAdvancedQuestion9() {
  return Module3.runAdvancedQuestion9();
}
function runAdvancedQuestion10() {
  return Module3.runAdvancedQuestion10();
}

// Ecommerce exercises
function runEcommerceExercise1() {
  return Module3.runEcommerceExercise1();
}
function runEcommerceExercise2() {
  return Module3.runEcommerceExercise2();
}
function runEcommerceExercise3() {
  return Module3.runEcommerceExercise3();
}
function runEcommerceExercise4() {
  return Module3.runEcommerceExercise4();
}
function runEcommerceExercise5() {
  return Module3.runEcommerceExercise5();
}
function runEcommerceExercise6() {
  return Module3.runEcommerceExercise6();
}
function runEcommerceExercise7() {
  return Module3.runEcommerceExercise7();
}
function runEcommerceExercise8() {
  return Module3.runEcommerceExercise8();
}

// Basketball game object reference
const basketballGame = Module3.basketballGame;

// ============================================================================
// AUTO-INITIALISATION
// ============================================================================

// Initialise Module 3 when loaded
Module3.init();

// Make globally available
window.Module3 = Module3;

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = Module3;
}
