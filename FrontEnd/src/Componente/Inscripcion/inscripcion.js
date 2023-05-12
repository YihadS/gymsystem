import './inscripcion.css';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEdit, faSearch} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

class Inscripcion extends Component {

  constructor(props) {
    super(props);
    this.state = {
        planList: [] // Datos de planes
    };

  }

  componentDidMount() {
    this.fetchDataPlans();
  }
 
//Petición para traer datos de planes
  fetchDataPlans = async () => {
    const response = await fetch('http://localhost:81/ProyectoGYM/reactProject/getplans.php');
    const data = await response.json();
    this.setState({ planList: data });
  };

//Registramos al usuario
handleFormSubmit = (event) => {
    const form = event.target;
    const formData = new FormData(form);
    const newUser = Object.fromEntries(formData.entries());
  
    fetch(`http://localhost:81/ProyectoGYM/reactProject/createuser.php`, {
      method: 'POST',
      body: JSON.stringify(newUser),
    })
      .then(() => {
        this.fetchDataPlans();
        Swal.fire('¡Registrado!', 'El cliente ha sido registrado', 'success');
        this.setState({ modalOpen: false });
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire('Error', 'Ha ocurrido un error al realizar el registro', 'error');
      });
  };
  
  render() {
    const { planList } = this.state;
    return (
        <div className='modalBackground'>
        <div className="modal" style={{marginTop: '80px'}}>
          <div className="modal-content">
            <h2>Registar Nuevo Usuario</h2>
            <form onSubmit={this.handleFormSubmit}>
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre"  required />
              <label htmlFor="apellidos">Apellidos:</label>
              <input type="text" id="apellidos" name="apellidos"  required /><br/>
              <label htmlFor="carnet">Nro. de Carnet:</label>
              <input type="number" id="carnet" name="carnet" min={0} required />
              <label htmlFor="plan">Tipo de Plan: </label>
              <select id="plan" name="plan"  required>
                        <option value="">Selecciona un plan</option>
                        {planList.map(plans => (
                          <option key={plans.id} value={plans.Nombre}>{plans.Nombre}</option>
                        ))}
              </select><br/>
              <label htmlFor="fecha_inicio">Fecha de Inicio:</label>
              <input type="date" id="fecha_inicio" name="fecha_inicio"  required />
              <label htmlFor="fecha_vencimiento">Fecha de Vencimiento:</label>
              <input type="date" id="fecha_vencimiento" name="fecha_vencimiento" required /><br/>
              <button type="submit">Guardar</button>
            </form>
          </div>
        </div>
        </div>
    );
  }
}

export default Inscripcion;