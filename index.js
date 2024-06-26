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
// Required Modules:

// envVariables to process.env:
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// asyncErrors to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* ------------------------------------------------------- *
//* MORGAN LOGGING
// https://expressjs.com/en/resources/middleware/morgan.html
// https://github.com/expressjs/morgan
//? $ npm i morgan

const morgan = require('morgan')

// app.use(morgan('combined')) //bu şekilde çağrılıyordu ama deprecated oldu. hata olsada olmasada log kaydı tutulur.
// app.use(morgan('common'))
// app.use(morgan('dev'))
// app.use(morgan('short'))
// app.use(morgan('tiny'))
 //!log kaydımı kendim yazıp tutabilmem için
// app.use(morgan('IP=:remote-addr | TIME=:date[clf] | METHOD=:method | URL=:url | STATUS=:status | LENGTH=:res[content-length] | REF=:referrer | AGENT=":user-agent"'))
!log kaydı örnekler: // // EXAMPLE: sadece hata aldıklarının log kaydını tutmak için //
//  morgan('combined', {
// // skip: function (req, res) { return res.statusCode < 400 }
// // })

Write to log file: Log kaydını bir DOSYAYA kaydetmeliyim.Dosyaya yazmaz bunun modulu fs

// const fs = require('node:fs')
// app.use(morgan('combined', {
//     stream: fs.createWriteStream('./access.log', { flags: 'a+' })
// }))

/? Write to file day by day: //ayarladım ve her yaptıgım değişiklik access.loga kaydet dosyaya a+ olarak davranır dosyayı okucak ve yeni bir dosya açıp eklicek logları.access.log hergun olursa şişer.bu yuzden yenı klasor oluşturduk ismi logs ve kayıtlar gunluk tutulur.Yapılan ziyaretler gun be gun tutuluyor. Ziyaret bilgileri tutulur.

const fs = require('node:fs')
const now = new Date()
// console.log(typeof now, now)
const today = now.toISOString().split('T')[0]
// console.log(typeof today, today)
app.use(morgan('combined', {
    stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a+' })
}))

/* ------------------------------------------------------- */
//* DOCUMENTATION:
// https://swagger-autogen.github.io/docs/
// $ npm i swagger-autogen // routelarımı tarayıp json dosyası ortaya cıkarır.
// $ npm i swagger-ui-express //jsonu gorsele donusturur.
// $ npm i redoc-express

//? JSON
app.use("/documents/json", (req, res) => {
  //urlsınde JSON dosya içeriğini göstermek istiyorum .içinde bulundugum klasorun ıcınde ara
  res.sendFile("swagger.json", { root: "." });
});

//? SWAGGER:
const swaggerUi = require("swagger-ui-express"); //middleware
const swaggerJson = require("./swagger.json");
app.use(
  "/documents/swagger", //route
  swaggerUi.serve, //sistemi çalıştır
  swaggerUi.setup(swaggerJson, {
    //ayarları yap 1. parametre gereken json dosyası 2. par token çalıştırma ayarı
    swaggerOptions: { persistAuthorization: true },
  })
);

//? REDOC:
const redoc = require("redoc-express");
app.use(
  "/documents/redoc",
  redoc({
    title: "PersonnelAPI", //ayarlar başlık
    specUrl: "/documents/json", //ÖNEMLİ verileri 77. satırdakı JSONDAN alıcak
  })
);

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json());

// Logging:
// app.use(require("./src/middlewares/logging"));

// SessionsCookies:
app.use(require("cookie-session")({ secret: process.env.SECRET_KEY }));

// res.getModelList():
app.use(require("./src/middlewares/findSearchSortPage"));

/* ------------------------------------------------------- *
// Authentication (SessionCookies):
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
// Authentication (Simpe Token):

app.use(require("./src/middlewares/authentication"));

/* ------------------------------------------------------- */
// Routes:

// HomePath:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to PERSONNEL API",
    // session: req.session,
    // isLogin: req.isLogin,
    user: req.user,
    api: {
      documents: {
        swagger: "http://127.0.0.1:8000/documents/swagger",
        redoc: "http://127.0.0.1:8000/documents/redoc",
        json: "http://127.0.0.1:8000/documents/json",
      },
      contact: "contact@clarusway.com",
    },
  });
});

// // /departments
// app.use('/departments', require('./src/routes/department.router'))
// // /personnels
// app.use('/personnels', require('./src/routes/personnel.router'))

// app.use(require('./src/routes/index'))
app.use(require("./src/routes/"));

/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()
