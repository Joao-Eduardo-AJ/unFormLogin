import { IUserData } from '../types';

export interface State {
  alertSnackBarVisible: boolean;
  ballSize: number;
  registeredUsers: IUserData[];
}
