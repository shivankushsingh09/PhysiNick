// Initialize particles.js
document.addEventListener("DOMContentLoaded", function () {
  particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: {
        value: 0.5,
        random: true,
        anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false },
      },
      size: {
        value: 3,
        random: true,
        anim: { enable: true, speed: 2, size_min: 0.1, sync: false },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#6a11cb",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 1200 },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: {
        grab: { distance: 140, line_linked: { opacity: 1 } },
        push: { particles_nb: 4 },
      },
    },
    retina_detect: true,
  });
});

// Nickname generator data
const firstNames = {
  A: "Adiabatic",
  B: "Bogoliubov",
  C: "Critical",
  D: "Diffraction-Limited",
  E: "Entangled",
  F: "Fermi-Dirac",
  G: "Gauge-Invariant",
  H: "Holographic",
  I: "Ising-like",
  J: "Josephson",
  K: "Kramers-Kronig",
  L: "Luttinger-Liquid",
  M: "Many-Body",
  N: "Nonlinear",
  O: "Optical",
  P: "Plasmonic",
  Q: "Quantum",
  R: "Renormalized",
  S: "Supersymmetric",
  T: "Topological",
  U: "Ultrafast",
  V: "Viscoelastic",
  W: "Weyl",
  X: "X-ray",
  Y: "Yukawa",
  Z: "Zero-Point",
};

const lastNames = {
  A: "Annihilator",
  B: "Boundary Bard",
  C: "Coherence Captain",
  D: "Diffusion Druid",
  E: "Eigenstate Explorer",
  F: "Fermi-Surface Surfer",
  G: "Green's-Function Guru",
  H: "Hamiltonian Handler",
  I: "Interference Illusionist",
  J: "Junction Juggler",
  K: "k-space Knight",
  L: "Lagrangian Locksmith",
  M: "Magnon Magician",
  N: "Noether Navigator",
  O: "Oscillation Oracle",
  P: "Phase-Diagram Pirate",
  Q: "Quasiparticle Quester",
  R: "Resonance Ranger",
  S: "Symmetry Sleuth",
  T: "Tunneling Troubadour",
  U: "Unitarity Umpire",
  V: "Vacuum Voyager",
  W: "Wavefunction Wrangler",
  X: "X-ray Xplorer",
  Y: "Young's-Slit Yodeler",
  Z: "Zeeman Zealot",
};

// Add animation to inputs on focus
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.style.transform = "scale(1.02)";
    this.parentElement.style.transition = "transform 0.3s ease";
  });

  input.addEventListener("blur", function () {
    this.parentElement.style.transform = "scale(1)";
  });

  // Auto-focus next input
  input.addEventListener("input", function () {
    if (this.value.length === this.maxLength) {
      const nextInput = this.nextElementSibling;
      if (nextInput && nextInput.tagName === "INPUT") {
        nextInput.focus();
      } else if (nextInput && nextInput.tagName === "BUTTON") {
        generateNickname();
      }
    }
  });
});

// Add Enter key functionality
document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    generateNickname();
  }
});

function generateNickname() {
  const firstInitial = document.getElementById("firstName").value.toUpperCase();
  const lastInitial = document.getElementById("lastName").value.toUpperCase();
  const resultElement = document.getElementById("result");

  // Add animation class
  resultElement.classList.remove("animate__fadeIn");
  void resultElement.offsetWidth; // Trigger reflow
  resultElement.classList.add("animate__animated", "animate__fadeIn");

  if (!firstInitial || !lastInitial) {
    resultElement.textContent = "Please enter both initials!";
    return;
  }

  if (firstNames[firstInitial] && lastNames[lastInitial]) {
    const nickname = `${firstNames[firstInitial]} ${lastNames[lastInitial]}`;
    // Typewriter effect
    let i = 0;
    resultElement.textContent = "";
    const speed = 50; // ms per character

    function typeWriter() {
      if (i < nickname.length) {
        resultElement.textContent += nickname.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }

    typeWriter();

    // Add confetti effect on successful generation
    if (window.confetti) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  } else {
    resultElement.textContent = "Please enter valid initials (A-Z)";
  }
}

// Add confetti effect
(function () {
  const script = document.createElement("script");
  script.src =
    "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
  script.onload = function () {
    window.confetti = window.confetti;
  };
  document.head.appendChild(script);
})();
