const { firestore } = require("../firebase/config");

const searchEmployeeData = async (req, res) => {
  try {
    const searchQuery = req.query.search;

    // Search by first name
    const employeeSnapshotFirstName = await firestore
      .collection("Employee")
      .where("first_name", ">=", searchQuery)
      .where("first_name", "<=", searchQuery + "\uf8ff")
      .get();

    // Search by last name
    const employeeSnapshotLastName = await firestore
      .collection("Employee")
      .where("last_name", ">=", searchQuery)
      .where("last_name", "<=", searchQuery + "\uf8ff")
      .get();

    // Search by employee ID
    const employeeSnapshotEmployeeId = await firestore
      .collection("Employee")
      .where("employeeid", "==", searchQuery)
      .get();

    // Combine all search results into a single array
    const searchResults = [];

    // Push search results into the array if there are any
    if (!employeeSnapshotFirstName.empty) {
      employeeSnapshotFirstName.docs.forEach((doc) => {
        searchResults.push(doc.data());
      });
    }
    if (!employeeSnapshotLastName.empty) {
      employeeSnapshotLastName.docs.forEach((doc) => {
        searchResults.push(doc.data());
      });
    }
    if (!employeeSnapshotEmployeeId.empty) {
      employeeSnapshotEmployeeId.docs.forEach((doc) => {
        searchResults.push(doc.data());
      });
    }

    // Send only the array of search results in the response
    res.status(200).json(searchResults);
  } catch (error) {
    console.error("Error searching employee data:", error);
    res
      .status(500)
      .send("An error occurred while searching for employee data.");
  }
};

module.exports = { searchEmployeeData };
