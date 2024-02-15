import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import SeccionDetalleDatos from "./SeccionDetalleDatos";
import SeccionDetallesSalud from "./SeccionDetallesSalud";
import SeccionDetallesAdopcion from "./SeccionDetallesAdopcion";
import "./SeccionDetalles.css"



function SeccionDetalle({ datos, salud, adopcion }) {
  const [animals, setDetalleAnimals] = useState({});
  const [showDatos, setShowDatos] = useState(true);
  const [showSalud, setShowSalud] = useState(false);
  const [showAdopcion, setShowAdopcion] = useState(false);
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
      <div className="fotonombreciudad">
        <Link to={`/Adopcion`}>
          <img
            className="animalfoto"
            src={animals.imagen}
            alt={animals.nombre}
          />
        </Link>
        <div className="nombreCiudad">
        <p><strong>{animals.nombre}</strong></p>
        <p><strong>{animals.ciudad}</strong> </p>
        </div>
      </div>
      <div className= "menuDetalle">
      <h3
        className="custom-btn btn-4"
        onClick={() => {
          setShowDatos(true);
          setShowSalud(false);
          setShowAdopcion(false);
        }}
      >
        Datos
      </h3>
      <h3
        className="custom-btn btn-4"
        onClick={() => {
          setShowDatos(false);
          setShowSalud(true);
          setShowAdopcion(false);
        }}
      >
        Salud
      </h3>
      <h3
        className="custom-btn btn-4"
        onClick={() => {
          setShowDatos(false);
          setShowSalud(false);
          setShowAdopcion(true);
        }}
      >
        Adopción
      </h3>

      <div>
        {showDatos ? (
          <SeccionDetalleDatos datos={datos} />
        ) : showSalud ? (
          <SeccionDetallesSalud salud={salud} />
        ) : showAdopcion ? (
          <SeccionDetallesAdopcion adopcion={adopcion} />
        ) : null}
      </div>
      </div>

      <div className="detallesbuttonadoptar2">
        <button className="detallesbuttonadoptar">Adoptar</button>
      </div>
    </div>
  );
}

export default SeccionDetalle;
