const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const request = require('request');
require('dotenv').config()
const Joi = require("joi");
const {create_user} = require('../../services/host.services')
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);

//Use the ApiKey and APISecret from config.js
const payload = {
    iss: process.env.jwt_key,
    exp: ((new Date()).getTime() + 5000)
};

const AouthZoomToken = jwt.sign(payload, process.env.jwt_secret_key);

const schema = Joi.object().keys(
    {
        email: Joi.string().email().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        password: Joi.string().required()
    }
);


router.post(
    "/", (req ,res) =>{

    var email = req.body.email;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;

    //validate request data
    const validation_result = Joi.validate(req.body, schema);
    if (validation_result.error) {
        var error_message = validation_result.error.details[0].message.replace(/"/g, '');
        return res.status(400).json({
            message: error_message
        })
    }


    var options = {
        method: 'POST',
        url: 'https://api.zoom.us/v2/users',
        headers: {
            'content-type': 'application/json',
            authorization: 'Bearer '+ AouthZoomToken
        },
        body: {
            action: 'create',
            user_info: {
                email: email,
                type: 1,
                first_name: first_name,
                last_name: last_name
            }
        },
        json: true
    };
    //hash the password
    req.body.password = bcrypt.hashSync(req.body.password, salt);

    //send token for validation
    const token = jwt.sign({result: req.body}, "asdasdasscvsuhsfkjsf54f1s21f0s3afasfasdfawer01", {
        expiresIn: "1h" //expires in 1 hour
    })


    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        create_user(req.body, (error, result) =>{
            if(error){
                console.log("error: ", error);
                return res.status(500).json({
                    status: "failed",
                    message: "Internal Server Error, could not include details to the database"
                });
            }else{
                console.log("User created successfully")
                return res.status(200).json({
                    status: "success",
                    message: "check your email to activate the user account"
                });
            }
        })
    });

})


module.exports = router;