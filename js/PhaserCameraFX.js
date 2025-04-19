document.addEventListener('DOMContentLoaded', () => {
  const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'phaser-cam-fx',
    transparent: true,
    scene: {
      create,
      update,
    }
  };

  let game = new Phaser.Game(config);
  let cam, zoomTimer = 0, zooming = false;
  let targetX = 0, targetY = 0;

  function create() {
    cam = this.cameras.main;
    cam.setZoom(1);
    cam.centerOn(window.innerWidth / 2, window.innerHeight / 2);

    // Ajusta el tamaño del canvas al redimensionar la ventana
    window.addEventListener('resize', () => {
      this.scale.resize(window.innerWidth, window.innerHeight);
      cam.setSize(window.innerWidth, window.innerHeight);
    });

    // Mouse move para tracking
    this.input.on('pointermove', pointer => {
      targetX = pointer.x;
      targetY = pointer.y;
    });
  }

  function update(time, delta) {
    // --- ZOOM LOOP ---
    if (window.isPlaying) {
      zoomTimer += delta;
      if (!zooming && zoomTimer > 2000) { // 120bpm, 4 beats = 2s
        zooming = true;
        cam.zoomTo(1.04, 150, 'Cubic', true, (cam, progress) => {
          if (progress === 1) {
            cam.zoomTo(1, 150, 'Cubic', true, () => {
              zooming = false;
              zoomTimer = 0;
            });
          }
        });
      }
    } else {
      zoomTimer = 0;
      if (cam.zoom !== 1) cam.setZoom(1);
    }

    // --- CAMERA TRACKING ---
    // Centro deseado: sigue el mouse suavemente
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const lerp = 0.08; // Suavidad del seguimiento

    // Calcula el desplazamiento respecto al centro
    const dx = (targetX || centerX) - centerX;
    const dy = (targetY || centerY) - centerY;

    // Aplica el seguimiento suave
    cam.centerOn(
      centerX + dx * lerp,
      centerY + dy * lerp
    );
  }
});