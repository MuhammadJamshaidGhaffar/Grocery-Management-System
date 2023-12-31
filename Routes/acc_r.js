//------------- Imports --------------------------------
// ####### packages ###########
import { Router } from "express";

//####### custom files ###############
import { mysqlPromisePool } from "../mysql_connection.js";

// ------- code -----------------------
export const acc_rRouter = Router();

acc_rRouter.get("/" , async (req , res) =>{
    try{
    const query = `select * from view_acc_r `;
    const [rows , fields ] = await mysqlPromisePool.query(query);
    return res.json(rows);
    }
    catch(err){
        return res.status(404).json({"message":err.message});
    }

})


acc_rRouter.get("/:id" , async (req , res) =>{
    try{
    const query = `select * from view_acc_r  where customer_id = ${req.params.id}`;
    const [rows , fields ] = await mysqlPromisePool.query(query);
    return res.json(rows);
    }
    catch(err){
        return res.status(404).json({"message":err.message});
    }

})