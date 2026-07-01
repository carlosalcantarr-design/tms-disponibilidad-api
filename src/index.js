require("dotenv").config();

const path = require("path");
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

app.get("/api/descargar-apk", (_req, res) => {
  const apkPath = path.join(__dirname, "../Public/kioskoTM.apk");
  res.download(apkPath, "kioskoTM.apk", (err) => {
    if (err && !res.headersSent) {
      res.status(500).json({ error: "Error al descargar el archivo" });
    }
  });
});

app.use((_req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`API de disponibilidad TMS escuchando en puerto ${PORT}`);
});
