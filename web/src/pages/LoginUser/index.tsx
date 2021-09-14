import './style.css';
import { SidebarCreate } from '../../components/Sidebar';
import api from '../../services/api';
import { useState } from "react";

export function LoginUser() {
  const [ email, setEmail ] = useState('');
  const [ senha, setSenha ] = useState('');


  function handleSubmit() {
    api.post('');
  }

  return (
    <div id="page-create-room">
      <main>
        <SidebarCreate/>
        <form className="create-room-form" onSubmit={handleSubmit}>
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
                value={senha}
                onChange={e => setSenha(e.target.value)}
              />
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
