import { Router } from "express";
import usersController from "../controllers/users.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Manejo de usuarios
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Trae todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: ok
 */
router.get("/", usersController.getAllUsers);

/**
 * @swagger
 * /api/users/{uid}:
 *   get:
 *     summary: Trae un usuario por su id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ok
 *       404:
 *         description: no se encontro el usuario
 */
router.get("/:uid", usersController.getUser);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: Juan
 *               last_name:
 *                 type: string
 *                 example: Perez
 *               email:
 *                 type: string
 *                 example: juan@gmail.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: usuario creado
 *       400:
 *         description: faltan datos o el usuario ya existe
 */
router.post("/", usersController.createUser);

/**
 * @swagger
 * /api/users/{uid}:
 *   put:
 *     summary: Actualiza un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: usuario actualizado
 *       404:
 *         description: no se encontro el usuario
 */
router.put("/:uid", usersController.updateUser);

/**
 * @swagger
 * /api/users/{uid}:
 *   delete:
 *     summary: Elimina un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: usuario eliminado
 *       404:
 *         description: no se encontro el usuario
 */
router.delete("/:uid", usersController.deleteUser);

export default router;