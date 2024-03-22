"use strict";

const { mongoose } = require("../configs/dbConnection");

const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Personnel", //user
      required: true,
      index: true, //ben bu ıdye erişmeye çalıştıgımda hızlı erişmek için.Ram bellekte saklıyor.
      unique: true,
    },
    token: {
      type: String,
      trim: true,
      required: true,
      index: true,
      unique: true,
    },
  },
  { timestamps: true, collection: "tokens" }
);

module.exports = new mongoose.model("Token", TokenSchema);
