import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.css';

function Cart() {
  const navigate = useNavigate();
  const { cartItems, loading, error, updateQuantity, removeFromCart, fetchCart } = useCart();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, [fetchCart, navigate]);

  if (loading) return <div className="cart-container">Loading...</div>;
  if (error) return <div className="cart-container">Error: {error}</div>;

  // Filter out invalid cart items (items with null/undefined productId)
  const validCartItems = cartItems.filter(item => 
    item && item.productId && typeof item.productId === 'object'
  );

  if (!validCartItems || validCartItems.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your Shopping Cart</h2>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button className="shop-now-btn" onClick={() => navigate('/products')}>Shop Now</button>
        </div>
      </div>
    );
  }

  const total = validCartItems.reduce((sum, item) => 
    sum + ((item.productId?.price || 0) * (item.quantity || 0)), 0
  );

  const handleCheckout = () => {
    navigate('/checkout', {
      state: {
        total: total,
        items: validCartItems
      }
    });
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      await updateQuantity(productId, newQuantity);
    } catch (error) {
      alert('Failed to update quantity');
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart(productId);
    } catch (error) {
      alert('Failed to remove item');
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-items">
        <h2>Your Shopping Cart</h2>
        {validCartItems.map(item => (
          <div key={item.productId._id} className="cart-item">
            <img 
              src={item.productId.image
                ? (item.productId.image.startsWith('http')
                  ? item.productId.image
                  : `http://localhost:5000/${item.productId.image}`)
                : 'https://via.placeholder.com/150?text=Product+Image'
              } 
              alt={item.productId?.name || 'Product'} 
              className="cart-item-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/150?text=Product+Image';
              }} 
            />
            <div className="cart-item-details">
              <h3>{item.productId?.name || 'Product'}</h3>
              <p className="item-price">₹{item.productId?.price || 0}</p>
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => handleUpdateQuantity(item.productId._id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => handleUpdateQuantity(item.productId._id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="item-total">
              <p>Total</p>
              <p className="total-price">
                ₹{(item.productId?.price || 0) * (item.quantity || 0)}
              </p>
            </div>
            <button onClick={() => handleRemoveFromCart(item.productId._id)} className="remove-btn">
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-right">
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="price-details">
            <div className="price-row">
              <span>Items ({validCartItems.length})</span>
              <span>₹{total}</span>
            </div>
            <div className="price-row">
              <span>Delivery</span>
              <span className="savings">Free</span>
            </div>
            <div className="price-row total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
          <div className="free-delivery">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M12 2l4.5 8L22 12l-8 2-2 8-2-8-8-2 5.5-2L12 2z"/>
            </svg>
            Free delivery on orders above ₹499
          </div>
          <button className="checkout-button" onClick={handleCheckout}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 20a1 1 0 100 2 1 1 0 000-2zm7 0a1 1 0 100 2 1 1 0 000-2zm-7-3h7a1 1 0 010 2H9a1 1 0 010-2zm0-2h7a1 1 0 010 2H9a1 1 0 010-2z"/>
              <path d="M3 3h2l.5 2h15a1 1 0 01.97 1.243l-2 7A1 1 0 0118.5 14H7a1 1 0 01-.97-.757L3.11 4H3a1 1 0 010-2z"/>
            </svg>
            Proceed to Checkout
          </button>
          <div className="secure-checkout">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14">
              <path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.4 0 2.5 1.1 2.5 2.5V13c.6 0 1 .4 1 1v4c0 .6-.4 1-1 1h-5c-.6 0-1-.4-1-1v-4c0-.6.4-1 1-1V9.5C9.5 8.1 10.6 7 12 7zm0 2c-.3 0-.5.2-.5.5V13h1V9.5c0-.3.2-.5-.5-.5z"/>
            </svg>
            Secure Checkout
          </div>
        </div>
        <div className="recently-viewed">
          <h3>Recently Viewed</h3>
          <div className="recently-viewed-items">
            {validCartItems.slice(0, 4).map(item => (
              <div key={`recent-${item.productId._id}`} className="recently-viewed-item" onClick={() => navigate(`/product/${item.productId._id}`)}>
                <img 
                  src={item.productId.image
                    ? (item.productId.image.startsWith('http')
                      ? item.productId.image
                      : `http://localhost:5000/${item.productId.image}`)
                    : 'https://via.placeholder.com/100x100?text=Product'
                  }
                  alt={item.productId.name || 'Product'}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/100x100?text=Product';
                  }}
                />
                <h4>{item.productId.name || 'Product'}</h4>
                <p>₹{item.productId.price || 0}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;