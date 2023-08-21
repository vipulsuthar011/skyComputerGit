import React, { useEffect, useRef, useState } from 'react'
import styles from './editProduct.module.css'
import axios from 'axios'
// import FontAwesomeIcon from 'FontAwesomeIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {faTrash} from '@fortawesome/fontawesome-svg-
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';




const EditProduct = () => {
  const [viewType, setViewType] = useState('list')
  // const [productData, setproductData] = useState(second)
  let initialProductData = [{ image: "", name: "", categoryName: "", price: "", purchasePrice: "", shortDescription: "" }]
  const [productData, setProductData] = useState(initialProductData)
  const [formProductData, setFormProductData] = useState({ name: '',price:"",purchasePrice:"", shortDescription: '', image: "" })
  const [categoryData, setCategoryData] = useState([{ name: "category1", _id: "1" }])
  const [editPopup, setEditPopup] = useState(false)
  const [deletePopup, setDeletePopup] = useState(false)
  const [deleteProductDetail, setdeleteProductDetail] = useState()

  

  // get product
  const getProducts = () => {
    axios
      .get(`http://localhost:8000/api/product/getProducts`)
      .then((response) => {
        setProductData(response.data.data);
      })
      .catch((err) => {
        toast.error("Some error occured ! Please try after some time");
      });
  }
  useEffect(() => {
    getProducts()
  }, []);

  const validateForm = () => {
    return (
      formProductData.name.trim() !== "" &&
      formProductData.price.trim() !== "" &&
      formProductData.purchasePrice.trim() !== ""
    );
  };

  // update product
  const updateProduct = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    axios
      .post(`http://localhost:8000/api/product/updateProduct/${formProductData._id}`, formProductData, {
        headers: {
          authorization: `Bearer ${sessionStorage.token}`
        },
      })
      .then((response) => {
        // getCategoriesData();
        // toast(response.data.message);
        // setOpenProductModal(false)  
        getProducts()
        // setCategoriesData(response.data.data);
        // setLoading(false)
        setEditPopup(false)
        toast.success("Product update successfully")
      })
      .catch((err) => {
        toast.error("Some error occured ! Please try after some time");
      });
  };
  // deleteProduct
  const deleteProduct = (id) => {
    // e.preventDefault()
    axios
      .post(`http://localhost:8000/api/product/deleteProduct/${id}`)
      .then((response) => {
        // getCategoriesData();
        // toast(response.data.message);
        getProducts()
        // setCategoriesData(response.data.data);
        // setLoading(false)
        setDeletePopup(false)
        toast.success("product deleted successfully")
      })
      .catch((err) => {
        toast.error("Some error occured ! Please try after some time");
      });
  };






  const handleOnEditProductChange = (event) => {
    setFormProductData({ ...formProductData, [event.target.name]: event.target.value });
  };

  const handleOnProductCategoryChange = (e, categoryData) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = categoryData.find(
      (category) => category._id === selectedCategoryId
    );
    const categoryId = selectedCategory._id;
    const categoryName = selectedCategory.name;
    setFormProductData({
      ...formProductData,
      categoryId: selectedCategoryId,
      categoryName: categoryName
    });
  }

  const handleEditBtn = (e, productDetail) => {
    setEditPopup(true)
    // setFormProductData({
    //   ...formProductData,
    //   name:productDetail.name,
    //   offerPrice:productDetail.offerPrice,
    //   price:productDetail.price,
    //   categoryName:productDetail.categoryName,
    // })
    setFormProductData(productDetail)

    // handleOnProductCategoryChange() 
  }

  const handleDeletePopup = (e, product) => {
    e.preventDefault()
    setdeleteProductDetail(product)
    setDeletePopup(true)
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
        <div className={styles.editItemHeading}>Items</div>
        <Link to="/admin/addproduct/"><div className={styles.HeadAddItemBtn}>ADD Product</div></Link>
        
      </div>
      {
        viewType === "list" ?
          <div className={styles.listWrapper}>
            <table className={styles.table}>
              <tr>
                <th>item name</th>
                <th>price</th>
                <th>  purchase price</th>
                <th>Short Description</th>
                <th className={styles.actionButtons}>action</th>
              </tr>
              {
                productData?.reverse().map((product, index) => (
                  <tr className={styles.itemRow} key={index}>
                    <td className={styles.itemName}>{product.name}</td>
                    <td className={styles.offerPrice}>{product.price}</td>
                    <td className={styles.offerPrice}>{product.purchasePrice}</td>
                    <td className={styles.offerPrice}>{product.shortDescription}</td>
                    <td className={styles.actionButtons}>
                      {/* <FontAwesomeIcon icon="fa-duotone fa-trash" /> */}
                      {/* <FontAwesomeIcon icon={faTrash} /> */}
                      {/* <FontAwesomeIcon icon={duotone("trash")} /> */}
                      {/* <FontAwesomeIcon icon="fa-solid fa-trash" /> */}
                      {/* <FontAwesomeIcon icon={solid("trash")} /> */}
                      {/* <i className="fa-solid fa-trash"></i> */}
                      <div className={styles.editIconWrapper} onClick={(e) => handleEditBtn(e, product)}>
                        <FontAwesomeIcon icon={faPen} className={styles.editIcon} />
                      </div>
                      <div className={styles.deleteIconWrapper} onClick={(e) => handleDeletePopup(e, product)}>
                        {/* <div className={styles.deleteIconWrapper} onClick={(e)=>handleDeletePopup(e,product)}> */}
                        <FontAwesomeIcon icon={faTrash} className={styles.deleteIcon} />
                      </div>
                    </td>
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
                                    Are you sure you want to delete the product <span className={styles.deleteItemName}>{deleteProductDetail.name}</span> from the <span className={styles.deleteItemName}>{deleteProductDetail.categoryName}</span>  in the menu?
                                  </div>
                                </div>
                                {/* button */}
                                <div className={styles.delelteButtonWrapper}>
                                  <button className={styles.delelteCloseBtn} onClick={() => setDeletePopup(false)}>close</button>
                                  <button className={styles.delelteSaveChangesBTN}  ref={buttonRefEnter} onClick={() => deleteProduct(deleteProductDetail._id)}>Confirm Delete</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  </tr>

                ))
              }
            </table>

            {/* EDIT popup start */}
            {editPopup &&
              <div className={styles.editItem}>
                <div className={styles.editModel}>
                  <div className={styles.editModelWrapper}>
                    {/* edit item head */}
                    <div className={styles.editItemHeaderWrapper}>
                      <div className={styles.editItemHeadTitle}>Edit Product</div>
                      <div className={styles.editCrossWrapper} ref={buttonRefEsc} onClick={() => setEditPopup(false)}><FontAwesomeIcon icon={faXmark} className={styles.editCross} /></div>
                    </div>
                    <hr />

                    {/* product or items data */}
                    <div className={styles.EditItemDataWrapper}>
                      {/* item name */}

                      <div className={styles.MainItemWrapper}>
                        {/* product Price */}
                        <div className={styles.productWrapper}>
                          <div className={styles.productName}>Item Name</div>
                          <input type="text" className={styles.productInput} name="name" value={formProductData.name} onChange={(e) => handleOnEditProductChange(e)} />
                        </div>

                      </div>
                      <div className={styles.prdouctPriceAndDiscontedPriceWrapper}>
                        {/* product Price */}
                        <div className={styles.productWrapper}>
                          <div className={styles.productName}>Price</div>
                          <input type="number" className={styles.productInput} name="price" value={formProductData.price} onChange={(e) => handleOnEditProductChange(e)} />
                        </div>
                        {/* product Price */}
                        <div className={styles.productWrapper}>
                          <div className={styles.productName}>Purchase Price</div>
                          <input type="number" className={styles.productInput} name="purchasePrice" value={formProductData.purchasePrice} onChange={(e) => handleOnEditProductChange(e)} />
                        </div>
                      
                        {/* product Discounted Price */}
                        <div className={styles.productWrapper}>
                          <div className={styles.productName}>Short Description</div>
                          <input type="text" className={styles.productInput} name="shortDescription" value={formProductData.shortDescription} onChange={(e) => handleOnEditProductChange(e)} />
                        </div>
                      </div>
                      <hr />
                      {/* button */}
                      <div className={styles.editButtonWrapper}>
                        <button className={styles.editCloseBtn} onClick={() => setEditPopup(false)}>close</button>
                        <button className={styles.EditSaveChangesBTN} ref={buttonRefEnter} onClick={updateProduct}>save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }


          </div>
          :
          ""
      }

    </div>
  )
}

export default EditProduct