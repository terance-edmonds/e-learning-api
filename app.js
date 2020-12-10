//const PORT = process.env.PORT || 3000;
require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors')

//express
app.use(express.json());

//cors
app.use(cors());

//Setting up routers

//Client signup
const clientSignupRouter = require("./client/signup/signup");
app.use("/client/signup", clientSignupRouter);
//Client login
const clientLoginRouter = require("./client/login/login");
app.use("/client/login", clientLoginRouter);
//Client meetings_details
const clientMeetingsRouter = require("./client/client_services/services");
app.use("/client/meetings", clientMeetingsRouter);

//Client password update
const clientServicesRouter = require("./client_services/services");
app.use("/client/services", clientServicesRouter);

//Host signup
const hostSignupRouter = require("./host/signup/signup");
app.use("/host/signup", hostSignupRouter);
//Host login
const hostLoginRouter = require("./host/login/login");
app.use("/host/login", hostLoginRouter);
//Host meetings_details
const hostMeetingsRouter = require("./host/host_services/services");
app.use("/host/meetings", hostMeetingsRouter);

//zoomApp
const zoomToken = require("./zoom/zoom");
app.use("/zoom" , zoomToken)

app.listen(process.env.APP_PORT, () => console.log('Listening on port', process.env.APP_PORT));
