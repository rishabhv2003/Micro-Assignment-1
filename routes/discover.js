const express = require('express');
const category = require('../../cgip-micro-1-main/models/category');
const router = express.Router();
const imgGallery = require("../models/imgGallery");

router.get("/get-images/:category", async (req, res, next) => {
	/* route to get 4 categories of images */
	const reqCategory = req.params.category;
	const getImages = await imgGallery.find({ category: { $in: [reqCategory] } }).select({ name: 1, _id: 0 }).sort({ createdAt: 0 }).limit(4);
	res.json(getImages);
	/* sending json file of the requested categories */
});

router.get("/get-images", async (req, res, next) => {
	/* getting images based on filter */
	const imgFilter = req.query.filter;
	const getImages = await imgGallery.find({ $or: [{ name: { $in: imgFilter } }, { category: { $in: imgFilter } }] });
	res.json(getImages);
	/* sending json file of the requested category */
});


module.exports = router;