document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const result = document.getElementById("result");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const displayName = document.getElementById("displayName");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;

  const savedName = localStorage.getItem("username");
  if (savedName && displayName) {
    displayName.textContent = savedName;
  }

  function validateName() {
    if (nameInput.value.trim() === "") {
      nameError.textContent = "Name is required";
      nameError.classList.remove("hidden");
      return false;
    } else {
      nameError.classList.add("hidden");
      return true;
    }
  }

  function validateEmail() {
    if (!emailInput.value.match(emailPattern)) {
      emailError.textContent = "Please enter a valid email";
      emailError.classList.remove("hidden");
      return false;
    } else {
      emailError.classList.add("hidden");
      return true;
    }
  }

  function validateMessage() {
    if (messageInput.value.length < 5) {
      messageError.textContent = "Message must be at least 5 characters";
      messageError.classList.remove("hidden");
      return false;
    } else {
      messageError.classList.add("hidden");
      return true;
    }
  }

  nameInput.addEventListener("input", validateName);
  emailInput.addEventListener("input", validateEmail);
  messageInput.addEventListener("input", validateMessage);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isMessageValid) {
      const nameValue = nameInput.value;
      const emailValue = emailInput.value;
      const messageValue = messageInput.value;

      localStorage.setItem("username", nameValue);

      if (displayName) {
        displayName.textContent = nameValue;
      }

      result.innerHTML = `
        <h3 class="text-xl font-bold mb-3">Message Sent!</h3>
        <p><strong>Name:</strong> ${nameValue}</p>
        <p><strong>Email:</strong> ${emailValue}</p>
        <p><strong>Message:</strong> ${messageValue}</p>
      `;

      result.classList.remove("hidden");

      form.reset();
    }
  });
});
