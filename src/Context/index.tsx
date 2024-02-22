import * as Jose from 'jose';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Card } from '@Types/Cards';
import { clientApi } from '@Services/client';
import { DontVisit } from '@Types/DontVisit';
import { Designated } from '@Types/Designated';
import { localStorageLoginKey } from 'Constants/login';
import { Record } from '@Types/Records';
import { TerritoryClosures } from '@Types/TerritoryClosures';
import { toast } from 'react-toastify';
import { UserDetails } from 'Types/Context';
import {
  getTokenFromLocalStorage,
  saveTokenInLocalStorage,
} from '@Utils/login';
import { OptionsType } from '@Types/Create';
import { arraySelectorOptions } from '@Constants/optionsSelector';
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface AllData {
  cards: Card[] | undefined;
  records: Record[] | undefined;
  dontVisit: DontVisit[] | undefined;
  designateds: Designated[] | undefined;
  territoryClosures: TerritoryClosures[] | undefined;
}

interface ContextProps {
  isLogged: undefined | boolean;
  userDetails?: UserDetails;
  handleSaveLogin: (token: string) => void;
  handleLogout: () => void;
  allData: AllData;
  setAllData: (data: AllData) => void;
  createNew: OptionsType;
  setCreateNew: (option: OptionsType) => void;
  selectedOption: OptionsType;
  setSelectedOption: (option: OptionsType) => void;
}

const Context = createContext({} as ContextProps);
const secret = new TextEncoder().encode('secretKey');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ContextProvider: React.FC<any> = ({ children }) => {
  const token = getTokenFromLocalStorage();

  const [isLogged, setIsLogged] = useState<undefined | boolean>();

  const [userDetails, setUserDetails] = useState<UserDetails>();

  const [createNew, setCreateNew] = useState<OptionsType>('');
  const [selectedOption, setSelectedOption] = useState<OptionsType>(
    arraySelectorOptions[0].key,
  );

  const [allData, setAllData] = useState<AllData>({
    cards: undefined,
    records: undefined,
    dontVisit: undefined,
    designateds: undefined,
    territoryClosures: undefined,
  });

  async function handleSaveLogin(token: string) {
    try {
      const decodedToken = Jose.decodeJwt(token) as UserDetails;

      clientApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUserDetails(decodedToken);

      saveTokenInLocalStorage(token);
      toast.success('Login realizado com sucesso!');

      setIsLogged(true);
    } catch (error) {
      toast.error('Erro ao fazer login');
    }
  }

  async function handleLogout() {
    localStorage.setItem(localStorageLoginKey, '');
    setIsLogged(false);
  }

  const verifyToken = async () => {
    try {
      await Jose.jwtVerify(token, secret);
      const decodedToken = Jose.decodeJwt(token) as UserDetails;

      clientApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUserDetails(decodedToken);
      setIsLogged(true);
    } catch (error) {
      localStorage.removeItem(localStorageLoginKey);
      setIsLogged(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <Context.Provider
      value={{
        isLogged,
        handleSaveLogin,
        handleLogout,
        userDetails,
        allData,
        setAllData,
        createNew,
        setCreateNew,
        selectedOption,
        setSelectedOption,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useContextHook = () => useContext(Context);
