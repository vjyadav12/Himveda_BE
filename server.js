
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

app.listen(7676,()=>{
    console.log("server is running on port on 7676")
})