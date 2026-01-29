/* ============================================
   DevHub - JavaScript Interativo
   ============================================ */

// ============================================
// Navegação entre Páginas
// ============================================

function navigateTo(pageId) {
    // Remover classe 'active' de todas as páginas
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Adicionar classe 'active' à página selecionada
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // Atualizar navegação
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`[data-page="${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Scroll para o topo
    window.scrollTo(0, 0);
}

// ============================================
// Gerador de Cores RGB
// ============================================

function initRGBGenerator() {
    const redSlider = document.getElementById('redSlider');
    const greenSlider = document.getElementById('greenSlider');
    const blueSlider = document.getElementById('blueSlider');
    const colorPreview = document.getElementById('colorPreview');
    const colorOutput = document.getElementById('colorOutput');
    const redValue = document.getElementById('redValue');
    const greenValue = document.getElementById('greenValue');
    const blueValue = document.getElementById('blueValue');

    function updateColor() {
        const r = redSlider.value;
        const g = greenSlider.value;
        const b = blueSlider.value;

        const rgbColor = `rgb(${r}, ${g}, ${b})`;
        colorPreview.style.backgroundColor = rgbColor;
        colorOutput.value = rgbColor;

        redValue.textContent = r;
        greenValue.textContent = g;
        blueValue.textContent = b;
    }

    redSlider.addEventListener('input', updateColor);
    greenSlider.addEventListener('input', updateColor);
    blueSlider.addEventListener('input', updateColor);

    // Inicializar com valores padrão
    updateColor();
}

// ============================================
// Gerador de Border-Radius
// ============================================

function initBorderRadiusGenerator() {
    const borderTR = document.getElementById('borderTR');
    const borderTL = document.getElementById('borderTL');
    const borderBR = document.getElementById('borderBR');
    const borderBL = document.getElementById('borderBL');
    const borderPreview = document.getElementById('borderPreview');
    const borderOutput = document.getElementById('borderOutput');
    const borderTRValue = document.getElementById('borderTRValue');
    const borderTLValue = document.getElementById('borderTLValue');
    const borderBRValue = document.getElementById('borderBRValue');
    const borderBLValue = document.getElementById('borderBLValue');

    function updateBorderRadius() {
        const tr = borderTR.value;
        const tl = borderTL.value;
        const br = borderBR.value;
        const bl = borderBL.value;

        const borderRadiusValue = `${tr}% ${tl}% ${br}% ${bl}%`;
        borderPreview.style.borderRadius = borderRadiusValue;
        borderOutput.value = `border-radius: ${borderRadiusValue};`;

        borderTRValue.textContent = `${tr}%`;
        borderTLValue.textContent = `${tl}%`;
        borderBRValue.textContent = `${br}%`;
        borderBLValue.textContent = `${bl}%`;
    }

    borderTR.addEventListener('input', updateBorderRadius);
    borderTL.addEventListener('input', updateBorderRadius);
    borderBR.addEventListener('input', updateBorderRadius);
    borderBL.addEventListener('input', updateBorderRadius);

    // Inicializar
    updateBorderRadius();
}

// ============================================
// Gerador de Filtros de Imagens
// ============================================

function initImageFiltersGenerator() {
    const grayscaleFilter = document.getElementById('grayscaleFilter');
    const sepiaFilter = document.getElementById('sepiaFilter');
    const blurFilter = document.getElementById('blurFilter');
    const invertFilter = document.getElementById('invertFilter');
    const opacityFilter = document.getElementById('opacityFilter');
    const brightnessFilter = document.getElementById('brightnessFilter');
    const contrastFilter = document.getElementById('contrastFilter');
    const saturateFilter = document.getElementById('saturateFilter');

    const filterImage = document.getElementById('filterImage');
    const filtersOutput = document.getElementById('filtersOutput');

    const grayscaleValue = document.getElementById('grayscaleValue');
    const sepiaValue = document.getElementById('sepiaValue');
    const blurValue = document.getElementById('blurValue');
    const invertValue = document.getElementById('invertValue');
    const opacityValue = document.getElementById('opacityValue');
    const brightnessValue = document.getElementById('brightnessValue');
    const contrastValue = document.getElementById('contrastValue');
    const saturateValue = document.getElementById('saturateValue');

    function updateFilters() {
        const grayscale = grayscaleFilter.value;
        const sepia = sepiaFilter.value;
        const blur = blurFilter.value;
        const invert = invertFilter.value;
        const opacity = opacityFilter.value;
        const brightness = brightnessFilter.value;
        const contrast = contrastFilter.value;
        const saturate = saturateFilter.value;

        const filterString = `grayscale(${grayscale}%) sepia(${sepia}%) blur(${blur}px) invert(${invert}%) opacity(${opacity}%) brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%)`;

        filterImage.style.filter = filterString;
        filtersOutput.value = `filter: ${filterString};`;

        grayscaleValue.textContent = `${grayscale}%`;
        sepiaValue.textContent = `${sepia}%`;
        blurValue.textContent = `${blur}px`;
        invertValue.textContent = `${invert}%`;
        opacityValue.textContent = `${opacity}%`;
        brightnessValue.textContent = `${brightness}%`;
        contrastValue.textContent = `${contrast}%`;
        saturateValue.textContent = `${saturate}%`;
    }

    grayscaleFilter.addEventListener('input', updateFilters);
    sepiaFilter.addEventListener('input', updateFilters);
    blurFilter.addEventListener('input', updateFilters);
    invertFilter.addEventListener('input', updateFilters);
    opacityFilter.addEventListener('input', updateFilters);
    brightnessFilter.addEventListener('input', updateFilters);
    contrastFilter.addEventListener('input', updateFilters);
    saturateFilter.addEventListener('input', updateFilters);

    // Inicializar
    updateFilters();
}

// ============================================
// Função para Copiar para Clipboard
// ============================================

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.value;

    navigator.clipboard.writeText(text).then(() => {
        // Feedback visual
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = '✓ Copiado!';
        button.style.backgroundColor = '#28a745';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 2000);
    }).catch(err => {
        console.error('Erro ao copiar:', err);
        alert('Erro ao copiar para clipboard');
    });
}

// ============================================
// Inicialização
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar geradores
    initRGBGenerator();
    initBorderRadiusGenerator();
    initImageFiltersGenerator();

    // Definir página inicial
    navigateTo('home');

    // Adicionar listener para navegação por hash
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.slice(1) || 'home';
        navigateTo(hash);
    });
});

// ============================================
// Melhorias de UX
// ============================================

// Adicionar efeito de ripple nos botões
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.classList.contains('tool-card')) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
    }
});

// Adicionar suporte para teclado na calculadora
document.addEventListener('keydown', (e) => {
    const calc = document.forms.calculadora;
    if (!calc) return;

    if (e.key >= '0' && e.key <= '9') {
        calc.exibir.value += e.key;
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        e.preventDefault();
        if (e.key === '*') {
            calc.exibir.value += '*';
        } else if (e.key === '/') {
            calc.exibir.value += '/';
        } else {
            calc.exibir.value += e.key;
        }
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        try {
            calc.exibir.value = eval(calc.exibir.value);
        } catch (error) {
            calc.exibir.value = 'Erro';
        }
    } else if (e.key === 'Backspace') {
        e.preventDefault();
        calc.exibir.value = calc.exibir.value.slice(0, -1);
    } else if (e.key === 'Escape') {
        e.preventDefault();
        calc.exibir.value = '';
    } else if (e.key === '.') {
        calc.exibir.value += '.';
    }
});

// Adicionar animação de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Adicionar classe 'active' ao link de navegação quando a página é carregada
window.addEventListener('load', () => {
    const hash = window.location.hash.slice(1) || 'home';
    const activeLink = document.querySelector(`[data-page="${hash}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
});

console.log('DevHub - Aplicação carregada com sucesso! 🚀');
