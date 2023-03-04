const mongoose = require("mongoose");

const eyePowerSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
    leftEye: {
        type: Number,
    },
    rightEye: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "frosthackUser",
    },
});

const eyePower = mongoose.model("frosthackUser", userSchema);

module.exports = eyePower;
