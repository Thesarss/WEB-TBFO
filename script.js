class TranslateM {
    constructor() {
        this.state = 'q0';
        this.tape = Array(100).fill(' ');
        this.headPosition = 50;
    }

    // Gerak kepala ke kiri
    gerakKeKiri() {
        this.headPosition -= 1;
    }

    // Gerak kepala ke kanan
    gerakKeKanan() {
        this.headPosition += 1;
    }

    // Membaca simbol dari pita
    bacaSimbol() {
        return this.tape[this.headPosition];
    }

    // Menulis simbol pada pita
    tulisSimbol(simbol) {
        this.tape[this.headPosition] = simbol;
    }

    // Logika transisi
    transisi(simbolInput) {
        if (this.state === 'q0') {
            if (simbolInput === '.') {
                this.tulisSimbol('.');
                this.gerakKeKanan();
                this.state = 'q1';
            } else if (simbolInput === '-') {
                this.tulisSimbol('-');
                this.gerakKeKanan();
                this.state = 'q2';
            } else if (simbolInput === ' ') {
                this.gerakKeKanan();
            } else {
                this.gerakKeKanan();
            }
        } else if (this.state === 'q1' || this.state === 'q2') {
            if (simbolInput === '.' || simbolInput === '-') {
                this.tulisSimbol(simbolInput);
                this.gerakKeKanan();
            } else if (simbolInput === ' ') {
                this.state = 'q0';
            } else {
                this.state = 'q0';
            }
        }
    }

    // Konversi teks ke Morse
    charKeMorse(text) {
        const morseDict = {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
            'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
            'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
            'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
            'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
            '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
            '9': '----.', '0': '-----', '/': ' ', '?': '..--..'
        };
        return text.toUpperCase().split('').map(char => morseDict[char] || '').join(' ');
    }

    // Konversi Morse ke teks
    morseKeChar(morseCode) {
        const reverseMorseDict = {
            '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
            '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
            '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
            '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
            '-.--': 'Y', '--..': 'Z', '.----': '1', '..---': '2', '...--': '3',
            '....-': '4', '.....': '5', '-....': '6', '--...': '7', '---..': '8',
            '----.': '9', '-----': '0', '/': ' ', '..--..': '?'
        };
        return morseCode.split(' ').map(code => reverseMorseDict[code] || '').join('');
    }
}

let translateM = new TranslateM();
let mode = 'textToMorse'; // Mode default

function setMode(newMode) {
    mode = newMode;
    const placeholder = mode === 'textToMorse' ? 'Masukkan Teks...' : 'Masukkan Kode Morse...';
    document.getElementById('inputField').placeholder = placeholder;
    document.getElementById('output').innerText = '';
}

function convert() {
    const input = document.getElementById('inputField').value.trim();
    let output = '';
    if (mode === 'textToMorse') {
        output = translateM.charKeMorse(input);
    } else if (mode === 'morseToText') {
        output = translateM.morseKeChar(input);
    }
    document.getElementById('output').innerText = output || 'Invalid input!';
}
