document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".transition-link");

    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();

            const href = link.getAttribute("href");

            document.body.classList.add("fade-out");

            setTimeout(() => {
                window.location.href = href;
            }, 250);
        });
    });

    document.body.classList.add("fade-in");
});
