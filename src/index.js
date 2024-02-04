const express = require('express');
const db = require('../config/db');
const { verifyToken } = require("../middleware/auth");

require('dotenv').config();


const userroutes = require('../routes/userRoutes');


db.connectdb();
const app = express();
app.use(express.urlencoded({extended : false})); // for form data
app.use(express.json());    // for body json data


app.get('/', verifyToken , (req , res) => {
    res.send('jwt API Is Running.....')
})

app.use('/api/users' , userroutes)

const port = process.env.PORT;
app.listen(port , ()=> {
    console.log(`server is liseting at port: ${port}`);
})