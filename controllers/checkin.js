const { firestore } = require("../firebase/config");

const getCheckInController = async (req, res) => {
  const doc = await firestore.collection("CheckIns").get();
  let result = [];
  result = doc.docs.map((item) => {
    return item.data();
  });
  return res.status(200).json(result);
};

module.exports = { getCheckInController };
