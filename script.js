const text = "ESPECIALISTAS EN SOLUCIONES INTEGRALES\nTransformamos ideas en imágenes";
const typingText = document.getElementById("typing-text");
const cursor = document.querySelector(".cursor");
const intro = document.getElementById("intro");
const logoIntro = document.querySelector(".logo-intro");
const card = document.getElementById("card");

let index = 0;

function typeEffect() {
  if (index < text.length) {
    typingText.innerHTML += text[index] === "\n" ? "<br>" : text[index];
    index++;
    setTimeout(typeEffect, 50);
  } else {
    cursor.style.display = "none";
    finishIntro();
  }
}

function finishIntro() {
  setTimeout(() => {
    logoIntro.classList.add("shrink");
    intro.style.opacity = "0";
  }, 600);

  setTimeout(() => {
    intro.style.display = "none";
    card.classList.add("show");
  }, 1400);
}

typeEffect();

/* ===== PORTAFOLIO ===== */

const openPortfolio = document.getElementById("openPortfolio");
const portfolio = document.getElementById("portfolio");
const backHome = document.getElementById("backHome");

openPortfolio.addEventListener("click", e => {
  e.preventDefault();
  card.style.display = "none";
  portfolio.style.display = "block";
  portfolio.classList.add("show");
});

backHome.addEventListener("click", e => {
  e.preventDefault();
  portfolio.style.display = "none";
  card.style.display = "block";
});
