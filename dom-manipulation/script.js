// ---------------- QUOTES ARRAY ----------------
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Do something today that your future self will thank you for.", category: "Motivation" },
];

// ---------------- DOM ELEMENTS ----------------
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const addQuoteBtn = document.getElementById('addQuoteBtn');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
const categoryFilter = document.getElementById('categoryFilter');
const exportBtn = document.getElementById('exportQuotes');
const importFile = document.getElementById('importFile');

// ---------------- LOCAL STORAGE ----------------
if (localStorage.getItem('quotes')) {
  quotes = JSON.parse(localStorage.getItem('quotes'));
}

// ---------------- FUNCTIONS ----------------

// 1️⃣ Show a random quote based on selected category
function showRandomQuote() {
  const filteredQuotes = filterQuotesArray();
  if (filteredQuotes.length === 0) {
    quoteDisplay.innerText = "No quotes available for this category.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  quoteDisplay.innerText = "${quote.text}" - ${quote.category};
}

// 2️⃣ Add a new quote
function addQuote() {
  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim();

  if (!text || !category) {
    alert("Please enter both quote and category!");
    return;
  }

  // Add to quotes array
  quotes.push({ text, category });

  // Save to localStorage
  localStorage.setItem('quotes', JSON.stringify(quotes));

  // Update category filter and DOM
  populateCategories();
  showRandomQuote();

  // Clear input fields
  newQuoteText.value = '';
  newQuoteCategory.value = '';
}

// 3️⃣ Populate category dropdown
function populateCategories() {
  const categories = [...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = <option value="all">All Categories</option>;
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  // Restore last selected category from localStorage
  const lastCategory = localStorage.getItem('lastCategory') || 'all';
  categoryFilter.value = lastCategory;
}

// 4️⃣ Filter quotes array by selected category
function filterQuotesArray() {
  const selectedCategory = categoryFilter.value;
  if (selectedCategory === 'all') return quotes;
  return quotes.filter(q => q.category === selectedCategory);
}

// 5️⃣ Save last selected category
function saveLastCategory() {
  localStorage.setItem('lastCategory', categoryFilter.value);
}

// 6️⃣ Export quotes as JSON
function exportQuotes() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();
  URL.revokeObjectURL(url);
}

// 7️⃣ Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    const importedQuotes = JSON.parse(e.target.result);
    quotes.push(...importedQuotes);
    localStorage.setItem('quotes', JSON.stringify(quotes));
    populateCategories();
    showRandomQuote();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// ---------------- EVENT LISTENERS ----------------
newQuoteBtn.addEventListener('click', showRandomQuote);
addQuoteBtn.addEventListener('click', addQuote);
categoryFilter.addEventListener('change', () => {
  showRandomQuote();
  saveLastCategory();
});
exportBtn.addEventListener('click', exportQuotes);
importFile.addEventListener('change', importFromJsonFile);

// ---------------- INITIALIZATION ----------------
populateCategories();
showRandomQuote();