import green from 'material-ui/colors/green';
import cyan from 'material-ui/colors/cyan';
import blue from 'material-ui/colors/blue';
import orange from 'material-ui/colors/orange';
import grey from 'material-ui/colors/grey';
import red from 'material-ui/colors/red';

export const API_URL = "http://localhost:3000/";
export const API_HEADERS = {
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
};

export const ORDER_STATUSES = {
  1: "COMPLETED",
  2: "SHIPPED",
  3: "PROCESSED",
  4: "CANCELLED",
  5: "REFUNDED",
  6: "VOIDED"
};

export const ORDER_STATUS_COLOR = {
  1: green[400],
  2: cyan[400],
  3: blue[400],
  4: red[400],
  5: orange[400],
  6: grey[900]
};



export const staticProducts = [
  {
    "product_id": "PID_2983",
    "product_name": "Furniture BOI",
    "product_type": "PHYSICAL",
    "category": "furniture",
    "price": 999.99,
    "description": "This product truly is a furniture.",
    "img_slug": "https://cdn.shopify.com/s/files/1/0202/3990/products/Bras_Highback_Wood_Base_Lounge_Chair.jpg?v=1483052223",
    "url": "https://stuff.com/product-name"
  },
  {
    "product_id": "PID_2982",
    "product_name": "DESK BOI 5000",
    "product_type": "PHYSICAL",
    "category": "desks",
    "price": 119.99,
    "description": "This desk saved my life.",
    "img_slug": "https://cdn.shopify.com/s/files/1/2100/4737/products/DES01-2_900x.png?v=1510673387",
    "url": "https://stuff.com/product-name"
  },
  {
    "product_id": "PID_2981",
    "product_name": "Lamp that lights up",
    "product_type": "PHYSICAL",
    "category": "lighting",
    "price": 39.99,
    "description": "Is this a lamp? I can't tell; it's too dark in here..",
    "img_slug": "https://s-media-cache-ak0.pinimg.com/originals/3a/47/70/3a4770f9ab6ea84060fe213493ef66d0.jpg",
    "url": "https://stuff.com/product-name"
  },
  {
    "product_id": "PID_2980",
    "product_name": "A Tea Kettle",
    "product_type": "PHYSICAL",
    "category": "accessories",
    "price": 1.99,
    "description": "This accessory could have destroyed you but it decided that humans deserve a chance to fail.",
    "img_slug": "https://images-na.ssl-images-amazon.com/images/I/71MEIX1jvEL._SX355_.jpg",
    "url": "https://stuff.com/product-name"
  }
];


export const staticCategories = [
  {
    "category_id": "CID_1",
    "category_name": "Furniture",
    "description": "Things you sit on",
    "img_slug": "https://images-na.ssl-images-amazon.com/images/I/71MEIX1jvEL._SX355_.jpg",
    "url": "https://stuff.com/furniture"
  },
  {
    "category_id": "CID_2",
    "category_name": "Desks",
    "description": "Things you sit at",
    "img_slug": "https://images-na.ssl-images-amazon.com/images/I/71MEIX1jvEL._SX355_.jpg",
    "url": "https://stuff.com/desks"
  },
  {
    "category_id": "CID_3",
    "category_name": "Lighting",
    "description": "Things you see",
    "img_slug": "https://images-na.ssl-images-amazon.com/images/I/71MEIX1jvEL._SX355_.jpg",
    "url": "https://stuff.com/lighting"
  },
  {
    "category_id": "CID_4",
    "category_name": "Accessories",
    "description": "Things you add onto stuff",
    "img_slug": "https://images-na.ssl-images-amazon.com/images/I/71MEIX1jvEL._SX355_.jpg",
    "url": "https://stuff.com/accessories"
  }
];


