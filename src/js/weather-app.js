/**
 * Module for the Weather application
 *
 *
 * @module js/weather-app.js
 * @author Adrian Rosales
 * @version 1.0.0
 *
 * @export
 * @class Weather
 */

import { weather } from './template.js'
export default class Weather extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(weather.content.cloneNode(true))
    this.temperatureDescription = this.shadowRoot.querySelector('.temperature-description')
    this.temperatureDegree = this.shadowRoot.querySelector('.temperature-degree')
    this.locationTimezone = this.shadowRoot.querySelector('.location-timezone')
    this.temperatureSection = this.shadowRoot.querySelector('.temperature')
    this.temperatureSpan = this.shadowRoot.querySelector('.temperature span')
  }

  /**
   * Weather app that fetches data from the darksky api and uses the skycon icons
   *
   * @memberof Weather
   */
  connectedCallback () {
    let lat
    let long
    const introText = document.createElement('p')
    introText.classList.add('introText')
    introText.textContent = 'Loading...'
    this.locationTimezone.appendChild(introText)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position)
        long = position.coords.longitude
        lat = position.coords.latitude

        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const api = `${proxy}https://api.darksky.net/forecast/95c4fdbb8dbc6c2d869ada969ed26803/${lat},${long}`

        window.fetch(api)
          .then(response => {
            introText.remove()
            this.temperatureSpan.classList.toggle('hide')
            return response.json()
          })
          .then(data => {
            console.log(data)

            const { temperature, summary, icon } = data.currently

            this.temperatureDegree.textContent = temperature
            this.temperatureDescription.textContent = summary
            this.locationTimezone.textContent = data.timezone

            const celsius = (temperature - 32) * (5 / 9)

            // set icon
            this.setIcons(icon, this.shadowRoot.querySelector('.icon'))

            this.temperatureSection.addEventListener('click', () => {
              if (this.temperatureSpan.textContent === 'F') {
                this.temperatureSpan.textContent = 'C'
                this.temperatureDegree.textContent = Math.floor(celsius)
              } else {
                this.temperatureSpan.textContent = 'F'
                this.temperatureDegree.textContent = temperature
              }
            })
          })
      })
    }
  }

  /**
   * This method decides which icon will be displayed depending on the forecast.
   *
   * @param {string} icon Icon from the current weather
   * @param {HTMLElement} iconID Where the icon should be displayed
   * @returns
   * @memberof Weather
   */
  setIcons (icon, iconID) {
    const skycons = new window.Skycons({ color: 'white' })
    const currentIcon = icon.replace(/-/g, '_').toUpperCase()
    skycons.play()
    return skycons.set(iconID, window.Skycons[currentIcon])
  }
}

window.customElements.define('weather-app', Weather)
