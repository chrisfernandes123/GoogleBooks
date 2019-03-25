const router = require("express").Router();
const bookRoutes = require("./books");
const bookGoogleRoutes = require("./booksGoogle");

// Book routes
router.use("/books", bookRoutes);
router.use("/booksGoogle", bookGoogleRoutes);

module.exports = router;
