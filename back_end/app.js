const express = require("express");
const cors = require('cors');
const app = express();

const reviews = require("./routes/reviews");
const books = require("./routes/books")

const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
require("dotenv").config();

// app.use(cors())
app.use(express.json());

app.use("/api/books", books);
app.use("/api/reviews", reviews);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();
