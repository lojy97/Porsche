
// export default Products;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './product.module.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [messageVisible, setMessageVisible] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/product/getAllProducts', {
        withCredentials: true
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


  const addToCart = (product) => {
    setCartCount(cartCount + 1);
    showMessage();
    let customerId;
    const fetchCustomer = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/customer/Get', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch customer data (status: ${response.status})`);
        }
        const data = await response.json();
        console.log('Fetched customer data:', data);
        customerId = (data.customerId);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    const fetchCart = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/cart/AddCart',
          {
            productId: product.ProductId,
            quantity: 1,
            customerId: customerId
          },
          {
            withCredentials: true
          }
        );

        console.log('Fetched cart:', response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }


    };
  };

  const showMessage = () => {
    setMessageVisible(true);
    setTimeout(() => {
      setMessageVisible(false);
    }, 2000);
  };

  return (
    <div className={styles.products}>
      <div style={{ backgroundColor: 'whitesmoke' }}>
        <div className="container">
          <div className="header main-content">
            <p className="fs-1 fw-bold animated-text">PRODUCTS</p>
            <div className="tc text-box" id="tc">
              {/* Search Bar */}
              <div className="search-container">
                {/* Search Icon inside search container */}
                <i className="bi bi-search search-icon" onClick={() => setSearchInput('')}></i>
                {/* Search Bar content */}
                <div className="header" id="searchBar" style={{ display: 'block' }}>
                  <input
                    type="text"
                    id="searchInput"
                    value={searchInput}
                    onChange={handleSearchInput}
                    placeholder="Search..."
                  />
                  {/* Add search button */}
                  <button className="btn btn-primary" onClick={() => searchProducts(searchInput)}>Search</button>
                </div>
              </div>

              {/* Products Section */}
              <div className="container rounded">
                <div className="row" id="productContainer">
                  {filteredProducts.map((product, index) => (
                    <div className="col-md-4 mb-3" key={index}>
                      <div className={`card ${styles.card}`}>
                        <img src={product.url} className="card-img-top" alt={product.name} />
                        <p>{product.ProductName}</p>
                        <p>{product.price}</p>
                        <div className="card-body">
                          <h5 className="card-title">{product.name}</h5>
                          <p className="card-text">{product.description}</p>
                          <button className="btn btn-primary buy-btn" onClick={() => addToCart(product)}>Buy Now</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart Section */}
              <div className="container mt-4">
                <div className="row">
                  <div className="col text-center">
                    <h3>Cart</h3>
                    <p id="cartCount">{cartCount}</p>
                  </div>
                </div>
              </div>

              {/* Message Section */}
              {messageVisible && (
                <div className="container mt-4" id="messageSection">
                  <div className="row">
                    <div className="col text-center">
                      <p id="message" className="text-success">Added to Cart!</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
