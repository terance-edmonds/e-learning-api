const jwt = require('jsonwebtoken');
const request = require('request');
require('dotenv').config()
const {update_meeting, createStudentPrivateClass, updateStudentPrivateClass, getUserExist, deletePvtScheduleMeeting} = require('../services/host.services')
const Joi = require("joi");

//Use the ApiKey and APISecret from config.js
const payload = {
    iss: process.env.jwt_key,
    exp: ((new Date()).getTime() + 5000)
};

const token = jwt.sign(payload, process.env.jwt_secret_key);

const schema = Joi.object().keys(
    {
        host_name: Joi.string().required(),
        meeting_id: Joi.string().required(),
        topic: Joi.string().required(),
        meeting_date: Joi.string().required(),
        start_time: Joi.string().required(),
        duration_hours: Joi.number().integer().required(),
        duration_minutes: Joi.number().integer().required(),
        password: Joi.string().max(10).required(),
        meeting_description: Joi.string(),
        meeting_fee: Joi.string().required(),
        meeting_type: Joi.string().required()
    }
);

const schemapvt = Joi.object().keys(
    {
        host_name: Joi.string().required(),
        meeting_id: Joi.string().required(),
        topic: Joi.string().required(),
        meeting_date: Joi.string().required(),
        start_time: Joi.string().required(),
        duration_hours: Joi.number().integer().required(),
        duration_minutes: Joi.number().integer().required(),
        password: Joi.string().max(10).required(),
        meeting_description: Joi.string(),
        meeting_fee: Joi.string().required(),
        meeting_type: Joi.string().required(),
        student_ids: Joi.string().required()
    }
);

