import express from 'express'
import { addProduct, deleteProduct, getProductByCategory, getProducts, updateProduct } from '../controllers/productController.js';
// import multer from 'multer';
// const upload=multer({dest:'uploads1'})

const productRoutes = express();
// const memoryUpload = multer().single('image');
productRoutes.get('/getProducts',getProducts)
productRoutes.get('/getProductsByCategory/:categoryId',getProductByCategory)
// productRoutes.post('/addProduct',verifyJwtToken,upload.single('image'),addProduct)
productRoutes.post('/addProduct',addProduct)
productRoutes.post('/deleteProduct/:productId',deleteProduct)
productRoutes.post('/updateProduct/:productId',updateProduct)

export default productRoutes