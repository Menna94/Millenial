import mongoose from 'mongoose'

const DBConnection = async()=>{
    try{
        const conn = await mongoose.connect('mongodb+srv://menna:menna1234@cluster0.m8yke.mongodb.net/millenial?retryWrites=true&w=majority', {
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true
        })
        console.log(`DB CONNECTED: ${conn.connection.host}`);
    }catch(err){
        console.log(`ERROR IN CONNECTION : ${err.message}`);
        process.exit(1);
    }
}

export default DBConnection;