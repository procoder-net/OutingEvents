-\> npm install

-\> npm run cli (client npm install)

-\> npm run sei (server npm install)

-\> npm run start

-\> http://localhost:1234 (react App)

-\> http://localhost:3000 (server)

Server is running on Express with Typescript in node.

-\> GraphIQL Playground http://localhost:3000/graphql

![Screen Shot 2019-03-20 at 10 26 45 PM](https://user-images.githubusercontent.com/5413258/54734798-79443400-4b5f-11e9-9a2c-ea25a4243485.png)

-> PostGres setup
https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
Install postgres, it will ask you to go through the installation process and will ask for a super user password. Make sure you remember that password as it will be useful. 

Use the following command to open a commandline interface:
```
psql -U postgres -h localhost -p 5432
```
Execute the following queries to create database:
```
CREATE DATABASE outingevents
```
We will come back to editing the database, but first in .bash_profile, include the following:
```
PGUSER={your postgres user}
PGDATABASE=outingevents
PGPASSWORD={super user password}
```
You can also define port and host, but those are 5432 and localhost by default. 

NOTE: You can continue using the command line, or psequel for a GUI: http://www.psequel.com/
Psequel will ask for your username, password, database, port, host. 
Execute the following query to create the table(s): 
```
NOTE: this table is temporary, will replace with actual schema 
CREATE TABLE example_table (
    name VARCHAR
)
```
Test the apis by calling the following:
```
POST https://localhost:3000/api
GET https://localhost:3000/api
```
You should get back elements in the database.
