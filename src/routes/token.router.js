"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
//!token silme ekleme işlevini sadece admin yönetebilir.
const token = require("../controllers/token.controller");
const permissions = require("../middlewares/permission");
// const {isAdmin} = require("../middlewares/permissions"); //sadece içerden admini alıp performance basid

router.use(permissions.isAdmin);
router.route("/").get(token.list).post(token.create);

router
  .route("/:id")
  .get(token.read)
  .put(token.update)
  .patch(token.update)
  .delete(token.delete);

/* ------------------------------------------------------- */
module.exports = router;
