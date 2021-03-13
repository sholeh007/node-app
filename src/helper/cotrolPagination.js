import Products from "../model/productModel.js";

async function pagination(page, item_page) {
  const item_per_page = item_page;
  const numberProduct = await Products.find().estimatedDocumentCount();
  const product = await Products.find()
    .skip((page - 1) * item_per_page)
    .limit(5);

  return {
    numberProduct,
    product,
    item_per_page,
    currentPage: page,
    hasNextPage: item_per_page * page < numberProduct,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: Math.ceil(numberProduct / item_per_page),
  };
}

export default pagination;
