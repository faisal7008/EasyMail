const axios = require("axios");
require("dotenv").config();

const sendEmail = async (req, res) => {
  const {
    from,
    to,
    subject,
    textBody,
    htmlBody,
    messageStream = "outbound", // Optional, defaults to 'outbound'
  } = req.body;

  try {
    const response = await axios.post(
      "https://api.postmarkapp.com/email",
      {
        From: from,
        To: to,
        Subject: subject,
        TextBody: textBody,
        HtmlBody: htmlBody,
        MessageStream: messageStream,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Postmark-Server-Token": process.env.POSTMARK_API_KEY,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error sending email:", error.response.data);
    res
      .status(error.response.data.ErrorCode || 500)
      .json({ error: error.response.data.Message });
  }
};

const getOutboundEmailHistory = async (req, res) => {
  const { recipient, count, offset, tag, status, todate, fromdate } = req.query;

  try {
    const response = await axios.get(
      "https://api.postmarkapp.com/messages/outbound",
      {
        headers: {
          Accept: "application/json",
          "X-Postmark-Server-Token": process.env.POSTMARK_API_KEY,
        },
        params: {
          recipient,
          count,
          offset,
          tag,
          status,
          todate,
          fromdate,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Error retrieving outbound email history:",
      error.response.data
    );
    res
      .status(error.response.data.ErrorCode || 500)
      .json({ error: error.response.data.Message });
  }
};

const getInboundEmailHistory = async (req, res) => {
  const { recipient, count, offset, fromdate, todate, status } = req.query;

  try {
    const response = await axios.get(
      "https://api.postmarkapp.com/messages/inbound",
      {
        headers: {
          Accept: "application/json",
          "X-Postmark-Server-Token": process.env.POSTMARK_API_KEY,
        },
        params: {
          recipient,
          count,
          offset,
          fromdate,
          todate,
          status,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Error retrieving inbound email history:",
      error.response.data
    );
    res
      .status(error.response.data.ErrorCode || 500)
      .json({ error: error.response.data.Message });
  }
};

const sendEmailWithTemplate = async (req, res) => {
  const { from, to, templateAlias, templateModel } = req.body;

  try {
    const response = await axios.post(
      "https://api.postmarkapp.com/email/withTemplate",
      {
        From: from,
        To: to,
        TemplateAlias: templateAlias,
        TemplateModel: templateModel,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Postmark-Server-Token": process.env.POSTMARK_API_KEY,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error sending email with template:", error.response.data);
    res
      .status(error.response.data.ErrorCode || 500)
      .json({ error: error.response.data.Message });
  }
};

const getMessageDetails = async (req, res) => {
  const messageId = req.params.messageId;

  try {
    const response = await axios.get(`https://api.postmarkapp.com/messages/outbound/${messageId}/details`, {
      headers: {
        Accept: 'application/json',
        "X-Postmark-Server-Token": process.env.POSTMARK_API_KEY,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error retrieving message details:', error.response.data);
    res.status(error.responsse.ErrorCode || 500).json({ error: error.response.data.Message });
  }
}

module.exports = { sendEmail, getOutboundEmailHistory, getInboundEmailHistory, sendEmailWithTemplate, getMessageDetails };
