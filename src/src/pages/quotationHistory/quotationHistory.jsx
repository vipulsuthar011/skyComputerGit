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
  const navigate = useNavigate();
  
  const componentRef = useRef();
  const componentDataRef = useRef();



  // get quotation
  const getQuotation = () => {
    axios.get('http://localhost:8000/api/billing/getQuotation')
      .then((response) => {
        setQuotationInfo(response.data.data)
        console.log("response===>", response.data.data)
      })
      .catch((err) => {
        console.log("error===>", err)
      })
  }
  useEffect(() => {
    getQuotation();
    
  }, [])

  // get product


  // update product
  const updateProduct = (e) => {
    e.preventDefault()

    console.log("update Product Form data is ", formProductData)
    axios
      .post(`http://localhost:8000/api/product/updateProduct/${formProductData._id}`, formProductData, {
        headers: {
          authorization: `Bearer ${sessionStorage.token}`
        },
      })
      .then((response) => {
        // getCategoriesData();
        getQuotation();
        // toast(response.data.message);
        // setOpenProductModal(false)  
        // setCategoriesData(response.data.data);
        // setLoading(false)
        console.log(response.data);
        setEditPopup(false)
        toast.success("Quotation update successfully")
      })
      .catch((err) => {
        toast.error("Some error occured ! Please try after some time");
        console.error("error==>", err)
      });
  };
  // deleteProduct
  const deleteQuotation = (id) => {
    // e.preventDefault()
    console.log(id)
    axios
      .post(`http://localhost:8000/api/billing/deleteQuotation/${id}`)
      .then((response) => {
        // getCategoriesData();
        // toast(response.data.message);
        //   getProducts()
        // setCategoriesData(response.data.data);
        // setLoading(false)
        getQuotation();
        console.log(response.data);
        setDeletePopup(false)
        toast.success("Quotation deleted successfully")
      })
      .catch((err) => {
        toast.error("Some error occured ! Please try after some time");
        console.log("error==>", err)
      });
  };






  const handleOnEditProductChange = (event) => {
    setFormProductData({ ...formProductData, [event.target.name]: event.target.value });
    console.log(formProductData)
  };

  const handleOnProductCategoryChange = (e, categoryData) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = categoryData.find(
      (category) => category._id === selectedCategoryId
    );
    const categoryId = selectedCategory._id;
    // console.log("categoryId====>",categoryId)
    const categoryName = selectedCategory.name;
    // console.log("categoryName====>",categoryName)
    // setFormProductData(formProductData.selectedCategoryId)
    setFormProductData({
      ...formProductData,
      categoryId: selectedCategoryId,
      categoryName: categoryName
    });
  }

  const handleEditBtn = (e, quotation) => {
    //   setEditPopup(true)
    //   console.log(quotation)
    //   setFormProductData(productDetail)
    //   console.log(formProductData)
    navigate(`/admin/updateQuotation/${quotation._id}`, { state: { quotationData: quotation } });

    // handleOnProductCategoryChange() 
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
      // console.log(quotation)

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




  return (
    <div className={styles.editProductWrapper}>
      <div className={styles.editPrdouctHeaderSection}>
        <div className={styles.editItemHeading}>Quotation History</div>
        <Link to="/admin/billing"><div className={styles.HeadAddItemBtn}>ADD Quotation</div></Link>
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
                quotationInfo.map((quotation, index) => (
                  // <Link to={{
                  //     pathname:`/admin/updateQuotation/${quotation._id}`,
                  //     state:{quotationData:"vipul"}
                  // }}
                  //     >
                  <tr className={styles.itemRow} key={index}>
                    <td className={styles.itemName}>{quotation.formData?.name}</td>
                    {/* {console.log(quotationInfo[index])} */}
                    {/* {console.log(quotation)} */}
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
                      {/* {console.log(quotation)} */}
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
                        {console.log("product===>", deleteProductDetail)}
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
  )
}

export default QuotationHistory;