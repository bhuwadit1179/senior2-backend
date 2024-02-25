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

// const auth = require("firebase/auth");

// const firebaseConfig = {
//   apiKey: "AIzaSyCAP8DRvSdpG7B0D0Y2PXOONlhtDo1JxZQ",
//   authDomain: "senior2-2e798.firebaseapp.com",
//   databaseURL:
//     "https://senior2-2e798-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "senior2-2e798",
//   storageBucket: "senior2-2e798.appspot.com",
//   messagingSenderId: "675717960941",
//   appId: "1:675717960941:web:45187efb193bae074b68e4",
//   measurementId: "G-BTXE84PLJ8",
// };

// const fb = initializeApp();
// const firebaseAuth = auth.getAuth();

module.exports = { admin, firestore, auth };
