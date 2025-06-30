import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import "./Products.css";

function ProductCard({ product }) {
  const { addToCart, cartItems, updateQuantity, removeFromCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Find if product is in cart
  const cartItem = cartItems.find(item => item.productId && (item.productId._id === product._id));
  const cartQuantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to add items to cart");
        return;
      }
      await addToCart(product._id, 1);
      // No alert
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleUpdateQuantity = async (newQuantity) => {
    if (newQuantity < 1) {
      await removeFromCart(product._id);
      return;
    }
    try {
      await updateQuantity(product._id, newQuantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleAddToCartFromModal = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to add items to cart");
        return;
      }
      await addToCart(product._id, quantity);
      setShowModal(false);
      setQuantity(1);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleUpdateQuantityModal = async (newQuantity) => {
    if (newQuantity < 1) {
      await removeFromCart(product._id);
      setQuantity(1);
      return;
    }
    try {
      await updateQuantity(product._id, newQuantity);
      setQuantity(newQuantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const getProductDetails = (category) => {
    const details = {
      'Fruits': {
        benefits: ['Rich in vitamins and minerals', 'Natural source of antioxidants', 'High in dietary fiber', 'Boosts immune system'],
        storage: 'Store in refrigerator for longer shelf life',
        origin: 'Freshly sourced from local farms'
      },
      'Pickles': {
        benefits: ['Traditional Indian recipe', 'Aids in digestion', 'Rich in probiotics', 'Enhances meal taste'],
        storage: 'Store in cool, dry place. Refrigerate after opening',
        origin: 'Made with authentic spices and ingredients'
      },
      'Vegetables': {
        benefits: ['Fresh and organic', 'Rich in essential nutrients', 'High fiber content', 'Supports healthy diet'],
        storage: 'Store in refrigerator crisper drawer',
        origin: 'Freshly harvested from organic farms'
      },
      'Dairy': {
        benefits: ['High in protein and calcium', 'Essential for bone health', 'Natural probiotics', 'Fresh and pure'],
        storage: 'Always refrigerate at 2-4°C',
        origin: 'Sourced from trusted dairy farms'
      },
      'Household': {
        benefits: ['Essential for daily needs', 'Quality assured products', 'Cost-effective solutions', 'Safe for family use'],
        storage: 'Store in cool, dry place away from children',
        origin: 'Premium quality household essentials'
      },
      'Personal Care': {
        benefits: ['Gentle on skin', 'Natural ingredients', 'Long-lasting freshness', 'Suitable for all skin types'],
        storage: 'Store in cool, dry place away from direct sunlight',
        origin: 'Made with natural and safe ingredients'
      }
    };
    return details[category] || details['Fruits'];
  };

  const productDetails = getProductDetails(product.category);

  return (
    <>
      <div className="product-card">
        <div className="product-image-container">
          <img 
            className="product-image" 
            src={product.image.startsWith('http') ? product.image : `http://localhost:5000/${product.image}`} 
            alt={product.name} 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300x200?text=Product+Image';
            }}
          />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-category">{product.category}</p>
          <div className="product-price-cart">
            <p className="product-price">₹{product.price}</p>
            {cartQuantity > 0 ? (
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => handleUpdateQuantity(cartQuantity - 1)}
                >
                  -
                </button>
                <span className="quantity">{cartQuantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => handleUpdateQuantity(cartQuantity + 1)}
                >
                  +
                </button>
              </div>
            ) : (
              <button onClick={handleAddToCart} className="add-to-cart">Add to Cart</button>
            )}
          </div>
          <button onClick={() => setShowModal(true)} className="view-details">View Details</button>
        </div>
      </div>

      {/* Product Details Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            
            <div className="modal-product-info">
              <div className="modal-product-image">
                <img 
                  src={product.image.startsWith('http') ? product.image : `http://localhost:5000/${product.image}`}
                  alt={product.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x300?text=Product+Image';
                  }}
                />
              </div>
              
              <div className="modal-product-details">
                <h2 className="modal-product-name">{product.name}</h2>
                <p className="modal-product-category">{product.category}</p>
                <div className="modal-product-price">₹{product.price}</div>
                
                <div className="modal-product-description">
                  <p>{product.description || "Premium quality product with excellent taste and nutritional value."}</p>
                </div>

                <div className="modal-product-benefits">
                  <h4>Key Benefits:</h4>
                  <ul>
                    {productDetails.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-product-info-grid">
                  <div className="info-item">
                    <span className="info-label">Storage:</span>
                    <span className="info-value">{productDetails.storage}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Origin:</span>
                    <span className="info-value">{productDetails.origin}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Stock:</span>
                    <span className="info-value">{product.stock > 0 ? `${product.stock} units available` : 'Out of stock'}</span>
                  </div>
                </div>

                <div className="modal-actions">
                  {cartQuantity > 0 ? (
                    <div className="quantity-selector">
                      <button 
                        onClick={() => handleUpdateQuantityModal(cartQuantity - 1)}
                        className="quantity-btn"
                      >
                        -
                      </button>
                      <span className="quantity-value">{cartQuantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantityModal(cartQuantity + 1)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <>
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
                        onClick={handleAddToCartFromModal}
                        className="modal-add-to-cart-btn"
                        disabled={product.stock <= 0}
                      >
                        Add to Cart
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;