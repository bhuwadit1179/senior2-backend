const { firestore } = require("../firebase/config");

const editEmployeeController = async (req, res) => {
  const userId = req.params.id;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const address = req.body.address;
  const phone_number = req.body.phone_number;
  const email = req.body.email;
  const position = req.body.position;
  const zipcode = req.body.zipcode;
  const emergency_contract_name = req.body.emergency_contract_name;
  const emergency_contract_surname = req.body.emergency_contract_surname;
  const emergency_contract_telephone = req.body.emergency_contract_telephone;
  const emergency_contract_relation = req.body.emergency_contract_relation;
  const employeeid = req.body.employeeid;
  const is_admin = req.body.is_admin;
  const account_status = req.body.account_status;
  const profile_image_url = req.body.profile_image_url;

  const editEmployee = await firestore
    .collection("Employee")
    .doc(userId)
    .set({
      first_name: first_name,
      last_name: last_name,
      address: address,
      phone_number: phone_number,
      email: email,
      position: position,
      zipcode: zipcode,
      emergency_contract_name: emergency_contract_name,
      emergency_contract_surname: emergency_contract_surname,
      emergency_contract_relation: emergency_contract_relation,
      emergency_contract_telephone: emergency_contract_telephone,
      employeeid: employeeid,
      is_admin: is_admin,
      faceAdded: false,
      account_status: account_status,
      id: userId,
      profile_image_url: profile_image_url ?? null,
    });
  return res.status(200).json({});
};

module.exports = { editEmployeeController };
