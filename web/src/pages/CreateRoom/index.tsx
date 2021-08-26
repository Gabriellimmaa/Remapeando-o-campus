import { Map, Marker, TileLayer } from 'react-leaflet';
import L, { LeafletMouseEvent } from 'leaflet';

import { FiPlus } from "react-icons/fi";

import logoUenp from '../../assets/UenpLogoPequena.png';

import './style.css';
import { Sidebar } from '../../components/Sidebar';
import { useState } from 'react';

const happyMapIcon = L.icon({
  iconUrl: logoUenp,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

export function CreateRoom() {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })


  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng
    });
  }

  return (
    <div id="page-create-room">
      <main>
        <Sidebar />
        <form className="create-room-form">
          <fieldset>
            <legend>Cadastrar Sala</legend>

            <Map
              center={[-23.108, -50.3594239]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {
                position.latitude !== 0 ?
                 <Marker interactive={false} icon={happyMapIcon} position={[position.latitude, position.longitude]} /> :
                 null
              }

            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" />
            </div>

            <div className="input-block">
              <label htmlFor="about">Descrição <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image">

              </div>

              <button className="new-image">
                <FiPlus size={24} color="#0443d6" />
              </button>
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

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
