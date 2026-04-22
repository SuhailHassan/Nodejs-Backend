"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_model_1 = require("../product/product.model");
exports.ProductService = {
    addProduct: async (data) => {
        const product = await product_model_1.Product.create({
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            imageUrl: data.imageUrl,
        });
        return product;
    },
    getProducts: async (skip = 0, limit = 5) => {
        const products = await product_model_1.Product.find().skip(skip).limit(limit);
        const totalCount = await product_model_1.Product.countDocuments();
        return {
            data: products,
            pagination: {
                startIndex: skip,
                endIndex: skip + products.length,
                pageSize: limit,
                totalCount: totalCount,
                hasMore: (skip + products.length) < totalCount
            }
        };
    },
    addBulkProducts: async (data) => {
        const products = await product_model_1.Product.insertMany(data);
        return products;
    },
    getProductByName: async (name) => {
        const product = await product_model_1.Product.findOne({ name });
        return product;
    },
    searchProductsByName: async (name) => {
        const product = await product_model_1.Product.find({
            name: { $regex: name, $options: 'i' }
        })
            .collation({ locale: 'en', numericOrdering: true })
            .sort({ name: 1 });
        return product;
    }
};
//# sourceMappingURL=product.service.js.map