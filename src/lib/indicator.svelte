<script>
  import { isLoggedIn } from "$lib/stores";
</script>

<div id="indicator">
  <input class:green={$isLoggedIn} type="button">
</div>

<style>
  * {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
  }

  #indicator {
    margin: 3px 0;
  }

  input {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #ff0000;
  }

  .green {
    background-color: #4CFF2B;
  }
</style>
