import mongoose from "mongoose";
// const DB_URL = process.env.MONGODB_URI || "mongodb+srv://infotechgautam544:4Ht8HbUVkNYlyWw7@cluster0.ltbykur.mongodb.net/";
const DB_URL = "mongodb://localhost:27017/Himvedaa";
// const DB_URL = process.env.MONGODB_URI;

const DbConnection = async()=>{
    await mongoose.connect(DB_URL).then(()=>{   
        console.log("DB connected SuccessFully")
    }).catch(()=>{

        console.log("fail to establish the database connectionn")
    })  
}

 
export default DbConnection;