<template>
  <div>
    <pre>{{ messages }}</pre>
  </div>
</template>

<script>
import socket from "../plugins/socket.io";
export default {
  data() {
    return {
      messages: [],
      socket: null
    };
  },
  mounted() {
     socket.on('deposit', (msg) => {
      this.messages.push(JSON.parse(msg))
    })
  },
  methods: {}
};
</script>

<style></style>
