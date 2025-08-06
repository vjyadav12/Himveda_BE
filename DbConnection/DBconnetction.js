import mongoose from "mongoose";
const DB_URL = "mongodb+srv://infotechgautam544:4Ht8HbUVkNYlyWw7@cluster0.ltbykur.mongodb.net/" 
const DbConnection = async()=>{
    await mongoose.connect(DB_URL).then(()=>{
        console.log("DB connected SuccessFully")
    }).catch(()=>{
        console.log("fail to establish the database connection")
    })
}


export default DbConnection;