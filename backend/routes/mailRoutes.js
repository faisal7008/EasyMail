const express = require('express')
const { isAuthenticated } = require('../middlewares/authMiddleware')
const { sendEmail, getOutboundEmailHistory, getInboundEmailHistory, sendEmailWithTemplate } = require('../controllers/mailController')
const router = express.Router()

// http://localhost:9000/mails

router.post("/send-email", sendEmail)
router.get("/sent", getOutboundEmailHistory)
router.get("/recieved", getInboundEmailHistory)
router.post("/send-email-with-template", sendEmailWithTemplate)

module.exports = router