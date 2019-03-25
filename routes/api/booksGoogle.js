const router = require("express").Router();
const booksGoogleController = require("../../controllers/booksGoogleController");

// Matches with "/api/booksGoogle"
// router
//   .route("/")
//   .get(booksGoogleController.findAll)
//   .post(booksGoogleController.create);

// Matches with "/api/booksGoogle/:bookName"
router.route("/:bookName").get(booksGoogleController.findByBookName);

module.exports = router;
