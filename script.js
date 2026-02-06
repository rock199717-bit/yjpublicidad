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

  // prevenir clicks dobles
  if (activeView) return;

  // salida card principal
  card.classList.remove("show");
  card.classList.add("hide");

  setTimeout(() => {
    card.classList.remove("hide");

    view.classList.add("show");
    viewCard.classList.add("show");

    activeView = view;
    activeCard = viewCard;
  }, 350);
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

  // salida card actual (correo o portafolio)
  activeCard.classList.remove("show");
  activeCard.classList.add("hide");

  setTimeout(() => {
    activeView.classList.remove("show");
    activeCard.classList.remove("hide");

    // entrada card principal
    card.classList.add("show");

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

  const caption = document.getElementById("viewerCaption");

  // si tu imagen tiene data-caption lo usa, si no deja vacío
  caption.textContent = img.dataset.caption || "";

  viewer.classList.add("show");
}



function closeViewer(e) {
  if (e.target === viewer || e.target.classList.contains("viewer-close")) {
    viewer.classList.remove("show");
    viewerImg.src = "";
  }
}

// ===== CAPTION TOGGLE MOBILE (TOCAR FOTO = TOGGLE, TOCAR FONDO = OCULTAR) =====
(function () {
  const viewer = document.getElementById("imageViewer");
  const closeBtn = viewer.querySelector(".viewer-close");

  viewer.addEventListener("click", (e) => {
    const box = e.target.closest(".viewer-box");
    const caption = viewer.querySelector(".viewer-box");

    // si tocas la X, no hacemos nada aquí (la X cierra)
    if (e.target.closest(".viewer-close")) return;

    // ✅ Si tocas FUERA de la imagen (fondo oscuro)
    if (!box) {
      // solo oculta franja si está activa
      const activeBox = viewer.querySelector(".viewer-box.active");
      if (activeBox) activeBox.classList.remove("active");
      return;
    }

    // ✅ Si tocas DENTRO de la imagen: toggle franja
    box.classList.toggle("active");
  });

  // La X siempre cierra sin interferencias
  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeViewer({ target: closeBtn });
    });
  }
})();

/* ===== INICIAR ===== */
typeEffect();





