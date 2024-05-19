
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import styles from './adminProducts.module.css';

// // const adminProducts = () => {

// //   const [products, setProducts] = useState([]);
// //   const [searchInput, setSearchInput] = useState('');
// //   const [cartCount, setCartCount] = useState(0);
// //   const [filteredProducts, setFilteredProducts] = useState([]);
// //   const [messageVisible, setMessageVisible] = useState(false);

// //   const fetchProducts = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:3000/api/v1/product/getAllProducts', {
// //         withCredentials: true
// //       });

// //       console.log('Fetched products:', response.data);
// //       setProducts(response.data);
// //     } catch (error) {
// //       console.error('Error fetching products:', error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProducts();
// //   }, []);

// //   useEffect(() => {
// //     setFilteredProducts(products);
// //   }, [products]);

// //   const handleSearchInput = (e) => {
// //     setSearchInput(e.target.value);
// //     searchProducts(e.target.value);
// //   };

// //   const searchProducts = (searchInput) => {
// //     const filtered = products.filter((product) =>
// //       product.ProductName.toLowerCase().includes(searchInput.toLowerCase())
// //     );
// //     setFilteredProducts(filtered);
// //     renderProducts(filtered);
// //   };


// //   const addToCart = () => {
// //     setCartCount(cartCount + 1);
// //     showMessage();
// //   };

// //   const showMessage = () => {
// //     setMessageVisible(true);
// //     setTimeout(() => {
// //       setMessageVisible(false);
// //     }, 2000);
// //   };

// //   const toggleSearchBar = () => {
// //     const searchBar = document.getElementById("searchBar");
// //     const header = document.querySelector(".header");
// //     const mainContent = document.querySelector(".main-content");

// //     if (searchBar.style.display === "none") {
// //       searchBar.style.display = "block";
// //       header.classList.add(styles.openSearch);
// //       mainContent.classList.add(styles.openSearch);
// //     } else {
// //       searchBar.style.display = "none";
// //       header.classList.remove(styles.openSearch);
// //       mainContent.classList.remove(styles.openSearch);
// //     }
// //   }



// //   const renderProducts = (filteredProducts) => {
// //     const productContainer = document.getElementById("productContainer");
// //     productContainer.innerHTML = "";

// //     filteredProducts.forEach(product => {
// //       const card = `
// //         <div className="col-md-4 mb-3">
// //           <div className="card">
// //             <img src="${product.image}" className="card-img-top" alt="${product.name}">
// //             <div className="card-body">
// //               <h5 className="card-title">${product.name}</h5>
// //               <p className="card-text">${product.description}</p>
// //               <button className="btn btn-primary buy-btn" onClick={addToCartAndShowMessage}>Buy Now</button>
// //               <button className="btn btn-danger delete-btn" onClick={deleteProduct}>Delete</button>
// //               <button className="btn btn-secondary update-btn" onClick={updateProduct}>Update</button>
// //             </div>
// //           </div>
// //         </div>
// //       `;
// //       productContainer.innerHTML += card;
// //     });
// //   }

// //   const clearCart = () => {
// //     setCartCount(0); // Reset cart count to zero
// //   }

// //   const addProduct = () => {
// //     alert("Add product functionality is not implemented in this static version.");
// //   }

// //   const updateProduct = () => {
// //     alert("Update product functionality is not implemented in this static version.");
// //   }

// //   const deleteProduct = () => {
// //     alert("Delete product functionality is not implemented in this static version.");
// //   }

