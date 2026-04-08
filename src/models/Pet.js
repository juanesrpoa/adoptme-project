import mongoose from "mongoose";

const petCollection = "pets";

const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specie: { type: String, required: true },
    birthDate: { type: String },
    adopted: { type: Boolean, default: false },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    image: { type: String }
});

const petModel = mongoose.model(petCollection, petSchema);
export default petModel;