import { type User } from 'models/master-data/user'

export interface UserListResponse extends Omit<User, 'password'> {}
