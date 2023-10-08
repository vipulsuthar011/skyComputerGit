import React, { useEffect, useState, useRef } from 'react'
import styles from './billing.module.css'
import 'react-select-search/style.css'
// import Search from 'react-select-search';
import Select, { components } from 'react-select';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DocumentPrint } from '../documentPrint/documentPrint';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom';


const Billing = ({ sideView, setSideView }) => {

  const Navigate=useNavigate();
  // setSideView(false)

  const [grandTotal, setGrandTotal] = useState(0)
  // const [purchaseTotal, setPurchaseTotal] = useState(0)
  const [profitTotal, setProfitTotal] = useState(0)
  const componentRef = useRef();
  const [formData, setFormData] = useState(() => {
    // Check if form data exists in localStorage
    const storedFormData = localStorage.getItem('formData');
    return storedFormData ? JSON.parse(storedFormData) : {
      billDate: new Date().toISOString().slice(0, 10),
      mobile: '',
      email: '',
      name: '',
      address: '',
      gst: '',
      subject: '',
    };
  });
  const [productData, setProductData] = useState(() => {
    // Check if product data exists in localStorage
    const storedProductData = localStorage.getItem('productData');
    return storedProductData ? JSON.parse(storedProductData) : [{ name: "", price: 0, purchasePrice: 0 }];
  });


  const initialData = localStorage.getItem('tableData');
  const [items, setItems] = useState(initialData ? JSON.parse(initialData) : []);

  useEffect(() => {
    // Save the form data to localStorage whenever it changes
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  // add quotation detail to quation section
  // add quotation
  const addQuotation = () => {
    axios.post('http://localhost:8000/api/billing/addQuotation', documentData)
      .then((response) => {
        toast.success(response.data.message);
        Navigate('/admin/quotationhistory')
        handleBillReset();
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
  }


  // get product
  const getProducts = () => {
    axios
      .get(`http://localhost:8000/api/product/getProducts`)
      .then((response) => {
        setProductData(response.data.data);
      })
      .catch((err) => {
        // setIsLoading(false);
        toast.error("Some error occured ! Please try after some time");
      });
  }
  useEffect(() => {
    getProducts();
    handleBillReset();
  }, []);



  useEffect(() => {
    localStorage.setItem('tableData', JSON.stringify(items));
  }, [items]);

  const calculateTotalAmount = (item) => {
    return item.price * item.quantity;
  };
  const calculatePurchaseTotalAmount = (item) => {
    return item.purchasePrice * item.quantity;
  };

  const handleProductChange = (selectedOption, index) => {
    // selectedOption.preventDeafult(); 
    const updatedItems = [...items];
    updatedItems[index].label = selectedOption.label;
    updatedItems[index].name = selectedOption.name;
    updatedItems[index].price = selectedOption.price;
    updatedItems[index].purchasePrice = selectedOption.purchasePrice;
    updatedItems[index].quantity = 1; // Default quantity is 1
    updatedItems[index].total = calculateTotalAmount(updatedItems[index]);
    updatedItems[index].purchasePriceTotal = calculatePurchaseTotalAmount(updatedItems[index]);

    setItems(updatedItems);
  };

  const handlePriceChange = (event, index) => {
    const updatedItems = [...items];
    updatedItems[index].price = event.target.value;
    updatedItems[index].total = calculateTotalAmount(updatedItems[index]);
    setItems(updatedItems);

    // Calculate and set the grand total
    const grandTotal = updatedItems.reduce((total, item) => total + item.total, 0);
    setGrandTotal(grandTotal);
  };
  const handlePurchasePriceChange = (event, index) => {
    const updatedItems = [...items];
    updatedItems[index].purchasePrice = event.target.value;
    updatedItems[index].purchasePriceTotal = calculatePurchaseTotalAmount(updatedItems[index]);

    // updatedItems[index].total = calculateTotalAmount(updatedItems[index]);
    setItems(updatedItems);

    // Calculate and set the grand total
    const purchaseTotal = updatedItems.reduce((purchasePriceTotal, item) => parseInt(purchasePriceTotal) + parseInt(item.purchasePriceTotal), 0);
    // setPurchaseTotal(grandTotal);
    const profitCalulate = grandTotal - purchaseTotal
    setProfitTotal(profitCalulate)
  };

  const handleQuantityChange = (event, index) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = event.target.value;
    updatedItems[index].total = calculateTotalAmount(updatedItems[index]);
    updatedItems[index].purchasePriceTotal = calculatePurchaseTotalAmount(updatedItems[index]);

    setItems(updatedItems);

    // Calculate and set the grand total
    const grandTotal = updatedItems.reduce((total, item) => total + item.total, 0);
    setGrandTotal(grandTotal);

    // Calculate and set the grand total
    const purchaseTotal = updatedItems.reduce((purchasePriceTotal, item) => parseInt(purchasePriceTotal) + parseInt(item.purchasePriceTotal), 0);

    // setPurchaseTotal(grandTotal);
    const profitCalulate = grandTotal - purchaseTotal
    setProfitTotal(profitCalulate)
  };


  useEffect(() => {
    // Calculate the initial grand total
    const initialGrandTotal = items.reduce((total, item) => total + item.total, 0);
    const initialPurchaseTotal = items.reduce((purchasePriceTotal, item) => purchasePriceTotal + item.purchasePriceTotal, 0);
    const intialProfitTotal = initialGrandTotal - initialPurchaseTotal

    // setPurchaseTotal(initialPurchaseTotal);
    setGrandTotal(initialGrandTotal);
    setProfitTotal(intialProfitTotal)
  }, [items]);



  const handleAddRow = () => {
    setItems([...items, { label: '', price: 0, purchasePrice: 0, purchaseTotal: 0, purchasePriceTotal: 0, quantity: 0, total: 0 }]);
  };

  const handleRemoveRow = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  // Custom component to remove the dropdown indicator
  const DropdownIndicator = (props) => {
    return <components.IndicatorsContainer {...props} style={{ display: 'block' }} />;
  };

  const handleBillReset = () => {
    // setItems([]);
    setItems([{ label: '', price: 0, purchasePrice: 0, purchaseTotal: 0, purchasePriceTotal: 0, quantity: 0, total: 0 }]);
    setFormData({
      billDate: new Date().toISOString().slice(0, 10),
      mobile: '',
      email: '',
      name: '',
      address: '',
      gst: '',
      subject: '',
    });
    setGrandTotal(0);
  }

  const documentData = ({ items, grandTotal, formData, profitTotal });



  return (
    <div className={styles.billMainWrapper}>
      <div className={styles.billWrapper}>

        {/* Sales invoice */}
        <div className={styles.salesInvoiceTitle}>Sales invoice</div>

        {/* bill and customer details */}
        <div className={styles.billCustomerDetail}>
          {/* bill detail */}
          <div className={styles.billDetail}>
            <div className='d-flex align-items-center justify-content-between w-100'>
              <div className='mr-3'>Bill Date:</div>
              <input
                type='date'
                name='billDate'
                value={formData.billDate}
                onChange={handleChange}
                className={styles.inputFiled}

              />
            </div>

            <div className='d-flex align-items-center justify-content-between w-100'>
              <div className='mr-3'>Mobile:</div>
              <input
                type='number'
                name='mobile'
                value={formData.mobile}
                onChange={handleChange}
                placeholder='Mobile'
                className={styles.inputFiled}
              />
            </div>

            <div className='d-flex align-items-center justify-content-between w-100'>
              <div className='mr-3'>Email:</div>
              <input
                type='text'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Email'
                className={styles.inputFiled}
              />
            </div>
          </div>

          {/* customer detail */}
          <div className={styles.customerDetail}>
            <div className='d-flex align-items-center justify-content-between w-100'>
              <div className='mr-3'>Name:</div>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className={styles.inputFiled}
              />
            </div>

            <div className='d-flex align-items-center justify-content-between w-100'>
              <div className='mr-3'>Address:</div>
              <textarea
                name='address'
                value={formData.address}
                onChange={handleChange}
                placeholder='Address'
                className={styles.inputFiled}
              />
            </div>

            <div className='d-flex align-items-center justify-content-between w-100'>
              <div className='mr-3'>GST:</div>
              <input
                type='text'
                name='gst'
                value={formData.gst}
                onChange={handleChange}
                placeholder='GST'
                className={styles.inputFiled}
              />
            </div>

          </div>
        </div>
        <div className='d-flex align-items-center justify-content-between w-100'>
          <div className='mr-3'>Subject:</div>
          <input
            type='text'
            name='subject'
            value={formData.subject}
            onChange={handleChange}
            placeholder='Subject'
            className={styles.inputFiled}
          />
        </div>

        {/* table billes */}




        <div>
          <table className={styles.billTable}>
            <thead>
              <tr>
                <th className={styles.thSrNo}>Sr.NO.</th>
                <th className={styles.thName}>Item Name</th>
                <th className={styles.thPrice}>Price</th>
                <th className={styles.thPprice}>Purchase Price</th>
                <th className={styles.thQuantity}>Quantity</th>
                <th className={styles.thTotal}>Total</th>
                <th className={styles.thAction}>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className={styles.thSrNo}>{index + 1}</td>

                  <td className={styles.thName}>
                    <Select
                      value={item}

                      options={productData.map((product) => ({
                        value: product.name,
                        label: product.name,
                        price: product.price,
                        purchasePrice: product.purchasePrice,
                      }))}
                      components={{ DropdownIndicator }}
                      styles={{
                        // Custom styles for the select container
                        control: (provided, state) => ({
                          ...provided,
                          border: 'none',
                          // borderRadius: '4px',
                          boxShadow: state.isFocused ? 'none' : 'none',
                          '&:hover': {
                            border: 'none',
                          },
                        }),
                        // Custom styles for the dropdown menu
                        menu: (provided) => ({
                          ...provided,
                          border: 'none',
                          // borderRadius: '4px',
                          // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        }),
                        // Custom styles for the options
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isSelected ? '#007bff' : 'white',
                          color: state.isSelected ? 'white' : 'black',
                          '&:hover': {
                            backgroundColor: state.isSelected ? '#007bff' : '#f8f9fa',
                          },
                        }),
                      }}
                      onChange={(selectedOption) =>
                        handleProductChange(selectedOption, index)
                      }
                      isSearchable
                      // placeholder="vipul selected"

                    />
                  </td>

                  <td className={styles.thPrice}>
                    <FontAwesomeIcon icon={faIndianRupeeSign} className='pr-1' />
                    <input
                      type="number"
                      value={item.price}
                      onChange={(event) => handlePriceChange(event, index)}
                    />
                  </td>
                  <td className={styles.thPprice}>
                    <FontAwesomeIcon icon={faIndianRupeeSign} className='pr-1' />
                    <input
                      type="number"
                      value={item.purchasePrice}
                      onChange={(event) => handlePurchasePriceChange(event, index)}
                    />
                  </td>
                  <td className={styles.thQuantity}>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(event) => handleQuantityChange(event, index)}
                    />
                  </td>
                  {/* <td onChange={(event) => handleQuantityChange(event, index)}>{item.quantity ? (item.price * item.quantity).toFixed(2) : 0}</td> */}
                  <td className='font-weight-bolder color-white text-dark  ' onChange={(event) => handleQuantityChange(event, index)}><FontAwesomeIcon icon={faIndianRupeeSign} /> {item.total} /-</td>
                  <td>
                    <div className={styles.deleteIconWrapper} onClick={() => handleRemoveRow(index)}>
                      {/* <div className={styles.deleteIconWrapper} onClick={(e)=>handleDeletePopup(e,product)}> */}
                      <FontAwesomeIcon icon={faTrash} className={styles.deleteIcon} />
                    </div>
                  </td>
                </tr>

              ))}
              {/* profit sell collum */}
              {/* sell row */}
              <tr>
                <td colSpan={4} rowSpan={2}></td>
                <td>Total Sell</td>
                <td colSpan={2}><FontAwesomeIcon icon={faIndianRupeeSign} /> {grandTotal} /-</td>
              </tr>
              {/* profit row */}
              <tr>
                <td>Total Profit(Loss)</td>
                <td colSpan={2}><FontAwesomeIcon icon={faIndianRupeeSign} /> {profitTotal} /-</td>
              </tr>
            </tbody>
          </table>

          {/* profit section */}

          {/* profit section end */}


          {/* action buttons */}
          <div className={styles.newRowBtnWrapper}>
            <div onClick={() => addQuotation()}>

              <ReactToPrint
                trigger={() => <button className={styles.newRowBtn}  >Save and Print</button>}
                content={() => componentRef.current}
              />
            </div>
            <div style={{ display: 'none' }}>
              <DocumentPrint ref={componentRef} documentData={documentData} />
            </div>
            <button onClick={addQuotation} className={styles.resetBill}>Save</button>
            <button onClick={handleBillReset} className={styles.resetBill}>Reset</button>
            <button onClick={handleAddRow} className={styles.newRowBtn}>Add Row</button>
          </div>
          {/* Hidden iframe for printing */}

        </div>



      </div>
    </div>



  )
}

export default Billing