import { User } from "./user.model";

export interface UserResponse {
  status: string;
  data: {
    getUsers: User[];
  };
}

export interface ChatResponse {
  message: [{
    _id: string,
    sender: string,
    reciever: string,
    message: string,
    createdAt?: Date,
    updatedAt?: Date,
  }]
}

export interface ChatSocket {
  _id: string,
  sender: string,
  reciever: string,
  message: string,
  createdAt: Date,
  updatedAt: Date
}


export interface decodedToken {
  _id: string
}