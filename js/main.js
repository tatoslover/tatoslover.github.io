document.addEventListener("DOMContentLoaded", function () {
  initTheme();
});

function initTheme() {
  const saved = localStorage.getItem("theme") || "dark";
  applyTheme(saved, false);

  document.getElementById("theme-toggle").addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    applyTheme(next, true);
  });
}

function applyTheme(theme, animate) {
  const html = document.documentElement;

  if (animate) {
    html.style.transition = "background-color 0.3s ease";
  }

  html.setAttribute("data-theme", theme);

  const toggle = document.getElementById("theme-toggle");
  if (toggle) toggle.textContent = theme === "dark" ? "☀" : "☾";

  updateSvgColors(theme);
}

function updateSvgColors(theme) {
  const svgShields = document.querySelectorAll(".svg-shield:not(.academic-logo)");
  const filter = theme === "dark"
    ? "brightness(1.2) contrast(0.8) invert(0.2)"
    : "brightness(0.7) contrast(1.1)";
  svgShields.forEach((svg) => { svg.style.filter = filter; });
}
