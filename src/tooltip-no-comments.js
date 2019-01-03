class Tooltip extends HTMLElement {
  constructor() {
    super()
    this._tooltipContainer
    this._tooltipText = 'Dummy tooltip text'
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        div {
          background-color: #666;
          color: white;
          position: absolute;
          z-index: 10;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }
      </style>
        <slot>DEFAULT SLOT TEXT</slot>
      <span>(?)</span>
    `
  }

  connectedCallback() {
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text')
    }
    const tooltipIcon = this.shadowRoot.querySelector('span')

    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))

    this.shadowRoot.appendChild(tooltipIcon)
    this.style.position = 'relative'
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div')
    this._tooltipContainer.textContent = this._tooltipText
    this.shadowRoot.appendChild(this._tooltipContainer)
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer)
  }
}

customElements.define('uc-tooltip', Tooltip)
