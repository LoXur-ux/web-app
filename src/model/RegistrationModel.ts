declare type RegistrationModel = {
  Login: string;
  Password: string;
  Email: string;
  IsAnonimus: boolean;
  FirstName: string | null;
  MidName: string | null;
  LastName: string | null;
  PhoneNumber: string | null;
};

export default RegistrationModel;
