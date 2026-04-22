import { Product } from '../product/product.model';

export const ProductService = {
    addProduct: async (data: any) => {
        const product = await Product.create({
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            imageUrl: data.imageUrl,
        });

        return product;
    },
    getProducts: async (skip: number = 0, limit: number = 5) => {
        const products = await Product.find().skip(skip).limit(limit);
        const totalCount = await Product.countDocuments();
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
    addBulkProducts: async (data: any[]) => {
        const products = await Product.insertMany(data);
        return products;
    },
    getProductByName: async (name: string) => {
        const product = await Product.findOne({ name });
        return product;
    },
    searchProductsByName: async (name: string) => {
        const product = await Product.find({
            name: { $regex: name, $options: 'i' }
        })
        .collation({ locale: 'en', numericOrdering: true })
        .sort({ name: 1 });
        return product;
    }
};