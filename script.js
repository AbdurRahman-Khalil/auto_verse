// 1. Active Link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        // Remove 'active' class from all links
        navLinks.forEach(l => l.classList.remove("active"));

        // Add 'active' class to the clicked link
        link.classList.add("active");
    });
});

// 1.1. To dynamically update the active link based on the section the user is currently viewing (e.g., #home, #about)
const sections = document.querySelectorAll("section"); // Target sections with IDs like #home, #about

// To remove active class from all links
const removeActiveClasses = () => {
    navLinks.forEach(link => link.classList.remove("active"));
};

// To add active class to the link that matches the given id
const setActiveLink = (id) => {
    removeActiveClasses();
    const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (activeLink) activeLink.classList.add("active");
};

// Intersection Observer to detect which section is in the viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id; // Get the ID of the section
            setActiveLink(sectionId); // Set the corresponding link to active

            // Update the URL hash
            window.history.pushState(null, null, `#${sectionId}`);
        }
    });
}, {
    threshold: 0.6 // Adjust threshold for when a section is considered "visible"
});

// Observe each section
sections.forEach(section => observer.observe(section));


// -------------------------------------------------------------------
// 2. Scroll to the top
const scrollTopBtn = document.getElementById("scrollTopBtn");

// Show the button when the user scrolls down
const handleScrollTopBtn = () => {
    if (window.scrollY > 185) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
};

// Scroll to the top when the button is clicked
scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

window.addEventListener("scroll", handleScrollTopBtn);


// --------------------------------------------------------------------
// 3. Hamburger Menu Open Close
const hamburgerOpen = document.getElementById("hamburgerOpen");
const hamburgerClose = document.getElementById("hamburgerClose");
const menu = document.querySelector(".nav-links");

// To open menu
hamburgerOpen.addEventListener("click", () => {
    menu.classList.add("open");
});

// To close menu
hamburgerClose.addEventListener("click", () => {
    menu.classList.remove("open");
});

// Closing the menu when clicking outside of it
document.addEventListener("click", (event) => {
    const isClickInside = menu.contains(event.target) || hamburgerOpen.contains(event.target);
    if (!isClickInside) {
        menu.classList.remove("open");
    }
});