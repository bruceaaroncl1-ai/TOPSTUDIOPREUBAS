console.log("TOP STUDIOS cargado");
console.log("TOP STUDIOS website loaded");

// Fuerza al navegador a limpiar el historial de anclaje de la URL y subir al Hero en cada refresh
if (window.location.hash) {
  window.location.hash = ""; // Limpia el #servicios de la barra de direcciones
  window.scrollTo(0, 0);     // Resetea la cámara de la pantalla al tope de la web
}
const cards = document.querySelectorAll(".card, .price-card, .pricing-box, .equipment div");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.2
});

cards.forEach(card => {
  card.classList.add("hidden");
  observer.observe(card);
});
// --- SISTEMA DE TRANSFORMACIÓN AUDIOVISUAL (APPLE VS PRO TOOLS) ---
document.addEventListener("DOMContentLoaded", () => {
  const audioVoice = document.getElementById("audio-voice-file");
  const videoProTools = document.getElementById("protools-video");
  
  const viewVoice = document.getElementById("view-voice-note");
  const viewVideo = document.getElementById("view-protools-video");
  
  const btnPlayVoice = document.getElementById("btn-play-voice");
  const iconVoicePlay = document.getElementById("icon-voice-play");
  const iconVoicePause = document.getElementById("icon-voice-pause");
  const waveform = document.querySelector(".apple-waveform");
  
  const videoWrapper = document.querySelector(".video-wrapper");
  const videoOverlay = document.querySelector(".video-overlay-play");
  
  const tabVoice = document.getElementById("switch-to-voice");
  const tabVideo = document.getElementById("switch-to-video");

  // --- ELEMENTOS DE LA LÍNEA DE TIEMPO AGREGADOS ---
  const seeker = document.getElementById("audio-video-seeker");
  const currentTimeLabel = document.getElementById("time-current");
  const durationTimeLabel = document.getElementById("time-duration");

  // Formateador: Convierte segundos (ej: 75) a formato reloj (ej: 1:15)
  function formatearTiempo(segundos) {
    if (isNaN(segundos)) return "0:00";
    const mins = Math.floor(segundos / 60);
    const secs = Math.floor(segundos % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }
  // Play / Pause Nota de Voz
  btnPlayVoice.addEventListener("click", () => {
    if (audioVoice.paused) {
      // Si está en pausa, dale Play
      audioVoice.play();
      iconVoicePlay.classList.add("hidden");
      iconVoicePause.classList.remove("hidden");
      waveform.classList.add("playing");
    } else {
      // SI YA ESTÁ REPRODUCIENDO, AHORA SÍ LE DA PAUSE
      audioVoice.pause();
      iconVoicePlay.classList.remove("hidden");
      iconVoicePause.classList.add("hidden");
      waveform.classList.remove("playing");
    }
  });

  // Play / Pause Video Pro Tools
  videoWrapper.addEventListener("click", () => {
    if (videoProTools.paused) {
      videoProTools.play();
      videoOverlay.style.opacity = "0";
    } else {
      videoProTools.pause();
      videoOverlay.style.opacity = "1";
    }
  });

  // Alternar a pestaña Nota de Voz
  tabVoice.addEventListener("click", () => {
    if (tabVoice.classList.contains("active")) return;
    
    // Transferir tiempo de reproducción del video al audio por si estaba sonando
    audioVoice.currentTime = videoProTools.currentTime;
    
    if (!videoProTools.paused) {
      videoProTools.pause();
      audioVoice.play();
      iconVoicePlay.classList.add("hidden");
      iconVoicePause.classList.remove("hidden");
      waveform.classList.add("playing");
    }

    tabVideo.classList.remove("active");
    tabVoice.classList.add("active");
    viewVideo.classList.remove("active");
    viewVoice.classList.add("active");
  });

  // --- CONTROL DE AVANCE Y ARRASTRE DE TIEMPO ---

  // Asigna la duración total de la barra en cuanto cargue el audio
  audioVoice.addEventListener("loadedmetadata", () => {
    seeker.max = audioVoice.duration;
    durationTimeLabel.textContent = formatearTiempo(audioVoice.duration);
  });

  // Por seguridad, si el video es el que carga primero
  videoProTools.addEventListener("loadedmetadata", () => {
    seeker.max = videoProTools.duration;
    durationTimeLabel.textContent = formatearTiempo(videoProTools.duration);
  });

  // Hace que la barra camine sola segundo a segundo mientras se reproduce
  function actualizarBarra() {
    const tiempoActual = !audioVoice.paused ? audioVoice.currentTime : videoProTools.currentTime;
    seeker.value = tiempoActual;
    currentTimeLabel.textContent = formatearTiempo(tiempoActual);
  }

  audioVoice.addEventListener("timeupdate", actualizarBarra);
  videoProTools.addEventListener("timeupdate", actualizarBarra);

  // Cuando el usuario arrastra manualmente el cursor dorado (Seeker)
  seeker.addEventListener("input", () => {
    const nuevoTiempo = parseFloat(seeker.value);
    
    // Amarra ambos archivos al mismo segundo exacto
    audioVoice.currentTime = nuevoTiempo;
    videoProTools.currentTime = nuevoTiempo;
    
    currentTimeLabel.textContent = formatearTiempo(nuevoTiempo);
  });
  // Alternar a pestaña Video de Pro Tools
  tabVideo.addEventListener("click", () => {
    if (tabVideo.classList.contains("active")) return;
    
    // Sincronizar el tiempo exacto del audio al video
    videoProTools.currentTime = audioVoice.currentTime;
    
    if (!audioVoice.paused) {
      audioVoice.pause();
      iconVoicePlay.classList.remove("hidden");
      iconVoicePause.classList.add("hidden");
      waveform.classList.remove("playing");
      
      videoProTools.play();
      videoOverlay.style.opacity = "0";
    } else {
      videoOverlay.style.opacity = "1";
    }

    tabVoice.classList.remove("active");
    tabVideo.classList.add("active");
    viewVoice.classList.remove("active");
    viewVideo.classList.add("active");
  });
});
// --- SISTEMA DE SCROLL SECUENCIAL INTELIGENTE PARA LA FLECHA FIJA ---
document.addEventListener("DOMContentLoaded", () => {
  const scrollBtn = document.getElementById("globalScrollBtn");
  const footerElement = document.getElementById("contacto");

  // Lista ordenada de todas las secciones de tu estudio por las que pasará la flecha
  const secciones = [
    document.getElementById("servicios"),
    document.querySelector(".acoustic-section"),
    document.querySelector(".tarifario-background"),
    document.querySelector(".recording-section"),
    document.getElementById("packs"),
    document.querySelector(".equipment-background"),
    document.querySelector(".why"),
    document.querySelector(".allies"),
    footerElement
  ];

  if (scrollBtn) {
    // ACCIÓN AL HACER CLIC: Detecta la siguiente sección abajo y salta a ella
    scrollBtn.addEventListener("click", () => {
      const pixelDeCorte = window.scrollY + 120; // Margen de tolerancia para el escaneo

      // Busca la primera sección cuya posición en la página sea mayor a donde está parado el usuario
      const siguienteSeccion = secciones.find(sec => {
        if (!sec) return false;
        const posicionTop = sec.offsetTop;
        return posicionTop > pixelDeCorte;
      });

      // Si encuentra la sección que sigue, baja fluidamente hacia ella
      if (siguienteSeccion) {
        siguienteSeccion.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    // DETECTOR DE SCROLL: Mantiene la lógica de ocultarse al tocar el footer
    window.addEventListener("scroll", () => {
      if (footerElement) {
        const footerBounds = footerElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (footerBounds.top <= windowHeight - 20) {
          scrollBtn.classList.add("fade-out");
        } else {
          scrollBtn.classList.remove("fade-out");
        }
      }
    });
  }
});