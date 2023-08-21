import mongoose, { Schema } from "mongoose";

const companyDetailSchema = new Schema({
    term:String,
});

export default mongoose.model("companyDetail", companyDetailSchema);
