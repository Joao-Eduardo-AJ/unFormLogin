import { IUserData } from '../types';

export type Actions =
  | { type: 'setAlertSnackbarVisible'; payload: boolean }
  | {
      type: 'setRegisteredUser';
      payload: IUserData[];
    };
