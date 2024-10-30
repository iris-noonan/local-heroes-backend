//!--- Requirements
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan')
const cors = require('cors')
// const veryifyToken = require('./middleware/verify-token')


//!--- Import Routers/Controllers
const jobsRouter = require('./controllers/jobs')
const usersRouter = require('./controllers/users')
const helperRouter = require('./controllers/helper')


mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// ! Middleware
app.use(cors({ origin: process.env.DOMAIN })) 
app.use(express.json())
app.use(morgan(process.env.ENVIRONMENT))

// Routes go here

app.use('/helpers', helperRouter)
app.use('/users', usersRouter);
app.use('/jobs', jobsRouter)




app.listen(3000, () => {
    console.log('The express app is ready!');
});
