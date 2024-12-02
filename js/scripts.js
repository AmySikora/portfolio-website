document.addEventListener("DOMContentLoaded", () => {
    const progressBars = document.querySelectorAll(".progress-bar");

    progressBars.forEach(bar => {
        const percentage = bar.getAttribute("data-percentage");
        bar.style.width = `${percentage}%`;
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".navigation-list__item");

    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href").split("/").pop();
        const currentPath = window.location.pathname.split("/").pop() || "index.html";

        if (linkPath === currentPath) {
            link.classList.add("navigation-list__item--active");
        } else {
            link.classList.remove("navigation-list__item--active");
        }
    });
});

document.querySelectorAll('.toggle-details').forEach((button) => {
    button.addEventListener('click', () => {
      const details = button.nextElementSibling;
      const isVisible = details.style.display === 'block';
      details.style.display = isVisible ? 'none' : 'block';
      button.textContent = isVisible ? 'More Details' : 'Hide Details';
    });
  });
  