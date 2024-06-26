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
router.get("/logout", auth.logout); //swagger .all metodunu desteklemez.
// router.all("/logout", auth.logout); //swagger .all metodunu desteklemez.

/* ------------------------------------------------------- */
module.exports = router;
