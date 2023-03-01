export interface IUser {
  userId: string
  firstName: string
  lastName: string
  email: string
  password?: string | null
  classes: string[]
}