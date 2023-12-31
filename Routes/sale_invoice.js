//------------- Imports --------------------------------
// ####### packages ###########
import { Router } from "express";

//####### custom files ###############
import { mysqlPromisePool } from "../mysql_connection.js";

// ------- code -----------------------
export const saleInvoiceRouter = Router();

saleInvoiceRouter.get("/" ,async (req , res)=>{
    // const [rows , fields ] = await mysqlPromisePool.query("select sale_invoice.id , Date , firstName , lastName , Total.totalAmount   from sale_invoice join customer on sale_invoice.customer_id = customer.id left join (select sale_invoice_id ,  sum(sp) as totalAmount from sale_invoice_products join product on product_id=product.id group by sale_invoice_id ) AS Total on sale_invoice.id=Total.sale_invoice_id ");
    const query = `select * from viewsaleinvoice`;
    const [rows , fields ] = await mysqlPromisePool.query(query);
    return res.json(rows)
})

saleInvoiceRouter.get("/:id" , async (req , res)=>{
    try{
    // const [rows , fields ] = await mysqlPromisePool.query(`select Date , Name as vendorName , mode from purchase_invoice join vendor on purchase_invoice.vendor_id = vendor.id where purchase_invoice.id =${req.params.id}`);
    // const purchase_invoice = rows[0];
    const query = `select * from viewsaleinvoice where id=${req.params.id}`;
    const [rows , fields ] = await mysqlPromisePool.query(query);
    const sale_invoice = rows[0];
    // console.log(purchase_invoice);
    const [rows1 , fields1 ] = await mysqlPromisePool.query(`select * from sale_invoice_products where sale_invoice_id =${req.params.id}`);
    sale_invoice.products = rows1.map(saleInvoiceProduct => {
        return {"product_id" : saleInvoiceProduct.product_id , "quantity" : saleInvoiceProduct.quantity };
    })
    // console.log(purchase_invoice);
    return res.json(sale_invoice)
    }
    catch(err){
        res.status(404).json({"message":err.message});
    }
})

saleInvoiceRouter.post("/" , async (req , res) =>{
    const saleInvoice = req.body; 

    try{

        //--------- checking if product exists -------------
        for(const product of saleInvoice.products){
            const getProductsQuantityQuery = `select id , quantity from product where id=${product.id}`;
            const [productQuantityRows , productsQuantityFields ] = await mysqlPromisePool.query(getProductsQuantityQuery);
            const fetchedProduct = productQuantityRows[0];
            // console.log(fetchedProduct);
            if(fetchedProduct.quantity < product.quantity){
                return res.status(404).json({"message" : `Product not available.\nproduct id = ${product.id} , Requested Quanity=${product.quantity}  , Available Quantity = ${fetchedProduct.quantity}`})
            }
        }

        //--------------- creating sale invoice -------------------------
        const query = `insert into sale_invoice (Date , customer_id , mode ) values ('${saleInvoice.date}' , ${saleInvoice.customer_id} , '${saleInvoice.mode}'); `;
        const [rows , fields ] = await mysqlPromisePool.query(query);
        const sale_invoice_id = rows.insertId;
        saleInvoice.products.forEach( async (product) => {
            const [rows1 , fields1 ] = await mysqlPromisePool.query(`insert into sale_invoice_products values (${sale_invoice_id}, ${product.id} , ${product.quantity});`);
        });
        return res.status(200).end();
    }
    catch(err){
        return res.status(404).json({"message":err.message});
    }    
})
/* example
{
    "date":"2023-10-02",
    "customer_id":1,
    "mode":"cash",
    "products":[
        {
            "id":1,
            "quantity":5
        },
        {
            "id":2,
            "quantity":10
        }
    ]

}

*/
