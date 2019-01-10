// prettier-ignore
class Tooltip extends HTMLElement {
  constructor() {
    super()
    this._tooltipContainer
    this._tooltipIcon
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
     * 
     * The :host style below allows you to style 
     * the whole web component from within the js.
     * As opposed to setting a style outside in the 
     * light DOM by component name (i.e.: uc-tooltip {})
     * 
     * Conditional :host styling...
     * :host(.important) {} will look for the
     * .important class attached to all components
     * and will style any that has the class
     * 
     * :host-context() {} will allow you to style
     * content with certain surrounding conditions
     */
    this.shadowRoot.innerHTML = `
      <style>
        div {
          font-weight: normal;
          background-color: #666;
          color: white;
          position: absolute;
          top: 1.5rem;
          left: 0.75rem;
          z-index: 10;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          box-shadow: 1px 1px 6px rgba(0,0,0,0.25);
        }
        
        :host(.important) {
          background-color: var(--color-primary);
          padding: 0.5rem 0.75rem;
          border-radius: 4px;
        }
        :host-context(p) {
          font-weight: bold;
        }
        .highlight {
          background: red;
        }
        ::slotted(.highlight) {
          border-bottom: 2px solid red;
        }
        .icon {
          background-color: black;
          color: white;
          padding: 0.125rem 0.5rem 0.25rem;
          text-align: center;
          border-radius: 6px;
          cursor: pointer;
        }
      </style>
      
      <slot>DEFAULT SLOT TEXT</slot>
      <span class="icon">?</span>
    `
  }

  connectedCallback() {
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text')
    }
    this._tooltipIcon = 
      this.shadowRoot.querySelector('span')

    this._tooltipIcon.addEventListener(
      'mouseenter', 
      this._showTooltip.bind(this)
      )
    tooltipIcon.addEventListener(
      'mouseleave', 
      this._hideTooltip.bind(this)
      )

    this.shadowRoot.appendChild(this._tooltipIcon)

    this.style.position = 'relative'
  }

  // allows changing of values in attributes,
  // as long as you make a getter for observed
  // attributes (see below)
  attributeChangedCallback(name, oldValue, newValue) {
    // console.log(name, oldValue, newValue)
    if (oldValue === newValue) {
      return
    }
    if (name === "text") {
      this._tooltipText = newValue
    }
  }

  // return an array of all values you want
  // to listen to for changes
  static get observedAttributes() {
    return ['text']
  }
 
  // runs when component is removed from 
  // the dom
  disconnectedCallback() {
    this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip)
    this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip)
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
