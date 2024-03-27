import { useState } from 'react';

import '../../pages/room/style.css'
import idGenerator from '../../utils/idGenerator';

export default function FormChat({ stateRoom, socket }) {

    const nickname = localStorage.getItem('nickname');

    // Pegando o id do usuário para idetificar se a mensagem é dele ou não
    const userId = localStorage.getItem('userId');

    const [texto, setTexto] = useState('');

    // Pegar o valor digitado da mensagem
    const handleChange = (event) => {
        setTexto(event.target.value);
    };

    // Enviar mensagem
    const handleSubmit = (evento) => {

        evento.preventDefault();

        if (!texto) return;

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
        <form className="form-message" onSubmit={handleSubmit}>
            <div>
                <input className='input' type="text" value={texto} onChange={handleChange} placeholder='Digite aqui a sua mensagem...' autoFocus />
                <button className='btn' type="submit" title='Enviar mensagem'>Enviar</button>
            </div>
        </form>
    );

}