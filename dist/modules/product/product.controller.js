"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.searchProductsByName = exports.addBulkProducts = exports.getProductByName = exports.addProduct = void 0;
const product_service_1 = require("./product.service");
const addProduct = async (req, res) => {
    const filePath = req.file ? req.file.path : null;
    if (!filePath) {
        return res.status(400).json({ message: 'Product image is required' });
    }
    const productData = {
        ...req.body,
        imageUrl: filePath
    };
    const productAdded = await product_service_1.ProductService.addProduct(productData);
    res.status(201).json(productAdded);
};
exports.addProduct = addProduct;
const getProductByName = async (req, res) => {
    const name = req.query.name;
    if (!name) {
        return res.status(400).json({ message: 'Product name is required' });
    }
    const product = await product_service_1.ProductService.getProductByName(name);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
};
exports.getProductByName = getProductByName;
const addBulkProducts = async (req, res) => {
    const productData = req.body;
    if (!Array.isArray(productData) || productData.length === 0) {
        return res.status(400).json({ message: 'An array of products is required' });
    }
    const productsAdded = await product_service_1.ProductService.addBulkProducts(productData);
    res.status(201).json(productsAdded);
};
exports.addBulkProducts = addBulkProducts;
const searchProductsByName = async (req, res) => {
    const name = req.query.name;
    if (!name) {
        return res.status(400).json({ message: 'Product name is required' });
    }
    const products = await product_service_1.ProductService.searchProductsByName(name);
    res.json(products);
};
exports.searchProductsByName = searchProductsByName;
const getProducts = async (req, res) => {
    const startIndex = parseInt(req.query.startIndex);
    const endIndex = parseInt(req.query.endIndex);
    if (isNaN(startIndex) || isNaN(endIndex)) {
        return res.status(400).json({ message: 'startIndex and endIndex are required' });
    }
    if (startIndex < 0 || endIndex < 0) {
        return res.status(400).json({ message: 'startIndex and endIndex must be positive numbers' });
    }
    if (startIndex > endIndex) {
        return res.status(400).json({ message: 'startIndex cannot be greater than endIndex' });
    }
    const pageSize = endIndex - startIndex;
    const products = await product_service_1.ProductService.getProducts(startIndex, pageSize);
    res.json(products);
};
exports.getProducts = getProducts;
//# sourceMappingURL=product.controller.js.map