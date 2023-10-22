import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/User/CreateUserController";
import { AuthUserController } from "./controllers/User/AuthUserController";
import { DetailUserController } from "./controllers/User/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";

import { CreateOrderController } from "./controllers/Order/CreateOrderController";

import { RemoveOrderController } from "./controllers/Order/RemoveOrderController";
import { AddItemController } from "./controllers/Order/AddItemController";
import { RemoveItemController } from "./controllers/Order/RemoveItemControllers";

import { isAuthenticated } from "./middlewares/isAuthenticated";
import uploadConfig from "./config/multer";
import { SendOrderController } from "./controllers/Order/SendOrderController";
import { ListOrdersController } from "./controllers/Order/ListOrdersController";
import { DetailOrderController } from "./controllers/Order/DetailOrderController";
import { FinishOrderController } from "./controllers/Order/FinishOrderController";

const router = Router()

const upload = multer(uploadConfig.upload("./tmp"))

// -- ROTAS USER --
router.post("/users", new CreateUserController().handle) // Create user
router.post("/session", new AuthUserController().handle) // Login with user
router.get("/userInfo", isAuthenticated, new DetailUserController().handle) // Get some user

// -- ROTAS CATEGORY --
router.post("/category", isAuthenticated, new CreateCategoryController().handle) // Create category
router.get("/category", isAuthenticated, new ListCategoryController().handle) // List all categorys

// -- ROTAS PRODUCT
router.post("/product", isAuthenticated, upload.single('file'), new CreateProductController().handle) // Create product
router.get("/category/product", isAuthenticated, new ListByCategoryController().handle) // List products by category

// -- ROTAS ORDER --
router.post("/order", isAuthenticated, new CreateOrderController().handle) // Create order
router.delete("/order", isAuthenticated, new RemoveOrderController().handle) // Remove order
router.post("/order/add", isAuthenticated, new AddItemController().handle) // Add an item to the order
router.delete("/order/remove", isAuthenticated, new RemoveItemController().handle) // Remove an item from the ordem
router.put("/order/send", isAuthenticated, new SendOrderController().handle) // Send the order
router.get("/orders", isAuthenticated, new ListOrdersController().handle) // List shipped orders
router.get("/order/detail", isAuthenticated, new DetailOrderController().handle) // Get order details
router.put("/order/finish", isAuthenticated, new FinishOrderController().handle)

export { router };