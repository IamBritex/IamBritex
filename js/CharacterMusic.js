document.addEventListener('DOMContentLoaded', () => {
  const img = document.getElementById('character-gif');
  const staticFrame = 'assets/sprites/bloggif_frames_gif/frame-01.gif';
  const animatedGif = 'assets/sprites/GF_CS_IDLE.gif';
  const audio = new Audio('assets/music/Jazz風アレンジ星座になれたら-結束バンドぼっちざろっく劇中歌If i could be a constellation jazzy cover.mp3');
  audio.loop = true;
  let isPlaying = false;
  let fadeInterval = null;
  const maxVolume = 0.5; // Volumen máximo al 50%

  window.audio = audio;
  window.isPlaying = isPlaying;

  function fadeAudio(targetVolume, duration) {
    clearInterval(fadeInterval);
    const steps = 50;
    const stepTime = duration / steps;
    const startVolume = audio.volume;
    const volumeStep = (targetVolume - startVolume) / steps;
    let currentStep = 0;

    fadeInterval = setInterval(() => {
      currentStep++;
      audio.volume = Math.min(maxVolume, Math.max(0, startVolume + volumeStep * currentStep));
      if (currentStep >= steps) {
        audio.volume = Math.min(maxVolume, targetVolume);
        clearInterval(fadeInterval);
        if (targetVolume === 0) {
          audio.pause();
          audio.currentTime = 0;
        }
      }
    }, stepTime);
  }

  img.addEventListener('click', () => {
    isPlaying = !isPlaying;
    window.isPlaying = isPlaying; // Actualiza la variable global para CameraPage.js

    if (isPlaying) {
      img.src = animatedGif;
      audio.volume = 0;
      audio.play();
      fadeAudio(maxVolume, 10000); // Fade in en 10s
    } else {
      fadeAudio(0, 1000); // Fade out en 1s
      img.src = staticFrame;
    }
  });
});