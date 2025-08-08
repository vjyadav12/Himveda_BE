import mongoose from "mongoose";
const DB_URL = process.env.MONGODB_URI;
const DbConnection = async()=>{
    await mongoose.connect(DB_URL).then(()=>{   
        console.log("DB connected SuccessFully")
    }).catch(()=>{

        console.log("fail to establish the database connectionn")
    })  
}

 
export default DbConnection;