const jwt = require("jsonwebtoken");
require("dotenv").config();


const authentication = (req,res,next) => {

    const token = req.headers.authentication?.split(" ")[1];

    if(token){
        const decoded = jwt.verify(token, process.env.secret_key, (err,decoded) => {
            if(decoded){
                console.log("decoded", decoded);
                next()
            }

            else{
                res.status(403).send({"message":"Please login first"});
            }
        })
    }

    else{
        res.status(403).send({"message":"Please login first"});
    }
}

module.exports = { authentication };