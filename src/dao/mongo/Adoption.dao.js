import adoptionModel from "../../models/Adoption.js";

export default class AdoptionDao {
    async getAll() {
        return await adoptionModel.find();
    }
    async getById(id) {
        return await adoptionModel.findById(id);
    }
    async getBy(params) {
        return await adoptionModel.findOne(params);
    }
    async save(doc) {
        return await adoptionModel.create(doc);
    }
    async update(id, doc) {
        return await adoptionModel.findByIdAndUpdate(id, { $set: doc }, { new: true });
    }
    async delete(id) {
        return await adoptionModel.findByIdAndDelete(id);
    }
}