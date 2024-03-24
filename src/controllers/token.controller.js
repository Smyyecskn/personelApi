"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
//token controlleri swaggerda yayınlamaya gerek yok sadece admin bilmeli.Tokenı swagger documentte göstermemek için 10. satırda bunu yaptık.
const Token = require("../models/token.model");

module.exports = {
  list: async (req, res) => {
    /*
      _swagger.deprecated = true
      #swagger.ignore = true
    */
    // const data = await Token.find(search)
    //   .sort(sort)
    //   .skip(skip)
    //   .limit(limit);
    const data = await res.getModelList(Token);
    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(Token),
      data,
    });
  },
  create: async (req, res) => {
    /*
      _swagger.deprecated = true
      #swagger.ignore = true
    */
    const data = await Token.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    /*
      _swagger.deprecated = true
      #swagger.ignore = true
    */
    const data = await Token.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    /*
      _swagger.deprecated = true
      #swagger.ignore = true
    */
    const data = await Token.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true, //!bir kayıt güncelleme işlemi sırasında belirli bir şema veya modelde tanımlanan doğrulama kurallarının çalıştırılıp çalıştırılmayacağını belirtir.SCHEMADAKİ email formatı uygun mu guncellerken buna bak.
    });
    res.status(202).send({
      error: false,
      data,
      new: await Token.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    /*
      _swagger.deprecated = true
      #swagger.ignore = true
    */
    const data = await Token.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });

    // const isDeleted = data.deletedCount >= 1 ? true : false

    // res.status(isDeleted ? 204 : 404).send({
    //     error: !isDeleted,
    //     data
    // })
  },
};
