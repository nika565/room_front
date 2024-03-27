const sairSala = (nomeSala, salas, navigate, setStateRoom, setRooms) => {

    const verificacao = confirm('Tem certeza disso?');

    if (!verificacao) return;
    
    sessionStorage.removeItem(nomeSala);
    
    const arraySalas = salas.filter(elemento => elemento !== nomeSala);
    
    sessionStorage.setItem('rooms', JSON.stringify(arraySalas));
    
    if (arraySalas.length === 0) {
        navigate('/create-room');
        return;
    }
    
    setStateRoom(arraySalas[0]);       
    setRooms(arraySalas);
    navigate(`/room/${arraySalas[0]}`);
    
}

export default sairSala;