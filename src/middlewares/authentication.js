"use strict";
//!Kimlik kontrolu yapılacak.Tokenı ve kim oldugunu kontrol edicez.

const Token = require("../models/token.model");

module.exports = async (req, res, next) => {
  // Authorization: Token ...
  // Authorization: ApiKey ...
  // Authorization: X-API-KEY ...
  // Authorization: x-auth-token ...
  // Authorization: Bearer ...

  const auth = req.headers?.authorization || null; // Token ...tokenKey...
  const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...tokenKey...']

  if (tokenKey && tokenKey[0] == "Token") {
    const tokenData = await Token.findOne({ token: tokenKey[1] }).populate(
      "userId"
    ); //userIdye populate = personnel modelını de getir.
    // console.log(tokenData)
    if (tokenData) req.user = tokenData.userId; // Personnel Data
    // console.log(req.user) // 1-kullanıcının personeldeki bilgileri yani tüm user bilgileri obje içinde 2-userId:tokenDatadan gelen userId
  }

  next();
};
