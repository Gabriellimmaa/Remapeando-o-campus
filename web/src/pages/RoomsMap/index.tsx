import './style.css';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import Leaflet from 'leaflet';

import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import logoEquipe from '../../assets/logo2Equipe.png';

import marker from '../../assets/MapIcon.png';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import api from '../../services/api';
import { useState } from 'react';

const mapIcon = Leaflet.icon({
    iconUrl: marker,

    iconSize: [48, 48],
    iconAnchor: [23, 48],
    popupAnchor: [0, -60]
})

interface RoomsProps {
    id: number;
    name: String;
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

    useEffect(() => {
        api.get('room').then(response => {
            setRooms(response.data)
            setLoading(true)
        });
    }, []);

    if (!loading) {
        return null;
    }

    return (
        <div className="pageMap">
            <aside>
                <button type="button" className="button-img" onClick={() => history.push("/")}>
                    <img src={logoEquipe} title="Voltar ao início" alt="voltar"/>
                </button>
                <footer>
                    <button type="button" onClick={goBack}>
                        <FiArrowLeft size={24} color="#FFF" />
                    </button>
                </footer>
            </aside>
            <Map center={[Number(latitude), Number(longitude)]} zoom={15} style={{
                width: '100%', height: '100%',
            }}>
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                {
                    rooms.map(rooms => {
                        return (
                            rooms.weight === 10 ?
                                <Marker
                                    key={rooms.id}
                                    icon={mapIcon}
                                    position={[rooms.latitude, rooms.longitude]}
                                >
                                    <Popup closeButton={false} minWidth={240} maxHeight={240} className="mapPopup">
                                        {rooms.name}
                                        <Link to={`/Map/Room/${rooms.id}`}>
                                            <FiArrowRight size={20} color="#FFF" />
                                        </Link>
                                    </Popup>
                                </Marker> : null
                        )
                    })
                }
            </Map>
        </div>
    )
}