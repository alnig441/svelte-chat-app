<script>
  import { io } from '../../lib/chat-client.js';

  io.on("connect", (...socket) => {
    console.log('connected with id ', socket.id)
  })

  io.on("welcome", (message) => {
    console.log(`welcome message: ${message}`, io.id)
  })
  io.onAny((event, message) => {
    console.log('event: ', event, 'message: ', message);
  })

</script>

<p>chat panel</p>

<style>
  p {
    font-family: Arial, Helvetica, sans-serif;
    color:blue;
  }
</style>
