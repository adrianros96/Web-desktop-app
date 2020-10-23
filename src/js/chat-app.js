import { chat } from './template.js'

/**
 * Module for the chat application
 *
 *
 * @module js/weather-app.js
 * @author Adrian Rosales
 * @version 1.0.0
 *
 * @export
 * @class Chat
 */
export default class Chat extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(chat.content.cloneNode(true))
    this.socket = null
    this.container = this.shadowRoot.querySelector('.chatContainer')
    this.template = this.shadowRoot.querySelector('#chat')
    this.chatDiv = document.importNode(this.template.content.firstElementChild, true)
    this.username = undefined
  }

  /**
   * When the custom element is added, the chat window, emojis and connect will trigger.
   *
   * @memberof Chat
   */
  connectedCallback () {
    this.getUsername()
    this.display()
    this.emojis()
    this.connect()
  }

  /**
   * When the custom element is removed from the DOM the socket connection closes
   *
   * @memberof Chat
   */
  disconnectedCallback () {
    this.socket.close()
  }

  /**
   * Displays the messages and makes it possible to send messages
   *
   * @memberof Chat
   */
  display () {
    this.container.appendChild(this.chatDiv)

    this.chatDiv.addEventListener('keypress', event => {
      if (event.keyCode === 13) {
        // send message
        this.sendMessage(event.target.value)
        event.target.value = ''
        event.preventDefault()
      }
    })
  }

  /**
   * Sets up a websocket connection
   *
   * @returns
   * @memberof Chat
   */
  connect () {
    return new Promise(function (resolve, reject) {
      if (this.socket && this.socket.readyState === 1) {
        resolve(this.socket)
        return
      }

      this.socket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/')

      this.socket.addEventListener('open', function () {
        resolve(this.socket)
      }.bind(this))
      this.socket.addEventListener('error', function (event) {
        reject(new Error('Could not connect'))
      })
      this.socket.addEventListener('message', function (event) {
        const message = JSON.parse(event.data)
        this.printMessage(message)
      }.bind(this))
    }.bind(this))
  }

  /**
   * This method sends the data as a JSON object to the server
   *
   * @param {string} text The message from the user
   * @memberof Chat
   */
  sendMessage (text) {
    const data = {
      type: 'message',
      data: text,
      username: this.username,
      channel: '',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }

    this.connect().then(function (socket) {
      socket.send(JSON.stringify(data))
    })
  }

  /**
   * prints the messages
   *
   * @param {{object}} message with data
   * @memberof Chat
   */
  printMessage (message) {
    const template = this.chatDiv.querySelectorAll('template')[0]
    const messageDiv = document.importNode(template.content.firstElementChild, true)

    if (message.data) {
      messageDiv.querySelector('p').textContent = `${message.username}: ${message.data}`
      this.audioSound()
      messageDiv.querySelector('span').textContent = new Date().toLocaleString(navigator.language, { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      this.chatDiv.querySelector('.messageZone').appendChild(messageDiv)
      messageDiv.scrollIntoView()
    }
  }

  /**
   * Saves the username for the first time
   *
   * @memberof Chat
   */
  saveUsername () {
    const data = {
      userName: this.username
    }

    const saveIt = data

    window.localStorage.setItem('savedName', JSON.stringify(saveIt))
  }

  /**
   * Locally stores username, checks if the user has used the chat before
   *
   * @memberof Chat
   */
  getUsername () {
    let savedName = window.localStorage.getItem('savedName')

    if (savedName) {
      savedName = JSON.parse(savedName)
      this.username = savedName.userName
      const hideName = this.shadowRoot.querySelector('.greetings')
      hideName.classList.toggle('hide')
      const username = this.shadowRoot.querySelector('#displayUsername')
      username.textContent = `Welcome Back ${this.username} 😀!`
    } else {
      this.selectUsername()
    }
  }

  /**
   * If the user uses the application for the first time this method will trigger
   *
   * @memberof Chat
   */
  selectUsername () {
    const hideChatWindow = this.shadowRoot.querySelector('.chatContainer')
    hideChatWindow.classList.toggle('hide')

    const hideName = this.shadowRoot.querySelector('.greetings')
    const getUsername = this.shadowRoot.querySelector('#usernamefield')
    const userNameButton = this.shadowRoot.querySelector('#usernamebutton')

    userNameButton.addEventListener('click', event => {
      event.preventDefault()
      this.username = getUsername.value
      this.saveUsername()
      const username = this.shadowRoot.querySelector('#displayUsername')
      username.textContent = `Welcome ${this.username}`
      hideName.classList.toggle('hide')
      hideChatWindow.classList.toggle('hide')
    })

    getUsername.addEventListener('keypress', event => {
      if (event.keyCode === 13) {
        event.preventDefault()
        this.username = getUsername.value
        this.saveUsername()

        const username = this.shadowRoot.querySelector('#displayUsername')
        username.textContent = `Welcome ${this.username}`
        hideName.classList.toggle('hide')
        hideChatWindow.classList.toggle('hide')
      }
    })
  }

  /**
   * This method creates the emojis for the chat
   *
   * @memberof Chat
   */
  emojis () {
    const select = this.shadowRoot.querySelector('select')
    select.addEventListener('change', e => {
      const chatDiv = this.chatDiv.querySelector('.messageArea')
      chatDiv.value = `${chatDiv.value}${e.target.value}`
      chatDiv.focus()
    })
  }

  /**
   * Plays sound when a message is sent or recieved
   *
   * @memberof Chat
   */
  audioSound () {
    const audio = new window.Audio('https://notificationsounds.com/soundfiles/9cf81d8026a9018052c429cc4e56739b/file-sounds-1145-when.mp3')
    audio.play()
  }
}

window.customElements.define('chat-app', Chat)
