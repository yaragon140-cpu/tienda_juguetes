require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

//  servir frontend
app.use(express.static(__dirname));

// conexión MongoDB local
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Conectado a MongoDB Atlas"))
.catch(err => console.log(err));

// modelo
const Juguete = mongoose.model("Juguete", {
    nombre: String,
    categoria: String,
    precio: String
});

// página principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// VER TODOS
app.get("/juguetes", async (req, res) => {
    const datos = await Juguete.find();
    res.json(datos);
});

// GUARDAR
app.post("/guardar", async (req, res) => {
    const nuevo = new Juguete(req.body);
    await nuevo.save();
    res.send("Guardado");
});

// BUSCAR
app.get("/buscar/:nombre", async (req, res) => {
    const datos = await Juguete.find({
        nombre: new RegExp(req.params.nombre, "i")
    });
    res.json(datos);
});

// ELIMINAR
app.delete("/eliminar/:id", async (req, res) => {
    await Juguete.findByIdAndDelete(req.params.id);
    res.send("Eliminado");
});

// ACTUALIZAR
app.put("/actualizar/:id", async (req, res) => {
    await Juguete.findByIdAndUpdate(req.params.id, req.body);
    res.send("Actualizado");
});

// servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});