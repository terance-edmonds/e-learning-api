const express = require('express');
const router = express.Router();
const {createMassMeeting, createPrivateMeeting }= require('./zoomCreateMeeting');
const { deleteMeeting }= require('./zoomDeleteMeeting');
const { updateMassClassMeeting , updatePrivateClassMeeting}= require('./zoomUpdateMeeting');

//create mass class zoom meeting
router.post("/zoomCreateMeeting/massClass", createMassMeeting);
//create private class zoom meeting
router.post("/zoomCreateMeeting/privateClass", createPrivateMeeting);
//delete zoom meetings
router.post("/zoomDeleteMeeting", deleteMeeting); 
//update mass class meeting
router.patch("/zoomUpdateMeeting/massClass", updateMassClassMeeting); 
//update private class meeting
router.patch("/zoomUpdateMeeting/privateClass", updatePrivateClassMeeting); 

module.exports = router;