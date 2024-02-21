import { useState } from 'react';
import { createRoom, sendMessage } from '../../utils/websockets';
import { useNavigate } from 'react-router-dom';


export default function CreateRoom() {
  const socket = createRoom('http://localhost:3333');

  const [name, setName] = useState('');

  const navigate = useNavigate();

  // Pegando a mensagem digitada
  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Enviando uma mensagem para o servidor criar a sala
    sendMessage(socket, 'criarSala', name);

    // Armazenando o nome da sala no localStorage
    localStorage.setItem('nomeSala', name);

    console.log('NAVIGATE:', navigate);

    navigate(`/room/${name}`);

  };

  return (
    <div className='div-generica'>

      <h1 className='gradient-title'>Teste</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} placeholder='Nome da sua sala...' />
        <button type="submit">Criar Sala</button>
      </form>

    </div>
  );
}