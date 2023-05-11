import { Actions, State } from '.';

export function reducer(state: State, action: Actions) {
  switch (action.type) {
    case 'setAlertSnackbarVisible':
      return { ...state, alertSnackBarVisible: action.payload };

    default:
      return state;
  }
}
