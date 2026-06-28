const express = require("express");
const { operadoresMock } = require("../data/operadores");

const router = express.Router();

const ESTATUS_ORDER = [
  "DISPONIBLE",
  "POR LIBERAR",
  "EN VIAJE",
  "INCIDENCIA",
  "UNIDAD EN TALLER",
  "LICENCIA VENCIDA",
  "APTO MEDICO VENCIDO",
];

function compareEta(a, b) {
  if (a.ETA === null && b.ETA === null) return 0;
  if (a.ETA === null) return 1;
  if (b.ETA === null) return -1;
  return new Date(a.ETA).getTime() - new Date(b.ETA).getTime();
}

function sortOperadores(operadores) {
  return [...operadores].sort((a, b) => {
    const orderA = ESTATUS_ORDER.indexOf(a.Estatus);
    const orderB = ESTATUS_ORDER.indexOf(b.Estatus);

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return compareEta(a, b);
  });
}

router.get("/", (_req, res) => {
  res.json(sortOperadores(operadoresMock));
});

router.get("/:estatus", (req, res) => {
  const estatusParam = req.params.estatus.toUpperCase();

  const filtrados = operadoresMock.filter(
    (op) => op.Estatus.toUpperCase() === estatusParam
  );

  if (filtrados.length === 0) {
    return res.status(404).json({
      error: "Estatus no encontrado",
      estatus: req.params.estatus,
    });
  }

  res.json(sortOperadores(filtrados));
});

module.exports = router;
