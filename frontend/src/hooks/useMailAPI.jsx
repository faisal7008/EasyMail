import { useState } from 'react';
import axios from 'axios';
import { useMessageContext } from '../context/MessageContext';

const useMailAPI = () => {
  const {messages, setMessages, isLoading, setIsLoading } = useMessageContext()
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const sendEmail = async (emailData) => {
    try {
      const response = await axios.post(`${API_URL}/mails/send-email`, emailData);
      return response.data;
    } catch (error) {
      console.error('Error sending email:', error.response.data);
      setError(error.response.data.error || 'An error occurred while sending email.');
      throw error; 
    }
  };

  const getSentEmails = async (queryParams) => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${API_URL}/mails/sent`, { params: queryParams });
      setMessages(response.data.Messages) 
      return response.data;
    } catch (error) {
      console.error('Error retrieving outbound email history:', error.response.data);
      setError(error.response.data.error || 'An error occurred while retrieving outbound email history.');
      throw error;
    } finally {
        setIsLoading(false)
    }
  };

  const getRecievedEmails = async (queryParams) => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${API_URL}/mails/recieved`, { params: queryParams });
      setMessages(response.data.InboundMessages)
      return response.data;
    } catch (error) {
      console.error('Error retrieving inbound email history:', error.response.data);
      setError(error.response.data.error || 'An error occurred while retrieving inbound email history.');
      throw error;
    } finally {
        setIsLoading(false)
    }
  };

  const getMessageByID = async (messageId) => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${API_URL}/mails/${messageId}`);
      return response.data;
    } catch (error) {
      console.error('Error retrieving message by id:', error.response.data);
      setError(error.response.data.error || 'An error occurred while retrieving message by id.');
      throw error;
    } finally {
        setIsLoading(false)
    }
  };

  const sendEmailWithTemplate = async (templateData) => {
    try {
      const response = await axios.post(`${API_URL}/mails/send-email-with-template`, templateData); 
      return response.data;
    } catch (error) {
      console.error('Error sending email with template:', error.response.data);
      setError(error.response.data.error || 'An error occurred while sending email with template.');
      throw error;
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    sendEmail,
    getSentEmails,
    getRecievedEmails,
    sendEmailWithTemplate,
    getMessageByID,
    error,
    clearError,
    isLoading,
    messages,
  };
};

export default useMailAPI;
