const categoryFilter = () => {
    const filterContainer = document.getElementById("filter-container");
      const categories = getProductCategories();
      const selectBox = document.getElementById("category");
      selectBox.addEventListener("change", () => filterByCategory(selectBox.value));
  
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.text = category;
        option.value = category;
        selectBox.add(option);
      });
  
      filterContainer.appendChild(selectBox);
    
  };
  
  
  const getProductCategories = () => {
    const categories = new Set();
    productList.forEach((product) => categories.add(product.category));
    return Array.from(categories);
  }
  
  const filterByCategory = (category) => {
    const filteredProducts = category ? productList.filter((product) => product.category === category) : productList;
    displayProducts(filteredProducts);
  }
  
  const searchProducts = (keyword) => {
    keyword = keyword.toLowerCase();
    const filteredProducts = productList.filter(
      (product) => 
      product.title.toLowerCase().includes(keyword) ||
      product.description.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword)
    );
    displayProducts(filteredProducts);
  }

  document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener("input", () => {
      searchProducts(searchInput.value);
    });
  });
  