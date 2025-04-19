document.addEventListener('DOMContentLoaded', () => {
  let zoomInterval = null;
  let isZooming = false;
  let mouseX = 0.5, mouseY = 0.5; // Normalizado (0 a 1)

  // Mouse tracking en toda la ventana
  window.addEventListener('mousemove', e => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
  });

  function applyTransform(zoom = 1) {
    // El centro de la pantalla es (0.5, 0.5)
    const offsetX = (mouseX - 0.5) * 30; // Más sensibilidad
    const offsetY = (mouseY - 0.5) * 30;
    document.body.style.transform = `scale(${zoom}) translate(${offsetX}px, ${offsetY}px)`;
  }

  function startZoomLoop() {
    if (zoomInterval) clearInterval(zoomInterval);
    zoomInterval = setInterval(() => {
      if (window.isPlaying) {
        isZooming = true;
        document.body.classList.add('body-zoom');
        applyTransform(1.010); // Menos zoom
        setTimeout(() => {
          applyTransform(1);
          isZooming = false;
        }, 150);
      } else {
        clearInterval(zoomInterval);
        zoomInterval = null;
        isZooming = false;
        document.body.classList.remove('body-zoom');
        applyTransform(1);
      }
    }, 2000); // 120bpm, 4 beats = 2s
  }

  // Aplica el tracking aunque no haya zoom
  setInterval(() => {
    if (!isZooming) applyTransform(1);
  }, 16);

  // Observa cambios en window.isPlaying
  let lastIsPlaying = window.isPlaying;
  setInterval(() => {
    if (window.isPlaying && !lastIsPlaying) {
      startZoomLoop();
    }
    if (!window.isPlaying && lastIsPlaying) {
      if (zoomInterval) {
        clearInterval(zoomInterval);
        zoomInterval = null;
        isZooming = false;
        document.body.classList.remove('body-zoom');
        applyTransform(1);
      }
    }
    lastIsPlaying = window.isPlaying;
  }, 100);
});