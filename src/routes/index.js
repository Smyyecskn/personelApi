"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

//auth
router.use("/auth", require("./auth.router"));
//tokens
router.use("/tokens", require("./token.router"));
//personnel
router.use("/personnels", require("./personnel.router"));
//departments:
router.use("/department", require("./department.router"));

module.exports = router;
