import React, { useState } from 'react';

function Formulario({datosConsulta}) {
    
    //State del componente
    //busqueda = state , guardarBusqueda = this.setState({ ciudad:'',pais:''})
    const [busqueda, guardarBusqueda] = useState({
        ciudad : '',
        pais : ''
    })
    const handleChange = e => {
        //this.setState({})
        //...busqueda -> hacemos una copia del state
        //[e.target.name] : e.target.value ->recogemos los valores del formulario x name de cada campo 
        //y el valor del evento e
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value  
       });
       }
    const consultarClima = e => {
        e.preventDefault();
        //pasar al componente principal
        datosConsulta(busqueda);
    }
    
    return (  
            <div className="contenedor-form">
            <div className="container">
                <div className="row transparentBG1">
                    <form
                    onSubmit={consultarClima}
                    >
                        <div className="input-field col s12 m8 l4 offset-m2">
                            <input 
                            id="ciudad" 
                            type="text" 
                            name="ciudad"
                            onChange={handleChange}
                            />
                            <label htmlFor="ciudad">Ciudad:</label>
                        </div>
                        <div className="input-field col s12 m8 l4 offset-m2">
                            <select
                            onChange={handleChange}
                            name="pais"
                            >
                                <option value="" defaultValue>Elige un país</option>
                                <option value="PT">Portugal</option>
                                <option value="ES">España</option>
                                <option value="FR">Francia</option>
                                <option value="IT">Italia</option>
                                <option value="UK">Reino Unido</option>
                                <option value="DE">Alemania</option>
                                <option value="NL">Holanda</option>

                            </select>
                            <label htmlFor="pais">País:</label>
                        </div>
                        <div className="input-field col s12 m8 l4 offset-2 buscador">
                        <input type="submit" className="waves-effect waves-light btn-large yellow accent-4" value="Buscar..."/>

                        </div>
                    </form>
                </div>
            </div>

            </div>
        );
    }

export default Formulario;