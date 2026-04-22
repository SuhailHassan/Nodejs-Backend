import { Request, Response } from 'express';
import { ProductService } from './product.service';

export const addProduct = async (req: Request, res: Response) => {
  const filePath = req.file ? req.file.path : null;
  if (!filePath) {
    return res.status(400).json({ message: 'Product image is required' });
  }
  const productData = {
    ...req.body,
    imageUrl: filePath
  };
  const productAdded = await ProductService.addProduct(productData);
  res.status(201).json(productAdded);
};

export const getProductByName = async (req: Request, res: Response) => {
  const name = req.query.name as string;
  if (!name) {
    return res.status(400).json({ message: 'Product name is required' });
  }
  const product = await ProductService.getProductByName(name);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
}

export const addBulkProducts = async (req: Request, res: Response) => {
  const productData = req.body;
  if (!Array.isArray(productData) || productData.length === 0) {
    return res.status(400).json({ message: 'An array of products is required' });
  }
  const productsAdded = await ProductService.addBulkProducts(productData);
  res.status(201).json(productsAdded);
}

export const searchProductsByName = async (req: Request, res: Response) => {
  const name = req.query.name as string;
  if (!name) {
    return res.status(400).json({ message: 'Product name is required' });
  }
  const products = await ProductService.searchProductsByName(name);
  res.json(products);
}

export const getProducts = async (req: Request, res: Response) => {
  const startIndex = parseInt(req.query.startIndex as string);
  const endIndex = parseInt(req.query.endIndex as string);

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
  const products = await ProductService.getProducts(startIndex, pageSize);
  res.json(products);
}