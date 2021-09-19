import './style.css';
import { Sidebar, SidebarCreate } from '../../components/Sidebar';

import { FormEvent, useState } from "react";

import { Context } from '../../Context/AuthContext';
import { useContext } from 'react';

import { useHistory } from 'react-router-dom';

export function LoginUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authenticated, handleLogin, handleLogout } = useContext(Context);

  const history = useHistory();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    handleLogin(email, password);

    history.push('/Map/CreateRoom');

    console.log(authenticated);
  }

  async function handleSair() {
    handleLogout();
    history.push('/');
  }

  return (
    <div id="page-create-room">
      <main>
        <Sidebar />
        <form className="create-room-form" onSubmit={handleSubmit}>
          {
            authenticated ? (
              <>
                <div className="container-atencao">
                  <p>
                    ATENÇÃO!
                  </p>
                  <p>
                    Você está logado como Administrador
                  </p>
                </div>
                <br></br>
              </>
            ) : null
          }
          <fieldset>
            <legend>Login de usuário</legend>

            <div className="input-block">
              <div className="statusContainer">
                <label htmlFor="name">Email</label>
                <div id="statusName" className="status">status</div>
              </div>
              <input
                type="text"
                placeholder="Digite o seu email de login"
                id="name"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="input-block">
              <div className="statusContainer">
                <label htmlFor="name">Senha</label>
                <div id="statusName" className="status">status</div>
              </div>
              <input
                type="text"
                placeholder="Digite a sua senha"
                id="name"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>

          {
            authenticated ? (
              <>
                <button className="confirm-button" type="button" onClick={handleSair} style={{backgroundColor: "#fa4c4c"}}>
                  Fazer Logout | Sair do modo Administrador
                </button>
              </>
            ): null
          }
        </form>
      </main>
    </div>
  );
}