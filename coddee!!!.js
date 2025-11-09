function changevid(buttonLink) {
    const video = document.getElementById("vid");
    currentTime = document.getElementById("vid").currentTime;
    video.src = buttonLink;
    video.load();
    document.getElementById("vid").currentTime = currentTime;
}