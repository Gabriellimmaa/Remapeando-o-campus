import { Link } from 'react-router-dom';

import logo from '../../assets/UenpLogo.png';

import './style.css';


export function LandingPage() {
    return (
        <div className="container gradient">
            <div className="Clouds">
                <div className=" container-center">
                    <div className="container-itens">
                        <img className="img" src={logo} alt="UENP Logo" />
                        <Link className="button-class" to={`/Map/Room/-23.1747224/-50.6700414`}>
                            Jacarézinho
                        </Link>
                        <Link className="button-class" to={`/Map/Room/-23.1747224/-50.6700414`}>
                            Cornélio Procópio
                        </Link>
                        <Link className="button-class" to={`/Map/Room/-23.108/-50.3594239`}>
                            Bandeirantes
                        </Link>
                        <button className="text" onClick={() => alert("Em desenvolvimento...")}>Ajuda</button>
                        <div className="container-atencao">
                            <p>
                                ATENÇÃO!
                            </p>
                            <p>
                                A localização de algumas </p>
                            <p>
                                salas no mapa pode não ser exata!
                            </p>
                            <p>
                                O site ainda está em desenvolvimento
                            </p>

                        </div>
                    </div>
                </div>

                <div className="Cloud Foreground"></div>
                <div className="Cloud Background"></div>
                <div className="Cloud Foreground"></div>
                <div className="Cloud Background"></div>
                <div className="Cloud Background"></div>
                <div className="Cloud Foreground"></div>
                <div className="Cloud Background"></div>
                <div className="Cloud Foreground"></div>
                <div className="Cloud Background"></div>
                <div className="Cloud Background"></div>
                <div className="Cloud Background"></div>
                <div className="Cloud Foreground"></div>
            </div>
        </div>
    );
}