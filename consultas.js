const pool = require("./config/pool");

// GET
const infoUsuario = async () => {
    const consulta = "SELECT * FROM usuarios"
    const dataUsuarios = await pool.query(consulta);
    return (dataUsuarios.rows)

};
const infoProductos = async () => {
    const consulta = "SELECT * FROM productos"
    const dataProductos = await pool.query(consulta)
    return (dataProductos.rows)
};
// POST
const verificaCredenciales = async (correo, contrasena) => {
    try {
        const consultaExisteUsuario = "SELECT idUsuario FROM usuarios WHERE correo = $1 AND contrasena = $2 limit 1";
        const valores = [correo, contrasena];
        const data = await pool.query(consultaExisteUsuario, valores);
        var idUsuario = 0;
        if (data != null) {
            idUsuario = data.rows[0].idusuario;
        } else {
            return 0;
        }
        if (idUsuario != 0) {
            return idUsuario
        }
        else { return { "code": 500, "message": "Problemas al ejecutar la consulta" } }
    } catch (error) {
        console.log("Intente de nuevo");
        console.log(error);
        return 0;
    }
};

const registrarUsuario = async (nombre, correo, contrasena, imagenuser) => {
    const consulta = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4)";
    const valores = [nombre, correo, contrasena, imagenuser]
    const resultado = await pool.query(consulta, valores)
    return (resultado)
};

const agregarProducto = async (idusuario, titulo, imagen, descripcion, precio) => {
    const consulta = "INSERT INTO productos VALUES (DEFAULT, $1, $2, $3, $4, $5)";
    const valores = [idusuario, titulo, imagen, descripcion, precio];
    const resultado = await pool.query(consulta, valores)
    return (resultado)
};
// DELETE
const borrarProducto = async (idproducto) => {
    const consulta = "DELETE FROM productos WHERE idproducto = $1";
    const valores = [idproducto];
    await pool.query(consulta, valores);
};

module.exports = {
    verificaCredenciales,
    infoUsuario,
    infoProductos,
    registrarUsuario,
    agregarProducto,
    borrarProducto
};