// import React from "react";
import React, { useEffect, useState } from 'react';
import styles from './documentPrint.module.css'
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

export const DocumentPrint = React.forwardRef((props, ref) => {
    const [termAndCondition, setTermAndCondition] = useState([])
    const BillDetail=props.documentData

    useEffect(() => {
      getCompanyDetail()
    }, [])
    

    const getCompanyDetail = async () => {
        await axios.get('http://localhost:8000/api/companyDetail/getCompanyDetail'
            , {
                'headers': {
                    'authorization': `Bearer ${sessionStorage.token}`,
                },
            })
            .then((response) => {
                setTermAndCondition(response.data.data[0].term);
            })
    }

    
    return (
        <div ref={ref}>
            {/* main bill wrapper */}
            <div className={styles.mainBillWrapper}>
                <div className={styles.adminDetail}>
                    <div className={styles.title}>Sky Computers</div>
                    <div className={styles.adminAddress}>31, Rishi Nagar, Near Ranawat Poultry Farm, Sec 3, Hiran Magri, Udaipur</div>
                    <div className={styles.adminAddress}>Mo. No.: 8003737080</div>
                    <div className={styles.emailGstWrapper}>
                        {/* email */}
                        <div className={styles.adminAddress}><a href="mailto:skycomputerudaipur@gmail.com">Email :- skycomputerudaipur@gmail.com</a></div>
                        {/* gst */}
                        <div className={styles.adminAddress}>GST No: 08GXSPS5283Q1ZY</div>
                    </div>
                    <hr />
                    {/* Quotation */}
                    <div className={styles.quotationTitle}>Quotation</div>

                    {/* quation detail  */}
                    {/* cleint address */}
                    <div className={styles.clientAddress}>To,</div>
                    <div className={styles.clientAddress}>{BillDetail?.formData?.name}</div>
                    <div className={styles.clientAddress}>{BillDetail?.formData?.address}</div>
                    <div className={styles.clientAddress}>GST :{BillDetail?.formData?.gst}</div>
                    <div className={styles.clientAddress}>Email : <a href={`mailto:${BillDetail?.formData?.email}`}>{BillDetail?.formData?.email}</a> </div>
                    <div className={styles.clientAddress}>No.:{BillDetail?.formData?.mobile} </div>

                    {/* quation subject */}
                    <div className={styles.quationSubject}>
                    <div className='pb-3 font-weight-bolder'>Sub: - {BillDetail?.formData?.subject}</div>
                    <div className={`font-weight-bold ${styles.clientAddress}`}>Respected,</div>
                    <div className={`font-weight-bold ${styles.clientAddress}`}>Please find the following quotation for your consideration, including the pricing details:-</div>
                    </div>


                    {/* price table */}
                    <table className={styles.quationTable}>
                        <thead>
                            <tr>
                                <th className={styles.tableSrNO}>Sr. No.</th>
                                <th className={styles.tableProduct}>Product Name</th>
                                <th className={styles.tablePrice}>Price</th>
                                <th className={styles.tableQuantity}>Quantity</th>
                                <th className={styles.tableTotal}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {BillDetail?.items?.map((item, index) => (
                                <tr>
                                    <td className={styles.tableSrNO}>{index + 1}</td>
                                    <td className={styles.tableProduct}>{item?.label}</td>
                                    <td className={styles.tablePrice}>{item?.price}</td>
                                    <td className={styles.tableQuantity}>{item?.quantity}</td>
                                    <td className={`font-weight-bolder color-white text-dark d-flex align-items-center ${styles.tableTotal}`}><FontAwesomeIcon icon={faIndianRupeeSign} className='pt-1' /> <div className='pl-1'>{item?.total} /-</div></td>

                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className='font-weight-bolder color-white text-dark'>Total</td>
                                <td className='font-weight-bolder color-white text-dark d-flex align-items-center '><FontAwesomeIcon icon={faIndianRupeeSign} className='pt-1' /> <div className='pl-1'>{BillDetail?.grandTotal} /-</div></td>

                            </tr>
                        </tbody>
                    </table>
                    {/* term and condition */}
                    <div className={styles.termAndCondition}>
                        <div className={styles.termNote}>Note:-</div>
                        <ol className={styles.termOl}>

                            {termAndCondition?.map((term,index)=>(
                                <li key={index}>{term}</li>
                            ))}
                            {/* <li>This quotation is valid for 15 days only, and prices may change after that period.</li>
                            <li>All our products come with a 2-year standard company warranty</li>
                            <li>The above prices include a 6-month Annual Maintenance Contract (AMC).</li>
                            <li>The customer will provide the power facility.</li>
                            <li>Payment terms: 60% advance, and the remaining amount after installation.</li>
                            <li>All prices are GST inclusive, except for installation charges.</li> */}
                        </ol>
                    </div>


                    {/* account detail */}
                    <div className={styles.accountDetail}>
                        <div className={styles.termNote}>A/C Details:-</div>
                        <div className={styles.termOl}>
                            <div>Name: - SKY COMPUTERS</div>
                            <div>A/C No: - 693905601037</div>
                            <div>IFSC: - ICIC0006935</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
});