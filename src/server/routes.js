const { postPredictHandler, predictHistories } = require("../server/handler");

const routes = [
  {
    path: "/predict",
    method: "POST",
    handler: postPredictHandler,
    options: {
      payload: {
        maxBytes: 1000000, // Batas ukuran file
        allow: "multipart/form-data",
        multipart: true,
      },
    },
  },
  {
    path: "/predict/histories",
    method: "GET",
    handler: predictHistories, // Pastikan handler terhubung
  },
];

module.exports = routes;
