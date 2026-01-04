document.querySelectorAll(".slider-container").forEach(container => {
  const slider = container.querySelector(".slider");
  const slides = Array.from(slider.children);
  const prevBtn = container.querySelector(".prev");
  const nextBtn = container.querySelector(".next");

  let index = 0;
  let interval = null;
  let hovering = false;
  let videoLocked = false;

  function updateSlider() {
    slider.style.transform = `translateX(-${index * 100}%)`;
  }

  function startAuto() {
    if (!interval && !hovering && !videoLocked) {
      interval = setInterval(() => {
        index = (index + 1) % slides.length;
        updateSlider();
      }, 4000);
    }
  }

  function stopAuto() {
    clearInterval(interval);
    interval = null;
  }

  /* Prev / Next */
  prevBtn?.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    updateSlider();
  });

  nextBtn?.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    updateSlider();
  });

  /* Hover pause */
  slider.addEventListener("mouseenter", () => {
    hovering = true;
    stopAuto();
  });

  slider.addEventListener("mouseleave", () => {
    hovering = false;
    if (!videoLocked) startAuto();
  });

  /* Video logic */
  slides.forEach(slide => {
    const video = slide.querySelector("video");
    const overlay = slide.querySelector(".play-overlay");

    if (!video || !overlay) return;

    overlay.addEventListener("click", () => {
      video.play();
    });

    video.addEventListener("play", () => {
      slide.dataset.playing = "true";
      videoLocked = true;
      stopAuto();
    });

    video.addEventListener("pause", () => {
      videoLocked = true; // intentional pause
    });

    video.addEventListener("ended", () => {
      slide.dataset.playing = "false";
      videoLocked = false;
      if (!hovering) startAuto();
    });
  });

  /* Init */
  updateSlider();
  startAuto();
});

