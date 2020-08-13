const socket = io();
socket.on("data", (doc) => {
  const buff = new Uint8Array(doc);
  const blob = new Blob(buff, { type: "application/pdf" });
  console.log(blob);
});
