//------------- Imports --------------------------------
// ####### packages ###########
import { Router } from "express";

//####### custom files ###############
import { mysqlPromisePool } from "../mysql_connection.js";

// ------- code -----------------------
export const vendorRouter = Router();

vendorRouter.get("/" ,async (req , res)=>{
    const [rows , fields ] = await mysqlPromisePool.query("select Name , City , Contact , product_id from vendor left join purchasereport on vendor.id = purchasereport.vendor_id");
    return res.json(rows)
})

vendorRouter.post("/" , async (req , res) =>{
    const vendor = req.body; 

    try{
        const query = `insert into vendor (Name , City , Contact) values ("${vendor.name}" , "${vendor.city}" , "${vendor.contact}" )`;
        const [rows , fields ] = await mysqlPromisePool.query(query);
        return res.status(200).end();
    }
    catch(err){
        return res.status(404).json({"message":err.message});
    }    
})

