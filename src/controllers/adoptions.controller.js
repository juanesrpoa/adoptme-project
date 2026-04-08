import { adoptionsService, usersService, petsService } from "../services/index.js";

const getAllAdoptions = async (req, res) => {
    try {
        const adoptions = await adoptionsService.getAll();
        res.status(200).send({ status: "success", payload: adoptions });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

const getAdoption = async (req, res) => {
    try {
        const { aid } = req.params;
        const adoption = await adoptionsService.getById(aid);
        if (!adoption) return res.status(404).send({ status: "error", message: "Adoption not found" });
        res.status(200).send({ status: "success", payload: adoption });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

const createAdoption = async (req, res) => {
    try {
        const { uid, pid } = req.params;
        const user = await usersService.getById(uid);
        if (!user) return res.status(404).send({ status: "error", message: "User not found" });
        const pet = await petsService.getById(pid);
        if (!pet) return res.status(404).send({ status: "error", message: "Pet not found" });
        if (pet.adopted) return res.status(400).send({ status: "error", message: "Pet is already adopted" });
        await petsService.update(pid, { adopted: true, owner: uid });
        await usersService.update(uid, { pets: [...user.pets, pid] });
        const adoption = await adoptionsService.save({ owner: uid, pet: pid });
        res.status(201).send({ status: "success", payload: adoption });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

export default { getAllAdoptions, getAdoption, createAdoption };