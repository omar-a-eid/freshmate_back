import productModel from "../models/productModel.js";


export async function GetProducts(req,res){}
export async function AddProduct(req,res){}
// -----------
// if i added another 0 on the id it gives an error not the invalid message why omar ??
// -----------
export async function GetProductsById(req,res){
    // get id by params
    let ProductId = req.params.id;
    // findone the particularid in the DB
    let foundProduct = await productModel.findOne({ _id: ProductId })
    if (!foundProduct) {//if not found in DB
        return res.send("invalid Product id");
    }
    //res print 
    return (res.json({ message: `Product ${ProductId} Founded`, data: foundProduct }))
}
export async function UpdateProduct(req,res){}
export async function DeleteProduct(req,res){}

