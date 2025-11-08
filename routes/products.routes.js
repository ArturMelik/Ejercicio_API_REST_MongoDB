const express = require("express");
const router = express.Router();
const { createProduct } = require("../services/products.service");

router.post("/", async (req, res) => {
  try {
    const product = await createProduct(
      req.body.id,
      req.body.title,
      req.body.price,
      req.body.description,
      req.body.image,
      req.body.company_name
    );
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
