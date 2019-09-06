import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import iconoMarcador from './pinVerde.PNG';

export default function Clima({resultado}){
    const {name, weather, main, wind, coord} = resultado;
       console.table(resultado);
        //si no existen paramos
        if(!name || !weather || !main || !wind) return null;
        //temperatura kelvin a celsius
        const kelvin = 273.15;
        //url del icono del clima y texto alt
        const urlIcono = `http://openweathermap.org/img/w/${weather[0].icon}.png`;
        const alt = `Clima de ${name}`;

        const iconoViento =`fas fa-location-arrow`;
        const iconoVientoStyle = {
            transform: `rotate(${wind.deg}deg)`,
        };

       //función para dirección del viento
        function  direccionViento(deg){
            if (deg>337.5) return 'Norte';
            if (deg>292.5) return 'Noroeste';
            if(deg>247.5) return 'Oeste';
            if(deg>202.5) return 'Sud Oeste';
            if(deg>157.5) return 'Sur';
            if(deg>122.5) return 'Sud Este';
            if(deg>67.5) return 'Este';
            if(deg>22.5){return 'Nordeste';}
            return 'Norte';
        }
        //Mapa
        let longitud=coord.lon;
        let latitud=coord.lat;
        
        const position = [latitud, longitud];

        const iconVerde = new L.Icon({

            iconUrl: iconoMarcador,
         
            iconSize:     [40, 45], // tamaño del icono
         
            shadowSize:   [50, 64], // tamaño de la sombra
         
            iconAnchor:   [20, 40], // punto del icono que corresponde a la posición del marcador
         
            popupAnchor:  [0, -40] // punto relativo al marcador desde donde se deberá abrir el popup
         
         });
               

 return(
     <div className="resultados">    
     <div className="container">
            <div className="row">
                <div className="col s12">
                <div className="transparentBG">
                 <span className="black-text align-left">
                    <h2>Resultado del Clima de : {name}<img src={urlIcono} alt={alt} className="responsive-img"/></h2>
                </span>
                </div>
           </div>
           <div className="col s12 m6 l6">
               <div className="card-panel transparentBG">
                <h3 className="left-align azul">Temperaturas</h3>
                <p>
                    Actual: { (main.temp - kelvin).toFixed(2) } &deg;C<br/>
                    <i className="fas fa-temperature-high"></i> Max: {parseInt(main.temp_max - kelvin, 10)} &deg;C<br/>
                    <i className="fas fa-temperature-low"></i> Min: {parseInt(main.temp_min - kelvin, 10)} &deg;C
                </p>
                <h3 className="left-align azul">Otros Datos</h3>
                
                <p>
                   
                    Humedad:&nbsp;{main.humidity}&nbsp;%<br/>
                    Presión Atmosférica:&nbsp;{main.pressure}&nbsp;mbar<br/>
                    <i className="fa fa-wind"></i> Velocidad del viento:&nbsp;{wind.speed}&nbsp;km/h<br/>
                    <i className={iconoViento} style={ iconoVientoStyle }></i> Dirección del viento:&nbsp;{direccionViento(wind.deg)}
                </p>
                </div>
                </div>
           <div className="col s12 m6 l6 z-depth-3">
              
            <Map  id="map" center={position} zoom={12}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Marker position={position} icon={iconVerde}>
                <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                </Marker>
            </Map>
           
        </div>
      
    </div>
    </div>
    </div>
 )
}