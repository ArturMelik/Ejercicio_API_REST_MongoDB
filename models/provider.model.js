const mongoose = require('mongoose');
require('../config/db_mongo'); // Conexión a BBDD MongoDB

// Definimos el esquema
const objectSchema = {
    company_name: {
        type: String,
        required: true,
        unique: true
    },
    CIF: {
        type: String,
        required: true,
        match: [/^[A-Z]\d{8}$/, 'El CIF debe tener el formato válido (una letra seguida de 8 números)']
    },
    address: {
        type: String,
        required: true
    },
    url_web: {
        type: String,
        required: true,
        validate: {
            validator: function(url) {
                return url.startsWith('http');
            },
            message: "Por favor, introduce una URL válida (debe empezar por http o https)"
        }
    }
};

// Crear el esquema
const providerSchema = mongoose.Schema(objectSchema);

// Crear el modelo
const Provider = mongoose.model('Provider', providerSchema,);
module.exports = Provider;

/* 
// Ejemplo de inserción de prueba:

const p = new Provider({
    company_name: "Floristería Primavera",
    CIF: "B12345678",
    address: "Calle Flores 45, Madrid",
    url_web: "https://www.floristeriaprimavera.com"
 },
 {
    company_name: "Floristería Primavera",
    CIF: "B12345678",
    address: "Calle de las Rosas 12, Madrid",
    url_web: "https://www.floristeriaprimavera.com"
  },
  {
    company_name: "Jardines Verdes S.L.",
    CIF: "C87654321",
    address: "Avenida del Parque 45, Barcelona",
    url_web: "https://www.jardinesverdes.com"
  },
  {
    company_name: "Plantas del Sur",
    CIF: "A11122334",
    address: "Calle Olivo 7, Sevilla",
    url_web: "https://www.plantasdelsur.es"
  });

p.save()
.then(data => console.log(data))
.catch(err => console.log(err));
*/
