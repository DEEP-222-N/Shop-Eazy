import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Categories.css';

function Categories() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const categories = [
    'Household',
    'Personal Care',
    'Vegetables',
    'Fruits',
    'Dairy',
    'Pickles'
  ];

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category.toLowerCase().replace(' ', '-')}`);
    setIsOpen(false);
  };

  return (
    <div className="categories-dropdown" onMouseLeave={() => setIsOpen(false)}>
      <button 
        className="categories-btn" 
        onMouseEnter={() => setIsOpen(true)}
      >
        Categories
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {categories.map((category) => (
            <div 
              key={category} 
              className="dropdown-item"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Categories;
