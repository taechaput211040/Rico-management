
import io from "socket.io-client";

// export default function({ $axios, redirect, store, app }) {
//   // export default function(config) {
//    console.log('store here',store)
//     const socket = io("http://35.240.216.181:4000/", {
//       transports: ["websocket"],
//       query: {
//         company: "al",
//         agent: "es"
//       }
//     });

// return socket

// }


export default ({ $axios, redirect, store, app }, inject) => {
  inject('socket', () => {
    // export default function(config) {
    if (store.state.auth.company && store.state.auth.agent) {
      // const socket = io("http://localhost:4000/", {
      const socket = io("https://topup-v2.smart-exchange.io", {
        // const socket = io("http://34.87.24.45", {
        transports: ["websocket"],
        query: {
          company: store.state.auth.company,
          agent: store.state.auth.agent
        }
      });

      return socket

    }

    return null
  })
}