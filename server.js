//------------- Imports --------------------------------
// ####### packages ###########
import express from "express"
import cors from "cors";

//####### custom files ###############

// ###### routes ####################
import { customerRouter } from "./Routes/customer.js";
import { vendorRouter } from "./Routes/vendor.js";
import { purchaseInvoiceRouter } from "./Routes/purchase_invoice.js";
import { productRouter } from "./Routes/product.js";
import { saleInvoiceRouter } from "./Routes/sale_invoice.js";
import { employeeRouter } from "./Routes/employee.js";

//------------- server --------------------------------

const app = express();

app.use(cors());
// Middleware to parse JSON requests
app.use(express.json());

// ############# Routes #################
app.use("/customer" , customerRouter);
app.use("/vendor" , vendorRouter);
app.use("/employee" , employeeRouter);
app.use("/purchase_invoice" , purchaseInvoiceRouter);
app.use("/sale_invoice" , saleInvoiceRouter);
app.use("/product" , productRouter);

// ################ Start the server ###################
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});