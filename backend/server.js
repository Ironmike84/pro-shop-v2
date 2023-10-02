import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import { errorHandler, notFound } from './Middleware/errorMiddleware.js';
import productRoutes from './Routes/ProductRoutes.js';
import userRoutes from './Routes/UserRoutes.js';
import connectDB from './config/db.js';

dotenv.config({path: "../.env"})
const port = process.env.PORT || 5000
connectDB();

const app = express();  // Initialize express in a variable.

//Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Cookie Parser
app.use(cookieParser())

// Routes
app.get('/', (req, res)=>{
    res.send('Api is Running')
});
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

// Error Handling
app.use(notFound);
app.use(errorHandler)


app.listen(port, ()=> console.log(`Server is running on port ${port}`))