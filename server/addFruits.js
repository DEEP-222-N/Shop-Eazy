require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const fruitProducts = [
  {
    _id: "681c5907075149a4a1fe8b30",
    name: "Fresh Black Grapes",
    category: "Fruits",
    price: 120,
    image: "https://images.fruits.com/black_grapes.jpg",
    description: "Sweet and Juicy Black Grapes 500g",
    stock: 150,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b31",
    name: "Dragon Fruit",
    category: "Fruits",
    price: 180,
    image: "https://images.fruits.com/dragon_fruit.jpg",
    description: "Exotic Dragon Fruit 1pc (250-300g)",
    stock: 100,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b32",
    name: "Fresh Chikoo",
    category: "Fruits",
    price: 80,
    image: "https://images.fruits.com/chikoo.jpg",
    description: "Sweet Sapota/Chikoo 500g",
    stock: 200,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b33",
    name: "Fresh Lime",
    category: "Fruits",
    price: 40,
    image: "https://images.fruits.com/lime.jpg",
    description: "Green Lime 250g (6-8 pcs)",
    stock: 300,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b34",
    name: "Sweet Lime (Mosambi)",
    category: "Fruits",
    price: 90,
    image: "https://images.fruits.com/sweet_lime.jpg",
    description: "Fresh Sweet Lime 500g",
    stock: 200,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b35",
    name: "Musk Melon",
    category: "Fruits",
    price: 70,
    image: "https://images.fruits.com/musk_melon.jpg",
    description: "Sweet Musk Melon 1pc (800g-1kg)",
    stock: 150,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b36",
    name: "Fresh Orange",
    category: "Fruits",
    price: 110,
    image: "https://images.fruits.com/orange.jpg",
    description: "Juicy Nagpur Oranges 1kg",
    stock: 200,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b37",
    name: "Imported Avocado",
    category: "Fruits",
    price: 190,
    image: "https://images.fruits.com/avocado.jpg",
    description: "Hass Avocado 1pc (200-250g)",
    stock: 100,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b38",
    name: "Imported Pears",
    category: "Fruits",
    price: 160,
    image: "https://images.fruits.com/pears.jpg",
    description: "Green Pears 500g",
    stock: 150,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b39",
    name: "Green Apple",
    category: "Fruits",
    price: 170,
    image: "https://images.fruits.com/green_apple.jpg",
    description: "Granny Smith Green Apples 500g",
    stock: 200,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b40",
    name: "Imported Cherries",
    category: "Fruits",
    price: 350,
    image: "https://images.fruits.com/cherries.jpg",
    description: "Sweet Red Cherries 200g",
    stock: 100,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b41",
    name: "Fresh Blueberries",
    category: "Fruits",
    price: 299,
    image: "https://images.fruits.com/blueberries.jpg",
    description: "Premium Blueberries 125g",
    stock: 100,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b42",
    name: "Fresh Bananas",
    category: "Fruits",
    price: 60,
    image: "https://images.fruits.com/bananas.jpg",
    description: "Robusta Bananas 6-7 pcs (500g)",
    stock: 300,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b43",
    name: "Red Pomegranate",
    category: "Fruits",
    price: 140,
    image: "https://images.fruits.com/pomegranate.jpg",
    description: "Fresh Pomegranate 500g (2-3 pcs)",
    stock: 200,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b44",
    name: "Fresh Kiwi",
    category: "Fruits",
    price: 150,
    image: "https://images.fruits.com/kiwi.jpg",
    description: "Green Kiwi 3 pcs (300g)",
    stock: 150,
    __v: 0
  }
];

const addFruits = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Insert fruits one by one to avoid duplicates
    for (const fruit of fruitProducts) {
      try {
        await Product.create(fruit);
        console.log(`Added: ${fruit.name}`);
      } catch (error) {
        if (error.code === 11000) {
          console.log(`Skipped duplicate: ${fruit.name}`);
        } else {
          console.error(`Error adding ${fruit.name}:`, error.message);
        }
      }
    }

    console.log('Finished adding fruit products');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.connection.close();
  }
};

addFruits();
