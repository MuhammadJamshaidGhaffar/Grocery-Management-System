//------------- Imports --------------------------------
// ####### packages ###########
import { Router } from "express";

//####### custom files ###############
import { mysqlPromisePool } from "../mysql_connection.js";

// ------- code -----------------------
export const vendorRouter = Router();

vendorRouter.get("/" ,async (req , res)=>{
    const [rows , fields ] = await mysqlPromisePool.query("select id , firstName , lastName , City , province , Contact  from vendor ");
    return res.json(rows)
})


vendorRouter.get("/:id" ,async (req , res)=>{
    const query = `select id ,firstName , lastName , City , province , Contact  from vendor  where vendor.id=${req.params.id}`;
    console.log(query);
    const [rows , fields ] = await mysqlPromisePool.query(query);
    return res.json(rows)
})

vendorRouter.post("/" , async (req , res) =>{
    console.log("Vendor Post called");
    const vendor = req.body; 

    try{
        const query = `insert into vendor (firstName , lastName , City , Province , Contact) values ("${vendor.firstName}" , "${vendor.lastName}" , "${vendor.city}" , "${vendor.province}" , "${vendor.contact}" )`;
        const [rows , fields ] = await mysqlPromisePool.query(query);
        
        vendor.products.forEach(async (product) => {
            const query1 = `update product set vendor_id = ${rows.insertId} where id = ${product.id}`;
            console.log(query1);
            const [rows1 , fields1 ] = await mysqlPromisePool.query(query1);
        });

        return res.status(200).end();
    }
    catch(err){
        return res.status(404).json({"message":err.message});
    }    
})

vendorRouter.put("/" , async (req , res) =>{
    const vendor = req.body; 

    try{
        const query = `update vendor set firstName = "${vendor.firstName}"  , lastName = "${vendor.lastName}" , City = "${vendor.city}" , Province = "${vendor.province}" , Contact = "${vendor.contact}" where id = ${vendor.id}`;
        console.log(query);
        const [rows , fields ] = await mysqlPromisePool.query(query);
        
        vendor.products.forEach(async (product) => {
            const query1 = `update product set vendor_id = ${vendor.id} where id = ${product.id}`;
            console.log(query1);
            const [rows1 , fields1 ] = await mysqlPromisePool.query(query1);
        });

        return res.status(200).end();
    }
    catch(err){
        return res.status(404).json({"message":err.message});
    }    
})