import React, { useEffect, useRef, useState } from 'react'
import styles from "./addItems.module.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'


const AddItems = ({ btnActive }) => {
    const initalProductData = { name: "", shortDescription: "", categoryId: "", categoryName: "", price: "" }
    const [formProductData, setFormProductData] = useState(initalProductData)

    // console.log(categoryData)
    // Api Calling
    const handleOnProductChange = (event) => {
        setFormProductData({ ...formProductData, [event.target.name]: event.target.value });
        console.log(formProductData)
    };

    // add product
    const handleProductSubmit = async (e) => {
        e.preventDefault();

        const _formproductdata = new FormData()
        _formproductdata.append("shortDescription", formProductData.shortDescription);
        _formproductdata.append("name", formProductData.name);
        _formproductdata.append("categoryId", formProductData.categoryId);
        _formproductdata.append("categoryName", formProductData.categoryName);
        _formproductdata.append("price", parseInt(formProductData.price));
        _formproductdata.append("purchasePrice", parseInt(formProductData.purchasePrice));
        // _formproductdata.append("offerPrice", parseInt(formProductData.offerPrice));
        //   debugger

        const formDataObject = {};
        for (const [key, value] of _formproductdata.entries()) {
            formDataObject[key] = value;
        }
        console.log(formDataObject)
        console.log("final product", formProductData)
        console.log("final product", _formproductdata)

        await axios
            .post("http://localhost:8000/api/product/AddProduct", formDataObject, {
                headers: {
                    authorization: `Bearer ${sessionStorage.token}`,
                },
            })
            .then((response) => {
                console.log(response);
                // console.log(_formproductdata)
                setFormProductData(initalProductData)
                toast(response.data.message);
                //   setIsloading(false)
                //   setFormData(initalData)
            })
            .catch((error) => {
                console.log(error);
                toast(error.message)
                //   setIsloading(false)
                //   setError(error.response.data.error);
                console.log(error.response.data.error);
            });
        // }
    };





    return (
        // Main Page Wrapper
        <div className={styles.addItemsMainWrapper}>

            <div className={styles.rightSideWrapper}>
                <div className={styles.addItemsWrapper}>
                    {/* Add item title */}
                    <div className={styles.addProductTitle}>ADD PRODUCT</div>

                    {/* product name */}
                    <div className={styles.productWrapper}>
                        <div className={styles.productName} >product Name:</div>
                        <input type="text" className={styles.productInput} name="name" value={formProductData.name} onChange={(e) => handleOnProductChange(e)} />
                    </div>
                    {/* prduct price and discounted price wrapper */}
                    <div className={styles.prdouctPriceAndDiscontedPriceWrapper}>

                    </div>
                    {/* product category and position wrapper */}
                        {/* product Discounted Price */}
                        <div className={styles.productWrapper}>
                            <div className={styles.productName}>Product Price:</div>
                            <input type="number" className={styles.productInput} name="price" value={formProductData.price} onChange={(e) => handleOnProductChange(e)} />
                        </div>
                        {/* product purchase Price */}
                        <div className={styles.productWrapper}>
                            <div className={styles.productName}>Purchase Price:</div>
                            <input type="number" className={styles.productInput} name="purchasePrice" value={formProductData.purchasePrice} onChange={(e) => handleOnProductChange(e)} />
                        </div>
                      
        
                    {/* product description */}
                    <div className={styles.productWrapper}>
                        <div className={styles.productName}>product Description:</div>
                        <textarea rows={2} type="text" className={styles.productDescription} name="shortDescription" value={formProductData.shortDescription} onChange={(e) => handleOnProductChange(e)} />
                    </div>
                    {/* product button  save and save and save and add Wrapper */}
                    <div className={styles.productSaveAndAddButtonWrapper}>
                        {/* product Save button wrapper */}
                        <div className={styles.productSaveBtnWrapper}>
                            <button className={styles.productSaveBtn} onClick={handleProductSubmit}>Save</button>
                        </div>
                        {/* product Save and Add button wrapper */}
                        <div className={styles.productAddBtnWrapper}>
                            <button className={styles.productAddBtn} onClick={handleProductSubmit}>Save & Add</button>
                        </div>
                    </div>


                </div>
            </div>


        </div>
    )
}

export default AddItems