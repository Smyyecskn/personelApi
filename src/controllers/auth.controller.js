"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const Personnel = require("../models/personnel.model");
const Token = require("../models/token.model");
const passwordEncrypt = require("../helpers/passwordEncrypt"); //altta tokenData oluşturmak için import ettik.

module.exports = {
  // LOGIN & LOGOUT

  login: async (req, res) => {
    /*
    #swagger.tags = ["Authentication"] grubun ismi
    #swagger.summary = ["Login"]  
     #swagger.description = 'Login with username and password'
            #swagger.parameters['body'] = {
                in: 'body',
                required: 'true',
                schema: {
                    username: "testF0",
                    password: "1234"
                }
            }
 
    */

    const { username, password } = req.body;

    if (username && password) {
      //? findOne, passwordu modeldeki set metodundaki encrypt i kullanarak db'de filtreleme yapar. //!findOne passwordu modeldekı set metodundakı encrypti kullandı db'de filtreleme yaptı. set passwordu GÜNCELLEDİ.

      const user = await Personnel.findOne({ username, password }); //set metodunu kullandıgımız için şifreli kullanmaya gerek kalmadı.//! en başta usere burda değer atadık
      // console.log(user);
      if (user && user.isActive) {
        /* SESSION //sesıon cookıe istemeyiz.
                
                // Set Session:
                req.session = {
                    id: user._id,
                    password: user.password
                }
                // Set Cookie:
                if (req.body?.rememberMe) {
                    req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3 // 3 Days
                }

                /* SESSION */

        /* TOKEN */

        // Token var mı?
        let tokenData = await Token.findOne({ userId: user._id }); // Tokenın userId sini eşitle user._id ye göre,(Tokenda olan userId eşit mi personel modelındekı (personele göre unique) oluşturulan id ile , kullanıcı username ve passwordu dogru girerse bize user bilgilerini veren obje response döner 45de gonderdık )

        // Eğer token yoksa oluştur:
        if (!tokenData) {
          const tokenKey = passwordEncrypt(user._id + Date.now()); //benzersiz birşey koymam lazım.şifrelemezsem tahmin edilebilir.
          // console.log(typeof tokenKey, tokenKey)
          tokenData = await Token.create({ userId: user._id, token: tokenKey }); //userId'ye göre token oluşturduk
        }

        /* TOKEN */

        res.status(200).send({
          error: false,
          token: tokenData.token, //token oluşturduk FE'ye biz bunu response döndük.
          user, //32den gelen user respose donen objeye user ismi verdik.
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("Wrong Username or Password.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter username and password.");
    }
  },

  logout: async (req, res) => {
    /*
    #swagger.tags = ["Authentication"] grubun ismi
    #swagger.summary = ["Logout"]  
     #swagger.description = 'Delete Token'
            
    */

    /* SESSION */
    // Set session to null:
    req.session = null;
    /* SESSION */

    /* TOKEN */

    //* 1. Yöntem (Kısa yöntem)
    //? Her kullanıcı için sadece 1 adet token var ise (tüm cihazlardan çıkış yap):

    // console.log(req.user)
    // const deleted = await Token.deleteOne({ userId: req.user._id })

    //* 2. Yöntem:
    //? Her kullanıcı için 1'den fazla token var ise (çoklu cihaz):

    const auth = req.headers?.authorization || null; // Token ...tokenKey...
    const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...tokenKey...']

    let deleted = null;
    if (tokenKey && tokenKey[0] == "Token") {
      deleted = await Token.deleteOne({ token: tokenKey[1] });
    }

    /* TOKEN */

    res.status(200).send({
      error: false,
      // message: 'Logout: Sessions Deleted.',
      message: "Logout: Token Deleted.",
      deleted,
    });
  },
};
