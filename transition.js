document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    body.style.opacity = 0;

    const video = document.querySelector("video");

    // Fade in after video loads OR after 200ms if video is slow
    let videoLoaded = false;

    if (video) {
        video.addEventListener("loadeddata", () => {
            videoLoaded = true;
            body.classList.add("page-loaded");
        });
    }

    setTimeout(() => {
        if (!videoLoaded) body.classList.add("page-loaded");
    }, 200);

    // Fade-out transition for navigation links
    const links = document.querySelectorAll("a.transition-link");
    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const target = link.href;

            body.classList.remove("page-loaded");

            setTimeout(() => {
                window.location.href = target;
            }, 350);
        });
    });
});
