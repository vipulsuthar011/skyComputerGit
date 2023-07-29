import React, { useEffect, useState } from 'react'
import styles from './editCategory.module.css'
import axios from 'axios'
// import FontAwesomeIcon from 'FontAwesomeIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {faTrash} from '@fortawesome/fontawesome-svg-
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';




const EditCategory = () => {
    const [viewType, setViewType] = useState('list')
    // const [productData, setproductData] = useState(second)
    let initialProductData = [{ image: "", name: "", categoryName: "", price: "", offerPrice: "", shortDescription: "" }]
    const [productData, setProductData] = useState(initialProductData)
    const [formProductData, setFormProductData] = useState({ name: '', shortDescription: '', image: "" })
    const [categoryData, setCategoryData] = useState([{ name: "category1", _id: "1", shortDescription: "" }])
    const [editPopup, setEditPopup] = useState(false)
    const [deletePopup, setDeletePopup] = useState(false)
    const [deleteCategoryDetail, setdeleteCategoryDetail] = useState()

    //   get category
    const getCategoriesData = () => {
        // setIsLoading(true)
        axios
            .get("http://localhost:8000/api/category/getCategories")
            .then((response) => {
                setCategoryData(response.data.data);
                // setIsLoading(false);

                // console.log("category data====>", response.data.data);
            })
            .catch((err) => {
                // toast.error("Some error occured ! Please try after some time");
                console.log("error", err)
            });
    };

    useEffect(() => {
        getCategoriesData();
    }, []);


    // update category
    const updateCategory = async (e) => {
        e.preventDefault();
        // setIsLoading(true);
        // console.log("this is image", image);
        console.log("this is formdata", formProductData);
        // // const _formdata = new FormData();
        // // // _formdata.append("image", image);
        // // _formdata.append("shortDescription", formData.shortDescription);
        // // _formdata.append("name", formData.name);
        // debugger
        await axios.post(`http://localhost:8000/api/category/updateCategory/${formProductData._id}`, formProductData, {
            headers: {
                authorization: `Bearer ${sessionStorage.token}`
            },
        }
        )
            .then((response) => {
                console.log(response);
                // setIsLoading(false);
                // setOpenCategoryModal(false);
                // setFormData(intialFormData);
                getCategoriesData()
                setEditPopup(false)
                // toast(response.data.message);
            })
            .catch((error) => {
                console.log(error);
                // setOpenCategoryModal(false);
                // toast.error(error.response.data.error);
                console.log(error.response.data.error);
            });
    };


    // delete category
    const deleteCategory = (id) => {
        console.log(id)
        axios
            .post(`http://localhost:8000/api/category/deleteCategory/${id}`, {}, {
                headers: {
                    authorization: `Bearer ${sessionStorage.token}`
                }
            },)
            .then((response) => {
                getCategoriesData();
                // toast(response.data.message);
                // setCategoriesData(response.data.data);
                // setLoading(false)
                setDeletePopup(false)
                console.log(response.data);
            })
            .catch(() => {
                // toast.error("Some error occured ! Please try after some time");
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

    const handleEditBtn = (e, productDetail) => {
        setEditPopup(true)
        console.log(productDetail)
        setFormProductData(productDetail)
        console.log(formProductData)
    }
    const handleDeletePopup = (e, category) => {
        // e.preventDefault()
        setdeleteCategoryDetail(category)
        setDeletePopup(true)
    }

    return (
        <div className={styles.editProductWrapper}>
            <div className={styles.editPrdouctHeaderSection}>
                <div className={styles.editItemHeading}>Category</div>
                <Link to="/admin/addcategory"><div className={styles.HeadAddItemBtn}>ADD Category</div></Link>
            </div>
            {
                viewType === "list" ?
                    <div className={styles.listWrapper}>
                        <table className={styles.table}>
                            <tr>
                                <th>Category Name</th>
                                <th>Short Description</th>
                                {/* <th>actual price</th> */}
                                {/* <th>discounted price</th> */}
                                <th className={styles.actionButtons}>action</th>
                            </tr>
                            {
                                categoryData.map((category, index) => (
                                    <tr className={styles.itemRow} key={index}>
                                        <td className={styles.itemName}>{category.name}</td>
                                        <td className={styles.itemCategoryName}>{category.shortDescription.length >= 20 ? category.shortDescription.slice(0, 20) : category.shortDescription}</td>
                                        {/* <td className={styles.price}>{product.price}</td> */}
                                        {/* {console.log("short descrition",category.shortDescription.length)} */}
                                        {/* <td className={styles.offerPrice}>{product.offerPrice}</td> */}
                                        <td className={styles.actionButtons}>
                                            {/* <FontAwesomeIcon icon="fa-duotone fa-trash" /> */}
                                            {/* <FontAwesomeIcon icon={faTrash} /> */}
                                            {/* <FontAwesomeIcon icon={duotone("trash")} /> */}
                                            {/* <FontAwesomeIcon icon="fa-solid fa-trash" /> */}
                                            {/* <FontAwesomeIcon icon={solid("trash")} /> */}
                                            {/* <i className="fa-solid fa-trash"></i> */}
                                            <div className={styles.editIconWrapper} onClick={(e) => handleEditBtn(e, category)}>
                                                <FontAwesomeIcon icon={faPen} className={styles.editIcon} />
                                            </div>
                                            <div className={styles.deleteIconWrapper} onClick={(e) => handleDeletePopup(e, category)}>
                                                {/* <div className={styles.deleteIconWrapper} onClick={(e)=>handleDeletePopup(e,product)}> */}
                                                <FontAwesomeIcon icon={faTrash} className={styles.deleteIcon} />
                                            </div>
                                        </td>
                                        {deletePopup &&
                                            <div>
                                                {console.log("category===>", category)}
                                                <div className={styles.deleteItem}>
                                                    <div className={styles.delelteModel}>
                                                        <div className={styles.delelteModelWrapper}>
                                                            {/* edit item head */}
                                                            <div className={styles.delelteItemHeaderWrapper}>
                                                                <div className={styles.delelteItemHeadTitle}>Delete Product</div>
                                                                <div className={styles.delelteCrossWrapper} onClick={() => setDeletePopup(false)}><FontAwesomeIcon icon={faXmark} className={styles.delelteCross} /></div>
                                                            </div>
                                                            <hr />

                                                            {/* product or items data */}
                                                            <div className={styles.delelteItemDataWrapper}>
                                                                {/* item name */}

                                                                <div className={styles.MainItemWrapper}>
                                                                    <div className={styles.deleteMsgWrapper}>
                                                                        Are you sure you want to delete the category <span className={styles.deleteItemName}>{deleteCategoryDetail.name}</span> in the menu?
                                                                    </div>
                                                                </div>
                                                                {/* button */}
                                                                <div className={styles.delelteButtonWrapper}>
                                                                    <button className={styles.delelteCloseBtn} onClick={() => setDeletePopup(false)}>close</button>
                                                                    <button className={styles.delelteSaveChangesBTN} onClick={() => deleteCategory(deleteCategoryDetail._id)}>Confirm Delete</button>
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
                                            <div className={styles.editItemHeadTitle}>Edit Category</div>
                                            <div className={styles.editCrossWrapper} onClick={() => setEditPopup(false)}><FontAwesomeIcon icon={faXmark} className={styles.editCross} /></div>
                                        </div>
                                        <hr />

                                        {/* product or items data */}
                                        <div className={styles.EditItemDataWrapper}>
                                            {/* item name */}

                                            <div className={styles.MainItemWrapper}>
                                                {/* product Price */}
                                                <div className={styles.productWrapper}>
                                                    <div className={styles.productName}>Category Name</div>
                                                    <input type="text" className={styles.productInput} name="name" value={formProductData.name} onChange={(e) => handleOnEditProductChange(e)} />
                                                </div>
                                            </div>
                                            <div className={styles.prdouctPriceAndDiscontedPriceWrapper}>
                                                {/* product Price */}
                                                <div className={styles.productWrapper}>
                                                    <div className={styles.productName}>Short Description</div>
                                                    <textarea type="text" className={styles.productInput} name="shortDescription" value={formProductData.shortDescription} onChange={(e) => handleOnEditProductChange(e)} />
                                                </div>
                                                {/* product categpru */}
                                            </div>
                                            <hr />
                                            {/* button */}
                                            <div className={styles.editButtonWrapper}>
                                                <button className={styles.editCloseBtn} onClick={() => setEditPopup(false)}>close</button>
                                                <button className={styles.EditSaveChangesBTN} onClick={updateCategory}>save changes</button>
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

export default EditCategory