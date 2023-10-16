import React from "react";
import { Sidebardatos } from "./Sidebardatos";
import "../estilos/MenuIzquierdo.css"

function MenuIzquierdo() {
    return(
        <div class="wrapper">
            <div class="sidebar">
                <div class="profile">
                    <img src='https://www.umss.edu.bo/wp-content/uploads/2019/04/escudo-01.png' alt="profile_picture"/>
                    <h3>Administrador de elecciones  </h3>
                    <b> FCyT </b>

                </div>
                
                    <ul className='listaSidebar'>
                    {
                                Sidebardatos.map((item, index)=>{
                                    return(
            
                                        <li key={index} className="row" id={window.location.pathname == item.path ? "active" : ""}
                                        onClick={() => {
                                            window.location.pathname = item.path;
                                        }}>
                                            
                                                <span class="icon"><i class="fas fa-home"></i></span>
                                                <span class="item">{item.title}</span>
                                                
                                        </li>
                                    )
                                })
                            }
                        
                    </ul>
                
                
            </div>
        
        </div>

    );
}
   
export default MenuIzquierdo;    