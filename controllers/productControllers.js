import productModel from "../models/productModel.js";


export async function GetProducts(req, res) { }

export async function AddProduct(req, res) {
    try {
        const { title, images, price, quantity, desc } = req.body;
        const newProduct = new ProductModel({ title, images, price, quantity, desc });
        await newProduct.save();
        return res.json({ message: "Product added successfully", data: newProduct });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
}

// -----------
// if i added another 0 on the id it gives an error not the invalid message why omar ??
// -----------
export async function GetProductsById(req, res) {
    //add try and catch to handle the error 
    try {
        // get id by params
        const ProductId = req.params.id;
        // findone the particularid in the DB
        const foundProduct = await productModel.findOne({ _id: ProductId })
        if (!foundProduct) {//if not found in DB
            return res.send("invalid Product id");
        }
        return (res.json({ message: `Product ${ProductId} Founded`, data: foundProduct }))
    } catch (error) {
        console.log(error);
        return res.status(500).send("enternal server error");
    }

    //res print 
}
export async function UpdateProduct(req, res) { }

export async function DeleteProduct(req, res) {
    try {
        const productId = req.params.id;
        const productToBeDeleted = await productModel.findOneAndDelete({ _id: productId }); // Corrected line
        if (!productToBeDeleted) {
            return res.status(404).json({ message: `Product with id ${productId} not found` }); // Corrected line
        }
        return res.json({ message: `Product with id ${productId} deleted successfully`, data: productToBeDeleted }); // Corrected line
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
}


