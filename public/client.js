const socket = io();
let name;
let textarea = document.querySelector("#textarea");
let message_area = document.querySelector(".message_area");

do {
  name = prompt("Please enter your name : ");
} while (!name);
textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});
// Message Send Function
function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim(),
  };
  //Append
  AppendMessage(msg, "outgoing");
  textarea.value = "";

  // Send to Server
  socket.emit("message", msg); // msg is msg object
}
// Apend Message Function
function AppendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");
  // To display message in h4 and p tag in div
  let markup = `
  <h4>${msg.user}</h4>
  <p>${msg.message}</p>
  `;
  // to put html markup in the div in which we want to see this message
  mainDiv.innerHTML = markup;
  // now append the maindiv in the message area
  message_area.appendChild(mainDiv);
}

// receive Message from server
socket.on("message", (msg) => {
  AppendMessage(msg, "incoming");
});
