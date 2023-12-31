//------------- Imports --------------------------------
// ####### packages ###########
import { Router } from "express";

//####### custom files ###############
import { mysqlPromisePool } from "../mysql_connection.js";

// ------- code -----------------------
export const productRouter = Router();

productRouter.get("/" ,async (req , res)=>{
    const [rows , fields ] = await mysqlPromisePool.query("select * from get_product");
    return res.json(rows)
})

productRouter.get("/:id" , async (req , res)=>{
    try{
        const [rows, fields] = await mysqlPromisePool.query('SELECT * FROM get_product WHERE id = ?', [req.params.id]);
        return res.json(rows);
    }
    catch(err){
        res.status(404).json({"message":err.message});
    }
})

productRouter.post("/clothes" , async (req , res) =>{
    const product = req.body; 

    try{
        // const query = `insert into product (Name , pp , sp ) values ("${product.name}" , ${product.pp}, ${product.sp})`;
        // const [rows , fields ] = await mysqlPromisePool.query(query);
        // const query1 = `insert into clothes values (${rows.insertId} , "${product.season}" , "${product.category}")`;
        // const [rows1 , fields1 ] = await mysqlPromisePool.query(query1);
        const query = 'CALL InsertProductWithClothes(?, ?, ?, ?, ?)';
        const [rows, fields] = await mysqlPromisePool.query(query, [
            product.name,
            product.pp,
            product.sp,
            product.season,
            product.category
          ]);
        return res.status(200).end();
    }
    catch(err){
        return res.status(404).json({"message":err.message});
    }    
})
/*
{
    "name" : "testCloth",
    "pp" : 10 ,
    "sp" : 20,
    "season" : "Summer",
    "category" : "shirt"
}
*/

productRouter.post("/cosmetics" , async (req , res) =>{
    const product = req.body; 

    try{
        // const query = `insert into product (Name , pp , sp ) values ("${product.name}" , ${product.pp}, ${product.sp})`;
        // const [rows , fields ] = await mysqlPromisePool.query(query);
        // const query1 = `insert into cosmetics values (${rows.insertId} , "${product.brand}" , "${product.skinType}" , "${product.expiry}" , ${product.weight})`;
        // const [rows1 , fields1 ] = await mysqlPromisePool.query(query1);
        const query = 'CALL InsertProductWithCosmetics(?, ?, ?, ?, ?, ?, ?)';
        console.log(query);

        const [rows , fields ] = await mysqlPromisePool.query(query, [
            product.name,
            product.pp,
            product.sp,
            product.brand,
            product.skinType,
            product.expiry,
            product.weight
          ]);
        return res.status(200).end();
    }
    catch(err){
        return res.status(404).json({"message":err.message});
    }    
})

/*
{
    "name" : "testCosm1",
    "pp" : 10 ,
    "sp" : 20,
    "brand":"testB",
    "skinType":"testSkin",
    "expiry":"2023-10-02",
    "weight":10
}
*/

productRouter.post("/canned_food" , async (req , res) =>{
    const product = req.body; 

    try{
        // const query = `insert into product (Name , pp , sp ) values ("${product.name}" , ${product.pp}, ${product.sp})`;
        // const [rows , fields ] = await mysqlPromisePool.query(query);
        // const query1 = `insert into canned_food values (${rows.insertId} , "${product.expiry}" , ${product.weight} )`;
        // const [rows1 , fields1 ] = await mysqlPromisePool.query(query1);
        const query = 'CALL InsertProductWithCannedFood(?, ?, ?, ?, ?)';
        console.log(query);

        const [rows , fields ] = await mysqlPromisePool.query(query, [
            product.name,
            product.pp,
            product.sp,
            product.expiry,
            product.weight
          ]);
        return res.status(200).end();
    }
    catch(err){
        return res.status(404).json({"message":err.message});
    }    
})
/*
{
    "name" : "testCanned_food_1",
    "pp" : 10 ,
    "sp" : 20,
    "expiry":"2023-10-02",
    "weight":10
}
*/
productRouter.post("/toys" , async (req , res) =>{
    const product = req.body; 

    try{
        // const query = `insert into product (Name , pp , sp ) values ("${product.name}" , ${product.pp}, ${product.sp})`;
        // const [rows , fields ] = await mysqlPromisePool.query(query);
        // const query1 = `insert into toys values (${rows.insertId} , ${product.age_restriction} )`;
        // const [rows1 , fields1 ] = await mysqlPromisePool.query(query1);
        const query = 'CALL InsertProductWithToys(?, ?, ?, ?)';
        const [rows , fields ] = await mysqlPromisePool.query(query , [
            product.name,
            product.pp,
            product.sp,
            product.age_restriction
          ]);
        return res.status(200).end();
    }
    catch(err){
        return res.status(404).json({"message":err.message});
    }    
})
/*
{
    "name" : "test_toys_1",
    "pp" : 10 ,
    "sp" : 20,
    "age_restriction": 20
}
*/

