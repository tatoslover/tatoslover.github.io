document.addEventListener("DOMContentLoaded", function () {
  const collapsibles = document.querySelectorAll(".collapsible");

  collapsibles.forEach((button) => {
    const content = button.nextElementSibling;
    const label = button.querySelector(".toggle-label");

    // Start with content hidden
    content.style.display = "none";
    label.textContent = "Expand";

    button.addEventListener("click", function () {
      const isVisible = content.style.display === "block";
      content.style.display = isVisible ? "none" : "block";
      label.textContent = isVisible ? "Expand" : "Hide";
    });
  });
});
