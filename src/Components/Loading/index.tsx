import React from "react";
import "./style.css";
interface ILoading {}

// eslint-disable-next-line no-empty-pattern
const Loading: React.FC<ILoading> = ({}) => {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <h1 className="text-7xl text-center text-white">
        Controle de Território
        <div className="roller text-5xl">
          <span id="rolltext">
            <p className="mb-6">Carregando...</p>
            <p className="mb-6">Buscando territórios...</p>
            <p className="mb-6">Analizando dados...</p>
            <p className="mb-6">Verificando informações...</p>
            <p className="mb-6">Autenticando usuário...</p>
            <p className="mb-6">Carregando...</p>
          </span>
        </div>
      </h1>
    </main>
  );
};

export default Loading;
