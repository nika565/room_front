import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

// Componentes funcionais
import RoomList from '../../components/RoomList';
import FormChat from '../../components/FormChat';
import MessageViewer from '../../components/MessageViewer';

// Lógica funcional
import verificacaoSala from '../../utils/verificacaoSala';
import sairSala from '../../utils/sairSala';

import './style.css'

export default function Room() {

    // Navegação de salas
    const navigate = useNavigate();

    const socket = io('http://localhost:3333');

    const mensagensRef = useRef(null);

    // Pegando o nome da sala para usar lógica em cima disso...
    const { sala } = useParams();
    const [stateRoom, setStateRoom] = useState(sala);

    // Guardar as mensagens do chat;
    const [mensagens, setMensagens] = useState(() => {
        const arrayMsg = sessionStorage.getItem(`${sala}`);
        return arrayMsg ? JSON.parse(arrayMsg) : [];
    });

    const [rooms, setRooms] = useState(() => {
        const arrayRooms = sessionStorage.getItem('rooms');
        return arrayRooms ? JSON.parse(arrayRooms) : [];
    });

    const [open, setOpen] = useState(false);

    // Verificação se a sala existe no armazenamento do navegador
    verificacaoSala(sala, rooms);

    useEffect(() => {
        socket.emit('criarSala', stateRoom);

        setMensagens(() => {
            const arrayMsg = sessionStorage.getItem(`${sala}`);
            return arrayMsg ? JSON.parse(arrayMsg) : [];
        });

        socket.on('mensagem', (mensagem) => {
            setMensagens(prev => [...prev, mensagem]);
        });

        return () => {
            socket.off('mensagem');
            socket.off(stateRoom);
        }

    }, [stateRoom]);

    return (
        <div className="div-main-room">

            <RoomList rooms={rooms} setStateRoom={setStateRoom} open={open} setOpen={setOpen} />

            <div className="div-chat">

                <main className='chat-main'>

                    <header className="chat-header">

                        <div>
                            <p className="nome-sala">{stateRoom}</p>
                        </div>

                        <div className='div-options'>
                            <p className='ver-salas' onClick={() => setOpen(true)}>Ver salas</p>
                            <button className='btn-exit' onClick={() => sairSala(stateRoom, rooms, navigate, setStateRoom, setRooms)}>Sair</button>
                        </div>
                    </header>

                    <MessageViewer mensagensRef={mensagensRef} mensagens={mensagens} sala={sala} />

                    <FormChat stateRoom={stateRoom} socket={socket} />

                </main>

            </div>

        </div>
    );
}
