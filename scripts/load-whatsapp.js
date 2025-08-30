async function loadWhatsapp() {
    try {
        const response = await fetch('components/whatsapp.html');
        const headerHtml = await response.text();
        const headerPlaceholder = document.getElementById('whatsapp-placeholder');

        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = headerHtml;
        }
    } catch (error) {
        console.error('Erro ao carregar o whatsapp:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadWhatsapp);