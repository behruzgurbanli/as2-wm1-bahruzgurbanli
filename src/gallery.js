const productPage = (product) => {
    const productPageContainer = document.createElement("div");
    productPageContainer.classList.add("product-page");
  
    const productDetails = document.createElement("div");
    productDetails.innerHTML = `
        <h2>${product.title}</h2>
        <p>Brand: ${product.brand}</p>
        <p>Price: ${product.price}</p>
        <p>Rating: ${product.rating}</p>
        <p>Discount: ${product.discountPercentage}%</p>
        <p>Category: ${product.category}</p>
        <p>Description: ${product.description}</p>
        <p>Stock: ${product.stock}</p>
    `;
  
  const galleryImages = document.createElement("div");

  product.images.forEach((image) => {
    const img = document.createElement("img");
    img.src = image;
    img.alt = product.title;
    img.style.maxHeight = "100px";
    img.style.maxWidth = "100px";
    galleryImages.appendChild(img);
  });

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
  
    productDetails.appendChild(galleryImages);
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
  