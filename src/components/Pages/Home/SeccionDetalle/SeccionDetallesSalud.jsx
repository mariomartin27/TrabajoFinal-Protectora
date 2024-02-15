import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function SeccionDetallesSalud() {

    const [animals, setDetalleAnimals] = useState({
        personalidad: [],
      });
      
      const [error, setError] = useState(null);
    
      const { _id } = useParams();
    
      useEffect(() => {
        const getDetalleAnimal = async () => {
          const detalleAnimalApi = await axios.get(
            `http://localhost:3300/animals/${_id}`
          );
          console.log("Response data:", detalleAnimalApi.data.data);
    
          setDetalleAnimals(detalleAnimalApi.data.data);
        };
    
        getDetalleAnimal();
      }, [_id]);
      if (error) {
        return <div>Error al cargar los datos: {error.message}</div>;
      }
    


  return (
    <div>
      <div>
     

     <p>
       <strong>Vacunado:</strong> {animals.vacunado ? "Sí" : "No"}
     </p>
     <p>
       <strong>Desparasitado:</strong> {animals.desparasitado ? "Sí" : "No"}
     </p>
     <p>
       <strong>Sano:</strong> {animals.sano ? "Sí" : "No"}
     </p>
     <p>
       <strong>Estirilizado:</strong> {animals.estirilizado ? "Sí" : "No"}
     </p>
     <p>
       <strong>Microchip:</strong> {animals.microchip ? "Sí" : "No"}
     </p>
   </div>
    </div>
  )
}

export default SeccionDetallesSalud
