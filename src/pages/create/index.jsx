import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './style.css'
import createRoom from '../../utils/createRoom';


export default function CreateRoom() {

  const navigate = useNavigate();

  const [nomeSala] = useSearchParams();

  const nick = localStorage.getItem('nickname');

  const [nickname, setNickname] = useState(() => nick ? nick : '');
  const [nameRoom, setNameRoom] = useState(() => nomeSala.get('nomeSala') ? nomeSala.get('nomeSala') : '');

  // Pegando a mensagem digitada
  const handleChangeName = (event) => {
    setNickname(event.target.value);
  };

  const handleChangeRoom = (event) => {
    setNameRoom(event.target.value);
  };

  const handleSubmit = (event) => {
    
    event.preventDefault();

    createRoom(nickname, nameRoom);

    navigate(`/room/${nameRoom}`);

  };

  return (
    <div className='div-generica'>

      <h1 className='title'>Entre em uma sala</h1>

      <form className='form-create' onSubmit={handleSubmit}>

        {!nick ? <input className='input' type="text" onChange={handleChangeName} placeholder='Seu apelido...' required autoFocus/>

          : ''
        }

        <input className='input' type="text" onChange={handleChangeRoom} value={nameRoom} placeholder='Nome da sala...' required autoFocus />
        <button className='btn' type="submit">Criar Sala</button>
      </form>

    </div>
  );
}