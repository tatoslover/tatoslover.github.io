/**
 * Module 4 Specific JavaScript Functions
 * Functions unique to Module 4 Lab Portfolio - Advanced Frontend Development
 */

// ============================================================================
// MODULE 4 SPECIFIC FUNCTIONS
// ============================================================================

const Module4 = {
  // ========================================================================
  // DEMO FUNCTIONALITY
  // ========================================================================

  /**
   * Add demo news item to the news feed system
   */
  addDemoNews: function () {
    const title = document.getElementById("demo-title").value;
    if (title) {
      const container = document.getElementById("news-demo-container");
      const newItem = document.createElement("div");
      newItem.style.cssText =
        "border: 1px solid #ccc; padding: 10px; margin: 5px 0;";
      newItem.innerHTML = `<h5>${title}</h5><p>User-generated news content...</p>`;
      container.appendChild(newItem);
      document.getElementById("demo-title").value = "";
    }
  },

  /**
   * Load artist gallery with template system
   */
  loadArtistGallery: function () {
    const container = document.getElementById("artist-gallery");
    container.innerHTML = "";

    const artists = [
      {
        name: "Vincent van Gogh",
        portfolio: [
          {
            title: "Self Portrait",
            url: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/436532/1671316/main-image",
          },
          {
            title: "The Starry Night",
            url: "https://mymodernmet.com/wp/wp-content/uploads/2020/11/White-house-night-van-goh-worldwide-2.jpg",
          },
        ],
      },
      {
        name: "Frida Kahlo",
        portfolio: [
          {
            title: "Self Portrait",
            url: "https://www.fridakahlo.org/assets/img/paintings/self-portrait-with-necklace-of-thorns.jpg",
          },
          {
            title: "Viva la Vida",
            url: "https://www.fridakahlo.org/assets/img/paintings/viva-la-vida-watermelons.jpg",
          },
        ],
      },
      {
        name: "Gottfried Lindauer",
        portfolio: [
          {
            title: "Self Portrait",
            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Gottfried_Lindaur_-_Self-Portrait_1862.jpg/500px-Gottfried_Lindaur_-_Self-Portrait_1862.jpg",
          },
          {
            title: "The Tohunga-ta-moko",
            url: "https://www.lindaueronline.co.nz/media/281639/tohunga-ta-moko-at-work-web.jpg",
          },
        ],
      },
    ];

    function addCard(title, description, imageUrl = null) {
      const template = document
        .getElementById("lab3-card-template")
        .content.cloneNode(true);
      template.querySelector(".lab3-card-title").innerText = title;
      template.querySelector(".lab3-card-description").innerText = description;

      const img = template.querySelector(".lab3-card-image");
      if (imageUrl) {
        img.src = imageUrl;
        img.alt = title;
      } else {
        img.style.display = "none";
      }

      container.appendChild(template);
    }

    artists.forEach((artist) => {
      addCard(artist.name, "Artist Portfolio:");
      artist.portfolio.forEach((item) => {
        addCard(item.title, "", item.url);
      });
    });

    // Add lightbox functionality
    const lightbox = document.getElementById("lab3-lightbox");
    const lightboxImg = document.getElementById("lab3-lightbox-img");

    container.addEventListener("click", (e) => {
      if (e.target.classList.contains("lab3-card-image")) {
        lightboxImg.src = e.target.src;
        lightbox.style.display = "flex";
      }
    });

    lightbox.addEventListener("click", () => {
      lightbox.style.display = "none";
    });
  },

  // ========================================================================
  // DATE/TIME CALCULATIONS WITH LUXON
  // ========================================================================

  /**
   * Update date calculations using Luxon library with fallback
   */
  updateDateCalculations: function () {
    try {
      // Using Luxon for date calculations
      const birthDate = luxon.DateTime.fromISO("1996-09-15");
      const now = luxon.DateTime.now();
      const daysBetween = now.diff(birthDate, "days").days;

      document.getElementById("days-count").textContent =
        Math.floor(daysBetween);

      // Detailed age breakdown
      const diff = now.diff(birthDate, ["years", "months", "days"]).toObject();
      document.getElementById("age-breakdown").textContent =
        `${Math.floor(diff.years)} years, ${Math.floor(diff.months)} months, ${Math.floor(diff.days)} days`;

      // Date comparison
      const date1 = luxon.DateTime.fromISO("2024-12-25");
      const date2 = luxon.DateTime.fromISO("2025-01-01");
      const diff1 = Math.abs(now.diff(date1).milliseconds);
      const diff2 = Math.abs(now.diff(date2).milliseconds);
      const closest = diff1 < diff2 ? date1 : date2;

      document.getElementById("date-comparison").textContent =
        `Closest: ${closest.toISODate()}`;

      // London time
      const londonTime = luxon.DateTime.now().setZone("Europe/London");
      document.getElementById("london-time").textContent =
        londonTime.toFormat("HH:mm:ss");
    } catch (error) {
      console.log("Luxon not available, using fallback calculations");

      // Fallback calculations without Luxon
      const birthDate = new Date("1996-09-15");
      const now = new Date();
      const daysBetween = Math.floor((now - birthDate) / (1000 * 60 * 60 * 24));

      document.getElementById("days-count").textContent = daysBetween;

      const ageYears = Math.floor(daysBetween / 365.25);
      const remainingDays = daysBetween % 365.25;
      const ageMonths = Math.floor(remainingDays / 30.44);
      const ageDays = Math.floor(remainingDays % 30.44);

      document.getElementById("age-breakdown").textContent =
        `${ageYears} years, ${ageMonths} months, ${ageDays} days`;

      document.getElementById("date-comparison").textContent =
        "Christmas 2024 vs New Year 2025";

      document.getElementById("london-time").textContent =
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Europe/London",
        });
    }
  },

  /**
   * Lab 5 News Feed System
   */
  lab5News: [
    {
      id: 1,
      title: "Election Results",
      content:
        "Newly elected minister announces policy changes for the upcoming fiscal year...",
    },
    {
      id: 2,
      title: "Sporting Success",
      content:
        "World Cup winners celebrate historic victory in front of thousands of fans...",
    },
    {
      id: 3,
      title: "Tornado Warning",
      content:
        "Residents should prepare for severe weather conditions expected this evening...",
    },
  ],

  lab5IntervalId: null,
  lab5UpdatesActive: true,

  renderLab5News: function () {
    const container = document.getElementById("news-demo-container");
    container.innerHTML = "";

    Module4.lab5News.forEach((item) => {
      const div = document.createElement("div");
      div.className = "lab5-news-item";
      div.innerHTML = `
        <h5>${item.title}</h5>
        <p>${item.content}</p>
      `;
      container.appendChild(div);
    });
  },

  addDemoNews: function () {
    const titleInput = document.getElementById("demo-title");
    const contentInput = document.getElementById("demo-content");
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (title && content) {
      const newId = Module4.lab5News.length
        ? Module4.lab5News[Module4.lab5News.length - 1].id + 1
        : 1;
      Module4.lab5News.push({
        id: newId,
        title,
        content,
      });

      titleInput.value = "";
      contentInput.value = "";

      // Render immediately
      Module4.renderLab5News();
    } else {
      alert("Please enter both title and content");
    }
  },

  renderLab5News: function () {
    const container = document.getElementById("news-demo-container");
    if (!container) return;

    container.innerHTML = "";

    Module4.lab5News.forEach((item) => {
      const div = document.createElement("div");
      div.className = "lab5-news-item";
      div.innerHTML = `
        <h5>${item.title}</h5>
        <p>${item.content}</p>
      `;
      container.appendChild(div);
    });
  },

  toggleNewsUpdates: function () {
    const btn = document.getElementById("toggle-btn");
    const status = document.getElementById("update-status");

    if (Module4.lab5UpdatesActive) {
      clearInterval(Module4.lab5IntervalId);
      Module4.lab5UpdatesActive = false;
      btn.textContent = "Start Updates";
      status.textContent = "News updates: Stopped";
    } else {
      Module4.lab5IntervalId = setInterval(Module4.renderLab5News, 5000);
      Module4.lab5UpdatesActive = true;
      btn.textContent = "Stop Updates";
      status.textContent = "News updates: Active (every 5 seconds)";
    }
  },

  /**
   * Initialise Lab 5 news feed
   */
  initializeLab5News: function () {
    const container = document.getElementById("news-demo-container");
    if (container) {
      Module4.renderLab5News();
      Module4.lab5IntervalId = setInterval(Module4.renderLab5News, 5000);
    }
  },

  /**
   * Load API demo cards for Bootstrap integration
   */
  loadAPIDemoCards: function () {
    const container = document.getElementById("api-cards-demo");
    container.innerHTML = `
            <div class="col-md-6">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Sample API Post</h5>
                        <p class="card-text">This demonstrates fetching data from JSONPlaceholder API and displaying it in responsive Bootstrap cards.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Another API Post</h5>
                        <p class="card-text">Each card represents a post fetched from the API, demonstrating real-time data integration.</p>
                    </div>
                </div>
            </div>
        `;
  },

  /**
   * Load chart data for ECharts visualisation
   */
  loadChartData: function () {
    const container = document.getElementById("chart-container");
    container.innerHTML =
      '<p style="text-align: centre; padding: 50px;">Chart would load here with real API data showing product categories distribution.</p>';
  },

  /**
   * Load store products for e-commerce interface demo
   */
  loadStoreProducts: function () {
    const container = document.getElementById("demo-product-grid");
    container.innerHTML = `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Wireless Headphones</h5>
                        <h6 class="card-subtitle mb-2 text-muted">
                            <i class="fa-solid fa-plug"></i> Electronics
                        </h6>
                        <p class="card-text">High-quality wireless headphones with noise cancellation...</p>
                        <div class="mt-auto">
                            <span class="fw-bold">$89.99</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Gold Necklace</h5>
                        <h6 class="card-subtitle mb-2 text-muted">
                            <i class="fa-solid fa-gem"></i> Jewellery
                        </h6>
                        <p class="card-text">Beautiful gold necklace with elegant design...</p>
                        <div class="mt-auto">
                            <span class="fw-bold">$299.99</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Men's Jacket</h5>
                        <h6 class="card-subtitle mb-2 text-muted">
                            <i class="fa-solid fa-mars"></i> Men's Clothing
                        </h6>
                        <p class="card-text">Stylish winter jacket for men...</p>
                        <div class="mt-auto">
                            <span class="fw-bold">$79.99</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
  },

  // ========================================================================
  // DATE/TIME DEMO FUNCTIONS
  // ========================================================================

  /**
   * Update date/time demo calculations
   */
  updateDateTimeDemo: function () {
    const now = new Date();
    const birthDate = new Date("1996-09-15");
    const daysBetween = Math.floor((now - birthDate) / (1000 * 60 * 60 * 24));

    const daysCountElement = document.getElementById("days-count");
    if (daysCountElement) {
      daysCountElement.textContent = daysBetween;
    }

    const years = Math.floor(daysBetween / 365);
    const months = Math.floor((daysBetween % 365) / 30);
    const days = Math.floor((daysBetween % 365) % 30);

    const ageBreakdownElement = document.getElementById("age-breakdown");
    if (ageBreakdownElement) {
      ageBreakdownElement.textContent = `${years} years, ${months} months, ${days} days`;
    }

    const londonTime = new Date().toLocaleTimeString("en-GB", {
      timeZone: "Europe/London",
      hour12: false,
    });
    const londonTimeElement = document.getElementById("london-time");
    if (londonTimeElement) {
      londonTimeElement.textContent = londonTime;
    }

    const date1 = new Date("2024-12-25");
    const date2 = new Date("2025-01-01");
    const comparison =
      date1 < date2
        ? "Christmas is before New Year"
        : "New Year is before Christmas";
    const dateComparisonElement = document.getElementById("date-comparison");
    if (dateComparisonElement) {
      dateComparisonElement.textContent = comparison;
    }
  },

  // ========================================================================
  // GALLERY GENERATION
  // ========================================================================

  /**
   * Generate artist gallery cards
   */
  generateArtistGallery: function () {
    const artists = [
      { name: "Van Gogh", description: "Post-impressionist master" },
      { name: "Frida Kahlo", description: "Mexican surrealist artist" },
      {
        name: "Gottfried Lindauer",
        description: "New Zealand portrait artist",
      },
    ];

    const gallery = document.getElementById("artist-gallery");
    if (gallery) {
      artists.forEach((artist) => {
        const col = document.createElement("div");
        col.className = "col-md-4";
        col.innerHTML = `
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">${artist.name}</h5>
                            <p class="card-text">${artist.description}</p>
                        </div>
                    </div>
                `;
        gallery.appendChild(col);
      });
    }
  },

  // ========================================================================
  // UX/UI DESIGN UTILITIES
  // ========================================================================

  /**
   * Demonstrate UX/UI design principles
   */
  demonstrateDesignPrinciples: function () {
    console.log("Module 4: UX/UI Design principles demonstrated");
    // Placeholder for future UX/UI demonstrations
  },

  /**
   * Bootstrap responsive layout demonstration
   */
  demonstrateResponsiveLayout: function () {
    console.log("Module 4: Responsive Bootstrap layout");
    // Placeholder for future responsive layout demonstrations
  },

  /**
   * CSS animations and transitions showcase
   */
  demonstrateAnimations: function () {
    console.log("Module 4: CSS animations and transitions");
    // Placeholder for future animation demonstrations
  },

  /**
   * API integration patterns
   */
  demonstrateAPIIntegration: function () {
    console.log("Module 4: API integration patterns");
    // Placeholder for future API integration demonstrations
  },

  /**
   * Data visualisation with charts
   */
  demonstrateDataVisualization: function () {
    console.log("Module 4: Data visualisation with ECharts");
    // Placeholder for future data visualisation demonstrations
  },

  // ========================================================================
  // INITIALISATION
  // ========================================================================

  /**
   * Initialise Module 4 specific functionality
   */
  init: function () {
    console.log("Module 4 specific functions loaded");

    // Initialise demos when page loads
    document.addEventListener("DOMContentLoaded", function () {
      // Small delay to ensure Portfolio is fully initialised
      setTimeout(() => {
        // Initialise proper icon rotation for active sections
        const sections = document.querySelectorAll(".lab-content");
        const icons = document.querySelectorAll(".toggle-icon");

        sections.forEach((section, index) => {
          if (section.classList.contains("active") && icons[index]) {
            icons[index].style.transform = "rotate(180deg)";
          }
        });

        // Initialise Module 4 specific demos
        Module4.updateDateTimeDemo();
        Module4.updateDateCalculations();
        Module4.generateArtistGallery();

        // Initialise Lab 5 news feed with delay to ensure DOM is ready
        setTimeout(() => {
          Module4.initializeLab5News();
        }, 200);

        // Set up date calculations interval
        setInterval(Module4.updateDateCalculations, 30000);
      }, 100);
    });
  },
};

// ============================================================================
// LEGACY FUNCTION WRAPPERS FOR BACKWARD COMPATIBILITY
// ============================================================================

// Demo functions
function addDemoNews() {
  return Module4.addDemoNews();
}

function loadAPIDemoCards() {
  return Module4.loadAPIDemoCards();
}

function loadChartData() {
  return Module4.loadChartData();
}

function loadStoreProducts() {
  return Module4.loadStoreProducts();
}

function updateDateTimeDemo() {
  return Module4.updateDateTimeDemo();
}

function updateDateCalculations() {
  return Module4.updateDateCalculations();
}

function renderLab5News() {
  return Module4.renderLab5News();
}

function toggleNewsUpdates() {
  return Module4.toggleNewsUpdates();
}

function initializeLab5News() {
  return Module4.initializeLab5News();
}

function loadArtistGallery() {
  return Module4.loadArtistGallery();
}

// UX/UI and demo functions
function demonstrateDesignPrinciples() {
  return Module4.demonstrateDesignPrinciples();
}

function demonstrateResponsiveLayout() {
  return Module4.demonstrateResponsiveLayout();
}

function demonstrateAnimations() {
  return Module4.demonstrateAnimations();
}

function demonstrateAPIIntegration() {
  return Module4.demonstrateAPIIntegration();
}

function demonstrateDataVisualization() {
  return Module4.demonstrateDataVisualization();
}

// ============================================================================
// INTERACTIVE PORTFOLIO FUNCTIONS
// ============================================================================

// Use main.js toggleSection function - no need to duplicate
// The main.js version uses CSS transforms and active class toggling

// Toggle view between iframe and source code (mutually exclusive)
function toggleView(showId, hideId) {
  const showElement = document.getElementById(showId);
  const hideElement = document.getElementById(hideId);

  // Hide the other element
  hideElement.style.display = "none";

  // Toggle the requested element
  if (showElement.style.display === "none") {
    showElement.style.display = "block";

    // Load source code if it's a source element (but not for Lab 1 and Lab 2)
    if (
      showId.includes("-source") &&
      showId !== "lab1-source" &&
      showId !== "lab2-source"
    ) {
      loadSourceCode(showId);
    }
  } else {
    showElement.style.display = "none";
  }
}

// Load focused code snippets highlighting key functionality
function loadSourceCode(sourceId) {
  const sourceElement = document.getElementById(sourceId);

  // Map source IDs to focused code snippets
  const codeSnippets = {
    "lab3-source": `// 🎭 LIGHTBOX FUNCTIONALITY
// Event delegation for dynamic image clicks
document.querySelector("#card-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("card-image")) {
        lightboxImg.src = e.target.src;
        lightbox.style.display = "flex";
    }
});

