const express = require('express')
const app = express();
const dotenv = require('dotenv')
const database = require('./database')
const cors = require('cors');

app.use(cors());

dotenv.config();


app.listen(process.env.PORT_THIS_SERVER, () =>  {
    console.log(`Server is running in port ${process.env.PORT_THIS_SERVER}`)
})


const routes = require('./routes')
app.use('/', routes)