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

    const categoryFilterInput = document.getElementById('category');
    const searchingFilterInput = document.getElementById('search');

    const categories = getProductCategories();
    displayProducts(categories);
    displayProducts(productList);

    categoryFilterInput.addEventListener("change", filter);
    searchingFilterInput.addEventListener("input", filter);

    displayProducts(productList);
  })
  .catch((error) => {
    console.error("Error occured during fetching data:", error.message);
  });
}
