const { firestore } = require("../firebase/config");

const getUsersController = async (req, res) => {
  const doc = await firestore.collection("Employee").get();
  let result = [];
  result = doc.docs.map((item) => {
    return item.data();
  });
  return res.status(200).json(result);
};

const getUsersByIdController = async (req, res) => {
  const user = firestore.collection("Employee").doc(req.params.id);
  const snapshot = await user.get();

  if (!snapshot.exists) {
    return res.status(404).json({
      status_code: 404,
      message: "User Not Found",
    });
  }
  return res.status(200).json(snapshot.data());
};

module.exports = { getUsersController, getUsersByIdController };

// Admin
