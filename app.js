const express = require('express');
const app = express();
const axios = require('axios');
// const mongoose = require('mongoose')
const connect = require('./adapters/db/adapter_mongoDB');
const salesman_service = require('./services/service_salesman');
const PORT = 5000;

//parse form data
app.use(express.urlencoded({encoded: false}));
// parse json
app.use(express.json());


const router_generalData = require('./routes/route_generalData');
// const router_openCRX = require('./routes/openCRX')
// const router_orangeHRM = require('./routes/orangeHRM')

// const dbUrl = 'mongodb://localhost:27017/usersdb'

try {
    connect();  
    console.log('connected to db');
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}....`);
    })
    const user = require('./models/blog_generalData');
    salesman_service.saveEmployees();
    

} catch (error) {
    console.log(error);
}



app.use('/api/v1/salesman', router_generalData);
