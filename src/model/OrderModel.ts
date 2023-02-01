declare type OrderModel = {
  Id: number;
  AddressFrom: string;
  AddressTo: string;
  Commentary: string;
  Price: number;
  QRCode: string;
  OrderDate: Date;
  Status: string;
  Login: string;
};

export default OrderModel;
