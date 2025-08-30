document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('produto');

    if (!productId) {
        console.error('Nenhum ID de produto fornecido.');
        return;
    }

    fetch('data/product.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o JSON dos produtos.');
            }
            return response.json();
        })
        .then(data => {
            const product = data.produtos.find(p => p.id === productId);

            if (product) {
                document.title = product.titulo + ' - Central de Vedações';
                document.getElementById('product-name-placeholder').textContent = product.titulo;
                document.getElementById('product-image-placeholder').src = product.imagem;
                document.getElementById('product-image-placeholder').alt = product.titulo;
                document.getElementById('product-description-placeholder').innerHTML = product.descricao;
                
                const tablesPlaceholder = document.getElementById('tables-placeholder');
                
                if (product.grupo && product.grupo.length > 0) {
                    const tablesPlaceholder = document.getElementById('tables-placeholder');

                    product.grupo.forEach(grupo => {
                        const groupContainer = document.createElement('div');
                        groupContainer.classList.add('table-group');

                        const groupTitle = document.createElement('h3');
                        groupTitle.classList.add('table-group-title');
                        groupTitle.textContent = grupo.titulo;
                        groupContainer.appendChild(groupTitle);

                        const linksContainer = document.createElement('div');
                        linksContainer.classList.add('tables-list-container');
                        
                        if (grupo.subgrupo && grupo.subgrupo.length > 0) {
                            grupo.subgrupo.forEach(subgrupo => {
                                const tableLink = document.createElement('a');
                                tableLink.href = '#';
                                tableLink.classList.add('table-link');
                                tableLink.textContent = subgrupo.titulo;

                                const url = subgrupo.url;

                                tableLink.addEventListener('click', (e) => {
                                    e.preventDefault();
                                    openPopupWithTable(url, subgrupo.titulo);
                                });

                                linksContainer.appendChild(tableLink);
                            });
                        }
                        
                        groupContainer.appendChild(linksContainer);

                        tablesPlaceholder.appendChild(groupContainer);
                    });
                }
            } else {
                console.error('Produto não encontrado!');
            }
        })
        .catch(error => console.error('Erro ao carregar os dados dos produtos:', error));
});

const popupOverlay = document.getElementById('popup-overlay');
const closePopupBtn = document.querySelector('.close-popup-btn');
const popupContent = document.getElementById('popup-content');

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

function closePopup() {
    popupOverlay.classList.remove('active');
    popupContent.innerHTML = '';
}

if (closePopupBtn) {
    closePopupBtn.addEventListener('click', closePopup);
}

if (popupOverlay) {
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });
}