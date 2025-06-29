// ...existing code...

// Utility function to save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Utility function to load quotes from localStorage
function loadQuotes() {
  const stored = localStorage.getItem("quotes");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        quotes = parsed;
      }
    } catch (e) {
      console.warn("Failed to parse localStorage quotes");
    }
  }
}

// Update showRandomQuote to only use sessionStorage for lastQuote
function showRandomQuote() {
  const category = document.getElementById("categorySelect").value;
  const filtered = category === "all" ? quotes : quotes.filter(q => q.category === category);
  const display = document.getElementById("quoteDisplay");

  if (filtered.length === 0) {
    display.textContent = "No quotes found in this category.";
    return;
  }

  const randomQuote = filtered[Math.floor(Math.random() * filtered.length)];
  const message = `"${randomQuote.text}" (${randomQuote.category})`;
  display.textContent = message;

  // Save to sessionStorage
  sessionStorage.setItem("lastQuote", message);
}

// Update addQuote to save to localStorage
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

  updateCategoryOptions();
  alert("Quote added successfully!");

  saveQuotes(); // Save to localStorage
}

// Update importFromJsonFile to save to localStorage
function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (!Array.isArray(imported)) throw new Error("Invalid format");

      quotes.push(...imported);
      updateCategoryOptions();
      alert("Quotes imported successfully!");

      saveQuotes(); // Save to localStorage
    } catch (err) {
      alert("Invalid JSON file.");
    }
  };
  reader.readAsText(event.target.files[0]);
}

// Update exportQuotes to use current quotes array
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

window.onload = function () {
  const app = document.getElementById("app");

  // Load from localStorage if available
  loadQuotes();

  // Category selector
  const categoryLabel = document.createElement("label");
  categoryLabel.textContent = "Select Category: ";
  const categorySelect = document.createElement("select");
  categorySelect.id = "categorySelect";
  categorySelect.innerHTML = `<option value="all">All</option>`;
  app.appendChild(categoryLabel);
  app.appendChild(categorySelect);
  app.appendChild(document.createElement("br"));

  // Quote display
  const quoteDisplay = document.createElement("div");
  quoteDisplay.id = "quoteDisplay";
  quoteDisplay.style.margin = "20px 0";
  app.appendChild(quoteDisplay);

  // Show quote button
  const newQuoteBtn = document.createElement("button");
  newQuoteBtn.textContent = "Show New Quote";
  newQuoteBtn.type = "button";
  newQuoteBtn.addEventListener("click", showRandomQuote);
  app.appendChild(newQuoteBtn);

  // Export button
  const exportBtn = document.createElement("button");
  exportBtn.textContent = "Export Quotes (JSON)";
  exportBtn.type = "button";
  exportBtn.style.marginLeft = "10px";
  exportBtn.addEventListener("click", exportQuotes);
  app.appendChild(exportBtn);

  // Import input
  const importInput = document.createElement("input");
  importInput.type = "file";
  importInput.accept = ".json";
  importInput.style.marginLeft = "10px";
  importInput.addEventListener("change", importFromJsonFile);
  app.appendChild(importInput);

  app.appendChild(document.createElement("hr"));

  // Add quote form
  createAddQuoteForm(app);

  updateCategoryOptions();

  // Load last shown quote if available (from sessionStorage)
  const last = sessionStorage.getItem("lastQuote");
  if (last) {
    quoteDisplay.textContent = last;
  } else {
    showRandomQuote();
  }
};