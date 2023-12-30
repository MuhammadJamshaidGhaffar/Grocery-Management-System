//------------- Imports --------------------------------
// ####### packages ###########
import { Router } from "express";

//####### custom files ###############
import { mysqlPromisePool } from "../mysql_connection.js";

// ------- code -----------------------
export const purchaseInvoiceRouter = Router();

purchaseInvoiceRouter.get("/" ,async (req , res)=>{
    const [rows , fields ] = await mysqlPromisePool.query("select purchase_invoice.id , Date , firstName , lastName , Total.totalAmount   from purchase_invoice join vendor on purchase_invoice.vendor_id = vendor.id join (select purchase_invoice_id ,  sum(sp) as totalAmount from purchase_invoice_products join product on product_id=product.id group by purchase_invoice_id ) AS Total on purchase_invoice.id=Total.purchase_invoice_id ");
    return res.json(rows)
})

purchaseInvoiceRouter.get("/:id" , async (req , res)=>{
    try{
    const [rows , fields ] = await mysqlPromisePool.query(`select Date , Name as vendorName , mode from purchase_invoice join vendor on purchase_invoice.vendor_id = vendor.id where purchase_invoice.id =${req.params.id}`);
    const purchase_invoice = rows[0];
    // console.log(purchase_invoice);
    const [rows1 , fields1 ] = await mysqlPromisePool.query(`select * from purchase_invoice_products where purchase_invoice_id =${req.params.id}`);
    purchase_invoice.products = rows1.map(purchaseInvoiceProduct => {
        return {"product_id" : purchaseInvoiceProduct.product_id , "quantity" : purchaseInvoiceProduct.quantity };
    })
    // console.log(purchase_invoice);
    return res.json(purchase_invoice)
    }
    catch(err){
        res.status(404).json({"message":err.message});
    }
})

purchaseInvoiceRouter.post("/" , async (req , res) =>{
    const purchaseInvoice = req.body; 

    try{
        const query = `insert into purchase_invoice (Date , vendor_id , mode ) values ('${purchaseInvoice.date}' , ${purchaseInvoice.vendor_id} , '${purchaseInvoice.mode}'); `;
        const [rows , fields ] = await mysqlPromisePool.query(query);
        const purchase_invoice_id = rows.insertId;
        purchaseInvoice.products.forEach( async (product) => {
            const [rows1 , fields1 ] = await mysqlPromisePool.query(`insert into purchase_invoice_products values (${purchase_invoice_id}, ${product.id} , ${product.quantity});`);
        });
        return res.status(200).end();
    }
    catch(err){
        return res.status(404).json({"message":err.message});
    }    
})
/* example
{
    "date":"2023-10-3",
    "vendor_id":1,
    "mode":"cash",
    "products":[
        {
        "id":1,
        "quantity":10
    },
    {
        "id":2,
        "quantity":3
    }
    ]
}

*/
