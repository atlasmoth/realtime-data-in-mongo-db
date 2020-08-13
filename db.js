const mongoose = require("mongoose");
module.exports = async () =>
  mongoose.connect(process.env.URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
