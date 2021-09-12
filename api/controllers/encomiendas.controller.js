const Encomienda = require('../schemas/Encomiendas.schema');
const moment = require('moment-timezone');

const traerEncomiendas = async (req, res) => {
  const _encomiendas = await Encomienda.find().catch((err) =>
    console.log('ERROR BUSCANDO ENCOMIENDAS', err)
  );

  const encomiendas = _encomiendas.map((encomienda) => {
    let fecha = String(moment(encomienda.fecha_emision).format());
    fecha = moment(fecha.split('T')[0]).format('DD-MM-YYYY');
    return {
      id: encomienda.id,
      remitente: encomienda.remitente,
      destinatario: encomienda.destinatario,
      ciudad_destino: encomienda.ciudad_destino,
      estado: encomienda.estado,
      fragil: encomienda.fragil,
      fecha_emision: fecha,
    };
  });

  if (!encomiendas.length) {
    res.status(404).send({ message: 'No hay encomiendas disponibles' });
  } else {
    res.send({ message: 'BUSQUEDA EXITOSA', encomiendas });
  }
};

const traerEncomiendasPorId = async (req, res) => {
  let encomienda = await Encomienda.findById(req.params.id).catch((err) =>
    console.log('ERROR BUSCANDO ENCOMIENDAS', err)
  );

  let fecha = String(moment(encomienda.fecha_emision).format());
  fecha = moment(fecha.split('T')[0]).format('DD-MM-YYYY');

  if (!encomienda) {
    res
      .status(404)
      .send({ message: 'No se encontró una encomienda con ese ID' });
  } else {
    res.send({
      message: 'ENCOMIENDA ENCONTRADA',
      encomienda: {
        id: encomienda.id,
        remitente: encomienda.remitente,
        destinatario: encomienda.destinatario,
        ciudad_destino: encomienda.ciudad_destino,
        estado: encomienda.estado,
        fragil: encomienda.fragil,
        fecha_emision: fecha,
      },
    });
  }
};

const registrarEncomienda = async (req, res) => {
  const fecha_emision = moment();

  let nuevaEncomienda = new Encomienda({
    ...req.body,
    fecha_emision: fecha_emision,
  });

  nuevaEncomienda = await nuevaEncomienda
    .save()
    .catch((err) => console.log('ERROR GUARDANDO NUEVA ENCOMIENDA', err));

  if (nuevaEncomienda) {
    let fecha = String(moment(nuevaEncomienda.fecha_emision).format());
    fecha = moment(fecha.split('T')[0]).format('DD-MM-YYYY');

    res.send({
      message: 'REGISTRO EXITOSO',
      encomienda: {
        id: nuevaEncomienda.id,
        remitente: nuevaEncomienda.remitente,
        destinatario: nuevaEncomienda.destinatario,
        ciudad_destino: nuevaEncomienda.ciudad_destino,
        estado: nuevaEncomienda.estado,
        fragil: nuevaEncomienda.fragil,
        fecha_emision: fecha,
      },
    });
  } else {
    res.status(409).send({ message: 'Error guardando en mongodb' });
  }  
};

const actualizarEncomienda = async (req, res) => {
  const datos = await Encomienda.findByIdAndUpdate(
    req.body._id,
    req.body
  ).catch((err) => console.log('ERROR ACTUALIZANDO ENCOMIENDA', err));

  if (!datos)
    res
      .status(404)
      .send({ message: 'No se encontro una encomienda con ese ID' });
  else res.send({ message: 'Se actualizo la encomienda correctamente' });
};

module.exports = {
  traerEncomiendasPorId,
  traerEncomiendas,
  registrarEncomienda,
  actualizarEncomienda,
};
