const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const { Schema } = mongoose;

const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      min: 6,
      required: true,
    },
    order: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    isAdmin : {
      type : Boolean,
      default : false
    }
  },
  { collection: "users" }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); ///check khi người dùng đổi pass => nếu đổi chạy xuống dưới để hasspass

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (e) {
    return next(e);
  }
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
