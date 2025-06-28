const Product = require("../models/Product");

exports.getAll = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category: category.charAt(0).toUpperCase() + category.slice(1) } : {};
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

exports.getById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

exports.uploadProduct = async (req, res) => {
  const { name, category, price, description, stock } = req.body;
  const image = req.file.path;
  const product = new Product({ name, category, price, description, stock, image });
  await product.save();
  res.json(product);
};