import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { Link, useNavigate } from 'react-router-dom';
import idGenerator from '../../utils/idGenerator';

import './style.css'

export default function Room() {

    const navigate = useNavigate();

    const socket = io('http://localhost:3333');

    // Pegando o nome da sala para usar lógica em cima disso...
    const { sala } = useParams();
    const [stateRoom, setStateRoom] = useState(sala);
    const nickname = localStorage.getItem('nickname');


    // Guardar as mensagens do chat;
    const [mensagens, setMensagens] = useState(() => {
        const arrayMsg = sessionStorage.getItem(`${sala}`);
        return arrayMsg ? JSON.parse(arrayMsg) : [];
    });

    // Alterar as cores quando clica na sala
    const [indiceAtivo, setIndiceAtivo] = useState(0);

    const [rooms, setRooms] = useState(() => {
        const arrayRooms = sessionStorage.getItem('rooms');
        return arrayRooms ? JSON.parse(arrayRooms) : [];
    })

    const [texto, setTexto] = useState('');

    // Pegando o id do usuário para idetificar se a mensagem é dele ou não
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        console.log('Conectando ao servidor...');
        socket.emit('criarSala', stateRoom);
    }, [stateRoom])

    useEffect(() => {

        setMensagens(() => {
            const arrayMsg = sessionStorage.getItem(`${sala}`);
            return arrayMsg ? JSON.parse(arrayMsg) : [];
        })

    }, [stateRoom]);

    // Conexão com a sala criada
    useEffect(() => {

        socket.on('mensagem', (mensagem) => {
            console.log('SOCKET:', socket);
            setMensagens(prev => [...prev, mensagem]);
        });

        return () => {
            socket.off('mensagem');
        }

    }, [stateRoom]);

    useEffect(() => {
        const jsonMsg = JSON.stringify(mensagens);
        sessionStorage.setItem(`${sala}`, jsonMsg);
    }, [mensagens]);


    // Pegar o valor digitado da mensagem
    const handleChange = (event) => {
        setTexto(event.target.value);
    };

    const alternarClasse = (index) => {
        setIndiceAtivo(index === indiceAtivo ? null : index)
        setStateRoom(rooms[index]);
        mudarSala(index);
    }

    const mudarSala = (index) => {
        navigate(`/room/${rooms[index]}`)
    }

    // Enviar mensagem
    const handleSubmit = (evento) => {

        evento.preventDefault();

        console.log('teste')

        const content = {
            id: idGenerator(),
            userId: userId,
            mensagem: texto,
            sala: stateRoom,
            nickname: nickname
        }

        setTexto('');

        socket.emit('mensagemSala', content);
    };

    return (
        <div className="div-main-room">

            <aside className='aside'>

                {/* Cabeçalho de opções */}
                <header className='header-aside'>
                    <h1 className='h1-aside'>Minhas salas</h1>

                    <Link to={'/create-room'}><button title='Criar Sala' >+</button></Link>

                </header>

                {
                    // Exibição das salas do usuário
                    rooms.length > 0 ? rooms.map((item, index) => {

                        return (
                            <div className={`div-rooms ${indiceAtivo === index ? 'room-selected' : ''}`} onClick={() => alternarClasse(index)} key={index}>
                                &nbsp;&nbsp;&nbsp;&nbsp;{item}
                            </div>
                        );
                    })

                        :

                        <p>Sem salas...</p>
                }




            </aside>

            <div className="div-chat">

                <main className='chat-main'>

                    <header className="chat-header">
                        <p className="nome-sala">{stateRoom}</p>
                    </header>

                    <div className='div-messages'>
                        {/* Exibição das mensagens */}
                        {mensagens.length > 0 ? mensagens.map(item => {
                            if (item.userId === userId) {
                                return (
                                    <div className='div-my-msg' key={item.id}>
                                        {console.log(item)}
                                        <p className="nickname-label">Você</p>
                                        <p className="p-message">{item.mensagem}</p>
                                    </div>
                                );
                            } else {
                                return (
                                    <div className='div-msg' key={item.id}>
                                        <p className="nickname-label">{item.nickname}</p>
                                        <p className="p-message">{item.mensagem}</p>
                                    </div>
                                );
                            }
                        }) : <h1 className='no-messages'>Inicie uma conversa!</h1>}

                    </div>

                    <form className="form-message" onSubmit={handleSubmit}>
                        <div>
                            <input className='input' type="text" value={texto} onChange={handleChange} placeholder='Digite aqui a sua mensagem...' autoFocus />
                            <button className='btn' type="submit" title='Enviar mensagem'>Enviar</button>
                        </div>
                    </form>

                </main>

            </div>

        </div>
    );
}
