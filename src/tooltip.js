/**
 * All custom elements must extend HTMLElement 
 * to be used
 */
class Tooltip extends HTMLElement {
  constructor() {
    super()
    // an undefined property to hold
    // the actual tooltip on hover
    this._tooltipContainer
    // Text for tooltip, passed from caller
    // as html attribute (set in connectedCallback).
    // Setting default value as well.
    this._tooltipText = 'Dummy tooltip text'
  }

  /**
   * ----------------------------------------
   * LIFECYCLE NOTE
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
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text')
    }
    const tooltipIcon = document.createElement('span')
    tooltipIcon.textContent = ' (?) '
    // must bind this to refer to the class instead of
    // the _showTooltip method
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
    this.appendChild(tooltipIcon)
  }

  /**
   * _ before the method name is just an unofficial
   * convention for private methods, it actually doesn't
   * make it private
   */
  _showTooltip() {
    this._tooltipContainer = document.createElement('div')
    this._tooltipContainer.textContent = this._tooltipText

    // styling
    this._tooltipContainer.style.backgroundColor = 'black'
    this._tooltipContainer.style.color = 'white'
    this._tooltipContainer.style.position = 'absolute'
    this._tooltipContainer.style.zIndex = '10'
    this._tooltipContainer.style.padding = '0.25rem 0.5rem'

    this.appendChild(this._tooltipContainer)
    // tooltipContainer parent must be relative
    // in order for the absolute positioning to work
    this.style.position = 'relative'
  }
  _hideTooltip() {
    this.removeChild(this._tooltipContainer)
  }
}

/**
 * Named element must be a hyphenated set of words
 * Below is "uc-" for udemy component
 */
customElements.define('uc-tooltip', Tooltip)
