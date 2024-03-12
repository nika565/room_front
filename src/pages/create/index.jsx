import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import './style.css'

import idGenerator from '../../utils/idGenerator'


export default function CreateRoom() {
  const socket = io('http://localhost:3333');

  const [nickname, setNickname] = useState('');
  const [nameRoom, setNameRoom] = useState('');

  const navigate = useNavigate();

  // Pegando a mensagem digitada
  const handleChangeName = (event) => {
    setNickname(event.target.value);
  };

  const handleChangeRoom = (event) => {
    setNameRoom(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificação do tamanho dos nomes
    if (nickname.length > 12) {
      alert('O tamanho máximo do apelido é de 12 caracteres!');
      return;
    }

    if (nameRoom.length > 35) {
      alert('O tamanho máximo do nome da sala é de 35 caracteres!');
      return;
    }

    // Gerando um id aleatório para identificação do usuário
    const id = idGenerator();

    sessionStorage.setItem('userId', id);
    sessionStorage.setItem('nickname', nickname);

    // Enviando uma mensagem para o servidor criar a sala
    socket.emit('criarSala', nameRoom);

    // Salvando o nome da sala
    const storageRoom = sessionStorage.getItem('rooms');

    if (!storageRoom) {
      sessionStorage.setItem('rooms', JSON.stringify([nameRoom]));
    } else {
      const arrayRooms = JSON.parse(storageRoom);
      arrayRooms.unshift(nameRoom);
      sessionStorage.setItem('rooms', JSON.stringify(arrayRooms));
    }
    
    navigate(`/room/${nameRoom}`);

  };

  return (
    <div className='div-generica'>

      <h1 className='title'>Entre em uma sala</h1>

      <form className='form-create' onSubmit={handleSubmit}>
        <input className='input' type="text" onChange={handleChangeName} placeholder='Seu apelido...' required />
        <input className='input' type="text" onChange={handleChangeRoom} placeholder='Nome da sala...' required />
        <button className='btn' type="submit">Criar Sala</button>
      </form>

    </div>
  );
}