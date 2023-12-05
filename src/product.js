const displayProducts = (productList) => {
  const productListElement = document.getElementById("app");

  productListElement.innerHTML = "";

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = productList.slice(startIndex, endIndex);

  displayedProducts.forEach((product) => {
    const productElement = createProductElement(product);
    productListElement.appendChild(productElement);
  });
  categoryFilter();
  createPagination(productList.length);
};

const createProductElement = (product) => {
  const productElement = document.createElement("div");
  productElement.classList.add("product-item");

  productElement.innerHTML = `
                  <h2>${product.title}</h2>
                  <p>Price: ${product.price}</p>
                  <p>Discount: ${product.discountPercentage}%</p>
                  <p>Category: ${product.category}</p>
                  <p>Stock: ${product.stock}</p>
                  <img src="${product.thumbnail}" alt="${product.title}" style="max-width: 200px; max-height: 200px;">
              `;
  productElement.addEventListener("click", () => productPage(product));

  return productElement;
};
