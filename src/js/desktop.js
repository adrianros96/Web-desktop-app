/**
 * Module for the desktop
 * Custom element
 *
 * @module js/desktop.js
 * @author Adrian Rosales
 * @version 1.0.0
 *
 * @export
 * @class Desktop
 */

import './window.js'
import './memory-game.js'
import './chat-app.js'
import './weather-app.js'
import './webcam.js'

const template = document.createElement('template')
template.innerHTML = `
<style>
:host .launcher {
    position: fixed;
    bottom: 0;
    height: 60px;
    width: 100%;
    background: #a15862;
}

:host .topbar {
    position: fixed;
    top:0;
    height: 20px;
    width: 100%;
    background: #a15862;
}

:host .launcher ul {
    text-align: center;
    list-style: inside;
}

:host .launcher li {
    height: 40px;
    width: 50px;
    display: inline-block;
    text-align: center;
    color: #ffffff;
    overflow: visible;
    margin: 3px;
}

:host .launcher li i:hover {
    padding: auto;
    opacity: 0.5;
    transition: all 0.5s;
    cursor: pointer;
}

:host .tooltip-container {
    overflow: hidden;
    position: absolute;
    bottom: 40px;
    padding-bottom: 5px;
}

:host .launcher li:hover .tooltip-container .tooltip-title {
    display: block;
    margin-bottom: 20px;
    background-color: rgb(201, 151, 15);
}

:host .tooltip-title {
    display: none;
    padding: 5px;
    text-shadow: 1px 1px rgba(0,0,0,0.6);
}

:host .clocker {
    color: white;
    position: fixed;
    top: 0px;
    right: 0px;
    margin: 1px;
    padding-right: 15px;
}

:host .appleIcon {
    color: white;
    position: fixed;
    top: 0px;
    left: 0px;
    margin: 1px;
    padding-left: 15px;
}
    </style>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <div class="topbar"><p class="appleIcon"></p><p class="clocker"></p></div>
    <div class="container"></div>
 <div class="launcher">
        <ul id="apps">
            <li value="memory" id="memoryGame">
                <i class="material-icons">apps</i>
                <div class="tooltip-container">
                    <div class="tooltip-line">
                        <span class="tooltip-title">Memory</span>
                    </div>
                </div>
            </li>
            <li value="chat" id="chatApplication">
                <i class="material-icons">chat</i>
                <div class="tooltip-container">
                        <span class="tooltip-title">Chat</span>
                </div>
            </li>
            <li value="weather">
                <i class="material-icons">wb_sunny</i>
                <div class="tooltip-container">
                        <span class="tooltip-title">Weather</span>
                </div>
            </li>
            <li value="webcam">
                  <i class="material-icons">video_call</i>
                <div class="tooltip-container">
                        <span class="tooltip-title">Camera</span>
                </div>
            </li>
            </ul>
`

export default class Desktop extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.container = this.shadowRoot.querySelector('.container')
    this.memoryIcon = '<i class="material-icons">apps</i>'
  }

  /**
   * This custom element is hardcoded in the index.html. It will display the desktop
   * and create the specific app depending on which button the user clicks.
   *
   * @memberof Desktop
   */
  connectedCallback () {
    const listItems = this.shadowRoot.querySelectorAll('ul li')

    listItems.forEach(items => {
      items.addEventListener('click', event => {
        if (event.target.textContent === 'apps') {
          const mg = document.createElement('memory-game')
          this.container.appendChild(mg)
        } else if (event.target.textContent === 'chat') {
          const chatApp = document.createElement('chat-app')
          this.container.appendChild(chatApp)
        } else if (event.target.textContent === 'wb_sunny') {
          const mm = document.createElement('weather-app')

          this.container.appendChild(mm)
        } else if (event.target.textContent === 'video_call') {
          const mm = document.createElement('webcam-app')

          this.container.appendChild(mm)
        }
      })
    })
    this.clock()
  }

  /**
 *  updates the clock every second
 *
 * @memberof Desktop
 */
  clock () {
    this.leTime()
    setInterval(() => {
      this.leTime()
    }, 1000)
  }

  /**
   * Displays the current time on the desktop
   *
   * @memberof Desktop
   */
  leTime () {
    const time = new Date().toLocaleString()
    const clock = this.shadowRoot.querySelector('.clocker')
    clock.textContent = time
  }
}

window.customElements.define('desktop-app', Desktop)
