import React, { useState } from 'react';
import './dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser} from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Componentes/Sidebar/sidebar';
import Registros from './Componentes/Registros/registros';
import Inscripcion from './Componentes/Inscripcion/inscripcion';

function Dashboard(props) {
  const { nombre, user } = props.user;

  const [showInscripcion, setShowInscripcion] = useState(false);
  const [showRegistros, setShowRegistros] = useState(false);

  function handleLogout() {
    localStorage.removeItem('user');
    window.location.reload(); 
  }

  function handleRegistrarClienteClick() {
    setShowInscripcion(true);
    setShowRegistros(false);
  }

  function handleMostrarClienteClick() {
    setShowRegistros(true);
    setShowInscripcion(false);
  }

  return (
    <div id='root'>
      <div className='header'>
        <img src={require('./img/logo.png')} />
        <li style={{display: 'flex', alignItems: 'center'}}>
          <FontAwesomeIcon icon={faUser}  />
          <p>{nombre}</p>
          <button style={{marginLeft: '10px'}} onClick={handleLogout}>Cerrar Sesión</button>
        </li>
      </div>

      <div className="sidebar">
        <Sidebar onRegistrarClienteClick={handleRegistrarClienteClick} onShowRegistros = {handleMostrarClienteClick}/>
      </div>

      <div className="registros" style={{display: showInscripcion ? 'none' : 'block'}}>
        <Registros/>
      </div>

      <div className="inscripcion" style={{display: showInscripcion ? 'block' : 'none'}}>
        <Inscripcion/>
      </div>

    </div>
  );
}

export default Dashboard;