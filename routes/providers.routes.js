const express = require("express");
const router = express.Router();
const {
  createProvider,
  getAllProviders,
  updateProvider,
  deleteProvider
} = require("../services/providers.service");

// http://localhost:3000/api/providers
// http://localhost:3000/api/products


// GET - Todos los proveedores
router.get("/", async (req, res) => {
  const providers = await getAllProviders();
  res.json(providers);
});

// POST - Crear un proveedor
router.post("/", async (req, res) => {
  try {
    const provider = await createProvider(req.body);
    res.status(201).json(provider);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT - Actualizar un proveedor por ID
router.put("/:id", async (req, res) => {
  try {
    const provider = await updateProvider(req.params.id, req.body);
    res.json(provider);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Borrar un proveedor por ID
router.delete("/:id", async (req, res) => {
  try {
    const result = await deleteProvider(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
