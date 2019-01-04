/**
 * ----------------------------------------
 * There's no template in this version. We're just
 * extending the functionality of an existing anchor
 * tag element to confirm leaving a page
 * ----------------------------------------
 */
class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener('click', (event) => {
      if (!confirm('Do you really want to exit this page?')) {
        event.preventDefault()
      }
    })
  }
}

/**
 * Extending an element, i.e. other than HTMLElement,
 * means having to add it in an object as the 3rd parameter
 */
customElements.define('uc-confirm-link', ConfirmLink, { extends: 'a' })
