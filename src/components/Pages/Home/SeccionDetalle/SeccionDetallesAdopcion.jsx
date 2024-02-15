import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function SeccionDetallesAdopcion() {

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

<h5>Requsitos para la adopción</h5>
<p>No hay requisitos especiales para adoptar a {animals.nombre}</p>

<h5>Tasa de adopción</h5>
<p>125 Euros</p>

<h5>¿Se envia a otra ciudad?</h5>
<p>No se envia a otra ciudad</p>
</div>
    </div>
  )
}

export default SeccionDetallesAdopcion
