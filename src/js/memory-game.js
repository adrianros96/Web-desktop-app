/**
 * Module for the memory game
 * Custom element
 *
 * @module js/memory-game.js
 * @author Adrian Rosales
 * @version 1.0.0
 *
 * @export
 * @class MemoryGame
 */

import { template } from './template.js'

export default class MemoryGame extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.tries = 0
    this.rows = undefined
    this.cols = undefined
    this.numberArr = []
    this.firstClick = undefined
    this.secondClick = undefined
    this.attempts = 0
    this.turnBrick = 0
    this.imageFolder = './image/'
  }

  connectedCallback () {
    this.start()
    const selected = this.shadowRoot.querySelector('.select')

    selected.addEventListener('change', event => {
      if (event.target.value === '1') {
        this.cols = 2
        this.rows = 2
        this.createBoard()
        this.removeGame()
      } else if (event.target.value === '2') {
        this.cols = 4
        this.rows = 2
        this.createBoard()
        this.removeGame()
      } else if (event.target.value === '3') {
        this.cols = 4
        this.rows = 4
        this.createBoard()
        this.removeGame()
      }
    })
  }

  /**
   * sets the board to 0 to make use of the change event
   *
   * @memberof MemoryGame
   */
  start () {
    this.cols = 0
    this.rows = 0
    this.createBoard()
  }

  /**
   * Shuffles the cards and pushes them to the card array
   *
   * @memberof MemoryGame
   */
  shuffle () {
    for (let i = 1; i <= (this.rows * this.cols) / 2; i++) {
      this.numberArr.push(i)
      this.numberArr.push(i)
    }
    for (let i = this.numberArr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1))
      const temp = this.numberArr[i]
      this.numberArr[i] = this.numberArr[j]
      this.numberArr[j] = temp
    }
  }

  /**
   * Creates the board and gives every card an id, tabindex and makes them clickable
   *
   * @memberof MemoryGame
   */
  createBoard () {
    this.numberArr = []
    this.turnBrick = 0
    this.attempts = 0
    this.numberOfPairs = (this.rows * this.cols) / 2
    this.shuffle()
    const output = this.shadowRoot.querySelector('.memory')
    const gamezone = document.createElement('div')
    gamezone.classList.add('gamezone')
    output.appendChild(gamezone)

    for (let i = 0; i < (this.rows * this.cols); i++) {
      const a = document.createElement('a')
      const img = document.createElement('img')
      img.setAttribute('src', `${this.imageFolder}0.png`)
      img.id = this.numberArr[i]
      img.setAttribute('tabindex', '1')
      a.appendChild(img)
      gamezone.appendChild(a)
      if ((i + 1) % this.cols === 0) {
        gamezone.appendChild(document.createElement('br'))
      }
    }
    this.enterClick()
    this.clickEvent()
  }

  /**
   * Keypress event on the cards
   *
   * @memberof MemoryGame
   */
  enterClick () {
    const gamezone = this.shadowRoot.querySelector('.memory')
    gamezone.addEventListener('keypress', event => {
      if (event.keyCode === 13) {
        this.isPair(event.target)
      }
    })
  }

  /**
   * Click event on the cards
   *
   * @memberof MemoryGame
   */
  clickEvent () {
    const gamezone = this.shadowRoot.querySelector('.memory')
    gamezone.addEventListener('click', event => {
      this.isPair(event.target)
    })
  }

  /**
   * Displays how many attempts the player did until victory
   *
   * @memberof MemoryGame
   */
  theWinner () {
    const winner = this.shadowRoot.querySelector('#youWin')
    winner.textContent = `Last game won in ${this.attempts} attempts!`
    this.shadowRoot.querySelector('.gamezone').classList.toggle('hide')
  }

  /**
   * clears the board when changing gamemode
   *
   * @memberof MemoryGame
   */
  removeGame () {
    this.shadowRoot.querySelector('.gamezone').remove()
  }

  /**
   * Check if the cards are pairs or not
   *
   * @param {*} event
   * @memberof MemoryGame
   */
  isPair (event) {
    if (event.nodeName !== 'IMG' || this.secondClick) { return }
    const id = event.id
    if (!this.firstClick) {
      this.firstClick = event
      event.setAttribute('src', `${this.imageFolder}${id}.png`)
    } else if (this.firstClick !== event) {
      this.secondClick = event
      event.setAttribute('src', `${this.imageFolder}${id}.png`)
      if (this.firstClick && this.secondClick) {
        if (this.firstClick.id === this.secondClick.id) {
          setTimeout(() => {
            this.firstClick.classList.add('removed')
            this.secondClick.classList.add('removed')
            this.firstClick = undefined
            this.secondClick = undefined
          }, 500)
          this.turnBrick++
          this.attempts++
          if (this.turnBrick === this.numberOfPairs) {
            this.theWinner()
          }
        } else if (this.firstClick !== this.secondClick) {
          setTimeout(() => {
            this.firstClick.setAttribute('src', `${this.imageFolder}0.png`)
            this.secondClick.setAttribute('src', `${this.imageFolder}0.png`)
            this.firstClick = undefined
            this.secondClick = undefined
          }, 500)
          this.attempts++
        }
      }
    }
  }
}

window.customElements.define('memory-game', MemoryGame)
