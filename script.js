document.addEventListener("DOMContentLoaded", () => {
    const playButtons = document.querySelectorAll(".play-btn");
    let currentAudio = null;

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);
        return `${min}:${sec < 10 ? '0' + sec : sec}`;
    };

    playButtons.forEach(btn => {
        const audioId = btn.dataset.audio;
        const audio = document.getElementById(audioId);
        
        if (!audio) return;

        const card = btn.closest('.beat-card');
        const seekBar = card.querySelector('.seek-bar');
        const currTimeLabel = card.querySelector('.curr-time');
        const durTimeLabel = card.querySelector('.dur-time');

        // 🤑🤑🤑🤑🤑🤑🤑🤑🤑🤑🤑🤑🤑🤑🤑🤑
        audio.addEventListener('loadedmetadata', () => {
            durTimeLabel.textContent = formatTime(audio.duration);
            seekBar.max = audio.duration;
        });

        btn.addEventListener("click", () => {
            // 🤑🤑🤑🤑🤑🤑🤑🤑🤑🤑🤑🤑🤑🤑🤑🤑
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

        audio.addEventListener('timeupdate', () => {
            seekBar.value = audio.currentTime;
            currTimeLabel.textContent = formatTime(audio.currentTime);
        });

        seekBar.addEventListener("input", () => {
            audio.currentTime = seekBar.value;
        });
    });

    // 🤑🤑🤑🤑🤑🤑🤑🤑🤑🤑🤑🤑🤑🤑🤑🤑
    document.querySelectorAll(".reserve-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const link = btn.getAttribute("data-link");
            if (link) {
                window.open(link, "_blank");
            }
        });
    });
});
