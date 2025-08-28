let products = [];
let currentProducts = [];
const productsPerPage = 9;
let currentPage = 1;
let showAllPages = false;

const productContainer = document.querySelector(".product-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageNumberSpan = document.getElementById("page-number");
const searchInput = document.querySelector(".search-column input[type='search']");
const pagination = document.querySelector(".pagination1");
const suggestionContainer = document.querySelector(".suggested-blogs");

fetch('/css/blogs.json')
  .then(response => response.json())
  .then(data => {
    products = data;
    currentProducts = [...products];

    if (productContainer) {
      renderProducts();

      prevBtn?.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          renderProducts();
        }
      });

      nextBtn?.addEventListener("click", () => {
        if (currentPage < Math.ceil(currentProducts.length / productsPerPage)) {
          currentPage++;
          renderProducts();
        }
      });

      searchInput?.addEventListener("input", () => {
        const term = searchInput.value.trim().toLowerCase();
        currentProducts = term
          ? products.filter(p => p.name.toLowerCase().includes(term))
          : [...products];
        currentPage = 1;
        showAllPages = false;
        pagination.style.display = term ? "none" : "flex";
        renderProducts();
      });
    }

    if (suggestionContainer) {
      renderSuggestions();
    }
  })
  .catch(error => console.error("Error loading products:", error));


function renderProducts() {
  productContainer.innerHTML = "";
  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const pageItems = currentProducts.slice(start, end);

  pageItems.forEach(product => {
    productContainer.innerHTML += `
    <a href="/blog/${product.link}">  
    <article>
        <p class="datepara"><i class="fa-solid fa-calendar-days"></i> <span>${product.date}</span></p>
        <img src="/images/blog/${product.images}" alt="${product.name}">
        <section>
          <h4>${product.name}</h4>
          <hr>
          <p>${product.para}...</p>
          </section>
          </article>
          </a>
    `;
  });

  updatePagination();
}

function updatePagination() {
  const totalPages = Math.ceil(currentProducts.length / productsPerPage);
  pagination.style.display = totalPages > 1 && currentProducts.length !== products.length ? "none" : "flex";

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;

  pageNumberSpan.innerHTML = "";

  if (showAllPages || totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) createPageBtn(i);
  } else {
    createPageBtn(1);
    createPageBtn(2);
    createPageBtn(3);

    if (currentPage > 4) addEllipsis();
    if (currentPage > 3 && currentPage < totalPages - 2) createPageBtn(currentPage);
    if (currentPage < totalPages - 3) addEllipsis();

    createPageBtn(totalPages - 2);
    createPageBtn(totalPages - 1);
    createPageBtn(totalPages);
  }
}

function createPageBtn(num) {
  const btn = document.createElement("button");
  btn.textContent = num;
  if (num === currentPage) btn.classList.add("active");
  btn.addEventListener("click", () => {
    currentPage = num;
    renderProducts();
  });
  pageNumberSpan.appendChild(btn);
}

function addEllipsis() {
  const span = document.createElement("span");
  span.textContent = "...";
  span.classList.add("ellipsis");
  span.addEventListener("click", () => {
    showAllPages = true;
    updatePagination();
  });
  pageNumberSpan.appendChild(span);
}

function renderSuggestions() {
  const itemsToShow = products.slice(0, 6);
  suggestionContainer.innerHTML = "";
  itemsToShow.forEach(product => {
    suggestionContainer.innerHTML += `
      <a href="/blog/${product.link}">  
    <article>
        <p class="datepara"><i class="fa-solid fa-calendar-days"></i> <span>${product.date}</span></p>
        <img src="/images/blog/${product.images}" alt="${product.name}">
        <section>
          <h4>${product.name}</h4>
          <hr>
          <p>${product.para}...</p>
          </section>
          </article>
          </a>
    `;
  });
}
