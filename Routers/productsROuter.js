import express from 'express';
import {AddingMainProduct, Products, adding_images } from '../Controller/productsController.js';
import Upload from '../Middleware/UploadImageMIddleWare.js';
const productRouter = express.Router();


productRouter.get("/",Products)
productRouter.post("/adding",Upload.single("thumbnail"),AddingMainProduct)
productRouter.post("/addImages/:id",Upload.single("images"),adding_images)



export default productRouter;