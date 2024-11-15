// types.ts

export interface Product {
  Id: string;
  Name: string;
  Description: string;
  Price: number;
  Category: string;
  Stock: number;
  AffiliateId: string;
}

export interface SalesData {
  Id: string;
  ProductId: string;
  Product: Product;
  AffiliateId: string;
  CardId: string;
}