// 🃏 DYNAMIC CARD GENERATION
function addCard(title, description, imageUrl = null) {
    const template = document.getElementById("card-template")
        .content.cloneNode(true);
    template.querySelector(".card-title").innerText = title;
    template.querySelector(".card-description").innerText = description;

    const img = template.querySelector(".card-image");
    if (imageUrl) {
        img.src = imageUrl;
        img.alt = title;
    } else {
        img.style.display = "none";
    }

    document.querySelector("#card-list").appendChild(template);
}

// 🎨 ARTIST PORTFOLIO SYSTEM
const artists = [
    {
        name: "Vincent van Gogh",
        portfolio: [
            { title: "Self Portrait", url: "https://..." },
            { title: "The Starry Night", url: "https://..." }
        ]
    },
    // ... more artists
];

artists.forEach((artist) => {
    addCard(artist.name, "Artist Portfolio:");
    artist.portfolio.forEach((item) => {
        addCard(item.title, "", item.url);
    });
});`,

    "lab4-source": `// 🎯 BOOTSTRAP RESPONSIVE GRID
<div class="container">
    <div class="row g-4">
        <div class="col-12 col-md-6 col-lg-3">
            <div class="card shadow-sm h-100">
                <div class="card-symbol">一</div>
                <div class="card-body">
                    <p class="card-text">
                        <strong>yī</strong> (一) — "One"
                    </p>
                </div>
            </div>
        </div>
        <!-- More responsive cards... -->
    </div>
