document.querySelectorAll(".toggle-project").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("data-target");
    const target = document.getElementById(targetId);

    // Toggle visibility
    if (target.style.display === "none" || target.style.display === "") {
      target.style.display = "block";
    } else {
      target.style.display = "none";
    }
  });
});
