import productModel from "../models/productModel.js";
import validate from "../util/productsValidation.js";
export async function GetProducts(req, res) {
  try {
    // Get All Products
    const allProducts = await productModel.find();
    if (allProducts) {
      return res.json({ AllProducts: allProducts });
    } else {
      return res.json({ message: "No Products Found" });
    }
  } catch (error) {
    return res.status(500).send("internal server error");
  }
}

export async function AddProduct(req, res) {
  try {
    const { title, images, price, quantity, desc } = req.body;
    const valid = validate(req.body);
    if (!valid) {
      return res.status(400).json(valid.errors);
    }
    const newProduct = new productModel({
      title,
      images,
      price,
      quantity,
      desc,
    });
    await newProduct.save();
    return res.json({
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
}

export async function GetProductsById(req, res) {
  //add try and catch to handle the error
  try {
    // get id by params
    const ProductId = req.params.id;
    // findone the particularid in the DB
    const foundProduct = await productModel.findOne({ _id: ProductId });
    if (!foundProduct) {
      //if not found in DB
      return res.send("invalid Product id");
    }
    return res.json({
      message: `Product ${ProductId} Founded`,
      data: foundProduct,
    });
  } catch (error) {
    return res.status(500).send("internal server error");
  }
}

export async function UpdateProduct(req, res) {
  try {
    //Check product validation
    if (validate(req.body)) {
      //Find product id
      const productId = req.params.id;
      const product = await productModel.findById(productId);
      if (product) {
        //Get updated data
        const updatedProductData = req.body;
        //Update product
        const updatedProduct = await productModel.updateOne(
          { _id: productId },
          updatedProductData
        );
        return res.json({
          message: "product updated successfully ",
          Product: updatedProduct,
        });
      } else {
        return res.json({ message: "No product found with this id" });
      }
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
}

export async function DeleteProduct(req, res) {
  try {
    const productId = req.params.id;
    const productToBeDeleted = await productModel.findOneAndDelete({
      _id: productId,
    });
    if (!productToBeDeleted) {
      return res
        .status(404)
        .json({ message: `Product with id ${productId} not found` });
    }
    return res.json({
      message: `Product with id ${productId} deleted successfully`,
      data: productToBeDeleted,
    });
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
}
