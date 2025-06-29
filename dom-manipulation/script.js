let quotes = [
  { text: "The journey of a thousand miles begins with one step.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "To improve is to change; to be perfect is to change often.", category: "Motivation" }
];

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
  sessionStorage.setItem("quotes", JSON.stringify(quotes));
}

function createAddQuoteForm(container) {
  const formTitle = document.createElement("h3");
  formTitle.textContent = "Add a New Quote";
  container.appendChild(formTitle);

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.id = "newQuoteText";
  textInput.placeholder = "Enter a new quote";
  container.appendChild(textInput);

  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Enter quote category";
  categoryInput.style.marginLeft = "5px";
  container.appendChild(categoryInput);

  const addBtn = document.createElement("button");
  addBtn.textContent = "Add Quote";
  addBtn.style.marginLeft = "5px";
  addBtn.type = "button";
  addBtn.addEventListener("click", addQuote);
  container.appendChild(addBtn);
}

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

  sessionStorage.setItem("quotes", JSON.stringify(quotes));
}

function updateCategoryOptions() {
  const select = document.getElementById("categorySelect");
  const existingValue = select.value;

  const categories = Array.from(new Set(quotes.map(q => q.category)));
  select.innerHTML = `<option value="all">All</option>`;
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });

  if (categories.includes(existingValue)) {
    select.value = existingValue;
  }
}

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

function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (!Array.isArray(imported)) throw new Error("Invalid format");

      quotes.push(...imported);
      updateCategoryOptions();
      alert("Quotes imported successfully!");

      sessionStorage.setItem("quotes", JSON.stringify(quotes));
    } catch (err) {
      alert("Invalid JSON file.");
    }
  };
  reader.readAsText(event.target.files[0]);
}

window.onload = function () {
  const app = document.getElementById("app");

  // Load from sessionStorage if available
  const sessionQuotes = sessionStorage.getItem("quotes");
  if (sessionQuotes) {
    try {
      const parsed = JSON.parse(sessionQuotes);
      if (Array.isArray(parsed)) {
        quotes = parsed;
      }
    } catch (e) {
      console.warn("Failed to parse sessionStorage quotes");
    }
  }

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

  app.appendChild(document.createElement("hr"));

  // Add quote form
  createAddQuoteForm(app);

  updateCategoryOptions();

  // Load last shown quote if available
  const last = sessionStorage.getItem("lastQuote");
  if (last) {
    quoteDisplay.textContent = last;
  } else {
    showRandomQuote();
  }
};
