const { Firestore } = require("@google-cloud/firestore");

async function storeData(id, data) {
  const db = new Firestore();

  const predictCollection = db.collection("predictions");
  return predictCollection.doc(id).set(data);

// // Path to the service account key file
// const pathKey = path.resolve("./submissionmlgc-ramadhan-443814-38fb970fdbee.json");

// async function storeData(id, data) {
//   try {
//     // Initialize Firestore client
//     const db = new Firestore({
//       projectId: "submissionmlgc-ramadhan",
//       keyFilename: pathKey,
//     });

//     // Reference to the 'predictions' collection
//     const predictCollection = db.collection("predictions");

//     // Store data
//     await predictCollection.doc(id).set(data);
//     console.log(`Data successfully stored with ID: ${id}`);
//     return { success: true, id };
//   } catch (error) {
//     console.error("Error storing data:", error);
//     throw new Error("Failed to store data in Firestore.");
//   }
}

module.exports = storeData;
