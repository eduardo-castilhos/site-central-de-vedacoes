async function loadHeader() {
    try {
        const response = await fetch('components/header.html');
        const headerHtml = await response.text();
        const headerPlaceholder = document.getElementById('header-placeholder');

        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = headerHtml;
            // Chama a função para configurar o menu após o cabeçalho ser carregado
            setupNavMenu();
        }
    } catch (error) {
        console.error('Erro ao carregar o cabeçalho:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadHeader);