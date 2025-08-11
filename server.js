
import dotenv from "dotenv";
dotenv.config();
import cloudinary from "cloudinary";


import app from "./app.js";

cloudinary.v2.config({
    cloud_name: 'dnfqytupo',
    api_key: '491139982637897',
    api_secret: 'g5f70Yr8brJb0ZsKOy66hCjSDI8',
})
app.listen(7676,()=>{
    console.log("server is running on port on 7676")
})