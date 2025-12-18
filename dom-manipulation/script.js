// Quotes data
const quotes = [
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" },
  { text: "Simplicity is the soul of efficiency.", category: "Programming" },
  { text: "Believe in yourself.", category: "Motivation" }
];

// Get DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteForm = document.getElementById("addQuoteForm");

// Show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.textContent = "${quote.text}" — ${quote.category};
}

// Create form dynamically to add quotes
function createAddQuoteForm() {
  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";

  addButton.addEventListener("click", function () {
    const text = textInput.value.trim();
    const category = categoryInput.value.trim();

    if (!text || !category) {
      alert("Please fill in both fields");
      return;
    }

    quotes.push({ text, category });
    textInput.value = "";
    categoryInput.value = "";
    showRandomQuote();
  });

  addQuoteForm.appendChild(textInput);
  addQuoteForm.appendChild(categoryInput);
  addQuoteForm.appendChild(addButton);
}

// Event listener
newQuoteBtn.addEventListener("click", showRandomQuote);

// Initialize app
createAddQuoteForm();
showRandomQuote();