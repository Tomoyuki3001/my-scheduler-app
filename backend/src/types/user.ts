export interface InterfaceUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified: Boolean;
}

export interface InterfaceUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
