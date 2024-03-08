import { User } from "./user.model";

export interface Offer {
  offer: RTCSessionDescriptionInit,
  roomId: string,
  caller: string,
  reciever: string
}

export interface offerResponse {
  data: {
    offer: RTCSessionDescriptionInit,
    roomId: string,
    caller: User,
    reciever: User
  }
}