const { storage } = require("../firebase/config");
const bucket = storage.bucket();

const uploadImage = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const blob = bucket.file(`demo/${file.originalname}`); // Specify the path to the "demo" folder
  const blobStream = blob.createWriteStream();

  blobStream.on("error", (error) => {
    console.error(error);
    res.status(500).json({ message: "Failed to upload file" });
  });

  blobStream.on("finish", async () => {
    // Get the URL of the uploaded file with 30-year expiration
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 30);
    const url = await blob.getSignedUrl({
      action: "read",
      expires: expirationDate,
    });

    const fileObject = {
      fileName: file.originalname,
      fileUrl: url[0], // Since getSignedUrl returns an array of URLs, use the first URL
    };

    res
      .status(200)
      .json({ message: "File uploaded successfully", file: fileObject });
  });

  blobStream.end(file.buffer);
};

module.exports = { uploadImage };
