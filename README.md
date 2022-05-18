<p style="text-align: center; margin: 40px auto;"><img src="images/logo.png" width="150px" /></p>

# Cresh Backend Engineering Technical Tests - Javascript Flavor

This is a little challenge to help us assess your skills as a developer.

A particular attention will be taken to your Code Structure, your ability to implement the data model and organize the whole project.

## Context

At Cresh we provide credit at shopping cart, instantly.
We aim to ease the way consumers can get the products they want from any shop, both online and instore.

To do so, we provide several apps, both B2B and B2C along with some APIs.

## Instructions

We would like you to reproduce some (very simplified) functionalities related to our business model.

To realize this test you can use any of the node web application framework you are the most confortable with.

You will also need to choose a database to put and get your data from. We would prefer you to use a RDBMS for this test, but if you are more confortable with a NoSQL one like MongoDB, that's fine too.

We want you to implement a small API able to create and get some transactions customers have made shopping at some stores and interact with them.

A few key points :

- A customer can have several transactions ;
- A transaction must have as many instalments as its `split` attribute ;
- When a transaction is created, all its instalments are also generated based on the current date and the `split` attribute. Only the first payment is paid immediately, the transaction as a whole is not done yet ;
- When calculating each instalment amount, if you can't have an exact split, the remainder is to be added to the first one ;
- When all instalments of a transaction have been paid off, its `is_completed` flag must be switched to `true`.


### Data model

> Note: Relations between tables and default values are voluntarily left out for you to guess.

#### customers

Name | Type | Description
-|-|-
`id` | `integer` | Primary Key
`name` | `varchar(255)` | Name of the customer
`created_date` | `date` | Date of creation

#### transactions

Name | Type | Description
-|-|-
`id` | `integer` | Primary Key
`store_name` | `varchar(50)` | Name of the store where the transaction was made
`amount` | `integer` | Transaction's full amount, in cents
`split` | `integer` | Number of instalments for the transaction
`is_completed` | `boolean` | Have all instalments been paid off ?
`created_date` | `date` | Date of creation

#### instalments

Name | Type | Description
-|-|-
`id` | `integer` | Primary Key
`amount` | `integer` | Instalment amount, in cents
`is_paid` | `boolean` | Is the payment done yet
`planned_date` | `date` | Planned date of payment
`paid_date` | `date` | Actual payment date

### API Documentation

Route | Method | Query String | Body | Description
-|-|-|-|-
`/ping` | GET | - | - | See if the service is running properly, including the DB
`/customers` | GET | - | - | List of customers
`/customers` | POST | - | `name` | Create a customer
`/customers/:id/transactions` | GET | - | - | List of transactions for a specific customer
`/transactions` | POST | - | `store_name`<br />`amount`<br />`split`<br />`user_id` | Create a transaction
`/transactions/:id/instalments` | GET | - | - | List of a transaction's instalments
`/transactions/:id/instalments` | PUT | - | - | Trigger the payment of the transaction's next instalment


## What's evaluated

- Cleanliness & structure of the code
- Code extensibility
- Documentation
- Respect of KISS and DRY principles
- Use of git commits

## Bonus points

- Writing unittests
- Using Typescript
- Using containers for both the api and the database

## Deliverable

Please **clone** this repository and send us a zip or a link to your repo.

We expect :

- A clean files structure
- Some commands to run from the `package.json`
- A documentation on how to install, start and use this API



**Good luck and have fun !**

# Getting started

Make sure to have docker installed, otherwise docs.docker.com/get-docker will help you.

1. Clone the project
2. Install dependencies
```bash
  cd cresh-api && yarn install
```
3. Config environment variables
```bash
  cp .env.example .env
  cp docker.env.model docker.env
```
  edit docker.env and .env to match your environment
4. Start db container
```bash
  yarn docker:up
```
5. Initialize the database
```bash
   yarn init:db (create database and tables)
```
6. Start the server
```bash
  yarn start
```
7. Api is available at http://localhost:3000

## Other command
```bash
#Stop db container
  yarn docker:down
#watch mode
  yarn start:dev
#production mode
  yarn start:prod
#eslint
  yarn lint
#prettier
  yarn format
```
## Test
```bash
#launch test
  yarn test
#watch mode
  yarn test:watch
#test coverage
  yarn test:cov
```
