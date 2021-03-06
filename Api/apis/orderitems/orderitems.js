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





ordersItemsRoute.get('/allDetails/:id', function(req, res) {

    const data = [];


    knex.raw(`select * from orders, customer where orders.customerid = customer.customerid and orders.orderid='${req.params.id}';`).then(data1=>{
       

        knex.raw(`select 

        orderitems.orderitemid,
        orderitems.orderid,
        orderitems.itemid,
        orderitems.quantity,
        item.name,
        item.price,
        (item.price*orderitems.quantity)total
    
    from orderitems, item where orderitems.itemid=item.itemid and orderitems.orderid='${req.params.id}';`).then(data2=>{
        data.push({
            "orders": data1.rows,
            "orderItems": data2.rows
            
        })
        console.log(data);
        res.json(data);
    })
        
    })
});







ordersItemsRoute.get('/data/:id', function(req, res) {
    knex.select('*').from('orderitems').where('orderitemid', '=', req.params.id).then(function(data) {
        res.json(data);
    });
});






ordersItemsRoute.post('/update/:id', function(req,res) {


    const data =[];

    const { orderitemid, orderid, itemid, quantity }=req.body;

    let iteartions=(req.body.OrderItems.length);

    for(let x=0;x<(iteartions);x++)
    {
       
        let id = req.body.OrderItems[x].orderitemid
        if(id)
        {
            knex.transaction(trx=>{

                trx.update({
                    'itemid': req.body.OrderItems[x].itemid,
                    'quantity': req.body.OrderItems[x].quantity
        
                }).where('orderitemid', '=', id).into('orderitems').returning('*')
                .then(trx.commit)
                .catch(trx.rollback)
            })
        }

        else
        {
            data.push({
                "orderid": req.body.orders[0].orderid,
                "itemid": req.body.OrderItems[x].itemid,
                "quantity": req.body.OrderItems[x].quantity
            })
        }
    }

    console.log(data)

    knex.transaction(trx => {
        trx.insert(data).returning('*').into('orderitems').then(function(data) {
            //res.json(data);
            
        })
        .then(trx.commit)
        .catch(trx.rollback)
    });

    iteartions=(req.body.Delete.length);
    console.log(iteartions)
    for(let x=0;x<(iteartions);x++)
    {
        let id = req.body.Delete[x].delete
        console.log(id)
        knex.raw(`delete from orderitems where orderitemid=${id};`).then(function(data) {
        })
    }

    res.json({messages: "your record is successfully update"})
   
});





ordersItemsRoute.delete('/delete/:orderItemId', function(req, res) {

    const { itemid } =req.body;

    knex.raw(`delete from orderitems where orderitemid='${req.params.orderItemId}';`)
    .then(function(data) {

        res.json(data)
        
        // res.json({messages: "record is delete successfully"})
    });
});



module.exports = ordersItemsRoute;