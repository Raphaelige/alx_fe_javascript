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

// REQUIRED FUNCTION: displayRandomQuote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.textContent = "${quote.text}" — ${quote.category};
}

// REQUIRED FUNCTION: addQuote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (!text || !category) {
    alert("Please fill in both fields");
    return;
  }

  quotes.push({ text, category });
  textInput.value = "";
  categoryInput.value = "";
  displayRandomQuote();
}

// Create add-quote form dynamically
function createAddQuoteForm() {
  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.id = "newQuoteText";
  textInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);

  addQuoteForm.appendChild(textInput);
  addQuoteForm.appendChild(categoryInput);
  addQuoteForm.appendChild(addButton);
}

// REQUIRED EVENT LISTENER
newQuoteBtn.addEventListener("click", displayRandomQuote);

// Initialize
createAddQuoteForm();
displayRandomQuote();