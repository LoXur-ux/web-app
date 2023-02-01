export declare type WorkerOrderModel = {
  Id: number;
  QR: string;
  Commentary: string;
  OrderTime: Date;
  TimeToRecive: Date;
  TimeToDeliver: Date;
  AddressFrom: string;
  AddressTo: string;
  Status: string;
  Login: string;
};

export default WorkerOrderModel;
