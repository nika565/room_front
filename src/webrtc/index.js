const iniciarChamada = async ({
    setLocalStream,
    setRemoteStream,
    localVideoRef,
    remoteVideoRef,
    peerConnection }) => {
    try {

        const stream = await navigator.mediaDevices.getUserMedia({ 'video': true, 'audio': true })
        setLocalStream(stream);
        console.log('STREAM:', stream)
        localVideoRef.current.srcObject = stream;

        // Conexão de pares
        peerConnection = new RTCPeerConnection();
        peerConnection.addStream(stream);

        // Lidar com troca de stream
        peerConnection.onaddstream = event => {
            setRemoteStream(event.stream);
            remoteVideoRef.current.srcObject = event.stream;
        };

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