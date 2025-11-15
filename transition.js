// Smooth page transitions with no white flash

window.addEventListener("load", () => {

    // Fade the page in ONLY after everything has loaded
    document.body.style.opacity = "1";

    const links = document.querySelectorAll(".transition-link");

    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();

            const url = link.href;

            // Start fade-out animation
            document.body.style.opacity = "0";

            // After animation ends, navigate
            setTimeout(() => {
                window.location.href = url;
            }, 300); // matches CSS transition time
        });
    });

});
