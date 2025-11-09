const { Product } = require("../models/products.model");
const Provider = require("../models/provider.model");

// Crear producto
async function createProduct(id, title, price, description, image, company_name) {
  const provider = await Provider.findOne({ company_name });
  if (!provider) throw new Error(`Proveedor "${company_name}" no encontrado`);

  const product = new Product({
    id,
    title,
    price,
    description,
    image,
    provider: provider._id,
  });

  return await product.save();
}

// Obtener todos los productos
async function getAllProducts() {
  return await Product.find().populate("provider", "company_name CIF");
}

// Obtener producto por ID
async function getProductById(id) {
  const product = await Product.findById(id).populate("provider", "company_name CIF");
  if (!product) throw new Error("Producto no encontrado");
  return product;
}

// Actualizar producto por ID
async function updateProduct(id, data) {
  if (data.company_name) {
    const provider = await Provider.findOne({ company_name: data.company_name });
    if (!provider) throw new Error(`Proveedor "${data.company_name}" no encontrado`);
    data.provider = provider._id;
    delete data.company_name;
  }

  const updated = await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate("provider", "company_name CIF");
  if (!updated) throw new Error("Producto no encontrado");
  return updated;
}

// Borrar producto por ID
async function deleteProduct(id) {
  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) throw new Error("Producto no encontrado");
  return { message: "Producto eliminado correctamente" };
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
