export interface ProductData {
  Id: string;
  Name: string;
  Description: string;
  Price: number;
  Category: string;
  Stock: number;
  AffiliateId: string;
}

export interface SimplifiedSalesData {
  Name: string;
  Description: string;
  Price: number;
  AffiliateId: string;
  CardId: string;
}

export interface SalesData {
  Id: string;
  ProductId: string;
  Product: ProductData;
  AffiliateId: string;
  CardId: string;
}
