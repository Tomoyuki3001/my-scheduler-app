export interface InterfaceUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface InterfaceUserInput {
  name: string;
  email: string;
  password: string;
}
