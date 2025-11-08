const express = require('express');
require('dotenv').config();
require('./config/db_mongo'); // Conexión a MongoDB

const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.use('/api/providers', require('./routes/providers.routes'));
app.use('/api/products', require('./routes/products.routes'));

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});