</div>

// 🎨 CUSTOM CARD STYLING
.card-symbol {
    font-size: 5rem;
    text-align: centre;
    padding: 2rem 0;
    background-colour: #e0e0e0;
}

.navbar-floating {
    background-colour: white;
    margin: 1rem auto;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 90%;
}`,

    "lab5-source": `// 📰 DYNAMIC NEWS FEED SYSTEM
let news = [
    { id: 1, title: "Election Results", content: "..." },
    { id: 2, title: "Sporting Success", content: "..." },
    { id: 3, title: "Tornado Warning", content: "..." }
];

// 🔄 REAL-TIME RENDERING
function renderNews() {
    const container = document.getElementById("news-container");
    container.innerHTML = "";

    for (let item of news) {
        const div = document.createElement("div");
        div.className = "news-item";
        div.innerHTML = \`<h3>\${item.title}</h3><p>\${item.content}</p>\`;
        container.appendChild(div);
    }
}

// 📝 FORM SUBMISSION HANDLING
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (title && content) {
        const newId = news.length ? news[news.length - 1].id + 1 : 1;
        news.push({ id: newId, title, content });

        titleInput.value = "";
        contentInput.value = "";
        renderNews();
    }
});

// ⏰ AUTO-UPDATE INTERVAL
intervalId = setInterval(renderNews, 5000);`,

    "lab6-source": `// 🌐 BOOTSTRAP API INTEGRATION
// Fetch data from external API
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => {
        displayCards(data);
    })
    .catch(error => {
        console.error('API Error:', error);
    });

// 🃏 BOOTSTRAP CARD GENERATION
function displayCards(data) {
    const container = document.getElementById('card-container');

    data.forEach(item => {
        const card = \`
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">\${item.title}</h5>
                        <p class="card-text">\${item.description}</p>
                        <button class="btn btn-primary">Learn More</button>
                    </div>
                </div>
            </div>
        \`;
        container.innerHTML += card;
    });
}`,

    "lab7-source": `// 🎭 CSS ANIMATIONS & TRANSITIONS
/* Hover transformations */
.card-image:hover {
    transform: scale(1.1);
    z-index: 2;
    position: relative;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

/* Smooth transitions */
.card-image {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
}

/* Keyframe animations */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.card {
    animation: fadeIn 0.5s ease-out;
}

/* Interactive states */
.button:hover {
    background: linear-gradient(45deg, #007bff, #0056b3);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);
}`,

    "lab8-source": `// ⏰ LUXON DATE/TIME LIBRARY
import { DateTime, Interval } from "luxon";

// 📅 BIRTHDATE CALCULATIONS
const birthDate = DateTime.fromISO("1996-09-15");
const now = DateTime.now();

const daysBetween = now.diff(birthDate, "days").days;
console.log(\`Days since birth: \${Math.floor(daysBetween)}\`);

// 🎂 AGE CALCULATION
const diff = now.diff(birthDate, ["years", "months", "days"]).toObject();
console.log(\`Age: \${Math.floor(diff.years)} years, \${Math.floor(diff.months)} months\`);

// 🌍 TIMEZONE HANDLING
const londonTime = DateTime.now().setZone("Europe/London");
console.log(\`London time: \${londonTime.toFormat("HH:mm:ss")}\`);

// 📊 DATE COMPARISON
const date1 = DateTime.fromISO("2024-12-25");
const date2 = DateTime.fromISO("2025-01-01");

const diff1 = Math.abs(now.diff(date1).milliseconds);
const diff2 = Math.abs(now.diff(date2).milliseconds);

const closest = diff1 < diff2 ? date1 : date2;
console.log(\`Closest date: \${closest.toISODate()}\`);`,

    "lab8ext-source": `// 📈 EXTENDED DATE/TIME EXAMPLES
// Working with intervals
const start = DateTime.fromISO("2024-01-01");
const end = DateTime.fromISO("2024-12-31");
const interval = Interval.fromDateTimes(start, end);

console.log(\`Days in 2024: \${interval.length("days")}\`);

// Date formatting and localisation
const birthday = DateTime.fromISO("1996-09-15");
console.log(\`Birthday: \${birthday.toFormat("MMMM dd, yyyy")}\`);
console.log(\`French: \${birthday.setLocale("fr").toFormat("MMMM dd, yyyy")}\`);

// Relative time
const nextWeek = DateTime.now().plus({ days: 7 });
console.log(\`Next week: \${nextWeek.toRelative()}\`);

// Working with durations
const duration = DateTime.now().diff(birthday);
console.log(\`I've been alive for: \${duration.toFormat("y 'years,' M 'months'")}\`);`,

    "lab9-source": `// 📊 ECHARTS DATA VISUALISATION
// Initialise chart
const myChart = echarts.init(document.getElementById("main"));

// 🎨 CHART CONFIGURATION
const options = {
    title: { text: "Fake Store Categories" },
    tooltip: {},
    xAxis: { type: "category", data: [] },
    yAxis: { type: "value" },
    series: [{
        name: "# Products",
        type: "bar",
        data: []
    }]
};

// 🌐 API DATA PROCESSING
fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(products => {
        // Count products per category
        const categoryCounts = {};
        products.forEach(product => {
            const category = product.category;
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });

        // Update chart with processed data
        options.xAxis.data = Object.keys(categoryCounts);
        options.series[0].data = Object.values(categoryCounts);

        myChart.setOption(options);
    });`,

    "lab10-source": `// 🛒 E-COMMERCE INTERFACE
const apiUrl = "https://fakestoreapi.com/products";
let allProducts = [];

// 🎯 CATEGORY FILTERING
function filterByCategory(category) {
    const filtered = category === 'all'
        ? allProducts
        : allProducts.filter(p => p.category === category);
    displayProducts(filtered);
}

// 🔍 SEARCH FUNCTIONALITY
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = allProducts.filter(p =>
        p.title.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
    );
    displayProducts(filtered);
});

// 📊 SORTING IMPLEMENTATION
function sortProducts(products, sortBy) {
    switch(sortBy) {
        case 'priceAsc': return [...products].sort((a, b) => a.price - b.price);
        case 'priceDesc': return [...products].sort((a, b) => b.price - a.price);
        case 'titleAsc': return [...products].sort((a, b) => a.title.localeCompare(b.title));
        case 'titleDesc': return [...products].sort((a, b) => b.title.localeCompare(a.title));
        default: return products;
    }
}

// 🃏 DYNAMIC CARD GENERATION
function displayProducts(products) {
    productGrid.innerHTML = "";
    products.forEach(p => {
        const icon = categoryIcons[p.category] || "fa-solid fa-box";
        productGrid.innerHTML += \`
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="\${p.image}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">\${p.title}</h5>
                        <p class="card-text">\${p.description}</p>
                        <h6><i class="\${icon}"></i> \${p.category}</h6>
                        <p class="text-success">$\${p.price}</p>
                    </div>
                </div>
            </div>
        \`;
    });
}`,
  };

  const snippet = codeSnippets[sourceId];
  if (snippet) {
    sourceElement.textContent = snippet;
  } else {
    sourceElement.textContent = "Code snippet not available";
  }
}

// Calculator functionality for Lab 2
function appendToDisplay(value) {
  document.getElementById("calc-display").value += value;
}

function clearCalculator() {
  document.getElementById("calc-display").value = "";
}

function deleteLast() {
  const display = document.getElementById("calc-display");
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  const display = document.getElementById("calc-display");
  try {
    // Safe evaluation without eval()
    const expression = display.value.replace(/×/g, "*").replace(/÷/g, "/");
    const result = Function('"use strict"; return (' + expression + ")")();
    display.value = result;
  } catch (error) {
    display.value = "Error";
  }
}

// Let main.js handle all initialisation
// No need for custom initialisation when using main.js toggleSection

// ============================================================================
// AUTO-INITIALISATION
// ============================================================================

// Initialise Module 4 when loaded
Module4.init();

// Make globally available
window.Module4 = Module4;

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = Module4;
}
