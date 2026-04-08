import UserDao from "../dao/mongo/Users.dao.js";
import PetDao from "../dao/mongo/Pets.dao.js";
import AdoptionDao from "../dao/mongo/Adoption.dao.js";

export const usersService = new UserDao();
export const petsService = new PetDao();
export const adoptionsService = new AdoptionDao();