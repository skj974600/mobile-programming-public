const express = require("express");
const router = express.Router();

const {
    getRecommendedBooks,
} = require("../controllers/books");

router.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});


router.route("/user/:username").get(getRecommendedBooks);

module.exports = router;
