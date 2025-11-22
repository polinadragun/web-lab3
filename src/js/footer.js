class AppFooter extends HTMLElement {
    connectedCallback() {
        fetch('./footer.html')
            .then(r => r.text())
            .then(html => this.innerHTML = html);
    }
}

customElements.define('app-footer', AppFooter);
