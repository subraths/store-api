import { Router } from "express";
import { getAllProducts, getAllProductsStatic } from "../controller/controller";

const router = Router();

router.route("/").get(getAllProducts);
router.route("/static").get(getAllProductsStatic);

export default router;
