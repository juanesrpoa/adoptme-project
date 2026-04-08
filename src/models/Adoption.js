import mongoose from "mongoose";

const adoptionCollection = "adoptions";

const adoptionSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    pet: { type: mongoose.Schema.Types.ObjectId, ref: "pets" }
});

const adoptionModel = mongoose.model(adoptionCollection, adoptionSchema);
export default adoptionModel;