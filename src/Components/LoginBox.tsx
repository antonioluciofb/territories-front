import React, { useState } from 'react';
import { useContextHook } from '@Context/index';
import { usersService } from '../Services/users';
import { Spinner } from 'phosphor-react';

// import { Container } from './styles';

interface ILoginBox {}

// eslint-disable-next-line no-empty-pattern
const LoginBox: React.FC<ILoginBox> = ({}) => {
  const { handleSaveLogin } = useContextHook();

  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: '',
  });

  const handleLogin = async () => {
    setIsLoadingLogin(true);
    try {
      const token = await usersService.login(
        userDetails.username,
        userDetails.password,
      );
      console.log('🚀 ~ handleLogin ~ token:', token);
      handleSaveLogin(token);
    } catch (error) {
      console.log(error);
    }
    setIsLoadingLogin(false);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-11/12 max-w-3xl h-2/4 bg-gray-200 rounded-lg shadow-lg flex flex-col justify-evenly items-center">
        <div>
          <h1 className="text-5xl text-gray-900 font-bold text-center mb-4">
            Controle de Território
          </h1>
          <p className="text-3xl text-center ">Congregação Norte</p>
        </div>

        <div className="w-1/2 flex flex-col justify-center items-center">
          <input
            type="text"
            placeholder="Usuário"
            className="w-full h-14 text-2xl bg-white rounded-lg shadow-lg px-4 mb-4 outline-none border-2 border-gray-900 disabled:opacity-50"
            value={userDetails.username}
            disabled={isLoadingLogin}
            onChange={(e) =>
              setUserDetails({ ...userDetails, username: e.target.value })
            }
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleLogin();
              }
            }}
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full h-14 text-2xl bg-white rounded-lg shadow-lg px-4 mb-4 outline-none border-2 border-gray-900 disabled:opacity-50"
            value={userDetails.password}
            disabled={isLoadingLogin}
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleLogin();
              }
            }}
          />
          <button
            className="w-full h-14 bg-gray-700 rounded-lg shadow-lg text-white font-bold text-xl
          hover:bg-gray-900 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleLogin}
            disabled={
              userDetails.username === '' ||
              userDetails.password === '' ||
              isLoadingLogin
            }
          >
            Entrar
          </button>
          {isLoadingLogin && (
            <Spinner
              size={48}
              weight="bold"
              className="animate-spin mt-4 text-green-600"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginBox;
