"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const Department = require("../models/department.model");

module.exports = {
  list: async (req, res) => {
    // const data = await Department.find(search)
    //   .sort(sort)
    //   .skip(skip)
    //   .limit(limit);
    const data = await res.getModelList(Department);
    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(Department),
      data,
    });
  },
  create: async (req, res) => {
    const data = await Department.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    const data = await Department.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    const data = await Department.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true, //!bir kayıt güncelleme işlemi sırasında belirli bir şema veya modelde tanımlanan doğrulama kurallarının çalıştırılıp çalıştırılmayacağını belirtir.SCHEMADAKİ email formatı uygun mu guncellerken de post yaparken de buna bak.
    });
    res.status(202).send({
      error: false,
      data,
      new: await Department.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    const data = await Department.deleteOne({ _id: req.params.id });

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

  personnels: async (req, res) => {
    const Personnel = require("../models/personnel.model"); //departmente göre personellerini filtreledik.
    const data = await res.getModelList(
      Personnel, //findSearchSortPage'e parametre olarak gönderdik.
      { departmentId: req.params.id }, //personel modelden gelen department idye kullanıcın girdiği id eşit mi
      "departmentId" // birleştir ki bizim department bilgileri gelsin
    );
    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(Personnel, {
        departmentId: req.params.id, //departmentId'yi kullanıcıdan gelen idye eşitle department router de oraya /:id/personnels yazdık ya o kısmı yapıyoruz.
      }),
      data,
    });
  },
};
