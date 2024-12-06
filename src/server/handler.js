const predictClassification = require("../services/inferenceService");
const crypto = require("crypto");
const storeData = require("../services/storeData");

async function postPredictHandler(request, h) {
  try {
    const { image } = request.payload;
    const { model } = request.server.app;

    // Call the inference service
    const { confidenceScore, label, suggestion } = await predictClassification(
      model,
      image
    );

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    // Build data object
    const data = {
      id,
      result: label,
      confidenceScore,
      suggestion,
      createdAt,
    };

    // Store data in Firestore
    await storeData(id, data);

    const message = "Model is predicted successfully";

    // Build and return the response
    return h.response({
      status: "success",
      message,
      data,
    }).code(201);
  } catch (error) {
    console.error(error);
    return h.response({
      status: "fail",
      message: "Terjadi kesalahan dalam melakukan prediksi",
    }).code(400);
  }
}

module.exports = { postPredictHandler };
