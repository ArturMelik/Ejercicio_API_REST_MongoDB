const Provider = require("../models/provider.model");

// GET: todos los proveedores
async function getAllProviders(req, res) {
  try {
    const providers = await Provider.find();
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// GET: proveedor por ID
async function getProviderById(req, res) {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) return res.status(404).json({ message: "Proveedor no encontrado" });
    res.json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// POST: CRear proveedor
async function createProvider(req, res) {
  try {
    const provider = new Provider(req.body);
    await provider.save();
    res.status(201).json(provider);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// PUT: actualizar proveedor por ID
async function updateProvider(req, res) {
  try {
    const provider = await Provider.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!provider) return res.status(404).json({ message: "Proveedor no encontrado" });
    res.json(provider);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// DELETE: borrar proveedor por ID
async function deleteProvider(req, res) {
  try {
    const provider = await Provider.findByIdAndDelete(req.params.id);
    if (!provider) return res.status(404).json({ message: "Proveedor no encontrado" });
    res.json({ message: "Proveedor eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { 
    getAllProviders, 
    getProviderById, 
    createProvider, 
    updateProvider, 
    deleteProvider };
