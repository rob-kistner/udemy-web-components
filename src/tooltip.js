// prettier-ignore
class Tooltip extends HTMLElement {
  constructor() {
    super()
    this._tooltipContainer
    this._tooltipText = 'Dummy tooltip text'

    this.attachShadow({ mode: 'open' })

    /**
     * The ::slotted() selector below allows you
     * to style elements from the light DOM,
     * whereas just .highlight {} gets ignored 
     * since it's already set in the light DOM.
     * 
     * HOWEVER: Specificity states the light DOM
     * styling overrides shadow DOM for projected
     * or slotted content. !important will override
     * that, per standard css.
     */
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
        .highlight {
          background: red;
        }
        ::slotted(.highlight) {
          border-bottom: 2px solid red;
          background-color: red;
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
    const tooltipIcon = 
      this.shadowRoot.querySelector('span')

    tooltipIcon.addEventListener(
      'mouseenter', 
      this._showTooltip.bind(this)
      )
    tooltipIcon.addEventListener(
      'mouseleave', 
      this._hideTooltip.bind(this)
      )

    this.shadowRoot.appendChild(tooltipIcon)

    this.style.position = 'relative'
  }

  _showTooltip() {
    this._tooltipContainer = 
      document.createElement('div')
    this._tooltipContainer.textContent = 
      this._tooltipText
    this.shadowRoot.appendChild(this._tooltipContainer)
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(
      this._tooltipContainer
    )
  }
}

customElements.define('uc-tooltip', Tooltip)
