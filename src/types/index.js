// @flow

export type StatusMessage = {
  success: boolean;
  response: any;
};

export type ProductType = string;
export type CategoryName = string;

/**
 * Data about an product
 */
export type Product = {
  product_id: string;
  product_name: string;
  product_type: ProductType;
  category: CategoryName;
  price: number;
  description: string;
  img_slug: string;
  url: string;
}

/**
 * Data about an category
 */
export type Category = {
  category_id: string;
  category_name: CategoryName;
  description: string;
  img_slug: string;
  url: string;
}

export type OrderProduct = {
  product_id: string;
  product_name: string;
  product_type: ProductType;
  quantity: number;
  category: CategoryName;
  price: number;
  img_slug: string;
  url: string;
};

/**
 * Data about an order
 */
export type Order = {
  status: string;
  order_id: string;
  customer_name: string;
  customer_comment: string;
  products: OrderProduct;
  sub_total: number;
  tax: number;
  shipping: number;
  total: number;
}