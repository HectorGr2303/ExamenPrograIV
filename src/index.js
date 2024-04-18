const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 3001;
require("dotenv").config();
const userRoutes = require("./routes/user")
const citaRoutes = require("./routes/cita")
const vacacionesRoutes = require("./routes/vacaciones")
const path = require('path');

//Routes
app.get("/", (req, res) => {
    res.send("Bienvenido a mi api")
})

//Middleware
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', citaRoutes);
app.use('/api', vacacionesRoutes);

// Servir archivos estáticos desde la carpeta 'public'
// Servir archivos estáticos desde la carpeta 'public/views'
app.use(express.static(path.join(__dirname, 'public', 'views')));



//MongoDB connection
mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log("Conectado a mongodb"))
.catch((error) => console.error(error))

app.listen(port, () => console.log('Servidor trabajando en puerto ', port))