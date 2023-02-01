declare type ClientModel = {
  Id: number;
  Role: number;
  IsAnonimus: boolean;
  Login: string;
  Email: string;
  FirstName: string | null;
  MidName: string | null;
  LastName: string | null;
  PhoneNumber: string | null;
};

export default ClientModel;
