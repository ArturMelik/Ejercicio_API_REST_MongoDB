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

// Actualizar proveedor por ID
async function updateProvider(id, data) {
  const provider = await Provider.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!provider) throw new Error("Proveedor no encontrado");
  return provider;
}

// Borrar proveedor por ID
async function deleteProvider(id) {
  const provider = await Provider.findByIdAndDelete(id);
  if (!provider) throw new Error("Proveedor no encontrado");
  return { message: "Proveedor eliminado correctamente" };
}

module.exports = { createProvider, getAllProviders, updateProvider, deleteProvider };

