
// Core data: initial quotes
let quotes = [
  { text: "The journey of a thousand miles begins with one step.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "To improve is to change; to be perfect is to change often.", category: "Motivation" }
];

// Build UI on load
window.onload = function () {
  const app = document.getElementById("app");

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
  newQuoteBtn.id = "newQuote";
  newQuoteBtn.onclick = showRandomQuote;
  app.appendChild(newQuoteBtn);

  app.appendChild(document.createElement("hr"));

  // Create dynamic form
  createAddQuoteForm(app);

  // Populate initial categories and show first quote
  updateCategoryOptions();
  showRandomQuote();
};

// Generate a random quote from selected category
function showRandomQuote() {
  const category = document.getElementById("categorySelect").value;
  const filtered = category === "all" ? quotes : quotes.filter(q => q.category === category);
  const display = document.getElementById("quoteDisplay");

  if (filtered.length === 0) {
    display.textContent = "No quotes found in this category.";
    return;
  }

  const randomQuote = filtered[Math.floor(Math.random() * filtered.length)];
  display.textContent = `"${randomQuote.text}" (${randomQuote.category})`;
}

// Create the form to add quotes (DOM-only)
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
  addBtn.onclick = addQuote;
  container.appendChild(addBtn);
}

// Add a quote dynamically
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
}

// Update the category <select> dynamically
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


function showRandomQuote() {
  console.log("showRandomQuote triggered");
  const category = document.getElementById("categorySelect").value;
  const filtered = category === "all" ? quotes : quotes.filter(q => q.category === category);
  const display = document.getElementById("quoteDisplay");

  if (filtered.length === 0) {
    display.textContent = "No quotes found in this category.";
    return;
  }

  const randomQuote = filtered[Math.floor(Math.random() * filtered.length)];
  display.textContent = `"${randomQuote.text}" (${randomQuote.category})`;
}

// ...existing code...

window.onload = function () {
  const app = document.getElementById("app");

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
  newQuoteBtn.id = "newQuote";
  newQuoteBtn.type = "button";
  newQuoteBtn.addEventListener("click", showRandomQuote);
  app.appendChild(newQuoteBtn);

  app.appendChild(document.createElement("hr"));

  // Create dynamic form
  createAddQuoteForm(app);

  // Populate initial categories and show first quote
  updateCategoryOptions();
  showRandomQuote();
};

// ...existing code...

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

// ...existing code...