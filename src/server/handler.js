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
    console.log("Message:", message);  // Log message untuk debugging

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

async function predictHistories(request, h) {
  try {
    const db = new Firestore({ projectId: "submissionmlgc-ramadhan-443814" });

    // Fetch prediction histories from Firestore
    const predictCollection = db.collection("predictions");
    const snapshot = await predictCollection.get();

    const result = [];
    snapshot.forEach((doc) => {
      result.push({
        id: doc.id,
        history: {
          id: doc.data().id,
          result: doc.data().result,
          suggestion: doc.data().suggestion,
          createdAt: doc.data().createdAt,
        },
      });
    });

    return h.response({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return h.response({
      status: "error",
      message: "Gagal mengambil riwayat prediksi.",
    }).code(500);
  }
}

module.exports = { postPredictHandler, predictHistories };
