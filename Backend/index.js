const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require('./Routes/AuthRouter')
const ProductRouter = require('./Routes/ProductRouter')
const TrainRouter = require('./Routes/TrainRouter')
const BookingRouter = require('./Routes/BookingRouter')
require("dotenv").config();
require("./Models/db");
const port = process.env.PORT || 3000;

app.get("/ping", (req, res) => {
  res.send("Hello, world!");
});

app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth',AuthRouter)
app.use('/api/trains', TrainRouter);
app.use('/api/bookings', BookingRouter);



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
