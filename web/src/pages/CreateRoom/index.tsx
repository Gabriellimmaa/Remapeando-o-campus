import { Map, Marker, TileLayer } from 'react-leaflet';
import L, { LeafletMouseEvent } from 'leaflet';

import { FiPlus } from "react-icons/fi";

import logoUenp from '../../assets/UenpLogoPequena.png';

import './style.css';
import { Sidebar } from '../../components/Sidebar';
import { ChangeEvent, FormEvent, useState } from 'react';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

const happyMapIcon = L.icon({
  iconUrl: logoUenp,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

export function CreateRoom() {
  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })

  const [name, setName] = useState('');
  const [campus, setCampus] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng
    });
  }

  function handleSelectImage(event: ChangeEvent<HTMLInputElement>) {
    if(!event.target.files) {
      return;
    }
    
    const selectedImages = Array.from(event.target.files)

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('campus', campus);
    data.append('description', description);
    data.append('weight', weight);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    images.forEach(image => {
      data.append('images', image);
    })

    await api.post('/room', data);

    alert('Cadastro realizado com sucesso!');

    history.push('/');
  }

  return (
    <div id="page-create-room">
      <main>
        <Sidebar />
        <form className="create-room-form" onSubmit={handleSubmit}>
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
              <label htmlFor="name">Nome da Sala</label>
              <input id="name" value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="name">Nome do Campus</label>
              <input id="name" value={campus} onChange={e => setCampus(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="name">Peso</label>
              <input id="name" value={weight} onChange={e => setWeight(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Descrição <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={description} onChange={e => setDescription(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={name} />
                  ) 
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#0443d6" />
                </label>
              </div>

              <input multiple onChange={handleSelectImage} type="file" name="" id="image[]" />

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
