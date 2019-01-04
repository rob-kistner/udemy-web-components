class ShowInfo extends HTMLElement {
  constructor() {
    super()

    this._isVisible = false

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        #info-box {
          display: none;
        }
      </style>
      
      <button id="info-button">Show</button>
      <p id="info-box">
        <slot>SLOT DEFAULT: INFO BOX</slot>
      </p>
    `

    this._infoButton = this.shadowRoot.querySelector('#info-button')
    this._infoBox = this.shadowRoot.querySelector('#info-box')

    this._infoButton.addEventListener('click', this._showInfo.bind(this))
  }

  connectedCallback() {
    // set defaults on actual dom item
    // based on is-visible parameter
    if (this.hasAttribute('is-visible')) {
      if (this.getAttribute('is-visible') === 'true') {
        this._isVisible = true
        this._infoBox.style.display = 'block'
        this._infoButton.textContent = 'Hide'
      }
    }
  }

  _showInfo() {
    this._isVisible = !this._isVisible

    this._infoBox.style.display = this._isVisible ? 'block' : 'none'
    this._infoButton.textContent = this._isVisible ? 'Hide' : 'Show'
  }
}

customElements.define('uc-show-info', ShowInfo)
