/**
 * Module for the Window object for all the applications
 * Custom element
 *
 * @module js/window.js
 * @author Adrian Rosales
 * @version 1.0.0
 *
 * @export
 * @class Window
 */

import { test } from './template.js'
let zIndex = 0

export default class Window extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(test.content.cloneNode(true))
    this.prevY = undefined
    this.prevX = undefined
    this.el = this.shadowRoot.querySelector('#mydiv')
    this.mousedown = this.mousedown.bind(this)
    this.mousemove = this.mousemove.bind(this)
    this.mouseup = this.mouseup.bind(this)
    this.top = 0
    this.left = 0
  }

  /**
   * When the element is added to the DOM
   * the user should be able to move and close the custom element
   *
   * @memberof Window
   */
  connectedCallback () {
    this.startPoint()
    this.removeWindow()
  }

  /**
   * Targets the header of the window object. Only place where you can trigger the other events.
   *
   * @memberof Window
   */
  startPoint () {
    this.shadowRoot.querySelector('#mydivheader').addEventListener('mousedown', this.mousedown)
  }

  /**
   * Mousedown method which triggers the mousemove and mouseup events. Check the previous y-axis and x-axis.
   * Also displays the window infront of the other ones.
   *
   * @param {event} e
   * @memberof Window
   */
  mousedown (e) {
    this.addEventListener('mousemove', this.mousemove)
    this.addEventListener('mouseup', this.mouseup)
    this.el.style.zIndex = zIndex++
    this.prevX = e.clientX // Get the horizontal coordinate
    this.prevY = e.clientY // Get the vertical coordinate
  }

  /**
   * When the mouse is clicked down, this methods triggers which makes the window move
   *
   * @param {event} e
   * @memberof Window
   */
  mousemove (e) {
    const newX = this.prevX - e.clientX
    const newY = this.prevY - e.clientY

    const rect = this.el.getBoundingClientRect()

    this.el.style.left = rect.left - newX + 'px'
    this.el.style.top = rect.top - newY + 'px'

    this.prevX = e.clientX
    this.prevY = e.clientY
  }

  /**
   * Removes the eventListeners when releasing the mouse from the window
   *
   * @memberof Window
   */
  mouseup () {
    this.removeEventListener('mousemove', this.mousemove)
    this.removeEventListener('mouseup', this.mouseup)
  }

  /**
   * Removes the app window from the desktop
   *
   * @memberof Window
   */
  removeWindow () {
    this.shadowRoot.querySelector('#btn').addEventListener('click', event => {
      event.target.parentNode.parentNode.parentNode.host.parentNode.host.remove()
    })
  }
}
window.customElements.define('main-window', Window)
