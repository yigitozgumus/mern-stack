# Mern Stack tutorial 

This project is a kind of tutorial to explore the MERN Stack and how to create an web app using 
Node.js, React, and MongoDB. 

Backend part is written with Node.js and frontend is written with React. I am keeping this repository 
as a sort of blueprint for what a minimal pipeline would look like as a reference for future project.

## How to run the project

### Backend

- For backend, you have to create an **.env** file and add the mongoDB database connection string. 
Since I used MongoDB Atlas which is a cloud version of MongoDB that you can create a working database very intuitively, the environment variable is **ATLAS_URI**

```bash
cd backend
echo "ATLAS_URI='connection_string'" > .env
```

- To start the backend, run the commands below from the root:

```bash
cd backend
npm install
nodemon server
```

### Frontend

- To run the React app, run the commands below from the root:

```bash
npm install
npm run start
```

