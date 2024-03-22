const { firestore } = require("../firebase/config");

const updateConfigController = async (req, res) => {
  try {
    const employees = req.body; // Array of objects containing employeeId and config_id pairs

    // Update config_id for each employee
    const updatePromises = employees.map(async (employee) => {
      const { id, config_id } = employee;
      await firestore.collection("Employee").doc(id).update({ config_id });
    });

    // Wait for all updates to complete
    await Promise.all(updatePromises);

    res.status(200).json({
      success: true,
      message: "Config IDs updated successfully for the employees.",
    });
  } catch (error) {
    console.error("Error updating config IDs:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports = { updateConfigController };
