const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    // reviewID: {
    //     type: Number,
    //     required: [true, "must provide review id"],
    //     unique: true,
    // },
    // bookID:{
    //     type: Number,
    //     required: [true, "must provide book id"],
    // },
    userName:{
        type: String,
        required: [true, "must provide user id"],
    },
    bookName: {
        type: String,
        required: [true, "must provide book name"],
    },
    review: {
        type: String,
        // required: [true, "must provide review"],
        default: "",
    },
    label: {
        type: String,
        // required: [true, "must provide label"],
        default: "",
    },
});

module.exports = mongoose.model("Review", ReviewSchema);
