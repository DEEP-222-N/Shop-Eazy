require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const replacementFruits = [
  {
    _id: "681c5907075149a4a1fe8b36",  // Previously Orange
    name: "Fresh Papaya",
    category: "Fruits",
    price: 85,
    image: "https://images.fruits.com/papaya.jpg",
    description: "Sweet Ripe Papaya 1pc (800g-1kg)",
    stock: 150,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b43",  // Previously Pomegranate
    name: "Fresh Pineapple",
    category: "Fruits",
    price: 95,
    image: "https://images.fruits.com/pineapple.jpg",
    description: "Sweet Pineapple 1pc (700-800g)",
    stock: 150,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b44",  // Previously Kiwi
    name: "Fresh Custard Apple",
    category: "Fruits",
    price: 160,
    image: "https://images.fruits.com/custard_apple.jpg",
    description: "Sweet Custard Apple 500g (3-4 pcs)",
    stock: 120,
    __v: 0
  }
];

const replaceFruits = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    for (const fruit of replacementFruits) {
      try {
        await Product.findByIdAndUpdate(fruit._id, fruit, { upsert: true });
        console.log(`Replaced with: ${fruit.name}`);
      } catch (error) {
        console.error(`Error replacing ${fruit.name}:`, error.message);
      }
    }

    console.log('Finished replacing fruits');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.connection.close();
  }
};

replaceFruits();
