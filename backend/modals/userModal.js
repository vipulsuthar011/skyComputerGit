import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  phoneNumber: {
    type: Number,
    required: [true, "Phone field is required"],
  },
  password: {
    type: Schema.Types.Mixed,
    required: [true, "password is required"],
  },
  // userType: { type: String, required: [true, "usertype is required"] },
});

export default mongoose.model("user", userSchema);
