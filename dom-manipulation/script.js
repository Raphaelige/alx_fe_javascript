// Quotes array
const quotes = [
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" },
  { text: "Simplicity is the soul of efficiency.", category: "Programming" },
  { text: "Believe in yourself.", category: "Motivation" }
];

// DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteForm = document.getElementById("addQuoteForm");

// REQUIRED: displayRandomQuote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = quote.text + " — " + quote.category;
}

// REQUIRED: addQuote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value;
  const category = categoryInput.value;

  if (text === "" || category === "") {
    return;
  }

  quotes.push({ text: text, category: category });

  textInput.value = "";
  categoryInput.value = "";

  displayRandomQuote();
}

// Create add-quote form using DOM
function createAddQuoteForm() {
  const textInput = document.createElement("input");
  textInput.id = "newQuoteText";
  textInput.type = "text";
  textInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.innerHTML = "Add Quote";
  addButton.onclick = addQuote;

  addQuoteForm.appendChild(textInput);
  addQuoteForm.appendChild(categoryInput);
  addQuoteForm.appendChild(addButton);
}

// REQUIRED: button onclick (NOT addEventListener)
newQuoteBtn.onclick = displayRandomQuote;

// Initialize
createAddQuoteForm();
displayRandomQuote();