//------------- Imports --------------------------------
// ####### packages ###########
import { Router } from "express";

//####### custom files ###############
import { mysqlPromisePool } from "../mysql_connection.js";

// ------- code -----------------------
export const customerRouter = Router();

customerRouter.get("/" ,async (req , res)=>{
    console.log("GET /customer called");
    // const [rows , fields ] = await mysqlPromisePool.query("select * from customer left join acc_r on customer.id = acc_r.customer_id");
    const query = `select * from view_all_cusotmers`;
    const [rows , fields ] = await mysqlPromisePool.query(query);
    return res.json(rows)
})

customerRouter.get("/:id" , async (req , res)=>{
    try{
    // const [rows , fields ] = await mysqlPromisePool.query(`select * from customer where id=${req.params.id}`);
    const query = `select * from view_all_cusotmers where id=${req.params.id}`;
    const [rows , fields ] = await mysqlPromisePool.query(query);
    return res.json(rows)
    }
    catch(err){
        res.status(404).json({"message":err.message});
    }
})

customerRouter.post("/" , async (req , res) =>{
    const customer = req.body; 

    try{
        // const query = `insert into customer (firstName, lastName , City , Province, Contact  , CreditLimit ) values  ( "${customer.firstName}" , "${customer.lastName}" , "${customer.city}" , "${customer.province}" , "${customer.contact}" , "${customer.creditLimit}" )`;
        // console.log(query);
        // const [rows , fields ] = await mysqlPromisePool.query(query);
        const query  = `call InsertOrUpdateCustomer( NULL , "${customer.firstName}" , "${customer.lastName}" , "${customer.city}" , "${customer.province}" , "${customer.contact}" , "${customer.creditLimit}" ) `;
        console.log(query);
        const [rows , fields ] = await mysqlPromisePool.query(query);
        return res.status(200).end();
    }
    catch(err){
        return res.status(404).json({"message":err.message});
    }    
})
/*
{
    "firstName" :"Jam",
    "lastName":"lsdf",
    "city":"bwp",
    "province":"punjab",
    "contact": "00",
    "creditLimit": 1000
}
*/

customerRouter.put("/" , async (req , res) =>{
    const customer = req.body; 
    console.log(customer);

    try{
        // const query = `update customer set firstName="${customer.firstName}" , lastName="${customer.lastName}" , City="${customer.city}" , Province="${customer.province}" , Contact="${customer.contact}"  , CreditLimit=${customer.creditLimit} where id=${customer.id} `;
        // console.log(query);
        // const [rows , fields ] = await mysqlPromisePool.query(query);
        const query  = `call InsertOrUpdateCustomer(${customer.id}  , "${customer.firstName}" , "${customer.lastName}" , "${customer.city}" , "${customer.province}" , "${customer.contact}" , "${customer.creditLimit}" ) `;
        console.log(query);
        const [rows , fields ] = await mysqlPromisePool.query(query);
        return res.status(200).end();
    }
    catch(err){
        return res.status(404).json({"message":err.message});
    }    
})

