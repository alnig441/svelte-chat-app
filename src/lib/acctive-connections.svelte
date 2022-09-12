<script>
  import { isLoggedIn, rooms, activeRoom, clientIO, roomAlert, filtered } from './stores';
  import { afterUpdate } from 'svelte';

  let buttons

  afterUpdate(() => { })

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
    const isAlerting = $roomAlert.find(room => room === thisRoom);
    activeRoom.set(thisRoom);

    if(isAlerting) {
      let alerts = $roomAlert.filter( room => room !== thisRoom);
      roomAlert.set(alerts);
    }
    return;
  }

</script>

{#if $isLoggedIn}
  <div id="connections" bind:this={buttons} class:filtered={$filtered.length > 0}>
  {#if $filtered.length > 0 }
    {#each $filtered as room, i }
      {#if room }
        <button class:alert={$roomAlert.find(alert => alert === room)} class:active={$activeRoom === room} value={room} on:click|preventDefault={onClick}>{i}</button>
      {/if}
    {/each}
  {:else if $rooms.length > 0}
  {#each $rooms as room, i }
    {#if room }
      <button class:alert={$roomAlert.find(alert => alert === room)} class:active={$activeRoom === room} value={room} on:click|preventDefault={onClick}>{i}</button>
    {/if}
  {/each}
  {/if}
  </div>
{/if}

<style>
  * {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
  }


  #connections {
    height: 280px;
    overflow: scroll;
    display: inline-grid;
    margin: 3px;
    ms-overflow-style: none;
    scrollbar-width: none;
  }

  #connections::-webkit-scrollbar {
    display: none;
  }

  button {
    width: 25px;
    height: 25px;
    margin-bottom: 3px;
    border-radius: 5px;
  }

  .filtered {
    height: fit-content !important;
  }

  .active {
    background-color: #20618A;
    color: white;
  }

  .alert {
    animation: flash 1.5s infinite;
  }


  @keyframes flash {
	0% {
    background-color: white;
    box-shadow: 0 0 0 3 rgba(255, 91, 32,0);
		transform: scale(0.95);
	}

	50% {
    box-shadow: 0 0 0 0 rgba(0, 64, 87, 0);
    background-color: #FF5B20;
    color: #ffffff;
		transform: scale(1.1);
    border-radius: 5px;
	}

	100% {
    background-color: white;
    box-shadow: 0 0 0 3 rgba(0,0,0,0);
		transform: scale(0.95);
	}
}

</style>
