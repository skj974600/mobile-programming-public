const mongoose = require("mongoose");

// const connectionString =
//     "mongodb+srv://tting:auddlswl12@nodeprojects.xwoen.mongodb.net/SmartCity?retryWrites=true&w=majority";

const connectDB = (url) => {
    return mongoose.connect(url);
};

// mongoose
//     .connect(connectionString)
//     .then(() => console.log("connected to the db..."))
//     .catch((err) => console.log(err));

module.exports = connectDB;
