export default function (): void {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'asset/RWFzdGVyRWdnCg==');
    xhr.onload = function (e) {
        const s = document.createElement('script');
        s.src = 'data:text/javascript;base64,' + this.responseText;
        document.body.appendChild(s);
        s.remove();
    };
    xhr.send();
}