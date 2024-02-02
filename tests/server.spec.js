const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    test("1. Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto.", async () => {
        const response = await request(server).get("/cafes");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    test("2. Comprueba que se obtiene un código 400 al intentar eliminar un café con un id que no existe.", async () => {
        const invalidId = 25;
        const response = await request(server).delete(`/cafes/${invalidId}`);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "No recibió ningún token en las cabeceras");
    });

    test("3. Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201.", async () => {
        const newCafe = {
            id: 5,
            nombre: "Latte",
        };
        const response = await request(server)
            .post("/cafes")
            .send(newCafe);

        expect(response.status).toBe(201);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("4. Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload.", async () => {
        const cafeToUpdate = {
            id: 1,
            nombre: "Cortado Modificado",
        };
        const response = await request(server)
            .put(`/cafes/${cafeToUpdate.id + 1}`)
            .send(cafeToUpdate);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "El id del parámetro no coincide con el id del café recibido");
    });
});
