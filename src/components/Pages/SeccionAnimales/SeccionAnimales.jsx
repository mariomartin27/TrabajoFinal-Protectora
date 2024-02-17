import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SeccionAnimales.css";
import Nav from "../../Core/Nav/Nav";
import { Link } from "react-router-dom";

const SeccionAnimales = () => {
  const [animals, setAnimals] = useState([]);
  const [originalAnimals, setOriginalAnimals] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    ciudad: "",
    especies: [],
    sexo: [],
    tamaño: [],
  });
  const [cities, setCities] = useState([]);
  const [species, setSpecies] = useState([]);
  const [sexes, setSexes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3300/animals")
      .then((response) => {
        console.log(response.data);
        setAnimals(response.data);
        setOriginalAnimals(response.data);
        setCities([...new Set(response.data.map(animal => animal.ciudad))]);
        setSpecies([...new Set(response.data.map(animal => animal.especie))]);
        setSexes([...new Set(response.data.map(animal => animal.sexo))]);
        setSizes([...new Set(response.data.map(animal => animal.tamaño))]);
      })
      .catch((error) => {
        console.error("Error al hacer la solicitud:", error);
        setError(error);
      });
  }, []);

  useEffect(() => {
    const filteredAnimals = filtrarAnimales(originalAnimals);
    setAnimals(filteredAnimals);
  }, [filters, searchTerm]);

  const filtrarAnimales = (data) => {
    let filteredData = data;
    filteredData = filtrarPorNombre(filteredData);
    filteredData = filtrarPorFiltros(filteredData);
    return filteredData;
  };

  const filtrarPorNombre = (data) => {
    return data.filter(animal => animal.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  const filtrarPorFiltros = (data) => {
    return data.filter(animal => {
      if (filters.ciudad && animal.ciudad !== filters.ciudad) return false;
      if (filters.especies.length > 0 && !filters.especies.includes(animal.especie)) return false;
      if (filters.sexo.length > 0 && !filters.sexo.includes(animal.sexo)) return false;
      if (filters.tamaño.length > 0 && !filters.tamaño.includes(animal.tamaño)) return false;
      return true;
    });
  };

  const handleFilterChange = (name, value) => {
    if (name === 'ciudad') {
      setFilters(prevFilters => ({
        ...prevFilters,
        [name]: value,
      }));
    } else {
      setFilters(prevFilters => ({
        ...prevFilters,
        [name]: prevFilters[name].includes(value)
          ? prevFilters[name].filter(item => item !== value)
          : [...prevFilters[name], value],
      }));
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (error) {
    return <div>Error al cargar los datos: {error.message}</div>;
  }

  return (
    <>
      <div className="screen_container">

      <div className="buscador">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar por nombre..."
          />
        </div>

      <Link to= {"/estadoAdopcion"}  className='estadoAdopcion'> Estado de adopción </Link>

        <div className="filter_container">
          <button onClick={() => setShowFilters(!showFilters)}>{showFilters ? "Ocultar Filtros" : "Filtros"}</button>
          <div className={`filter_buttons slide-down ${showFilters ? 'active' : ''}`}>
            <div className="filter_row">
              <label>Ciudad:</label>
              <select name="ciudad" value={filters.ciudad} onChange={(e) => handleFilterChange(e.target.name, e.target.value)}>
                <option value="">Todas</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter_row">
              <label>Especies:</label>
              <div className="button_group">
                {species.map((specie, index) => (
                  <button
                    key={index}
                    className={`button_with_image ${filters.especies.includes(specie) ? "active_button" : ""}`}
                    onClick={() => handleFilterChange("especies", specie)}
                  >
                    <img src={`iconos/animales/${specie}.png`} alt={specie} />
                    {specie}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter_row">
              <label>Sexo:</label>
              <div className="button_group">
                {sexes.map((sex, index) => (
                  <button
                    key={index}
                    className={`button_with_image ${filters.sexo.includes(sex) ? "active_button" : ""}`}
                    onClick={() => handleFilterChange("sexo", sex)}
                  >
                    <img src={`iconos/genero/${sex}.png`} alt={sex} />
                    {sex}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter_row">
              <label>Tamaño:</label>
              <div className="button_group">
                {sizes.map((size, index) => (
                  <button
                    key={index}
                    className={`button_with_image ${filters.tamaño.includes(size) ? "active_button" : ""}`}
                    onClick={() => handleFilterChange("tamaño", size)}
                  >
                    <img src={`iconos/tamaño/${size}.png`} alt={size} />
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <ul className="main_animal_container">
          {animals.map((animal) => (
            <li key={animal._id} className="individual_animal_container">
              <div className="animal_photo">
                <img src={animal.imagen} alt={animal.nombre} />
              </div>
              <div className="animal_data">
                <div className="animal_name">
                  <h2>{animal.nombre}</h2>
                </div>
                <div className="animal_city">
                  <p>
                    <strong>Ciudad:</strong> {animal.ciudad}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="nav_container">
        <Nav className="nav"></Nav>
      </div>
    </>
  );
};

export default SeccionAnimales;
