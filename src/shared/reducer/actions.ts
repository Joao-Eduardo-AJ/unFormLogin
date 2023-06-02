import { IUserData } from '../types';

export type Actions =
  | { type: 'setAlertSnackbarVisible'; payload: boolean }
  | { type: 'setBallSize'; payload: number }
  | {
      type: 'setRegisteredUser';
      payload: IUserData[];
    };
