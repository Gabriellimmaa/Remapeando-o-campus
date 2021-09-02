import { useEffect, useState } from "react";
import { CardRoomList } from "../../components/CardRoomList";
import { Sidebar } from "../../components/Sidebar";
import api from "../../services/api";

import './style.css';

interface RoomProps {
    id: number;
    name: string;
    latitude?: number;
    longitude?: number;
    description: string;
    image: {
        id: number;
        url: string;
    }[];
}

export function RoomList() {
    const [busca, setBusca] = useState('');
    const [rooms, setRooms] = useState<RoomProps[]>([]);

    useEffect(() => {
        api.get(`roomList/${busca}`).then(response => {
            setRooms(response.data);
        });
    }, [busca]);

    if(!rooms) {
        return <div></div>
    }


    return (
        <div id="page-room">
            <Sidebar />
            <main>
                <div className="room-list">
                    <div className="room-list-container">
                        <h2>
                            Lista de Salas
                        </h2>
                        <input type="text" value={busca} onChange={e => setBusca(e.target.value)} />
                        <button onClick={() => alert("Em desenvolvimento...")}>Filtrar Por</button>
                        {
                            rooms.map(room => {
                                return (
                                    <CardRoomList room={room} />
                                )
                            })
                        }
                    </div>
                </div>
            </main>
        </div>
    );
}