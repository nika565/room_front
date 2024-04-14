const iniciarChamada = async ({
    setLocalStream,
    setRemoteStream,
    localVideoRef,
    remoteVideoRef,
    peerConnection,
    socket }) => {
    try {

        // Usando audio e video do navegador
        const stream = await navigator.mediaDevices.getUserMedia({ 'video': true, 'audio': true })
        setLocalStream(stream);
        console.log('STREAM:', stream)
        localVideoRef.current.srcObject = stream;

        // Conexão de pares
        peerConnection = new RTCPeerConnection();
        
        stream.getTracks().forEach(track => {
            peerConnection.addTrack(track, stream);
        });

        peerConnection.onicecandidate = event => {
            if (event.candidate) {
                socket.emit('candidate', event.candidate);
            }
        };

        // Lidar com troca de stream
        peerConnection.ontrack = event => {
            setRemoteStream(event.streams[0]);
            remoteVideoRef.current.srcObject = event.streams[0];
        };

        // Lidar com troca de stream
        peerConnection.onaddstream = event => {
            setRemoteStream(event.stream);
            remoteVideoRef.current.srcObject = event.stream;
        };

        const ofertaConfig = {
            offerToReceiveAudio: 1,
            offerToReceiveVideo: 1
        }

        try {

            const oferta = await peerConnection.createOffer(ofertaConfig);

            await peerConnection.setLocalDescription(oferta);

            // Enviando a oferta para o servidor
            socket.emit('oferta', peerConnection.localDescription);

        } catch (error) {
            console.error(`Erro ao criar e enviar oferta`, error);
        }

        socket.on('oferta', async oferta => {
            try {

                await peerConnection.setRemoteDescription(oferta);
                const resposta = await peerConnection.createAnswer();
                await peerConnection.setLocalDescription(resposta);

                // Envia a resposta para o outro cliente
                socket.emit('resposta', peerConnection.localDescription);

            } catch (error) {
                console.error(`Erro ao criar e enviar resposta`, error);
            }
        });

        socket.on('resposta', async resposta => {
            try {
                await peerConnection.setRemoteDescription(resposta)
            } catch (error) {
                console.error('Erro ao definir uma resposta remota', error);
            }
        });

        socket.on('candidate', async (candidate) => {
            // Recebeu um candidato ICE do outro cliente
            try {
                await peerConnection.addIceCandidate(candidate);
            } catch (error) {
                console.error('Erro ao adicionar candidato ICE:', error);
            }
        });


    } catch (error) {
        console.error(`Erro ao acessar midia de dispositivos`, error);
    }
}

const encerrarChamada = ({
    localStream,
    setLocalStream,
    remoteStream,
    setRemoteStream,
    peerConnection
}) => {

    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        setLocalStream(null);
    }

    if (remoteStream) {
        setRemoteStream(null);
    }

    if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
    }
}

export { iniciarChamada, encerrarChamada };