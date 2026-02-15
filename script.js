document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero-section");
  const imageContainer = document.querySelector(".image-container");
  hero.addEventListener("mousemove", (e) => {
    if (window.innerWidth > 1024) {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const rotateX = (clientY - centerY) * 0.01;
      const rotateY = (centerX - clientX) * 0.01;
      imageContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  });
  hero.addEventListener("mouseleave", () => {
    imageContainer.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0)";
  });
  const reveals = document.querySelectorAll(".reveal");
  const revealOnScroll = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    }
  );
  reveals.forEach((reveal) => revealOnScroll.observe(reveal));
  // Contador 2 de Dic 2025
  const targetDate = new Date("2025-12-02T15:19:00-05:00").getTime();
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  function updateCounter() {
    const now = new Date().getTime();
    const difference = now - targetDate;
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      daysEl.innerText = days < 10 ? "0" + days : days;
      hoursEl.innerText = hours < 10 ? "0" + hours : hours;
      minutesEl.innerText = minutes < 10 ? "0" + minutes : minutes;
      secondsEl.innerText = seconds < 10 ? "0" + seconds : seconds;
    }
  }
  setInterval(updateCounter, 1000);
  updateCounter();
  // ================= LOGICA FLASH SCROLL EFFECT =================
  const perspectiveSection = document.getElementById("perspectiva");
  const flashOverlay = document.getElementById("flashEffect");
  const perspectiveObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          flashOverlay.classList.add("flash-active");
          setTimeout(() => {
            flashOverlay.classList.remove("flash-active");
          }, 500);
        } else {
          flashOverlay.classList.remove("flash-active");
        }
      });
    },
    {
      threshold: 0.4
    }
  );
  if (perspectiveSection) {
    perspectiveObserver.observe(perspectiveSection);
  }
  // ================= CARRUSEL DE PELÍCULAS 3D =================
  const movies = [
    {
      title: "Avengers: Era de Ultrón",
      duration: "141 min",
      img: "https://image.tmdb.org/t/p/w500/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg"
    },
    {
      title: "Ratatouille",
      duration: "111 min",
      img: "https://image.tmdb.org/t/p/original/nGUelOVetiRpY2wTBMHTbrTIGYC.jpg"
    },
    {
      title: "Aladdin",
      duration: "128 min",
      img: "https://image.tmdb.org/t/p/original/trnyoKkkvvjZvRvCMrNDtSf25nH.jpg"
    },
    {
      title: "Alicia a través del espejo",
      duration: "113 min",
      img: "https://image.tmdb.org/t/p/original/enTsjngbsWuf1JB6YoYOOd67GdE.jpg"
    },
    {
      title: "Enredados",
      duration: "101 min",
      img: "https://image.tmdb.org/t/p/original/z5kvXWek4smCyeWBDJQkT5sLc9T.jpg"
    },
    {
      title: "El Código Da Vinci",
      duration: "149 min",
      img: "https://image.tmdb.org/t/p/original/r5DHVCB5AV7B7GLmXMyA71Y4Yu4.jpg"
    }
  ];
  const carousel = document.getElementById("movie-carousel");
  let activeIndex = 0;

  function renderCarousel() {
    carousel.innerHTML = "";
    movies.forEach((movie, index) => {
      const card = document.createElement("div");
      let offset = index - activeIndex;
      if (offset < -2) offset += movies.length;
      if (offset > 2) offset -= movies.length;
      let className =
        "movie-card absolute top-0 w-48 md:w-64 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl transition-all duration-700 ease-out";
      let style = "";
      if (index === activeIndex) {
        className += " active z-30 opacity-100";
        style =
          "left: 50%; transform: translateX(-50%) scale(1.1); box-shadow: 0 0 30px rgba(255,100,150,0.4);";
      } else if (
        offset === -1 ||
        (activeIndex === 0 && index === movies.length - 1)
      ) {
        className += " prev z-20 opacity-60 grayscale-[50%] blur-[1px]";
        style =
          "left: 30%; transform: translateX(-50%) scale(0.85) perspective(1000px) rotateY(-15deg);";
      } else if (
        offset === 1 ||
        (activeIndex === movies.length - 1 && index === 0)
      ) {
        className += " next z-20 opacity-60 grayscale-[50%] blur-[1px]";
        style =
          "left: 70%; transform: translateX(-50%) scale(0.85) perspective(1000px) rotateY(15deg);";
      } else {
        className += " z-10 opacity-0";
        style =
          "left: 50%; transform: translateX(-50%) scale(0.5); pointer-events: none;";
      }
      if (window.innerWidth < 768) {
        if (index === activeIndex)
          style = "left: 50%; transform: translateX(-50%) scale(1);";
        else if (offset === -1)
          style =
            "left: 15%; transform: translateX(-50%) scale(0.8); opacity(0.5);";
        else if (offset === 1)
          style =
            "left: 85%; transform: translateX(-50%) scale(0.8); opacity(0.5);";
      }
      card.className = className;
      card.style = style;
      card.innerHTML = `
                        <img src="${movie.img}" alt="${movie.title}" class="w-full h-full object-cover">
                        <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                        <div class="absolute bottom-0 w-full p-4 text-center">
                            <h3 class="text-lg font-bold font-serif text-white leading-tight drop-shadow-md">${movie.title}</h3>
                            <p class="text-xs font-sans text-gray-300 mt-1">${movie.duration}</p>
                        </div>
                    `;
      card.addEventListener("click", () => {
        activeIndex = index;
        renderCarousel();
        resetTimer();
      });
      carousel.appendChild(card);
    });
  }

  function nextSlide() {
    activeIndex = (activeIndex + 1) % movies.length;
    renderCarousel();
  }

  function prevSlide() {
    activeIndex = (activeIndex - 1 + movies.length) % movies.length;
    renderCarousel();
  }
  document.getElementById("nextMovie").addEventListener("click", () => {
    nextSlide();
    resetTimer();
  });
  document.getElementById("prevMovie").addEventListener("click", () => {
    prevSlide();
    resetTimer();
  });
  let timer = setInterval(nextSlide, 3000);

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(nextSlide, 3000);
  }
  renderCarousel();
  window.addEventListener("resize", renderCarousel);

  // ================= LÓGICA DE CONTADORES HIJITOS =================
  const funkoDate = new Date("2025-10-18T08:00-05:00").getTime();
  const leonDate = new Date("2025-12-02T12:00-05:00").getTime();
  const lagartijaDate = new Date("2025-12-21T21:00-05:00").getTime();

  function updatePetCounters() {
    const now = new Date().getTime();

    const updateSingleCounter = (startDate, elementId) => {
      const diff = now - startDate;
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById(elementId).innerText = `${d}d ${h}h ${m}m ${s}s`;
    };

    updateSingleCounter(funkoDate, "timer-funko");
    updateSingleCounter(leonDate, "timer-leon");
    updateSingleCounter(lagartijaDate, "timer-lagartija");
  }

  setInterval(updatePetCounters, 1000);
  updatePetCounters();
});
