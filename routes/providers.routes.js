const express = require('express');
const router = express.Router();
const Provider = require('../models/provider.model');

// GET - obtener todos los providers
router.get('/', async (req, res) => {
  const providers = await Provider.find();
  res.json(providers);
});

// POST - crear un provider
router.post('/', async (req, res) => {
  try {
    const provider = new Provider(req.body);
    await provider.save();
    res.status(201).json(provider);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;