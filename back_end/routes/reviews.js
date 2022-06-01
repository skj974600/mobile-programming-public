const express = require("express");
const router = express.Router();

const {
    getAllReviews,
    createReview,
    getMyReviews,
    getReview,
    updateReview,
    deleteReview,
} = require("../controllers/reviews");

router.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
  });


router.route("/").get(getAllReviews).post(createReview);
router.route("/user/:username").get(getMyReviews)
router.route("/id/:id").get(getReview).patch(updateReview).delete(deleteReview);

module.exports = router;