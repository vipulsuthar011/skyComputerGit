import billingModel from "../modals/billingModel.js"

export const addQuotation = async (req, res) => {
        // const { items, formData } = req.body

        try {
                // Check if a quotation with the same formData and items already exists
                // const existingQuotation = await billingModel.findOne({formData})
                // if (existingQuotation) {
                //         // Quotation with the same formData and items already exists
                //         res.status(200).json({
                //                 message: "Quotation Already Exist",
                //                 success: false
                //         });
                 {

                        const billData = new billingModel(req.body)
                        console.log(req.body)
                        billData.save();
                        res.json({
                                // data: billData,
                                // data1: req.body,
                                message: "Quotation added Succesfully",
                                success: true
                        })
                }

        } catch (error) {
                res.json({
                        message: "something went wrong",
                        success: false,
                        error: error
                })
        }
}

export const getQuotation = async (req, res) => {
        try {
                const billData = await billingModel.find({isClosed:false});
                res.status(200).json({
                        message: "Product fetched Successfully",
                        success: true,
                        data: billData,
                });
        } catch (error) {
                res.status(200).json({
                        message: "Please try after some time",
                        success: false,
                        error: error.message,
                });
        }
}
export const getClosedQuotation = async (req, res) => {
        try {
                const billData = await billingModel.find({isClosed:true});
                res.status(200).json({
                        message: "Closed Quotation fetched Successfully",
                        success: true,
                        data: billData,
                });
        } catch (error) {
                res.status(200).json({
                        message: "Please try after some time",
                        success: false,
                        error: error.message,
                });
        }
}

export const deleteQuotation = async (req, res) => {
        try {
                const { quotationId } = req.params;
                const billData = await billingModel.findOneAndDelete({ _id: quotationId });
                res.status(200).json({
                        message: "Product Deleted Successfully",
                        success: true,
                });
        } catch (error) {
                res.status(200).json({
                        message: "Please try after some time",
                        success: false,
                        error: error.message,
                })
        }
}

export const updateQuotation = async (req, res) => {
        try {
                const { quotationId } = req.params;
                const quotationData = await billingModel.findOne({ _id: quotationId });
                await quotationData.updateOne(req.body);
                console.log(req.body)
                res.status(200).json({
                        message: "Quotation Updated Successfully",
                        success: true,
                });
        } catch (error) {
                res.status(400).json({
                        message: "Please try after some time",
                        success: false,
                        error: error.message,
                });
        }
}


