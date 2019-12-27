//this is use for employee type 

const express = require ('express');
const itemRoute = express.Router();

const config =require('../../config')
const knex = require('knex')(config.getDbDetails);




itemRoute.get('/',(req,res)=>{
    res.json("Employee Api is work properly");
});


itemRoute.post('/', function(req, res) {


    const { name, price }=req.body;

    req.body.EnteredDate = today;
    knex.transaction(trx => {
        trx.insert(req.body).returning('*').into('item').then(function(data) {
            res.json(data);
        })
        .then(trx.commit)
        .catch(trx.rollback)
    });

});


itemRoute.get('/allData', function(req, res) {
    knex.select('*').from('item').then(function(data) {
        res.json(data);
    });
});



itemRoute.get('/data/:id', function(req, res) {
    knex.select('*').from('item').where('itemid', '=', req.params.id).then(function(data) {
        res.json(data);
    });
});



itemRoute.post('/update/:id', function(req,res) {

    const { name, price }=req.body;

    knex.transaction(trx=>{

        trx.update({
            'name': name,
            'price': price

        }).where('itemid', '=', req.params.id).into('item').returning('*').then(data=>{
            res.json(data);
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
});


itemRoute.post('/delete/:itemId', function(req, res) {

    const { itemid } =req.body;

    knex.raw(`delete from item where itemid='${req.params.itemId}';`)
    .then(function(data) {
        
        res.json({messages: "record is delete successfully"})
    });
});



module.exports = itemRoute;