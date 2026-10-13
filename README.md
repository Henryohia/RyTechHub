# RyTechHub CRM

# Overview

RyTechHub CRM is a command-line demonstration of a small-business customer relationship management system backed by MongoDB Atlas. The program uses the MongoDB Node.js driver to connect to the cloud database, create customer and sales collections, and demonstrate adding, reading, updating, and deleting customer records.

The project is intended to build practical experience integrating a Node.js program with a cloud-hosted NoSQL database. Run it from the project directory with `npm start`. The demonstration writes a sample customer and sale to the database, updates the customer, and deletes that customer. Review the demo code before running it against a database containing data you care about.

[Software Demo Video](http://youtube.link.goes.here)

# Cloud Database

The project uses MongoDB Atlas, a hosted MongoDB document database. MongoDB stores records as BSON documents in collections rather than rows in relational tables.

The database contains two collections:

* `customers` stores a customer's name, email, phone number, company, status, and creation/update timestamps.
* `sales` stores the associated `customerId`, product or service, amount, sale date, status, and timestamps.

Each sale's `customerId` refers to the customer's MongoDB ID represented as a string. The CRM module demonstrates inserting customer and sale documents, retrieving a customer by ID and listing customers and related sales, modifying a customer, and deleting a customer.

## Configure and check the connection

1. Create a MongoDB Atlas cluster and a database user in **Security → Database Access**. The Atlas website login is separate from the database user credentials.
2. Allow your current IP address in **Security → Network Access**.
3. Copy `.env.example` to `.env` in the project root. Replace the URI placeholders with the Atlas connection string, database username, and database user's password. URL-encode special characters in the password. Never commit or share `.env`.
4. Install dependencies with `npm install`.
5. Run `npm run db:check`. This sends only a read-only ping; it does not insert or delete records.
6. After the ping succeeds, run `npm start` to execute the sample CRUD demonstration.

If the ping reports a Node DNS lookup problem, check the DNS servers reported by Node. Windows can show the active adapter's DNS servers with:

```powershell
Get-DnsClientServerAddress -AddressFamily IPv4
```

If Windows resolves Atlas but Node's resolver does not, a working resolver address can be set in `.env` as a comma-separated `MONGODB_DNS_SERVERS` value. This setting is optional and machine/network specific.

# Development Environment

The project uses Visual Studio Code, Node.js, npm, MongoDB Atlas, Git, and the MongoDB Node.js driver. It is written in JavaScript and uses `dotenv` to load local environment variables.

# Useful Websites

* [MongoDB Atlas](https://www.mongodb.com/atlas)
* [MongoDB documentation](https://www.mongodb.com/docs/)
* [MongoDB Node.js driver documentation](https://www.mongodb.com/docs/drivers/node/current/)
* [Node.js documentation](https://nodejs.org/docs/)
* [dotenv documentation](https://github.com/motdotla/dotenv)

# Future Work

* Add a web interface for customer management.
* Add input validation and safer handling for linked sales when deleting a customer.
* Add user authentication and role-based access.
* Add customer interaction history and sales reporting.
* Replace the sample video link with a project demonstration.
