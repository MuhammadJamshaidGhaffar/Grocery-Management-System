//------------- Imports --------------------------------
// ####### packages ###########
import express from "express"
import cors from "cors";
import morgan from "morgan";
import cron from "node-cron"
import session from "express-session";
import dotenv from 'dotenv';

//####### custom files ###############

// ###### routes ####################
import { customerRouter } from "./Routes/customer.js";
import { vendorRouter } from "./Routes/vendor.js";
import { purchaseInvoiceRouter } from "./Routes/purchase_invoice.js";
import { productRouter } from "./Routes/product.js";
import { saleInvoiceRouter } from "./Routes/sale_invoice.js";
import { employeeRouter } from "./Routes/employee.js";
import { acc_pRouter } from "./Routes/acc_p.js";
import { acc_rRouter } from "./Routes/acc_r.js";
import { checkToken } from "./auth.js";



//------------- server --------------------------------
dotenv.config();

const app = express();

app.use(cors());
// Middleware to parse JSON requests
app.use(express.json());
// Use morgan middleware to log HTTP requests
app.use(morgan('dev')); // 'dev' is a predefined format in morgan for colored output
// Use sessions
app.use(session({
  secret: process.env.AUTH_SECRET, // Replace with a secure secret key
  resave: false,
  saveUninitialized: true,
}));

app.use(checkToken);

// ############# Routes #################
app.use("/customer" , customerRouter);
app.use("/vendor" , vendorRouter);
app.use("/employee" , employeeRouter);
app.use("/purchase_invoice" , purchaseInvoiceRouter);
app.use("/sale_invoice" , saleInvoiceRouter);
app.use("/product" , productRouter);
app.use("/acc_p" , acc_pRouter);
app.use("/acc_r" , acc_rRouter);

// ################ Start the server ###################
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Schedule daily backup at 12 AM
cron.schedule('0 0 * * *', () => {
  console.log('Scheduling daily backup...');
  performBackup();
});