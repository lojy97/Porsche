require('dotenv').config();

const express = require("express");
const cookieParser=require('cookie-parser')
const app = express();
const mongoose = require("mongoose");
const productRouter = require("./routes/productRouter");
const customerRouter = require("./routes/customerRouter");
const authRouter = require("./routes/authRouter");
const adminRouter = require("./routes/adminRouter");
const cartRouter = require("./routes/cartRouter");
const orderRouter = require("./routes/orderRouter");


//const authenticationMiddleware = require("./middleware/authentication");
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser())

app.use(
  cors({
  //  origin: process.env.ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);


//public route
app.use("/api/v1", authRouter);

//require authentication
 //app.use(authenticationMiddleware);
//app.use("/api/v1/product", productRouter);
app.use("/api/v1/customer", customerRouter);
//app.use("/api/v1/admin", adminRouter);
//app.use("/api/v1/cart", cartRouter);
//app.use("/api/v1/order", orderRouter);

const db_name = process.env.DB_NAME;

const db_url = `${process.env.DB_URL}/${db_name}`;

// ! Mongoose Driver Connection

const connectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose
  .connect(db_url, connectionOptions)
  .then(() => console.log("mongoDB connected"))
  .catch((e) => {
    console.log(e);
  });

app.use(function (req, res, next) {
  return res.status(404).send("404");
});
app.listen(process.env.PORT, () => console.log("server started"));