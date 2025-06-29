let quotes = [];
let selectedCategory = "all"; // Track the selected category

// Load quotes from localStorage
function loadQuotes() {
  const stored = localStorage.getItem("quotes");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        quotes = parsed;
      }
    } catch (e) {
      quotes = [];
    }
  }
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Populate categories in the filter dropdown
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  const categories = [...new Set(quotes.map(q => q.category))];
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categoryFilter.appendChild(opt);
  });
  // Restore last selected filter from localStorage or use selectedCategory
  const lastFilter = localStorage.getItem("lastCategoryFilter");
  if (lastFilter) {
    selectedCategory = lastFilter;
  }
  categoryFilter.value = selectedCategory;
}

// Fetch quotes from a real API endpoint using async/await
async function fetchQuotesFromServer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    // Map the fetched posts to your quote format (use first 5 for demo)
    return data.slice(0, 5).map(post => ({
      text: post.title,
      category: "Imported"
    }));
  } catch (error) {
    // Fallback to default quotes if fetch fails
    return [
      { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
      { text: "Life is what happens when you're busy making other plans.", category: "Life" },
      { text: "Success is not in what you have, but who you are.", category: "Success" }
    ];
  }
}

window.onload = async function () {
  loadQuotes();
  if (quotes.length === 0) {
    // If no quotes in localStorage, fetch from server
    quotes = await fetchQuotesFromServer();
    saveQuotes();
  }
  populateCategories();

  // Create quote display area if not present
  let quoteDisplay = document.getElementById("quoteDisplay");
  if (!quoteDisplay) {
    quoteDisplay = document.createElement("div");
    quoteDisplay.id = "quoteDisplay";
    quoteDisplay.style.margin = "20px 0";
    document.getElementById("app").appendChild(quoteDisplay);
  }

  filterQuotes();

  // Make quote display clickable to show another random quote from current filter
  quoteDisplay.addEventListener("click", function () {
    // Only show a new random quote if there is more than one in the filtered list
    const category = selectedCategory;
    let filtered = quotes;
    if (category !== "all") {
      filtered = quotes.filter(q => q.category === category);
    }
    if (filtered.length > 1) {
      showRandomQuoteFromFiltered();
    }
  });

  // Create add-quote form
  createAddQuoteForm(document.getElementById("app"));

  // Attach filterQuotes to the dropdown
  document.getElementById("categoryFilter").addEventListener("change", filterQuotes);

  // Attach export functionality
  const exportBtn = document.getElementById("exportBtn");
  if (exportBtn) {
    exportBtn.addEventListener("click", exportQuotes);
  }

  // Attach import functionality if you have an input with id="importFile"
  const importInput = document.getElementById("importFile");
  if (importInput) {
    importInput.addEventListener("change", importFromJsonFile);
  }
};

// Show a random quote from the filtered list
function showRandomQuoteFromFiltered() {
  const category = selectedCategory;
  let filtered = quotes;
  if (category !== "all") {
    filtered = quotes.filter(q => q.category === category);
  }
  const display = document.getElementById("quoteDisplay");
  if (filtered.length === 0) {
    display.textContent = "No quotes found in this category.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * filtered.length);
  const q = filtered[randomIndex];
  display.innerHTML = `<div>"${q.text}" (${q.category})</div>`;
}

// Filter quotes based on selected category and show one random quote
function filterQuotes() {
  const category = document.getElementById("categoryFilter").value;
  selectedCategory = category; // Update selectedCategory
  localStorage.setItem("lastCategoryFilter", category); // Remember filter
  showRandomQuoteFromFiltered();
}

// Add quote form creation
function createAddQuoteForm(container) {
  const form = document.createElement("div");
  form.innerHTML = `
    <h3>Add a New Quote</h3>
    <input type="text" id="newQuoteText" placeholder="Enter a new quote" />
    <input type="text" id="newQuoteCategory" placeholder="Enter quote category" style="margin-left:5px;" />
    <button id="addQuoteBtn" style="margin-left:5px;">Add Quote</button>
  `;
  container.appendChild(form);

  document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
}

// Add quote logic
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();
  if (!text || !category) {
    alert("Please fill in both quote and category.");
    return;
  }
  quotes.push({ text, category });
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
  saveQuotes();
  populateCategories();
  filterQuotes();
  alert("Quote added successfully!");
}

// Export quotes as JSON
function exportQuotes() {
  const data = JSON.stringify(quotes, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (!Array.isArray(imported)) throw new Error("Invalid format");
      quotes.push(...imported);
      saveQuotes();
      populateCategories();
      filterQuotes();
      alert("Quotes imported successfully!");
    } catch (err) {
      alert("Invalid JSON file.");
    }
  };
  reader.readAsText(event.target.files[0]);
}

// On page load
window.onload = function () {
  loadQuotes();
  populateCategories();

  // Create quote display area if not present
  let quoteDisplay = document.getElementById("quoteDisplay");
  if (!quoteDisplay) {
    quoteDisplay = document.createElement("div");
    quoteDisplay.id = "quoteDisplay";
    quoteDisplay.style.margin = "20px 0";
    document.getElementById("app").appendChild(quoteDisplay);
  }

  filterQuotes();

  // Make quote display clickable to show another random quote from current filter
  quoteDisplay.addEventListener("click", function () {
    // Only show a new random quote if there is more than one in the filtered list
    const category = selectedCategory;
    let filtered = quotes;
    if (category !== "all") {
      filtered = quotes.filter(q => q.category === category);
    }
    if (filtered.length > 1) {
      showRandomQuoteFromFiltered();
    }
  });

  // Create add-quote form
  createAddQuoteForm(document.getElementById("app"));

  // Attach filterQuotes to the dropdown
  document.getElementById("categoryFilter").addEventListener("change", filterQuotes);

  // Attach export functionality
  const exportBtn = document.getElementById("exportBtn");
  if (exportBtn) {
    exportBtn.addEventListener("click", exportQuotes);
  }

  // Attach import functionality if you have an input with id="importFile"
  const importInput = document.getElementById("importFile");
  if (importInput) {
    importInput.addEventListener("change", importFromJsonFile);
  }
};