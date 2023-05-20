"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controller_1 = require("../controller/controller");
var router = (0, express_1.Router)();
router.route("/").get(controller_1.getAllProducts);
router.route("/static").get(controller_1.getAllProductsStatic);
exports.default = router;
