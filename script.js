const text = "ESPECIALISTAS EN SOLUCIONES INTEGRALES\nTransformamos ideas en imágenes";
const typingText = document.getElementById("typing-text");
const cursor = document.querySelector(".cursor");
const intro = document.getElementById("intro");
const logoIntro = document.querySelector(".logo-intro");
const card = document.getElementById("card");

let index = 0;
let activeView = null;
let activeCard = null;
let isTransitioning = false;

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

/* ===== SISTEMA DE VISTAS (ROBUSTO) ===== */
function openView(viewId, cardId) {
  const view = document.getElementById(viewId);
  const viewCard = document.getElementById(cardId);

  if (activeView) return;

  // Salida de la card principal
  card.classList.remove("show");
  card.classList.add("hide");

  setTimeout(() => {
    view.classList.add("show");

    // 🔑 Reset visual del card interno
    viewCard.classList.remove("show", "hide");
    viewCard.style.opacity = "0";

    requestAnimationFrame(() => {
      viewCard.classList.add("show");
      viewCard.style.opacity = "";
    });

    card.classList.remove("hide");

    activeView = view;
    activeCard = viewCard;
  }, 300);
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
  if (!activeView || !activeCard) return;

  // 1️⃣ Desvanece la card activa
  activeCard.classList.remove("show");
  activeCard.classList.add("hide");

  // 2️⃣ Espera animación
  setTimeout(() => {
    activeView.classList.remove("show");

    // 3️⃣ Vuelve la card principal con fade
    card.classList.remove("hide");
    card.classList.add("show");

    // limpieza
    activeCard.classList.remove("hide");
    activeView = null;
    activeCard = null;
  }, 350);
}



/* ===== COPIAR CORREO ===== */
function copyMail() {
  navigator.clipboard.writeText("yfranco@yjpublicidad.pe");
  const msg = document.getElementById("copyMessage");
  msg.classList.add("show");
  setTimeout(() => msg.classList.remove("show"), 2000);
}

/* ===== VISOR DE IMÁGENES ===== */
const viewer = document.getElementById("imageViewer");
const viewerImg = document.getElementById("viewerImg");

function openViewer(img) {
  viewerImg.src = img.src;
  viewer.classList.add("show");
}

function closeViewer(e) {
  if (e.target === viewer || e.target.classList.contains("viewer-close")) {
    viewer.classList.remove("show");
    viewerImg.src = "";
  }
}

/* ===== INICIAR ===== */
typeEffect();
