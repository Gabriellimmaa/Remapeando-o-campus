import { useEffect, useState } from "react";
import { CardRoomList } from "../../components/CardRoomList";
import { Sidebar } from "../../components/Sidebar";
import api from "../../services/api";

import './style.css';

interface RoomProps {
    id: number;
    name: String;
    latitude?: number;
    longitude?: number;
    description: string;
}

export function RoomList() {
    const [busca, setBusca] = useState('');
    const [rooms, setRooms] = useState<RoomProps[]>([]);

    useEffect(() => {
        api.get(`roomList/${busca}`).then(response => {
            setRooms(response.data);
        });
    }, [busca]);

    return (
        <>
            <Sidebar />
            <div className="Container">

                <h2>
                    Lista de Salas
                </h2>
                <input type="text" value={busca} onChange={e => setBusca(e.target.value)}/>
                {
                    rooms.map(room => {
                        return (
                            <CardRoomList room={room}/>
                        )
                    })
                }
            </div>
        </>
    );
}