$(document).ready(function() {
    $('.progress').each(function() {
        $(this).animate({
            width: $(this).data('percentage') + '%'
        }, 1000);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const pageTitles = {
        "index.html": "Home",
        "about.html": "About Me",
        "work.html": "Work",
        "contact.html": "Contact"
    };
    
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const activePage = pageTitles[currentPath];
    const navLinks = document.querySelectorAll(".navigation-list__item");

    navLinks.forEach(link => {
        if (link.textContent.trim() === activePage) {
            link.classList.add("navigation-list__item--active");
        } else {
            link.classList.remove("navigation-list__item--active");
        }
    });
});
