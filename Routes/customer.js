//------------- Imports --------------------------------
// ####### packages ###########
import { Router } from "express";

//####### custom files ###############
import { mysqlPromisePool } from "../mysql_connection.js";

// ------- code -----------------------
export const customerRouter = Router();

customerRouter.get("/" ,async (req , res)=>{
    const [rows , fields ] = await mysqlPromisePool.query("select * from customer join acc_r on customer.id = acc_r.customer_id");
    return res.json(rows)
})

customerRouter.get("/:id" , async (req , res)=>{
    try{
    const [rows , fields ] = await mysqlPromisePool.query(`select * from customer where id=${req.params.id}`);
    return res.json(rows)
    }
    catch(err){
        res.status(404).json({"message":err.message});
    }
})

customerRouter.post("/" , async (req , res) =>{
    const customer = req.body; 

    try{
        const query = `insert into customer (Name , City , Contact , CreditLimit ) values  ( "${customer.name}" , "${customer.city}" , "${customer.contact}" , "${customer.creditLimit}" )`;
        const [rows , fields ] = await mysqlPromisePool.query(query);
        return res.status(200).end();
    }
    catch(err){
        return res.status(404).json({"message":err.message});
    }    
})

