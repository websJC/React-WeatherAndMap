import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima';
import imagenFondo from './components/fondo.PNG';
import imagenPie from './components/pie.PNG';

function App() {
  //state principal
  const [ciudad, setCiudad] = useState('');
  const [pais, setPais] = useState('');
  const [error, setError] = useState(false);
  const [resultado, setResultado] = useState({});

  useEffect(() => {
    if(ciudad === '') return;
    const consultarAPI = async () => {
   
      const appId = 'YOUR_APP_ID';
      // Lo ponemos con comilla invertida para poder usar template strings y añadir ciudad, país e id del formulario
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&APPID=${appId}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setResultado(resultado);
    }
     
      consultarAPI();
   
  }, [ciudad, pais]);

  const datosConsulta = datos => {
    //validar campos
    if(datos.ciudad === ''|| datos.pais === ''){
      setError(true);
      return;
    }
    setCiudad(datos.ciudad);
    setPais(datos.pais);
    setError(false);
  };

  
  
  
  //cargar componente condicionalmente
  let componente;
  if(error){
    //hay error mostrar componente
    componente = <Error 
    mensaje='Hay un error, ambos campos son obligatorios'
    />
  } else if (resultado.cod === "404") {
      //ciudad no existe
      componente = <Error mensaje="Ciudad no encontrada"/>
  }   else {
    //no hay error , mostrar clima
    componente = <Clima
    resultado = {resultado}
    />;
  }
  const cuerpoStyle = {
    backgroundImage: `url(${imagenFondo})`,
    backgroundPosition: `center`,
    backgroundSize: `cover`,
    backgroundRepeat: `no-repeat`
  };
  const footerStyle = {
    backgroundImage: `url(${imagenPie})`,
    backgroundPosition: `bottom`,
    backgroundSize: `contain`,
    backgroundRepeat: `no-repeat`
  };
  return (
    <div id="App" style={ cuerpoStyle }>
    <Header
      titulo="React Hooks Weather WebApp"
    />
    <div  id="divFormulario">
      <div className="col s12 m8 l12">
        <Formulario datosConsulta = {datosConsulta} />
      </div>
      <div className="col s12 m8 l12">
        {componente}
      </div>
    </div>
    <div id="Footer">
    <footer className="transparentBG" style={ footerStyle }></footer>
    </div>
    </div>
    

  
  );
}

export default App;
