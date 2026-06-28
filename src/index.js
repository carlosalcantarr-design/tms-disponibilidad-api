require("dotenv").config();

const express = require("express");
const cors = require("cors");
const disponibilidadRoutes = require("./routes/disponibilidad");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/disponibilidad", disponibilidadRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`API de disponibilidad TMS escuchando en puerto ${PORT}`);
});
