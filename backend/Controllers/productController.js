import asyncHandler from '../Middleware/asyncHandler.js'
import Product from '../Models/ProductModel.js'


//@Desc   - Fetch all products
//@Route  - GET /api/products
//@access - Public
const getProducts = asyncHandler(async (req, res ) => {
    const products = await Product.find({})
    res.json(products)

})

//@Desc   - Fetch one product
//@Route  - GET /api/product/:_id
//@access - Public
const getProductById = asyncHandler(async (req, res ) => {
    const product = await Product.findById(req.params._id)
    
    if(product){
        return res.json(product);
    }else{
        res.status(404);
        throw new Error('Product not found...')
    }
})

export { getProductById, getProducts }
