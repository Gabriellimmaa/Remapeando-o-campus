import './style.css';

import logo from '../../assets/UenpLogoPequena.png';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import Leaflet from 'leaflet';

import { FiArrowRight } from 'react-icons/fi';

import marker from "../../assets/UenpLogoPequena.png";
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import api from '../../services/api';
import { useState } from 'react';

const mapIcon = Leaflet.icon({
    iconUrl: marker,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [165, 2],
})

interface RoomsProps {
    id: number;
    name: String;
    latitude: number;
    longitude: number;
}

interface RouteParamsProps {
    latitude: string;
    longitude: string;
}

export function RoomMap() {
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
                <header>
                    <img src={logo} alt="Logo UENP" />
                </header>
            </aside>

            <Map center={[Number(latitude), Number(longitude)]} zoom={15} style={{
                width: '100%', height: '100%',
            }}>
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                {
                    rooms.map(rooms => {
                        return (
                            <Marker
                                key={rooms.id}
                                icon={mapIcon}
                                position={[rooms.latitude, rooms.longitude]}
                            >
                                <Popup closeButton={false} minWidth={240} maxHeight={240} className="mapPopup">
                                    {rooms.name}
                                    <Link to={`/Room/${rooms.id}`}>
                                        <FiArrowRight size={20} color="#FFF" />
                                    </Link>
                                </Popup>
                            </Marker>
                        )
                    })
                }
            </Map>
        </div>
    )
}