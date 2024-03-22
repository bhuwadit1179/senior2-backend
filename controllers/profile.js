const { firestore } = require("../firebase/config");

const getProfileController = async (req, res) => {
  const employee = firestore.collection("Employee").doc(req.data.user_id);
  const doc = await employee.get();

  if (!doc.exists) {
    return res.status(404).json({
      status_code: 404,
      message: "User Not Found",
    });
  }
  return res.status(200).json(doc.data());
};

module.exports = { getProfileController };
