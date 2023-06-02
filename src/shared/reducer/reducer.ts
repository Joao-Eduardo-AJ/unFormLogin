import { Actions, State } from '.';

export function reducer(state: State, action: Actions) {
  switch (action.type) {
    case 'setAlertSnackbarVisible':
      return { ...state, alertSnackBarVisible: action.payload };

    case 'setBallSize':
      return { ...state, ballSize: action.payload };

    case 'setRegisteredUser':
      return { ...state, registeredUsers: action.payload };

    default:
      return state;
  }
}
