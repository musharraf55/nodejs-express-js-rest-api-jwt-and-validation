import mongoose from "mongoose";

import autoIncrement from "mongoose-auto-increment";
const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    token: { type: String },
    createdAt: { type: Date, default: Date.now, expires: 3600 },
    verified: { type: Boolean, default: false },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_delete: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
//     expiresIn: "7d",
//   });
//   return token;
// };

autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, "user");
const postUser = mongoose.model("user", userSchema);

export default postUser;
