# Freshmate Backend

Welcome to the backend repository for Freshmate! This backend server is built using Node.js to provide the necessary APIs for the Freshmate ecommerce website frontend.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Frontend Repository](#frontend-repository)
6. [Contributing](#contributing)
7. [License](#license)

## Introduction

The Freshmate backend is designed to handle various functionalities required by the frontend application, including user authentication, product management, and order processing. It provides RESTful APIs that communicate with the frontend to ensure seamless interaction with the database and other services.

## Features

- **User Authentication:** Secure endpoints for user registration, login, and authentication.
- **Product Management:** CRUD operations for managing products and categories.
- **Order Processing:** APIs for creating, updating, and retrieving orders.
- **Middleware Integration:** Utilizes middleware for error handling, authentication, and request validation.

## Installation

To run the Freshmate backend locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install dependencies by running `npm install`.
4. Create a `.env` file in the root directory of the project.
5. Add the following environment variables to the `.env` file:
   PORT=8000
   MONGODB=<your_mongodb_connection_string>
   TOKEN_SECRET=<your_token_secret>
   Replace `<your_mongodb_connection_string>` with your MongoDB connection string and `<your_token_secret>` with a secret key for JWT token generation.
6. Start the server by running `npm run watch`.
7. The server will be running on port 8000 by default.

## Usage

Once the backend server is running, it will be ready to handle requests from the Freshmate frontend application. Ensure that the frontend application is configured to communicate with the backend server (e.g., update API URLs).

## Frontend Repository

The frontend for Freshmate is hosted in a separate repository. You can find it [here](https://github.com/omar-a-eid/freshmate_front).

## Contributors ✨

<table>
  <tbody>
    <tr>
<td align="center" valign="top" width="14.28%"><a href="https://github.com/omar-a-eid"><img src="https://avatars.githubusercontent.com/u/103126348?v=4" alt="Omar Ahmed"/><br /><sub><b>Omar Ahmed</b></sub></a></td>
<td align="center" valign="top" width="14.28%"><a href="https://github.com/esraaeliba"><img src="https://avatars.githubusercontent.com/u/130110027?v=4" alt="Esraa Ahmed"/><br /><sub><b>Esraa Ahmed</b></sub></a></td>
<td align="center" valign="top" width="14.28%"><a href="https://github.com/SalmaYousry01"><img src="https://avatars.githubusercontent.com/u/112441530?v=4" alt="Salma Yousry"/><br /><sub><b>Salma Yousry</b></sub></a></td>
<td align="center" valign="top" width="14.28%"><a href="https://github.com/mostafa-fakhr"><img src="https://avatars.githubusercontent.com/u/153079695?v=4" alt="Mostafa Fakhr"/><br /><sub><b>Mostafa Fakhr</b></sub></a></td>
<td align="center" valign="top" width="14.28%"><a href="https://github.com/KarimMohamedDesouki"><img src="https://avatars.githubusercontent.com/u/153070580?v=4" alt="Karim Mohamed"/><br /><sub><b>Karim Mohamed</b></sub></a></td>
<td align="center" valign="top" width="14.28%"><a href="https://github.com/vodz1"><img src="https://avatars.githubusercontent.com/u/147009800?v=4" alt="Ahmed Adel"/><br /><sub><b>Ahmed Adel</b></sub></a></td>
    </tr>
  </tbody>
</table>

## License

This project is licensed under the MIT License.
