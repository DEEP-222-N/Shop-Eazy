import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to add items to cart");
        return;
      }

      await axios.post("http://localhost:5000/api/cart/add", 
        { productId: product._id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart");
    }
  };

  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="error">Product not found</div>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <div className="product-detail-image">
          <img 
            src={product.image.startsWith('http') ? product.image : `http://localhost:5000/${product.image}`}
            alt={product.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/600x400?text=Product+Image';
            }}
          />
        </div>
        <div className="product-detail-info">
          <div className="product-detail-header">
            <h1 className="product-detail-name">{product.name}</h1>
            <span className="product-detail-category">{product.category}</span>
          </div>
          
          <div className="product-detail-price-section">
            <div className="product-detail-price">₹{product.price}</div>
            {product.stock > 0 ? (
              <span className="stock in-stock">In Stock</span>
            ) : (
              <span className="stock out-of-stock">Out of Stock</span>
            )}
          </div>

          <div className="product-detail-description">
            <h3>Description</h3>
            <p>{product.description || "No description available"}</p>
          </div>

          <div className="product-detail-actions">
            <div className="quantity-selector">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="quantity-btn"
              >
                -
              </button>
              <span className="quantity-value">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="quantity-btn"
              >
                +
              </button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="add-to-cart-btn"
              disabled={!product.stock}
            >
              Add to Cart
            </button>
          </div>

          {product.stock > 0 && (
            <div className="delivery-info">
              <span className="delivery-icon">🚚</span>
              <span>Free Delivery</span>
              <span className="delivery-separator">•</span>
              <span>Delivery within 2-3 business days</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
