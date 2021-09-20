import './style.css';
import { Sidebar } from '../../components/Sidebar';
import { FormEvent, useState } from 'react';
import api from '../../services/api';


export function CreateUser() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const emailAuth = localStorage.getItem('email');


    if(emailAuth === 'test1@gmail.com') {
      try {
        await api.post('/user/create', {email, password}, { headers: {'Authorization': api.defaults.headers.Authorization}});
        alert('Cadastro realizado com sucesso!');
  
        setEmail('');
        setPassword('');
      } catch (e) {
        alert(e);
      }
    } else {
      alert('Você não tem permissão para cadastrar novos usuários')
    }
  }

  return (
    <div id="page-create-room">
      <main>
        <Sidebar />
        <form className="create-room-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Cadastrar Administrador</legend>


            <div className="input-block">
              <div className="statusContainer">
                <label htmlFor="email">E-mail</label>
              </div>
              <input type="text" placeholder="Digite o nome da sala" id="name" value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div className="input-block">
              <div className="statusContainer">
                <label htmlFor="password">Senha</label>
              </div>
              <input type="text" placeholder="Digite o nome da sala" id="name" value={password} onChange={e => setPassword(e.target.value)} />
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