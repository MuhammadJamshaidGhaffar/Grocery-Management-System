//------------- Imports --------------------------------
// ####### packages ###########
import { Router } from "express";
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
//####### custom files ###############
import { mysqlPromisePool } from "../mysql_connection.js";

dotenv.config();

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
        const query = `
            INSERT INTO employee 
            (firstName, lastName, City, Province, Contact, EStatus, CnicNo, salary)
            VALUES (?, ?, ?, ?, ?, 'active', ?, ?)`;
        console.log(query);
        const [rows , fields ] = await mysqlPromisePool.query(query, [
            employee.firstName,
            employee.lastName,
            employee.city,
            employee.province,
            employee.contact,
            employee.cnicNo,
            employee.salary
          ]);
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
        const query = `
        UPDATE employee
        SET 
          firstName = ?,
          lastName = ?,
          City = ?,
          Province = ?,
          Contact = ?,
          EStatus = ?,
          CnicNo = ?,
          salary = ?
        WHERE id = ?`;
        console.log(query);
        const [rows , fields ] = await mysqlPromisePool.query(query, [
            employee.firstName,
            employee.lastName,
            employee.city,
            employee.province,
            employee.contact,
            employee.eStatus,
            employee.cnicNo,
            employee.salary,
            employee.id
          ]);
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
// Sample route for login and generating a token
employeeRouter.post('/login', async (req, res) => {
    // Validate credentials (replace with your authentication logic)
    const {username , password } = req.body;
    // Use placeholders in the query
    const sql = 'SELECT id FROM employee WHERE username = ? AND password = ?';

    try{
        // Execute the query with parameters
        const [rows, fields] = await mysqlPromisePool.query(sql, [username, password]);
        console.log(rows);
        if (rows.length > 0) {
            // Generate a JWT
            const token = jwt.sign({ username }, process.env.AUTH_SECRET, { expiresIn: '1h' });
        
            // Save the token in the session
            req.session.token = token;
        
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }
    catch(err){
        res.status(401).json({ message: err.message });
    }
  });

