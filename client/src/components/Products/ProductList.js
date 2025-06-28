import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";
import "./Products.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = category
          ? `http://localhost:5000/api/products?category=${category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`
          : "http://localhost:5000/api/products";
        const response = await axios.get(url);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="products-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  // For debugging
  console.log('Products:', products);

  return (
    <div className="products-container">
      {category && (
        <h2 className="category-title">{category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h2>
      )}
      <div className="product-list">
        {products && products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="no-products">No products found</div>
        )}
      </div>
    </div>
  );
}

export default ProductList;