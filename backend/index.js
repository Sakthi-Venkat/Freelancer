const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const cookieParser = require("cookie-parser");

const user = require("./Routes/AuthRoutes");



const app = express();
app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));

app.use("/auth", user );

mongoose.connect("")
.then(() =>{
    console.log("Connected to MongoDB");
} )
.catch((err) =>{
    console.log(err);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});