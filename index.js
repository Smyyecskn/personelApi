"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/

const express = require("express");
const app = express();
/* ------------------------------------------------------- */
require("dotenv").config();
const PORT = process.env.PORT || 8000;

// errorHandler import ettik.
require("express-async-errors");

/* ------------------------------------------------------- */
// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();
/* ------------------------------------------------------- */
//MORGAN LOGGING = npm i morgan (MİDDLEWAREDİR.gelen her ziyaretcının girdi çıktı bilgilerini bana verir.Log kayıtlarını tutar.)
// https://expressjs.com/en/resources/middleware/morgan.html
// https://github.com/expressjs/morgan

const morgan = require("morgan");
app.use(morgan()); //bu şekilde çağrılıyordu ama deprecated oldu. hata olsada olmasada log kaydı tutulur.
// app.use(morgan("combined")); //en geniş detaydan en aza dogru
// app.use(morgan("common"));
// app.use(morgan("short"));
// app.use(morgan("tiny"));

//!log kaydı örnekler:
// EXAMPLE: sadece hata aldıklarının log kaydını tutmak için
// morgan('combined', {
//   skip: function (req, res) { return res.statusCode < 400 }
// })
//!log kaydımı kendim tutabilmem için
// app.use(
//   morgan(
//     `IP=:remote-addr | TIME=:date[clf] | METHOD=:method | URL=:url | STATUS=:status | LENGTH=:res[content-length] | REF=:referrer |  AGENT=:user-agent`
//   )
// );

//? Write to Log File Log kaydını biryere kaydetmeliyim.Dosyaya yazmaz bunun modulu fs
// const fs = require("node:fs");
// app.use(
//   morgan("combined", {
//     stream: fs.createWriteStream("./access.log", { flags: "a+"})})
// );
// const fs = require("node:fs");
// const now = new Date();
// // console.log(now, typeof now);
// const today = now.toISOString().split("T")[0];
// app.use(
//   morgan("combined", {
//     stream: fs.createWriteStream(`./logs/${today}.log`, { flags: "a+" }),
//   })
// ); //yapılan ziyaretler gun be gun tutuluyor. Ziyaret bilgileri tutulur.
require("./src/middlewares/loggin");

/* ------------------------------------------------------- */

//DOCUMENTATION
// $ npm i swagger-autogen
//   $ npm i swagger-ui-express
// $ npm i redoc-express

const swaggerUi = require("swagger-ui-express");
const swaggerJson = require("./swagger.json");
app.use(
  "/documents/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJson, {
    swaggerOptions: { persistAuthorization: true },
  })
);
/* ------------------------------------------------------- */
//middlewares:ler her zaman routeların uzerınde OLMALI.!
app.use(express.json());

//session-cookies
app.use(require("cookie-session")({ secret: process.env.SECRET_KEY }));

// res.getModelList
app.use(require("./src/middlewares/findSearchSortPage"));

//authentication
app.use(require("./src/middlewares/authentication"));

//routes içindeki index dosyası
app.use(require("./src/routes/"));
/* ------------------------------------------------------- */

/* ------------------------------------------------------- *
! Authentication (SessionCookies):
// Login/Logout Control Middleware
app.use(async (req, res, next) => {

    const Personnel = require('./src/models/personnel.model')

    req.isLogin = false

    if (req.session?.id) {

        const user = await Personnel.findOne({ _id: req.session.id })

        // if (user && user.password == req.session.password) {
        //     req.isLogin = true
        // }
        req.isLogin = user && user.password == req.session.password
    }
    console.log('isLogin: ', req.isLogin)

    next()
})

/* ------------------------------------------------------- */
// Authentication (Simple Token): bunları routes içindeki index.jse aktardık.

// departments:
// app.use("/department", require("./src/routes/department.router"));
// personnel
// app.use("/personnels", require("./src/routes/personnel.router"));
// routes/index.js

/* ------------------------------------------------------- */

//home app
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to PERSONNEL API",
    user: req.user,
  });
});

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization ("must be in commentLine"):
// require("./src/helpers/sync")();
