const express = require("express");
const router = express.Router();
const carController = require("../Controllers/carController");
router.get("/getallcarsinsearch", carController.getAllCarsInSearch);
router.post("/getallcars", carController.getAllcars);
router.post("/addcar", carController.addCar);
router.put("/editcar", carController.editCar);
router.post("/deletecar", carController.deleteCar);
module.exports = router;
