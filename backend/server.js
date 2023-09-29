import dotenv from 'dotenv';
import express from 'express';
import products from '../backend/products.js';
import connectDB from './config/db.js';
dotenv.config({path: "../.env"})
const port = process.env.PORT || 5000

connectDB();

const app = express();  // Initialize express in a variable.

app.get('/', (req, res)=>{
    res.send('Api is Running')
})

app.get('/api/products', (req, res)=>{
    res.json(products)
})

app.get('/api/products/:id', (req, res)=>{
    const product = products.find((product)=> product._id === req.params.id)
    res.json(product);
})

app.listen(port, ()=> console.log(`Server is running on port ${port}`))