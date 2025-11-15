document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".transition-link");

    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const target = this.getAttribute("href");

            // Fade out smoothly
            document.body.classList.add("fade-out");

            setTimeout(() => {
                window.location.href = target;
            }, 280); // matches the CSS timing
        });
    });

    // Fade in smoothly on every page
    setTimeout(() => {
        document.body.classList.add("fade-in");
    }, 20);
});
