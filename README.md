# pr_anush

run the following cord in your terminal to install the node modules (If necessary)
> npm install

run the following cord in your terminal to run app.js\
(so it will automatically restart the server when ever you change somthing in the code)
> npm start

In your .env file and change these to your setting

APP_PORT= your app port (eg:3000)\
DB_PORT= your database port\
DB_HOST= you host name\
DB_USER= your database username\
DB_PASS= your database password\
MYSQL_DB= your database name(pr_anush)\
jwt_key= your zoom jwt api key\
jwt_secret_key= your zoom jwt secret key

## Required Data , Response Data and Methods

**client folder**
* client_services 

  *retrive all meeting details for a client user(student)*
    * methord:
        * /client/meetings
    * required_data:
        * student_id - integer
    * response_data:
      * status
      * paid_private_meetings:
        * meeting_host_name
        * meeting_id
        * meeting_topic
        * meeting_password
        * meeting_date
        * meeting_start_time
        * meeting_duration
        * meeting_description
        * meeting_fee
        * meeting_join_link
        * receipt_number
      * unpaid_private_meetings:
        * meeting_host_name
        * meeting_id
        * meeting_topic
        * meeting_password
        * meeting_date
        * meeting_start_time
        * meeting_duration
        * meeting_description
        * meeting_fee
        * meeting_join_link

      * paid_common_meetings:
        * meeting_host_name
        * meeting_id
        * meeting_topic
        * meeting_password
        * meeting_date
        * meeting_start_time
        * meeting_duration
        * meeting_description
        * meeting_fee
        * meeting_join_link
        * receipt_number
      * unpaid_common_meetings:
        * meeting_host_name
        * meeting_id
        * meeting_topic
        * meeting_password
        * meeting_date
        * meeting_start_time
        * meeting_duration
        * meeting_description
        * meeting_fee
        * meeting_join_link

* login - login for a client user(student)
    * methord:
        * /client/login
    * required_data:
        * email - string
        * password - string
    * response_data:
        * status
        * message

* sign up- sign up for a client user(student)
    * methord:
        * /client/signup
    * required_data:
        * first_name - string
        * last_name - string
        * email - string
        * school - string
        * grade - integer
        * birth_date - (fromat: YYYY-MM-DD) - string //format is not mandatory
        * year_of_advance_level - integer
        * shy - (format: 1 shy) - string
        * phone_number - string ( maximum 10 characters )
        * home_address - string
        * password - string
    * response_data:
        * success
        * message

**host folder**
* host_services

  *retrive all meeting details for a host user(lecturer)*
    * methord:
        * /host/meetings
    * required_data:
        * null
    * response_data:
      * status
      * message
         * meeting_host_name
         * meeting_host_email
         * meeting_id
         * meeting_topic
         * meeting_password
         * meeting_date
         * meeting_start_time
         * meeting_duration
         * meeting_description
         * meeting_fee
         * meeting_start_link
         * meeting_join_link
         * meeting_type

* login - login for a host user(lecturer)
    * methord:
        * /host/login
    * required_data:
        * email - string
        * password - string
    * response_data:
        * status
        * message

* sign up- sign up for a hostuser(lecturer)
    * methord:
        * /host/signup
    * required_data:
        * email - string
        * fist_name - string
        * last_name - string
        * password - string
    * response_data:
        * status
        * message

**client_services folder**
* client_services

  *retrive all clients user details(studnets)*
    * method:
       * /client/services/getClientUserDetails
    * required_data
        * null
    * response_data
      * status
      * message
        * id
        * first_name
        * last_name
        * email
        * school
        * grade
        * birth_date
        * year_of_advance_level
        * shy
        * phone_number
        * home_address
        * password

  *retrive client user details by email(students)*
    * method:
        * /client/services/getClientUserDetailsByEmail
    * required_data
        * email
    * response_data
      * status
      * message
        * id
        * first_name
        * last_name
        * email
        * school
        * grade
        * birth_date
        * year_of_advance_level
        * shy
        * phone_number
        * home_address
        * password

  *update client user details(student)*
    * methord:
        * /client/services/clientDetailsUpdate
    * required_data:
        * student_id - integer
        * first_name - string
        * last_name - string
        * school - string
        * grade - integer
        * birth_date - (fromat: YYYY-MM-DD) - string //format is not mandatory
        * year_of_advance_level - integer
        * shy - (format: 1 shy) - string
        * phone_number - string ( maximum 10 characters )
        * home_address - string
    * response_data:
        * success
        * message

  *update client user password and email(student)*
   * methord:
       * /client/services/clientEmailPasswordUpdate
   * required_data:
       * student_id - integer
       * email - string
       * password - string
   * response_data:
       * status
       * message

  *delete client user details(student)*
    * method:
        * /client/services/deleteClientUser
    * required_data
        * email
    * response_data
        * status
        * message

  *add a sheduled meeting to clients sheduled meeting list(student)*
    * method:
        * /client/services/addSheduledMeeting
    * required_data
        * student_id - string
        * meeting_id - string
    * response_data
        * status
        * message

  *get all paid sheduled meetings details with respective client details(student)*
    * method:
        * /client/services/getSheduledMeetingPaidClientsDetails
    * required_data
        * null
    * response_data
        * status
        * message
          * student_details
            * id
            * first_name
            * last_name
            * email
          * meeting_details
            * meeting_id
            * meeting_topic
            * meeting_type
          * receipt_number

