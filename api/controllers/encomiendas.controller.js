const Encomienda = require('../schemas/Encomiendas.schema');

const traerEncomiendas = async (req, res) => {
  const encomiendas = await Encomienda.find().catch((err) =>
    console.log('ERROR BUSCANDO ENCOMIENDAS', err)
  );

  if (!encomiendas.length) {
    res.status(404).send({ message: 'No hay encomiendas disponibles' });
  } else {
    res.send({ message: 'BUSQUEDA EXITOSA', encomiendas });
  }
};

const traerEncomiendasPorId = async (req, res) => {
  const encomienda = await Encomienda.findById(req.params.id).catch((err) =>
    console.log('ERROR BUSCANDO ENCOMIENDAS', err)
  );

  if (!encomienda) {
    res
      .status(404)
      .send({ message: 'No se encontró una encomienda con ese ID' });
  } else {
    res.send({ message: 'ENCOMIENDA ENCONTRADA', encomienda });
  }
};

const registrarEncomienda = async (req, res) => {
  const nuevaEncomienda = new Encomienda(req.body);

  await nuevaEncomienda
    .save()
    .catch((err) => console.log('ERROR GUARDANDO NUEVA ENCOMIENDA', err));

  res.send({ message: 'REGISTRO EXITOSO', encomienda: nuevaEncomienda });
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
