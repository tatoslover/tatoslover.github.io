/**
 * Content Loader for Portfolio Website
 *
 * A simple, generic script to load JSON content into expandable sections.
 */

document.addEventListener("DOMContentLoaded", function () {
  // Find all expandable sections that need content loaded
  const sections = document.querySelectorAll(
    ".expandable-sections[data-content-file]",
  );

  // Load content for each section
  sections.forEach((section) => {
    const contentFile = section.getAttribute("data-content-file");
    loadContent(section, contentFile);
  });
});

/**
 * Loads content from a JSON file and populates the corresponding section
 * @param {HTMLElement} section - The section element to populate
 * @param {string} filename - The JSON file to load
 */
function loadContent(section, filename) {
  fetch(`content/${filename}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load ${filename}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data && data.categories) {
        renderContent(section, data.categories);
      } else {
        throw new Error("Invalid JSON structure");
      }
    })
    .catch((error) => {
      console.error("Error loading content:", error);
      section.innerHTML = `<p class="error">Failed to load content. Please try again later.</p>`;
    });
}

/**
 * Renders content into the section
 * @param {HTMLElement} section - The section element to populate
 * @param {Array} categories - Array of category objects from JSON
 */
function renderContent(section, categories) {
  // Get the tab and content containers
  const tabsContainer = section.querySelector(".category-tabs");
  const contentContainer = section.querySelector(".content-container");

  // Clear existing content
  tabsContainer.innerHTML = "";
  contentContainer.innerHTML = "";

  // Set initial state - content container is hidden
  contentContainer.style.display = "none";

  // Create tabs and content panels
  categories.forEach((category, index) => {
    // Create tab button
    const button = document.createElement("button");
    button.className = "tab-button";
    button.setAttribute("data-category", category.id);

    // Set tab button text (without emoji)
    button.textContent = category.title;

    tabsContainer.appendChild(button);

    // Create content panel
    const panel = document.createElement("div");
    panel.className = "content-panel";
    panel.id = category.id;

    // Fill panel with content based on what's available in the category
    if (category.skills) {
      renderSkills(panel, category);
    } else if (category.projects) {
      renderProjects(panel, category);
    } else if (category.courses) {
      renderCourses(panel, category);
    } else if (category.qualifications) {
      renderQualifications(panel, category);
    } else if (category.jobs) {
      renderJobs(panel, category);
    } else if (category.interests) {
      renderInterests(panel, category);
    }

    contentContainer.appendChild(panel);
  });

  // Add event listeners to tabs
  addTabEventListeners(section);
}

/**
 * Helper function to create section image
 * @param {string} title - The title for the alt text
 * @param {string} imageSrc - Optional custom image source
 * @param {string} emoji - Optional emoji to display instead of an image
 * @returns {HTMLElement} - The created image container element
 */
function createSectionImage(title, imageSrc = null, emoji = null) {
  const imageContainer = document.createElement("div");
  imageContainer.className = "section-image";

  if (emoji) {
    // Create emoji display instead of image
    const emojiContainer = document.createElement("div");
    emojiContainer.className = "emoji-container";
    emojiContainer.textContent = emoji;
    emojiContainer.setAttribute("role", "img");
    emojiContainer.setAttribute("aria-label", `${title} Icon`);
    imageContainer.appendChild(emojiContainer);
  } else {
    // Create traditional image
    const image = document.createElement("img");
    image.src = imageSrc || "assets/logos/placeholder.svg";
    image.alt = `${title} Icon`;

    // Check if this is an SVG file or specific images that should be treated as shields
    if (
      imageSrc &&
      (imageSrc.toLowerCase().endsWith(".svg") ||
        imageSrc.includes("NZSL.png") ||
        title.includes("Te Ara Atawhai") ||
        title.includes("Master") ||
        title.includes("BSc") ||
        title.includes("Certificate") ||
        title.includes("Degree") ||
        title.includes("New Zealand Sign Language"))
    ) {
      image.classList.add("svg-shield");
    }

    imageContainer.appendChild(image);
  }

  // Make the image container clickable if there's a document link
  if (
    imageContainer.parentElement &&
    imageContainer.parentElement.dataset &&
    imageContainer.parentElement.dataset.documentLink
  ) {
    // Don't make "Coming Soon" documents clickable
    if (
      imageContainer.parentElement.dataset.documentStatus !== "Coming Soon" &&
      imageContainer.parentElement.dataset.documentLink !== "#"
    ) {
      imageContainer.style.cursor = "pointer";

      if (
        imageContainer.parentElement.dataset.documentLink.startsWith("http")
      ) {
        imageContainer.title = "Click to view online profile";
      } else {
        imageContainer.title = "Click to view certificate";
      }

      imageContainer.addEventListener("click", function () {
        window.open(
          imageContainer.parentElement.dataset.documentLink,
          "_blank",
        );
      });
    }
  }

  return imageContainer;
}

/**
 * Helper function to create section link button
 * @param {string} text - Button text
 * @param {string} href - Button link URL
 * @returns {HTMLElement} - The created link container element
 */
function createSectionLink(text = "View Details", href = "#") {
  const linkContainer = document.createElement("div");
  const link = document.createElement("a");
  link.href = href;
  link.className = "section-link";
  link.innerHTML = `<span>${text}</span>`;
  linkContainer.appendChild(link);
  return linkContainer;
}

/**
 * Adds click event listeners to tab buttons
 * @param {HTMLElement} section - The section containing the tabs
 */
function addTabEventListeners(section) {
  const buttons = section.querySelectorAll(".tab-button");
  const contentContainer = section.querySelector(".content-container");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const categoryId = this.getAttribute("data-category");
      const sectionContainer = this.closest(".expandable-sections");

      // If clicking the same active button, toggle content visibility
      if (this.classList.contains("active")) {
        if (contentContainer.style.display === "block") {
          contentContainer.style.display = "none";
          this.classList.remove("active");
        } else {
          contentContainer.style.display = "block";
        }
        return;
      }

      // Show content container if it was hidden
      if (contentContainer.style.display === "none") {
        contentContainer.style.display = "block";
      }

      // Deactivate all tabs and panels
      sectionContainer.querySelectorAll(".tab-button").forEach((btn) => {
        btn.classList.remove("active");
      });

      sectionContainer.querySelectorAll(".content-panel").forEach((panel) => {
        panel.classList.remove("active");
      });

      // Activate the clicked tab and its panel
      this.classList.add("active");
      const panel = document.getElementById(categoryId);
      if (panel) {
        panel.classList.add("active");
      }
    });
  });
}

/**
 * Renders skills content
 * @param {HTMLElement} panel - The panel to populate
 * @param {Object} category - The category data
 */
function renderSkills(panel, category) {
  const container = document.createElement("div");
  container.className = "main-item";
  container.style.setProperty("--item-index", 0);

  // Add section image with emoji if available
  container.appendChild(
    createSectionImage(category.title, null, category.emoji),
  );

  const title = document.createElement("h3");
  title.textContent = `${category.title} Skills`;
  container.appendChild(title);

  const skillsList = document.createElement("ul");
  category.skills.forEach((skill) => {
    const item = document.createElement("li");
    item.textContent = skill;
    skillsList.appendChild(item);
  });

  container.appendChild(skillsList);

  // Add link button
  container.appendChild(createSectionLink());

  panel.appendChild(container);
}

/**
 * Renders projects content
 * @param {HTMLElement} panel - The panel to populate
 * @param {Object} category - The category data
 */
function renderProjects(panel, category) {
  category.projects.forEach((project, index) => {
    const article = document.createElement("article");
    article.className = "main-item";
    article.style.setProperty("--item-index", index);

    // Store document status in dataset if available
    if (project.documentStatus) {
      article.dataset.documentStatus = project.documentStatus;
    }

    // Add section image or emoji
    article.appendChild(createSectionImage(project.title, null, project.emoji));

    const title = document.createElement("h3");
    title.textContent = project.title;
    article.appendChild(title);

    const description = document.createElement("p");
    description.textContent = project.description;
    article.appendChild(description);

    if (project.liveDemo || project.sourceCode || project.documents) {
      const links = document.createElement("div");
      links.className = "content-links";

      if (project.liveDemo && project.liveDemo.trim() !== "") {
        const demo = document.createElement("a");

        // Handle Coming Soon status
        if (
          project.documentStatus === "Coming Soon" ||
          project.liveDemo === "#"
        ) {
          demo.href = "#";
          demo.className = "content-link demo-link disabled-link";
          demo.innerHTML = "<span>Coming Soon</span>";
          demo.onclick = function (e) {
            e.preventDefault();
          };
        } else {
          demo.href = project.liveDemo;
          demo.className = "content-link demo-link";
          demo.innerHTML = "<span>Live Demo</span>";
          demo.target = "_blank";
        }

        links.appendChild(demo);
      }

      if (project.sourceCode && project.sourceCode.trim() !== "") {
        const source = document.createElement("a");
        source.href = project.sourceCode;
        source.className = "content-link code-link";
        source.innerHTML = "<span>Source Code</span>";
        source.target = "_blank";
        links.appendChild(source);
      }

      // Add document links if available
      if (project.documents && project.documents.length > 0) {
        project.documents.forEach((doc) => {
          if (doc.link && doc.title) {
            const docLink = document.createElement("a");
            docLink.href = doc.link;
            docLink.className = "content-link doc-link";
            docLink.innerHTML = `<span>${doc.title}</span>`;
            docLink.target = "_blank";
            links.appendChild(docLink);
          }
        });
      }

      // Only append links if we actually added any
      if (links.children.length > 0) {
        article.appendChild(links);
      }
    } else {
      // Add standard link button
      const linkContainer = document.createElement("div");
      linkContainer.className = "content-links";
      linkContainer.appendChild(createSectionLink().firstChild);
      article.appendChild(linkContainer);
    }

    panel.appendChild(article);
  });
}

/**
 * Renders courses content
 * @param {HTMLElement} panel - The panel to populate
 * @param {Object} category - The category data
 */
function renderCourses(panel, category) {
  category.courses.forEach((course, index) => {
    const article = document.createElement("article");
    article.className = "main-item";
    article.style.setProperty("--item-index", index);

    // Store document status in dataset if available
    if (course.documentStatus) {
      article.dataset.documentStatus = course.documentStatus;
    }

    // Only add image for IOD courses, and omit for BSc and MADS
    if (category.id === "iod-courses") {
      // For IOD: No images, but keep the spacing
      const spacer = document.createElement("div");
      spacer.className = "section-image-spacer";
      spacer.style.height = "20px";
      article.appendChild(spacer);
    }
    // No images for BSc and MADS (do nothing)

    const title = document.createElement("h3");
    title.textContent = course.title;
    article.appendChild(title);

    // No institution display

    const description = document.createElement("p");
    description.textContent = course.description;
    article.appendChild(description);

    // Only add buttons for IOD courses
    if (category.id === "iod-courses") {
      // If there's a portfolio link, add it
      if (course.portfolioLink && course.portfolioLink.trim() !== "") {
        const linkContainer = document.createElement("div");
        linkContainer.className = "content-links";

        const link = document.createElement("a");

        // Handle Coming Soon status
        if (
          course.documentStatus === "Coming Soon" ||
          course.portfolioLink === "#"
        ) {
          link.href = "#";
          link.innerHTML = "<span>Coming Soon</span>";
          link.className = "content-link portfolio-link disabled-link";
          link.onclick = function (e) {
            e.preventDefault();
          };
        } else {
          link.href = course.portfolioLink;
          link.innerHTML = "<span>View Portfolio</span>";
          link.target = "_blank";
          link.className = "content-link portfolio-link";
        }

        linkContainer.appendChild(link);
        article.appendChild(linkContainer);
      } else {
        // Add standard link button for IOD
        const linkContainer = document.createElement("div");
        linkContainer.className = "content-links";
        linkContainer.appendChild(createSectionLink().firstChild);
        article.appendChild(linkContainer);
      }
    }
    // No buttons for BSc and MADS (do nothing)

    panel.appendChild(article);
  });
}

/**
 * Renders qualifications content
 * @param {HTMLElement} panel - The panel to populate
 * @param {Object} category - The category data
 */
function renderQualifications(panel, category) {
  category.qualifications.forEach((qualification, index) => {
    const article = document.createElement("article");
    article.className = "main-item";
    article.style.setProperty("--item-index", index);

    // Store document link and status in dataset if available
    if (qualification.documentLink) {
      article.dataset.documentLink = qualification.documentLink;
    }
    if (qualification.documentStatus) {
      article.dataset.documentStatus = qualification.documentStatus;
    }

    // Add section image with special handling for academic qualifications
    const sectionImage = createSectionImage(
      qualification.title,
      qualification.logo,
    );

    // Add a special class if this is in the academic-degrees category or specific qualifications
    if (
      category.id === "academic-degrees" ||
      qualification.title.includes("Te Ara Atawhai") ||
      qualification.title.includes("New Zealand Sign Language") ||
      (qualification.logo && qualification.logo.toLowerCase().endsWith(".svg"))
    ) {
      sectionImage.classList.add("academic-logo-container");
    }

    article.appendChild(sectionImage);

    // Title and institution
    const title = document.createElement("h3");
    title.textContent = qualification.title;
    article.appendChild(title);

    const institution = document.createElement("p");
    institution.textContent = `${qualification.institution} (${qualification.date})`;
    institution.className = "main-details";
    article.appendChild(institution);

    // Description
    const description = document.createElement("p");
    description.textContent = qualification.description;
    description.className = "main-description";
    article.appendChild(description);

    // Add link button with document link if available
    if (qualification.documentLink) {
      const linkContainer = document.createElement("div");
      const link = document.createElement("a");

      // Handle special cases
      if (qualification.documentStatus === "Coming Soon") {
        link.href = "#";
        link.className = "section-link disabled-link";
        link.innerHTML = "<span>Coming Soon</span>";
        link.onclick = function (e) {
          e.preventDefault();
        };
      } else if (qualification.documentLink.startsWith("http")) {
        // External link
        link.href = qualification.documentLink;
        link.className = "section-link external-link";
        link.innerHTML = "<span>View Profile</span>";
        link.target = "_blank";
      } else {
        // Regular document link
        link.href = qualification.documentLink;
        link.className = "section-link";
        link.innerHTML = "<span>View Certificate</span>";
        link.target = "_blank"; // Open in a new tab
      }

      linkContainer.appendChild(link);
      article.appendChild(linkContainer);
    } else {
      article.appendChild(createSectionLink());
    }

    panel.appendChild(article);
  });
}

/**
 * Renders jobs content
 * @param {HTMLElement} panel - The panel to populate
 * @param {Object} category - The category data
 */
function renderJobs(panel, category) {
  // Get the first job from the category since we're using categories as job titles
  if (category.jobs && category.jobs.length > 0) {
    const job = category.jobs[0]; // Each category has only one job

    const article = document.createElement("article");
    article.className = "main-item";

    // Store document status in dataset if available
    if (job.documentStatus) {
      article.dataset.documentStatus = job.documentStatus;
    }

    // Add section image or emoji
    article.appendChild(createSectionImage(job.company, job.logo, job.emoji));

    // Company as the heading
    const company = document.createElement("h3");
    company.textContent = job.company;
    article.appendChild(company);

    // Create combined details
    const jobDetails = document.createElement("p");
    jobDetails.className = "main-details";

    let detailsText = "";
    if (job.location && job.period) {
      detailsText = `${job.location} (${job.period})`;
    } else if (job.location) {
      detailsText = job.location;
    } else if (job.period) {
      detailsText = job.period;
    }

    jobDetails.textContent = detailsText;
    article.appendChild(jobDetails);

    // Add responsibilities if available
    if (job.responsibilities && job.responsibilities.length > 0) {
      const responsibilitiesContainer = document.createElement("div");
      responsibilitiesContainer.className = "main-responsibilities";

      job.responsibilities.forEach((responsibility) => {
        const item = document.createElement("p");
        item.textContent = responsibility;
        item.className = "main-description";
        responsibilitiesContainer.appendChild(item);
      });

      article.appendChild(responsibilitiesContainer);
    }

    // No link button for Employment section

    panel.appendChild(article);
  }
}

/**
 * Renders interests content
 * @param {HTMLElement} panel - The panel to populate
 * @param {Object} category - The category data
 */
function renderInterests(panel, category) {
  category.interests.forEach((interest, index) => {
    const article = document.createElement("article");
    article.className = "main-item";
    article.style.setProperty("--item-index", index);

    // Add section image or emoji based on what's available
    article.appendChild(
      createSectionImage(interest.title, interest.logo, interest.emoji),
    );

    // Title
    const title = document.createElement("h3");
    title.textContent = interest.title;
    article.appendChild(title);

    // Add details if available
    if (interest.details) {
      const details = document.createElement("p");
      details.className = "main-details";
      details.textContent = interest.details;
      article.appendChild(details);
    }

    // Description
    const description = document.createElement("p");
    description.textContent = interest.description;
    description.className = "main-description";
    article.appendChild(description);

    // No link button for Interests section

    panel.appendChild(article);
  });
}
