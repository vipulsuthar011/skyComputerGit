import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema({
    label: String,
    price: Number,
    quantity: Number,
    total: Number,
    purchasePrice: Number,
    purchasePriceTotal: Number,
  });
const formSchema = new Schema({
  address: String,
  billDate: Date,
  email: String,
  gst: String,
  mobile: Number,
  name: String,
  subject: String,
  });
  
  // Define the main schema for formData
  const billingSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    grandTotal: Number,
    items: [itemSchema], // Embed the items as an array of objects
    formData:formSchema,
  });

export default mongoose.model('billingModel',billingSchema)