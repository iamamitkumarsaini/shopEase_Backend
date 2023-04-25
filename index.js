const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./config/db");
const { userRoutes } = require("./Routes/userRoutes");



const app = express();

app.use(cors({
    origin:"*"
}));

app.use(express.json());

app.get("/", (req,res) => {
    res.status(200).send({"message":"Welcome to ShopEase.in"});
});


app.use("/user/", userRoutes)


app.listen(process.env.port, async(req,res) => {
    
    try {
        await connection;
        console.log("Connection to DB success");
    } 
    
    catch (err) {
        console.log("Connection to DB failed");
        console.log(err);
    }
})