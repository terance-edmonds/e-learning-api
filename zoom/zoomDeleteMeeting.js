const request = require('request');
const jwt = require('jsonwebtoken');
const {delete_meeting, deletePvtScheduleMeeting} = require('../services/host.services');
const Joi = require('joi')
require('dotenv').config();

//Use the ApiKey and APISecret from config.js
const payload = {
    iss: process.env.jwt_key,
    exp: ((new Date()).getTime() + 5000)
};

const schema = Joi.object().keys(
    {
        meeting_id: Joi.required()
    });

const token = jwt.sign(payload, process.env.jwt_secret_key);

module.exports = {
    deleteMeeting: ("/", async (req, res)=>{
        var meeting_id = req.body.meeting_id;

        //validate request data
        const validation_result = Joi.validate(req.body, schema);
        if (validation_result.error) {
            var error_message = validation_result.error.details[0].message.replace(/"/g, '');
            return res.status(400).json({
                message: error_message
            })
        }

        var options = {
            method: 'DELETE',
            url: 'https://api.zoom.us/v2/meetings/'+meeting_id,
            headers: {
              authorization: 'Bearer '+ token
            }
          };
          
        request(options, async function (error, response, body) {
            if (error) {
                console.log("error: ",error);
                return res.status(500).json({
                    status: "failed",
                    message: "Internal Server Error"
                }) 
            }

            if (response.statusCode == 404){
                return res.status(404).json({
                    status: "failed",
                    message: "Meeting does not exist"
                })
            }else{

                deletePvtScheduleMeeting(','+req.body.meeting_id, (error, responce)=>{
                    if(error){
                        console.log("error: ",error);
                        return res.status(500).json({
                            status: "failed",
                            message: "Internal Server Error, could not delete details from the database"
                        }) 
                    }
                    else{
                        console.log("meeting cancelled")
                        console.log({
                            status: "success",
                            message: "private meeting has been cancelled"
                        })
                    }
                })

                delete_meeting(req.body, async (error, responce)=>{
                    if(error){
                        console.log("error: ",error);
                        return res.status(500).json({
                            status: "failed",
                            message: "Internal Server Error, could not delete details from the database"
                        }) 
                    }
                    else{
                        console.log("meeting cancelled")
                        return res.status(200).json({
                            status: "success",
                            message: "meeting has been cancelled"
                        })
                    }
                  });
                }
          });
    })
};