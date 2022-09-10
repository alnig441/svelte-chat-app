<script>
  import { activeRoom, isLoggedIn, clientIO, roomAlert, chatLog } from './stores'
  import { afterUpdate } from 'svelte'

  let message, chat, latest

  afterUpdate( (x) => {
    if(latest) {
      // latest.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest'});
      latest.scrollIntoView()
    }
  })

  isLoggedIn.subscribe( isTrue => {
    if(isTrue) {
      $clientIO.on("message", (message, id) => {
        if($activeRoom !== id) {
          roomAlert.set(id);
        }
        let log = $chatLog;
        log.push({ room: id, id: "client", message: message })
        chatLog.set(log);
      })
    }
  })

  function onSend(e) {
    if($isLoggedIn) {
      $clientIO.emit("message", message, $activeRoom);
      let log = $chatLog
      log.push({ room: $activeRoom, id: "moderator",  message:  message })
      chatLog.set(log);
      message = '';
    }
  }

  function onKeyUp(e) {
    if(e.key && e.key.toLowerCase() === 'enter') {
      onSend()
    }
  }

</script>

<div id="chat">
  <div id="chat-window">
    <div id='chat-log'>
    {#each chat = $chatLog.filter(entry => entry.room === $activeRoom) as entry, i}
      {#if (i === chat.length -1) }
        <p bind:this={latest} class={entry.id}>{entry.message} </p>
      {:else}
        <p class={entry.id}>{entry.message} </p>
      {/if }
    {/each}
    </div>
  </div>
  <div id="chat-input-panel">
    <input disabled={!$activeRoom} bind:value={message} type="text" placeholder="message text">
    <input type="button" value="send" on:click|preventDefault={onSend} >
  </div>
</div>

<svelte:window on:keyup|preventDefault={onKeyUp} />

<style>
  * {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
  }

  #chat {
    margin: 3px;
  }

  #chat-window {
    width: 100%;
    height: 265px;
    border: 1px solid;
    border-radius: 3px;
    background-color: white;
    margin: 0px;
    padding: 2px;
  }

  #chat-log {
    max-height: 260px;
    overflow: scroll;
    position: absolute;
    bottom: 35px;
    width: 85%;
    margin: 0 3px;
  }

  input {
    padding: 0px 3px;
  }

  input[type="text"] {
    width: 79%;
  }

  input[type="button"] {
    float: right;
    width: 20%;
  }

  p {
    margin: 1px 0px;
    height: fit-content;
    padding: 3px;
    font-family: Code New Roman;
    text-indent: 2px;
  }

  .moderator {
    text-align: right;
    border-radius: 5px;
    background-color: lightgray;
  }

  @media screen and (max-width: 480px){
  }

</style>
