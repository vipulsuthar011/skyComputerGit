import express from 'express'
import { addQuotation, deleteQuotation, getQuotation, updateQuotation } from '../controllers/billController.js';

const billingRoutes=express()

billingRoutes.get('/getQuotation',getQuotation)
billingRoutes.post('/addQuotation',addQuotation)
billingRoutes.post('/deleteQuotation/:quotationId',deleteQuotation)
billingRoutes.post('/updateQuotation/:quotationId',updateQuotation)

export default billingRoutes;