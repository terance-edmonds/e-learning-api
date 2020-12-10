
const express = require("express");
const bcrypt = require('bcrypt');
const {create, getUserExsist} = require('../../services/client.services');
const {sign} = require('jsonwebtoken');
const router = express.Router();
const Joi = require("joi");

const salt = bcrypt.genSaltSync(10);

const schema = Joi.object().keys(
    {
        email: Joi.string().email().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        school: Joi.string().required(),
        grade: Joi.number().integer().required(),
        birth_date: Joi.string().required(),
        year_of_advance_level: Joi.number().integer().required(),
        shy: Joi.string().required(), // advance level shy
        phone_number: Joi.string().max(10).required(), 
        home_address: Joi.string().required(), 
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
            const Exist = await userExists(req.body);
            if(Exist) {
                return res.status(200).json({
                    status: "success",
                    message: "User already exists"
                });
            };
            
            //hash the password
            req.body.password = bcrypt.hashSync(req.body.password, salt)
            
            const userCreated = await createUser(req.body);
            
            //send token for validation
            const token = sign({result: userCreated}, "asdasdasscvsuhsfkjsf54f1s21f0s3afasfasdfawer01", {
                expiresIn: "1h" //expires in 1 hour
            }); 
            
            return res.status(200).json({
                status: "success",
                message: "Create a new user successfully",
            })

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

//user exist
const userExists = (body) => {
    return new Promise((resolve) => {
      getUserExsist(body, (error, result) => {
          if (error) return resolve({
            status: "failed",
            message: "Internal server Error"
        })

          if (result && result[0]) {
            return resolve(true);
          }
          resolve(false);
        });
    });
};

//user creation
const createUser = (body) => {
    return new Promise((resolve) => {
        create(body, (err,results) =>{
            if(err){
                return resolve({
                    status: "failed",
                    message: "Internal server Error"
                })
            }
            resolve(results);
        });
    });
};

module.exports = router;