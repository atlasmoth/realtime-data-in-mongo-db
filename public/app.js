const socket = io();
socket.on("data", (doc) => {
  const buff = new Uint8Array(doc);
  console.log(buff);
});
