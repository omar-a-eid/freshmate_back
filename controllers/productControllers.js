import fs from "fs";
import productModel from "../models/productModel.js";
import validate from "../util/productsValidation.js";

export async function GetProducts(req, res) {
  try {
    // Get All Products
    const allProducts = await productModel.find();
    if (allProducts) {
      return res.json(allProducts);
    } else {
      return res.json({ message: "No Products Found" });
    }
  } catch (error) {
    return res.status(500).send("internal server error");
  }
}

export async function AddProduct(req, res) {
  if (req.email != "admin@gmail.com")
    return res.status(401).json({ error: "Not Authenticateed" });
  try {
    const { price, quantity } = req.body;
    const images = req.files.map((file) => "assets/products/" + file.filename);
    req.body.images = images;
    req.body.price = +price;
    req.body.quantity = +quantity;
    const valid = validate(req.body);
    if (!valid) {
      return res.status(400).json({ message: validate.errors });
    }
    console.log(images);
    const newProduct = new productModel(req.body);
    await newProduct.save();
    return res.json({
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (error) {
    // return res.status(500).send("Internal server error");
    console.log(error);
    return res.status(500).send({ error: error });
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
    return res.json(foundProduct);
  } catch (error) {
    return res.status(500).send("internal server error");
  }
}

export async function UpdateProduct(req, res) {
  if (req.email != "admin@gmail.com")
    return res.status(401).json({ error: "Not Authenticateed" });
  try {
    const { oldImages, price, quantity } = req.body;
    const images = req.files.map((file) => "assets/products/" + file.filename);
    if (oldImages) {
      oldImages.split(",").map((img) => {
        images.push(img);
      });
    }
    req.body.price = +price;
    req.body.quantity = +quantity;
    req.body.images = images;
    //Check product validation
    const valid = validate(req.body);
    if (!valid) {
      return res.status(400).json({ message: validate.errors });
    }
    console.log(req.body);

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
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

export async function DeleteProduct(req, res) {
  if (req.email != "admin@gmail.com")
    return res.status(401).json({ error: "Not Authenticateed" });
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
    if (productToBeDeleted && productToBeDeleted.images) {
      productToBeDeleted.images.map((img) => {
        fs.unlink("public/" + img, (err) => {
          if (err) {
            console.error(`Error deleting image: ${img}`, err);
          } else {
            console.log(`Deleted image: ${img}`);
          }
        });
      });
    }
    return res.json({
      message: `Product with id ${productId} deleted successfully`,
      data: productToBeDeleted,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
}
