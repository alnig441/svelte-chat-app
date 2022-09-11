<script>
  import { isLoggedIn, roomAlert } from "$lib/stores";
</script>

<div id="indicator">
  <input class:alert={$roomAlert.length > 0} class:green={$isLoggedIn} type="button">
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
    }

    100% {
      background-color: white;
      box-shadow: 0 0 0 3 rgba(0,0,0,0);
      transform: scale(0.95);
    }
  }

</style>
