import express from 'express'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import billingRoutes from './routes/billingRoutes.js'

const mainRoutes = express()

mainRoutes.use('/product',productRoutes)
mainRoutes.use('/user',userRoutes)
mainRoutes.use('/billing',billingRoutes)

export default mainRoutes