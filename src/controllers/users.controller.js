import { usersService } from "../services/index.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await usersService.getAll();
        res.status(200).send({ status: "success", payload: users });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await usersService.getById(uid);
        if (!user) return res.status(404).send({ status: "error", message: "User not found" });
        res.status(200).send({ status: "success", payload: user });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password)
            return res.status(400).send({ status: "error", message: "All fields are required" });
        const exists = await usersService.getBy({ email });
        if (exists) return res.status(400).send({ status: "error", message: "User already exists" });
        const user = await usersService.save({ first_name, last_name, email, password });
        res.status(201).send({ status: "success", payload: user });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await usersService.update(uid, req.body);
        if (!user) return res.status(404).send({ status: "error", message: "User not found" });
        res.status(200).send({ status: "success", payload: user });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await usersService.delete(uid);
        if (!user) return res.status(404).send({ status: "error", message: "User not found" });
        res.status(200).send({ status: "success", message: "User deleted successfully" });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

export default { getAllUsers, getUser, createUser, updateUser, deleteUser };