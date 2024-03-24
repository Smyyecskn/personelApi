"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const Personnel = require("../models/personnel.model");

module.exports = {
  list: async (req, res) => {
    /*
        #swagger.tags = ["Personnels"]
        #swagger.summary = "List Personnels"
        #swagger.description = `
            You can send query with endpoint for search[], sort[], page and limit.
            <ul> Examples:
                <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                <li>URL/?<b>page=2&limit=1</b></li>
            </ul>
        `
    */
    // const data = await Personnel.find(search).sort(sort).skip(skip).limit(limit)
    const data = await res.getModelList(Personnel);

    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(Personnel),
      data, // data: data
    });
  },

  create: async (req, res) => {
    /*
      _swagger.deprecated = true
      #swagger.ignore = true
 
    */
    const data = await Personnel.create(req.body);
    // isLead Control:
    const isLead = req.body.isLead || false;
    if (isLead) {
      await Personnel.updateMany(
        //! birden fazla kişide değişiklik yapılması için.
        {
          departmentId: req.body.departmentId, //! filter kısmı departmant ıd'ye ve islead'i true olana göre FİLTRELEDİK.Bir bölümün içindekileri seçicez o yuzdden departmentId'ye göre filtreledik.
          isLead: true,
        },
        { isLead: false } //!gerçekleştirilecek durum
      );
    }

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
        #swagger.tags = ["Personnels"]
        #swagger.summary = "Get Single Personnel"
    */
    const data = await Personnel.findOne({ _id: req.params.id });

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

    // isLead Control:
    const isLead = req.body?.isLead || false;
    if (isLead) {
      const { departmentId } = await Personnel.findOne(
        { _id: req.params.id }, //!şuanda urldeki idye göre isLead :true yapıcaz.Düzenlicez
        { departmentId: 1 }
      );
      await Personnel.updateMany(
        { departmentId, isLead: true }, //!gerçekleştirilecek olay
        { isLead: false }
      );
    }

    if (!req.user.isAdmin) {
      //gelen user(personnel) admin değilse, personel kendi bilgilerini rahat rahat değiştirmesin,adminse değişiklik yapılabilecek.
      // req.body.isAdmin = false; //admin hep false da kalsın.
      delete req.body.salary; //maasını değiştirmesin değiştirse bile req.bodyden sildim.
      // delete req.body.isLead;
    }

    const data = await Personnel.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    res.status(202).send({
      error: false,
      data,
      new: await Personnel.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
        #swagger.tags = ["Personnels"]
        #swagger.summary = "Delete Personnel"
    */

    const data = await Personnel.deleteOne({ _id: req.params.id });

    // const isDeleted = data.deletedCount >= 1 ? true : false;
    // res.status(isDeleted ? 204 : 404).send({
    //   error: !isDeleted,
    //   data,
    // });

    res.status(data.deletedCount ? 204 : 404).send({
      // error: data.deletedCount ? false : true, //!data.deletedCount >= 1 den erroru false ver yani SİLİNDİ veri yoksa erroru TRUE VER. HATA DÖNSÜN
      error: !data.deletedCount,
      data,
    });
  },
};
