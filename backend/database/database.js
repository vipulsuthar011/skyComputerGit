import mongoose from 'mongoose'
const connectString = 'mongodb+srv://techiteasy1905:techiteasy%40123@menuscanner.zatf8sc.mongodb.net/menuscanner?retryWrites=true&w=majority'

mongoose.set("strictQuery", false);
const connectToDatabase = async()=>{
    await mongoose.connect(connectString,{ useNewUrlParser: true, useUnifiedTopology: true })
    console.log("database connect successfully")
}

export default connectToDatabase