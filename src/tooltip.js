/**
 * All custom elements must extend HTMLElement 
 * to be used
 */
class Tooltip extends HTMLElement {
  constructor() {
    super()
  }

  /**
   * LIFECYCLE NOTE
   * 
   * You cannot attach a custom element in the constructor
   * (i.e.: which would be the define part of the lifecycle)
   * since it won't exist in the DOM yet
   * 
   * You instead define it in connectedCallback,
   * which needs to be called exactly as below
   */
  connectedCallback() {
    const tooltipIcon = document.createElement('span')
    tooltipIcon.textContent = ' (?)'
    this.appendChild(tooltipIcon)
  }
}

/**
 * Named element must be a hyphenated set of words
 * Below is "uc-" for udemy component
 */
customElements.define('uc-tooltip', Tooltip)
