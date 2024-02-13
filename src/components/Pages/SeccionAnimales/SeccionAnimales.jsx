// import React from 'react'
// import Nav from '../../Core/Nav/Nav'

// const URL = "http://localhost:3300/animals"


// export const SeccionAnimales = () => {
//   return (
//     <>
//     <div>SeccionAnimales</div>
//     <Nav> </Nav>
//     </>
//   )
// }


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SeccionAnimales = () => {
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3300/animals')
      .then(response => {
        console.log(response.data);
        setAnimals(response.data);
      })
      .catch(error => {
        console.error('Error al hacer la solicitud:', error); 
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error al cargar los datos: {error.message}</div>;
  }

  return (
    <div>
      <h1>Listado de Animales</h1>
      <ul>
        {animals.map(animal => (
          <li key={animal._id}>
            <div>
              <img src={animal.imagen} alt={animal.nombre} />
            </div>
            <div>
              <h2>{animal.nombre}</h2>
              <p><strong>Personalidad:</strong> {animal.personalidad.join(', ')}</p>
              <p><strong>Peso:</strong> {animal.peso} kg</p>
              <p><strong>Nacimiento:</strong> {animal.nacimiento}</p>
              <p><strong>Historia:</strong> {animal.historia}</p>
              <p><strong>Ciudad:</strong> {animal.ciudad}</p>
              <p><strong>Especie:</strong> {animal.especie}</p>
              <p><strong>Raza:</strong> {animal.raza}</p>
              <p><strong>Sexo:</strong> {animal.sexo}</p>
              <p><strong>Sano:</strong> {animal.sano}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SeccionAnimales;

