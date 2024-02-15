import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Home } from './components/Pages/Home/Home';
import { SeccionMapa } from './components/Pages/SeccionMapa/SeccionMapa';
import { SeccionAnimales } from './components/Pages/SeccionAnimales/SeccionAnimales';
import { SeccionPerfil } from './components/Pages/SeccionPerfil/SeccionPerfil';
import { SeccionOtrosServicios } from './components/Pages/SeccionOtrosServicios/SeccionOtrosServicios';
import { Formulario } from './components/Formulario/Formulario';
import { Formulario2 } from './components/Formulario/Formulario2';
import { Formulario3 } from './components/Formulario/Formulario3';

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path= "/" element= {<Home/>}/>
        <Route path = "/Mapa" element= {<SeccionMapa/>} />
        <Route path = "/Adopcion" element= {<SeccionAnimales/>} />
        <Route path = "/Perfil" element= {<SeccionPerfil/>} />
        <Route path = "/OtrosServicios" element= {<SeccionOtrosServicios/>} />
        <Route path = "/Formulario" element= {<Formulario/>}/> 
        <Route path = "/Formulario2" element= {<Formulario2/>}/>
        <Route path = "/Formulario3" element= {<Formulario3/>}/>
        </Routes> 
      </BrowserRouter>
         </>
  );
}

export default App;
