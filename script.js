const text = "ESPECIALISTAS EN SOLUCIONES INTEGRALES\nTransformamos ideas en imágenes";
const typingText = document.getElementById("typing-text");
const cursor = document.querySelector(".cursor");
const intro = document.getElementById("intro");
const logoIntro = document.querySelector(".logo-intro");
const card = document.getElementById("card");

let index = 0;
let activeView = null;
let activeCard = null;

/* ===== INTRO ===== */
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

/* ===== SISTEMA DE VISTAS (FIX DEFINITIVO) ===== */
function openView(viewId, cardId) {
  const view = document.getElementById(viewId);
  const viewCard = document.getElementById(cardId);

  // reset seguro
  viewCard.classList.remove("hide", "show");

  card.classList.remove("show");

  if (activeView) {
    activeCard.classList.remove("show");
    activeCard.classList.add("hide");

    setTimeout(() => {
      activeView.classList.remove("show");
      showView(view, viewCard);
    }, 300);
  } else {
    showView(view, viewCard);
  }
}

function showView(view, viewCard) {
  view.classList.add("show");

  setTimeout(() => {
    viewCard.classList.add("show");
  }, 50);

  activeView = view;
  activeCard = viewCard;
}

function closeViews() {
  if (!activeView) return;

  activeCard.classList.remove("show");
  activeCard.classList.add("hide");

  setTimeout(() => {
    activeView.classList.remove("show");
    card.classList.add("show");

    // limpieza CRÍTICA
    activeCard.classList.remove("hide");
    activeView = null;
    activeCard = null;
  }, 300);
}

/* ===== COPIAR CORREO ===== */
function copyMail() {
  navigator.clipboard.writeText("yfranco@yjpublicidad.pe");
  const msg = document.getElementById("copyMessage");
  msg.classList.add("show");
  setTimeout(() => msg.classList.remove("show"), 2000);
}

/* INICIAR */
typeEffect();
