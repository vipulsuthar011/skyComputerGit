import React, { useEffect, useRef, useState } from 'react'
import styles from "./addItems.module.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'


const AddItems = ({ btnActive }) => {
    const initalProductData = { name: "", shortDescription: "", categoryId: "", categoryName: "", price: "", purchasePrice: "" }
    const [formProductData, setFormProductData] = useState(initalProductData)
    const navigation = useNavigate()
    const [isLoading, setIsLoading] = useState(false)


    // Api Calling
    const handleOnProductChange = (event) => {
        setFormProductData({ ...formProductData, [event.target.name]: event.target.value });
    };

    const validateForm = () => {
        return (
            formProductData.name.trim() !== "" &&
            formProductData.price.trim() !== "" &&
            formProductData.purchasePrice.trim() !== ""
        );
    };

    // add product
    const handleProductSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please fill in all required fields.');
            return;
        }

        const _formproductdata = new FormData()
        _formproductdata.append("shortDescription", formProductData.shortDescription);
        _formproductdata.append("name", formProductData.name);
        _formproductdata.append("price", parseInt(formProductData.price || 0));
        _formproductdata.append("purchasePrice", parseInt(formProductData.purchasePrice || 0));

        const formDataObject = {};
        for (const [key, value] of _formproductdata.entries()) {
            formDataObject[key] = value;
        }


        await axios
            .post("http://localhost:8000/api/product/AddProduct", formDataObject, {
                headers: {
                    authorization: `Bearer ${sessionStorage.token}`,
                },
            })
            .then((response) => {
                setFormProductData(initalProductData)
                navigation('/admin/quotationhistory/')
                toast(response.data.message);
                setIsLoading(false)
            })
            .catch((error) => {
                toast(error.message)
                    (error.response.data.error);
                setIsLoading(false)
            });
    };



    const handleProductSubmitAndAdd = async (e) => {
        setIsLoading(true)
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please fill in all required fields.');
            return;
        }
        else {



            const _formproductdata = new FormData()
            _formproductdata.append("shortDescription", formProductData.shortDescription);
            _formproductdata.append("name", formProductData.name);
            _formproductdata.append("price", parseInt(formProductData.price || 0));
            _formproductdata.append("purchasePrice", parseInt(formProductData.purchasePrice || 0));

            const formDataObject = {};
            for (const [key, value] of _formproductdata.entries()) {
                formDataObject[key] = value;
            }


            await axios
                .post("http://localhost:8000/api/product/AddProduct", formDataObject, {
                    headers: {
                        authorization: `Bearer ${sessionStorage.token}`,
                    },
                })
                .then((response) => {
                    setFormProductData(initalProductData)
                    toast(response.data.message);
                    setIsLoading(false)
                })
                .catch((error) => {
                    toast(error.message)
                    setIsLoading(false)
                });
        }

    };






    return (
        <div>
            {isLoading ?
                <div className='LoaderWrapper'>
                    <span className='loader'></span>
                </div> :

                <div className={styles.addItemsMainWrapper}>

                    <div className={styles.rightSideWrapper}>
                        <div className={styles.addItemsWrapper}>
                            {/* Add item title */}
                            <div className={styles.addProductTitle}  >ADD PRODUCT</div>
<form action="">

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
                                    <button className={styles.productAddBtn} onClick={handleProductSubmitAndAdd}>Save & Add</button>
                                </div>
                            </div>
</form>



                        </div>
                    </div>


                </div>}
        </div>
    )
}

export default AddItems