
import React, { useState } from 'react';
import styles from './AdminProducts.module.css';

const products = [
  { name: "718 Boxster Style Edition", description: "Price:11 EGP", image: "/frontend/products.webp/718 Boxster Style Edition.webp" },
  { name: "718 Boxster GTS 4.0", description: "Price:7 EGP", image: "/frontend/products.webp/718 Boxster GTS 4.0.webp" },
  { name: "718 Cayman GT4 RS", description: "Price:9 EGP", image: "/frontend/products.webp/718 Cayman GT4 RS.webp" },
  { name: "911 Carrera GTS", description: "Price:20 EGP", image: "/frontend/products.webp/911 Carrera GTS.webp" },
  { name: "718 Spyder RS", description: "Price:19 EGP", image: "/frontend/products.webp/718 Spyder RS.webp" },
  { name: "911 GT3 RS", description: "Price:11 EGP", image: "/frontend/products.webp/911 GT3 RS.webp" },
  { name: "911 Carrera GTS Cabriolet", description: "Price:4 EGP", image: "/frontend/products.webp/911 Carrera GTS Cabriolet.webp" },
  { name: "911 Turbo", description: "Price:19 EGP", image: "/frontend/products.webp/911 Turbo.webp" },
  { name: "911 GT3", description: "Price:7 EGP", image: "/frontend/products.webp/911 GT3.webp" },
  { name: "911 Dakar", description: "Price:13 EGP", image: "/frontend/products.webp/911 Dakar.webp" },
  { name: "Taycan", description: "Price:11 EGP", image: "/frontend/products.webp/Taycan.webp" },
  { name: "Panamera", description: "Price:9 EGP", image: "/frontend/products.webp/Panamera.webp" },
  { name: "Macan 4 Electric", description: "Price:120 EGP", image: "/frontend/products.webp/Macan 4 Electric.webp" },
  { name: "Cayenne", description: "Price: 5EGP", image: "/frontend/products.webp/Cayenne.webp" },
  { name: "eBike Sport 3rd Gen", description: "Price:9 EGP", image: "/frontend/products.webp/ebike.jpg" },
  { name: "Luxe Summer Knitted Blazer", description: "Price:9 EGP", image: "/frontend/products.webp/Luxe Summer Knitted Blazer.jpg" },
  { name: "RUBY eau de parfum", description: "Price:9 EGP", image: "/frontend/products.webp/RUBY eau de parfum.jpg" },
  { name: "Martini Racing watch", description: "Price:9 EGP", image: "/frontend/products.webp/Martini Racing watch.jpg" },
  { name: "Mules unisex – Turbo", description: "Price:9 EGP", image: "/frontend/products.webp/Mules unisex – Turbo.jpg" },
];

const AdminsProject = () => {
  const [cartCount, setCartCount] = useState(0);
  const [messageVisible, setMessageVisible] = useState(false);

  const addToCartAndShowMessage = () => {
    addToCart();
    showMessage();
  }

  const addToCart = () => {
    setCartCount(prevCount => prevCount + 1);
    showMessage();
  }

  const showMessage = () => {
    setMessageVisible(true);
    setTimeout(() => setMessageVisible(false), 2000);
  }

  const toggleSearchBar = () => {
    const searchBar = document.getElementById("searchBar");
    const header = document.querySelector(".header");
    const mainContent = document.querySelector(".main-content");

    if (searchBar.style.display === "none") {
      searchBar.style.display = "block";
      header.classList.add(styles.openSearch);
      mainContent.classList.add(styles.openSearch);
    } else {
      searchBar.style.display = "none";
      header.classList.remove(styles.openSearch);
      mainContent.classList.remove(styles.openSearch);
    }
  }

  const searchProducts = () => {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchInput));
    renderProducts(filteredProducts);
  }

  const renderProducts = (filteredProducts) => {
    const productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = "";

    filteredProducts.forEach(product => {
      const card = `
        <div className="col-md-4 mb-3">
          <div className="card">
            <img src="${product.image}" className="card-img-top" alt="${product.name}">
            <div className="card-body">
              <h5 className="card-title">${product.name}</h5>
              <p className="card-text">${product.description}</p>
              <button className="btn btn-primary buy-btn" onClick={addToCartAndShowMessage}>Buy Now</button>
              <button className="btn btn-danger delete-btn" onClick={deleteProduct}>Delete</button>
              <button className="btn btn-secondary update-btn" onClick={updateProduct}>Update</button>
            </div>
          </div>
        </div>
      `;
      productContainer.innerHTML += card;
    });
  }

  const clearCart = () => {
    setCartCount(0); // Reset cart count to zero
  }

  const addProduct = () => {
    alert("Add product functionality is not implemented in this static version.");
  }

  const updateProduct = () => {
    alert("Update product functionality is not implemented in this static version.");
  }

  const deleteProduct = () => {
    alert("Delete product functionality is not implemented in this static version.");
  }

  return (
    <div>
      <div className={styles.header}>
        <div className={`${styles.header} ${styles.mainContent}`}>
          <p className={`fs-1 fw-bold ${styles.animatedText}`}>
            <span className={styles.productTitle}>Products</span>
          </p>
          <div className={`${styles.tc} ${styles.textBox}`} id="tc">
            <div className={styles.searchContainer}>
              <i className={`bi bi-search ${styles.searchIcon}`} onClick={toggleSearchBar}></i>
              <div className={styles.header} id="searchBar" style={{ display: "none" }}>
                <input type="text" id="searchInput" onInput={searchProducts} placeholder="Search..." />
                <button className="btn btn-primary" onClick={searchProducts}>Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`container ${styles.rounded}`}>
        <div className="row" id="productContainer">
          {products.map((product, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card">
                <img src={product.image} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <button className="btn btn-primary buy-btn" onClick={addToCartAndShowMessage}>Buy Now</button>
                  <button className="btn btn-danger delete-btn" onClick={deleteProduct}>Delete</button>
                  <button className="btn btn-secondary update-btn" onClick={updateProduct}>Update</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`container mt-4 ${styles.textCenter}`}>
        <div className="row">
          <div className="col text-center">
            <button className="btn btn-success" onClick={addProduct}>Add Products!</button>
          </div>
        </div>
      </div>

      <div className={`container mt-4 ${styles.textCenter}`}>
        <div className="row">
          <div className="col text-center">
            <h3>Cart</h3>
            <p id="cartCount">{cartCount}</p>
            <button className="btn btn-danger" onClick={clearCart}>Clear Cart</button>
          </div>
        </div>
      </div>

      <div className={`container mt-4 ${styles.textCenter}`} id="messageSection">
        {messageVisible && 
          <div className="row">
            <div className="col text-center">
              <p id="message" className={styles.textSuccess}>Added to Cart!</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
export default AdminsProject;
