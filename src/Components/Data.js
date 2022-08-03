import React from 'react'


export const Data = ({excelData}) => {
    return ((excelData.filter(valor=>valor.Estado==="Casado" && valor.Estudios==="Universitario"))
    .slice(0,100))
    .filter(valor=>valor.Edad)
    
    .map((valor)=>
        <tr >
        
        <th>{valor.Nombre}</th>
        <th>{valor.Edad}</th>
        <th>{valor.Equipo}</th>
        <th>{valor.Estado}</th> 
        
       
    
        </tr>        
    )
}