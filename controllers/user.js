const { firestore } = require("../firebase/config");

const getUsersController = async (req, res) => {
  const searchQuery = req.query.search;
  if (!searchQuery) {
    const doc = await firestore.collection("Employee").get();
    let result = [];
    result = doc.docs.map((item) => {
      return item.data();
    });
    return res.status(200).json(result);
  }
  try {
    const searchQuery = req.query.search;

    // Search for employees based on the provided query for first name
    const employeeSnapshotFirstName = await firestore
      .collection("Employee")
      .where("first_name", ">=", searchQuery)
      .where("first_name", "<=", searchQuery + "\uf8ff")
      .get();

    // Search for employees based on the provided query for last name
    const employeeSnapshotLastName = await firestore
      .collection("Employee")
      .where("last_name", ">=", searchQuery)
      .where("last_name", "<=", searchQuery + "\uf8ff")
      .get();

    // Search for employees based on the provided query for employee ID
    const employeeSnapshotEmployeeId = await firestore
      .collection("Employee")
      .where("employeeid", "==", searchQuery)
      .get();

    const searchResults = [];

    // Function to get check-in data for an employee
    const getCheckInData = async (employeeId) => {
      const checkInSnapshot = await firestore
        .collection("CheckIns")
        .where("uid", "==", employeeId)
        .get();

      return checkInSnapshot.docs.map((doc) => doc.data());
    };

    // Combine search results from different queries
    const processEmployeeSnapshot = async (snapshot) => {
      for (const employeeDoc of snapshot.docs) {
        const employeeData = employeeDoc.data();
        const employeeId = employeeDoc.id;

        // Get check-in data for the employee
        const checkInData = await getCheckInData(employeeId);

        // Merge employee data with check-in data
        checkInData.forEach((checkIn) => {
          searchResults.push({
            first_name: employeeData.first_name,
            last_name: employeeData.last_name,
            position: employeeData.position,
            employeeid: employeeData.employeeid,
            checkedIn: checkIn.checkedIn,
            checkedOut: checkIn.checkedOut,
            date: checkIn.date,
          });
        });
      }
    };

    // Process each snapshot
    await processEmployeeSnapshot(employeeSnapshotFirstName);
    await processEmployeeSnapshot(employeeSnapshotLastName);
    await processEmployeeSnapshot(employeeSnapshotEmployeeId);
    return res.status(200).json(searchResults);
  } catch (error) {
    console.error("Error searching employees:", error);
    return res.status(500).json({
      status_code: 500,
      message: "Internal Server Error",
    });
  }
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

module.exports = {
  getUsersController,
  getUsersByIdController,
};

// Admin
