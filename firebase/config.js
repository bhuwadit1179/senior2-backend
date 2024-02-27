const { initializeApp } = require("firebase-admin/app");

var admin = require("firebase-admin");
var serviceAccount = require("./config.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://senior2-2e798-default-rtdb.asia-southeast1.firebasedatabase.app",
});
const firestore = admin.firestore();
const auth = admin.auth();

module.exports = { admin, firestore, auth };
