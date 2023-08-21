import productModal from "../modals/productModal.js";

export const addProduct = async (req, res) => {

  try {
   if(!req.body || req.body.price===NaN || req.body.purchasePrice===NaN){

    res.status(200).json({
      message: "No product data available",
      success: false,
      error: error.message,
    });
  }
  else{
  
    const ifProductExist = await productModal.findOne({ name: req.body.name });

    if (ifProductExist) {
      res.status(200).json({
        message: "Product already exist",
        success: false,
      });
    } else {
      const productData = new productModal(req.body);
      productData.save();
      // (productData)
      res.status(200).json({
        message: "Product Added Successfully",
        success: true,
      });
    }
   }
  } catch (error) {
    res.status(200).json({
      message: "Please try after some time",
      success: false,
      error: error.message,
    });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const data = await productModal.findOneAndDelete({ _id: productId });
    res.status(200).json({
      message: "Product Deleted Successfully",
      success: true,
    });
  } catch (error) {
    res.status(200).json({
      message: "Please try after some time",
      success: false,
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const productData = await productModal.findOne({ _id: productId });
    await productData.updateOne(req.body);
    res.status(200).json({
      message: "Product Updated Successfully",
      success: true,
    });
  } catch (error) {
    res.status(200).json({
      message: "Please try after some time",
      success: false,
      error: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const productsData = await productModal.find({});
    res.status(200).json({
      message: "Product fetched Successfully",
      success: true,
      data: productsData,
    });
  } catch (error) {
    res.status(200).json({
      message: "Please try after some time",
      success: false,
      error: error.message,
    });
  }
};
export const getProductByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const productsData = await productModal.find({ categoryId });
    res.status(200).json({
      message: "Product fetched Successfully",
      success: true,
      data: productsData,
    });
  } catch (error) {
    res.status(200).json({
      message: "Please try after some time",
      success: false,
      error: error.message,
    });
  }
};
