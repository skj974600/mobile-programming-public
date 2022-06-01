const Review = require("../models/Review");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllReviews = asyncWrapper(async (req, res) => {
    const userName = req.body.userName;
    const reviews = await Review.find({});
    res.status(200).json({ reviews });
});

const createReview = asyncWrapper(async (req, res, next) => {
    const userName = req.body.userName;
    const bookName = req.body.bookName;
    const checkReview = await Review.findOne({ userName, bookName });
    if (checkReview) {
        return next(createCustomError(`review already exist : ${bookName}`, 404));
    }

    const review = await Review.create(req.body);
    res.status(201).json({ review });
});

const getMyReviews = asyncWrapper(async (req, res, next) => {
    const { username: userName } = req.params;
    const review = await Review.find({ userName });

    if (!review) {
        return next(createCustomError(`No review with user name : ${userName}`, 404));
    }

    res.status(200).json({ review });
});

const getReview = asyncWrapper(async (req, res, next) => {
    const { id: _id } = req.params;
    const review = await Review.findOne({ _id });

    if (!review) {
        return next(createCustomError(`No review with id : ${_id}`, 404));
    }

    res.status(200).json({ review });
});

const updateReview = asyncWrapper(async (req, res, next) => {
    const { id: _id } = req.params;

    const review = await Review.findOneAndUpdate({ _id }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!review) {
        return next(createCustomError(`No review with id : ${_id}`, 404));
    }
    res.status(200).json({ review });
});

const deleteReview = asyncWrapper(async (req, res) => {
    const { id: _id } = req.params;
    const review = await Review.findOneAndDelete({ _id });
    if (!review) {
        return next(createCustomError(`No review with id : ${_id}`, 404));
    }
    res.status(200).json({ review: null, status: "success" });
});

module.exports = {
    getAllReviews,
    createReview,
    getMyReviews,
    getReview,
    updateReview,
    deleteReview,
};
