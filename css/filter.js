const searchInput = document.getElementById("search-input");
const resultsDiv = document.getElementById("results");

searchInput.addEventListener("input", function () {
  filterResults();
});

function filterResults() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  resultsDiv.innerHTML = "";

  if (searchTerm === "") {
    return;
  }

  const data = [
    { name: "Mauritius Tour Packages", pagename: "https://www.vootholidays.com/mauritius-tour-packages" },
    { name: "Malaysia Tour Packages", pagename: "https://www.vootholidays.com/malaysia-tour-packages" },
    { name: "Japan Tour Packages", pagename: "https://www.vootholidays.com/japan-tour-packages" },
    { name: "Europe Tour Packages", pagename: "https://www.vootholidays.com/europe-tour-packages" },
    { name: "Lakshadweep Tour Packages", pagename: "https://www.vootholidays.com/lakshadweep-tour-packages" },
    { name: "Ladakh Tour Packages", pagename: "https://www.vootholidays.com/ladakh-tour-packages" },
    { name: "Thailand Tour Packages", pagename: "https://www.vootholidays.com/thailand-tour-packages" },
    { name: "Almaty Tour Packages", pagename: "https://www.vootholidays.com/almaty-tour-packages" },
    { name: "Darjeeling Tour Packages", pagename: "https://www.vootholidays.com/darjeeling-tour-packages" },
    { name: "Vietnam Tour Packages", pagename: "https://www.vootholidays.com/vietnam-tour-packages" },
    { name: "Andman Tour Packages", pagename: "https://www.vootholidays.com/andaman-tour-packages" },
    { name: "Bali Tour Packages", pagename: "https://www.vootholidays.com/bali-tour-packages" },
    { name: "North East Tour Packages", pagename: "https://www.vootholidays.com/north-east-tour-packages" },
    { name: "Ayodhya Tour Packages", pagename: "https://www.vootholidays.com/ayodhya-tour-packages" },
    { name: "Family Holiday in Chennai", pagename: "https://www.vootholidays.com/family-holiday-packages-chennai" },
    { name: "Rajkot Holiday Packages", pagename: "https://www.vootholidays.com/holiday-packages-rajkot" },
    { name: "International Holiday Packages", pagename: "https://www.vootholidays.com/cheap-international-holiday-packages" },
    { name: "Indian Holiday Packages", pagename: "https://www.vootholidays.com/holiday-packages-in-india" },
    { name: "Goa Holiday Packages", pagename: "https://www.vootholidays.com/family-holiday-packages-goa" },
    { name: "Dubai Holiday Packages", pagename: "https://www.vootholidays.com/dubai-holiday-packages" },
    { name: "Domestic Holiday Packages", pagename: "https://www.vootholidays.com/domestic-holiday-packages" },
    { name: "Kashmir Holiday Packages", pagename: "https://www.vootholidays.com/kashmir-4night-5Days-package" },
    { name: "Himachal Holiday Packages", pagename: "https://www.vootholidays.com/himachal-package-9N-10D" },
    { name: "Shimla Manali Holiday Packages", pagename: "https://www.vootholidays.com/shimla-manali-holiday" },
    { name: "Kerala Delight", pagename: "https://www.vootholidays.com/kerala-delight" }
  ];


  const filteredData = data.filter(item => {
    const nameMatch = item.name.toLowerCase().includes(searchTerm);
    const descriptionMatch = item.pagename.toLowerCase().includes(searchTerm);
    return nameMatch || descriptionMatch;
  });

  if (filteredData.length === 0) {
    resultsDiv.innerHTML = "<div>No results found.</div>";
    return;
  }

  filteredData.forEach(item => {
    const resultItem = document.createElement("div");
    resultItem.innerHTML = `<a href="${item.pagename}">${item.name}</a>`;
    resultItem.addEventListener("click", function () {
      searchInput.value = item.name;
      resultsDiv.innerHTML = "";
    });
    resultsDiv.appendChild(resultItem);
  });
}
