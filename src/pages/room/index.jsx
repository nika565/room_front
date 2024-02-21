import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

export default function Room() {
    const [mensagem, setMensagem] = useState('');
    const { sala } = useParams();
    const socket = io('http://localhost:3333');

    useEffect(() => {
        console.log('Conectando ao servidor...');
        socket.emit('criarSala', sala);

        socket.on('mensagem', (mensagem) => {
            console.log(`Mensagem: ${mensagem}`)
            alert(mensagem)
        });

        return () => {
            console.log('Desconectando...');
            socket.disconnect();
        };
    }, [socket, sala]);

    const handleChange = (event) => {
        setMensagem(event.target.value);
    }

    const handleSubmit = () => {
        socket.emit('mensagemSala', { mensagem: mensagem, sala: sala });
    }

    return (
        <div className="div-main-room">
            <h1>Olá mundo! Aqui é a sala: {sala}</h1>

            <div className="div-chat">
                <header className="chat-header">
                    <p className="nome-sala">{sala}</p>
                </header>
            </div>

            <form className="form-message">
                <input type="text" value={mensagem} onChange={handleChange} />
                <button type="button" onClick={handleSubmit}>Enviar</button>
            </form>
        </div>
    );
}
