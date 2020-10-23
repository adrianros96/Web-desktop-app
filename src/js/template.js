const test = document.createElement('template')
test.innerHTML = `
<style>
:host #mydiv {
  position: absolute;
  background-color: #f1f1f1;
  border: 1px solid #d3d3d3;
  text-align: center;
  border: solid 1px black;
  top: 20px;
  left: 0px;
  /* z-index: -1; */
}

:host #mydivheader {
  padding: 15px;
  cursor: move;
  background-color: black;
  color: #fff;
}

:host #btn {
     line-height: 12px;
     width: 18px;
     margin-top: 1px;
     margin-right: 5px;
     position:absolute;
     top:4px;
     right:0;
     cursor: pointer;
     border: none;
     outline: none;
     background: none;
     color: white;
     font-size: 1rem;
     font-weight: bold;
}

:host #btn:hover {
  opacity: 0.7;
}

:host i {
    line-height: 12px;
     margin-top: 12px;
     top:0;
     left:0;
}
  
</style>
<div id="mydiv">
  <!-- Include a header DIV with the same name as the draggable DIV, followed by "header" -->
  <div id="mydivheader"><button id="btn">X</button></div>
  <slot class="appWindow">
</slot>
  </div>
  `

const template = document.createElement('template')
template.innerHTML = `
<style>
:host .memory img { 
  width: 100px;
}

:host .memoryGame {
  background: linear-gradient(rgb(255, 190, 65), rgb(243, 119, 182))
}

:host .memory .removed {
  visibility: hidden;
}

:host .select {
  margin: 10px;
}

:host .hide{
  display: none;
}
:host .appIcon {
  float: left;
  top:0;
  left:0;
  color:white;
  position: absolute;
  pointer-events: none;
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
</style>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<main-window>
<div class="appIcon"><i class="material-icons">apps</i></div>
<p class="appName">Memory</p>
  <div class="memoryGame">
<div>
    <select class="select">
    <option value="0">Select Game type:</option>
    <option value="1" id="game1">2x2</option>
    <option value="2" id="game2">4x2</option>
    <option value="3" id="game3">4x4</option>
</select>
</div>
<div class="memory">
</div>
<div id="youWin"></div>
</div>
</main-window>
`

const chat = document.createElement('template')
chat.innerHTML = `
<style>
:host .chatContainer {
  height: 300px;
  width: 300px;
  background: linear-gradient(rgb(255, 190, 65), rgb(243, 119, 182));
  display: block;
  overflow: hidden;
}
:host .messageArea { 
 position:absolute;
 height: 55px;
 width: 220px;
 bottom: 10px;
 left:0px;
 right: 0px;
 padding: 0;
 margin-left: 40px;
 margin-right: 40px;
 resize: none;
 border:solid 2px black;
 border-radius: 7px;
}
:host .messageZone {
  overflow-y: scroll;
  height: 210px;
}
:host .message {
  text-align: left; 
  margin-top: 5px;
  font-size: 12px;
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  margin: 10px 0;
  overflow-wrap: break-word;
}

:host .greetings {
  height: 250px;
  width: 300px;
  background: linear-gradient(rgb(255, 190, 65), rgb(243, 119, 182));
  display: block;
}

:host #welcome {
  font-size: 30px;
  margin: 0px;
}

:host #usernamefield {
  background-color: lightblue;
  margin-top: 20px;
}

:host .hide{
  display: none;
}
:host .appIcon {
  float: left;
  top:0;
  left:0;
  color:white;
  position: absolute;
  pointer-events: none;
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

:host .emojis {
  float: right;
  padding-right: 38px;
}

:host #displayUsername {
  background: rgba(255, 178, 31, 0.79);
  margin: 0px;
  padding: 5px;
}

:host #usernamebutton {
  margin-bottom: 30px;
  margin-top: 15px;
  border-radius: 20px;
  padding: 10px;
  color: white;
  text-decoration: none;
  background: #f84abe;
  display: inline-block;
  border: solid 1px black;
  transition: all 0.4s ease 0s;
}

:host #usernamebutton:hover {
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
<div class="appIcon"><i class="material-icons">chat</i></div>
<p class="appName">Chat</p>
<p id="displayUsername"></p>
<div class="greetings">
  <h1 id="welcome">Welcome</h1>
  <p>Please enter your name below:</p>
  <form>
    <input type="text" name="firstname" placeholder="Enter name here.." id="usernamefield">
    <br><br>
    <input type="button" value="Submit Name" id="usernamebutton">
    <br><br>
  </form>
</div>

<div class="chatContainer"></div>
<template id="chat">
  <div class="chat">
     <div class="messageZone">
            <template>
             <div class="message">
             <p></p>
             <span class="timeStamp">11:01</span>
              </div>
         </template>
        </div>
        <textarea placeholder="Enter message here.." class="messageArea"></textarea>
        <div class="emojis">
       Emojis<select>
          <option></option>
          <option value="&#128540;">&#128540;</option>
          <option value="&#128513;">&#128513;</option>
          <option value="&#128514;">&#128514;</option>
          <option value="&#128532;">&#128532;</option>
          <option value="&#128517;">&#128517;</option>
        </select>
      </div>
  </div>
</div>
</template>
</main-window>
`
const weather = document.createElement('template')
weather.innerHTML = `
<style>
:host .boxer {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:host #bodycopy {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background:linear-gradient(rgb(255, 190, 65), rgb(243, 119, 182));
    font-family: sans-serif;
    color: white;
}

:host .location,
:host .temperature {
    height: 150px;
    width: 50%;
    display:flex;
    justify-content: space-around;
    align-items: center; 
    margin: 15px;   
}

:host .temperature {
    flex-direction: column;
    padding-bottom: 20px;
}

:host .degree-section {
    display:flex;
    align-items: center;    
    cursor: pointer;
}

:host .degree-section span {
    margin: 10px;
    font-size: 30px;
}

:host .degree-section h2 {
    font-size: 40px;
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

:host .hide {
  display:none;
}
</style>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<main-window>
<div class="appIcon"><i class="material-icons">wb_sunny</i></div>
<p class="appName">Local Weather</p>
<div id="bodycopy">
 <div class="location">
        <h1 class="location-timezone"></h1>
        <canvas class="icon" width="128" height="128"></canvas>
    </div>  
        <div class="temperature">
            <div class="degree-section">
            <h2 class="temperature-degree"></h2>
            <span class="hide">F</span>
            </div>
            <div class="temperature-description"></div>
        </div>
    </div>
</div>
</main-window>
`

export { test, template, chat, weather }
