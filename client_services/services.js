const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require("joi");

const { 
    updateClientEmailPassword,
    getUserDetailsbyemail,
    deleteUserDetailsbyemail,
    updateUserDetails,
    getUsersDetails 
} = require('../services/host.services');

const {
    checkReceiptNumberExist, 
    addMeeting, 
    getMeetingDetailById, 
    getUserById, 
    checkPaidMeetings,
    getPaidMeetingsDetails
} = require('../services/client.services');

const salt = bcrypt.genSaltSync(10);

const schema = Joi.object().keys(
    {
        student_id: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
);

router.post(
    "/clientEmailPasswordUpdate", (req, res)=>{
        
        //validate request data
        const validation_result = Joi.validate(req.body, schema);
        if (validation_result.error) {
            var error_message = validation_result.error.details[0].message.replace(/"/g, '');
            return res.status(400).json({
                message: error_message
            })
        }
        
        //hash the password
        req.body.password = bcrypt.hashSync(req.body.password, salt)

        updateClientEmailPassword(req.body , (error,result)=>{
            if(error) {
                console.log("error: ",error);
                return res.status(500).json({
                    status: "failed",
                    message: "Internal Server Error"
                }) 
            }
            if(result.affectedRows == 0){
                console.log("error: User does not exist");
                return res.status(400).json({
                    status: "failed",
                    message: "User does not exist"
                }) 
            }
            else{
                console.log('Data retrived successfully')
                return res.status(200).json({
                    status: "success",
                    message: "user password updated successfully"
                })
            }
        })

    }
);

const schema1 = Joi.object().keys(
    {
        email: Joi.string().email().required(),
    }
);

router.post(
    "/deleteClientUser", (req, res) =>{

        const validation_result = Joi.validate(req.body, schema1);
        if (validation_result.error) {
            var error_message = validation_result.error.details[0].message.replace(/"/g, '');
            return res.status(400).json({
                message: error_message
            })
        }
        
        getUserDetailsbyemail(req.body ,(error, result)=>{
            if(result == ""){
                console.log("error: User does not exist");
                return res.status(400).json({
                    status: "failed",
                    message: "User does not exist"
                }) 
            }
            if(error) {
                console.log("error: ",error);
                return res.status(500).json({
                    status: "failed",
                    message: "Internal Server Error"
                }) 
            }else{
                deleteUserDetailsbyemail(req.body ,(error, result)=>{
                    if(error) {
                        console.log("error: ",error);
                        return res.status(500).json({
                            status: "failed",
                            message: "Internal Server Error"
                        }) 
                    }else{
                        console.log('Data deleted successfully')
                        return res.status(200).json({
                            status: "success",
                            message: result
                        })
                    }
                })
            }
        })
    }
);

const schema2 = Joi.object().keys(
    {
        student_id: Joi.number().integer().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        school: Joi.string().required(),
        grade: Joi.number().integer().required(),
        birth_date: Joi.string().required(),
        year_of_advance_level: Joi.number().integer().required(),
        shy: Joi.string().required(), // advance level shy
        phone_number: Joi.string().max(10).required(), 
        home_address: Joi.string().required(), 
    }
);

router.post(
    "/clientDetailsUpdate", (req, res) =>{

        const validation_result = Joi.validate(req.body, schema2);
        if (validation_result.error) {
            var error_message = validation_result.error.details[0].message.replace(/"/g, '');
            return res.status(400).json({
                message: error_message
            })
        }
        

        updateUserDetails(req.body ,(error, result)=>{
            if(result.message.includes("Rows matched: 0")){
                console.log("User does not exist");
                return res.status(400).json({
                    status: "failed",
                    message: "User does not exist"
                }) 
            }
            if(error) {
                console.log("error: ",error);
                return res.status(500).json({
                    status: "failed",
                    message: "Internal Server Error"
                }) 
            }else{
                console.log('Data updated successfully')
                return res.status(200).json({
                    status: "success",
                    message: "user details updated successfully"
                })
            }
        })
    }
);

router.post(
    "/getClientUserDetails", (req, res) =>{
        getUsersDetails( (error, result)=>{
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
)

const schema3 = Joi.object().keys(
    {
        email: Joi.string().email().required(),
    }
);

router.post(
    "/getClientUserDetailsByEmail", (req, res) =>{

        const validation_result = Joi.validate(req.body, schema3);
        if (validation_result.error) {
            var error_message = validation_result.error.details[0].message.replace(/"/g, '');
            return res.status(400).json({
                message: error_message
            })
        }
        

        getUserDetailsbyemail(req.body ,(error, result)=>{
            if(result == ""){
                console.log("error: User does not exist");
                return res.status(400).json({
                    status: "failed",
                    message: "User does not exist"
                }) 
            }
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

router.post(
    "/getClientUserDetailsById", (req, res) =>{

        // const validation_result = Joi.validate(req.body, schema3);
        // if (validation_result.error) {
        //     var error_message = validation_result.error.details[0].message.replace(/"/g, '');
        //     return res.status(400).json({
        //         message: error_message
        //     })
        // }
        

        getUserById(req.body ,(error, result)=>{
            if(result == ""){
                console.log("error: User does not exist");
                return res.status(400).json({
                    status: "failed",
                    message: "User does not exist"
                }) 
            }
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

const schema4 = Joi.object().keys(
    {
        student_id: Joi.string().required(),
        meeting_id: Joi.string().required()
    }
);

router.post(
    "/addSheduledMeeting", async (req, res)=>{

        const validation_result = Joi.validate(req.body, schema4);
        if (validation_result.error) {
            var error_message = validation_result.error.details[0].message.replace(/"/g, '');
            return res.status(400).json({
                message: error_message
            })
        }

        let receipt_number; 
        let receipt_unique;
        let already_paid;
        
        //check if the meeting exists
        let meeting_exist = await CheckMeetingExist(req.body.meeting_id);
        if(!meeting_exist){
            return res.status(404).json({
                status: "failed",
                message: "Meeting does not exist"
            })
        }

        //check if the client user exist
        let ClienUser_exist = await CheckClientUserExist(req.body.student_id);
        if(!ClienUser_exist){
            return res.status(404).json({
                status: "failed",
                message: "Client user does not exist"
            })
        }

        //create a random number as the receipt number
        receipt_number = await GenerateReceiptNumber();
        
        //check if the receipt number is unique
        receipt_unique = await CheckReceiptNumber(receipt_number);

        //check if the student already paid
        already_paid = await CheckPaid(req.body);
        if(already_paid){
            return res.status(200).json({
                status: "failed",
                message: "User already paid for the meeting"
            })
        }
        
        while (receipt_unique == false){
            receipt_number = await GenerateReceiptNumber();
            console.log(false);
            receipt_unique = await CheckReceiptNumber(receipt_number);
        }
        //if the receipt number is unique add the lesson to the database
        if(receipt_unique){
            let data_json = {
                student_id: req.body.student_id,
                meeting_id: req.body.meeting_id,
                receipt_number: receipt_number
            }
            addMeeting(data_json, (error, result)=>{
                if(error) {
                    console.log("error: ",error);
                    return res.status(500).json({
                        status: "failed",
                        message: "Internal Server Error"
                    }) 
                }else{
                    console.log('Data Inserted successfully')
                    return res.status(200).json({
                        status: "success",
                        message: "Data Inserted succesfully"
                    })
                }
            });
        }

    }
);

router.post(
    "/getSheduledMeetingPaidClientsDetails", async (req, res)=>{
        let details_data = new Array();

        //get all paid details
        let all_paid_details = await GetPaidMeetingsDetails();
        for (paid_details of all_paid_details){
            //get student details
            let student_details = await GetStudentDetails(paid_details.student_id);
            //get meeting details
            let meeting_details = await GetMeeetingDetails(paid_details.meeting_id);  

            let __data = {
                data:{
                    student_details: student_details,
                    meeting_details: meeting_details,
                    receipt_number: paid_details.receipt_number
                }
            }

            details_data.push(__data);
        }

        //send the responce
        return res.status(200).json({
            status: "success",
            message: details_data
        })

    }
);

//get meeting details by meeting id
const GetMeeetingDetails = (body) =>{
    return new Promise((resolve) => {
        getMeetingDetailById(body, (error, result)=>{
            if(error) {
                console.log("error: ",error);
                return resolve({
                    status: "failed",
                    message: "Internal Server Error"
                }) 
            }else{
                let _result = {
                    meeting_id: result[0].meeting_id,
                    meeting_topic: result[0].meeting_topic,
                    meeting_type: result[0].meeting_type
                }

                return resolve(_result)
            }
        })
    });
}

//get student details by student id
const GetStudentDetails = (body) =>{
    return new Promise((resolve) => {
        getUserById(body, (error, result)=>{
            if(error) {
                console.log("error: ",error);
                return resolve({
                    status: "failed",
                    message: "Internal Server Error"
                }) 
            }else{

                let _result = {
                    id: result.id,
                    first_name: result.first_name,
                    last_name: result.last_name,
                    email: result.email
                }

                return resolve(_result)
            }
        })
    });
}


//Generate a random receipt number
const GenerateReceiptNumber = () =>{
    return new Promise((resolve) => {
        let receipt_number = Math.floor(Math.random()*10000000000000);
        return resolve(receipt_number);
    });
}

//get all paid meeting and student details
const GetPaidMeetingsDetails = () =>{
    return new Promise((resolve)=>{
        getPaidMeetingsDetails( (error, result)=>{
            if(error) {
                console.log("error: ",error);
                return res.status(500).json({
                    status: "failed",
                    message: "Internal Server Error"
                }) 
            }else{
                console.log('Data retrived successfully')
                return resolve(result)
            }
        });
    });
}

//check meeting by meeting id
const CheckMeetingExist = (body) =>{
    return new Promise((resolve) => {
        getMeetingDetailById(body, (error, result)=>{
            if(error) {
                console.log("error: ",error);
                return resolve({
                    status: "failed",
                    message: "Internal Server Error"
                }) 
            }else{
                if(result.length < 1){
                    return resolve(false);
                }
                else{
                    return resolve(true);
                }
            }
        })
    });
}

//check student by student id
const CheckClientUserExist = (body) =>{
    return new Promise((resolve) => {
        getUserById(body, (error, result)=>{
            if(error) {
                console.log("error: ",error);
                return resolve({
                    status: "failed",
                    message: "Internal Server Error"
                }) 
            }else{
                if(result == undefined){
                    return resolve(false);
                }
                else{
                    return resolve(true);
                }
            }
        })
    });
}

//check paid by student id and meeting id
const CheckPaid = (body) =>{
    return new Promise((resolve) => {
        checkPaidMeetings(body, (error, result)=>{
            if(error) {
                console.log("error: ",error);
                return resolve({
                    status: "failed",
                    message: "Internal Server Error"
                }) 
            }else{
                if(result.length < 1){
                    return resolve(false);
                }
                else{
                    return resolve(true);
                }
            }
        })
    });
}

//check receipt number by receipt number
const CheckReceiptNumber = (body) =>{
    return new Promise((resolve) => {
        checkReceiptNumberExist(body, (error, result)=>{
            if(error) {
                console.log("error: ",error);
                return res.status(500).json({
                    status: "failed",
                    message: "Internal Server Error"
                }) 
            }
            else{
                //if the generated receipt number is unique(doesnt exist)
                if(result.length < 1){
                    return resolve(true)
                }
                else{
                    return resolve(false)
                }
            }
        });
    });
}


module.exports = router;