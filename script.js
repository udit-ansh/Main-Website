// Smooth fade transition between pages + basic link handler
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("a").forEach(link => {
    // only apply to internal html links
    const href = link.getAttribute("href");
    if (!href) return;
    if (!href.endsWith(".html") && !href.startsWith("/") && !href.startsWith("./")) return;

    link.addEventListener("click", (e) => {
      // let external anchors or hashes behave normally
      if (href.startsWith("#")) return;

      e.preventDefault();
      document.body.classList.add("fade-out");

      // wait for fade then navigate
      setTimeout(() => {
        window.location.href = href;
      }, 380);
    });
  });
});
