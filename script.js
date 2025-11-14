// Ambil history dari localStorage
let historyLinks = JSON.parse(localStorage.getItem('historyLinks')) || [];
updateHistory();

function isValidURL(url) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+
      '([\\da-z.-]+)\\.([a-z.]{2,6})'+
      '([\\/\\w .-]*)*\\/?$');
    return pattern.test(url);
}

function generateRandomString(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function generateURL() {
    const original = document.getElementById('originalURL').value.trim();
    let name = document.getElementById('siteName').value.trim();
    const domain = document.getElementById('domain').value.trim();

    if (!original || !name || !domain) {
        alert("Isi semua field dulu!");
        return;
    }

    if (!isValidURL(original)) {
        alert("Link asli tidak valid!");
        return;
    }

    // Cek nama sama di history, kalo ada tambahin random angka
    let exists = historyLinks.some(item => item.name === name && item.domain === domain);
    if (exists) {
        name += generateRandomString(3);
    }

    const newURL = `https://${name}.${domain}`;
    document.getElementById('result').innerHTML = `Link generate: <a href="${original}" target="_blank">${newURL}</a> <button onclick="copyLink('${newURL}')">Copy</button>`;

    // Simpan ke history
    historyLinks.push({ name, domain, original });
    localStorage.setItem('historyLinks', JSON.stringify(historyLinks));
    updateHistory();
}

function updateHistory() {
    const historyEl = document.getElementById('history');
    historyEl.innerHTML = '';
    historyLinks.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${item.name}.${item.domain} → ${item.original}</span> <button onclick="copyLink('https://${item.name}.${item.domain}')">Copy</button>`;
        historyEl.appendChild(li);
    });
}

function copyLink(link) {
    navigator.clipboard.writeText(link);
    alert(`Link ${link} berhasil dicopy!`);
}
