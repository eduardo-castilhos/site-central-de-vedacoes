function setupNavMenu() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.main-nav');

    if (hamburgerMenu && navMenu) {
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
    }
}