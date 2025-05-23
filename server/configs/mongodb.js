import mongoose from "mongoose";

const conectDB = async ()=>{
    mongoose.connection.on("connected",()=>console.log('Database Connected'))

    await mongoose.connect(`${process.env.MONGODB_URL}/lms`)
}

export default conectDB