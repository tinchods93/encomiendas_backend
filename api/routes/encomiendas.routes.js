const express = require('express');
const router = express.Router();
const {
  traerEncomiendasPorId,
  traerEncomiendas,
  registrarEncomienda,
  actualizarEncomienda,
} = require('../controllers/encomiendas.controller');

router.get('/consultar', traerEncomiendas);
router.get('/consultar/:id', traerEncomiendasPorId);

router.post('/registrar', registrarEncomienda);
router.patch('/actualizar', actualizarEncomienda);

module.exports = router;
