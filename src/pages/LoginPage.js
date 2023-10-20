import React, { useEffect, useState } from 'react'
import '../css/normalize.css'
import '../css/estilos.css'
import { useNavigate } from 'react-router'
import axios from 'axios'

const LoginPage = () => {

    const [showErrorNombre, setshowErrorName] = useState(false)
    const [showValorInput, setValorInput] = useState({name:"",password:""})

    const [showContraseña, setContraseña] = useState(false)
    const [showValorContraseña, setValorContraseña] = useState("")

    // const [nombre,setNombre] = useState()
    let errorNombre = false
    let errorContraseña = false
    const url = 'http://localhost:8000/'

    const navigate = useNavigate()

    const LoginClick = (e) => {
        e.preventDefault()
        if(showValorInput.name.length === 0)
        {
            setshowErrorName(true);
            errorNombre = true
        }else{
            setshowErrorName(false)
            errorNombre = false
        }

        if(showValorInput.password.length === 0)
        {
            setContraseña(true);
            errorContraseña = true
        }else{
            setContraseña(false)
            errorContraseña = false
        }

      if(errorNombre === false  && errorContraseña === false )
      {
        console.log( showValorInput.name);
        console.log(url + "verificarAdministrador/"+ showValorInput.name);
        axios.get(url + "verificarAdministrador/"+ showValorInput.name).then(response => {
            console.log(response.data)
            
            if (response.data){
                const administrador = response.data;
   
                if (showValorInput.password === administrador.CONTRASENAADMINISTRADOR){
                    alert("administrador correcto")
                    navigate("/home")
                }else{
                    alert("contraseña incorrecta")
                }
            }else{
                alert("no existe administrador")
            }
            //navigate("/")
        })  
      }
    }

    const CapturaContenido = (e) => {

        const { name, value } = e.target;
            setValorInput({
           ...showValorInput,
            [name]: value,
          });

        
    }

 

  return (
    <div class="body2">
   

      <div class="contenedor-formulario contenedor2">
        <div class="imagen-formulario2">
            
        </div>

        <form class="formulario">
            <div class="texto-formulario">
                <h2>Bienvenido al Sistema de Elecciones UMSS</h2>
                {/* <!-- <p>Inicia sesión con tu cuenta</p> --> */}
            </div>
            <div class="input">
                <label for="usuario">Usuario</label>
                <input placeholder="Ingresa tu nombre" type="text" id="usuario"  name="name" onChange={CapturaContenido}/>

                {showErrorNombre && <h4>Por favor ingrese un nombre</h4>}  
                
            </div>
            <div class="input">
                <label for="contraseña">Contraseña</label>
                <input placeholder="Ingresa tu contraseña" type="password" name="password" id="contraseña" onChange={CapturaContenido}/>

                {showContraseña && <h4>Por favor ingrese una contraseña</h4>}  
            </div>


            {/* <div class="password-olvidada">
                <a href="#">¿Olvidaste tu contraseña?</a>
            </div> */}

            <br/>
            <div class="input" onClick={LoginClick}>
                <input type="submit" value="Ingresar"/>
            </div>
        </form>
    </div>

</div>
  )
}

export default LoginPage;
