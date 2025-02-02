function caesarCipher(message, shift) {
    return message
        .split('')
        .map(char => {
            if (/[a-zA-Z]/.test(char)) {
                const base = char === char.toLowerCase() ? 97 : 65;
                return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
            }
            return char;
        })
        .join('');
}

function vigenereCipher(message, keyword) {
    const keywordRepeat = keyword.repeat(Math.ceil(message.length / keyword.length)).slice(0, message.length);
    return message
        .split('')
        .map((char, i) => {
            if (/[a-zA-Z]/.test(char)) {
                const base = char === char.toLowerCase() ? 97 : 65;
                const shift = keywordRepeat[i].toLowerCase().charCodeAt(0) - 97;
                return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
            }
            return char;
        })
        .join('');
}

function atbashCipher(message) {
    return message
        .split('')
        .map(char => {
            if (/[a-zA-Z]/.test(char)) {
                const base = char === char.toLowerCase() ? 97 : 65;
                return String.fromCharCode(base + (25 - (char.charCodeAt(0) - base)));
            }
            return char;
        })
        .join('');
}

function vernamCipher(message, key) {
    if (key.length !== message.length) {
        alert("Для шифра Вернама ключ должен быть равен по длине сообщению.");
        return '';
    }
    return message
        .split('')
        .map((char, i) => {
            if (/[a-zA-Z]/.test(char)) {
                const base = char === char.toLowerCase() ? 97 : 65;
                const shift = key[i].toLowerCase().charCodeAt(0) - base;
                return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
            }
            return char;
        })
        .join('');
}

function encryptMessage() {
    const message = document.getElementById("message").value;
    const method = document.getElementById("method").value;
    const key = document.getElementById("key").value;
    let encryptedMessage = '';

    if (method === "caesar") {
        const shift = parseInt(key);
        if (isNaN(shift)) {
            alert("Введите корректное числовое значение для шифра Цезаря.");
            return;
        }
        encryptedMessage = caesarCipher(message, shift);
    } else if (method === "vigenere") {
        if (!/^[a-zA-Z]+$/.test(key)) {
            alert("Введите слово, содержащее только буквы, для шифра Виженера.");
            return;
        }
        encryptedMessage = vigenereCipher(message, key);
    } else if (method === "atbash") {
        encryptedMessage = atbashCipher(message);
    } else if (method === "vernam") {
        encryptedMessage = vernamCipher(message, key);
    }
    
    document.getElementById("output").innerText = encryptedMessage;
}    
