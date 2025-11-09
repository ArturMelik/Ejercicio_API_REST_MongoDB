const { Product } = require("../models/products.model");
const Provider = require("../models/provider.model");

// GET: todos los productos
async function getAllProducts(req, res) {
  try {
    // populate para mostrar info del proveedor en la respuesta
    const products = await Product.find().populate("provider", "company_name CIF");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// GET: producto por ID (de Mongo)
async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id).populate("provider", "company_name CIF");
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// POST: crear producto (versión controladora directa, similar a service)
async function createProduct(req, res) {
  try {
    const { id, title, price, description, image, company_name } = req.body;

    // Buscar proveedor por nombre de empresa
    const provider = await Provider.findOne({ company_name });
    if (!provider) {
      return res.status(404).json({ message: `Proveedor "${company_name}" no encontrado` });
    }

    // Crear producto vinculado al proveedor
    const product = new Product({
      id,
      title,
      price,
      description,
      image,
      provider: provider._id,
    });

    const result = await product.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// PUT: actualizar producto por ID
async function updateProduct(req, res) {
  try {
    const { company_name, ...updateData } = req.body;

    // Si se incluye company_name, buscar el nuevo proveedor
    if (company_name) {
      const provider = await Provider.findOne({ company_name });
      if (!provider) {
        return res.status(404).json({ message: `Proveedor "${company_name}" no encontrado` });
      }
      updateData.provider = provider._id;
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).populate("provider", "company_name CIF");

    if (!updatedProduct) return res.status(404).json({ message: "Producto no encontrado" });

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// DELETE: borrar producto por ID
async function deleteProduct(req, res) {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
