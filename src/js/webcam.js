/**
 * Module for the Webcam
 * Webcam application with record/download functionallity
 *
 * @module js/webcam.js
 * @author Adrian Rosales
 * @version 1.0.0
 *
 * @export
 * @class Webcam
 */

const template = document.createElement('template')
template.innerHTML = `
<style>
:host #video {
    padding-top: 10px;
    padding-bottom: 10px;
    width: 500px;
    height: 300px;
    background:linear-gradient(rgb(255, 190, 65), rgb(243, 119, 182));
}
:host .appIcon {
  float: left;
  top:0;
  left:0;
  color:white;
  position: absolute;
  pointer-events: none;
  line-height: 45px;
}

:host .appName {
  position: absolute;
  top: 0px;
  justify-content: center;
  align-items: center;
  color:white;
  line-height: 1px;
  pointer-events: none;
  width: 100%
}

:host #video2 {
    height: 150px;
    width: 150px;
}

:host .recBtn {
    background-color: darkred;
    width: 25px;
    height: 25px;
    font-size: 0;
    border: 0;
    border-radius: 35px;
    margin: 18px;
    outline: none;
    position: absolute;
    margin-left: 65px
}

:host .recording{
    background-color: red;
}

:host .secondRow{
    background:rgb(243, 119, 182);
}

:host .hide {
    display: none;
}

:host .greetings {
  background:linear-gradient(rgb(255, 190, 65), rgb(243, 119, 182));
}

:host #welcome {
  margin-top: 0px;
  padding: 35px;
}

:host .paraGra {
  padding-bottom: 20px;
}
:host .hideBtn{
  margin-bottom: 30px;
  border-radius: 20px;
  padding: 10px;
  color: white;
  text-decoration: none;
  background: #f84abe;
  display: inline-block;
  border: solid 1px black;
  transition: all 0.4s ease 0s;
}

:host .hideBtn:hover {
background: hsl(44, 100%, 50%);
letter-spacing: 1px;
-webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.9);
-moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.9);
box-shadow: 5px 40px -10px rgba(0,0,0,0.9);
transition: all 0.4s ease 0s;
}
</style>
 <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
 <main-window>
    <div class="appIcon"><i class="material-icons">video_call</i></div>
    <p class="appName">Camera Recorder</p>
<div class="greetings">
  <h1 id="welcome">Camera Recorder v1.0</h1>
  <p class="paraGra">This app requires to use your webcam</p>
    <button class="hideBtn" >CLICK HERE TO START</button>
</div>
<div class="mainPage">
<div class="secondRow">
<button class="recBtn" class="notRecording"></button>
<video id="video" autoplay="true"></video>
<p><button id="btnStart">Spela in</button><button id="btnStop">Stop</button></p> <br>
<video  id="video2" controls></video>
</div>
</div>
</main-window>
`

export default class Webcam extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.stream = null
  }

  /**
   * Starts the webcam application when the element is added to the DOM
   *
   * @memberof Webcam
   */
  connectedCallback () {
    this.startPage()
    this.getMedia()
  }

  /**
   * Shutdowns the webcamera when closing the application
   *
   * @memberof Webcam
   */
  disconnectedCallback () {
    this.stream.getTracks().forEach(track => track.stop())
  }

  /**
   * Start page when launching the application
   *
   * @memberof Webcam
   */
  startPage () {
    const hideMainPage = this.shadowRoot.querySelector('.mainPage')
    hideMainPage.classList.toggle('hide')
    const hideStartPage = this.shadowRoot.querySelector('.greetings')

    const hideButton = this.shadowRoot.querySelector('.hideBtn')
    hideButton.addEventListener('click', event => {
      hideStartPage.classList.toggle('hide')
      hideMainPage.classList.toggle('hide')
    })
  }

  /**
   * The application itself, with webcamstreaming and record functionallity
   *
   * @memberof Webcam
   */
  async getMedia () {
    const constrainObj = {
      facingMode: 'user',
      video: true
    }
    const video = this.shadowRoot.querySelector('video')

    try {
      this.stream = await navigator.mediaDevices.getUserMedia(constrainObj)
      video.srcObject = this.stream
      const start = this.shadowRoot.querySelector('#btnStart')
      const stop = this.shadowRoot.querySelector('#btnStop')
      const videoSave = this.shadowRoot.querySelector('#video2')
      const mediaRecorder = new window.MediaRecorder(this.stream)
      let chunks = []
      console.log(chunks)

      start.addEventListener('click', e => {
        const recording = this.shadowRoot.querySelector('.recBtn')
        recording.classList.toggle('recording')
        mediaRecorder.start()
        console.log(mediaRecorder.state)
      })

      stop.addEventListener('click', e => {
        const recording = this.shadowRoot.querySelector('.recBtn')
        recording.classList.toggle('recording')
        mediaRecorder.stop()
        console.log(mediaRecorder.state)
      })

      mediaRecorder.ondataavailable = event => {
        chunks.push(event.data)
      }

      // Blob = Binary Large OBject
      mediaRecorder.onstop = event => {
        const blob = new window.Blob(chunks, { type: 'video/mp4' })
        chunks = [] // clear to not duplicate video
        const videoURL = window.URL.createObjectURL(blob)
        videoSave.src = videoURL
      }
    } catch (err) {
      console.error(err)
    }
  }
}

window.customElements.define('webcam-app', Webcam)
