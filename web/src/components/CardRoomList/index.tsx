import './style.css';

import img from '../../assets/UenpLogoPequena.png'
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

interface RoomProps {
    room: {
        id: number;
        name: string;
        latitude?: number;
        longitude?: number;
        description: string;
        image: {
            id: number;
            url?: string;
        }[];
    }
}

export function CardRoomList({ room, ...rest }: RoomProps) {

    if (!room) {
        return <div></div>
    }

    return (
        <div className="containerList">
            <div className="containerTitle">
                { room.image[0].url ? <img src={room.image[0].url} alt={room.name} /> : <div></div>}
            </div>
            <div className="containerDescription">
                <div className="title">
                    {room.name}
                </div>
                <h4>
                    Descrição
                </h4>
                <p>
                    {room.description}
                </p>
            </div>
            <div className="linkContainer">
                <Link to={`/Map/Room/${room.id}`}>
                    <FiArrowRight size={20} color="#FFF" />
                </Link>
            </div>
        </div>

    );
}