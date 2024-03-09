import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import './style.css'

export default function Room() {

    // Pegando o nome da sala para usar lógica em cima disso...
    const { sala } = useParams();
    const nickname = sessionStorage.getItem('nickname');

    // Guardar as mensagens do chat;
    const [mensagens, setMensagens] = useState(() => {
        const arrayMsg = sessionStorage.getItem(`${sala}`);
        return arrayMsg ? JSON.parse(arrayMsg) : [];
    });

    const [texto, setTexto] = useState('');
    const socket = io('http://localhost:3333');

    // Pegando o id do usuário para idetificar se a mensagem é dele ou não
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        console.log('Conectando ao servidor...');
        socket.emit('criarSala', sala);

    }, [])

    // Conexão com a sala criada
    useEffect(() => {

        socket.on('mensagem', (mensagem) => {
            console.log('SOCKET:', socket);
            setMensagens(prev => [...prev, mensagem]);
        });

        return () => {
            socket.off('mensagem');
        }


    }, []);

    useEffect(() => {
        const jsonMsg = JSON.stringify(mensagens);
        sessionStorage.setItem(`${sala}`, jsonMsg);
    }, [mensagens]);


    // Pegar o valor digitado da mensagem
    const handleChange = (event) => {
        setTexto(event.target.value);
    };

    // Enviar mensagem
    const handleSubmit = () => {

        const content = {
            id: mensagens.length + 1,
            userId: userId,
            mensagem: texto,
            sala: sala,
            nickname: nickname
        }

        socket.emit('mensagemSala', content);
    };

    return (
        <div className="div-main-room">

            <aside className='aside'>

            </aside>



            <div className="div-chat">

                <main className='chat-main'>

                    <header className="chat-header">
                        <p className="nome-sala">{sala}</p>
                    </header>

                    <div className='div-messages'>
                        {/* Exibição das mensagens */}
                        {mensagens.length > 0 ? mensagens.map(item => {
                            if (item.userId === userId) {
                                return (
                                    <div className='div-my-msg' key={item.id}>
                                        {console.log(item)}
                                        <p>{item.nickname}</p>
                                        <p>{item.mensagem}</p>
                                    </div>
                                );
                            } else {
                                return (
                                    <div className='div-msg' key={item.id}>
                                        <p>{item.nickname}</p>
                                        <p>{item.mensagem}</p>
                                    </div>
                                );
                            }
                        }) : 'Não tem mensagens meu parceiro...'}
                    </div>

                    <form className="form-message">
                        <div>
                            <input className='input' type="text" value={texto} onChange={handleChange} placeholder='Digite aqui a sua mensagem...' autoFocus />
                            <button className='btn' type="button" onClick={handleSubmit}>Enviar</button>
                        </div>
                    </form>

                </main>

            </div>

        </div>
    );
}
