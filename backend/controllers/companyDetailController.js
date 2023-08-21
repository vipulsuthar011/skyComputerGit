import companyDetailModal from "../modals/companyDetailModal.js"

export const getCompanyDetail=async(req,res)=>{
    try {
        const companyData = await companyDetailModal.find({});
    res.status(200).json({
      message: "Company Detal fetched Successfully",
      success: true,
      data: companyData,
    });
    } catch (error) {
        res.status(200).json({
            message: "Error while getting company detail",
            success: false,
            error: error.message,
          });
    }
}


export const updateCompanyDetail = async (req, res) => {
    try {
    //   const { productId } = req.params;
    // const comapnyDetail = await companyDetailModal.findOne(req.body.term);
    //   await comapnyDetail.updateOne(req.body);
    const newTerms = req.body.term;

  
        const terms = await companyDetailModal.findOne();
        terms.term = newTerms;
        await terms.save();
      res.status(200).json({
        message: "company Detail Updated Successfully",
        success: true,
      });
    } catch (error) {
      res.status(200).json({
        message: "Error while updating company Detail",
        success: false,
        error: error.message,
      });
    }
  };



  export const addCompanyDetail = async (req, res) => {
    try {
    //   const ifProductExist = await productModal.findOne({ name: req.body.name });
  
        const companyDetail = new companyDetailModal(req.body);
        companyDetail.save();
        res.status(200).json({
          message: "company Detail Added Successfully",
          success: true,
        });
    } catch (error) {
      res.status(200).json({
        message: "Error while adding company detail",
        success: false,
        error: error.message,
      });
    }
  };
  