//create a zoom meeting
module.exports = {
    updateMassClassMeeting:("/massClass", (req ,res) =>{

        var meeting_host_name = req.body.host_name; // type string 
        var meeting_id = req.body.meeting_id;               // type string 
        var topic = req.body.topic;                         // type string
        var meeting_date = req.body.meeting_date;           // format => 2020-08-09
        var start_time = req.body.start_time;               // 24h format => 20:00:00
        var duration_hours = req.body.duration_hours;       // type int  
        var duration_minutes = req.body.duration_minutes;   // type int
        var password = req.body.password;                   // type string
        var meeting_description = req.body.meeting_description;       // type string
        var meeting_fee = req.body.meeting_fee;             // type string
        var meeting_type = req.body.meeting_type;             // type string

        //validate request data
        const validation_result = Joi.validate(req.body, schema);
        if (validation_result.error) {
            var error_message = validation_result.error.details[0].message.replace(/"/g, '');
            return res.status(400).json({
                message: error_message
            })
        }

        if(meeting_fee.split(".")[1] == 0){
            meeting_fee = "free class"
        }

        // arrage according to request type
        var meeting_at = meeting_date + 'T' + start_time; 
        var duration = duration_hours*60 + duration_minutes; // total time in minutes

        var options = {
            method: 'PATCH',
            url: 'https://api.zoom.us/v2/meetings/'+meeting_id,
            headers: {
              'content-type': 'application/json',
              authorization: 'Bearer '+ token
            },
            body: { 

                // for details https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate
                  
                topic: topic,
                type: 2,
                start_time: meeting_at,
                duration: duration,
                password: password  

            },
            json: true
          };
          
          var data_json = {
            "meeting_host_name": meeting_host_name,
            "meeting_id": meeting_id,
            "meeting_topic": topic,
            "meeting_password": password,
            "meeting_date": meeting_date,
            "meeting_start_time": start_time,
            "meeting_duration": duration_hours + "h "+duration_minutes + "min",
            "meeting_description": meeting_description,
            "meeting_fee": meeting_fee,
            "meeting_type": meeting_type
        }

          request(options, function (error, response, body) {
            if (error) {
                console.log("error: ",error);
                return res.status(500).json({
                    status: "failed",
                    message: "Internal Server Error"
                }) 
            }

            if(response.statusCode == 404){
                return res.status(404).json({
                    status: "failed",
                    message: "Meeting does not exist"
                })
            }else{
                update_meeting(data_json, (error, result)=>{
                    if(error){
                        console.log('error: ', error)
                        return res.status(500).json({
                            status: "failed",
                            message: "Internal Server Error, could not update details in the database"
                        })
                    }
                    else{

                        deletePvtScheduleMeeting(','+meeting_id, (error, responce)=>{
                            if(error){
                                console.log("error: ",error);
                                return res.status(500).json({
                                    status: "failed",
                                    message: "Internal Server Error, could not delete details from the database"
                                }) 
                            }
                            else{
                                console.log("pvt meeting cancelled")
                                console.log({
                                    status: "success",
                                    message: "private meeting has been cancelled"
                                })
                            }
                        })

                        console.log("meeting updated")
                        return res.status(200).json({
                            status: "success",
                            message: "meeting has been updated"
                        })
                    }
                })
            }
          });

    }),

    updatePrivateClassMeeting:("/privateClass", async (req ,res) =>{

        var meeting_host_name = req.body.host_name; // type string 
        var meeting_id = req.body.meeting_id;               // type string 
        var topic = req.body.topic;                         // type string
        var meeting_date = req.body.meeting_date;           // format => 2020-08-09
        var start_time = req.body.start_time;               // 24h format => 20:00:00
        var duration_hours = req.body.duration_hours;       // type int  
        var duration_minutes = req.body.duration_minutes;   // type int
        var password = req.body.password;                   // type string
        var meeting_description = req.body.meeting_description;       // type string
        var meeting_fee = req.body.meeting_fee;             // type string
        var meeting_type = req.body.meeting_type;           // type string
        var student_ids = req.body.student_ids;           // type string

        //validate request data
        const validation_result = Joi.validate(req.body, schemapvt);
        if (validation_result.error) {
            var error_message = validation_result.error.details[0].message.replace(/"/g, '');
            return res.status(400).json({
                message: error_message
            })
        }

        if(meeting_fee.split(".")[1] == 0){
            meeting_fee = "free class"
        }

        // arrage according to request type
        var meeting_at = meeting_date + 'T' + start_time; 
        var duration = duration_hours*60 + duration_minutes; // total time in minutes

        var options = {
            method: 'PATCH',
            url: 'https://api.zoom.us/v2/meetings/'+meeting_id,
            headers: {
              'content-type': 'application/json',
              authorization: 'Bearer '+ token
            },
            body: { 

                // for details https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate
                  
                topic: topic,
                type: 2,
                start_time: meeting_at,
                duration: duration,
                password: password  

            },
            json: true
          };
          
          var data_json = {
            "meeting_host_name": meeting_host_name,
            "meeting_id": meeting_id,
            "meeting_topic": topic,
            "meeting_password": password,
            "meeting_date": meeting_date,
            "meeting_start_time": start_time,
            "meeting_duration": duration_hours + "h "+duration_minutes + "min",
            "meeting_description": meeting_description,
            "meeting_fee": meeting_fee,
            "meeting_type": meeting_type
        }

          request(options, async function (error, response, body) {
            if (error) {
                console.log("error: ",error);
                return res.status(500).json({
                    status: "failed",
                    message: "Internal Server Error"
                }) 
            }

            if(response.statusCode == 404){
                return res.status(404).json({
                    status: "failed",
                    message: "Meeting does not exist"
                })
            }else{
                update_meeting(data_json, async (error, result)=>{
                    if(error){
                        console.log('error: ', error)
                        return res.status(500).json({
                            status: "failed",
                            message: "Internal Server Error, could not update details in the database"
                        })
                    }
                    else{

                        var split_student_ids = String(student_ids).split(",");
                        for ( studentId of split_student_ids){
                            var userExist = await getUserExistById(studentId);

                            if(userExist.status == "success" && userExist.message[0] == undefined){
                                var new_meetingId = meeting_id
                                var jsonData = {
                                    meeting_id : ','+new_meetingId,
                                    student_id: studentId
                                } 
                                createStudentPrivateClass(jsonData, (error, result)=>{
                                    console.log({
                                        status: "success",
                                        message: "created a private class schedule"
                                    })
                                } )
                            }
                            else if(userExist.status == "success" && userExist.message[0] != undefined){
                                var new_meetingId = userExist.message[0].meeting_id + ',' + meeting_id
                                var jsonData = {
                                    meeting_id : new_meetingId,
                                    student_id: studentId
                                } 
                                updateStudentPrivateClass(jsonData, (error, result)=>{
                                    console.log({
                                        status: "success",
                                        message: "updated private class schedule"
                                    })
                                } )
                            }

                        }

                        console.log("meeting updated")
                        return res.status(200).json({
                            status: "success",
                            message: "meeting has been updated"
                        })
                    }
                })
            }
          });

    })
}

//user exist
const getUserExistById = (body) => {
    return new Promise((resolve) => {
      getUserExist(body, (error, result) => {
          if (error) return resolve({
            status: "failed",
            message: "Internal server Error"
            })
          if (result) {
            return resolve({
                status: "success",
                message: result
            });
          }
        });
    });
};