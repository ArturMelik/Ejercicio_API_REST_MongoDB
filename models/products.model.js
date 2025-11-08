const mongoose = require("mongoose");
const Provider = require("./provider.model"); // O "./providers.model" según tu estructura
require("../config/db_mongo"); // Conexión a BBDD MongoDB

const objectSchema = {
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: function (url) {
        return url.endsWith(".jpg") || url.endsWith(".png");
      },
      message: "Porfa, sólo imágenes JPG o PNG",
    },
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Provider",
    required: true,
  },
};

// Crear el esquema
const productSchema = mongoose.Schema(objectSchema);

// Crear el modelo --> Colección
const Product = mongoose.model("Product", productSchema);

// Crear producto pasando título + nombre de compañía por parámetro
async function saveProduct(id, title, price, description, image, company_name) {
  try {
    const provider = await Provider.findOne({ company_name });

    if (!provider) {
      throw new Error(`No se encontró el proveedor con nombre: ${company_name}`);
    }

    const product = new Product({
      id,
      title,
      price,
      description,
      image,
      provider: provider._id,
    });

    const result = await product.save();
    console.log(" Producto guardado correctamente:", result);
  } catch (error) {
    console.error(" Error al guardar el producto:", error.message);
  }
}

module.exports = {
  Product,
  saveProduct,
};

/* 
// Ejemplo de uso:

saveProduct(
  1,
  "Maceta de barro",
  12.5,
  "Maceta artesanal hecha a mano",
  "https://www.tiendaejemplo.com/img/maceta.png",
  "Floristería Primavera"
);

saveProduct(
  2,
  "Ramo de flores silvestres",
  25,
  "Flores de temporada frescas",
  "https://www.tiendaejemplo.com/img/ramo.jpg",
  "Floristería Primavera"
);

saveProduct(
  3,
  "Kit de jardinería básico",
  19.99,
  "Incluye guantes, pala, rastrillo y tijeras para el cuidado de plantas.",
  "https://www.tiendaejemplo.com/img/kit-jardineria.png",
  "Jardines Verdes S.L."
);

saveProduct(
  4,
  "Orquídea blanca en maceta decorativa",
  32.50,
  "Orquídea Phalaenopsis blanca con maceta de cerámica elegante.",
  "https://www.tiendaejemplo.com/img/orquidea-blanca.jpg",
  "Plantas del Sur"
);


*/