export const staticOrders = [
  {
    "status": 5,
    "order_id": "10234",
    "customer_name": "Karen Short",
    "customer_comment": "This order needs to be refunded",
    "products": [
      {
        "product_id": "PID_2983",
        "product_name": "Furniture BOI",
        "product_type": "PHYSICAL",
        "quantity": 1,
        "category": "furniture",
        "price": 999.99,
        "img_slug": "https://cdn.shopify.com/s/files/1/0202/3990/products/Bras_Highback_Wood_Base_Lounge_Chair.jpg?v=1483052223",
        "url": "https://stuff.com/product-name"
      },
      {
        "product_id": "PID_2982",
        "product_name": "DESK BOI 5000",
        "product_type": "PHYSICAL",
        "quantity": 1,
        "category": "desks",
        "price": 119.99,
        "img_slug": "https://cdn.shopify.com/s/files/1/2100/4737/products/DES01-2_900x.png?v=1510673387",
        "url": "https://stuff.com/product-name"
      }
    ],
    "sub_total": 1119.98,
    "tax": 5.9,
    "shipping": 7.00,
    "total": 1182.97
  },
  {
    "status": 1,
    "order_id": "10233",
    "customer_name": "Brad Chesney",
    "customer_comment": "",
    "products": [
      {
        "product_id": "PID_2980",
        "product_name": "A Tea Kettle",
        "product_type": "PHYSICAL",
        "quantity": 10,
        "category": "accessories",
        "price": 1.99,
        "description": "This accessory could have destroyed you but it decided that humans deserve a chance to fail.",
        "img_slug": "https://images-na.ssl-images-amazon.com/images/I/71MEIX1jvEL._SX355_.jpg",
        "url": "https://stuff.com/product-name"
      }
    ],
    "sub_total": 19.9,
    "tax": .99,
    "shipping": 7.99,
    "total": 28.88
  },
  {
    "status": 3,
    "order_id": "10232",
    "customer_name": "Tim Johnson",
    "customer_comment": "Shipping address changed",
    "products": [
      {
        "product_id": "PID_2980",
        "product_name": "A Tea Kettle",
        "product_type": "PHYSICAL",
        "quantity": 5,
        "category": "accessories",
        "price": 1.99,
        "description": "This accessory could have destroyed you but it decided that humans deserve a chance to fail.",
        "img_slug": "https://images-na.ssl-images-amazon.com/images/I/71MEIX1jvEL._SX355_.jpg",
        "url": "https://stuff.com/product-name"
      }
    ],
    "sub_total": 9.95,
    "tax": .49,
    "shipping": 7.99,
    "total": 18.43
  },
  {
    "status": 4,
    "order_id": "10231",
    "customer_name": "Tim Johnson",
    "customer_comment": "Shipping address changed",
    "products": [
      {
        "product_id": "PID_2980",
        "product_name": "A Tea Kettle",
        "product_type": "PHYSICAL",
        "quantity": 5,
        "category": "accessories",
        "price": 1.99,
        "description": "This accessory could have destroyed you but it decided that humans deserve a chance to fail.",
        "img_slug": "https://images-na.ssl-images-amazon.com/images/I/71MEIX1jvEL._SX355_.jpg",
        "url": "https://stuff.com/product-name"
      }
    ],
    "sub_total": 9.95,
    "tax": .49,
    "shipping": 7.99,
    "total": 18.43
  },
  {
    "status": 6,
    "order_id": "10230",
    "customer_name": "Shay Ericson",
    "customer_comment": "",
    "products": [
      {
        "product_id": "PID_2980",
        "product_name": "A Tea Kettle",
        "product_type": "PHYSICAL",
        "quantity": 5,
        "category": "accessories",
        "price": 1.99,
        "description": "This accessory could have destroyed you but it decided that humans deserve a chance to fail.",
        "img_slug": "https://images-na.ssl-images-amazon.com/images/I/71MEIX1jvEL._SX355_.jpg",
        "url": "https://stuff.com/product-name"
      }
    ],
    "sub_total": 9.95,
    "tax": .49,
    "shipping": 7.99,
    "total": 18.43
  }
];
