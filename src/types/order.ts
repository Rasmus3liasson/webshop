interface ProductData {
  order_detail_id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  product_price: number;
  subtotal: number;
}

interface OrderData {
  order_id: number;
  order_date: string;
  customer_id: number;
  customer_email: string;
  customer_address: string;
  customer_phone: string;
}

interface OrderWithProducts extends OrderData {
  products: ProductData[];
}

interface ResponseData {
  data: OrderWithProducts[];
}