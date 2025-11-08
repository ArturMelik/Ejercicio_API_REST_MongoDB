const Provider = require("../models/provider.model");

// Crear proveedor
async function createProvider({ company_name, CIF, address, url_web }) {
  try {
    const provider = new Provider({ company_name, CIF, address, url_web });
    return await provider.save();
  } catch (error) {
    throw new Error(error.message);
  }
}

// Obtener todos los proveedores
async function getAllProviders() {
  return await Provider.find();
}

module.exports = { createProvider, getAllProviders };
