const { firestore } = require("../firebase/config");

const getCheckInController = async (req, res) => {
  const doc = await firestore.collection("CheckIns").get();
  let result = [];
  result = doc.docs.map((item) => {
    return item.data();
  });
  return res.status(200).json(result);
};

const getCheckInByUserIdController = async (req, res) => {
  const uid = req.params.uid;
  console.log(uid);
  // Check if uid is missing or undefined
  if (!uid) {
    return res.status(400).json({ error: "Missing UID parameter" });
  }

  try {
    const snapshot = await firestore
      .collection("CheckIns")
      .where("uid", "==", uid)
      .get();

    const checkIns = [];
    snapshot.forEach((doc) => {
      checkIns.push(doc.data());
    });

    // Send response with check-ins data
    res.json(checkIns);
  } catch (error) {
    console.error("Error fetching check-ins:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getCheckInController, getCheckInByUserIdController };
