import express from 'express'
// import { addQuotation, deleteQuotation, getQuotation, updateQuotation } from '../controllers/billController.js';
import {addCompanyDetail, getCompanyDetail,updateCompanyDetail} from '../controllers/companyDetailController.js'

const companyDetailRoutes=express()

// billingRoutes.get('/getQuotation',getQuotation)
companyDetailRoutes.get('/getCompanyDetail',getCompanyDetail)
companyDetailRoutes.post('/updateCompanyDetail',updateCompanyDetail)
companyDetailRoutes.post('/addCompanyDetail',addCompanyDetail)
// billingRoutes.post('/addQuotation',addQuotation)
// billingRoutes.post('/deleteQuotation/:quotationId',deleteQuotation)
// billingRoutes.post('/updateQuotation/:quotationId',updateQuotation)

export default companyDetailRoutes;