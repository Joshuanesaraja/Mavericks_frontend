import CryptoJS from "crypto-js";

const AES_KEY = process.env.REACT_APP_AES_KEY;

if (!AES_KEY) {
    throw new Error("REACT_APP_AES_KEY is not configured");
}

function getKey() {
    return CryptoJS.SHA256(AES_KEY);
}

export function encryptData(data) {
    const plaintext = JSON.stringify(data);

    const key = getKey();
    const iv = CryptoJS.lib.WordArray.random(16);

    const encrypted = CryptoJS.AES.encrypt(
        plaintext,
        key,
        {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    );

    const combined = iv.clone().concat(encrypted.ciphertext);

    return CryptoJS.enc.Base64.stringify(combined);
}

export function decryptData(encryptedData) {
    const combined = CryptoJS.enc.Base64.parse(encryptedData);

    const iv = CryptoJS.lib.WordArray.create(
        combined.words.slice(0, 4),
        16
    );

    const ciphertext = CryptoJS.lib.WordArray.create(
        combined.words.slice(4),
        combined.sigBytes - 16
    );

    const decrypted = CryptoJS.AES.decrypt(
        {
            ciphertext
        },
        getKey(),
        {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    );

    const plaintext = decrypted.toString(CryptoJS.enc.Utf8);

    if (!plaintext) {
        throw new Error("AES decryption failed");
    }

    return JSON.parse(plaintext);
}