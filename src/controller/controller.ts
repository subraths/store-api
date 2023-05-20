import { Response, Request } from "express";
import ProductModel from "../model/model";

export const getAllProductsStatic = async (_: Request, res: Response) => {
  const products = await ProductModel.find()
    .sort("name price")
    .select("price name")
    .limit(5)
    .skip(5);

  res.status(200).json({ total: products.length, products });
};

interface queryObjectType {
  [key: string]: any;
}

export const getAllProducts = async (req: Request, res: Response) => {
  const {
    featured,
    company,
    name,
    sort,
    fields,
    numericFilters,
  }: queryObjectType = req.query;

  const queryObject: queryObjectType = {};

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
    const operatorMap: queryObjectType = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|=|<=|>=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match: string) => `-${operatorMap[match]}-`
    );

    const options = ["price", "rating"];

    filters = filters.split(",").forEach((item: string) => {
      const [field, operator, value] = item.split("-");

      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  // querying the resulting data
  let result = ProductModel.find(queryObject);

  // sorting
  if (sort) {
    // sort method take 1 or more parameters seperated by space(" ")
    // we split and join because, we are getting a query, that is seperated by ","(comma)
    // but mongoDB requires us to provide parameters seperated by " "(parameters seperated by empty space)
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  // getting specific fields for the front-end
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  // pagination using skip and limit
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;

  const skip = (page - 1) * limit;

  // we add skip and limit to get pagination
  result = result.skip(skip).limit(limit);

  console.log(queryObject);

  const products = await result;
  res.status(200).json({ products, total: products.length });
};
