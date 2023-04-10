const express = require("express");
const router = express.Router();
const bookingController = require("../Controllers/bookingController");
router.post("/bookcar", bookingController.bookCar);
router.post("/getallbookings", bookingController.getAllBookings);
router.post("/markaspaid", bookingController.markAsPaid);
module.exports = router;
