<template>
  <div>
    <pre>{{ messages }}</pre>
  </div>
</template>

<script>
// import socket from "../plugins/socket.io";
export default {
  data() {
    return {
      messages: [],
      socket: null
    };
  },
  mounted() {
    console.log(this)
    // this.$socket
    // this.$socket().on('deposit', (msg) => {
    //   this.messages.push(JSON.parse(msg))
    // })
    // this.$socket().on('withdraw', (msg) => {
    //   this.messages.push(JSON.parse(msg))
    // })
    // this.$socket().on('deposit_nodata', (msg) => {
    //   this.messages.push(JSON.parse(msg))
    // })
    this.socket = this.$socket()
    if(this.socket){
      this.socket.on('deposit', (msg) => {
        console.log('deposit websocket initiate')
      this.messages.push(JSON.parse(msg))
    })
    
    this.socket.on('withdraw', (msg) => {
      console.log('withdraw websocket initiate')
      this.messages.push(JSON.parse(msg))
    })

    }



  },
  methods: {}
};
</script>

<style></style>
