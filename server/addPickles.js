require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const pickleProducts = [
  {
    _id: "681c5907075149a4a1fe8b11",
    name: "Mother's Recipe Sweet Mango Pickle",
    category: "Pickles",
    price: 180,
    image: "https://images.mothersrecipe.com/sweet_mango_pickle.jpg",
    description: "Sweet Mango Pickle 500g",
    stock: 200,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b12",
    name: "Priya Foods Spicy Mango Pickle",
    category: "Pickles",
    price: 160,
    image: "https://images.priyafoods.com/spicy_mango_pickle.jpg",
    description: "Spicy Mango Pickle 500g",
    stock: 200,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b13",
    name: "Bedekar Garlic Pickle",
    category: "Pickles",
    price: 140,
    image: "https://images.bedekar.com/garlic_pickle.jpg",
    description: "Garlic Pickle 500g",
    stock: 200,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b14",
    name: "Nilon's Green Chili Pickle",
    category: "Pickles",
    price: 120,
    image: "https://images.nilons.com/green_chili_pickle.jpg",
    description: "Green Chili Pickle 500g",
    stock: 200,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b15",
    name: "Aachi Mixed Vegetable Pickle",
    category: "Pickles",
    price: 150,
    image: "https://images.aachi.com/mixed_veg_pickle.jpg",
    description: "Mixed Vegetable Pickle 500g",
    stock: 200,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b16",
    name: "Eastern Lemon Pickle",
    category: "Pickles",
    price: 130,
    image: "https://images.eastern.com/lemon_pickle.jpg",
    description: "Lemon Pickle 500g",
    stock: 200,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b17",
    name: "Tops Red Chili Pickle",
    category: "Pickles",
    price: 145,
    image: "https://images.tops.com/red_chili_pickle.jpg",
    description: "Red Chili Pickle 500g",
    stock: 200,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b18",
    name: "Patanjali Ginger Pickle",
    category: "Pickles",
    price: 125,
    image: "https://images.patanjali.com/ginger_pickle.jpg",
    description: "Ginger Pickle 500g",
    stock: 200,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b19",
    name: "MTR Carrot Pickle",
    category: "Pickles",
    price: 135,
    image: "https://images.mtr.com/carrot_pickle.jpg",
    description: "Carrot Pickle 500g",
    stock: 200,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b20",
    name: "Dabur Amla Pickle",
    category: "Pickles",
    price: 140,
    image: "https://images.dabur.com/amla_pickle.jpg",
    description: "Amla Pickle 500g",
    stock: 200,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b21",
    name: "Ruchi Onion Pickle",
    category: "Pickles",
    price: 130,
    image: "https://images.ruchi.com/onion_pickle.jpg",
    description: "Onion Pickle 500g",
    stock: 200,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b22",
    name: "Swad Tomato Pickle",
    category: "Pickles",
    price: 125,
    image: "https://images.swad.com/tomato_pickle.jpg",
    description: "Tomato Pickle 500g",
    stock: 200,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b23",
    name: "Grand Sweets Bitter Gourd Pickle",
    category: "Pickles",
    price: 155,
    image: "https://images.grandsweets.com/bitter_gourd_pickle.jpg",
    description: "Bitter Gourd Pickle 500g",
    stock: 200,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b14",
    name: "Haldiram's Lotus Stem Pickle",
    category: "Pickles",
    price: 170,
    image: "https://images.haldirams.com/lotus_stem_pickle.jpg",
    description: "Lotus Stem Pickle 500g",
    stock: 200,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b25",
    name: "North East Kitchen Bamboo Shoot Pickle",
    category: "Pickles",
    price: 185,
    image: "https://images.nekitchen.com/bamboo_shoot_pickle.jpg",
    description: "Bamboo Shoot Pickle 500g",
    stock: 200,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b26",
    name: "Kerala Naturals Jackfruit Pickle",
    category: "Pickles",
    price: 165,
    image: "https://images.keralanaturals.com/jackfruit_pickle.jpg",
    description: "Jackfruit Pickle 500g",
    stock: 200,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b27",
    name: "Ramdev Lime and Green Chili Pickle",
    category: "Pickles",
    price: 145,
    image: "https://images.ramdev.com/lime_green_chili_pickle.jpg",
    description: "Lime and Green Chili Pickle 500g",
    stock: 200,
    __v: 0
  },
  {
    _id: "681c5907075149a4a1fe8b28",
    name: "Sakthi Tamarind Pickle",
    category: "Pickles",
    price: 140,
    image: "https://images.sakthi.com/tamarind_pickle.jpg",
    description: "Tamarind Pickle 500g",
    stock: 200,
    __v: 0
  }
];

const addPickles = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Insert products one by one to avoid duplicates
    for (const pickle of pickleProducts) {
      try {
        await Product.create(pickle);
        console.log(`Added: ${pickle.name}`);
      } catch (error) {
        if (error.code === 11000) {
          console.log(`Skipped duplicate: ${pickle.name}`);
        } else {
          console.error(`Error adding ${pickle.name}:`, error.message);
        }
      }
    }

    console.log('Finished adding pickle products');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.connection.close();
  }
};

addPickles();
