//------------- Imports --------------------------------
// ####### packages ###########
import express from "express"

//####### custom files ###############

// ###### routes ####################
import { customerRouter } from "./Routes/customer.js";

//------------- server --------------------------------

const app = express();
// Middleware to parse JSON requests
app.use(express.json());

// ############# Routes #################
app.use("/customer" , customerRouter);

// ################ Start the server ###################
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});