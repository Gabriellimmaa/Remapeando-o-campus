import './style.css';

import img from '../../assets/UenpLogoPequena.png'
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

interface RoomProps {
    room: {
        id: number;
        name: String;
        latitude?: number;
        longitude?: number;
        description: string;
    }
}

export function CardRoomList({ room, ...rest }: RoomProps) {
    return (
        <div className="containerList">
            <div className="containerTitle">
                <div className="title">
                    {room.name}
                </div>
                <img src={img} alt="" />
            </div>
            <div className="containerDescription">
                <h3>
                    Descrição
                </h3>
                <p>
                    {room.description}
                </p>
            </div>
            <Link to={`/Map/Room/${room.id}`} className="linkContainer">
                <FiArrowRight size={20} color="#FFF" />
            </Link>
        </div>

    );
}