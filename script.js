function isValidURL(url) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '([\\da-z.-]+)\\.([a-z.]{2,6})'+ // domain
      '([\\/\\w .-]*)*\\/?$'); // path
    return pattern.test(url);
}

function generateURL() {
    const original = document.getElementById('originalURL').value.trim();
    const name = document.getElementById('siteName').value.trim();
    const domain = document.getElementById('domain').value.trim();

    if (!original || !name || !domain) {
        alert("Isi semua field dulu!");
        return;
    }

    if (!isValidURL(original)) {
        alert("Link asli tidak valid!");
        return;
    }

    const newURL = `https://${name}.${domain}`;
    document.getElementById('result').innerHTML = `Link generate: <a href="${original}" target="_blank">${newURL}</a>`;
}
