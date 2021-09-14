import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import './style.css';

import logoEquipe from '../../assets/logo2Equipe.png';

export function Sidebar() {
    const { goBack } = useHistory();

    let history = useHistory();

    return (
        <aside className="app-sidebar">
            <button type="button" className="button-img" onClick={() => history.push("/")}>
                <img src={logoEquipe} title="Voltar ao início" alt="Voltar" />
            </button>
            <footer>
                <button type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color="#FFF" />
                </button>
            </footer>
        </aside>
    )
}

export function SidebarCreate() {
    const { goBack } = useHistory();

    let history = useHistory();

    return (
        <aside className="app-sidebar-adm">
            <button type="button" className="button-img" onClick={() => history.push("/")}>
                <img src={logoEquipe} title="Voltar ao início" alt="Voltar" />
            </button>
            <button className="button1" id="select" type="button">Criar sala</button>
            <button className="button2" id="btn" type="button" onClick={() => history.push("/Map/DeleteRoom")}>Deletar sala</button>

            <footer>
                <button type="button" onClick={goBack}>
                    Sair
                </button>
            </footer>
        </aside>
    )
}

export function SidebarDelete() {
    const { goBack } = useHistory();

    let history = useHistory();

    return (
        <aside className="app-sidebar-adm">
            <button type="button" className="button-img" onClick={() => history.push("/")}>
                <img src={logoEquipe} title="Voltar ao início" alt="Voltar" />
            </button>
            <button className="button2" id="btn" type="button" onClick={() => history.push("/Map/CreateRoom")}>Criar sala</button>
            <button className="button1" id="select" type="button">Deletar sala</button>

            <footer>
                <button type="button" onClick={goBack}>
                    Sair
                </button>
            </footer>
        </aside>
    )
}