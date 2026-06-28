# TMS Disponibilidad API

Mock API REST de disponibilidad de operadores para un sistema TMS de logística de transporte de carga en México.

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

```bash
npm install
```

## Ejecución local

1. Copia o verifica el archivo `.env` en la raíz del proyecto:

```env
PORT=3000
```

2. Inicia el servidor:

```bash
npm start
```

La API estará disponible en `http://localhost:3000`.

## Deploy en Railway

1. Crea una cuenta en [Railway](https://railway.app) e inicia sesión.
2. Crea un **New Project** y selecciona **Deploy from GitHub repo** (conecta este repositorio) o **Empty Project** y sube el código.
3. Railway detectará automáticamente el proyecto Node.js y usará el script `npm start`.
4. La variable `PORT` la asigna Railway automáticamente; no es necesario configurarla manualmente.
5. Opcional: en **Variables**, puedes definir `PORT` si deseas un valor específico (Railway suele inyectar su propio puerto).
6. Una vez desplegado, Railway te proporcionará una URL pública (por ejemplo `https://tu-app.up.railway.app`).

## Endpoints

### GET /api/health

Verifica que la API esté en línea.

**Ejemplo de respuesta:**

```json
{
  "status": "ok",
  "timestamp": "2026-06-27T12:00:00.000Z"
}
```

---

### GET /api/disponibilidad

Devuelve el listado completo de operadores ordenado por estatus y ETA.

**Orden de estatus:**

1. DISPONIBLE
2. POR LIBERAR
3. EN VIAJE
4. INCIDENCIA
5. UNIDAD EN TALLER
6. LICENCIA VENCIDA
7. APTO MEDICO VENCIDO

Dentro de cada grupo, los registros se ordenan por `ETA` ascendente (valores `null` al final).

**Ejemplo de respuesta (fragmento):**

```json
[
  {
    "Eqp_id": 11638,
    "emp_id": 287621,
    "eqp_nombre": "TR-TM313",
    "emp_nombreInterno": "JOHAN HERNANDEZ HERNANDEZ",
    "Estatus": "DISPONIBLE",
    "EstatusUnidad": "ACTIVA",
    "FolioDespacho": 0,
    "Destino": null,
    "ETA": null,
    "RES_Comentarios": null,
    "RES_Fecha_Fin": null,
    "EMP_VigenciaLicencia": "2030-03-27",
    "EMP_VigenciaAptoMedico": "2028-03-24",
    "UBI_Latitud": 25.902875,
    "UBI_Longitud": -100.205979
  }
]
```

---

### GET /api/disponibilidad/:estatus

Filtra operadores por estatus (comparación case insensitive).

**Ejemplos:**

- `GET /api/disponibilidad/disponible`
- `GET /api/disponibilidad/en%20viaje`
- `GET /api/disponibilidad/por%20liberar`

**Ejemplo de respuesta** (`GET /api/disponibilidad/disponible`):

```json
[
  {
    "Eqp_id": 11638,
    "emp_id": 287621,
    "eqp_nombre": "TR-TM313",
    "emp_nombreInterno": "JOHAN HERNANDEZ HERNANDEZ",
    "Estatus": "DISPONIBLE",
    "EstatusUnidad": "ACTIVA",
    "FolioDespacho": 0,
    "Destino": null,
    "ETA": null,
    "RES_Comentarios": null,
    "RES_Fecha_Fin": null,
    "EMP_VigenciaLicencia": "2030-03-27",
    "EMP_VigenciaAptoMedico": "2028-03-24",
    "UBI_Latitud": 25.902875,
    "UBI_Longitud": -100.205979
  },
  {
    "Eqp_id": 12254,
    "emp_id": 287763,
    "eqp_nombre": "TR-TM406",
    "emp_nombreInterno": "JUAN ANTONIO REYES NAVA",
    "Estatus": "DISPONIBLE",
    "EstatusUnidad": "ACTIVA",
    "FolioDespacho": 0,
    "Destino": null,
    "ETA": null,
    "RES_Comentarios": null,
    "RES_Fecha_Fin": null,
    "EMP_VigenciaLicencia": "2028-05-26",
    "EMP_VigenciaAptoMedico": "2028-05-26",
    "UBI_Latitud": 27.378837,
    "UBI_Longitud": -99.55428
  },
  {
    "Eqp_id": 11398,
    "emp_id": 164284,
    "eqp_nombre": "PATIO11",
    "emp_nombreInterno": "MIGUEL ANGEL CONTRERAS LUNA",
    "Estatus": "DISPONIBLE",
    "EstatusUnidad": null,
    "FolioDespacho": 0,
    "Destino": null,
    "ETA": null,
    "RES_Comentarios": null,
    "RES_Fecha_Fin": null,
    "EMP_VigenciaLicencia": "2027-05-13",
    "EMP_VigenciaAptoMedico": "2027-05-02",
    "UBI_Latitud": 25.533035,
    "UBI_Longitud": -103.298279
  }
]
```

**Respuesta cuando no hay coincidencias** (404):

```json
{
  "error": "Estatus no encontrado",
  "estatus": "inexistente"
}
```
