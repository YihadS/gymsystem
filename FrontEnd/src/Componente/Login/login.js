import './login.css';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Dashboard from '../../dashboard';
import { createRoot } from 'react-dom';


class Login extends Component {

  constructor(props){
    super(props);
    this.onChangeName= this.onChangeName.bind(this);
    this.onChangePassword= this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
   

/* Revisa si el usuario ya esta logeado */
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      const root = createRoot(document.getElementById('root'));
      root.render(<Dashboard user={storedUser} />);
    }

/* Los estados del nombre de usuario y contraseña comenzarán vacíos*/
    this.state ={
      name: '',
      password:'',
      error: ''
   
    }
  }

/* Actualizan los estados cuando se colocar información en los textboxs*/ 
  onChangeName(e){
    this.setState({
      name:e.target.value
    });
  }

  onChangePassword(e){
    this.setState({
      password:e.target.value
    });
  }
   
  
  onSubmit(e) {
    e.preventDefault(); /* Evita que la página se recargue */

    const obj = {
      name: this.state.name,
      password: this.state.password,
      error: this.state.error
    };

    axios.post('http://localhost:81/ProyectoGYM/reactProject/insert.php', obj)
      .then(response => {
        // Login correcto, almacena los datos en un LocalStorage
        const user = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        const root = createRoot(document.getElementById('root'));
        root.render(<Dashboard user={user} />);
      })
      .catch(error => {
        // Login fallido, muestra un error
        this.setState({ error: error.response.data });
        console.log(error.response.data);
      });

    this.setState({
      name: '',
      password: '',
      error: ''
    });
    console.log(obj);
  }


  render() {
    return (
    <div className='container'>
        <form className='loginForm'>
          <img src={require('../../img/logo.png')} />
          
          <div className='inline'>
          <FontAwesomeIcon icon={faUser} className='input-icon' />
          <input type='text' placeholder='Nombre de Usuario' value={this.state.name} onChange={this.onChangeName} required/>
 
          </div>
          <div className='inline'>
          <FontAwesomeIcon icon={faLock} className='input-icon' />
          <input type='password' placeholder='Contraseña' value={this.state.password} onChange={this.onChangePassword} required/>
          </div>

          {this.state.error && <p className='error'>{this.state.error}</p>}

          <input type='submit' value="Ingresar" onClick={this.onSubmit}/>

        </form>
    </div>   
    );
  }
}
 
export default Login;