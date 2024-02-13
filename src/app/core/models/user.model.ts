interface User {
  _id?: string,
  username: string,
  email: string,
  phone: string,
  password: string,
  image: string,
  accountCreatedDate?: Date,
  isDeleted?: boolean,
  otp?: string,
  otpExpiredAt?: Date
  comparePasswordinDb?(password: string, passwordDB: string)
}