**zoom folder**
* zoomCreateMeeting - Create a new meeting (by a lecturer)

  *create a mass class meeting*
    * methord:
        * /zoom/zoomCreateMeeting/massClass
    * required_data:
        * meeting_host_name - string
        * email - string
        * topic - string
        * meeting_date - (format: YYYY-MM-DD) - string
        * start_time - (format: HH:mm:ss) - string
        * duration_hours - integer
        * duration_minutes - integer
        * password - (less than 10 characters) - string
        * meeting_description - string
        * meeting_fee - string (format: Rs.0)
        * meeting_type - string (format: Mass)
    * response_data:
        * status
        * message

  *create a private class meeting*
    * methord:
        * /zoom/zoomCreateMeeting/privateClass
    * required_data:
        * host_name - string
        * email - string
        * topic - string
        * meeting_date - (format: YYYY-MM-DD) - string
        * start_time - (format: HH:mm:ss) - string
        * duration_hours - integer
        * duration_minutes - integer
        * password - (less than 10 characters) - string
        * meeting_description - string
        * meeting_fee - string (format: Rs.0)
        * meeting_type - string (format: Private)
        * student_ids - string (1,2,3,...)
    * response_data:
        * status
        * message

* zoomUpdateMeeting - Update a meeting details (by a lecturer)

  *update mass class meeting*
    * methord:
        * /zoom/zoomUpdateMeeting/massClass
    * required_data:
        * host_name - string
        * meeting_id - string
        * topic - string
        * meeting_date - (format: YYYY-MM-DD) - string
        * start_time - (format: HH:mm:ss) - string
        * duration_hours - integer
        * duration_minutes - integer
        * password - (less than 10 characters) - string
        * meeting_description - string
        * meeting_fee - string (format: Rs.0)
        * meeting_type - string (format: Mass)
    * response_data:
        * status
        * message

  *update private class meeting*
    * methord:
        * /zoom/zoomUpdateMeeting/privateClass
    * required_data:
        * host_name - string
        * meeting_id - string
        * topic - string
        * meeting_date - (format: YYYY-MM-DD) - string
        * start_time - (format: HH:mm:ss) - string
        * duration_hours - integer
        * duration_minutes - integer
        * password - (less than 10 characters) - string
        * meeting_description - string
        * meeting_fee - string (format: Rs.0)
        * meeting_type - string (format: Private)
        * student_ids - string (format: 1,2,3)
    * response_data:
        * status
        * message

* zoomDeleteMeeting - Delete a meeting (by a lecturer)
    * method:
        * /zoom/zoomDeleteMeeting
    * required_data
        * meeting_id - string
    * reponse_data
        * status
        * message


## Database 

**name:**\
&nbsp; pr_anush

**tables:**

* client_users
    * id - (AUTO INCREMENTED)
    * first_name
    * last_name
    * email
    * school
    * grade
    * birth_date
    * year_of_advance_level
    * shy
    * phone_number
    * home_address
    * password
* host_users
    * first_name
    * last_name
    * email
    * password
* zoom_meetings
    * meeting_host_name
    * meeting_host_email
    * meeting_id
    * meeting_topic
    * meeting_password
    * meeting_date
    * meeting_start_time
    * meeting_duration
    * meeting_desciption
    * meeting_fee
    * meeting_start_link
    * meeting_join_link
    * meeting_type
* private_meeting_schedule
    * student_id
    * meeting_id