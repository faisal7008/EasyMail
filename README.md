# EasyMail

## Overview

This application is a communication platform that allows users to log in using Google OAuth, view their communication history, and interact with the Postmarkapp.com API for email communication. The system is built on a microservices architecture, with a Node.js backend providing the necessary API endpoints and a React frontend for the user interface.

## Backend Microservices (Node.js)

### 1. User Authentication

#### Endpoint: `/auth/google`

- **Method:** `GET`
- **Description:** Initiates the Google OAuth process for user authentication.

#### Endpoint: `/auth/google/callback`

- **Method:** `GET`
- **Description:** Handles the callback after Google OAuth authentication. Redirects to the client URL upon success, or `/auth/error` upon failure.

#### Endpoint: `/auth/success`

- **Method:** `GET`
- **Description:** Handles successful user authentication. Creates a new user if not exists and responds with a success message and user details.

#### Endpoint: `/auth/failed`

- **Method:** `GET`
- **Description:** Handles failed user authentication. Responds with an unauthorized message.

#### Endpoint: `/auth/profile`

- **Method:** `GET`
- **Description:** Retrieves the user's profile information if authenticated.

#### Endpoint: `/auth/logout`

- **Method:** `GET`
- **Description:** Logs out the user and redirects to the client URL.

### 2. Email Communication

#### Endpoint: `/mails/send-email`

- **Method:** `POST`
- **Description:** Sends emails using the Postmarkapp.com API. Requires parameters such as recipient, subject, and body.

#### Endpoint: `/mails/sent`

- **Method:** `GET`
- **Description:** Retrieves the user's outbound email history.

#### Endpoint: `/mails/received`

- **Method:** `GET`
- **Description:** Retrieves the user's inbound email history.

#### Endpoint: `/mails/:messageId`

- **Method:** `GET`
- **Description:** Retrieves details of a specific email message.

#### Endpoint: `/mails/send-email-with-template`

- **Method:** `POST`
- **Description:** Sends emails using Postmark templates for different email types (Onboarding, Marketing, Transactional, User Engagement).

## How to Run the Application

1. Clone the repository.
2. Set up the backend microservice by navigating to the backend directory and running "npm install" followed by "npm start".
3. Set up the frontend by navigating to the frontend directory and running "npm install" followed by "npm run dev".
4. Access the application through the provided URL.

## Technologies Used

- Node.js
- Express
- MongoDB
- React
- TailwindCSS
- Google OAuth (Passport)
- Postmarkapp.com API

## Contributors

- Mohammed Faisal Hussain
