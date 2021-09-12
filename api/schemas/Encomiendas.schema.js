const mongoose = require('mongoose');
const moment = require('moment');

const cliente = new mongoose.Schema(
  {
    nombre: { type: String },
    dni: { type: Number },
  },
  { _id: false }
);

const ciudad_destino = new mongoose.Schema(
  {
    nombre: { type: String },
    CP: { type: Number },
  },
  { _id: false }
);

const EncomiendaSchema = new mongoose.Schema(
  {
    remitente: { type: cliente },
    destinatario: { type: cliente },
    ciudad_destino: { type: ciudad_destino },
    estado: {
      type: String,
      enum: [
        'ENTREGADO',
        'EN_CAMINO',
        'EN_SUCURSAL_DESTINO',
        'EN_CENTRO_DISTRIBUCION',
      ],
      default: 'EN_CENTRO_DISTRIBUCION',
    },
    fragil: { type: Boolean, default: false },
    fecha_emision: {
      type: Date,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('encomiendas', EncomiendaSchema);
