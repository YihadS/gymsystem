import './registros.css';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEdit, faSearch} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

class Registros extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [], //Datos de Usuarios
      planList: [], // Datos de planes
      selectedUser: null, //ningún usuario estará seleccionado por defecto
      modalOpen: false, //el modal estará escondido por defecto
      searchQuery: '', //la búsqueda estará vacía
      filteredData: [] 
    };
  }

  componentDidMount() {
    this.fetchDataUsers();
    this.fetchDataPlans();
  }
 
//Petición para traer datos de usuario
  fetchDataUsers = async () => {
    const response = await fetch('http://localhost:81/ProyectoGYM/reactProject/getdata.php');
    const data = await response.json();
    this.setState({ data, filteredData: data });
  };

//Petición para traer datos de planes
  fetchDataPlans = async () => {
    const response = await fetch('http://localhost:81/ProyectoGYM/reactProject/getplans.php');
    const data = await response.json();
    this.setState({ planList: data });
  };

//Petición para borrar un registro
deleteData = (id) => {
  Swal.fire({
    title: '¿Está seguro que desea eliminar a este cliente?',
    text: '¡No podrá revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Sí, borrarlo'
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:81/ProyectoGYM/reactProject/deleteuser.php?id=${id}`, {
        method: 'DELETE',
      }).then(() => {
        this.fetchDataUsers();
        Swal.fire(
          '¡Eliminado!',
          'El registro ha sido eliminado.',
          'success'
        )
      }).catch((error) => {
        console.error('Error:', error);
        Swal.fire(
          'Error',
          'Ha ocurrido un error al eliminar el registro',
          'error'
        )
      });
    }
  })
}

//Abrimos el Modal
openModal = (id) => {
  const selectedUser = this.state.data.find((user) => user.id === id);
  this.setState({ selectedUser, modalOpen: true });
};

//Cerramos el Modal
closeModal = () => {
  this.setState({ modalOpen: false });
}

//enviamos los datos para modificar el usuario
handleFormSubmit = (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const updatedUser = Object.fromEntries(formData.entries());

  fetch(`http://localhost:81/ProyectoGYM/reactProject/updateuser.php?id=${this.state.selectedUser.id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedUser),
  })
    .then(() => {
      this.fetchDataUsers();
      Swal.fire('¡Actualizado!', 'El registro ha sido actualizado.', 'success');
      this.setState({ modalOpen: false });
    })
    .catch((error) => {
      console.error('Error:', error);
      Swal.fire('Error', 'Ha ocurrido un error al actualizar el registro', 'error');
    });
};

//Buscamos los datos insertados en el search input
handleSearchInputChange = (event) => {
  const searchQuery = event.target.value.toLowerCase();
  const filteredData = searchQuery === ''
    ? this.state.data // Si la busqueda esta vacia, muestra todos los registros
    : this.state.data.filter(item => {
      const nombreMatches = item.Nombre.toLowerCase().includes(searchQuery);
      const carnetMatches = item.Carnet.toLowerCase().includes(searchQuery);
      return nombreMatches || carnetMatches;
    });

  this.setState({ searchQuery, filteredData });
}

  render() {
    const { data, selectedUser, modalOpen, searchQuery, filteredData, planList } = this.state;
    const currentDate = new Date();

    return (
      <div>
        <div className="search-container">
          <FontAwesomeIcon title='Buscar Cliente' icon={faSearch}/>
          <input type="text" placeholder="Buscar por nombre o carnet de identidad..." value={searchQuery} onChange={this.handleSearchInputChange} />
        </div>
      <table className='registrosTable'>
        <thead>
          <tr>
            <th></th>
            <th>Cliente</th>
            <th>Nro. de Carnet</th>
            <th>Tipo de Plan</th>
            <th>Fecha de Inicio</th>
            <th>Fecha de Vencimiento</th>
            <th>Estado</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => {
            const fechaVencimiento = new Date(item.fecha_vencimiento);
            const isVencido = fechaVencimiento < currentDate;

            return (
              <tr key={item.id}>
                <td style={{padding:'10px'}}><img src='https://img.freepik.com/free-icon/user-profile-icon_318-33925.jpg'/></td>
                <td>{item.Nombre} {item.Apellidos}</td>
                <td>{item.Carnet}</td>
                <td>{item.plan}</td>
                <td>{item.fecha_inicio}</td>
                <td>{item.fecha_vencimiento}</td>
                <td>
                  {isVencido ? <span className='vencido'>Vencido</span> : <span className='vigente'>Vigente</span>}
                </td>
                <td>
                  <FontAwesomeIcon title='Eliminar Cliente' icon={faTrashCan} onClick={() => this.deleteData(item.id)}/>
                  <FontAwesomeIcon title='Modificar Cliente' icon={faEdit} onClick={() => this.openModal(item.id)} />
                </td>
              </tr>
            );
          })}
        </tbody>

        {this.state.modalOpen && (
<div className='overlay'>
  <div className="modal">
  <span className="close" onClick={this.closeModal}>&times;</span>
    <div className="modal-content">
      <h2>Editar Usuario</h2>
      <form onSubmit={this.handleFormSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" defaultValue={selectedUser.Nombre} required />
        <label htmlFor="apellidos">Apellidos:</label>
        <input type="text" id="apellidos" name="apellidos" defaultValue={selectedUser.Apellidos} required /><br/>
        <label htmlFor="carnet">Nro. de Carnet:</label>
        <input type="number" id="carnet" name="carnet" min={0} defaultValue={selectedUser.Carnet} required />
        <label htmlFor="plan">Tipo de Plan: </label>
        <select id="plan" name="plan" defaultValue={selectedUser.plan} required>
                  <option value="">Selecciona un plan</option>
                  {planList.map(plans => (
                    <option key={plans.id} value={plans.Nombre}>{plans.Nombre}</option>
                  ))}
        </select><br/>
        <label htmlFor="fecha_inicio">Fecha de Inicio:</label>
        <input type="date" id="fecha_inicio" name="fecha_inicio" defaultValue={selectedUser.fecha_inicio} required />
        <label htmlFor="fecha_vencimiento">Fecha de Vencimiento:</label>
        <input type="date" id="fecha_vencimiento" name="fecha_vencimiento" defaultValue={selectedUser.fecha_vencimiento} required /><br/>
        <button type="submit">Guardar</button>
      </form>
    </div>
  </div>
</div>
)}

      </table>
      </div>
    );
  }
}

export default Registros;