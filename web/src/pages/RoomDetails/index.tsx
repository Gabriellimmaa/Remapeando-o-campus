import { Map, Marker, TileLayer } from "react-leaflet";
import L from 'leaflet';

import uenpLogo from '../../assets/UenpLogoPequena.png';

import './style.css';
import { Sidebar } from "../../components/Sidebar";
import { useEffect, useState } from "react";
import api from "../../services/api";

import { useParams } from 'react-router-dom';

const happyMapIcon = L.icon({
  iconUrl: uenpLogo,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

interface RoomProps {
  name: String;
  latitude?: number;
  longitude?: number;
  description: string;
}

interface RouteParamsProps {
  id: string;
}

export default function RoomDetails() {
  const { id } = useParams<RouteParamsProps>();
  const [room, setRoom] = useState<RoomProps>();
  //const [ activeImageIndex, setActiveImageIndex ] = useState(0);

  console.log(room?.latitude)

  useEffect(() => {
      api.get(`bandeirantes1/${id}`).then(response => {
          setRoom(response.data)
      });
  }, [id]);

  return (
    <div id="page-room">
      <Sidebar />

      <main>
        <div className="room-details">
          <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />

          <div className="images">
            <button className="active" type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
          </div>

          <div className="room-details-content">
            <h1>{room?.name}</h1>
            <p>{room?.description}</p>

            <div className="map-container">
              <Map
                center={[
                  room?.latitude ? room.latitude : 0, 
                  room?.longitude ? room.longitude : 0
                ]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={happyMapIcon} position={[
                  room?.latitude ? room.latitude : 0, 
                  room?.longitude ? room.longitude : 0
                ]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${room?.latitude},${room?.longitude}`}>
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}