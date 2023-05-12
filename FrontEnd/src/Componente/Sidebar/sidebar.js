import './sidebar.css';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faPenClip, faDumbbell, faCog} from '@fortawesome/free-solid-svg-icons';



class Sidebar extends Component {

  render() {
    const { onRegistrarClienteClick } = this.props;
    const { onShowRegistros } = this.props;

    return (
    <div className='menu'>
        <ul>
    <li>
      <FontAwesomeIcon icon={faUsers} onClick={onShowRegistros} />
      <a onClick={onShowRegistros}>Clientes Registrados</a> 
    </li>
    <li>
      <FontAwesomeIcon icon={faPenClip} onClick={onRegistrarClienteClick} />
      <a onClick={onRegistrarClienteClick}>Registrar Cliente </a>
    </li>
    <li>
    <FontAwesomeIcon icon={faDumbbell}  />
      <a>Ver Disciplinas</a>
    </li>
    <li>
    <FontAwesomeIcon icon={faCog}  />
      <a>Opciones Adicionales</a>
    </li>
        </ul>
    </div>   
    );
  }
}
 
export default Sidebar;