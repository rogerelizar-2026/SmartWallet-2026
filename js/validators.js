// js/validators.js
// Validação forte para CSV e JSON

console.log('[Validators] Registrando validadores...');

export class ValidationError extends Error {
    constructor(message, details = {}) {
        super(message);
        this.name = 'ValidationError';
        this.details = details;
    }
}

export const validators = {
    // ===== VALIDAÇÃO DE BACKUP JSON =====
    validateBackupSchema(data) {
        const errors = [];

        if (typeof data !== 'object' || data === null || Array.isArray(data)) {
            throw new ValidationError('Backup deve ser um objeto JSON válido');
        }

        // Campos obrigatórios
        const requiredFields = ['version', 'transactions', 'categories', 'accounts', 'cards', 'investments'];
        requiredFields.forEach(field => {
            if (!(field in data)) {
                errors.push(`Campo obrigatório faltando: ${field}`);
            }
        });

        // Valida version
        if (typeof data.version !== 'number') {
            errors.push('Campo "version" deve ser um número');
        } else if (data.version > 3) {
            errors.push(`Versão ${data.version} é mais recente que a suportada (3)`);
        }

        // Valida arrays
        ['transactions', 'categories', 'accounts', 'cards', 'investments'].forEach(field => {
            if (data[field] !== undefined && !Array.isArray(data[field])) {
                errors.push(`Campo "${field}" deve ser um array`);
            }
        });

        // Valida transações
        if (Array.isArray(data.transactions)) {
            data.transactions.forEach((t, idx) => {
                const tErrors = this.validateTransaction(t);
                if (tErrors.length > 0) {
                    errors.push(`Transação #${idx}: ${tErrors.join(', ')}`);
                }
            });
        }

        if (errors.length > 0) {
            throw new ValidationError('Backup inválido', { errors });
        }

        return true;
    },

    // ===== VALIDAÇÃO DE TRANSAÇÃO =====
    validateTransaction(t) {
        const errors = [];
        
        if (!t.id) errors.push('id obrigatório');
        if (!t.date || !/^\d{4}-\d{2}-\d{2}$/.test(t.date)) {
            errors.push('data inválida (formato YYYY-MM-DD)');
        }
        if (typeof t.amount !== 'number' || isNaN(t.amount)) {
            errors.push('amount deve ser número');
        }
        if (!t.category) errors.push('category obrigatório');
        if (!t.paymentMethod) errors.push('paymentMethod obrigatório');
        
        return errors;
    },

    // ===== VALIDAÇÃO DE TAMANHO DE ARQUIVO =====
    validateFileSize(file, maxSizeMB = 10) {
        const sizeMB = file.size / 1024 / 1024;
        if (sizeMB > maxSizeMB) {
            throw new ValidationError(
                `Arquivo muito grande: ${sizeMB.toFixed(2)}MB (máximo: ${maxSizeMB}MB)`
            );
        }
    },

    // ===== VALIDAÇÃO DE EXTENSÃO =====
    validateFileExtension(file, allowedExtensions) {
        const ext = file.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(ext)) {
            throw new ValidationError(
                `Extensão .${ext} não suportada. Aceitas: ${allowedExtensions.join(', ')}`
            );
        }
    },

    // ===== VALIDAÇÃO DE CSV =====
    validateCSV(rows, maxRows = 50000) {
        if (rows.length < 2) {
            throw new ValidationError('CSV vazio ou sem dados');
        }

        if (rows.length > maxRows) {
            throw new ValidationError(
                `CSV muito grande: ${rows.length} linhas (máx: ${maxRows})`
            );
        }

        const header = rows[0].map(h => h.toLowerCase().trim());
        const requiredCols = ['data', 'valor'];
        const missing = requiredCols.filter(c => !header.includes(c));
        
        if (missing.length > 0) {
            throw new ValidationError(`Colunas obrigatórias faltando: ${missing.join(', ')}`);
        }

        return { header, valid: true };
    },

    // ===== VALIDAÇÃO DE CATEGORIA =====
    validateCategory(cat) {
        const errors = [];
        if (!cat.name) errors.push('Nome obrigatório');
        if (!cat.type || !['expense', 'income'].includes(cat.type)) {
            errors.push('Tipo deve ser "expense" ou "income"');
        }
        return errors;
    },

    // ===== VALIDAÇÃO DE CARTÃO =====
    validateCard(card) {
        const errors = [];
        if (!card.name) errors.push('Nome obrigatório');
        if (!card.closingDay || card.closingDay < 1 || card.closingDay > 31) {
            errors.push('Dia de fechamento inválido (1-31)');
        }
        if (!card.dueDay || card.dueDay < 1 || card.dueDay > 31) {
            errors.push('Dia de vencimento inválido (1-31)');
        }
        if (typeof card.limit !== 'number' || card.limit <= 0) {
            errors.push('Limite deve ser número positivo');
        }
        return errors;
    },

    // ===== VALIDAÇÃO DE CONTA =====
    validateAccount(acc) {
        const errors = [];
        if (!acc.name) errors.push('Nome obrigatório');
        if (!acc.type || !['checking', 'investment'].includes(acc.type)) {
            errors.push('Tipo deve ser "checking" ou "investment"');
        }
        return errors;
    },

    // ===== VALIDAÇÃO DE INVESTIMENTO =====
    validateInvestment(inv) {
        const errors = [];
        if (!inv.name) errors.push('Nome obrigatório');
        if (typeof inv.initial !== 'number' || inv.initial < 0) {
            errors.push('Valor inicial deve ser número não-negativo');
        }
        if (typeof inv.current !== 'number' || inv.current < 0) {
            errors.push('Valor atual deve ser número não-negativo');
        }
        return errors;
    }
};
