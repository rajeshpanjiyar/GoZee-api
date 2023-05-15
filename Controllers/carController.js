const Car = require("../Models/carModel");
const cloudinary = require("cloudinary").v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.COULD_API_KEY,
  api_secret: process.env.COULD_API_SECRET_KEY,
});

exports.getAllcars = async (req, res) => {
  try {
    const user = req.body.user;
    if (user.admin) {
      const cars = await Car.find({ owner: user._id });
      res.send(cars);
    } else {
      const cars = await Car.find();
      res.send(cars);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.getAllCarsInSearch = async (req, res) => {
  try {
    const cars = await Car.find();
    res.send(cars);
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.addCar = async (req, res) => {
  try {
    const newcar = new Car(req.body);
    newcar.save();
    res.send("Car added successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

exports.addCarphoto = async (req, res) => {
  try {
    const file = await req.files?.image;
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

exports.editCar = async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.body._id });
    car.name = req.body.name;
    car.image = req.body.image;
    car.fuelType = req.body.fuelType;
    car.rentPerHour = req.body.rentPerHour;
    car.capacity = req.body.capacity;
    car.carType = req.body.carType;

    await car.save();

    res.send("Car details updated successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
};
exports.deleteCar = async (req, res) => {
  try {
    await Car.findByIdAndRemove({ _id: req.body.carid });

    res.send("Car deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
};
