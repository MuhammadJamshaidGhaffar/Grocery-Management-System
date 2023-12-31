//------------- Imports --------------------------------
// ####### packages ###########
import { Router } from "express";

//####### custom files ###############
import { mysqlPromisePool } from "../mysql_connection.js";

// ------- code -----------------------
export const acc_pRouter = Router();

acc_pRouter.get("/" , async (req , res) =>{
    try{
    const query = `select * from view_acc_p`;
    const [rows , fields ] = await mysqlPromisePool.query(query);
    return res.json(rows);
    }
    catch(err){
        return res.status(404).json({"message":err.message});
    }

})


acc_pRouter.get("/:id" , async (req , res) =>{
    try{
        const query = 'SELECT * FROM view_acc_p WHERE vendor_id = ?';
        const [rows, fields] = await mysqlPromisePool.query(query, [req.params.id]);
        
        return res.json(rows);
    }
    catch(err){
        return res.status(404).json({"message":err.message});
    }

})