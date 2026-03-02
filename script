document.addEventListener("DOMContentLoaded", () => {
    const playButtons = document.querySelectorAll(".play-btn");
    let currentAudio = null;

    // Formatear tiempo (segundos a 0:00)
    const formatTime = (time) => {
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);
        return `${min}:${sec < 10 ? '0' + sec : sec}`;
    };

    playButtons.forEach(btn => {
        const audioId = btn.dataset.audio;
        const audio = document.getElementById(audioId);
        const card = btn.closest('.beat-card');
        const seekBar = card.querySelector('.seek-bar');
        const currTimeLabel = card.querySelector('.curr-time');
        const durTimeLabel = card.querySelector('.dur-time');

        // Cargar duración al iniciar
        audio.onloadedmetadata = () => {
            durTimeLabel.textContent = formatTime(audio.duration);
            seekBar.max = audio.duration;
        };

        // Click en Play/Pause
        btn.addEventListener("click", () => {
            if (currentAudio && currentAudio !== audio) {
                currentAudio.pause();
                document.querySelectorAll('.play-btn').forEach(b => b.textContent = "▶");
            }

            if (audio.paused) {
                audio.play();
                btn.textContent = "⏸";
                currentAudio = audio;
            } else {
                audio.pause();
                btn.textContent = "▶";
            }
        });

        // Actualizar barra de progreso
        audio.ontimeupdate = () => {
            seekBar.value = audio.currentTime;
            currTimeLabel.textContent = formatTime(audio.currentTime);
        };

        // Buscar en la barra (Seek)
        seekBar.addEventListener("input", () => {
            audio.currentTime = seekBar.value;
        });
    });

    // Manejo de Reservas
    document.querySelectorAll(".reserve-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const link = btn.dataset.link;
            window.open(link, "_blank");
        });
    });
});
