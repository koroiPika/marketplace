const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de  Marketplace ", () => {

    it("", async () => {
        const { body: productos } = await request(server).get("/productos").send();
        expect(productos).toBeInstanceOf(Array);
    });

    it("Obteniendo un código 200 al ingresar un nuevo producto a la tabla productos", async () => {
        const id = Math.floor(Math.random() * 999);
        const producto = { id, nombre: "Nuevo productos" };

        const { statusCode: status } = await request(server)
            .post("/producto")
            .send(producto);
        expect(status).toBe(200);

    });

    it("Corroborar que se ha eliminado de la tabla productos", async () => {
        const jwt = "token";
        const idDeProductoAEliminar = id_en_venta
        const { body: productos } = await request(server)
            .delete(`/productos/${idDeProductoAEliminar}`)
            .set("Authorization", jwt)
            .send();
        const ids = productos.map(p => p.id)
        expect(ids).not.toContain(idDeProductoAEliminar);
    });

});