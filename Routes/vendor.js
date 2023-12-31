//------------- Imports --------------------------------
// ####### packages ###########
import { Router } from "express";

//####### custom files ###############
import { mysqlPromisePool } from "../mysql_connection.js";

// ------- code -----------------------
export const vendorRouter = Router();

vendorRouter.get("/" ,async (req , res)=>{
    // const [rows , fields ] = await mysqlPromisePool.query("select id , firstName , lastName , City , province , Contact  from vendor ");
    const query = `select * from get_vendor`;
    const [rows , fields ] = await mysqlPromisePool.query(query);
    return res.json(rows)
})


vendorRouter.get("/:id" ,async (req , res)=>{
    // const query = `select id ,firstName , lastName , City , province , Contact  from vendor  where vendor.id=${req.params.id}`;
    // console.log(query);
    // const [rows , fields ] = await mysqlPromisePool.query(query);
    const query = 'SELECT * FROM get_vendor WHERE id = ?';
    const [rows, fields] = await mysqlPromisePool.query(query, [req.params.id]);

    return res.json(rows)
})

vendorRouter.post("/" , async (req , res) =>{
    console.log("Vendor Post called");
    const vendor = req.body; 

    try{
        const query = 'INSERT INTO vendor (firstName, lastName, City, Province, Contact) VALUES (?, ?, ?, ?, ?)';
        console.log(query);
        const [rows, fields] = await mysqlPromisePool.query(query, [
        vendor.firstName,
        vendor.lastName,
        vendor.city,
        vendor.province,
        vendor.contact
        ]);

        // const query = `call InsertOrUpdateVendor( NULL , "${vendor.firstName}" , "${vendor.lastName}" , "${vendor.city}" , "${vendor.province}" , "${vendor.contact}" ) `;
        // console.log(query);
        // const [rows , fields ] = await mysqlPromisePool.query(query);
        // console.log(rows);
        vendor.products.forEach(async (product) => {
            const query1 = 'UPDATE product SET vendor_id = ? WHERE id = ?';
            console.log(query1);
            const [rows1, fields1] = await mysqlPromisePool.query(query1, [rows.insertId, product.id]);

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
        const query = 'UPDATE vendor SET firstName = ?, lastName = ?, City = ?, Province = ?, Contact = ? WHERE id = ?';
        console.log(query);
        const [rows, fields] = await mysqlPromisePool.query(query, [
        vendor.firstName,
        vendor.lastName,
        vendor.city,
        vendor.province,
        vendor.contact,
        vendor.id
        ]);

        // const query = `call InsertOrUpdateVendor(${vendor.id}  , "${vendor.firstName}" , "${vendor.lastName}" , "${vendor.city}" , "${vendor.province}" , "${vendor.contact}" ) `;
        // console.log(query);
        // const [rows , fields ] = await mysqlPromisePool.query(query);
        
        vendor.products.forEach(async (product) => {
            const query1 = 'UPDATE product SET vendor_id = ? WHERE id = ?';
            console.log(query1);
            const [rows1, fields1] = await mysqlPromisePool.query(query1, [vendor.id, product.id]);

        });

        return res.status(200).end();
    }
    catch(err){
        return res.status(404).json({"message":err.message});
    }    
})