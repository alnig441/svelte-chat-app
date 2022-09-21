<script>
  import ioClient from "socket.io-client";
  import { isLoggedIn, clientIO, rooms, activeRoom } from './stores'

  export let client
  let password, username, isAllowed

  function onSubmit(e) {
    isAllowed = (client.username === username && client.password === password);

    if(!$isLoggedIn && isAllowed) {
      const options = { auth: { type: 'moderator' }};
      clientIO.set(ioClient(options));
      isLoggedIn.set(true)
      password = ''
      username = ''
    }
    else {
      isLoggedIn.set(false)
      rooms.set([])
      activeRoom.set(null)
      $clientIO.disconnect()
    }

  }
</script>

<div id="login">
  <input class:hidden={isAllowed} disabled={isAllowed} bind:value={username} type="text" placeholder="username">
  <input class:hidden={isAllowed} disabled={isAllowed} bind:value={password} type="password" placeholder="password">
  <input class:hidden={isAllowed} d isabled={isAllowed} type="button" value="connect" on:click|preventDefault="{onSubmit}">
  <input class:hidden={!isAllowed} type="button" value="disconnect" on:click|preventDefault="{onSubmit}" >
</div>

<style>
  * {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
  }

  #login {
    margin: 3px;
  }

  input {
    padding: 0px 3px;
  }

  input[type="text"], input[type="password"] {
    width: 39%;
  }

  input[type="button"] {
    float: right;
    width: 20%;
  }

  .hidden {
    width: auto;
    display: none
  }

</style>
