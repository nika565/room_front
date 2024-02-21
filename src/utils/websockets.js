import { io } from 'socket.io-client';

// Função para criação de uma sala

export const createRoom = (url) => {

    const socket = io(url);

    return socket;

}

export const sendMessage = (socket, roomName, msg) => {

    socket.emit(roomName, msg);

    alert('Mesnagem enviada')

}