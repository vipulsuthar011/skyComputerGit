import mongoose, { Schema } from "mongoose";

const companyDetailSchema = new Schema({
    term:Array,
});

export default mongoose.model("companyDetail", companyDetailSchema);
