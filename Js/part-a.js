console.log("Forms lab ready");

const form = document.getElementById("reg-form");
const nameInput = document.getElementById("full-name");
const workshopSelect = document.getElementById("workshop");
const guestsInput = document.getElementById("guests");
const laptopBox = document.getElementById("laptop");
const statusMsg = document.getElementById("status");
const summary = document.getElementById("summary");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // stay on this page
  console.log("Form submitted");

  const name = nameInput.value.trim();                 
  const workshopText =
    workshopSelect.options[workshopSelect.selectedIndex].text; 
  const session =
    document.querySelector('input[name="session"]:checked').value;
  const guests = Number(guestsInput.value);
  const ownLaptop = laptopBox.checked;                

  
  console.log(Object.fromEntries(new FormData(form)));

  summary.textContent = ""; 

  const heading = document.createElement("h2");
  heading.textContent = "Registration received";

  const list = document.createElement("ul");
  const items = [
    `Name: ${name}`,
    `Workshop: ${workshopText}`,
    `Session: ${session}`,
    `Guests: ${guests}`,
    `Own laptop: ${ownLaptop ? "Yes" : "No"}`
  ];

  for (const text of items) {
    const li = document.createElement("li");
    li.textContent = text; 
    list.appendChild(li);
  }

  summary.appendChild(heading);
  summary.appendChild(list);

  statusMsg.textContent = `Thank you, ${name}!`;
  form.reset(); 
});