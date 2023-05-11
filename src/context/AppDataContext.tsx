import { ReactNode, createContext, useContext, useReducer } from 'react';
import { initialArg, reducer } from '../reducer';

interface IAppContextData {
  handleAlertSnackbarVisible: () => void;
  alertSnackbarvisible: boolean;
}

const AppDataContext = createContext({} as IAppContextData);

interface IAppContext {
  children: ReactNode;
}

export const useAppDataContext = () => {
  return useContext(AppDataContext);
};

export const AppDataProvider = ({ children }: IAppContext) => {
  const [state, dispatch] = useReducer(reducer, initialArg);

  function handleAlertSnackbarVisible() {
    dispatch({
      type: 'setAlertSnackbarVisible',
      payload: !state.alertSnackBarVisible,
    });
  }

  return (
    <AppDataContext.Provider
      value={{
        handleAlertSnackbarVisible,
        alertSnackbarvisible: state.alertSnackBarVisible,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};
