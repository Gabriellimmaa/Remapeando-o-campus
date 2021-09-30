import './style.css';
import { Sidebar } from '../../components/Sidebar';

import { FormEvent, useState } from "react";

import { Context } from '../../Context/AuthContext';
import { useContext } from 'react';

import { useHistory } from 'react-router-dom';

export function LoginUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authenticated, handleLogin, handleLogout } = useContext(Context);

  const history = useHistory();

  function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  async function check(aux: string) {
    if (aux === "email") {
      if (email === "") {
        const element = document.getElementById('name')!;
        element.style.border = "1px solid red";
        const status = document.getElementById('statusEmail')!;
        status.innerHTML = "* Campo obrigatório";
        status.style.display = "flex";
      } else {
        const element = document.getElementById('name')!;
        element.style.border = "1px solid #d3e2e5";
        const status = document.getElementById('statusEmail')!;
        status.style.display = "none";
      }
    }
    if (aux === "senha") {
      if (password === "") {
        const element = document.getElementById('senha')!;
        element.style.border = "1px solid red";
        const status = document.getElementById('statusSenha')!;
        status.innerHTML = "* Campo obrigatório";
        status.style.display = "flex";
      } else {
        const element = document.getElementById('senha')!;
        element.style.border = "1px solid #d3e2e5";
        const status = document.getElementById('statusSenha')!;
        status.style.display = "none";
      }
    }
  }

  async function handleSubmit(event: FormEvent) {
    if (validateEmail(email)) {
    } else {
      const element = document.getElementById('name')!;
      element.style.border = "1px solid red";
      const status = document.getElementById('statusEmail')!;
      status.innerHTML = "* Email inválido";
      status.style.display = "flex";
    }

    if (password.length >= 3) {
    } else {
      const element = document.getElementById('senha')!;
      element.style.border = "1px solid red";
      const status = document.getElementById('statusSenha')!;
      status.innerHTML = "* Mínimo de 7 caracteres";
      status.style.display = "flex";
    }
    event.preventDefault();
    
    handleLogin(email, password);
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
                <div id="statusEmail" className="status">status</div>
              </div>
              <input
                type="text"
                placeholder="Digite o seu email de login"
                id="name"
                value={email}
                onChange={e => {setEmail(e.target.value)}}
                onSelect={() => check("email")}
              />
            </div>
            <div className="input-block">
              <div className="statusContainer">
                <label htmlFor="name">Senha</label>
                <div id="statusSenha" className="status">status</div>
              </div>
              <input
                type="text"
                placeholder="Digite a sua senha"
                id="senha"
                value={password}
                onChange={e => {setPassword(e.target.value)}}
                onSelect={() => check("senha")}

              />
            </div>
          </fieldset>
          <div id="status" className="statusCenter">status</div>
          {
            !authenticated ? (
              <button className="confirm-button" type="submit">
                Confirmar
              </button>
            ): null
          }

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