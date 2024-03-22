const { firestore } = require("../firebase/config");

const editSettingController = async (req, res) => {
  const endDay = req.body.endDay;
  const endWork = req.body.endWork;
  const startDay = req.body.startDay;
  const startWork = req.body.startWork;

  const createDoc = await firestore
    .collection("Config")
    .add({
      endDay: endDay,
      endWork: endWork,
      startDay: startDay,
      startWork: startWork,
    })
    .then((docRef) => {
      const id = docRef.id;
      return docRef.update({ id });
    })
    .then(() => {
      res.status(201).json({ message: "Data added successfully" });
    });
};

const mergeEmployeedata = async (req, res) => {};
module.exports = { editSettingController };
