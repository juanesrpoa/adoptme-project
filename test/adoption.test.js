import supertest from "supertest";
import { expect } from "chai";
import app from "../src/app.js";

const requester = supertest(app);

// Tests para el router de adopciones
describe("Adoption Router", () => {

    // variables para reutilizar en los tests
    let adoptionId;
    let userId;
    let petId;

    // antes de los tests creamos un usuario y una mascota
    before(async () => {
        // crear usuario de prueba
        const userRes = await requester.post("/api/users").send({
            first_name: "Test",
            last_name: "User",
            email: `test${Date.now()}@gmail.com`,
            password: "123456"
        });
        userId = userRes.body.payload._id;

        // crear mascota de prueba
        const petRes = await requester.post("/api/pets").send({
            name: "Firulais",
            specie: "perro",
            birthDate: "2020-01-01"
        });
        petId = petRes.body.payload._id;
    });

    // test 1: obtener todas las adopciones
    it("GET /api/adoptions - debe traer todas las adopciones", async () => {
        const res = await requester.get("/api/adoptions");
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal("success");
        expect(res.body.payload).to.be.an("array");
    });

    // test 2: crear una adopcion
    it("POST /api/adoptions/:uid/:pid - debe crear una adopcion", async () => {
        const res = await requester.post(`/api/adoptions/${userId}/${petId}`);
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal("success");
        adoptionId = res.body.payload._id;
    });

    // test 3: obtener una adopcion por id
    it("GET /api/adoptions/:aid - debe traer una adopcion por id", async () => {
        const res = await requester.get(`/api/adoptions/${adoptionId}`);
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal("success");
        expect(res.body.payload._id).to.equal(adoptionId);
    });

    // test 4: error cuando la mascota ya fue adoptada
    it("POST /api/adoptions/:uid/:pid - debe dar error si la mascota ya fue adoptada", async () => {
        const res = await requester.post(`/api/adoptions/${userId}/${petId}`);
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal("error");
    });

    // test 5: error cuando el usuario no existe
    it("POST /api/adoptions/:uid/:pid - debe dar error si el usuario no existe", async () => {
        const res = await requester.post(`/api/adoptions/000000000000000000000000/${petId}`);
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal("error");
    });

    // test 6: error cuando la mascota no existe
    it("POST /api/adoptions/:uid/:pid - debe dar error si la mascota no existe", async () => {
        const res = await requester.post(`/api/adoptions/${userId}/000000000000000000000000`);
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal("error");
    });

    // test 7: error cuando la adopcion no existe
    it("GET /api/adoptions/:aid - debe dar error si la adopcion no existe", async () => {
        const res = await requester.get("/api/adoptions/000000000000000000000000");
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal("error");
    });
});