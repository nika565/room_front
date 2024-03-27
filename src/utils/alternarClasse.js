const alternarClasse = (index, indiceAtivo, rooms, setIndiceAtivo, setStateRoom, mudarSala) => {
    setIndiceAtivo(index === indiceAtivo ? null : index)
    setStateRoom(rooms[index]);
    mudarSala(index);
}

export default alternarClasse;