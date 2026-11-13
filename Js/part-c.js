const takenUsernames = ["admin", "nimali", "kavin"];

const form = document.getElementById("signup-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmBox = document.getElementById("confirm");
const terms = document.getElementById("terms");
const showBtn = document.getElementById("show-btn");
const submitBtn = document.getElementById("submit-btn");
const result = document.getElementById("result");
const strengthEl = document.getElementById("strength");
const capsMsg = document.getElementById("caps-msg");

const ruleItems = {
  length: document.getElementById("rule-length"),
  number: document.getElementById("rule-number"),
  upper: document.getElementById("rule-upper"),
  symbol: document.getElementById("rule-symbol")
};

function showError(input, message) {
  const errorEl = document.getElementById(`${input.id}-error`);
  errorEl.textContent = message;
  input.classList.toggle("invalid", message !== "");
  input.setAttribute("aria-invalid", message !== "");
}

function checkUsername(value) {
  if (!/^\w{3,15}$/.test(value)) {
    return "Use 3 to 15 letters, numbers or _.";
  }
  if (takenUsernames.includes(value.toLowerCase())) {
    return "That username is taken. Try another.";
  }
  return "";
}

function checkEmail(value) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Enter an email like name@example.com.";
  }
  return "";
}

function checkPasswordRules(value) {
  const results = {
    length: value.length >= 8,
    number: /\d/.test(value),
    upper: /[A-Z]/.test(value),
    symbol: /[^A-Za-z0-9]/.test(value)
  };

  let metCount = 0;
  for (const key in results) {
    ruleItems[key].classList.toggle("met", results[key]);
    if (results[key]) metCount++;
  }

  showStrength(value, metCount);
  return metCount === 4;
}

function checkConfirm() {
  if (confirmBox.value === "") return "Please type your password again.";
  if (confirmBox.value !== password.value) return "Passwords do not match.";
  return "";
}

function updateForm() {
  if (username.value !== "") showError(username, checkUsername(username.value));
  if (email.value !== "") showError(email, checkEmail(email.value));
  if (confirmBox.value !== "") showError(confirmBox, checkConfirm());

  const pwOk = checkPasswordRules(password.value);
  const allOk = checkUsername(username.value) === "" &&
                checkEmail(email.value) === "" &&
                pwOk && checkConfirm() === "" && terms.checked;
  submitBtn.disabled = !allOk;
}

[username, email, password, confirmBox, terms].forEach((el) => {
  el.addEventListener("input", updateForm);
});

showBtn.addEventListener("click", () => {
  const hidden = password.type === "password";
  password.type = hidden ? "text" : "password";
  showBtn.textContent = hidden ? "Hide" : "Show";
});

function showStrength(value, metCount) {
  if (value === "") {
    strengthEl.textContent = "";
    return;
  }
  let word = "Weak";
  if (metCount === 4) word = "Strong";
  else if (metCount === 3) word = "Fair";
  strengthEl.textContent = `Strength: ${word}`;
}

[password, confirmBox].forEach((box) => {
  box.addEventListener("keydown", (e) => {
    const capsOn = e.getModifierState && e.getModifierState("CapsLock");
    capsMsg.textContent = capsOn ? "Caps Lock is on." : "";
  });
  box.addEventListener("blur", () => {
    capsMsg.textContent = "";
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  updateForm();
  if (submitBtn.disabled) return;
  result.textContent = `Welcome, ${username.value.trim()}! Your account is ready.`;
  form.hidden = true;
  form.reset();
});