import { Router } from 'express';
import * as controller from './product.controller';
import { upload } from '../../middlewares/file-upload.middleware';

const router = Router();

router.post('/add', upload.single('productImage'), controller.addProduct);
router.get('/get', controller.getProducts);
router.get('/getProductByName', controller.getProductByName);
router.post('/addBulkProducts', controller.addBulkProducts);
router.get('/searchProductsByName', controller.searchProductsByName);


export default router;