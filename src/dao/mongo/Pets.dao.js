import petModel from "../../models/Pet.js";

export default class PetDao {
    async getAll() {
        return await petModel.find();
    }
    async getById(id) {
        return await petModel.findById(id);
    }
    async getBy(params) {
        return await petModel.findOne(params);
    }
    async save(doc) {
        return await petModel.create(doc);
    }
    async update(id, doc) {
        return await petModel.findByIdAndUpdate(id, { $set: doc }, { new: true });
    }
    async delete(id) {
        return await petModel.findByIdAndDelete(id);
    }
}