// js/a11y.js
// Gerenciamento de Acessibilidade (Foco, Teclado, ARIA)

console.log('[A11y] Inicializando gerenciador de acessibilidade...');

export const a11yManager = {
    // Elemento que tinha foco antes de abrir o modal
    lastFocusedElement: null,

    // ===== ABERTURA DE MODAL =====
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        // Salva o elemento atual
        this.lastFocusedElement = document.activeElement;

        // Mostra o modal
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');

        // Foca no primeiro elemento interativo
        setTimeout(() => {
            const focusable = this.getFocusableElements(modal);
            if (focusable.length > 0) {
                focusable[0].focus();
            }
        }, 100);

        // Adiciona listener de trap de foco
        modal.addEventListener('keydown', this.trapFocus);
        
        // Bloqueia scroll do body
        document.body.style.overflow = 'hidden';
    },

    // ===== FECHAMENTO DE MODAL =====
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        modal.removeEventListener('keydown', this.trapFocus);

        // Restaura scroll
        document.body.style.overflow = '';

        // Restaura foco
        if (this.lastFocusedElement) {
            this.lastFocusedElement.focus();
        }
    },

    // ===== TRAP DE FOCO (Mantém o foco dentro do modal) =====
    trapFocus(e) {
        if (e.key !== 'Tab') return;

        const modal = e.currentTarget;
        const focusable = a11yManager.getFocusableElements(modal);
        
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
        } else {
            if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    },

    // ===== LISTA DE ELEMENTOS FOCÁVEIS =====
    getFocusableElements(container) {
        const selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        return Array.from(container.querySelectorAll(selector))
            .filter(el => !el.disabled && el.offsetParent !== null);
    },

    // ===== ANÚNCIOS PARA LEITORES DE TELA =====
    announce(message, priority = 'polite') {
        let announcer = document.getElementById('a11y-announcer');
        if (!announcer) {
            announcer = document.createElement('div');
            announcer.id = 'a11y-announcer';
            announcer.setAttribute('aria-live', priority);
            announcer.setAttribute('aria-atomic', 'true');
            announcer.className = 'sr-only'; // Esconde visualmente
            document.body.appendChild(announcer);
        }
        
        // Limpa e redefine para forçar leitura
        announcer.textContent = '';
        setTimeout(() => { announcer.textContent = message; }, 100);
    }
};

// ===== INICIALIZAÇÃO GLOBAL =====
document.addEventListener('keydown', (e) => {
    // ESC fecha o modal ativo
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            a11yManager.closeModal(activeModal.id);
        }
    }
});

console.log('[A11y] ✅ Gerenciador de acessibilidade ativo');
