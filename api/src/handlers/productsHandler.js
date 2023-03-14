const productService = require('./../services/productService');
const service = new productService();

class ProductsHandler {
    constructor() {}

    async getAllProducts (req,res,next){
        try {
            const products = await service.getAllProducts();
            res.json(products);
        } catch (error) {
            next(error.message)
        }
    }
    async getProductById(req,res,next){
        try {
            const {id} = req.params;
            const product = await service.getOneProduct(id);
            res.json(product);
        } catch (error) {
            next(error);
        }
    }

    async createProduct(req,res,next){
        try {
            const body = req.body;
            const newProduct = await service.createProduct(body);
            res.status(201).json(newProduct);
        } catch (error) {
            next(error)
        }
    }

    async updateProduct(req, res, next ){
        try {
            const {id} = req.params;
            const body = req.body;
            const productUpdated = await service.updateProduct(id, body);
            res.status(200).json(productUpdated);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ProductsHandler