import { useNavigate } from "react-router-dom";

const verificacaoSala = (nomeSala, array) => {

    const navigate = useNavigate();

    if (!array.includes(nomeSala)) {
        navigate(`/create-room/?nomeSala=${nomeSala}`)
    }
}

export default verificacaoSala;