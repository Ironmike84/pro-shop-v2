import dotenv from 'dotenv';
import express from 'express';
import { errorHandler, notFound } from './Middleware/errorMiddleware.js';
import productRoutes from './Routes/ProductRoutes.js';
import connectDB from './config/db.js';
dotenv.config({path: "../.env"})


const port = process.env.PORT || 5000

connectDB();

const app = express();  // Initialize express in a variable.

app.get('/', (req, res)=>{
    res.send('Api is Running')
});

app.use('/api/products', productRoutes)
app.use(notFound);
app.use(errorHandler)


app.listen(port, ()=> console.log(`Server is running on port ${port}`))