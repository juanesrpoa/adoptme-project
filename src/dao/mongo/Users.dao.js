import userModel from "../../models/User.js";

export default class UserDao {
    async getAll() {
        return await userModel.find();
    }
    async getById(id) {
        return await userModel.findById(id);
    }
    async getBy(params) {
        return await userModel.findOne(params);
    }
    async save(doc) {
        return await userModel.create(doc);
    }
    async update(id, doc) {
        return await userModel.findByIdAndUpdate(id, { $set: doc }, { new: true });
    }
    async delete(id) {
        return await userModel.findByIdAndDelete(id);
    }
}