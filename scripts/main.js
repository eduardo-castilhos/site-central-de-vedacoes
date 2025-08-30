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
console.log("Script de menu mobile carregado.");

const hamburgerMenu = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.main-nav');

// Verifica se os elementos foram encontrados
console.log("Elemento do menu hamburguer:", hamburgerMenu);
console.log("Elemento de navegação:", navMenu);

if (hamburgerMenu && navMenu) {
    hamburgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');

        // Logs para o evento de clique
        console.log("Menu hambúrguer clicado.");
        console.log("Classe 'active' adicionada/removida do navMenu. Estado atual:", navMenu.classList.contains('active'));
        console.log("Classe 'active' adicionada/removida do hamburgerMenu. Estado atual:", hamburgerMenu.classList.contains('active'));
    });
} else {
    console.error("Erro: Um ou mais elementos do menu não foram encontrados no DOM. Verifique as classes 'hamburger-menu' e 'main-nav' no HTML.");
}

const navLinks = document.querySelectorAll('.nav-menu li a');
console.log("Links de navegação encontrados:", navLinks.length);

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        console.log("Link de navegação clicado.");
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburgerMenu.classList.remove('active');
            console.log("Menu fechado após clicar em um link.");
        }
    });
});
});