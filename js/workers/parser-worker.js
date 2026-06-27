// js/workers/parser-worker.js
// Web Worker para processamento pesado (CSV/JSON) sem travar a UI

self.onmessage = function(e) {
    const { type, data } = e.data;

    try {
        let result;
        
        if (type === 'parse-csv') {
            result = parseCSV(data);
        } else if (type === 'validate-json') {
            result = validateAndParseJSON(data);
        } else if (type === 'generate-backup') {
            result = generateBackup(data);
        }

        self.postMessage({ type: `${type}-success`, result });
    } catch (error) {
        self.postMessage({ type: `${type}-error`, error: error.message });
    }
};

// ===== PARSER CSV OTIMIZADO =====
function parseCSV(text) {
    const rows = [];
    const lines = text.split(/\r?\n/).filter(l => l.trim());
    
    if (lines.length === 0) throw new Error('CSV vazio');

    // Detecta delimitador
    const delimiter = detectDelimiter(lines[0]);

    for (let i = 0; i < lines.length; i++) {
        rows.push(parseLine(lines[i], delimiter));
    }

    return { rows, total: rows.length };
}

function detectDelimiter(sample) {
    const delimiters = [';', ',', '\t', '|'];
    const counts = delimiters.map(d => ({
        d,
        count: (sample.match(new RegExp('\\' + d, 'g')) || []).length
    }));
    counts.sort((a, b) => b.count - a.count);
    return counts[0].count > 0 ? counts[0].d : ';';
}

function parseLine(line, delimiter) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (c === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (c === delimiter && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += c;
        }
    }
    result.push(current.trim());
    return result;
}

// ===== VALIDADOR JSON =====
function validateAndParseJSON(text) {
    // Remove BOM se existir
    if (text.charCodeAt(0) === 0xFEFF) text = text.substring(1);
    text = text.trim();
    
    if (!text) throw new Error('Arquivo vazio');
    
    const data = JSON.parse(text);
    
    // Validação básica de schema
    const required = ['version', 'transactions', 'categories', 'accounts', 'cards', 'investments'];
    const missing = required.filter(f => !(f in data));
    
    if (missing.length > 0) {
        throw new Error(`Campos faltando: ${missing.join(', ')}`);
    }

    return { valid: true, data };
}

// ===== GERADOR DE BACKUP =====
function generateBackup(payload) {
    return JSON.stringify(payload, null, 2);
}
