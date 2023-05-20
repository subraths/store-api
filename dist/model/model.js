"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "must provide product name"],
    },
    price: {
        type: Number,
        required: [true, "must provide price"],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    createdAt: {
        type: Date,
        default: function () { return Date.now(); },
    },
    company: {
        type: String,
        // enum: ["ikea", "liddy", "caressa", "marcos"],
        enum: {
            values: ["ikea", "liddy", "caressa", "marcos"],
            message: "{VALUE} is not supported",
        },
    },
});
exports.default = mongoose_1.default.model("product", productSchema);
