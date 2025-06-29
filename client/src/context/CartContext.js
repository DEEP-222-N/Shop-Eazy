import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setCartItems([]);
        setCartCount(0);
        return;
      }

      const response = await axios.get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const cartData = response.data;
      if (cartData && cartData.items) {
        const items = Array.isArray(cartData.items) ? cartData.items : [];
        
        // Filter out invalid cart items (items with null/undefined productId)
        const validItems = items.filter(item => 
          item && item.productId && typeof item.productId === 'object'
        );
        
        setCartItems(validItems);
        // Calculate total count of items
        const totalCount = validItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
        setCartCount(totalCount);
      } else {
        setCartItems([]);
        setCartCount(0);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems([]);
      setCartCount(0);
    }
  }, []);

  const addToCart = useCallback(async (productId, quantity = 1) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirect to login or handle unauthenticated state
        return;
      }

      await axios.post('http://localhost:5000/api/cart/add', 
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Refresh cart after adding item
      await fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }, [fetchCart]);

  const removeFromCart = useCallback(async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      await axios.post('http://localhost:5000/api/cart/remove',
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Refresh cart after removing item
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  }, [fetchCart]);

  const updateQuantity = useCallback(async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      await axios.post('http://localhost:5000/api/cart/add', 
        { productId, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Refresh cart after updating quantity
      await fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  }, [fetchCart]);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => 
      total + ((item.productId?.price || 0) * (item.quantity || 0)), 0
    );
  }, [cartItems]);

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Listen for token changes
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setCartItems([]);
        setCartCount(0);
      } else {
        fetchCart();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [fetchCart]);

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartTotal,
      fetchCart,
      loading
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
