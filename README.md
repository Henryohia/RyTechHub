# Overview

RyTechHub CRM is a command-line Customer Relationship Management application designed to help small businesses organize customer information and manage sales records using a cloud database. The application is built with JavaScript and Node.js and connects to MongoDB Atlas to store and manage data remotely.

The application demonstrates the main database operations: creating, retrieving, updating, and deleting customer records. It also manages sales records associated with customers. To use the program, configure the MongoDB Atlas connection through environment variables, install the project dependencies, verify the database connection, and run the application from the terminal. The program executes sample database operations to demonstrate how customer and sales information can be managed.

I developed this software to strengthen my skills in cloud database integration, JavaScript programming, asynchronous operations, and database management. I wanted to understand how applications communicate with cloud-hosted databases and how related collections can be used to organize business information. This project provides a foundation for expanding the CRM into a more complete customer and sales management system.

[Software Demo Video](http://youtube.link.goes.here)

The demonstration video will show the application running in the terminal, walk through the main source-code files, explain the database operations, and display the customer and sales collections in MongoDB Atlas.

# Cloud Database

This project uses **MongoDB Atlas**, a cloud-hosted NoSQL database service. MongoDB stores information in documents organized into collections rather than traditional relational tables. The application connects to the database using the MongoDB Node.js driver.

The database contains two main collections:

- **customers:** Stores customer information, including name, email, phone number, company, and customer status. Each customer document has a unique identifier and may include creation and update timestamps.
- **sales:** Stores sales information, including the associated customer ID, product or service, sale amount, sale date, and sale status. The `customerId` field connects each sales record to its corresponding customer.

The application demonstrates the four main database operations:

- **Create:** Insert customer and sales records.
- **Read:** Retrieve customer records, search for a customer by ID, and retrieve sales associated with a customer.
- **Update:** Modify existing customer information.
- **Delete:** Remove a customer record.

Using two related collections demonstrates how customer information and sales data can be organized and accessed through a cloud database.

# Development Environment

The software was developed using the following tools and technologies:

- **Visual Studio Code:** Used to write and manage the source code.
- **Node.js:** Provides the runtime environment for the application.
- **JavaScript:** Used to implement the application logic.
- **MongoDB Atlas:** Hosts the cloud database.
- **MongoDB Node.js driver:** Connects the application to MongoDB and performs database operations.
- **dotenv:** Loads configuration values from environment variables stored in a local `.env` file.
- **npm:** Manages project dependencies and scripts.
- **Git and GitHub:** Used for version control and source-code hosting.
- **PowerShell:** Used to execute commands and run the application.

The application uses asynchronous JavaScript functions to perform database operations and includes error handling for connection and database-related problems. Sensitive database credentials are stored in environment variables rather than directly in the source code.

# Useful Websites

- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [MongoDB Node.js Driver Documentation](https://www.mongodb.com/docs/drivers/node/current/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [npm Documentation](https://docs.npmjs.com/)
- [dotenv Documentation](https://github.com/motdotla/dotenv)
- [GitHub Documentation](https://docs.github.com/)

# Future Work

- Develop a web-based interface to make customer and sales management easier.
- Add input validation and improve error handling.
- Improve customer search and filtering functionality.
- Implement user authentication and role-based access control.
- Add customer interaction tracking for calls, meetings, and follow-ups.
- Create sales reports and summary dashboards.
- Improve how related sales records are handled when a customer is deleted.
- Add automated tests for database operations.
- Record and publish the final software demonstration video.
