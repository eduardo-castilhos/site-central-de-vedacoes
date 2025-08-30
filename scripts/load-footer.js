async function loadFooter() {
    try {
        const response = await fetch('components/footer.html');
        const footerHtml = await response.text();
        const footerPlaceholder = document.getElementById('footer-placeholder');

        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = footerHtml;
        }
    } catch (error) {
        console.error('Erro ao carregar o footer:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadFooter);