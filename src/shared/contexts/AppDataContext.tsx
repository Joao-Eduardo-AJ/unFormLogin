import { ReactNode, createContext, useContext, useReducer } from 'react';
import { initialState, reducer } from '../reducer';
import { IUserData } from '../types';
interface IAppContextData {
  handleAlertSnackbarVisible: () => void;
  alertSnackbarvisible: boolean;
  registeredUsers: IUserData[];
  userRegister: (userData: IUserData) => boolean;
  userLogin: (userData: IUserData) => boolean;
}

const AppDataContext = createContext({} as IAppContextData);

interface IAppContext {
  children: ReactNode;
}

export const useAppDataContext = () => {
  return useContext(AppDataContext);
};

export const AppDataProvider = ({ children }: IAppContext) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleAlertSnackbarVisible() {
    dispatch({
      type: 'setAlertSnackbarVisible',
      payload: !state.alertSnackBarVisible,
    });
  }

  const userLogin = (userData: IUserData) => {
    const check = state.registeredUsers.findIndex(
      user =>
        user.email === userData.email && user.password === userData.password
    );
    return check > -1;
  };

  const userRegister = (userData: IUserData) => {
    const check = state.registeredUsers.findIndex(
      user => user.email === userData.email
    );
    if (check === -1) {
      userData.id = state.registeredUsers.length + 1;
      dispatch({
        type: 'setRegisteredUser',
        payload: [...state.registeredUsers, userData],
      });
      return false;
    } else {
      console.log('usuário já cadastrado');
      return true;
    }
  };

  return (
    <AppDataContext.Provider
      value={{
        handleAlertSnackbarVisible,
        alertSnackbarvisible: state.alertSnackBarVisible,
        registeredUsers: state.registeredUsers,
        userRegister,
        userLogin,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};
