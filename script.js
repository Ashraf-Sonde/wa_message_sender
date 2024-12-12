document.addEventListener("DOMContentLoaded", function () {
  const sendBtn = document.getElementById("sendBtn");
  let message = document.getElementById("message");
  let defaultMessage = "";

  // Fetching the default message
  fetch("template.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      defaultMessage = data.defaultMessage;
      message.value = defaultMessage;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  // Handle send message click
  sendBtn.addEventListener("click", function () {
    message = document.getElementById("message").value;
    const phone = document.getElementById("phone").value;

    if (!message.length || message.trim() == "") {
      alert("Message is empty");
      return;
    }

    if (phone.length != 10 || phone.trim() == "") {
      alert("Invalid phone number");
      return;
    }

    const encodedMessage = encodeURI(message);

    window.open(`https://wa.me/91${phone}?text=${encodedMessage}`, "_blank");
  });
});
