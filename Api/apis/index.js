const express = require('express');
const apiRoute = express.Router();


const itemRoute=require('./ItemApi/ItemApi');
const customerRoute=require('./CustomerApi/CustomerApi');
const orderRoute=require('./orderApi/OrderApi');




apiRoute.use('/item', itemRoute);
apiRoute.use('/customer', customerRoute);
apiRoute.use('/order', orderRoute);




module.exports=apiRoute