import io from "socket.io-client";

const socket = io("http://35.240.216.181:4000/", {
  transports: ["websocket"],
  query: {
    company: "al",
    agent: "es"
  }
});

export default socket;
