import io from 'socket.io-client';
import idGenerator from "./idGenerator";

export default function createRoom(nickname, nameRoom) {

  const socket = io('http://localhost:3333');

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


  const userId = localStorage.getItem('userId');

  if (!userId) {
    localStorage.setItem('userId', id);
  }

  localStorage.setItem('nickname', nickname);

  // Enviando uma mensagem para o servidor criar a sala
  socket.emit('criarSala', nameRoom);

  // Salvando o nome da sala
  const storageRoom = sessionStorage.getItem('rooms');

  // Verificação se possui salas salvas
  if (!storageRoom) {

    sessionStorage.setItem('rooms', JSON.stringify([nameRoom]));

  } else {

    // Caso já tenha salas, será feita uma verificaçõ para não adicionar salas repetidas
    const arrayRooms = JSON.parse(storageRoom);

    if (!arrayRooms.includes(nameRoom)) {
      arrayRooms.unshift(nameRoom);
      sessionStorage.setItem('rooms', JSON.stringify(arrayRooms));
    };

  }
}