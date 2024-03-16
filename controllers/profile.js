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
  return res.status(200).json({
    user_id: req.data.user_id,
    first_name: doc.data().first_name,
    last_name: doc.data().last_name,
    position: doc.data().position,
    is_admin: doc.data().is_admin,
  });
};

module.exports = { getProfileController };
