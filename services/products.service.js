const { Product } = require("../models/products.model");
const Provider = require("../models/provider.model");

async function createProduct(id, title, price, description, image, company_name) {
  try {
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

    const result = await product.save();
    return result; // Devuelve el producto creado
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { createProduct };
