import billingModel from "../modals/billingModel.js"

export const addQuotation = async (req, res) => {
        // const { items, formData } = req.body
        // console.log(req.body)

        try {
                // Check if a quotation with the same formData and items already exists
                // console.log("anything")
                // const existingQuotation = await billingModel.findOne({formData})
                // // console.log("existingQuotation",existingQuotation)
                // if (existingQuotation) {
                //         // Quotation with the same formData and items already exists
                //         res.status(200).json({
                //                 message: "Quotation Already Exist",
                //                 success: false
                //         });
                 {

                        const billData = new billingModel(req.body)
                        billData.save();
                        // console.log(billData)
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
                const billData = await billingModel.find({});
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

export const deleteQuotation = async (req, res) => {
        try {
                const { quotationId } = req.params;
                console.log(quotationId)
                const billData = await billingModel.findOneAndDelete({ _id: quotationId });
                console.log(billData)
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


