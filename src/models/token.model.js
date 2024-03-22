"use strict";

const { mongoose } = require("../configs/dbConnection"); //mongoose modulunu tekrar tekrar çağırmamak yer kaplamasın

const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Personnel tablosundaki personel'in idlerini  eşleştirmem gerek
      ref: "Personnel", //user
      required: true, //ben mutlaka tokena karşılık id vermelıyım.KESINLIKLE OLMALI.
      index: true, //ben bu ıdye erişmeye çalıştıgımda hızlı erişmek için.Ram bellekte saklıyor.
      unique: true, //benzersız olmalı.
    },
    token: {
      type: String,
      trim: true,
      required: true, //token ZORUNLU
      index: true,
      unique: true, //token BENZERSİZ
    },
  },
  { timestamps: true, collection: "tokens" }
);

module.exports = new mongoose.model("Token", TokenSchema);
