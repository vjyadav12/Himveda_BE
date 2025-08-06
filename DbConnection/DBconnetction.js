import mongoose from "mongoose";
const DB_URL = "mongodb://localhost:27017/Himvedaa" 
const DbConnection = async()=>{
    await mongoose.connect(DB_URL).then(()=>{
        console.log("DB connected SuccessFully")
    })
}