const express = require("express");
const cors = require("cors")
const jwt = require("jsonwebtoken");
const { secretKey } = require("./secretKey")
const {
    verificaCredenciales,
    infoProductos,
    infoUsuario,
    registrarUsuario,
    agregarProducto,
    borrarProducto
} = require("./consultas");
const app = express();
app.listen(process.env.PORT || 3000, console.log("Servidor Conectado!"));
app.use(express.json());
app.use(cors());
// Rutas Get
app.get("/perfil", async (req, res) => {
    try {
        const usuarios = await infoUsuario()
        res.json(usuarios)
    } catch (error) {
        res.status(500).send(error)
    }
});
app.get("/productos", async (req, res) => {
    try {
        const productos = await infoProductos()
        res.json(productos)
    } catch (error) {
        res.status(error.code || 500).send(error)
    }
});
// Rutas Post
app.post("/registro", async (req, res) => {
    try {
        const { nombre, correo, contrasena, imagenuser } = req.body
        await registrarUsuario(nombre, correo, contrasena, imagenuser)
        res.send("El usuario se ha registrado con éxito")
    } catch (error) {
        res.status(error).send(error)
    }
});
app.post("/login", async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        const idUsuario = await verificaCredenciales(correo, contrasena);

        if (idUsuario != 0) {
            const token = jwt.sign({ correo }, secretKey);
            const data = {
                token: token,
                idUsuario: idUsuario
            };
            res.status(200).send(data);
        } else if (idUsuario === 0) {
            res.sendStatus(401)
        } else { res.status(500).send({}) }

    } catch (error) {
        console.log(error)
        res.status(error.code || 500).send(error)
    }
});
app.post("/productos", async (req, res) => {
    try {
        const { idusuario, titulo, imagen, descripcion, precio } = req.body;
        await agregarProducto(idusuario, titulo, imagen, descripcion, precio);
        res.send("El producto se ha  agregado con éxito")
    } catch (error) {
        res.status(error).send(error)
    }
});
// Rutas Delete
app.delete("/productos/:idproducto", async (req, res) => {
    try {
        const { idproducto } = req.params;
        await borrarProducto(idproducto);
        res.send("El producto se ha borrado con éxito")
    } catch (error) {
        res.status(error).send(error)
    }
});
// Ruta Not Found
app.use("*", (req, res) => {
    res.status(200).send({ message: "La ruta consultada no esta disponible" })
});


module.exports = { app };