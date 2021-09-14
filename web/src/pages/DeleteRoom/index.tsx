import './style.css';

import { removerAcentos } from '../../components/TextFunctions/index'
import { SidebarDelete } from '../../components/Sidebar';
import { FormEvent, useState } from 'react';
import api from '../../services/api';


export function DeleteRoom() {
  const [rooms, setRooms] = useState('');
  const [name, setName] = useState('');
  const [campus, setCampus] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    let index = 0;

    if (name === "") {
      index += 1;
      const element = document.getElementById('name')!;
      element.style.border = "1px solid red";
      const status = document.getElementById('statusName')!;
      status.innerHTML = "* Campo obrigatório";
      status.style.display = "flex";
    }

    if (campus === "") {
      index += 1;
      const element = document.getElementById("campus")!;
      element.style.border = "1px solid red";
      const status = document.getElementById('statusCampus')!;
      status.innerHTML = "* Campo obrigatório";
      status.style.display = "flex";
    }

    if (index === 0) {
      api.delete(`room/${campus}/${removerAcentos(name)}`).then(response => {
        setRooms(response.data);
      });
    } else {
      alert('Informações incompletas, verifique se os campos estão preenchidos');
    }

  }

  async function check(aux: string) {
    if (aux === "name") {
      if (name === "") {
        const element = document.getElementById('name')!;
        element.style.border = "1px solid red";
        const status = document.getElementById('statusName')!;
        status.innerHTML = "* Campo obrigatório";
        status.style.display = "flex";
      } else {
        const element = document.getElementById('name')!;
        element.style.border = "1px solid #d3e2e5";
        const status = document.getElementById('statusName')!;
        status.style.display = "none";
      }
    }
    if (aux === "campus") {
      const element = document.getElementById('campus')!;
      element.style.border = "1px solid #d3e2e5";
      const status = document.getElementById('statusCampus')!;
      status.style.display = "none";
    }
  }

  return (
    <div id="page-delete-room">
      <main>
        <SidebarDelete />
        <form className="delete-room-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Deletar Sala</legend>
            <div className="input-block">
              <div className="statusContainer">
                <label htmlFor="name">Nome da Sala</label>
                <div id="statusName" className="status">status</div>
              </div>
              <input type="text" placeholder="Digite o nome da sala" id="name" value={name} onSelect={() => check("name")} onChange={e => setName(e.target.value)} />
            </div>

            <div className="input-block">
              <div className="statusContainer">
                <label htmlFor="campus">Selecione o Campus</label>
                <div id="statusCampus" className="status">status</div>
              </div>
              <div id="campus" className="input-radio">
                <input type="radio" name="radiobutton" onChange={() => { setCampus("jacarezinho"); check("campus") }} />
                <p style={{marginLeft: "5px", color: "#5c8599", marginRight: "40px"}}>Jacarézinho</p>
                <br />

                <input type="radio" name="radiobutton" onChange={() => { setCampus("cornelio"); check("campus") }} />
                <p style={{marginLeft: "5px", color: "#5c8599", marginRight: "40px"}}>Cornélio procópio</p>
                <br />
                
                <input type="radio" name="radiobutton" onChange={() => { setCampus("bandeirantes"); check("campus") }} />
                <p style={{marginLeft: "5px", color: "#5c8599", marginRight: "40px"}}>Bandeirantes</p>
              </div>
            </div>
          </fieldset>
          <div className="response">{rooms}</div>
          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}