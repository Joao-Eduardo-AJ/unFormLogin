import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { initialState, reducer } from '../reducer';
import { IUserData } from '../types';
interface IAppContextData {
  handleAlertSnackbarVisible: () => void;
  alertSnackbarvisible: boolean;
  ballSize: number;
  registeredUsers: IUserData[];
  userRegister: (userData: IUserData) => boolean;
  userLogin: (userData: IUserData) => boolean;
  handleLogout: () => Promise<void>;
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

  const handleBallSize = (data: number) => {
    dispatch({ type: 'setBallSize', payload: data });
  };

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

  const handleLogout = async () => {
    const registeredUsers = state.registeredUsers;
    registeredUsers.splice(registeredUsers.length - 1, 1);
    dispatch({ type: 'setRegisteredUser', payload: registeredUsers });
  };

  useEffect(() => {
    let pageWidth = 0;
    function handleResize() {
      pageWidth = window.innerWidth;
      pageWidth < 500
        ? handleBallSize(15)
        : pageWidth >= 500 && pageWidth < 1000
        ? handleBallSize(25)
        : handleBallSize(35);
    }
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AppDataContext.Provider
      value={{
        handleAlertSnackbarVisible,
        alertSnackbarvisible: state.alertSnackBarVisible,
        registeredUsers: state.registeredUsers,
        ballSize: state.ballSize,
        handleLogout,
        userRegister,
        userLogin,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};
