"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
//!(Authentication) Kimlik doğrulama, bir kullanıcının kimlik bilgilerini doğrulama sürecidir.
//!(Authorization) Yetkilendirme, bir kullanıcının belirli kaynaklara erişim iznini kontrol etme sürecidir.
//dosya ismi auth.js olmalı çogul kullanmıyoruz.

const router = require("express").Router();

// {"username":"testF0","password":"1234"} giriş bilgilerinde kullanmak için.
/* ------------------------------------------------------- */
const auth = require("../controllers/auth.controller");

router.post("/login", auth.login);
router.all("/logout", auth.logout);

/* ------------------------------------------------------- */
module.exports = router;
