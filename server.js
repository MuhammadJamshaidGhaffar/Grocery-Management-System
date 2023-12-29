//------------- Imports --------------------------------
// ####### packages ###########
import express from "express"

//####### custom files ###############

// ###### routes ####################
import { customerRouter } from "./Routes/customer.js";
import { vendorRouter } from "./Routes/vendor.js";
import { purchaseInvoiceRouter } from "./Routes/purchase_invoice.js";

//------------- server --------------------------------

const app = express();
// Middleware to parse JSON requests
app.use(express.json());

// ############# Routes #################
app.use("/customer" , customerRouter);
app.use("/vendor" , vendorRouter);
app.use("/purchase_invoice" , purchaseInvoiceRouter);

// ################ Start the server ###################
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});