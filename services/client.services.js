const pool = require("./database");

//user create,update,delete,select module
module.exports = {
    create: (data, callback) => {
        pool.query(
            `insert into client_users(first_name, last_name, email, school, grade, birth_date, year_of_advance_level, shy, phone_number, home_address, password) values(?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.school,
                data.grade,
                data.birth_date,
                data.year_of_advance_level,
                data.shy,
                data.phone_number,
                data.home_address,
                data.password
                ],
                (error, result) => {
                    if(error){
                        return callback(error);
                    }
                    return callback(null, result)
                }
            );
        },
    getUserbyemail: (data, callback) => {
        pool.query(
            `select * from client_users where email= ?`,
            [
                data.email,
                ],
                (error, result) => {
                    if(error){
                        return callback(error);
                    }
                    return callback(null, result[0])
                }
            );
        },
    getUserById: (data, callback) => {
        console.log(data);
        pool.query(
            `select * from client_users where id=` + data.id.toString()
           ,
                (error, result) => {
                    if(error){
                        return callback(error);
                    }
                    return callback(null, result[0])
                }
            );
        },
    getUserExsist: (data, callback) => {
        pool.query(
            `select * from client_users where email= ?`,
            [
                data.email,
                ],
                (error, result) => {
                    if(error){
                        return callback(error);
                    }
                    return callback(null, result)
                }
            );
        },
    getMeetings: (callback) => {
        pool.query(
            `select meeting_host_name , meeting_id, meeting_topic, meeting_password, meeting_date, meeting_start_time, meeting_duration, meeting_description, meeting_fee, meeting_join_link from zoom_meetings where meeting_type= 'Mass' order by meeting_date , meeting_start_time`,
                (error, result) => {
                    if(error){
                        return callback(error);
                    }
                    return callback(null, result)
                }
            );
        },
    getMeetingDetailById: (data, callback) => {
        pool.query(
            `select * from zoom_meetings where meeting_id= ?`,
            [
                data
            ],
                (error, result) => {
                    if(error){
                        return callback(error);
                    }
                    return callback(null, result)
                }
            );
        },
    getPrivateMeetings: (data, callback) => {
        pool.query(
            `select meeting_host_name , meeting_id, meeting_topic, meeting_password, meeting_date, meeting_start_time, meeting_duration, meeting_description, meeting_fee, meeting_join_link from zoom_meetings where meeting_type= 'Private' and meeting_id='` + data + `' order by meeting_date , meeting_start_time`,[
                data
            ],
                (error, result) => {
                    if(error){
                        return callback(error);
                    }
                    return callback(null, result)
                }
            );
        },
    getStudentPrivateClass: (data, callback)=>{
        pool.query(
            `select meeting_id from private_meeting_schedule where student_id = ? `,
            [
                data
            ],
            (error, result) => {
                if(error){
                    return callback(error);
                }
                return callback(null, result)
            }
        )
    },
    addMeeting: (data, callback)=>{
        pool.query(
            `insert into clients_paid_meetings (student_id, meeting_id, receipt_number) values (?,?,?)`,
            [
                data.student_id,
                data.meeting_id,
                data.receipt_number
            ],
            (error, result) =>{
                if(error){
                    return callback(error);
                }
                return callback(null, result)
            }
        )
    },
    checkReceiptNumberExist: (data, callback)=>{
        pool.query(
            `select * from clients_paid_meetings where receipt_number= ?`,
            [
                data
            ],
            (error, result)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, result)
            }
        )
    },
    checkPaidMeetings: (data, callback)=>{
        pool.query(
            `select * from clients_paid_meetings where student_id= ? and meeting_id= ?`,
            [
                data.student_id,
                data.meeting_id
            ],
            (error, result)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, result)
            }
        )
    },
    getPaidMeetingsDetails: (callback)=>{
        pool.query(
            `select * from clients_paid_meetings`,
            (error, result)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, result)
            }
        )
    }
}

