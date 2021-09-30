import './style.css';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import Leaflet from 'leaflet';

import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import logoEquipe from '../../assets/logo2Equipe.png';

import iconUser from '../../assets/UserIcon.png';
import icon1 from '../../assets/Markers/01.png';
import icon2 from '../../assets/Markers/02.png';
import icon3 from '../../assets/Markers/03.png';
import icon4 from '../../assets/Markers/04.png';
import icon5 from '../../assets/Markers/05.png';
import icon6 from '../../assets/Markers/06.png';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import api from '../../services/api';
import { useState } from 'react';

import { Context } from '../../Context/AuthContext';
import { useContext } from 'react';

const mapIcon = Leaflet.icon({
    iconUrl: icon1,

    iconSize: [48, 48],
    iconAnchor: [23, 48],
    popupAnchor: [0, -60]
})

const userIcon = Leaflet.icon({
    iconUrl: iconUser,

    iconSize: [48, 48],
    iconAnchor: [23, 48],
    popupAnchor: [0, -60]
})

const mapSala = Leaflet.icon({
    iconUrl: icon1,

    iconSize: [48, 48],
    iconAnchor: [23, 48],
    popupAnchor: [0, -60]
})
const mapLaboratorio = Leaflet.icon({
    iconUrl: icon2,

    iconSize: [48, 48],
    iconAnchor: [23, 48],
    popupAnchor: [0, -60]
})
const mapSecretaria = Leaflet.icon({
    iconUrl: icon3,

    iconSize: [48, 48],
    iconAnchor: [23, 48],
    popupAnchor: [0, -60]
})
const mapBanheiro = Leaflet.icon({
    iconUrl: icon4,

    iconSize: [48, 48],
    iconAnchor: [23, 48],
    popupAnchor: [0, -60]
})
const mapBiblioteca = Leaflet.icon({
    iconUrl: icon5,

    iconSize: [48, 48],
    iconAnchor: [23, 48],
    popupAnchor: [0, -60]
})

const mapLazer = Leaflet.icon({
    iconUrl: icon6,

    iconSize: [48, 48],
    iconAnchor: [23, 48],
    popupAnchor: [0, -60]
})

interface RoomsProps {
    id: number;
    name: String;
    type: String;
    latitude: number;
    longitude: number;
    weight: number;
}

interface RouteParamsProps {
    latitude: string;
    longitude: string;
}

export function RoomMap() {
    const { goBack } = useHistory();

    let history = useHistory();

    const { latitude, longitude } = useParams<RouteParamsProps>();
    const [rooms, setRooms] = useState<RoomsProps[]>([]);

    const [loading, setLoading] = useState(false);
    const [latitudeUser, setLatitudeUser] = useState('');
    const [longitudeUser, setLongitudeUser] = useState('');

    const [config, setConfig] = useState("");
    const { authenticated, handleLogout } = useContext(Context);

    async function handleSair() {
        handleLogout();
        history.push('/');
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
    }
    function showPosition(position: any) {
        setLatitudeUser(position.coords.latitude);
        setLongitudeUser(position.coords.longitude);
    }

    useEffect(() => {
        api.get('room').then(response => {
            setRooms(response.data)
            setLoading(true);
        });

    }, []);
    
    getLocation();
    
    if (!loading) {
        return null;
    }

    function myFunction() {
        var x = document.getElementById("myLinks")!;
        if (x.style.display === "block") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
    }

    return (
        <div className="pageMap">
            <div className="topnav-map">
                <button type="button" className="button-img" onClick={() => history.push("/")}>
                    <img src={logoEquipe} title="Voltar ao início" alt="Voltar" />
                </button>      
                {
                    authenticated ? (
                        <>
                            <button className="topnav-map-button1" id="btn" type="button" onClick={() => history.push("/Map/CreateRoom")}>Criar sala</button>
                            <button className="topnav-map-button2" id="btn" type="button" onClick={() => history.push("/Map/DeleteRoom")}>Deletar sala</button>
                            <button className="topnav-map-button3" type="button" onClick={handleSair} style={{backgroundColor: "#fa4c4c"}}>Fazer Logout</button>
                        </>
                    ) : null
                }          
                <div id="myLinks">
                    <div id="campus" className="asideRadio">
                        <a style={{fontWeight: 'bold', marginLeft: "0px"}}>Configurações:</a> 
                        <div className="mobile-container1">
                            <a><input id="input-checked" type="radio" name="radioConfig" value="" onChange={e => { setConfig(e.target.value)}}/>  Todas opções</a>
                            <a><input type="radio" name="radioConfig" value="sala" onChange={e => { setConfig(e.target.value)}}/>  Sala</a>
                            <a><input type="radio" name="radioConfig" value="laboratório" onChange={e => { setConfig(e.target.value)}}/>  Laboratório</a>
                            <a><input type="radio" name="radioConfig" value="secretaria" onChange={e => { setConfig(e.target.value)}}/>  Secretaria</a>
                            <a><input type="radio" name="radioConfig" value="biblioteca" onChange={e => { setConfig(e.target.value)}}/>  Biblioteca</a>
                        </div>
                        <div className="mobile-container2">
                            <a><input type="radio" name="radioConfig" value="banheiro" onChange={e => { setConfig(e.target.value)}}/>  Banheiro</a>
                            <a><input type="radio" name="radioConfig" value="auditório" onChange={e => { setConfig(e.target.value)}}/>  Auditório</a>
                            <a><input type="radio" name="radioConfig" value="clínica veterinária" onChange={e => { setConfig(e.target.value)}}/>  Clinica Veterinária</a>
                            <a><input type="radio" name="radioConfig" value="lanchonete" onChange={e => { setConfig(e.target.value)}}/>  Lanchonete</a>
                            <a><input type="radio" name="radioConfig" value="lazer" onChange={e => { setConfig(e.target.value)}}/>  Lazer</a>
                        </div>
                    </div>
                </div>
                <a href="javascript:void(0);" className="icon" onClick={()=>{myFunction()}}>
                    <i className="fa fa-bars fa-lg"></i>
                </a>
                <a href="javascript:void(0);" className="icon2" onClick={goBack}>
                    <FiArrowLeft size={24} color="#FFF" />
                </a>
            </div>
            <Map center={[Number(latitude), Number(longitude)]} zoom={15} style={{
                width: '100%', height: '100%',
            }}>
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                {
                    latitudeUser ? (
                        <Marker
                            icon={userIcon}
                            position={[Number(latitudeUser), Number(longitudeUser)]}
                        >
                            <Popup closeButton={false} minWidth={240} maxHeight={240} className="mapPopup">
                                Você está aqui!
                            </Popup>
                        </Marker>
                    ) : null
                }
                {
                    rooms.map(rooms => {
                        if(rooms.type === config || config === ""){
                            return(
                                <Marker
                                key={rooms.id}
                                icon={mapIcon}
                                position={[rooms.latitude, rooms.longitude]}
                                >
                                    <Popup closeButton={false} minWidth={240} maxHeight={240} className="mapPopup">
                                        <div className="card">
                                            <p style={{marginBottom: "0", marginTop: "0"}}>{rooms.name}</p>
                                            <p style={{fontSize: "15px", marginBottom: "0", marginTop: "0", marginLeft: "5px"}}>{rooms.type}</p>
                                        </div>
                                        <Link to={`/Map/Room/${rooms.id}`}>
                                            <FiArrowRight size={20} color="#FFF" />
                                        </Link>
                                    </Popup>
                                    
                                </Marker>
                            )
                        }
                    })
                }
            </Map>
        </div>
    )
}