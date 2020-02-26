//this API is for orderitem

const express = require ('express');
const ordersItemsRoute = express.Router();

const config =require('../../config')
const knex = require('knex')(config.getDbDetails);




ordersItemsRoute.get('/',(req,res)=>{
    res.json("Orderitems Api is work properly");
});


ordersItemsRoute.post('/', function(req, res) {


    const data =[];
  


    const { orderitemid, orderid, itemid, quantity }=req.body;

    console.log(req.body.orders[0])

    let iteartions=(req.body.OrderItems.length);

    console.log(iteartions)

    for(let x=0;x<(iteartions);x++)
    {
        
        data.push({
            "orderid": req.body.orders[0].orderid,
            "itemid": req.body.OrderItems[x].itemid,
            "quantity": req.body.OrderItems[x].quantity
        })
        
    }

            
    knex.transaction(trx => {
        trx.insert(data).returning('*').into('orderitems').then(function(data) {
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