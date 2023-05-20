"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = exports.getAllProductsStatic = void 0;
var model_1 = __importDefault(require("../model/model"));
var getAllProductsStatic = function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, model_1.default.find()
                    .sort("name price")
                    .select("price name")
                    .limit(5)
                    .skip(5)];
            case 1:
                products = _a.sent();
                res.status(200).json({ total: products.length, products: products });
                return [2 /*return*/];
        }
    });
}); };
exports.getAllProductsStatic = getAllProductsStatic;
var getAllProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, featured, company, name, sort, fields, numericFilters, queryObject, operatorMap_1, regEx, filters, options_1, result, sortList, fieldsList, page, limit, skip, products;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, featured = _a.featured, company = _a.company, name = _a.name, sort = _a.sort, fields = _a.fields, numericFilters = _a.numericFilters;
                queryObject = {};
                if (featured) {
                    queryObject.featured = featured === "true" ? true : false;
                }
                if (company) {
                    queryObject.company = company;
                }
                if (name) {
                    queryObject.name = { $regex: name, $options: "i" };
                }
                if (numericFilters) {
                    operatorMap_1 = {
                        ">": "$gt",
                        ">=": "$gte",
                        "=": "$eq",
                        "<": "$lt",
                        "<=": "$lte",
                    };
                    regEx = /\b(<|>|=|<=|>=)\b/g;
                    filters = numericFilters.replace(regEx, function (match) { return "-".concat(operatorMap_1[match], "-"); });
                    options_1 = ["price", "rating"];
                    filters = filters.split(",").forEach(function (item) {
                        var _a;
                        var _b = item.split("-"), field = _b[0], operator = _b[1], value = _b[2];
                        if (options_1.includes(field)) {
                            queryObject[field] = (_a = {}, _a[operator] = Number(value), _a);
                        }
                    });
                }
                result = model_1.default.find(queryObject);
                // sorting
                if (sort) {
                    sortList = sort.split(",").join(" ");
                    result = result.sort(sortList);
                }
                else {
                    result = result.sort("createdAt");
                }
                // getting specific fields for the front-end
                if (fields) {
                    fieldsList = fields.split(",").join(" ");
                    result = result.select(fieldsList);
                }
                page = Number(req.query.page) || 1;
                limit = Number(req.query.limit) || 5;
                skip = (page - 1) * limit;
                // we add skip and limit to get pagination
                result = result.skip(skip).limit(limit);
                console.log(queryObject);
                return [4 /*yield*/, result];
            case 1:
                products = _b.sent();
                res.status(200).json({ products: products, total: products.length });
                return [2 /*return*/];
        }
    });
}); };
exports.getAllProducts = getAllProducts;
