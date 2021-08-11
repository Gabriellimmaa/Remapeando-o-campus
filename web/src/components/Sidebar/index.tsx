import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import './style.css';

import logoUenp from '../../assets/UenpLogoPequena.png';

export function Sidebar() {
    const { goBack } = useHistory();

    return (
        <aside className="app-sidebar">
            <img src={logoUenp} alt="Happy" />

            <footer>
                <button type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color="#FFF" />
                </button>
            </footer>
        </aside>
    )
}