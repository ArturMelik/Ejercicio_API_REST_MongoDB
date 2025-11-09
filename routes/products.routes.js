const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../services/products.service");

// POST - crear producto
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

// GET - todos los productos
router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - producto por ID
router.get("/:id", async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// PUT - actualizar producto por ID
router.put("/:id", async (req, res) => {
  try {
    const product = await updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - borrar producto por ID
router.delete("/:id", async (req, res) => {
  try {
    const result = await deleteProduct(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
