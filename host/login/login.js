
const express = require("express");
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken')
const {getUserbyemail} = require('../../services/host.services')
const Joi = require("joi");

const router = express.Router();

const schema = Joi.object().keys(
    {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
);

router.post(
    "/", async (req, res) => {
        try {
            //validate request data
            const validation_result = Joi.validate(req.body, schema);
            if (validation_result.error) {
                var error_message = validation_result.error.details[0].message.replace(/"/g, '');
                return res.status(400).json({
                    message: error_message
                })
            }

            //check againt exsisting users
            const Valid = await userValid(req.body);
            if(Valid) {
                return res.status(200).json({
                    success: Valid.status,
                    message: Valid.message
                });
            };
        
            
        }
        catch (error) {
            console.log("error: ",error);
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error"
            }) 
        }

    }
);

//user Validation
const userValid = (body) => {
    return new Promise((resolve) => {
      getUserbyemail(body, (error, results) => {
        if(error){
            console.log(error)
        }
        if(!results){
            return resolve({
                status: "failed",
                message: "Invalid email or password"
            })
        }

        const result = bcrypt.compareSync(body.password, results.password);
        if(result){
            //results.password = undefined;
            //send token for validation
            const token = sign({result: results}, "asdasdasscvsuhsfkjsf54f1s21f0s3afasfasdfawer01", {
                expiresIn: "1h" //expires in 1 hour
            })
            return resolve({
                status: "success",
                message: "Login Successful",
            })
        }else{
            return resolve({
                status: "failed",
                message: "Invalid email or password"
            })
        }

        });
    });
};

module.exports = router;