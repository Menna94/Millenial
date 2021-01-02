import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './modals/userModal.js'
import Product from './modals/productModal.js'
import Order from './modals/orderModal.js'
import DBConnection from './config/mongo.js'

dotenv.config();
DBConnection();

const importData = async ()=>{
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const admin = createdUsers[0]._id;

        const sampleProducts = products.map(product => {
            return{ ...product, user:admin}
        });
        await Product.insertMany(sampleProducts);

        console.log('Data Imported');
        process.exit();
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

const destroyData = async ()=>{
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

process.argv[2] === '-d' ? destroyData() : importData();
