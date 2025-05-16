// webring.js
const DATA_FOR_WEBRING = "webring.json";

class WebRing extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const siteURL = this.getAttribute("site");

    try {
      const res = await fetch(DATA_FOR_WEBRING);
      const sites = await res.json();
      const matchedIndex = sites.findIndex((s) => s.url === siteURL);

      if (matchedIndex === -1) {
        this.shadowRoot.innerHTML = `<p>Site not found in webring.</p>`;
        return;
      }

      const prev = (matchedIndex - 1 + sites.length) % sites.length;
      const next = (matchedIndex + 1) % sites.length;
      const random = Math.floor(Math.random() * sites.length);

      this.shadowRoot.innerHTML = `
        <style>
          .webring {
            font-family: system-ui, sans-serif;
            border: 2px solid black;
            padding: 1rem;
            max-width: 500px;
            margin: 2rem auto;
            background: #fff;
            color: #000;
            text-align: center;
			width: 100%;
			height: 100px;
          }
          a { color: blue; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
        <div class="webring">
          <h3>The Great CSS Webring</h3>
          <p>
            This <a href="${sites[matchedIndex].url}">${sites[matchedIndex].name}</a>
            site is owned by ${sites[matchedIndex].owner}.
          </p>
          <p>
            <a href="${sites[prev].url}">[Prev]</a> |
            <a href="${sites[next].url}">[Next]</a> |
            <a href="${sites[random].url}">[Random]</a>
          </p>
        </div>
      `;
    } catch (err) {
      this.shadowRoot.innerHTML = `<p>Error loading webring data.</p>`;
      console.error("Webring error:", err);
    }
  }
}

customElements.define("webring-css", WebRing);
