import { User } from "./user.model";

export interface Offer {
  offer: RTCSessionDescriptionInit,
  roomId: string,
  caller: string,
  reciever: string
}

export interface offerResponse {
  offer: RTCSessionDescriptionInit,
  roomId: string,
  caller: User,
  reciever: User
}

export interface answer {
  answerer: string,
  reciever: string,
  answer: RTCSessionDescriptionInit
}

export interface answerResponse {
  answerer: User,
  recievedUser: User,
  answer: RTCSessionDescriptionInit
}

export interface sendCandidate {
  sender: string,
  reciever: string,
  candidate: RTCIceCandidate
}

export interface candidateOffer {
  sender: User,
  reciever: User,
  candidate: RTCIceCandidate
}

export interface Invitation {
  invitationSender: string,
  invitationReceiver: string
}

export interface InvitationResponse {
  invitationSender: User
  invitationReceiver: User
}

export interface InvitationAnswer {
  inviteAnswerer: User,
  AnswerReceiver: User
}

export interface InvitationReject {
  inviteRejecter: User,
  rejectReciever: User
}