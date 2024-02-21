import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import './style.css'

function Home() {

  return (
    <div className='div-home'>

      <h1 className='main-title'>Room</h1>
      <h2 className='sub-title'>Chat real-time para trocar conexões superficiais!</h2>

      <p className='p-home'>
      Pronto para jogar conversa fora? Você veio ao lugar certo! Bem-vindo à Room, onde você reunir seus amigos e criar grupos. Apenas isso...
      </p>

      <Link to='/create-room'><Button title="Inciar" className="btn"/></Link>

      
    </div>
  );

};

export default Home;
