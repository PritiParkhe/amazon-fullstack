import express from "express";
import { userSignupController } from "../controllers/userSignup.js";
import { userSigninController } from "../controllers/userSignin.js";
import { userInfoController } from "../controllers/userInfo.js";
import { authToken } from "../middleware/auth.js";
import { userLogoutController } from "../controllers/userLogout.js";
import { allUsers } from "../controllers/allUsers.js";
import { updateUser } from "../controllers/updateUser.js";
import { UploadProductController } from "../controllers/uploadProduct.js";
import { getAllProductController } from "../controllers/getProduct.js";
import { updateProductController } from "../controllers/updateProduct.js";
import { getCategoryProductController } from "../controllers/getCategoryProduct.js";
import { getCategoryWiseProductController } from "../controllers/getCategoryWiseProducts.js";
import { SubcategoryWiseProductController } from '../controllers/subCategoryWiseProducts.js';


export const router = express.Router();

// Define routes
router.post('/signup', userSignupController);
router.post('/signin', userSigninController);
router.get('/user', authToken, userInfoController)
router.get('/logout',userLogoutController)
// admin panel
router.get('/all-users', authToken ,allUsers)
router.post('/update-user', authToken, updateUser)
//upload product
router.post('/upload-product', authToken, UploadProductController)
router.get('/all-product', getAllProductController)
router.post('/update-product',authToken,updateProductController)

// getProducts
router.get('/get-productsCategory', getCategoryProductController)
router.post('/get-categorywiseProducts' , getCategoryWiseProductController)
router.post('/subcategory-products', SubcategoryWiseProductController);


export default router;



