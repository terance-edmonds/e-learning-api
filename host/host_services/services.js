const express = require('express');
const router = express.Router();
const {getMeetings} = require('../../services/host.services');
const Joi = require('joi');

router.post(
    "/", (req, res) =>{
        getMeetings( (error, result)=>{
            if(error) {
                console.log("error: ",error);
                return res.status(500).json({
                    status: "failed",
                    message: "Internal Server Error"
                }) 
            }else{
                console.log('Data retrived successfully')
                return res.status(200).json({
                    status: "success",
                    message: result
                })
            }
        })
    }
);


module.exports = router;