// //   return (
// //     <div>
// //       <div className={styles.header}>
// //         <div className={`${styles.header} ${styles.mainContent}`}>
// //           <p className={`fs-1 fw-bold ${styles.animatedText}`}>
// //             <span className={styles.productTitle}>Products</span>
// //           </p>
// //           <div className={`${styles.tc} ${styles.textBox}`} id="tc">
// //             <div className={styles.searchContainer}>
// //               <i className={`bi bi-search ${styles.searchIcon}`} onClick={toggleSearchBar}></i>
// //               <div className={styles.header} id="searchBar" style={{ display: "none" }}>
// //                 <input type="text" id="searchInput" onInput={searchProducts} placeholder="Search..." />
// //                 <button className="btn btn-primary" onClick={searchProducts}>Search</button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className={`container ${styles.rounded}`}>
// //         <div className="row" id="productContainer">
// //           {products.map((product, index) => (
// //             <div className="col-md-4 mb-3" key={index}>
// //               <div className="card">
// //                 <img src={product.image} className="card-img-top" alt={product.name} />
// //                 <div className="card-body">
// //                   <h5 className="card-title">{product.name}</h5>
// //                   <p className="card-text">{product.description}</p>
// //                   <button className="btn btn-primary buy-btn" onClick={addToCart}>Buy Now</button>
// //                   <button className="btn btn-danger delete-btn" onClick={deleteProduct}>Delete</button>
// //                   <button className="btn btn-secondary update-btn" onClick={updateProduct}>Update</button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       <div className={`container mt-4 ${styles.textCenter}`}>
// //         <div className="row">
// //           <div className="col text-center">
// //             <button className="btn btn-success" onClick={addProduct}>Add Products!</button>
// //           </div>
// //         </div>
// //       </div>

// //       <div className={`container mt-4 ${styles.textCenter}`}>
// //         <div className="row">
// //           <div className="col text-center">
// //             <h3>Cart</h3>
// //             <p id="cartCount">{cartCount}</p>
// //             <button className="btn btn-danger" onClick={clearCart}>Clear Cart</button>
// //           </div>
// //         </div>
// //       </div>

// //       <div className={`container mt-4 ${styles.textCenter}`} id="messageSection">
// //         {messageVisible &&
// //           <div className="row">
// //             <div className="col text-center">
// //               <p id="message" className={styles.textSuccess}>Added to Cart!</p>
// //             </div>
// //           </div>
// //         }
// //       </div>
// //     </div>
// //   );
// // };
// // export default adminProducts;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AdminProducts.module.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [messageVisible, setMessageVisible] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/product/getAllProducts', {
        method: 'POST',
        withCredentials: true,
      });

      console.log('Fetched products:', response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    searchProducts(e.target.value);
  };

  const searchProducts = (searchInput) => {
    const filtered = products.filter((product) =>
      product.ProductName.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const addToCart = () => {
    setCartCount(cartCount + 1);
    showMessage();
  };

  const showMessage = () => {
    setMessageVisible(true);
    setTimeout(() => {
      setMessageVisible(false);
    }, 2000);
  };

  const toggleSearchBar = () => {
    const searchBar = document.getElementById('searchBar');
    const header = document.querySelector('.header');
    const mainContent = document.querySelector('.main-content');

    if (searchBar.style.display === 'none') {
      searchBar.style.display = 'block';
      header.classList.add(styles.openSearch);
      mainContent.classList.add(styles.openSearch);
    } else {
      searchBar.style.display = 'none';
      header.classList.remove(styles.openSearch);
      mainContent.classList.remove(styles.openSearch);
    }
  };

  const clearCart = () => {
    setCartCount(0); // Reset cart count to zero
  };

  const addProduct = (newProduct) => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/product/addProduct', newProduct, {

          withCredentials: true
        });

        console.log('Fetched products:', response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  };

  const updateProduct = () => {
    alert('Update product functionality is not implemented in this static version.');
  };

  const deleteProduct = (product) => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/product/deleteProduct/${product.ProductId}`, {
          ProductId: product.ProductId,
          withCredentials: true
        });

        console.log('Fetched products:', response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  };
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
              <div className={styles.header} id="searchBar" style={{ display: 'none' }}>
                <input
                  type="text"
                  id="searchInput"
                  value={searchInput}
                  onChange={handleSearchInput}
                  placeholder="Search..."
                />
                <button className="btn btn-primary" onClick={() => searchProducts(searchInput)}>Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`container ${styles.rounded}`}>
        <div className="row" id="productContainer">
          {filteredProducts.map((product, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card">
                <img src={product.image} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <button className="btn btn-primary buy-btn" onClick={addToCart}>Buy Now</button>
                  <button className="btn btn-danger delete-btn" onClick={() => deleteProduct(product)}>Delete</button>
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
            <button className="btn btn-success" onClick={() => addProduct(newProduct)}>Add Products!</button>
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
        {messageVisible && (
          <div className="row">
            <div className="col text-center">
              <p id="message" className={styles.textSuccess}>Added to Cart!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
