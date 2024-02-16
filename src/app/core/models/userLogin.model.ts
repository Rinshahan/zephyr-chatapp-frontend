import { User } from "./user.model"

interface UserLogin {
  email: string,
  password: string,
  token?: string,
  user?: User
}

export default UserLogin