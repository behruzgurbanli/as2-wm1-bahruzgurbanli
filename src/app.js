const apiUrl = "https://dummyjson.com/products?limit=100";

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

let productList = []
const itemsPerPage = 10;
let currentPage = 1;

const fetchProducts = () => {
fetch(apiUrl)
  .then(handleErrors)
  .then((response) => response.json())
  .then((data) => {
    productList = data.products || [];
    categoryFilter();
    displayProducts(productList);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
}
