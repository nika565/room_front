import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../pages/room/style.css'
import flecha from '/flecha.svg'
import alternarClasse from '../../utils/alternarClasse';

export default function RoomList({ rooms, setStateRoom, open, setOpen }) {

    const navigate = useNavigate();

    // Alterar as cores quando clica na sala
    const [indiceAtivo, setIndiceAtivo] = useState(0);

    const mudarSala = (index) => {
        navigate(`/room/${rooms[index]}`)
    }

    return (
        <aside className={`aside ${open ? 'aside-open' : 'aside-close'}`}>

            {/* Cabeçalho de opções */}
            <header className='header-aside'>
                <h1 className='h1-aside'>Minhas salas</h1>

                <Link to={'/create-room/?nomeSala='}><button title='Criar Sala' >+</button></Link>

                <img src={flecha} onClick={() => setOpen(false)} />

            </header>

            {
                // Exibição das salas do usuário
                rooms.length > 0 ? rooms.map((item, index) => {

                    return (
                        <div className={`div-rooms ${indiceAtivo === index ? 'room-selected' : ''}`} onClick={() => alternarClasse(index, indiceAtivo, rooms, setIndiceAtivo, setStateRoom, mudarSala)} key={index}>
                            &nbsp;&nbsp;&nbsp;&nbsp;{item}
                        </div>
                    );
                })

                    :

                    <p>Sem salas...</p>
            }


        </aside>
    );

}