const Booking = require("../Models/bookingModel");
const Car = require("../Models/carModel");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const stripe = require("stripe")(
  process.env.STRIPE_SECRET_KEY
);

exports.bookCar = async (req, res) => {
  const { token } = req.body;
  const onsitePay = req.body.onsitePay;

  try {
    if(onsitePay === true){ 
      req.body.transactionId = null;
      req.body.paid = false;
      const newbooking = new Booking(req.body);
      await newbooking.save();
      const car = await Car.findOne({ _id: req.body.car });
      car.bookedTimeSlots.push(req.body.bookedTimeSlots);

      await car.save();
      res.send("Your booking is successfull");
    }else{ 
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: req.body.totalAmount,
        currency: process.env.CURRENCY,
        customer: customer.id,
        receipt_email: token.email,
        description: "A Vehicle rental automation software services.",
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      req.body.transactionId = payment.source.id;
      req.body.paid = true;
      const newbooking = new Booking(req.body);
      await newbooking.save();
      const car = await Car.findOne({ _id: req.body.car });
      car.bookedTimeSlots.push(req.body.bookedTimeSlots);

      await car.save();
      res.send("Your booking is successfull");
    } else {
      return res.status(400).json(error);
    }
  }
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.getAllBookings = async (req, res) => {
  
  try {
    const user = await req.body.user;
    const bookings = await Booking.find().populate("car").populate("user");
    const result = [];
    if(user.admin == true){
      for(let i = 0; i < bookings.length; i++){
        if(bookings[i]?.car?.owner == user._id){
          result.push(bookings[i]);
        }
      }
    }else{
      for(let i = 0; i < bookings.length; i++){
        if(bookings[i]?.user?._id == user._id){
          result.push(bookings[i]);
        }
      }
    }
    res.send(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};


exports.markAsPaid = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.body.id });
    booking.paid = true;
    await booking.save();
    res.send("Marked as paid successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
};
