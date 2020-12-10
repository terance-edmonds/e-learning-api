const express = require('express');
const router = express.Router();
const { getMeetings, getStudentPrivateClass, getPrivateMeetings, checkPaidMeetings } = require('../../services/client.services');
const Joi = require('joi')

const schema = Joi.object().keys(
    {
        //email: Joi.string().email().required()
        student_id: Joi.number().integer().required()
    }
);

router.post(
    "/", async (req, res) => {
        //validate request data
        const validation_result = Joi.validate(req.body, schema);
        if (validation_result.error) {
            var error_message = validation_result.error.details[0].message.replace(/"/g, '');
            return res.status(400).json({
                message: error_message
            })
        }

        var pvt_meetings_ids;
        //get all private classes of this student
        var private_meetings = await StudentPrivateClass(req.body.student_id);
        if (private_meetings.data == '') {
            pvt_meetings_ids = ''
        }
        else {
            pvt_meetings_ids = String(private_meetings.data[0].meeting_id).split(",");
            if (pvt_meetings_ids.length > 0) {
                pvt_meetings_ids.shift();
            }
        }

        //filter all paid & unpaid private classes of this student
        var pvt_paid_meetings_array = new Array();
        var pvt_unpaid_meetings_array = new Array();

        for (pvtMId of pvt_meetings_ids) {

            let _data = {
                student_id: req.body.student_id,
                meeting_id: pvtMId
            }

            let paid = await CheckPaidMeetings(_data);

            if (paid.status) {
                var pvtMeetingsData = await pvtMeetingResult(pvtMId);
                let _paidMeetingData = {
                    meeting: {
                        data: pvtMeetingsData.data[0],
                        receipt_number: paid.data
                    }
                }

                pvt_paid_meetings_array.push(_paidMeetingData);
            }
            else {
                var pvtMeetingsData = await pvtMeetingResult(pvtMId);
                pvt_unpaid_meetings_array.push(pvtMeetingsData.data[0]);
            }
        }

        //get paid & unpaid common classes
        var common_meetings = await commonMeetingResult();

        //filter all paid & unpaid public classes of this student
        var common_paid_meetings_array = new Array();
        var common_unpaid_meetings_array = new Array();

        for (publicMId of common_meetings_array.data) {

            let _data = {
                student_id: req.body.student_id,
                meeting_id: publicMId.meeting_id
            }

            let paid = await CheckPaidMeetings(_data);

            if (paid.status) {

                let _paidMeetingData = {
                    meeting: {
                        data: publicMId,
                        receipt_number: paid.data
                    }
                }

                common_paid_meetings_array.push(_paidMeetingData);
            }
            else {

                common_unpaid_meetings_array.push(publicMId);
            }
        }

        //send responce
        return res.status(200).json({
            status: "success",
            paid_private_meetings: {
                data: pvt_paid_meetings_array
            },
            unpaid_private_meetings: {
                data: pvt_unpaid_meetings_array
            },
            paid_common_meetings: {
                data: common_paid_meetings_array
            },
            unpaid_common_meetings: {
                data: common_unpaid_meetings_array
            }
        })
    }
)

//check paid meetings
const CheckPaidMeetings = (body) => {
    return new Promise((resolve) => {
        checkPaidMeetings(body, (error, result) => {
            if (error) return resolve({
                status: "failed",
                message: "Internal server Error"
            })
            if (result.length < 1) {
                return resolve({
                    status: false
                })
            } else {
                return resolve({
                    status: true,
                    data: result[0].receipt_number
                })
            }
        });
    });
};

//get Private class meetings schedule
const StudentPrivateClass = (body) => {
    return new Promise((resolve) => {
        getStudentPrivateClass(body, (error, result) => {
            if (error) return resolve({
                status: "failed",
                message: "Internal server Error"
            })
            if (result) {
                return resolve({
                    data: result
                })
            }
        });
    });
};

//get private meetings list
const pvtMeetingResult = (body) => {
    return new Promise((resolve) => {
        getPrivateMeetings(body, (error, result) => {
            if (error) {
                console.log(`Error while getting private meeting detail ${error}`);
                return resolve({
                    status: "failed",
                    message: "Internal server Error"
                })
            }
            if (result) {
                console.log(result);
                console.log( `printing query result ${result}`);
                return resolve({
                    data: result
                })
            }
        })
    });
};

//get all the mass class details
const commonMeetingResult = () => {
    return new Promise((resolve) => {
        getMeetings((error, result) => {
            if (error) {
                console.log("error: ", error);
                return res.status(500).json({
                    status: "failed",
                    message: "Internal Server Error"
                })
            } else {
                console.log('Data retrived successfully', result);
                return resolve({
                    data: result
                })
            }
        })
    });
};


module.exports = router;