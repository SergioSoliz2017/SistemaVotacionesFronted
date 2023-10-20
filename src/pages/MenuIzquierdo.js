import React,{useState} from "react";
import "../css/MenuIzquierdo.css"
import Logo from '../assets/logo.png';
import CrearElecciones from './CrearElecciones';
import Inicio from './Inicio';
import VerElecciones from './VerElecciones'; 
import AsignacionComite from "./AsignacionComite";

function MenuIzquierdo() {
    const [mostrarCrearEleccion, setMostrarCrearEleccion] = useState(false);
    const [mostrarInicio, setMostrarInicio] = useState(true);  // Mostrar Inicio por defecto
    const [mostrarVerElecciones, setMostrarVerElecciones] = useState(false);  // Estado para mostrar VerElecciones
    const [mostrarVerComite, setMostrarVerComite] = useState(false);
    const handleCrearEleccionClick = () => {
      setMostrarCrearEleccion(true);
      setMostrarInicio(false);
      setMostrarVerElecciones(false);  // Oculta VerElecciones al hacer clic en Crear Elección
      setMostrarVerComite(false);    
    };
  
    const handleInicioClick = () => {
      setMostrarCrearEleccion(false);
      setMostrarInicio(true);
      setMostrarVerElecciones(false);  // Oculta VerElecciones al hacer clic en Inicio
      setMostrarVerComite(false);
    };
  
    const handleVerEleccionesClick = () => {
      setMostrarCrearEleccion(false);
      setMostrarInicio(false);
      setMostrarVerElecciones(true);
      setMostrarVerComite(false);
        // Muestra VerElecciones al hacer clic en Ver Elecciones Activas
    };
    const handleVerComiteClick = () => {
        setMostrarCrearEleccion(false);
        setMostrarInicio(false);
        setMostrarVerElecciones(false);
        setMostrarVerComite(true);
          // Muestra VerElecciones al hacer clic en Ver Elecciones Activas
      };

    return(
        <div class="wrapper">
            <div class="sidebar">
                <div class="profile">
                    <img src={Logo} alt="profile_picture"/>
                    <h3>Administrador de elecciones  </h3>
                    <b> FCyT </b>

                </div>
                
                    <ul className='listaSidebar' >

                                        <li  className="row" id={ mostrarInicio ? "active" : ""}
                                        onClick=
                                            {handleInicioClick}
                                        >
                                            
                                                <span class="icon"><i class="fas fa-home"></i></span>
                                                <span class="item">Inicio</span>
                                                
                                        </li>
                                        <li  className="row" id={ mostrarCrearEleccion ? "active" : ""}
                                        onClick=
                                            {handleCrearEleccionClick}
                                        >
                                            
                                                <span class="icon"><i class="fas fa-home"></i></span>
                                                <span class="item">Proceso Electoral</span>
                                                
                                        </li>
                                        <li  className="row" id={ mostrarVerElecciones ? "active" : ""}
                                        onClick=
                                            {handleVerEleccionesClick}
                                        >
                                            
                                                <span class="icon"><i class="fas fa-home"></i></span>
                                                <span class="item">Elecciones Activas</span>
                                                
                                        </li>
                                        <li  className="row" id={ mostrarVerComite ? "active" : ""}
                                        onClick=
                                            {handleVerComiteClick}
                                        >
                                            
                                                <span class="icon"><i class="fas fa-home"></i></span>
                                                <span class="item">Comite Electoral</span>
                                                
                                        </li>
                                    
                        
                    </ul>
                
                
            </div>
            <div className="SegundoDivMenu">
                    {mostrarCrearEleccion && <CrearElecciones />}
                    {mostrarInicio && <Inicio />}
                    {mostrarVerElecciones && <VerElecciones lista = {mostrarVerElecciones}/>} 
                    {mostrarVerComite && <AsignacionComite/>}
            </div>
        
        </div>
         
        

    );
}
   
export default MenuIzquierdo;    