document.addEventListener('DOMContentLoaded', () => {
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

            // --- NOVO CÓDIGO AQUI ---
            currentVideo.playbackRate = playbackSpeed; // Define a velocidade de reprodução
            // ------------------------

            const playPromise = currentVideo.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn('Autoplay foi bloqueado. O vídeo não iniciou automaticamente.');
                });
            }

            currentVideo.onloadedmetadata = () => {
                const duration = currentVideo.duration * 1000 / playbackSpeed;
                clearTimeout(timeout);
                timeout = setTimeout(startNextVideo, duration - 500);
            };

            if (currentVideo.readyState >= 1) {
                const duration = currentVideo.duration * 1000 / playbackSpeed;
                clearTimeout(timeout);
                timeout = setTimeout(startNextVideo, duration - 500);
            } else {
                clearTimeout(timeout);
                timeout = setTimeout(startNextVideo, 10000);
            }
            
        }, 1000);
    }

    // Inicia o carrossel com o primeiro vídeo ao carregar a página
    if (videos.length > 0) {
        videos[0].classList.add('active');
        
        // --- NOVO CÓDIGO AQUI ---
        videos[0].playbackRate = playbackSpeed; // Define a velocidade do primeiro vídeo
        // ------------------------
        
        const playPromise = videos[0].play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // A duração deve ser ajustada para a nova velocidade
                const duration = videos[0].duration * 1000 / playbackSpeed;
                timeout = setTimeout(startNextVideo, duration - 500);
            }).catch(error => {
                console.warn('Autoplay foi bloqueado. O carrossel não iniciou automaticamente.');
            });
        }
    }

    // Menu Hamburger para Mobile
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


document.addEventListener('DOMContentLoaded', () => {
    const tableToggles = document.querySelectorAll('.table-toggle-btn');

    tableToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = toggle.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            const tableUrl = toggle.getAttribute('data-url'); // Pega o URL do arquivo

            // Se o elemento já está ativo, esconde-o
            if (targetElement.classList.contains('active')) {
                targetElement.classList.remove('active');
                targetElement.innerHTML = ''; // Limpa o conteúdo
                return;
            }

            // Esconde todas as outras tabelas antes de carregar a nova
            document.querySelectorAll('.table-content-area.active').forEach(item => {
                item.classList.remove('active');
                item.innerHTML = ''; // Limpa o conteúdo para não sobrepor
            });

            // Carrega o conteúdo do arquivo HTML
            fetch(tableUrl)
                .then(response => response.text())
                .then(html => {
                    targetElement.innerHTML = html;
                    targetElement.classList.add('active');
                })
                .catch(err => {
                    console.error('Erro ao carregar a tabela:', err);
                    targetElement.innerHTML = '<p>Erro ao carregar a tabela. Tente novamente mais tarde.</p>';
                    targetElement.classList.add('active');
                });
        });
    });
});