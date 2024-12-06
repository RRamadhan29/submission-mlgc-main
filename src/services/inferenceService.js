const tf = require("@tensorflow/tfjs-node");
const InputError = require("../exceptions/InputError");

async function predictClassification(model, image) {
  try {
    // Preprocess image
    const tensor = tf.node
      .decodeImage(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    // Predict using the model
    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    console.log("score: ", score);
    console.log("confidenceScore: ", confidenceScore);

    // Determine label and suggestion
    const label = confidenceScore > 50 ? "Cancer" : "Non-cancer";
    const suggestion =
      label === "Cancer"
        ? "Segera periksa ke dokter!"
        : "Penyakit kanker tidak terdeteksi.";

    return { label, confidenceScore, suggestion };
  } catch (error) {
    throw new InputError("Terjadi kesalahan dalam melakukan prediksi");
  }
}

module.exports = predictClassification;
