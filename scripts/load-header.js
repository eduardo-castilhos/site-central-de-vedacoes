async function loadHeader() {
    try {
        const response = await fetch('components/header.html');
        const headerHtml = await response.text();
        const headerPlaceholder = document.getElementById('header-placeholder');

        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = headerHtml;
        }
    } catch (error) {
        console.error('Erro ao carregar o cabeçalho:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadHeader);