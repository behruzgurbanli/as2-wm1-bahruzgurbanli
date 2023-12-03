const apiUrl = "https://dummyjson.com/products";

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

let productList = []

const fetchProducts = () => {
fetch(apiUrl)
  .then(handleErrors)
  .then((response) => response.json())
  .then((data) => {
    productList = data.products || [];

    displayProducts(productList);

    categoryFilter();
  })
  .catch((error) => {
    console.error("Error occured during fetching data:", error.message);
  });
}

const displayProducts = (productList) => {
  const productListElement = document.getElementById("app");

  productListElement.innerHTML = "";

  productList.forEach((product) => {
      const productElement = createProductElement(product);
      productListElement.appendChild(productElement);
    });
}

const createProductElement = (product) => {
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
      productElement.addEventListener("click", () => productPage(product));

      return productElement;
}

const categoryFilter = () => {
  const categories = getProductCategories();
  const selectBox = document.createElement("select");
  selectBox.addEventListener("change", () => filterByCategory(selectBox.value));

  const allOptions = document.createElement("option");
  allOptions.text = "All";
  allOptions.value = "";
  selectBox.add(allOptions);

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.text = category;
    option.value = category;
    selectBox.add(option);
  })

  const filterContainer = document.getElementById("filter-container");
  filterContainer.innerHTML = "";
  filterContainer.appendChild(selectBox);
}

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
  })
});

const productPage = (product) => {
  const productPageContainer = document.createElement("div");
  productPageContainer.classList.add("product-page");

  const productDetails = document.createElement("div");
  productDetails.innerHTML = `
      <h2>${product.title}</h2>
      <p>Price: ${product.price}</p>
      <p>Discount: ${product.discountPercentage}%</p>
      <p>Category: ${product.category}</p>
      <p>Description: ${product.description}</p>
      <p>Stock: ${product.stock}</p>
      <img src="${product.thumbnail}" alt="${product.title}" style="max-width: 300px; max-height: 300px;">
  `;

  if (product.gallery && Array.isArray(product.gallery)) {
    const productGallery = document.createElement("div");
    productGallery.classList.add("gallery");

    product.gallery.forEach((image) => {
      const galleryImage = document.createElement("img");
      galleryImage.src = image;
      galleryImage.alt = product.title;
      productGallery.appendChild(galleryImage);
    });
    productPageContainer.appendChild(productGallery);
  }

  
  productPageContainer.appendChild(productDetails);
  
  const closeButton = document.createElement("button");
  closeButton.innerHTML = "&times;";
  closeButton.classList.add("close-button");
  closeButton.addEventListener("click", () => {
    document.body.removeChild(productPageContainer);
  });

  productPageContainer.appendChild(closeButton);
  
  document.body.appendChild(productPageContainer);
};
