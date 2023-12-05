const createPagination = (totalItems) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginationContainer = document.getElementById("pagination-container");
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.innerText = i;
    pageButton.addEventListener("click", () => changePage(i));
    paginationContainer.appendChild(pageButton);
  }
};

const changePage = (newPage) => {
  currentPage = newPage;
  createPagination(productList.length);
  displayProducts(productList);
};
