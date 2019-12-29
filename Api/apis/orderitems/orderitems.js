//this API is for orderitem

const express = require ('express');
const ordersItemsRoute = express.Router();

const config =require('../../config')
const knex = require('knex')(config.getDbDetails);




ordersItemsRoute.get('/',(req,res)=>{
    res.json("Orderitems Api is work properly");
});


ordersItemsRoute.post('/', function(req, res) {


    const { orderitemid, orderid, itemid, quantity }=req.body;


    knex.transaction(trx => {
        trx.insert(req.body).returning('*').into('orderitems').then(function(data) {
            res.json(data);
        })
        .then(trx.commit)
        .catch(trx.rollback)
    });

});


ordersItemsRoute.get('/allData', function(req, res) {
    knex.select('*').from('orderitems').then(function(data) {
        res.json(data);
    });
});



ordersItemsRoute.get('/data/:id', function(req, res) {
    knex.select('*').from('orderitems').where('orderitemid', '=', req.params.id).then(function(data) {
        res.json(data);
    });
});



ordersItemsRoute.post('/update/:id', function(req,res) {

    const { orderitemid, orderid, itemid, quantity }=req.body;

    knex.transaction(trx=>{

        trx.update({
            'orderid': orderid,
            'itemid': itemid,
            'quantity': quantity

        }).where('orderitemid', '=', req.params.id).into('orderitems').returning('*').then(data=>{
            res.json(data);
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
});


ordersItemsRoute.post('/delete/:orderId', function(req, res) {

    const { itemid } =req.body;

    knex.raw(`delete from orderitems where orderitemid='${req.params.orderId}';`)
    .then(function(data) {
        
        res.json({messages: "record is delete successfully"})
    });
});



module.exports = ordersItemsRoute;