import { Link } from 'react-router-dom';

import logo from '../../assets/UenpLogo.png';

import './style.css';

export function LandingPage() {
    
    return (
        <div className="container">
            <img src={logo} alt="UENP Logo" />
            <div className="opc">
                <Link to="Map/Room/-23.108/-50.3594239" className="Link">
                    Bandeirantes
                </Link>

                <Link to="Map/Room/-23.1747224/-50.6700414" className="Link">
                    Cornélio
                </Link>

                <Link to="Map/Room/-23.1747224/-50.6700414" className="Link">
                    Jacarezinho
                </Link>
            </div>
        </div>
    );
}