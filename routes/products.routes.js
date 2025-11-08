const express = require('express');
const router = express.Router();
const { Product } = require('../models/products.model');

// GET - todos los productos (populate para incluir datos del proveedor)
router.get('/', async (req, res) => {
  const products = await Product.find().populate('provider');
  res.json(products);
});

// POST - crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
