const express = require("express");
const app = express();
const fileUpload = require('express-fileupload')
const port = process.env.PORT || 4000;
var cors = require("cors");
const connectDb = require("./Db/db");
app.use(cors());
app.use(fileUpload({
  useTempFiles: true
}))
app.use(express.json());
app.use("/api/cars/", require("./Routes/carsRoutes"));
app.use("/booking/api/cars/", require("./Routes/carsRoutes"));
app.use("/editcar/api/cars/", require("./Routes/carsRoutes"));
app.use("/api/users/", require("./Routes/usersRoutes"));
app.use("/booking/api/bookings/", require("./Routes/bookingsRoute"));
app.use("/api/bookings/", require("./Routes/bookingsRoute"));


app.listen(port, () => {
  console.log(`Server is running at port: ${port} `);
});
