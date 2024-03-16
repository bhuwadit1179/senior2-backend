const { initializeApp } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");
// const { getFirestore } = require("firebase-admin/firestore");
var admin = require("firebase-admin");
var serviceAccount = require("./config.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://senior2-2e798-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "gs://senior2-2e798.appspot.com",
});
// const getfirestore = getFirestore(admin);
const firestore = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

module.exports = { admin, firestore, auth, storage };
