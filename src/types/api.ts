export interface api {
  login(login: string, password: string): Promise<any>
  logout(): Promise<any>
}