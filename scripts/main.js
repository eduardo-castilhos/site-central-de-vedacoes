document.addEventListener('DOMContentLoaded', () => {
    // Lógica do Carrossel de Vídeos
    const videos = document.querySelectorAll('.video-background');
    let currentIndex = 0;
    let timeout;
    const playbackSpeed = 0.8;

    function stopCurrentVideo() {
        if (videos[currentIndex]) {
            videos[currentIndex].pause();
            videos[currentIndex].currentTime = 0;
        }
    }

    function startNextVideo() {
        const oldVideoIndex = currentIndex;
        const oldVideo = videos[oldVideoIndex];

        if (oldVideo) {
            oldVideo.classList.remove('active');
        }

        currentIndex = (oldVideoIndex + 1) % videos.length;
        const currentVideo = videos[currentIndex];

        setTimeout(() => {
            stopCurrentVideo();
            currentVideo.classList.add('active');
            currentVideo.playbackRate = playbackSpeed;

            const playPromise = currentVideo.play();

            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn('Autoplay foi bloqueado. O vídeo não iniciou automaticamente.');
                });
            }

            currentVideo.onloadedmetadata = () => {
                const duration = currentVideo.duration * 1000 / playbackSpeed;
                clearTimeout(timeout);
                timeout = setTimeout(startNextVideo, duration - 800);
            };

            if (currentVideo.readyState >= 1) {
                const duration = currentVideo.duration * 1000 / playbackSpeed;
                clearTimeout(timeout);
                timeout = setTimeout(startNextVideo, duration - 800);
            } else {
                clearTimeout(timeout);
                timeout = setTimeout(startNextVideo, 10000);
            }
        }, 1000);
    }

    if (videos.length > 0) {
        videos[0].classList.add('active');
        videos[0].playbackRate = playbackSpeed;

        const playPromise = videos[0].play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                const duration = videos[0].duration * 1000 / playbackSpeed;
                timeout = setTimeout(startNextVideo, duration - 800);
            }).catch(error => {
                console.warn('Autoplay foi bloqueado. O carrossel não iniciou automaticamente.');
            });
        }
    }

    // Menu para Mobile
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.main-nav');

    hamburgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.nav-menu li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburgerMenu.classList.remove('active');
            }
        });
    });
});