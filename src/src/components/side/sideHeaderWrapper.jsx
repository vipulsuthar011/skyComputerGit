import React, { useEffect, useState } from 'react'
import Header2 from '../header2/header2'
import SideBar from '../sideBar/sideBar'
import styles from './SideHeaderWrapper.module.css'
import { BrowserRouter, Route, Router, Routes, useNavigate } from "react-router-dom";
import AddItems from '../../pages/addItems/addItems';
import EditProduct from '../../pages/editItems/editProduct/editProduct';
import Profile from '../../pages/admin/profile/profile';
import Billing from '../../pages/billing/billing';
import CommingSoon from '../../pages/commingSoon/commingSoon';
import QuotationHistory from '../../pages/quotationHistory/quotationHistory';
import UpdateQuotaton from '../../pages/updateQuotation/updateQuotation';
import ClosedQuotation from '../../pages/closedQuotation/closedQuotation';

const SideHeaderWrapper = () => {
  const [sideView, setSideView] = useState(true)
  return (
    <div>
        <Header2 sideView={sideView} setSideView={setSideView}/>
        <SideBar sideView={sideView} setSideView={setSideView}/>
       <div className={`${sideView?styles.componentWrapperMax:styles.componentWrapperMin}`}>
          <Routes>
            <Route path='/addproduct/' element={<AddItems btnActive="addproduct"/>}/>
            <Route path='/editproduct/' element={<EditProduct/>}/>
            <Route path='/billing/' element={<Billing sideView={sideView} setSideView={setSideView}/>}/>
            <Route path='/updateQuotation/:quotationId' element={<UpdateQuotaton/>}/>
            <Route path='/profile/' element={<Profile/>}/>
            <Route path='/quotationhistory/' element={<QuotationHistory/>}/>
            <Route path='/closedquotation/' element={<ClosedQuotation/>}/>
            <Route path='/notification/' element={<CommingSoon/>}/>
            <Route path='/support/' element={<CommingSoon/>}/>
          </Routes>
       </div>
        
    </div>
  )
}

export default SideHeaderWrapper