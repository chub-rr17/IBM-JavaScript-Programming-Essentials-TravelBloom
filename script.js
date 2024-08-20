// Example data for search results
const data = {
  beach: [
    { name: "Maldives", img: "assets/beach-1.jpg" },
    { name: "Bora Bora", img: "assets/beach-2.jpg" },
  ],
  temple: [
    { name: "Angkor Wat", img: "assets/temple-1.jpg" },
    { name: "Borobudur", img: "assets/temple-2.jpg" },
  ],
  country: [
    { name: "France", img: "assets/paris.jpg" },
    { name: "Japan", img: "assets/japan.jpg" },
  ],
};

// Mapping keywords to categories
const keywordMap = {
  beach: "beach",
  temple: "temple",
  country: "country",
};

function searchDestinations() {
  const query = document.getElementById("search-bar").value.toLowerCase();
  const resultsContainer = document.getElementById("search-results");
  const recommendations = document.querySelectorAll(".recommendation");

  // Hide the recommendation sections initially
  recommendations.forEach((section) => (section.style.display = "none"));

  // Clear previous search results
  resultsContainer.innerHTML = "";

  let resultSet = [];

  // Check if query matches any keywords in the keywordMap
  const matchedCategory = Object.keys(keywordMap).find((keyword) =>
    query.includes(keyword)
  );

  if (matchedCategory) {
    resultSet = data[keywordMap[matchedCategory]];
  } else {
    // Search within all categories if no specific keyword is found
    for (const category in data) {
      const filteredItems = data[category].filter((item) =>
        item.name.toLowerCase().includes(query)
      );
      resultSet.push(...filteredItems);
    }
  }

  // Display the results or show a no-results message
  if (resultSet.length > 0) {
    resultsContainer.style.display = "block";
    resultSet.forEach((result) => {
      const resultItem = document.createElement("div");
      resultItem.className = "search-result-item";
      resultItem.style.marginBottom = "10px";
      resultItem.innerHTML = `
                <div style="display: flex; align-items: center">
                    <img src="${result.img}" alt="${result.name}" style="width: 100px; height: auto; margin-right: 10px;">
                    <div style="height: min-content">${result.name}</div>
                </div>
            `;
      resultsContainer.appendChild(resultItem);
    });
  } else {
    resultsContainer.style.display = "block";
    resultsContainer.textContent = "No results found.";
  }

  // Show the recommendations again if no search query is entered
  if (!query) {
    recommendations.forEach((section) => (section.style.display = "block"));
    resultsContainer.style.display = "none";
  }
}


function clearSearch() {
    document.getElementById('search-bar').value = '';
    searchDestinations(); // Call searchDestinations to reset the display
}