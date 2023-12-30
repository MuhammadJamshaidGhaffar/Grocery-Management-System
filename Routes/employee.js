//------------- Imports --------------------------------
// ####### packages ###########
import { Router } from "express";

//####### custom files ###############
import { mysqlPromisePool } from "../mysql_connection.js";

// ------- code -----------------------
export const employeeRouter = Router();

// employeeRouter.get("/" ,async (req , res)=>{
//     console.log("GET /employee called");
//     const [rows , fields ] = await mysqlPromisePool.query("select * from customer left join acc_r on customer.id = acc_r.customer_id");
//     return res.json(rows)
// })

// employeeRouter.get("/:id" , async (req , res)=>{
//     try{
//     const [rows , fields ] = await mysqlPromisePool.query(`select * from customer where id=${req.params.id}`);
//     return res.json(rows)
//     }
//     catch(err){
//         res.status(404).json({"message":err.message});
//     }
// })

employeeRouter.post("/" , async (req , res) =>{
    const employee = req.body; 

    try{
        const query = `insert into employee (firstName , lastName , City , Province , Contact , EStatus , CnicNo , salary ) values ("${employee.firstName}" , "${employee.lastName}" , "${employee.city}" , "${employee.province}" , "${employee.contact}" , "active" , "${employee.cnicNo}" , ${employee.salary})`;
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
    "firstName":"Jamshaid",
    "lastName":"Ghaffar",
    "city":"Bahawalpur",
    "province":"punjab",
    "contact":"032432",
    "cnicNo" : "123123124",
    "salary" : 12312
} "creditLimit": 1000
}
*/

employeeRouter.put("/" , async (req , res) =>{
    const employee = req.body; 

    try{
        const query = `update employee set firstName="${employee.firstName}" , lastName="${employee.lastName}" , City="${employee.city}" , Province="${employee.province}" , Contact="${employee.contact}" , EStatus="${employee.eStatus}" , CnicNo="${employee.cnicNo}" , salary=${employee.salary} where id=${employee.id}`;
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
    "id":20,
    "firstName":"M.Jamshaid",
    "lastName":"Ghaffar",
    "city":"Bahawalpur",
    "province":"punjab",
    "contact":"032432",
    "cnicNo" : "123123124",
    "salary" : 12312,
    "eStatus":"active"
}
*/

