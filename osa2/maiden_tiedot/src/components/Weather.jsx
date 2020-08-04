import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Weather = ({ country }) => {
    const api = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState([])

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api}&query=${country}`)
            .then(response => {
                return setWeather(response.data)
            })
    }, [country, api])

    if (weather.current === undefined) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <p><strong>temperature: </strong> {weather.current.temperature} °C</p>
            <img src={weather.current.weather_icons[0]} alt={'icon'} />
            <p><strong>wind: </strong> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
        </div>
    )
}

export default Weather