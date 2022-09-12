<script>
  import Icon from '@iconify/svelte';
  import { isLoggedIn, roomAlert, rooms, filtered } from './stores'
  let connections;

  function filter() {
    if($roomAlert && $filtered.length === 0){
      filtered.set($roomAlert);
    } else if($filtered) {
      filtered.set([]);
    }
  }
</script>

<div id="filter-indicator">
  {#if $isLoggedIn }
    <button disabled={$roomAlert.length === 0 && $filtered.length === 0} class:alert={$roomAlert.length > 0} on:click|preventDefault={filter}>
      {#if ($roomAlert.length > 0 && $filtered.length === 0) }
      <!-- filter -->
      <svg width="1em" height="1em" viewBox="0 0 36 36"><path fill="currentColor" d="M33 4H3a1 1 0 0 0-1 1v1.67a1.79 1.79 0 0 0 .53 1.27L14 19.58v10.2l2 .76V19a1 1 0 0 0-.29-.71L4 6.59V6h28v.61L20.33 18.29A1 1 0 0 0 20 19v13.21l2 .79V19.5L33.47 8A1.81 1.81 0 0 0 34 6.7V5a1 1 0 0 0-1-1Z" class="clr-i-outline clr-i-outline-path-1"></path><path fill="none" d="M0 0h36v36H0z"></path></svg>
      {:else if ($roomAlert.length === 0 && $filtered.length > 0) || $roomAlert.length > 0 || filtered.length > 0 }
      <!-- unfilter -->
      <svg width="1em" height="1em" viewBox="0 0 36 36"><path fill="currentColor" d="M34 6.4c0-.8-.7-1.4-1.5-1.4H10.3l2 2H32v.6l-9.6 9.6l1.4 1.4L33.4 9c.4-.4.6-.9.6-1.4V6.4z" class="clr-i-outline clr-i-outline-path-1"></path><path fill="currentColor" d="m2.7 3l2 2h-1c-.8-.1-1.6.5-1.7 1.3v1.1c0 .5.2 1 .6 1.4L14 20.2v10.3l1.9.8V19.4L4 7.5V7h2.7L20 20.3v12.9l2 .8V22.3l10.1 10.1l1.4-1.4L4.1 1.6L2.7 3z" class="clr-i-outline clr-i-outline-path-2"></path><path fill="none" d="M0 0h36v36H0z"></path></svg>
      {:else}
      <!-- filter but disabled -->
      <svg width="1em" height="1em" viewBox="0 0 36 36"><path fill="currentColor" d="M33 4H3a1 1 0 0 0-1 1v1.67a1.79 1.79 0 0 0 .53 1.27L14 19.58v10.2l2 .76V19a1 1 0 0 0-.29-.71L4 6.59V6h28v.61L20.33 18.29A1 1 0 0 0 20 19v13.21l2 .79V19.5L33.47 8A1.81 1.81 0 0 0 34 6.7V5a1 1 0 0 0-1-1Z" class="clr-i-outline clr-i-outline-path-1"></path><path fill="none" d="M0 0h36v36H0z"></path></svg>
      {/if}
    </button>
  {/if}
</div>

<style>
  * {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
  }

  #filter-indicator {
    margin: 3px 0;
  }

  input {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #ff0000;
  }

  button {
    width: 20px;
    height: 20px;
  }

  .alert {
    background-color: #FF5B20;
    border-radius: 3px;
  }


</style>
