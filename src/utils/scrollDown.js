const scrollDown = (mensagensRef) => {
    mensagensRef.current.scrollTop = mensagensRef.current.scrollHeight;
}

export default scrollDown;