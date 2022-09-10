<script>
  import { isLoggedIn, rooms, activeRoom, clientIO, roomAlert } from './stores';

  isLoggedIn.subscribe((isTrue) => {
    if(isTrue) {

      $clientIO.on('add rooms', (ids) => {
        rooms.set(ids.filter( room => room));
      })

      $clientIO.on("new room", (id)=> {
        let active = $rooms;
        active.push(id);
        rooms.set(active);
      })

      $clientIO.on("remove room", (id) => {
        rooms.set(disconnectRoom(id));
      })
    }
  })

  function disconnectRoom(id) {
    let remaining = $rooms.filter(room => room !== id);
    return remaining;
  }

  function onClick(e) {
    const thisRoom = e.target.value;
    activeRoom.set(thisRoom);
    if($activeRoom === $roomAlert) {
      roomAlert.set('');
    }
    return;
  }

</script>

<div id="connections">
{#if $isLoggedIn}
  {#each $rooms as room, i }
    {#if room }
      <button class:alert={$roomAlert === room} class:active={$activeRoom === room} value={room} on:click|preventDefault={onClick}>{i}</button>
    {/if}
  {/each}
{/if}
</div>

<style>
  * {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
  }


  #connections {
    display: inline-grid;
    margin: 3px;
  }

  button {
    width: 25px;
    height: 25px;
    margin-bottom: 3px;
    border-radius: 5px;
  }

  .active {
    background-color: #20618A;
    color: white;
  }

  .alert {
    background-color: #FF5B20;
    color: white;
  }

</style>
