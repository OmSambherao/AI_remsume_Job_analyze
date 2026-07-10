const express = require ("express");
const cookieParser = require("cookie-parser");

const cors = require("cors");


const app= express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"https://ai-resume-job-analyze-frontend.onrender.com" , 
    credentials:true ,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'] 
}))



/*  all routes are imported here */ 




const authRouter = require ( './routes/auth.routes'); 
const interviewRouter = require ( './routes/interview.routes'); 


app.use( '/api/auth' , authRouter);
app.use( '/api/interview' , interviewRouter);


app.listen(3000)


module.exports = app ;
