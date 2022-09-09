<script>
  import Login from '$lib/Login.svelte';
  import AcctiveConnections from '$lib/acctive-connections.svelte';
  import CurrentChat from '$lib/current-chat.svelte';
  import Indicator from '$lib/indicator.svelte';

  export let data, error

</script>

<div id="app-container">
  <div id="status-indicator"><Indicator/></div>
  <div id="authenticate"><Login client={data} /></div>
	<div id="current-connections"><AcctiveConnections /></div>
  <div id="active-chat"><CurrentChat /></div>
</div>

<style>
  * {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
  }

  #app-container {
    /* height: 300px; */
    display: grid;
    grid-template-columns: 10% 90%;
    border-radius: 2px;
    background-color: steelblue;
  }

  #authenticate {
    grid-column: 2;
  }

  #current-connections {
    grid-column: 1;
    text-align: center;
  }

  #active-chat {
    grid-column: 2;
  }

  #status-indicator {
    grid-column: 1;
    text-align: center;
  }
</style>
