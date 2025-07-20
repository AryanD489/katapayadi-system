// React CryptoDemo App with external CSS
import { useState } from "react";
import "./CryptoDemo.css";

export default function CryptoDemo() {
  const [input, setInput] = useState("");
  const [shift, setShift] = useState(3);
  const [result, setResult] = useState("");

  const katapayadiMap = {
    ka: 1, kha: 2, ga: 3, gha: 4, nga: 5,
    ca: 6, cha: 6, ja: 6, jha: 6, nya: 6,
    ta: 1, tha: 2, da: 3, dha: 4, na: 5,
    pa: 1, pha: 2, ba: 3, bha: 4, ma: 5,
    ya: 1, ra: 2, la: 3, va: 4,
    sha: 0, ssa: 0, sa: 0, ha: 0
  };

  const extractKatapayadi = (word) => {
    const lower = word.toLowerCase();
    const syllables = [];
    let i = 0;
    while (i < lower.length) {
      let matched = false;
      for (let len = 3; len >= 1; len--) {
        const part = lower.substring(i, i + len);
        if (katapayadiMap[part] !== undefined) {
          syllables.push(part);
          i += len;
          matched = true;
          break;
        }
      }
      if (!matched) i++;
    }
    return syllables.reverse().map(s => katapayadiMap[s]).join("");
  };

  const caesarCipher = (text, shift) => {
    return text.split('').map(c => {
      if (/[a-z]/.test(c)) {
        return String.fromCharCode((c.charCodeAt(0) - 97 + shift) % 26 + 97);
      } else if (/[A-Z]/.test(c)) {
        return String.fromCharCode((c.charCodeAt(0) - 65 + shift) % 26 + 65);
      } else return c;
    }).join('');
  };

  const hideMessage = (cover, secret) => {
    return cover + secret.split('').map(c => "\u200b" + c).join('');
  };

  const extractMessage = (encoded) => {
    let result = "";
    for (let i = 1; i < encoded.length; i++) {
      if (encoded[i - 1] === '\u200b') result += encoded[i];
    }
    return result;
  };

  return (
    <div className="crypto-container">
      <h1 className="crypto-title">Ancient Cryptography vs Modern Encryption</h1>

      <div className="crypto-section">
        <h2 className="crypto-heading">Katapayadi</h2>
        <input className="crypto-input" placeholder="Enter word" value={input} onChange={(e) => setInput(e.target.value)} />
        <button className="crypto-button" onClick={() => setResult(extractKatapayadi(input))}>Encode</button>
        <p className="crypto-output">Result: {result}</p>
      </div>

      <div className="crypto-section">
        <h2 className="crypto-heading">Caesar Cipher</h2>
        <input className="crypto-input" placeholder="Enter message" value={input} onChange={(e) => setInput(e.target.value)} />
        <input className="crypto-input" type="number" placeholder="Shift (e.g., 3)" value={shift} onChange={(e) => setShift(parseInt(e.target.value))} />
        <button className="crypto-button" onClick={() => setResult(caesarCipher(input, shift))}>Encrypt</button>
        <p className="crypto-output">Encrypted: {result}</p>
      </div>

      <div className="crypto-section">
        <h2 className="crypto-heading">Steganography</h2>
        <input className="crypto-input" placeholder="Enter cover text" value={input} onChange={(e) => setInput(e.target.value)} />
        <input className="crypto-input" placeholder="Enter secret message" onBlur={(e) => setResult(hideMessage(input, e.target.value))} />
        <button className="crypto-button" onClick={() => setResult(extractMessage(input))}>Extract Hidden</button>
        <p className="crypto-output">Output: {result}</p>
      </div>
    </div>
  );
}
