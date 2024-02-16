import { User } from "./user.model";

export interface UserResponse {
  status: string;
  data: {
    getUsers: User[];
  };
}

export interface ChatResponse {
  status: string,
  message: [{
    _id: string,
    sender: string,
    reciever: string,
    message: string,
    createdAt: any,
    updatedAt: any,
  }]
}


export interface decodedToken {
  _id: string
}