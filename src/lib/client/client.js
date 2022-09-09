"use strict";
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
const URL = "http://localhost:5173";

(function(){

  const socket = io(URL);
  let incoming = false;
  let connectAttempts = 0;
  let moderatorIsConnected = false;
  let input;

  window.onload = (e) => {

    socket.on('connect', () => {
    })

    socket.on("welcome", (message) => {
      connectAttempts ++;
      moderatorIsConnected = true;
      incoming = true;

      if(connectAttempts === 1) {
        insertChat();
      } else {
        message = "moderator rejoined the chat";
        disableInputToggle();
      };

      postMessage(message);
    })

    socket.on("message", (message) => {
      incoming = true;
      postMessage(message);
    })

    socket.on("moderator left", (message) => {
      moderatorIsConnected = false;
      incoming = true;
      postMessage(message);
      disableInputToggle();
    })

    socket.onAny((event, ...args) => {
      console.log(`event: "${event}" - args: "${args}"`)
    })

  }

  function insertChat() {
    const chatAppContainer = document.createElement('div');
    chatAppContainer.setAttribute('style', 'position:fixed;left:25px;bottom:25px;height:250px;border:1px solid black;margin:auto;border-radius:3px;')

    const chatBoxContainer = document.createElement('div');
    chatBoxContainer.setAttribute('style', 'margin:0px;margin:0px;padding:0px;height:225px;overflow:scroll;');
    chatBoxContainer.setAttribute('id', 'chatBoxContainer');

    const chatBox = document.createElement('div');
    chatBox.setAttribute('id', 'chatBox');
    chatBox.setAttribute('style','margin:0px;padding:2px;position:absolute;bottom:25px;overflow:scroll;width:100%;max-height:220px;' );
    chatBoxContainer.append(chatBox);

    const chatBoxForm = document.createElement('ul');
    chatBoxForm.setAttribute('style', 'list-style:none;margin:0px;padding:2px')

    const chatBoxFormLi = document.createElement('li');
    chatBoxFormLi.setAttribute('style', 'display:inline-flex;margin:0px;padding:0px;')

    const chatInput = document.createElement('input');
    chatInput.setAttribute('id', 'chatInput');
    chatInput.addEventListener('keyup', onSubmit);

    const chatSendButton = document.createElement('button');
    chatSendButton.setAttribute('type', 'submit');
    chatSendButton.setAttribute('id', 'chatSend');
    chatSendButton.innerHTML = 'send';
    chatSendButton.addEventListener('click', onSubmit);

    chatBoxFormLi.append(chatInput);
    chatBoxFormLi.append(chatSendButton);
    chatBoxForm.append(chatBoxFormLi);

    chatAppContainer.append(chatBoxContainer);
    chatAppContainer.append(chatBoxForm);

    document.body.append(chatAppContainer);
  }

  function onSubmit(e) {
    e.preventDefault();
    incoming = false;
    const input = document.getElementById('chatInput');
    const type = e.type.toLowerCase();
    let key;

    if(e.key) {
      key = e.key.toLowerCase();
    }

    const doProceed = (type === 'click' || (type === 'keyup' && key === 'enter'));

    if(doProceed){
      socket.emit('message', input.value);
      postMessage(input.value);
      input.value = '';
    }
    return;
  }

  function postMessage(input) {
    const chat = document.getElementById('chatBox');
    const p = document.createElement('p');
    if(incoming) {
      p.setAttribute('style', 'margin:0px;padding:3px;font-family:Code New Roman; background-color:beige; width: 95%;text-indent: 2px;text-align:right')
    } else {
      p.setAttribute('style', 'margin:0px;padding:3px;font-family:Code New Roman; width:95%')
    }
    p.innerHTML = input;
    chat.append(p);
    p.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest'})
    return;
  }

  function disableInputToggle() {
    const input = document.getElementById("chatInput");
    const send = document.getElementById("chatSend");
    const isDisabled = input.hasAttribute("disabled");

    if(isDisabled) {
      input.removeAttribute("disabled");
      send.removeAttribute("disabled");
    } else {
      input.setAttribute("disabled", true);
      send.setAttribute("disabled", true);
    }
    return;
  }

})();
