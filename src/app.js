/* --- API Integration --- */

// API URL
const apiUrl = "https://dummyjson.com/products";

// Error handling
const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

// Fetching
fetch(apiUrl)
  .then(handleErrors)
  .then((response) => response.json())
  .then((data) => {
    const productList = data.products || [];

    displayProducts(productList);

    
  })
  .catch((error) => {
    console.error("Error occured during fetching data:", error.message);
  });
/* --- End of API Integration --- */


const displayProducts = (productList) => {
  const productListElement = document.getElementById("app");

  productList.forEach((product) => {
      const productElement = document.createElement("div");

  productElement.classList.add("product-item");

      productElement.innerHTML = `
                <h2>${product.title}</h2>
                <p>Price: ${product.price}</p>
                <p>Discount: ${product.discountPercentage}%</p>
                <p>Category: ${product.category}</p>
                <p>Description: ${product.description}</p>
                <p>Stock: ${product.stock}</p>
                <img src="${product.thumbnail}" alt="${product.title}" style="max-width: 200px; max-height: 200px;">
            `;

      productListElement.appendChild(productElement);
    });
}