//src/models/sotilgan.js
const { Schema, model } = require("mongoose");

const sotildiSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  birligi: {
    type: String,
    enum:[
      'шт',
      'пара',
      'комплект',
      'метр'
    ],
    required: true,
  },
  // narxi: {
  //   type: Number,
  //   required: false,
  // },
  mavjudtovarlar: {
    type: Number,
    required: true,
  },
  type:{
    type: String,
    enum:[
      'kommutator',
      'spfmodullari',
      'mashrutizatorlar',
      'routerlar',
      'radiomostlar',
      'qabulnuqtalari',
      'mediakonvertorlar',
      'iptelefonlar',
      'serverlar',
      'serverkomponentlari',
      'noutbuklar',
      'monobloklar',
      'lazerliprinterlar',
      'kampyuterjihozlari',
      'optikdistribyutorlar',
      'patchkord',
      'optiktolalikabel',
      'shkaflar',
      'muftalar'
    ],
    required: true,
  },
  history:[
    {
      sana: {
        type: Date,
        required: true,
      },
      xaridor: {
        type: String,
        required: true,
      },
      chiqibKetganTovarlarSoni:  {
        type: Number,
        required: true,
      },
    }
  ],
});

module.exports = model("comtech", sotildiSchema);

