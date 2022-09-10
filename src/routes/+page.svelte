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
    display: grid;
    grid-template-columns: 30px auto;
    grid-template-rows: 25px 290px;
    border-radius: 2px;
    background-color: #8abcd4;
  }

  #status-indicator {
    grid-row: 1 / span 1;
    grid-column: 1 / span 1;
    text-align: center;
  }
  #authenticate {
    grid-row: 1 / span 1;
    grid-column: 2 / span 1;
  }

  #current-connections {
    grid-row: 2 / span 1;
    grid-column: 1 / span 1;
    text-align: center;
  }

  #active-chat {
    height: 100%;
    grid-row: 2 / span 1;
    grid-column: 2 / span 1;
  }

  @media screen and (max-width: 480px){
  }

</style>
