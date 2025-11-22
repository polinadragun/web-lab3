document.addEventListener("DOMContentLoaded", () => {
    class AppContact extends HTMLElement {
        connectedCallback() {
            fetch('/contact.html')
                .then(r => r.text())
                .then(html => this.innerHTML = html);
        }
    }

    customElements.define('app-contact', AppContact);
});
