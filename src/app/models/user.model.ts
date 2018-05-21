export class UserModel {
  login: string;
  password: string;
  userId: number;
  userRoleId: number;
  isAdministrator: boolean;

  constructor (login: string, password?: string, userId?: number, userRoleId?: number) {
    this.login = login;
    this.password = password;
    this.userId = userId;
    this.userRoleId = userRoleId;
    this.isAdministrator = false;
  }
}
