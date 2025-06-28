require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const newPickle = {
    _id: "681c5907075149a4a1fe8b29",
    name: "777 Mango Thokku Pickle",
    category: "Pickles",
    price: 175,
    image: "https://images.777.com/mango_thokku_pickle.jpg",
    description: "Spicy Mango Thokku Pickle 500g",
    stock: 200,
    __v: 0
};

const addPickle = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    try {
      await Product.create(newPickle);
      console.log(`Added: ${newPickle.name}`);
    } catch (error) {
      if (error.code === 11000) {
        console.log(`Skipped duplicate: ${newPickle.name}`);
      } else {
        console.error(`Error adding ${newPickle.name}:`, error.message);
      }
    }

    console.log('Finished adding pickle product');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.connection.close();
  }
};

addPickle();
