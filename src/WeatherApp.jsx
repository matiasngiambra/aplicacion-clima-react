import React, { useEffect, useState } from 'react'
import './styles/weatherStyles.css'

const WeatherApp = () => {

    const [ciudad, setCiudad] = useState('')
    const [dataClima, setDataClima] = useState(null)

    const fetchClima = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=0313c4bad55ea5b8dc9624efda585f47`)
            const data = await response.json();
            if (data.cod == 200) {
                setDataClima(data)
            } else {
                alert('No se pudo obtener la información')
            }

        } catch (error) {
            console.error('Ocurrió el error: ', error)
        }
    }

    const handleCambioCiudad = (ev) => {
        setCiudad(ev.target.value)
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        if (ciudad.length > 0) {
            fetchClima()
        }
    }

    return (
        <div className='container'>
            <h1>Climapp</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="ciudad" ></label>
                <input
                    type="text"
                    name="ciudad"
                    placeholder="Inserte ciudad"
                    value={ciudad}
                    onChange={handleCambioCiudad}
                />
                <button type="submit">Find weather</button>
            </form>
            {
                dataClima ?
                    <div className='contenedor-info'>
                        <div>
                            <h1><u>{dataClima.name}</u></h1>
                            <p> Temperature:</p> <span><b> {parseInt(dataClima.main.temp) - 273}°C</b></span>
                            <p> Feels Like:</p> <span><b>{parseInt(dataClima.main.feels_like) - 273}°C</b></span>
                            <p> Humidity:</p> <span><b>{dataClima.main.humidity}°C</b></span>
                            <p> Description: </p> <span><b>{dataClima.weather[0].description}</b></span>

                        </div>
                        <div>
                            <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} />
                        </div>
                    </div>
                    : <p>Ingrese una Ciudad para comprobar el Clima</p>
            }
        </div>
    )
}

export default WeatherApp
