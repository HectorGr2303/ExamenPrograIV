const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = require("../models/user")
const router = express.Router();
const verifyToken = require('./verificarToken');
const jwtSecretKey = process.env.JWT_SECRET;


//Metodos CRUD
//CREATE
router.post('/users', (req,res) => {
    const user = userSchema(req.body);
    user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
})
router.post("/register", async (req, res) => {
    try {
      const { nombre, email, password, rol } = req.body;
      
      // Cifrar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = userSchema({
        nombre,
        email,
        hash: hashedPassword,
        rol,
        fechaRegistro: new Date()
      });
  
      await newUser.save();
      res.status(201).json({ message: "Usuario registrado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
  
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userSchema.findOne({ email });
  
      if (user) {
        // Verificar la contraseña cifrada
        const isPasswordMatch = await bcrypt.compare(password, user.hash);
  
        if (isPasswordMatch) {
          const token = jwt.sign({ userId: user.id }, jwtSecretKey, { expiresIn: '1h' });
          res.status(200).json({ message: "Inicio de sesión exitoso", token });
        } else {
          res.status(401).json({ message: "Credenciales incorrectas" });
        }
      } else {
        res.status(401).json({ message: "Credenciales incorrectas" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});


//GetAll
router.get('/users', verifyToken, (req,res) => {
    userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
})
//GetById
router.get('/users/:id', (req,res) => {
    const {id} = req.params;
    userSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
})
//UpdateById
router.put('/users/:id', (req,res) => {
    const {id} = req.params;
    const { nombre, email, password, rol } = req.body;
    userSchema
        .updateOne({_id: id}, { $set: {nombre, email, password, rol}})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
})
//DeleteById
router.delete('/users/:id', (req,res) => {
    const {id} = req.params;
    userSchema
        .findByIdAndDelete(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
})
module.exports = router;