// const mongoose = require("mongoose");
// require('dotenv').config();

// mongoose.connect(process.env.MY_MONGO_URI || "mongodb://localhost:27017/local");
// const db = mongoose.connection;

// // Eventos
// db.on("error", error => console.log(error));
// db.once("open", () => console.log("connection to MongoDB established"));


const mongoose = require('mongoose');
require('dotenv').config();

mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log('✅ Conectado a MongoDB'))
.catch((err) => console.error('❌ Error al conectar a MongoDB:', err));


module.exports = mongoose;