//this API is for store the detail of customer

const express = require ('express');
const customerRoute = express.Router();

const config =require('../../config')
const knex = require('knex')(config.getDbDetails);


customerRoute.get('/',(req,res)=>{
    res.json("Customer Api is work properly");
});




customerRoute.post('/', function(req, res) {


    const { name }=req.body;

    knex.transaction(trx => {
        trx.insert(req.body).returning('*').into('customer').then(function(data) {
            res.json(data);
        })
        .then(trx.commit)
        .catch(trx.rollback)
    });

});


customerRoute.get('/allData', function(req, res) {
    knex.select('*').from('customer').then(function(data) {
        res.json(data);
    });
});



customerRoute.get('/data/:id', function(req, res) {
    knex.select('*').from('customer').where('customerid', '=', req.params.id).then(function(data) {
        res.json(data);
    });
});


customerRoute.post('/update/:id', function(req,res) {

    const { name }=req.body;

    knex.transaction(trx=>{

        trx.update({
            'name': name,

        }).where('customerid', '=', req.params.id).into('customer').returning('*').then(data=>{
            res.json(data);
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
});



customerRoute.post('/delete/:customerId', function(req, res) {

    const { itemid } =req.body;

    knex.raw(`delete from customer where customerid='${req.params.customerId}';`)
    .then(function(data) {
        
        res.json({messages: "record is delete successfully"})
    });
});


module.exports = customerRoute;