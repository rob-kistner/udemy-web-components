/**
 * All custom elements must extend HTMLElement 
 * to be used
 */
class Tooltip extends HTMLElement {
  constructor() {
    // always call super() for extending classes
    super()
    // an undefined property to hold
    // the actual tooltip on hover
    this._tooltipContainer
    // Text for tooltip, passed from caller
    // as html attribute (set in connectedCallback).
    // Setting default value as well.
    this._tooltipText = 'Dummy tooltip text'
    // initialize the shadow dom and allow
    // access to it from outside (the mode: open prop)
    this.attachShadow({ mode: 'open' })
    // ------ to acccess template in html file
    // const template = document.querySelector('#tooltip-template')
    // this.shadowRoot.appendChild(template.content.cloneNode(true))
    // ----- defining template in script

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
    // ----- alternative formatting
    // this.shadowRoot.innerHTML = `
    //   <span>
    //     <slot>DEFAULT SLOT TEXT</slot>
    //   </span>
    // `
  }

  /**
   * ----------------------------------------
   * LIFECYCLE NOTE: connectedCallback
   * 
   * You cannot attach a custom element in the constructor
   * (i.e.: which would be the define part of the lifecycle)
   * since it won't exist in the DOM yet.
   * 
   * You instead define it in connectedCallback,
   * which needs to be called exactly as below.
   * ----------------------------------------
   */
  connectedCallback() {
    // set the text of the element if it exists
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text')
    }
    const tooltipIcon = this.shadowRoot.querySelector('span')
    // mouse events...
    // must bind this to refer to the class instead of
    // the _showTooltip method
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
    // add it to the shadow dom root
    this.shadowRoot.appendChild(tooltipIcon)
    // tooltipContainer parent must be relative
    // in order for the absolute positioning to work
    this.style.position = 'relative'
  }

  /**
   * _ before the method name is just an unofficial
   * convention for private methods, it actually doesn't
   * make it private
   */
  _showTooltip() {
    // create the element and set the text
    this._tooltipContainer = document.createElement('div')
    this._tooltipContainer.textContent = this._tooltipText

    // ----- Styling:
    // ----- Gets used if it's not defined in js file
    // ----- innerHTML above
    // this._tooltipContainer.style.backgroundColor = 'black'
    // this._tooltipContainer.style.color = 'white'
    // this._tooltipContainer.style.position = 'absolute'
    // this._tooltipContainer.style.zIndex = '10'
    // this._tooltipContainer.style.padding = '0.25rem 0.5rem'

    // add the tooltipContainer to the doc
    this.shadowRoot.appendChild(this._tooltipContainer)
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer)
  }
}

/**
 * Named element must be a hyphenated set of words
 * Below is "uc-" for udemy component
 */
customElements.define('uc-tooltip', Tooltip)
