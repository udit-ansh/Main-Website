document.addEventListener("DOMContentLoaded", () => {
    // Force initial opacity to 0 (hidden)
    document.body.style.opacity = 0;

    // Ensure page fades in AFTER background video loads
    const video = document.querySelector("video");

    if (video) {
        video.addEventListener("loadeddata", () => {
            document.body.classList.add("page-loaded");
        });
    } else {
        // No video on this page → fade in immediately
        document.body.classList.add("page-loaded");
    }

    // Handle page transition fade-out
    const links = document.querySelectorAll("a.transition-link");

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = e.target.href;

            document.body.classList.remove("page-loaded");

            setTimeout(() => {
                window.location.href = target;
            }, 350);
        });
    });
});
