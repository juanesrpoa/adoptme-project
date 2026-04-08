import { petsService } from "../services/index.js";

const getAllPets = async (req, res) => {
    try {
        const pets = await petsService.getAll();
        res.status(200).send({ status: "success", payload: pets });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

const getPet = async (req, res) => {
    try {
        const { pid } = req.params;
        const pet = await petsService.getById(pid);
        if (!pet) return res.status(404).send({ status: "error", message: "Pet not found" });
        res.status(200).send({ status: "success", payload: pet });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

const createPet = async (req, res) => {
    try {
        const { name, specie, birthDate } = req.body;
        if (!name || !specie) return res.status(400).send({ status: "error", message: "Name and specie are required" });
        const pet = await petsService.save({ name, specie, birthDate, adopted: false });
        res.status(201).send({ status: "success", payload: pet });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

const updatePet = async (req, res) => {
    try {
        const { pid } = req.params;
        const pet = await petsService.update(pid, req.body);
        if (!pet) return res.status(404).send({ status: "error", message: "Pet not found" });
        res.status(200).send({ status: "success", payload: pet });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

const deletePet = async (req, res) => {
    try {
        const { pid } = req.params;
        const pet = await petsService.delete(pid);
        if (!pet) return res.status(404).send({ status: "error", message: "Pet not found" });
        res.status(200).send({ status: "success", message: "Pet deleted successfully" });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

export default { getAllPets, getPet, createPet, updatePet, deletePet };