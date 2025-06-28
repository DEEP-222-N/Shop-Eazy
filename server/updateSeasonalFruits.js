require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const replacementFruits = [
  {
    _id: "681c5907075149a4a1fe8b36",  // Previously Orange
    name: "Fresh Litchi",
    category: "Fruits",
    price: 180,
    image: "https://images.fruits.com/litchi.jpg",
    description: "Sweet Litchi 500g (20-22 pcs)",
    stock: 150,
    seasonal: true,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b43",  // Previously Pomegranate
    name: "Fresh Strawberries",
    category: "Fruits",
    price: 250,
    image: "https://images.fruits.com/strawberries.jpg",
    description: "Sweet Red Strawberries 200g",
    stock: 100,
    seasonal: true,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b44",  // Previously Kiwi
    name: "Passion Fruit",
    category: "Fruits",
    price: 190,
    image: "https://images.fruits.com/passion_fruit.jpg",
    description: "Fresh Passion Fruit 250g (4-5 pcs)",
    stock: 120,
    seasonal: true,
    __v: 0
  }
];

const updateFruits = async () => {
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

    console.log('Finished updating seasonal fruits');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.connection.close();
  }
};

updateFruits();
