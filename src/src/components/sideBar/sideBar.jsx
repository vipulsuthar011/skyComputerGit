import React from 'react'
import styles from './sideBar.module.css'
// import Header2 from '../header2/header2'
import { faBottleWater, faBowlFood, faBurger, faCartPlus, faEnvelope, faFile, faFileInvoice, faFilePen, faHeadset, faMugSaucer, faPizzaSlice } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link,NavLink, useLocation } from 'react-router-dom'
// import Header from '../header/header'
// import Header2 from '../header2/header2'

const SideBar = ({ sideView, setSideView }) => {
  const location=useLocation();
  return (
    <div>
      {/* <Header2 sideView={sideView} setSideView={setSideView}/> */}
      <div className={`${sideView ? styles.sideBarMainWrapperMax : styles.sideBarMainWrapperMin}`}>
      <div className={`${sideView ? styles.logoSectionMax : styles.logoSectionMin}`}>
        {/* side bar including */}
        <div className={`${sideView ? styles.logoWrapperMax : styles.logoWrapperMin}`}><img src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/10/attachment_74455091-e1571114936278.png?auto=format&q=60&fit=max&w=930" alt="" className={styles.logo} /></div>
        <div className={`${sideView ? styles.restaurantNameMax : styles.restaurantNameMin}`}>SKY COMPUTER</div>
      </div>

        {/* Billing */}
        <Link to="/admin/billing/">
          <div className={` ${location.pathname === '/admin/billing/' && styles.active} ${sideView ? styles.elementWrapperMax : styles.elementWrapperMin}`}>
          <FontAwesomeIcon icon={faFileInvoice} className={` ml-2 ${styles.elementLogo}`} />
            <div className={`${sideView ? styles.elementNameMax : styles.elementNameMin}`}>Quotation</div>
          </div>
        </Link>
        {/* Quotation History */}
        <Link to="/admin/quotationhistory/">
          <div className={` ${location.pathname === '/admin/quotationhistory/' && styles.active} ${sideView ? styles.elementWrapperMax : styles.elementWrapperMin}`}>
          <FontAwesomeIcon icon={faFile} className={` ml-2 ${styles.elementLogo}`} />
            <div className={`${sideView ? styles.elementNameMax : styles.elementNameMin}`}>Quotation History</div>
          </div>
        </Link>
        {/* ADD product`` */}
        <Link to="/admin/addproduct/" >
          <div className={`${location.pathname === '/admin/addproduct/' && styles.active} ${sideView ? styles.elementWrapperMax : styles.elementWrapperMin}`}>
          <FontAwesomeIcon icon={faCartPlus} className={styles.elementLogo} />
            <div className={`${sideView ? styles.elementNameMax : styles.elementNameMin}`}>Add Product</div>
          </div>
        </Link>

        {/* Edit Product */}
        <Link to="/admin/editproduct/">
          <div className={` ${location.pathname === '/admin/editproduct/' && styles.active} ${sideView ? styles.elementWrapperMax : styles.elementWrapperMin}`}>
          <FontAwesomeIcon icon={faFilePen} className={styles.elementLogo} />
            <div className={`${sideView ? styles.elementNameMax : styles.elementNameMin}`}>Edit Product</div>
          </div>
        </Link>
      
        {/* Other */}
        <div className={`${sideView ? styles.otherTitleMax : styles.otherTitleMin}`}>Other</div>
        {/* Notification */}
        <Link to="/admin/notification/">
          <div className={` ${location.pathname === '/admin/notification/' && styles.active} ${sideView ? styles.elementWrapperMax : styles.elementWrapperMin}`}>
            <FontAwesomeIcon icon={faEnvelope} className={styles.elementLogo} />
            <div className={`${sideView ? styles.elementNameMax : styles.elementNameMin}`}>Notification</div>
          </div>
        </Link>
        {/* Support */}
        <Link to="/admin/support/">
          <div className={` ${location.pathname === '/admin/support/' && styles.active} ${sideView ? styles.elementWrapperMax : styles.elementWrapperMin}`}>
            <FontAwesomeIcon icon={faHeadset} className={styles.elementLogo} />
            <div className={`${sideView ? styles.elementNameMax : styles.elementNameMin}`}>Support</div>
          </div>
        </Link>
     

      {/* Restaurant Profile */}
      <div className={`${sideView ? styles.restroProfileMax : styles.restroProfileMin}`}>
            <div className={`${sideView?styles.restroProfileWrapperMax:styles.restroProfileWrapperMin}`}>
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" alt="" className={styles.restroProfile} />
            </div>
            <div className={`${sideView?styles.restroNameMax:styles.restroNameMin}`}>Sky computer</div>
            <div className={`${sideView?styles.restroTagLineMax:styles.restroTagLineMin}`}>{" "}</div>
            <Link to="/admin/profile">
              <button className={`${sideView?styles.restroOpenProfileMax:styles.restroOpenProfileMin}`}>Open Profile</button>
            </Link>

      </div>

      {/* copyright */}
      <div className={`${sideView ? styles.copyRightMax : styles.copyRightMin}`}>@2022 TechEngine</div>


    </div>

    </div>
  )
}

export default SideBar