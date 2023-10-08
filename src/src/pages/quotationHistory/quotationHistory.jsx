import React, { useEffect, useRef, useState } from 'react'
import styles from './quotationHistory.module.css'
import axios from 'axios'
// import FontAwesomeIcon from 'FontAwesomeIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {faTrash} from '@fortawesome/fontawesome-svg-
import { faPrint, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UpdateQuotaton from '../updateQuotation/updateQuotation';
import { DocumentPrint } from '../documentPrint/documentPrint';
import ReactToPrint, { useReactToPrint } from 'react-to-print';

const QuotationHistory = () => {
  const [viewType, setViewType] = useState('list')
  const [formProductData, setFormProductData] = useState({ name: '', shortDescription: '', image: "" })
  const [editPopup, setEditPopup] = useState(false)
  const [deletePopup, setDeletePopup] = useState(false)
  const [deleteProductDetail, setdeleteProductDetail] = useState()
  let initialQuotationInfo = [{ billDate: "", name: "", subject: "" }]
  const [quotationInfo, setQuotationInfo] = useState(initialQuotationInfo)
  const [printQuotation, setPrintQuotation] = useState('')
  const [printStatus, setPrintStatus] = useState(false)
  const [isLoading,setIsLoading]=useState(true)

  const navigate = useNavigate();
  
  const componentRef = useRef();
  const componentDataRef = useRef();



  // get quotation
  const getQuotation = () => {
    axios.get('http://localhost:8000/api/billing/getQuotation')
      .then((response) => {
        setQuotationInfo(response.data.data)
        setIsLoading(false)
        // quotationInfo.reverse()
      })
      .catch((err) => {
        setIsLoading(true)
      })
  }
  useEffect(() => {
    getQuotation();
    
  }, [])

  // get product


  // deleteProduct
  const deleteQuotation = (id) => {
    setIsLoading(true)
    // e.preventDefault()
    axios
      .post(`http://localhost:8000/api/billing/deleteQuotation/${id}`)
      .then((response) => {
        setIsLoading(true)
        // getCategoriesData();
        // toast(response.data.message);
        //   getProducts()
        // setCategoriesData(response.data.data);
        // setLoading(false)
        getQuotation();
        setDeletePopup(false)
        toast.success("Quotation deleted successfully")
      })
      .catch((err) => {
        toast.error("Some error occured ! Please try after some time");
        setIsLoading(true)
      });
  };

  const handleEditBtn = (e, quotation) => {
    navigate(`/admin/updateQuotation/${quotation._id}`, { state: { quotationData: quotation } });

  }

  const handleDeletePopup = (e, product) => {
    e.preventDefault()
    setdeleteProductDetail(product)
    setDeletePopup(true)
  }

  useEffect(() => {
    if (printQuotation !== null||printQuotation!=="") {
      setPrintStatus(true);
    }
  }, [printQuotation]);


  const handlePrintBtn =async (e,quotation) => {
    // e.preventDefault();

       setPrintQuotation(quotation)
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""; // Return an empty string if dateString is not provided
    const dateOnly = new Date(dateString).toISOString().slice(0, 10);
    return dateOnly;
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent:()=>{componentDataRef.current=printQuotation}
  });

  const handlePrintWrapper=(e,quotation)=>{
        setPrintQuotation(quotation);
        componentDataRef.current=quotation;
        toast("Please wait while we prepare the print.")
        setTimeout(() => {
          handlePrint()
        }, 10);
  }


  const buttonRefEnter = useRef();
  const buttonRefEsc = useRef();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        // Trigger button 1 click on Enter key
        buttonRefEnter.current.click();
      } else if (event.key === 'Escape') {
        // Trigger button 2 click on Escape key
        buttonRefEsc.current.click();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const sortedData = [...quotationInfo].sort((a, b) => new Date(a.billDate) - new Date(b.billDate));
  // quotationInfo

  return (
   <div>
    {
      isLoading?
        <div className='LoaderWrapper'>
          <span className='loader'></span>
        </div>:
       <div className={styles.editProductWrapper}>
       <div className={styles.editPrdouctHeaderSection}>
         <div className={styles.editItemHeading}>Quotation History</div>
         <Link to="/admin/billing/"><div className={styles.HeadAddItemBtn}>ADD Quotation</div></Link>
       </div>
       {
         viewType === "list" ?
           <div className={styles.listWrapper}>
             <table className={styles.table}>
               <tr>
                 <th>Client Name</th>
                 <th>Subject</th>
                 <th>Billing Date</th>
                 <th className={styles.actionButtons}>action</th>
               </tr>
               {
                 sortedData?.reverse().map((quotation, index) => (
                   // <Link to={{
                   //     pathname:`/admin/updateQuotation/${quotation._id}`,
                   //     state:{quotationData:"vipul"}
                   // }}
                   //     >
                   <tr className={styles.itemRow} key={index}>
                     <td className={styles.itemName}>{quotation.formData?.name}</td>
                     <td className={styles.offerPrice}>{quotation.formData?.subject}</td>
                     <td className={styles.offerPrice}>{formatDate(quotation.formData?.billDate)}</td>
                     <td className={styles.actionButtons}>
                       <div onClick={(e)=>handlePrintBtn(e,quotation)}>
 
                         {/* <ReactToPrint
                           trigger={() => <button className={styles.newRowBtn}  >Save and Print</button>}
                           content={() => componentRef.current}
                           onBeforePrint={(e)=>handlePrintBtn(e,quotation)}
                         /> */}
                       </div>
                       <div style={{ display: 'none' }}>
                         <DocumentPrint ref={componentRef} documentData={componentDataRef.current} />
                         </div>
                       <div className={styles.printIconWrapper} onClick={(e)=>handlePrintWrapper(e,quotation)}>
                         <FontAwesomeIcon icon={faPrint} size='lg' className={styles.printIcon} />
                       </div>
                       <div className={styles.editIconWrapper} onClick={(e) => handleEditBtn(e, quotation)}>
                         <FontAwesomeIcon icon={faPen} className={styles.editIcon} />
                       </div>
                       <div className={styles.deleteIconWrapper}  onClick={(e) => handleDeletePopup(e, quotation)}>
                         {/* <div className={styles.deleteIconWrapper} onClick={(e)=>handleDeletePopup(e,product)}> */}
                         <FontAwesomeIcon icon={faTrash} className={styles.deleteIcon} />
                       </div>
                     </td>
 
                     {/* delete quotation */}
                     {deletePopup &&
                       <div>
                         <div className={styles.deleteItem}>
                           <div className={styles.delelteModel}>
                             <div className={styles.delelteModelWrapper}>
                               {/* edit item head */}
                               <div className={styles.delelteItemHeaderWrapper}>
                                 <div className={styles.delelteItemHeadTitle}>Delete Product</div>
                                 <div className={styles.delelteCrossWrapper} ref={buttonRefEsc} onClick={() => setDeletePopup(false)}><FontAwesomeIcon icon={faXmark} className={styles.delelteCross} /></div>
                               </div>
                               <hr />
 
                               {/* product or items data */}
                               <div className={styles.delelteItemDataWrapper}>
                                 {/* item name */}
 
                                 <div className={styles.MainItemWrapper}>
                                   <div className={styles.deleteMsgWrapper}>
                                     Are you sure you want to delete the product Quotation ?
                                   </div>
                                 </div>
                                 {/* button */}
                                 <div className={styles.delelteButtonWrapper}>
                                   <button className={styles.delelteCloseBtn} onClick={() => setDeletePopup(false)}>close</button>
                                   <button className={styles.delelteSaveChangesBTN} ref={buttonRefEnter}   onClick={() => deleteQuotation(deleteProductDetail._id)}>Confirm Delete</button>
                                 </div>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                     }
                   </tr>
                   // </Link>
 
 
                 ))
               }
             </table>
 
             {/* EDIT popup start */}
             {editPopup &&
               <UpdateQuotaton />
             }
 
 
           </div>
           :
           ""
       }
 
     </div>
    }
   </div>
  )
}

export default QuotationHistory;