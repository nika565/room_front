import { useEffect } from 'react'

import '../../pages/room/style.css';
import scrollDown from '../../utils/scrollDown';

export default function MessageViewer ({ mensagensRef, mensagens, sala }) {

    // Pegando o id do usuário para idetificar se a mensagem é dele ou não
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const jsonMsg = JSON.stringify(mensagens);
        sessionStorage.setItem(`${sala}`, jsonMsg);
        scrollDown(mensagensRef);
    }, [mensagens]);

    return (
        <div className='div-messages' ref={mensagensRef}>
                        {/* Exibição das mensagens */}
                        {mensagens.length > 0 ? mensagens.map(item => {
                            if (item.userId === userId) {
                                return (
                                    <div className='div-my-msg' key={item.id}>
                                        <p className="nickname-label">Você</p>
                                        <p className="p-message">{item.mensagem}</p>
                                    </div>
                                );
                            } else {
                                return (
                                    <div className='div-msg' key={item.id}>
                                        <p className="nickname-label">{item.nickname}</p>
                                        <p className="p-message">{item.mensagem}</p>
                                    </div>
                                );
                            }
                        }) : <h1 className='no-messages'>Inicie uma conversa!</h1>}

                    </div>
    );

}