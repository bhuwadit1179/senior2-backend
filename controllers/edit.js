const { firestore } = require("../firebase/config");

const editEmployeeController = async (req, res) => {
  try {
    const userId = req.params.id;
    const employeeRef = firestore.collection("Employee").doc(userId);
    const employeeDoc = await employeeRef.get();

    if (!employeeDoc.exists) {
      return res
        .status(404)
        .json({ status_code: 404, message: "Employee not found" });
    }

    const employeeData = employeeDoc.data();

    const updatedData = {
      first_name: req.body.first_name || employeeData.first_name,
      last_name: req.body.last_name || employeeData.last_name,
      address: req.body.address || employeeData.address,
      phone_number: req.body.phone_number || employeeData.phone_number,
      email: req.body.email || employeeData.email,
      position: req.body.position || employeeData.position,
      zipcode: req.body.zipcode || employeeData.zipcode,
      emergency_contract_name:
        req.body.emergency_contract_name ||
        employeeData.emergency_contract_name,
      emergency_contract_surname:
        req.body.emergency_contract_surname ||
        employeeData.emergency_contract_surname,
      emergency_contract_relation:
        req.body.emergency_contract_relation ||
        employeeData.emergency_contract_relation,
      emergency_contract_telephone:
        req.body.emergency_contract_telephone ||
        employeeData.emergency_contract_telephone,
      employeeid: req.body.employeeid || employeeData.employeeid,
      is_admin:
        req.body.is_admin !== undefined
          ? req.body.is_admin
          : employeeData.is_admin,
      account_status: req.body.account_status || employeeData.account_status,
      id: userId,
      profile_image_url:
        req.body.profile_image_url || employeeData.profile_image_url,
      faceAdded: employeeData.faceAdded, // Include existing faceAdded value
      config_id: employeeData.config_id,
    };

    await employeeRef.set(updatedData);

    return res
      .status(200)
      .json({ status_code: 200, message: "Employee updated successfully" });
  } catch (error) {
    console.error("Error updating employee:", error);
    return res
      .status(500)
      .json({ status_code: 500, message: "Internal Server Error" });
  }
};

module.exports = { editEmployeeController };
