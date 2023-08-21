import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    // required: [true, "Name field is required"],
  },
  shortDescription: {
    type: String,
    // required: [true, "shortDescription is required"],
  },
 
  price:{
    type : Number
  },
  purchasePrice:{
    type : Number
  }
});

export default mongoose.model("product", productSchema);
