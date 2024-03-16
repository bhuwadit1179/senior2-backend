const { auth, firestore } = require("../firebase/config");

const getRegisterContoller = async (req, res) => {
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
  if (
    !employeeid ||
    !first_name ||
    !last_name ||
    !address ||
    !phone_number ||
    !email ||
    !position ||
    !zipcode ||
    !emergency_contract_name ||
    !emergency_contract_surname ||
    !emergency_contract_telephone ||
    !emergency_contract_relation ||
    !account_status
  ) {
    res.status(400).json({
      status_code: 400,
      message: "Bad request",
    });
  }
  try {
    const create_account = await auth.createUser({
      email: email,
      emailVerified: false,
      password: `${first_name}1234`,
    });

    if (!create_account.uid) {
      return res.status(500).json({
        status_code: 500,
        message: "Internal Server Error",
      });
    }

    const createDoc = await firestore
      .collection("Employee")
      .doc(create_account.uid)
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
        id: create_account.uid,
        account_status: account_status,
        profile_image_url: profile_image_url ?? null,
      });
    return res.status(201).json({
      status_code: 201,
      message: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status_code: 500,
      message: error.message,
    });
  }
};

module.exports = { getRegisterContoller };
