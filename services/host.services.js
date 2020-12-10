const pool = require("./database");

module.exports = {
    create_meeting: (data, callback) =>{
        pool.query(
            `insert into zoom_meetings(meeting_host_name, meeting_host_email, meeting_id, meeting_topic, meeting_password, meeting_date, meeting_start_time, meeting_duration, meeting_description, meeting_fee, meeting_start_link, meeting_join_link, meeting_type) values(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.meeting_host_name,
                data.meeting_host_email,
                data.meeting_id,
                data.meeting_topic,
                data.meeting_password,
                data.meeting_date,
                data.meeting_start_time,
                data.meeting_duration,
                data.meeting_description,
                data.meeting_fee,
                data.meeting_start_link,
                data.meeting_join_link,
                data.meeting_type,

            ],
            (error, result) => {
                if(error){
                    return callback(error);
                }else{
                    return callback(null, result);
                }
            }
        );
    },
    delete_meeting: (data, callback) =>{
        pool.query(
            `delete from zoom_meetings where meeting_id = ?`,
            [
                data.meeting_id
            ],
            (error, result) =>{
                if(error){
                    return callback(error);
                }else{
                    return callback(null, result);
                }
            }
        )
    },
    update_meeting: (data, callback) =>{
        pool.query(
            `update zoom_meetings set meeting_host_name = ?, meeting_topic= ?, meeting_password= ?, meeting_date= ?, meeting_start_time= ?, meeting_duration= ?, meeting_description= ?, meeting_fee= ?, meeting_type= ?where meeting_id= ?`,
            [
                data.meeting_host_name,
                data.meeting_topic,
                data.meeting_password,
                data.meeting_date,
                data.meeting_start_time,
                data.meeting_duration,
                data.meeting_description,
                data.meeting_fee,
                data.meeting_type,
                data.meeting_id
            ],
            (error, result)=>{
                if(error){
                    return callback(error);
                }else{
                    return callback(null, result);
                }
            })
    },
    create_user: (data, callback) =>{
        pool.query(
            `insert into host_users(first_name, last_name, email, password) values(?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.password
            ],
            (error, result) => {
                if(error){
                    return callback(error);
                }else{
                    return callback(null, result);
                }
            }
        );
    },
    getUserbyemail: (data, callback) => {
        pool.query(
            `select * from host_users where email= ?`,
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
    getMeetings: (callback) => {
            pool.query(
                `select meeting_host_name, meeting_host_email, meeting_id, meeting_topic, meeting_password, meeting_date, meeting_start_time, meeting_duration, meeting_description, meeting_fee, meeting_start_link, meeting_join_link, meeting_type from zoom_meetings order by meeting_date , meeting_start_time`,
                    (error, result) => {
                        if(error){
                            return callback(error);
                        }
                        return callback(null, result)
                    }
                );
            },
    getUsersDetails: (callback) => {
            pool.query(
                `select * from client_users`,
                    (error, result) => {
                        if(error){
                            return callback(error);
                        }
                        return callback(null, result)
                    }
                );
            },
    getUserDetailsbyemail: (data, callback) => {
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
    deleteUserDetailsbyemail: (data, callback) => {
            pool.query(
                `delete from client_users where email = ?`,
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
    updateUserDetails: (data, callback) => {
            pool.query(
                `update client_users set first_name= ?, last_name= ?, school= ?, grade= ?, birth_date= ?,year_of_advance_level= ?, shy= ?, phone_number=?, home_address= ? where id= ?`,
                [
                    data.first_name,
                    data.last_name,
                    data.school,
                    data.grade,
                    data.birth_date,
                    data.year_of_advance_level,
                    data.shy,
                    data.phone_number,
                    data.home_address,
                    data.student_id
                    ],
                    (error, result) => {
                        if(error){
                            return callback(error);
                        }
                        return callback(null, result)
                    }
                );
            },
            updateClientEmailPassword: (data, callback) => {
            pool.query(
                `update client_users set email=? ,password= ? where id= ?`,
                [
                    data.email,
                    data.password,
                    data.student_id
                ],
                    (error, result) => {
                        if(error){
                            return callback(error);
                        }
                        return callback(null, result)
                    }
                );
            },
            createStudentPrivateClass: (data, callback)=>{
                pool.query(
                    `insert into private_meeting_schedule(student_id, meeting_id) values (?,?)`,
                    [
                        data.student_id,
                        data.meeting_id
                    ],
                    (error, result) => {
                        if(error){
                            return callback(error);
                        }
                        return callback(null, result)
                    }
                )
            },
            updateStudentPrivateClass: (data, callback)=>{
                pool.query(
                    `update private_meeting_schedule set meeting_id = ? where student_id = ?`,
                    [
                        data.meeting_id,
                        data.student_id
                    ],
                    (error, result) => {
                        if(error){
                            return callback(error);
                        }
                        return callback(null, result)
                    }
                )
            },
            getUserExist: (data, callback)=>{
                pool.query(
                    `select * from private_meeting_schedule where student_id= ?`,
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
            deletePvtScheduleMeeting: (data, callback)=>{
                pool.query(
                    `update private_meeting_schedule set meeting_id= replace(meeting_id, ?, '')`,
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
            }
}
