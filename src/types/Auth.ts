export type AuthContext = {
  user: any,
  login: () => void,
  logout: () => void
}