document.addEventListener('DOMContentLoaded', () => {
    const popupOverlay = document.getElementById('popup-overlay');
    const closePopupBtn = document.querySelector('.close-popup-btn');
    const popupContent = document.getElementById('popup-content');
    const tableLinks = document.querySelectorAll('.table-toggle-btn'); // Seleciona todos os links de tabela

    // Lógica para carregar e abrir o popup
    function openPopupWithTable(url, title) {
        popupContent.innerHTML = `<h2 class="specifications-title">${title}</h2><p>Carregando tabela...</p>`;
        popupOverlay.classList.add('active');

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Tabela não encontrada.');
                }
                return response.text();
            })
            .then(html => {
                popupContent.innerHTML = `<h2 class="specifications-title">${title}</h2><div class="table-container">${html}</div>`;
            })
            .catch(error => {
                popupContent.innerHTML = `<h2 class="specifications-title">${title}</h2><p style="color: red;">Erro ao carregar a tabela. Tente novamente mais tarde.</p>`;
                console.error(error);
            });
    }

    // Adiciona o evento de clique a cada link de tabela
    tableLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const url = link.getAttribute('data-url');
            const title = link.textContent; // O título é o texto do link
            
            if (url) {
                openPopupWithTable(url, title);
            }
        });
    });

    // Lógica para fechar o popup
    function closePopup() {
        popupOverlay.classList.remove('active');
        popupContent.innerHTML = '';
    }

    closePopupBtn.addEventListener('click', closePopup);
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });
});