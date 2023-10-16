import React, { useEffect, useState } from "react";

function Modal() {
  
     const [numero, setNumero] = useState(0);
     
     function generarNumero(){
        const numero = Math.trunc(Math.random() * TablaPoblacion.length());
        setNumero(numero);
     }
    const [TablaPoblacion, setTablaPoblacion] = useState(0);
    const url1 = 'https://gorest.co.in/public/v2/users'
    const showData = async () => {
          const response =  await fetch(url1)
          const data = await response.json()
          setTablaPoblacion(data)
    }
    const [TablaComite, setTablaComite] = useState(0);
    const url2 = 'https://gorest.co.in/public/v2/users'
    const showData1 = async () => {
          const response =  await fetch(url2)
          const data = await response.json()
          setTablaComite(data)
    }
    const [repeticiones, setRepeticiones] = useState(10);
    while (repeticiones > 0) {
        if(TablaPoblacion[numero].ci !== TablaComite[numero].ci){
           
           setRepeticiones(repeticiones-1);
        }else{
             generarNumero();
        }
    }
 
}
export default Modal;