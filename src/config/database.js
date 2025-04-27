const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namastedev:7byvsv1MDkVNgTcG@namastenode.msdevu7.mongodb.net/devTinder"
  );
};

module.exports = connectDB;