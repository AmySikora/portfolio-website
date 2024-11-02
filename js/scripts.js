$(document).ready(function() {
    $('.progress').each(function() {
        $(this).animate({
            width: $(this).data('percentage') + '%'
        }, 1000);
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
