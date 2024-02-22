import React from 'react';
import { useContextHook } from '../Context';
import LoginBox from '@Components/LoginBox';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Loading from '@Components/Loading/index';
import Dashboard from '@Pages/Dashboard/index';

interface IRoutesComponents {}

// eslint-disable-next-line no-empty-pattern
const RoutesComponents: React.FC<IRoutesComponents> = ({}) => {
  const { isLogged } = useContextHook();

  const isLoadingLogin = isLogged === undefined;

  if (isLoadingLogin) return <Loading />;

  return (
    <main className="overflow-x-hidden">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={!isLogged ? <LoginBox /> : <Navigate to="/dashboard" />}
          />
        </Routes>
        <Routes>
          <Route
            path="/dashboard"
            element={isLogged ? <Dashboard /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default RoutesComponents;
